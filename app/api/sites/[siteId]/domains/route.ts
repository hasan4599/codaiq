import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db"
import { z } from "zod"

const domainSchema = z.object({
  domain: z.string().min(1).refine((domain) => {
    // Basic domain validation regex
    const pattern = /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    return pattern.test(domain)
  }, "Invalid domain format"),
})

export async function GET(
  req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const domains = await db.domain.findMany({
      where: {
        siteId: params.siteId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(domains)
  } catch (error) {
    console.error("[DOMAINS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const validatedData = domainSchema.parse(json)

    // Check if domain already exists
    const existingDomain = await db.domain.findFirst({
      where: {
        domain: validatedData.domain,
      },
    })

    if (existingDomain) {
      return new NextResponse("Domain already exists", { status: 400 })
    }

    const domain = await db.domain.create({
      data: {
        domain: validatedData.domain,
        siteId: params.siteId,
        status: "pending",
      },
    })

    // TODO: Trigger domain verification process
    // This could be a background job that:
    // 1. Verifies domain ownership
    // 2. Sets up DNS records
    // 3. Updates status accordingly

    return NextResponse.json(domain)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid domain format", { status: 400 })
    }

    console.error("[DOMAINS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 