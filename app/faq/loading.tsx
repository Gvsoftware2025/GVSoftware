import { CardContent } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6 bg-slate-800" />
          <Skeleton className="h-10 w-3/4 mx-auto mb-4 bg-slate-800" />
          <Skeleton className="h-6 w-1/2 mx-auto bg-slate-800" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="max-w-2xl mx-auto mt-12 mb-16">
          <Skeleton className="h-12 w-full rounded-xl bg-slate-800" />
        </div>

        {/* FAQ Categories Skeleton */}
        <div className="max-w-6xl mx-auto">
          {[...Array(3)].map((_, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="flex items-center space-x-4 mb-8">
                <Skeleton className="w-12 h-12 rounded-xl bg-slate-800" />
                <Skeleton className="h-8 w-1/4 bg-slate-800" />
              </div>

              <div className="grid gap-6">
                {[...Array(3)].map((_, faqIndex) => (
                  <Card key={faqIndex} className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="cursor-pointer">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-3/4 bg-slate-700" />
                        <Skeleton className="w-5 h-5 rounded-full bg-slate-700" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Skeleton className="h-4 w-full mb-2 bg-slate-700" />
                      <Skeleton className="h-4 w-5/6 bg-slate-700" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA Skeleton */}
        <div className="container mx-auto mt-16">
          <Card className="bg-slate-800/50 border-slate-700 max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6 bg-slate-700" />
              <Skeleton className="h-8 w-2/3 mx-auto mb-4 bg-slate-700" />
              <Skeleton className="h-6 w-1/2 mx-auto mb-8 bg-slate-700" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Skeleton className="h-12 w-40 rounded-full bg-slate-700" />
                <Skeleton className="h-12 w-40 rounded-full bg-slate-700" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
