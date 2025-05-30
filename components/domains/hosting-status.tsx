import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle2, AlertCircle, RefreshCw, Loader2 } from "lucide-react"
import { useHosting } from "@/lib/hooks/use-hosting"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

export function HostingStatus({ siteId }: { siteId: string }) {
  const { metrics, isLoading, isDeploying, refreshStatus, triggerDeployment } = useHosting({ siteId })

  useEffect(() => {
    refreshStatus()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle>Hosting Status</CardTitle>
          <CardDescription>
            Monitor your site's hosting and deployment status
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshStatus}
          disabled={isLoading}
        >
          <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : metrics ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {metrics.status === "online" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : metrics.status === "deploying" ? (
                  <RefreshCw className="h-5 w-5 text-yellow-500 animate-spin" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium">
                  Status: {metrics.status.charAt(0).toUpperCase() + metrics.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Last Deployment</span>
                <span className="font-medium">{metrics.lastDeployment}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Uptime</span>
                <span className="font-medium">{metrics.uptime}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Response Time</span>
                <span className="font-medium">{metrics.responseTime}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium text-sm">
                  {new Date(metrics.lastUpdated).toLocaleTimeString()}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                className="w-full" 
                onClick={triggerDeployment}
                disabled={isDeploying || metrics.status === "deploying"}
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  "Trigger Deployment"
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">Failed to load hosting status</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 