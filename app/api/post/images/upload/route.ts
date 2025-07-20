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
  return NextResponse.json(result, { status: res.status });
}
