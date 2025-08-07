import connectMongo from '@/db/mongoose';
import { IUser, User } from '@/model/user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { email, code } = await req.json();
    await connectMongo();

    const existingUser: IUser | null = await User.findOne({ email: email })

    if (!existingUser) {
        return NextResponse.json('User not found', { status: 400 });
    }

    if (existingUser) {
        if (existingUser.tokens === code) {
            return NextResponse.json('verified', { status: 200 });
        } else {
            return NextResponse.json('invalid code', { status: 500 });
        }
    }

}