import connectMongo from '@/db/mongoose';
import { IUser, User } from '@/model/user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    await connectMongo();

    const existingUser: IUser | null = await User.findOne({ email: email })

    if (!existingUser) {
        return NextResponse.json('User not found', { status: 200 });
    } else if (!existingUser.password) {
        return NextResponse.json('User not found', { status: 200 });
    } else {
        return NextResponse.json('account already exists', { status: 500 });
    }
}