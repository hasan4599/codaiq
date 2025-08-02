import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/db/mongoose";
import { IUser, User } from "@/model/user";
import { stripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    await connectMongo();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    // ✅ Lifetime email whitelist
    const lifetimeEmails = [
        "nidalstar1000@gmail.com",
        "99hasan45@gmail.com"
    ];

    if (lifetimeEmails.includes(email)) {
        return NextResponse.json("lifetime", { status: 200 });
    }

    if (!stripe) {
        return NextResponse.json({ error: "Please try again later" }, { status: 500 });
    }

    const selectedUser: IUser | null = await User.findOne({ email });

    if (!selectedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Check one-time purchase
    const sessions = await stripe.checkout.sessions.list({
        customer: selectedUser.stripeCustomerId,
        limit: 100,
    });

    let hasPurchased = false;

    for (const session of sessions.data) {
        if (session.payment_status !== "paid") continue;

        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        for (const item of lineItems.data) {
            if (item.price?.product === "prod_Smsez31bnU7lLm") {
                hasPurchased = true;
                break;
            }
        }

        if (hasPurchased) break;
    }

    // ✅ Check active subscriptions
    const allSubscriptions = await stripe.subscriptions.list({
        customer: selectedUser.stripeCustomerId,
        status: "all",
        expand: ["data.default_payment_method"],
    });

    // Filter only active or trialing subscriptions
    const subscriptions = allSubscriptions.data.filter(
        (sub) => sub.status === "active" || sub.status === "trialing"
    );


    const subscriptionsWithInvoice = await Promise.all(
        subscriptions.map(async (sub) => {
            if (sub.latest_invoice && stripe) {
                try {
                    const invoice = await stripe.invoices.retrieve(sub.latest_invoice as string);
                    return {
                        ...sub,
                        invoice_pdf_url: invoice.invoice_pdf,
                        hosted_invoice_url: invoice.hosted_invoice_url,
                    };
                } catch (error) {
                    console.error("Error fetching invoice for subscription", sub.id, error);
                    return sub;
                }
            }
            return sub;
        })
    );
    console.log(subscriptions)
    return NextResponse.json(
        hasPurchased ? "lifetime" : subscriptionsWithInvoice[0] || null,
        { status: 200 }
    );
}
