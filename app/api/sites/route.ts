import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import prismadb from '@/lib/db';
import { Prisma, Site } from '@prisma/client';

// Validation schemas
const createSiteSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(500).optional(),
});

const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sort: z.enum(['name', 'createdAt', 'status']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().optional(),
  status: z.enum(['offline', 'online', 'deploying']).optional(),
});

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log('Attempting to fetch sites for user:', userId);

    // Check database connection
    try {
      await prismadb.$queryRaw`SELECT 1`;
      console.log('Database connection successful');
    } catch (error) {
      console.error('[DATABASE_CONNECTION_ERROR]', error);
      return new NextResponse('Database connection error', { status: 503 });
    }

    try {
      const sites = await prismadb.site.findMany({
        where: {
          ownerId: userId
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      console.log('Successfully fetched sites:', sites);
      return NextResponse.json(sites);
    } catch (error) {
      console.error('[SITES_QUERY_ERROR]', error);
      throw error;
    }
  } catch (error) {
    console.error('[SITES_GET]', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse(`Database error: ${error.message}`, { status: 500 });
    }
    return new NextResponse('Failed to fetch sites. Please try again later.', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    console.log('Received POST request with body:', body);
    
    try {
      const { name } = createSiteSchema.parse(body);
      console.log('Validated input name:', name);
      
      // Check database connection
      try {
        await prismadb.$queryRaw`SELECT 1`;
        console.log('Database connection successful');
      } catch (error) {
        console.error('[DATABASE_CONNECTION_ERROR]', error);
        return new NextResponse('Database connection error', { status: 503 });
      }

      // Create a base slug from the name
      const baseSlug = slugify(name);
      const timestamp = Date.now().toString(36);
      const uniqueSlug = `${baseSlug}-${timestamp}`;
      const siteId = `cuid_${Date.now()}`;
      const description = `${name} - Created with Codaiq`;

      console.log('Attempting to create site with:', {
        siteId,
        name,
        uniqueSlug,
        userId,
        description
      });

      try {
        // First try to fetch sites to verify database access
        const testQuery = await prismadb.site.findFirst({
          where: { ownerId: userId }
        });
        console.log('Test query successful:', testQuery);

        // Create site using Prisma client instead of raw SQL
        const site = await prismadb.site.create({
          data: {
            id: siteId,
            name,
            ownerId: userId,
            slug: uniqueSlug,
            status: "offline",
            description
          }
        });

        console.log('Successfully created site:', site);
        return NextResponse.json(site);
      } catch (error) {
        console.error('[SITE_CREATE_ERROR]', error);
        throw error;
      }
    } catch (error) {
      console.error('[VALIDATION_OR_CREATE_ERROR]', error);
      if (error instanceof z.ZodError) {
        return new NextResponse(`Validation error: ${error.errors[0].message}`, { status: 400 });
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return new NextResponse('A site with this slug already exists', { status: 409 });
        }
      }
      throw error;
    }
  } catch (error) {
    console.error('[SITES_POST]', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse(`Database error: ${error.message}`, { status: 500 });
    }
    return new NextResponse('Failed to create site. Please try again later.', { status: 500 });
  }
} 