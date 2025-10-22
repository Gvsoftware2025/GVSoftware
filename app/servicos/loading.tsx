import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section Skeleton */}
        <section className="text-center mb-12">
          <Skeleton className="w-16 h-16 rounded-full mx-auto mb-8 bg-slate-800" />
          <Skeleton className="h-10 w-3/4 mx-auto mb-6 bg-slate-800" />
          <Skeleton className="h-6 w-1/2 mx-auto bg-slate-800" />
        </section>

        {/* Services Grid Skeleton */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8">
                  <Skeleton className="w-12 h-12 rounded-xl mb-6 bg-slate-700" />
                  <Skeleton className="h-8 w-3/4 mb-4 bg-slate-700" />
                  <Skeleton className="h-4 w-full mb-6 bg-slate-700" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-5/6 bg-slate-700" />
                    <Skeleton className="h-4 w-4/5 bg-slate-700" />
                    <Skeleton className="h-4 w-3/4 bg-slate-700" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section Skeleton */}
        <section className="py-16">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-1/2 mx-auto mb-4 bg-slate-800" />
            <Skeleton className="h-6 w-1/3 mx-auto bg-slate-800" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700 text-center">
                <CardContent className="p-8">
                  <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6 bg-slate-700" />
                  <Skeleton className="h-8 w-2/3 mx-auto mb-4 bg-slate-700" />
                  <Skeleton className="h-4 w-full mx-auto bg-slate-700" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ CTA Skeleton */}
        <section className="py-16">
          <Card className="bg-slate-800/50 border-slate-700 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0 bg-slate-700" />
                <div className="flex-1">
                  <Skeleton className="h-8 w-3/4 mb-3 bg-slate-700" />
                  <Skeleton className="h-4 w-full mb-6 bg-slate-700" />
                  <Skeleton className="h-10 w-1/3 rounded-full bg-slate-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
