import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db"

export async function DELETE(
  req: Request,
  { params }: { params: { siteId: string; domainId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Verify domain belongs to site
    const domain = await db.domain.findFirst({
      where: {
        id: params.domainId,
        siteId: params.siteId,
      },
    })

    if (!domain) {
      return new NextResponse("Domain not found", { status: 404 })
    }

    // Delete domain
    await db.domain.delete({
      where: {
        id: params.domainId,
      },
    })

    // TODO: Clean up DNS records and other domain-related resources

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[DOMAIN_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 