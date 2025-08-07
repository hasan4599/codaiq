import connectMongo from '@/db/mongoose';
import { IUser, User } from '@/model/user';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


export async function POST(req: NextRequest) {
    const { email } = await req.json();
    const code = generateCode(6);

    await connectMongo();

    const existingUser: IUser | null = await User.findOneAndUpdate(
        { email: email },
        { tokens: code },
        { new: true }
    )

    if (!existingUser) {
        await User.create({ email: email, tokens: code, role: 'user' })
    }

    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOSTNAME,
        port: Number(process.env.MAIL_PORT),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    try {

        await transport.verify();
        const emailText = `
            <html>
                <body>
                    <p><strong>Verification Code: ${code}</strong></p>
                </body>
            </html>`;

        const mailOptions: Mail.Options = {
            from: process.env.MAIL_USER,
            to: email,
            subject: `Verification Code`,
            html: emailText
        };

        await transport.sendMail(mailOptions);

        return NextResponse.json('Email sent', { status: 200 });
    } catch (err) {
        console.error(err);

        return NextResponse.json('Please try again later', { status: 400 });
    }
}

function generateCode(length: any) {
    const characters = '0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }

    return token;
}