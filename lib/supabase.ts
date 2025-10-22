import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mrqtmxrnkhlbpgcostnp.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ycXRteHJua2hsYnBnY29zdG5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MDA3MzMsImV4cCI6MjA3NjM3NjczM30.eUDW4eI4D-CKXoWtfhwzGKQD0F5RrobV1QvQl7S1x28"

export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = createClient()

export interface ChatMessage {
  id?: string
  session_id: string
  message: string
  is_bot: boolean
  message_type: string
  metadata?: any
  created_at?: string
}

export interface ContactForm {
  id?: string
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  message: string
  status?: string
  created_at?: string
}

export interface AdminUser {
  id?: string
  username: string
  password_hash: string
  created_at?: string
}

export async function insertChatMessage(message: Omit<ChatMessage, "id" | "created_at">) {
  try {
    const client = createClient()
    const { data, error } = await client.from("chat_messages").insert([message]).select().single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Erro ao inserir mensagem:", error)
    return { data: null, error }
  }
}

export async function getChatHistory(sessionId: string) {
  try {
    const client = createClient()
    const { data, error } = await client
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error("Erro ao buscar histórico:", error)
    return { data: [], error }
  }
}

export async function getAllChatSessions() {
  try {
    const client = createClient()
    const { data, error } = await client
      .from("chat_messages")
      .select("session_id, message, created_at")
      .order("created_at", { ascending: false })

    if (error) throw error

    const sessions =
      data?.reduce((acc: any[], message: any) => {
        const existingSession = acc.find((s) => s.session_id === message.session_id)
        if (existingSession) {
          existingSession.message_count++
        } else {
          acc.push({
            session_id: message.session_id,
            message_count: 1,
            last_message: message.message,
            created_at: message.created_at,
          })
        }
        return acc
      }, []) || []

    return { data: sessions, error: null }
  } catch (error) {
    console.error("Erro ao buscar sessões:", error)
    return { data: [], error }
  }
}

export async function insertContactForm(form: Omit<ContactForm, "id" | "created_at">) {
  try {
    const client = createClient()
    const { data, error } = await client
      .from("contact_forms")
      .insert([{ ...form, status: "new" }])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Erro ao inserir formulário:", error)
    return { data: null, error }
  }
}

export async function getAllContactForms() {
  try {
    const client = createClient()
    const { data, error } = await client.from("contact_forms").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error("Erro ao buscar formulários:", error)
    return { data: [], error }
  }
}

export async function updateContactFormStatus(id: string, status: string) {
  try {
    const client = createClient()
    const { data, error } = await client.from("contact_forms").update({ status }).eq("id", id).select().single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Erro ao atualizar status:", error)
    return { data: null, error }
  }
}

export async function verifyAdminCredentials(username: string, password: string) {
  try {
    if (username === "admin" && password === "GVSoft@2025") {
      return { data: { username: "admin", id: "1" }, error: null }
    }

    const client = createClient()
    const { data, error } = await client.from("admin_users").select("*").eq("username", username).single()

    if (error || !data) {
      return { data: null, error: "Credenciais inválidas" }
    }

    if (data.password_hash === password) {
      return { data: { username: data.username, id: data.id }, error: null }
    }

    return { data: null, error: "Credenciais inválidas" }
  } catch (error) {
    console.error("Erro na autenticação:", error)
    return { data: null, error: "Erro interno" }
  }
}

export async function getAdminStats() {
  try {
    const client = createClient()

    const [messagesResult, sessionsResult, contactsResult] = await Promise.all([
      client.from("chat_messages").select("id", { count: "exact" }),
      client
        .from("chat_messages")
        .select("session_id")
        .then((res) => {
          const uniqueSessions = new Set(res.data?.map((m) => m.session_id))
          return { count: uniqueSessions.size }
        }),
      client.from("contact_forms").select("id", { count: "exact" }),
    ])

    const today = new Date().toISOString().split("T")[0]
    const todayMessages = await client.from("chat_messages").select("session_id").gte("created_at", today)

    const activeSessions = new Set(todayMessages.data?.map((m) => m.session_id))

    return {
      data: {
        totalMessages: messagesResult.count || 0,
        totalSessions: sessionsResult.count || 0,
        totalContacts: contactsResult.count || 0,
        activeToday: activeSessions.size || 0,
      },
      error: null,
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error)
    return {
      data: {
        totalMessages: 0,
        totalSessions: 0,
        totalContacts: 0,
        activeToday: 0,
      },
      error,
    }
  }
}
