import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { generateUniqueSlug } from '@/lib/utils/slugify';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const sites = await prisma.site.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(sites);
  } catch (error) {
    console.error('Error fetching sites:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { name } = await request.json();

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    // Get existing slugs for this user
    const existingSites = await prisma.site.findMany({
      where: { ownerId: userId },
      select: { slug: true }
    });
    const existingSlugs = existingSites.map(site => site.slug);

    // Generate unique slug
    const slug = generateUniqueSlug(name, existingSlugs);

    const site = await prisma.site.create({
      data: {
        name,
        slug,
        ownerId: userId,
        thumbnailUrl: `/thumbnails/default.png` // Default thumbnail
      }
    });

    return NextResponse.json(site);
  } catch (error) {
    console.error('Error creating site:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 