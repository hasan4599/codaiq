import { Metadata } from "next"
import { DomainsList } from "@/components/domains/domains-list"
import { HostingStatus } from "@/components/domains/hosting-status"

export const metadata: Metadata = {
  title: "Domain Management",
  description: "Manage your site's domains and hosting settings",
}

export default async function DomainPage({
  params
}: {
  params: { siteId: string }
}) {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Domain Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your domains and view hosting status
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <DomainsList siteId={params.siteId} />
        </div>
        <div>
          <HostingStatus siteId={params.siteId} />
        </div>
      </div>
    </div>
  )
} 