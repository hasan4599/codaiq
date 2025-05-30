import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prisma from '@/lib/prisma';
import { SiteConfig } from '@/lib/store/editorStore';

export async function GET(
  request: Request,
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
      },
      include: {
        config: true,
      },
    });

    if (!site) {
      return new NextResponse('Site not found', { status: 404 });
    }

    if (site.ownerId !== userId) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    return NextResponse.json(site.config || getDefaultConfig());
  } catch (error) {
    console.error('[SITE_CONFIG_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { config } = body;

    if (!config) {
      return new NextResponse('Missing config', { status: 400 });
    }

    const site = await prisma.site.findUnique({
      where: {
        id: params.siteId,
      },
    });

    if (!site) {
      return new NextResponse('Site not found', { status: 404 });
    }

    if (site.ownerId !== userId) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const updatedSite = await prisma.site.update({
      where: {
        id: params.siteId,
      },
      data: {
        config: config,
      },
    });

    return NextResponse.json(updatedSite.config);
  } catch (error) {
    console.error('[SITE_CONFIG_PUT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

function getDefaultConfig(): SiteConfig {
  return {
    theme: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        background: '#FFFFFF',
        text: '#1F2937',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
    },
    components: [],
    sections: [],
    meta: {
      title: 'New Site',
      description: 'Created with CodaIQ',
    },
  };
} 