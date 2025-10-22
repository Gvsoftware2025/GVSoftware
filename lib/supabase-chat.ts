import { createClient } from "./supabase"

export interface ChatMessage {
  id: number
  message: string
  response: string
  created_at: string
}

export async function saveChatMessage(
  message: string,
  response: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()
    const { error } = await supabase.from("chat_messages").insert([{ message, response }])

    if (error) {
      console.error("Error saving chat message:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Exception in saveChatMessage:", error)
    return { success: false, error: String(error) }
  }
}

export async function getChatHistory(limit = 50): Promise<ChatMessage[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching chat history:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Exception in getChatHistory:", error)
    return []
  }
}
