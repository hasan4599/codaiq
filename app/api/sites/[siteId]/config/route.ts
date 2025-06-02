import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
  req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const site = await prisma.site.findUnique({
      where: {
        id: params.siteId,
        userId,
      },
      include: {
        config: true,
      },
    });

    if (!site) {
      return new NextResponse('Site not found', { status: 404 });
    }

    // If no config exists, create one with default settings
    if (!site.config) {
      const config = await prisma.siteConfig.create({
        data: {
          siteId: site.id,
          content: defaultConfig,
        },
      });
      return NextResponse.json({ id: site.id, name: site.name, ...config.content });
    }

    // Return existing config
    return NextResponse.json({ id: site.id, name: site.name, ...site.config.content });
  } catch (error) {
    console.error('[SITE_CONFIG_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { config } = await req.json();

    const site = await prisma.site.findUnique({
      where: {
        id: params.siteId,
        userId,
      },
      include: {
        config: true,
      },
    });

    if (!site) {
      return new NextResponse('Site not found', { status: 404 });
    }

    // Update or create config
    const updatedConfig = await prisma.siteConfig.upsert({
      where: {
        siteId: site.id,
      },
      create: {
        siteId: site.id,
        content: config,
      },
      update: {
        content: config,
      },
    });

    return NextResponse.json(updatedConfig);
  } catch (error) {
    console.error('[SITE_CONFIG_PUT]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}