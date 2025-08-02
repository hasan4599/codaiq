import connectMongo from "@/db/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import { stripe } from "@/lib/stripe";
import { IUser, User } from "@/model/user";
import { server } from "@/url";

export async function POST(req: NextRequest) {
    const { priceId, type }: { priceId: string; type: "subscription" | "payment" } = await req.json();

    if (!priceId) {
        return NextResponse.json("Missing price ID", { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectMongo();

    if (!stripe) {
        return NextResponse.json("Please try again later", { status: 500 });
    }

    try {
        const user: IUser | null = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json("User not found", { status: 404 });
        }

        // Create customer if not exists
        if (!user.stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: session.user.email,
            });
            user.stripeCustomerId = customer.id;
            await user.save();
        }

        // Prevent multiple subscriptions
        if (type === "subscription") {
            // ✅ Check active subscriptions
            const allSubscriptions = await stripe.subscriptions.list({
                customer: user.stripeCustomerId,
                status: "all",
                expand: ["data.default_payment_method"],
            });

            // Filter only active or trialing subscriptions
            const subscriptions = allSubscriptions.data.filter(
                (sub) => sub.status === "active" || sub.status === "trialing"
            );

            if (subscriptions.length > 0) {
                return NextResponse.json("You already have an active subscription", { status: 200 });
            }
        }

        // Prevent multiple one-time purchases (based on charges or custom logic)
        if (type === "payment") {
            const sessions = await stripe.checkout.sessions.list({
                customer: user.stripeCustomerId,
                limit: 100,
            });

            for (const session of sessions.data) {
                if (session.payment_status === 'paid') {
                    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
                    const alreadyBought = lineItems.data.some(item => item.price?.id === priceId);

                    if (alreadyBought) {
                        return NextResponse.json("You already purchased this item", { status: 200 });
                    }
                }
            }
        }

        const checkoutParams: any = {
            mode: type,
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            customer: user.stripeCustomerId,
            success_url: `${server}/dashboard`,
            cancel_url: `${server}/`,
        };

        if (type === "subscription") {
            checkoutParams.subscription_data = {
                trial_period_days: 7,
            };
        }

        const checkout = await stripe.checkout.sessions.create(checkoutParams);

        return NextResponse.json(checkout.url, { status: 200 });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
