import { createClient } from "./supabase"

export interface SiteStats {
  id?: string
  total_projects: number
  active_clients: number
  years_experience: number
  satisfaction_rate: number
  created_at?: string
  updated_at?: string
}

export async function getStats(): Promise<SiteStats> {
  try {
    const client = createClient()
    const { data, error } = await client.from("site_stats").select("*").eq("id", 1).maybeSingle()

    if (error) {
      console.error("Erro ao buscar estatísticas:", error)
      return {
        total_projects: 50,
        active_clients: 30,
        years_experience: 5,
        satisfaction_rate: 98,
      }
    }

    if (!data) {
      return {
        total_projects: 50,
        active_clients: 30,
        years_experience: 5,
        satisfaction_rate: 98,
      }
    }

    return data
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error)
    return {
      total_projects: 50,
      active_clients: 30,
      years_experience: 5,
      satisfaction_rate: 98,
    }
  }
}

export async function updateStats(stats: Omit<SiteStats, "id" | "created_at" | "updated_at">): Promise<{
  data: SiteStats | null
  error: any
}> {
  try {
    const client = createClient()
    const { data, error } = await client
      .from("site_stats")
      .update({
        ...stats,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Erro ao atualizar estatísticas:", error)
    return { data: null, error }
  }
}

export async function createStats(stats: Omit<SiteStats, "id" | "created_at" | "updated_at">): Promise<{
  data: SiteStats | null
  error: any
}> {
  try {
    const client = createClient()
    const { data, error } = await client
      .from("site_stats")
      .insert([
        {
          id: 1,
          ...stats,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Erro ao criar estatísticas:", error)
    return { data: null, error }
  }
}
