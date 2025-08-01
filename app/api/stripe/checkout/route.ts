import connectMongo from "@/db/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import { stripe } from "@/lib/stripe";
import { IUser, User } from "@/model/user";
import { server } from "@/url";

export async function POST(req: NextRequest) {
    const { priceId, type }: { priceId: string, type: 'subscription' | 'payment' } = await req.json();

    if (!priceId) {
        return NextResponse.json('Missing price ID', { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json('Unauthorized', { status: 401 });
    }

    await connectMongo();

    if (!stripe) {
        return NextResponse.json('Please try again later', { status: 500 });
    }

    try {
        const user: IUser | null = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json('User not found', { status: 404 });
        }

        if (!user.stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: session.user.email,
            });
            user.stripeCustomerId = customer.id;
            await user.save();
        }

        const price = await stripe.prices.retrieve(priceId);
        console.log(price.recurring);

        const checkout = await stripe.checkout.sessions.create({
            mode: type,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            customer: user.stripeCustomerId,
            success_url: `${server}/dashboard`,
            cancel_url: `${server}/`,
        });

        return NextResponse.json(checkout.url, { status: 200 });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
