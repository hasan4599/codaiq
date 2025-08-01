import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/db/mongoose";
import { IUser, User } from "@/model/user";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
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

    const subscriptions = await stripe.subscriptions.list({
        customer: selectedUser.stripeCustomerId,
        status: "all",
        expand: ["data.default_payment_method"],
    });


    return NextResponse.json(subscriptions, { status: 200 });
}
