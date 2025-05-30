import { useState } from "react"
import { toast } from "sonner"

export interface Domain {
  id: string
  domain: string
  status: "pending" | "active" | "error"
  createdAt: string
  updatedAt: string
}

interface UseDomainOptions {
  siteId: string
}

export function useDomains({ siteId }: UseDomainOptions) {
  const [domains, setDomains] = useState<Domain[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [isRemoving, setIsRemoving] = useState<string | null>(null)

  const addDomain = async (domain: string) => {
    try {
      setIsAdding(true)
      // TODO: Replace with actual API call
      const response = await new Promise<Domain>((resolve) => {
        setTimeout(() => {
          resolve({
            id: Date.now().toString(),
            domain,
            status: "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        }, 1000)
      })

      setDomains((prev) => [...prev, response])
      toast.success("Domain added successfully")
      return true
    } catch (error) {
      toast.error("Failed to add domain")
      return false
    } finally {
      setIsAdding(false)
    }
  }

  const removeDomain = async (domainId: string) => {
    try {
      setIsRemoving(domainId)
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setDomains((prev) => prev.filter((d) => d.id !== domainId))
      toast.success("Domain removed successfully")
    } catch (error) {
      toast.error("Failed to remove domain")
    } finally {
      setIsRemoving(null)
    }
  }

  const refreshDomains = async () => {
    try {
      setIsLoading(true)
      // TODO: Replace with actual API call
      const response = await new Promise<Domain[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: "1",
              domain: "example.com",
              status: "active",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ])
        }, 1000)
      })

      setDomains(response)
    } catch (error) {
      toast.error("Failed to load domains")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    domains,
    isLoading,
    isAdding,
    isRemoving,
    addDomain,
    removeDomain,
    refreshDomains,
  }
} 