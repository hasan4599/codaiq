import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PlusCircle, Globe, Trash2, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { useDomains } from "@/lib/hooks/use-domains"
import { cn } from "@/lib/utils"

export function DomainsList({ siteId }: { siteId: string }) {
  const { domains, isLoading, isAdding, isRemoving, addDomain, removeDomain, refreshDomains } = useDomains({ siteId })
  const [newDomain, setNewDomain] = useState("")
  const [isAddingOpen, setIsAddingOpen] = useState(false)

  useEffect(() => {
    refreshDomains()
  }, [])

  const handleAddDomain = async () => {
    if (!newDomain) return
    
    const success = await addDomain(newDomain)
    if (success) {
      setNewDomain("")
      setIsAddingOpen(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle>Custom Domains</CardTitle>
          <CardDescription>
            Add and manage custom domains for your site
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshDomains}
          disabled={isLoading}
        >
          <Loader2 className={cn("h-4 w-4", isLoading && "animate-spin")} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : domains.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Globe className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No domains added</h3>
              <p className="text-muted-foreground mt-2">
                Add a custom domain to make your site accessible from your own URL.
              </p>
            </div>
          ) : (
            domains.map((domain) => (
              <div
                key={domain.id}
                className="flex items-center justify-between p-2 rounded-lg border"
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>{domain.domain}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    domain.status === "active" 
                      ? "bg-green-100 text-green-700"
                      : domain.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {domain.status}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDomain(domain.id)}
                  disabled={isRemoving === domain.id}
                >
                  {isRemoving === domain.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))
          )}

          {isAddingOpen ? (
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter domain (e.g., example.com)"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                className="flex-1"
                disabled={isAdding}
              />
              <Button 
                onClick={handleAddDomain}
                disabled={isAdding || !newDomain}
              >
                {isAdding ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Add"
                )}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setIsAddingOpen(false)
                  setNewDomain("")
                }}
                disabled={isAdding}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsAddingOpen(true)}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Custom Domain
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 