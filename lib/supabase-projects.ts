import { createClient } from "./supabase"

export interface Project {
  id: number
  title: string
  description: string
  long_description?: string
  category: string
  technologies: string[]
  images: string[]
  features: string[]
  project_url?: string
  github_url?: string
  status: string
  featured: boolean
  show_project_button: boolean
  client: string
  created_at?: string
  updated_at?: string
}

async function getProjectWithRelations(projectId: number): Promise<Project | null> {
  const client = createClient()

  const { data: project, error: projectError } = await client.from("projects").select("*").eq("id", projectId).single()

  if (projectError || !project) return null

  const [imagesResult, techResult, featuresResult] = await Promise.all([
    client.from("project_images").select("image_url").eq("project_id", projectId).order("display_order"),
    client.from("project_technologies").select("technology").eq("project_id", projectId),
    client.from("project_features").select("feature").eq("project_id", projectId).order("display_order"),
  ])

  return {
    ...project,
    images: imagesResult.data?.map((img) => img.image_url) || [],
    technologies: techResult.data?.map((tech) => tech.technology) || [],
    features: featuresResult.data?.map((feat) => feat.feature) || [],
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const client = createClient()
    const { data: projects, error } = await client
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar projetos:", error)
      return []
    }

    if (!projects) return []

    const projectsWithRelations = await Promise.all(
      projects.map(async (project) => {
        const fullProject = await getProjectWithRelations(project.id)
        return fullProject || project
      }),
    )

    return projectsWithRelations
  } catch (error) {
    console.error("Erro ao buscar projetos:", error)
    return []
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    return await getProjectWithRelations(Number.parseInt(id))
  } catch (error) {
    console.error("Erro ao buscar projeto:", error)
    return null
  }
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  try {
    const client = createClient()
    const { data: projects, error } = await client
      .from("projects")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false })

    if (error) throw error
    if (!projects) return []

    const projectsWithRelations = await Promise.all(
      projects.map(async (project) => {
        const fullProject = await getProjectWithRelations(project.id)
        return fullProject || project
      }),
    )

    return projectsWithRelations
  } catch (error) {
    console.error("Erro ao buscar projetos por categoria:", error)
    return []
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const client = createClient()
    const { data: projects, error } = await client
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(6)

    if (error) throw error
    if (!projects) return []

    const projectsWithRelations = await Promise.all(
      projects.map(async (project) => {
        const fullProject = await getProjectWithRelations(project.id)
        return fullProject || project
      }),
    )

    return projectsWithRelations
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

    // Insert main project data
    const { data: newProject, error: projectError } = await client
      .from("projects")
      .insert([
        {
          title: project.title,
          description: project.description,
          long_description: project.long_description,
          category: project.category,
          status: project.status,
          client: project.client,
          featured: project.featured,
          show_project_button: project.show_project_button,
          project_url: project.project_url,
          github_url: project.github_url,
        },
      ])
      .select()
      .single()

    if (projectError) throw projectError
    if (!newProject) throw new Error("Failed to create project")

    // Insert images
    if (project.images && project.images.length > 0) {
      const imageInserts = project.images.map((url, index) => ({
        project_id: newProject.id,
        image_url: url,
        display_order: index + 1,
      }))

      const { error: imagesError } = await client.from("project_images").insert(imageInserts)
      if (imagesError) console.error("Error inserting images:", imagesError)
    }

    // Insert technologies
    if (project.technologies && project.technologies.length > 0) {
      const techInserts = project.technologies.map((tech) => ({
        project_id: newProject.id,
        technology: tech,
      }))

      const { error: techError } = await client.from("project_technologies").insert(techInserts)
      if (techError) console.error("Error inserting technologies:", techError)
    }

    // Insert features
    if (project.features && project.features.length > 0) {
      const featureInserts = project.features.map((feat, index) => ({
        project_id: newProject.id,
        feature: feat,
        display_order: index + 1,
      }))

      const { error: featuresError } = await client.from("project_features").insert(featureInserts)
      if (featuresError) console.error("Error inserting features:", featuresError)
    }

    const completeProject = await getProjectWithRelations(newProject.id)

    return { data: completeProject, error: null }
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
    const projectId = Number.parseInt(id)

    // Update main project data
    const { data: updatedProject, error: projectError } = await client
      .from("projects")
      .update({
        title: project.title,
        description: project.description,
        long_description: project.long_description,
        category: project.category,
        status: project.status,
        client: project.client,
        featured: project.featured,
        show_project_button: project.show_project_button,
        project_url: project.project_url,
        github_url: project.github_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId)
      .select()
      .single()

    if (projectError) throw projectError

    // Update images if provided
    if (project.images) {
      // Delete existing images
      await client.from("project_images").delete().eq("project_id", projectId)

      // Insert new images
      if (project.images.length > 0) {
        const imageInserts = project.images.map((url, index) => ({
          project_id: projectId,
          image_url: url,
          display_order: index + 1,
        }))

        await client.from("project_images").insert(imageInserts)
      }
    }

    // Update technologies if provided
    if (project.technologies) {
      // Delete existing technologies
      await client.from("project_technologies").delete().eq("project_id", projectId)

      // Insert new technologies
      if (project.technologies.length > 0) {
        const techInserts = project.technologies.map((tech) => ({
          project_id: projectId,
          technology: tech,
        }))

        await client.from("project_technologies").insert(techInserts)
      }
    }

    // Update features if provided
    if (project.features) {
      // Delete existing features
      await client.from("project_features").delete().eq("project_id", projectId)

      // Insert new features
      if (project.features.length > 0) {
        const featureInserts = project.features.map((feat, index) => ({
          project_id: projectId,
          feature: feat,
          display_order: index + 1,
        }))

        await client.from("project_features").insert(featureInserts)
      }
    }

    const completeProject = await getProjectWithRelations(projectId)

    return { data: completeProject, error: null }
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error)
    return { data: null, error }
  }
}

export async function deleteProject(id: string): Promise<{ error: any }> {
  try {
    const client = createClient()
    const { error } = await client.from("projects").delete().eq("id", Number.parseInt(id))

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
    const { data, error } = await client
      .from("projects")
      .update({ featured })
      .eq("id", Number.parseInt(id))
      .select()
      .single()

    if (error) throw error

    const completeProject = await getProjectWithRelations(Number.parseInt(id))

    return { data: completeProject, error: null }
  } catch (error) {
    console.error("Erro ao atualizar destaque:", error)
    return { data: null, error }
  }
}
