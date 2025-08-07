import connectMongo from '@/db/mongoose';
import { IUser, User } from '@/model/user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        await connectMongo();

        const existingUser: IUser | null = await User.findOne({ email });

        if (!existingUser) {
            return NextResponse.json({ error: 'Invalid user' }, { status: 404 });
        }

        existingUser.tokens = '';
        await existingUser.save();

        return NextResponse.json({ message: 'Done' }, { status: 200 });

    } catch (error) {
        console.error('Error clearing tokens:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
