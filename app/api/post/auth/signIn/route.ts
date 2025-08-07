import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'
import { IUser, User } from '@/model/user';
import connectMongo from '@/db/mongoose';


export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    await connectMongo();

    const selectedUser: IUser | null = await User.findOne({ email: email })

    if (selectedUser) {

        const checkPass = await bcrypt.compare(password, selectedUser.password);
        if (checkPass) {
            const token = generateCode(6);
            selectedUser.tokens = token
            await selectedUser.save();

            return NextResponse.json("verification code sent", { status: 200 });

        } else {
            return NextResponse.json('Password is invalid', { status: 500 });
        }
    } else {
        return NextResponse.json('Email is invalid', { status: 500 });
    }


}