import { stripe } from "@/components/tools/stripe";
import connectMongo from "@/db/mongoose";
import Crates from "@/model/crates";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {
        name,
        description,
        price,
        currency,
        trial_days,
        interval_count,
        recurring,
        theme,
        image,
        metadata
    } = await req.json();
    
    await connectMongo();
    if (!stripe) return NextResponse.json('please try again later', { status: 500 });

    try {
        const product = await stripe.products.create({
            name: name,
            description: description,
        });

        const priceInCents = (100 * Number(price));

        const isPrice = await stripe.prices.create({
            unit_amount: priceInCents,
            currency: currency,
            recurring: { interval: 'month' },
            product: product.id,
        });

        const newCrate = await new Crates({
            name: name,
            description: description,
            price: price,
            currency: currency,
            trial_days: trial_days,
            interval_count: interval_count,
            recurring: recurring,
            theme: theme,
            image: image,
            productId: product.id,
            priceId: isPrice.id,
            metadata: metadata
        });
        await newCrate.save();
        return NextResponse.json('done', { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}