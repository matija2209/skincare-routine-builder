import { cn } from "@/lib/utils"

import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"

interface ContractPreviewProps {
  formData: Record<string, any>
  className?: string
}

export function ContractPreview({ formData, className }: ContractPreviewProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, Math.random() * 2000 + 1000) // Random time between 1000-3000ms

    return () => clearTimeout(timeout)
  }, [])

  if (isLoading) {
    return (
      <div className={cn("bg-white rounded-lg shadow-sm border", className)}>
        <div className="p-8 space-y-6">
          {/* Header Skeleton */}
          <div className="text-center border-b pb-4 space-y-4">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-40 mx-auto mb-4" />
          </div>

          {/* Contract Body Skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-4 w-48" />
            
            {/* BETWEEN Section */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-72" />
              <Skeleton className="h-4 w-64" />
            </div>

            {/* AND Section */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-72" />
              <Skeleton className="h-4 w-64" />
            </div>

            {/* Agreement Details Section */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <div className="bg-gray-50 p-4 rounded space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>

            {/* Footer Skeleton */}
            <div className="border-t pt-4 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border", className)}>
      <div className="p-8 space-y-6 font-serif">
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900">CONTRACT AGREEMENT</h1>
          <p className="text-gray-500">Reference: {Math.random().toString(36).substring(7).toUpperCase()}</p>
        </div>

        {/* Contract Body */}
        <div className="space-y-4">
          <p className="text-sm text-gray-600">This agreement is made on {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">BETWEEN:</h2>
            <p className="text-sm">
              <span className="font-semibold">Company Name:</span> Demo Corp Ltd.
            </p>
            <p className="text-sm">
              <span className="font-semibold">Address:</span> 123 Business Street, Suite 100
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">AND:</h2>
            <p className="text-sm">
              <span className="font-semibold">Client Name:</span> {formData.firstName} {formData.lastName}
            </p>
            {formData.email && (
              <p className="text-sm">
                <span className="font-semibold">Email:</span> {formData.email}
              </p>
            )}
          </div>

          {/* Form Data Display */}
          <div className="mt-6 space-y-2">
            <h2 className="text-lg font-semibold">Agreement Details:</h2>
            <div className="bg-gray-50 p-4 rounded text-sm">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="py-1">
                  <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>{' '}
                  <span className="text-gray-600">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t text-xs text-gray-500">
            <p>This is a system-generated document for demonstration purposes only.</p>
            <p>Generated on: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 