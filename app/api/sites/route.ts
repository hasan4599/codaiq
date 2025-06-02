import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

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

// Default theme configuration
const defaultConfig = {
  theme: {
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      background: '#FFFFFF',
      text: '#1F2937',
      accent: '#F59E0B',
      muted: '#6B7280',
      surface: '#F3F4F6',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      baseSize: '16px',
      scaleRatio: 1.25,
    },
    spacing: {
      base: '1rem',
      scale: 1.5,
      container: {
        padding: '1rem',
        maxWidth: '80rem',
      },
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  components: []
};

export async function GET(
  request: Request
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const sites = await prisma.site.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        config: true,
      },
    });

    return NextResponse.json(sites);
  } catch (error) {
    console.error('[SITES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(
  request: Request,
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { name, description } = createSiteSchema.parse(body);

    const site = await prisma.site.create({
      data: {
        name,
        description,
        userId,
        config: {
          create: {
            content: {
              theme: {
                colors: {
                  primary: '#3B82F6',
                  secondary: '#10B981',
                  background: '#FFFFFF',
                  text: '#1F2937',
                  accent: '#F59E0B',
                  muted: '#6B7280',
                  surface: '#F3F4F6',
                },
                typography: {
                  headingFont: 'Inter',
                  bodyFont: 'Inter',
                  baseSize: '16px',
                  scaleRatio: 1.25,
                },
                spacing: {
                  base: '1rem',
                  scale: 1.5,
                  container: {
                    padding: '1rem',
                    maxWidth: '80rem',
                  },
                },
                breakpoints: {
                  sm: '640px',
                  md: '768px',
                  lg: '1024px',
                  xl: '1280px',
                },
              },
              components: []
            }
          },
        },
      },
      include: {
        config: true,
      },
    });

    return NextResponse.json(site);
  } catch (error) {
    console.error('[SITES_POST]', error);
    if (error instanceof z.ZodError) {
      return new NextResponse(`Validation error: ${error.errors[0].message}`, { status: 400 });
    }
    return new NextResponse('Internal Error', { status: 500 });
  }
} 