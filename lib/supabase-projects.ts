import { createClient } from "./supabase"

export interface Project {
  id: string
  title: string
  description: string
  long_description?: string
  category: string
  technologies: string[]
  image_url: string
  project_url?: string
  github_url?: string
  status: "completed" | "in-progress" | "planned"
  featured: boolean
  client_name?: string
  completion_date?: string
  created_at?: string
  updated_at?: string
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const client = createClient()
    const { data, error } = await client.from("projects").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar projetos:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Erro ao buscar projetos:", error)
    return []
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const client = createClient()
    const { data, error } = await client.from("projects").select("*").eq("id", id).single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Erro ao buscar projeto:", error)
    return null
  }
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  try {
    const client = createClient()
    const { data, error } = await client
      .from("projects")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Erro ao buscar projetos por categoria:", error)
    return []
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const client = createClient()
    const { data, error } = await client
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(6)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Erro ao buscar projetos em destaque:", error)
    return []
  }
}

export async function createProject(project: Omit<Project, "id" | "created_at" | "updated_at">): Promise<{
  data: Project | null
  error: any
}> {
  try {
    const client = createClient()
    const { data, error } = await client.from("projects").insert([project]).select().single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Erro ao criar projeto:", error)
    return { data: null, error }
  }
}

export async function updateProject(
  id: string,
  project: Partial<Omit<Project, "id" | "created_at" | "updated_at">>,
): Promise<{
  data: Project | null
  error: any
}> {
  try {
    const client = createClient()
    const { data, error } = await client
      .from("projects")
      .update({
        ...project,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error)
    return { data: null, error }
  }
}

export async function deleteProject(id: string): Promise<{ error: any }> {
  try {
    const client = createClient()
    const { error } = await client.from("projects").delete().eq("id", id)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error("Erro ao deletar projeto:", error)
    return { error }
  }
}

export async function toggleFeatured(
  id: string,
  featured: boolean,
): Promise<{
  data: Project | null
  error: any
}> {
  try {
    const client = createClient()
    const { data, error } = await client.from("projects").update({ featured }).eq("id", id).select().single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Erro ao atualizar destaque:", error)
    return { data: null, error }
  }
}
