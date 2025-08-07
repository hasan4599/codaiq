import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'
import sharp from 'sharp';
import { IUser, User } from '@/model/user';
import connectMongo from '@/db/mongoose';

export const config = {
    api: {
        bodyParser: false,
    },
};

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
const CLOUDFLARE_TOKEN = process.env.CLOUDFLARE_API_TOKEN2!;


export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const file = formData.get('file') as File;
    const resizedImageBuffer = await resizeImage(file);
    const imagePath = await UploadImage(resizedImageBuffer);

    await connectMongo();

    const hashedPassword = await bcrypt.hash(password, 12);


    const user: IUser | null = await User.findOneAndUpdate(
        { email }, // filter
        {
            $set: {
                fullName: username,
                password: hashedPassword,
                avatarUrl: imagePath
            }
        },
        { new: true } // return the updated user
    );

    return NextResponse.json('done', { status: 200 })
}

async function resizeImage(file: File): Promise<File> {
    const imageBuffer = await file.arrayBuffer();
    const sharpImage = sharp(imageBuffer);

    const resizedImageBuffer = await sharpImage
        .resize({ height: 800, kernel: sharp.kernel.lanczos3 })
        .webp({ quality: 80, force: true })
        .toBuffer();

    const resizedFile = new File(
        [resizedImageBuffer],
        file.name.replace(/\.[^/.]+$/, '') + '.webp', // change extension to .webp
        { type: 'image/webp' }
    );

    return resizedFile;
}

async function UploadImage(file: File) {
    const upstreamForm = new FormData();
    upstreamForm.append('file', file as Blob);
    upstreamForm.append('requireSignedURLs', 'false');

    const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${CLOUDFLARE_TOKEN}`,
            },
            body: upstreamForm,
        }
    );

    const result = await res.json();
    console.log(result)
    return result.result.variants[0]
}