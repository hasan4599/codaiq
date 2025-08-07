import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import connectMongo from '@/db/mongoose';
import { User } from '@/model/user';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
const CLOUDFLARE_TOKEN = process.env.CLOUDFLARE_API_TOKEN2!;

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  const session: any = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json('Unauthorized', { status: 401 });
  };

  await connectMongo();
  const id = session.user.id;


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

  const imagePath = result.result.variants[0];
  
  const user = await User.findByIdAndUpdate(
    id,
    {
      $push: { images: imagePath }
    },
    { new: true }
  );

  return NextResponse.json(result, { status: res.status });
}
