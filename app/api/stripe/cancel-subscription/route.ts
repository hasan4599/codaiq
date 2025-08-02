import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import connectMongo from "@/db/mongoose";
import { stripe } from "@/lib/stripe";
import { IUser, User } from "@/model/user";

export async function POST(req: Request) {
    const body = await req.json();
    const { subscriptionId } = body;
    const session = await getServerSession(authOptions);
    await connectMongo();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!stripe) {
        return NextResponse.json({ error: "Please try again later" }, { status: 401 });
    }

    const selectedUser: IUser | null = await User.findOne({ email: session.user.email });

    if (!selectedUser) {
        return NextResponse.json({ error: "Please try again later" }, { status: 401 });
    }
    if (!subscriptionId) {
        return NextResponse.json({ error: "Subscription ID is required" }, { status: 400 });
    }

    if (!stripe) {
        return NextResponse.json({ error: "Please try again later" }, { status: 401 });
    }

    try {
        await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: true,
        });

        return NextResponse.json('done', { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
