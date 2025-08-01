import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { stripe } from "@/components/tools/stripe";
import connectMongo from "@/db/mongoose";
import Crates from "@/model/crates";
import User, { IUser } from "@/model/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const session_id = formData.get('session_id') as string;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json('Unauthorized', { status: 401 });
    };

    await connectMongo();
    if (!stripe) return NextResponse.json('please try again later', { status: 500 });

    try {
        const payment = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items.data.price.product"],
        });
        console.log(payment)
        const lineItem = payment.line_items?.data[0];

        if (!lineItem) {
            return NextResponse.json({ message: 'Invalid product' }, { status: 400 });
        }

        const priceId = lineItem?.price?.id;
        const productName = (lineItem?.price?.product as Stripe.Product)?.name;
        const currentUser: IUser | null = await User.findOne({ email: session.user.email });
        if (currentUser) {
            const verify = currentUser.stripeCustomerId === payment.customer;
            if (verify) {
                const findCrate = currentUser.crates.find((item) => item.priceId === priceId);

                if (!findCrate) {
                    const rawCategory = payment.metadata?.category || "";
                    const categoryArray = rawCategory.split(',').map(item => item.trim()).filter(Boolean);
                    await User.updateOne(
                        { email: session.user.email },
                        {
                            $push: {
                                crates: {
                                    stripeSubscriptionId: payment.subscription,
                                    stripeInvoiceId: payment.invoice,
                                    productName: productName,
                                    priceId: priceId,
                                    email: payment.customer_details?.email,
                                    amount: payment.amount_total,
                                    currency: payment.currency,
                                    status: payment.status,
                                    createdAt: new Date(payment.created * 1000),
                                    metaData: categoryArray,
                                }
                            }
                        }
                    );
                }
            }
        }

        return NextResponse.json('done', { status: 200 })
    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}