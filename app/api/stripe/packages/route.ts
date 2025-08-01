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

    if (!stripe) {
        return NextResponse.json({ error: "Please try again later" }, { status: 500 });
    }

    const selectedUser: IUser | null = await User.findOne({ email: session.user.email });

    if (!selectedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const products = await stripe.products.list();
    
    // Fetch all prices for each product
    const enrichedProducts = await Promise.all(products.data.map(async (product) => {
        const prices = await stripe?.prices.list({ product: product.id });

        return {
            ...product,
            prices: prices?.data,
        };
    }));

    return NextResponse.json(enrichedProducts, { status: 200 });
}

