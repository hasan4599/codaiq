import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import connectMongo from "@/db/mongoose";
import Site, { ISite } from "@/model/site";
import { IUser, User } from "@/model/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session: any = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  await connectMongo();
  const url = new URL(req.url);
  const siteId = url.searchParams.get("id");

  if (siteId) {
    const site: ISite | null = await Site.findById(siteId);
    if (!site) return NextResponse.json("Site not found", { status: 404 });
    return NextResponse.json(site, { status: 200 });
  }

  // Fallback: fetch all user sites
  const user: IUser | null = await User.findById(session.user.id);
  const sites: ISite[] = [];

  if (user) {
    for (let index = 0; index < user.site.length; index++) {
      const selectedSite: ISite | null = await Site.findById(user.site[index].id);
      if (selectedSite) {
        sites.push(selectedSite);
      }
    }
  }

  return NextResponse.json(sites, { status: 200 });
}
