import { getStats } from "@/lib/supabase-stats"
import { getFeaturedProjectsConfig } from "@/lib/supabase-featured"
import HomePageClient from "@/components/home-page-client"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function HomePage() {
  const stats = await getStats()
  const featuredProjects = await getFeaturedProjectsConfig()

  return <HomePageClient stats={stats} featuredProjects={featuredProjects} />
}
