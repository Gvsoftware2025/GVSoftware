import { createClient } from "./supabase"

export interface FeaturedProjectConfig {
  id: string
  project_id: string
  display_order: number
  custom_title?: string
  custom_description?: string
  highlight_badge?: string
  created_at?: string
  updated_at?: string
}

export async function getFeaturedProjectsConfig(): Promise<FeaturedProjectConfig[]> {
  try {
    const client = createClient()
    const { data, error } = await client
      .from("featured_projects_config")
      .select("*")
      .order("display_order", { ascending: true })

    if (error) {
      console.error("Erro ao buscar configuração de projetos em destaque:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Erro ao buscar configuração de projetos em destaque:", error)
    return []
  }
}

export async function addFeaturedProject(projectId: string): Promise<{
  data: FeaturedProjectConfig | null
  error: any
}> {
  try {
    const client = createClient()

    const { data: existingConfigs } = await client
      .from("featured_projects_config")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1)

    const newOrder = existingConfigs && existingConfigs.length > 0 ? existingConfigs[0].display_order + 1 : 1

    const { data, error } = await client
      .from("featured_projects_config")
      .insert([
        {
          project_id: projectId,
          display_order: newOrder,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Erro ao adicionar projeto em destaque:", error)
    return { data: null, error }
  }
}

export async function removeFeaturedProject(id: string): Promise<{ error: any }> {
  try {
    const client = createClient()
    const { error } = await client.from("featured_projects_config").delete().eq("id", id)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error("Erro ao remover projeto em destaque:", error)
    return { error }
  }
}

export async function moveFeaturedUp(id: string): Promise<{ error: any }> {
  try {
    const client = createClient()

    const { data: currentConfig, error: fetchError } = await client
      .from("featured_projects_config")
      .select("*")
      .eq("id", id)
      .single()

    if (fetchError || !currentConfig) throw fetchError

    const { data: previousConfig, error: prevError } = await client
      .from("featured_projects_config")
      .select("*")
      .lt("display_order", currentConfig.display_order)
      .order("display_order", { ascending: false })
      .limit(1)
      .single()

    if (prevError || !previousConfig) {
      return { error: "Não há item acima" }
    }

    await client
      .from("featured_projects_config")
      .update({ display_order: previousConfig.display_order })
      .eq("id", currentConfig.id)

    await client
      .from("featured_projects_config")
      .update({ display_order: currentConfig.display_order })
      .eq("id", previousConfig.id)

    return { error: null }
  } catch (error) {
    console.error("Erro ao mover projeto para cima:", error)
    return { error }
  }
}

export async function moveFeaturedDown(id: string): Promise<{ error: any }> {
  try {
    const client = createClient()

    const { data: currentConfig, error: fetchError } = await client
      .from("featured_projects_config")
      .select("*")
      .eq("id", id)
      .single()

    if (fetchError || !currentConfig) throw fetchError

    const { data: nextConfig, error: nextError } = await client
      .from("featured_projects_config")
      .select("*")
      .gt("display_order", currentConfig.display_order)
      .order("display_order", { ascending: true })
      .limit(1)
      .single()

    if (nextError || !nextConfig) {
      return { error: "Não há item abaixo" }
    }

    await client
      .from("featured_projects_config")
      .update({ display_order: nextConfig.display_order })
      .eq("id", currentConfig.id)

    await client
      .from("featured_projects_config")
      .update({ display_order: currentConfig.display_order })
      .eq("id", nextConfig.id)

    return { error: null }
  } catch (error) {
    console.error("Erro ao mover projeto para baixo:", error)
    return { error }
  }
}

export async function updateFeaturedProjectConfig(
  id: string,
  config: Partial<Omit<FeaturedProjectConfig, "id" | "created_at" | "updated_at">>,
): Promise<{
  data: FeaturedProjectConfig | null
  error: any
}> {
  try {
    const client = createClient()
    const { data, error } = await client
      .from("featured_projects_config")
      .update({
        ...config,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Erro ao atualizar configuração:", error)
    return { data: null, error }
  }
}
