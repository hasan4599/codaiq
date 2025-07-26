import Site, { ISite } from "@/model/site";
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/db/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { IUser, User } from "@/model/user";
import { removeFromNginxMap } from "@/server/nginx.conf";
import { execCommand } from "@/server/devNextApp";

export async function POST(req: NextRequest) {
    try {
        const session: any = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            console.warn("Unauthorized access attempt.");
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const { id } = await req.json();
        await connectMongo();

        const selectedSite: ISite | null = await Site.findById(id);
        if (!selectedSite) {
            console.warn(`Site not found with id: ${id}`);
            return NextResponse.json({ error: "Site not found" }, { status: 404 });
        }

        const selectedUser: IUser | null = await User.findOne({ email: session.user.email });

        if (selectedUser) {
            const beforeCount = selectedUser.site.length;
            selectedUser.site = selectedUser.site.filter(
                (i) => i.id !== selectedSite._id
            );
            const afterCount = selectedUser.site.length;

            if (beforeCount !== afterCount) {
                console.log(`Removed site ${selectedSite._id} from user ${selectedUser.email}`);
            } else {
                console.warn(`Site ${selectedSite._id} was not found in user's site list`);
            }

            await selectedUser.save();
        } else {
            console.warn(`No user found with email: ${session.user.email}`);
        }
        await removeFromNginxMap(selectedSite.title);
        await execCommand("nginx -t && systemctl reload nginx");
        // Now delete the site itself
        await Site.findByIdAndDelete(id);

        return NextResponse.json("deleted?", { status: 200 });
    } catch (err) {
        console.error("Server error during site deletion:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
