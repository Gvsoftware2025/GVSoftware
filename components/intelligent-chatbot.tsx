"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Clock,
  Phone,
  Star,
  Rocket,
  Briefcase,
  DollarSign,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { insertChatMessage } from "@/lib/supabase"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  type?: "text" | "quick-reply" | "contact" | "service"
  options?: string[]
  metadata?: any
}

interface QuickReply {
  text: string
  response: string
  type?: "service" | "contact" | "info"
  icon?: any
}

const quickReplies: QuickReply[] = [
  {
    text: "💼 Nossos Serviços",
    response:
      "Oferecemos desenvolvimento web, apps mobile, sistemas empresariais e consultoria em TI. Qual serviço te interessa mais?",
    type: "service",
    icon: Briefcase,
  },
  {
    text: "💰 Orçamento",
    response:
      "Adoraria ajudar com um orçamento! Para isso, preciso saber mais sobre seu projeto. Pode me contar qual tipo de solução você precisa?",
    type: "contact",
    icon: DollarSign,
  },
  {
    text: "📱 Portfolio",
    response:
      "Temos projetos incríveis! Desenvolvemos o sistema Bebidas ON, e-commerces, apps de delivery e muito mais. Quer ver nosso portfolio completo?",
    type: "info",
    icon: Star,
  },
  {
    text: "📞 Contato",
    response:
      "Vamos conversar! Você pode entrar em contato conosco pelo WhatsApp, email ou através do nosso formulário. Qual prefere?",
    type: "contact",
    icon: Phone,
  },
  {
    text: "⏰ Prazo de Entrega",
    response:
      "Os prazos variam conforme a complexidade do projeto. Sites simples: 1-2 semanas, sistemas complexos: 1-3 meses. Quer discutir seu projeto específico?",
    type: "info",
    icon: Clock,
  },
  {
    text: "🚀 Como Começar",
    response:
      "É simples! 1) Conte sobre sua ideia, 2) Fazemos uma análise gratuita, 3) Apresentamos a proposta, 4) Começamos o desenvolvimento. Vamos começar?",
    type: "contact",
    icon: Rocket,
  },
]

const botResponses: { [key: string]: string } = {
  // Saudações
  oi: "Olá! 👋 Sou a assistente virtual da GV Software! Como posso ajudar você hoje?",
  olá: "Oi! 😊 Bem-vindo à GV Software! Estou aqui para tirar suas dúvidas e ajudar com seu projeto.",
  "bom dia": "Bom dia! ☀️ Que ótimo ter você aqui! Como posso ajudar hoje?",
  "boa tarde": "Boa tarde! 🌅 Espero que esteja tendo um dia produtivo! Em que posso ajudar?",
  "boa noite": "Boa noite! 🌙 Obrigada por nos visitar! Como posso ajudar você?",

  // Serviços
  serviços:
    "Nossos principais serviços incluem:\n\n🌐 Desenvolvimento Web\n📱 Apps Mobile\n💼 Sistemas Empresariais\n🎨 Design UI/UX\n⚙️ Consultoria em TI\n\nQual te interessa mais?",
  "desenvolvimento web":
    "Criamos sites modernos e responsivos usando as melhores tecnologias! React, Next.js, Node.js e muito mais. Precisa de um site ou sistema web?",
  "app mobile":
    "Desenvolvemos apps nativos para iOS e Android, além de apps híbridos. Sua ideia de app pode se tornar realidade! Quer conversar sobre isso?",
  "sistema empresarial":
    "Criamos sistemas sob medida para otimizar processos empresariais. ERP, CRM, dashboards e automações. Que tipo de sistema sua empresa precisa?",

  // Preços e orçamentos
  preço:
    "Os valores variam conforme a complexidade do projeto. Fazemos orçamentos personalizados e gratuitos! Quer receber uma proposta?",
  orçamento:
    "Claro! Para fazer um orçamento preciso, preciso entender melhor seu projeto. Pode me contar mais detalhes sobre o que você precisa?",
  valor:
    "Trabalhamos com valores justos e transparentes. Cada projeto é único! Vamos conversar sobre suas necessidades para dar um valor exato?",

  // Portfolio e trabalhos
  portfolio:
    "Temos projetos incríveis! Nosso destaque é o sistema Bebidas ON - uma solução completa de gestão empresarial. Quer ver mais projetos?",
  "bebidas on":
    "O Bebidas ON é nosso projeto mais completo! Sistema de gestão com controle de estoque, vendas e dashboard interativo. Um sucesso total! 🚀",
  projetos:
    "Desenvolvemos diversos projetos: e-commerces, apps de delivery, sistemas de gestão, sites corporativos e muito mais! Quer ver exemplos específicos?",

  // Contato
  contato:
    "Você pode entrar em contato conosco:\n\n📱 WhatsApp: (11) 99999-9999\n📧 Email: contato@gvsoftware.com.br\n🌐 Formulário no site\n\nQual forma prefere?",
  whatsapp: "Nosso WhatsApp: (11) 99999-9999 📱\nEstamos sempre prontos para conversar sobre seu projeto!",
  email: "Nosso email: contato@gvsoftware.com.br 📧\nEnvie sua ideia que respondemos rapidinho!",

  // Processo e prazos
  prazo:
    "Os prazos dependem da complexidade:\n\n⚡ Sites simples: 1-2 semanas\n🏢 Sistemas médios: 3-6 semanas\n🚀 Projetos complexos: 2-3 meses\n\nQuer discutir seu projeto específico?",
  "como funciona":
    "Nosso processo é simples:\n\n1️⃣ Análise gratuita do seu projeto\n2️⃣ Proposta personalizada\n3️⃣ Desenvolvimento com acompanhamento\n4️⃣ Entrega e suporte\n\nVamos começar?",
  processo:
    "Trabalhamos de forma transparente e colaborativa! Você acompanha cada etapa do desenvolvimento. Quer saber mais sobre nosso método?",

  // Tecnologias
  tecnologia:
    "Usamos as melhores tecnologias do mercado:\n\n⚛️ React & Next.js\n📱 React Native\n🟢 Node.js\n🐘 PostgreSQL\n☁️ Cloud Computing\n\nQual tecnologia te interessa?",
  react:
    "React é nossa especialidade! Criamos interfaces modernas e performáticas. Perfeito para sites e sistemas web avançados! 🚀",
  "react native":
    "Com React Native desenvolvemos apps que funcionam perfeitamente no iOS e Android! Uma solução eficiente e econômica! 📱",

  // Suporte e manutenção
  suporte:
    "Oferecemos suporte completo após a entrega! Manutenção, atualizações e melhorias contínuas. Seu projeto sempre funcionando perfeitamente! 🛠️",
  manutenção:
    "A manutenção é essencial! Oferecemos planos de manutenção para manter seu sistema sempre atualizado e seguro. Quer saber mais?",

  // Empresa
  empresa:
    "A GV Software é especializada em soluções digitais inovadoras! Transformamos ideias em realidade com tecnologia de ponta e design excepcional! 💡",
  "sobre vocês":
    "Somos uma empresa focada em inovação e qualidade! Nossa missão é impulsionar o crescimento dos nossos clientes através da tecnologia! 🎯",
  equipe:
    "Nossa equipe é formada por desenvolvedores experientes e designers criativos! Todos apaixonados por criar soluções incríveis! 👥",

  // Agradecimentos
  obrigado: "Por nada! 😊 Estou aqui sempre que precisar! Tem mais alguma dúvida?",
  obrigada: "Imagina! 💜 Foi um prazer ajudar! Qualquer coisa, é só chamar!",
  valeu: "Valeu você! 🤝 Espero ter ajudado! Vamos fazer seu projeto acontecer?",

  // Default
  default:
    "Interessante! 🤔 Pode me contar mais sobre isso? Ou se preferir, posso te ajudar com informações sobre nossos serviços, portfolio ou orçamentos!",
}

export function IntelligentChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! 👋 Sou a assistente virtual da GV Software! Como posso ajudar você hoje?",
      isBot: true,
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim()

    // Procura por palavras-chave específicas
    for (const [key, response] of Object.entries(botResponses)) {
      if (message.includes(key)) {
        return response
      }
    }

    // Respostas baseadas em contexto
    if (message.includes("preço") || message.includes("custa") || message.includes("valor")) {
      return botResponses.preço
    }

    if (message.includes("tempo") || message.includes("demora") || message.includes("prazo")) {
      return botResponses.prazo
    }

    if (message.includes("contato") || message.includes("falar") || message.includes("conversar")) {
      return botResponses.contato
    }

    if (message.includes("portfolio") || message.includes("trabalho") || message.includes("projeto")) {
      return botResponses.portfolio
    }

    return botResponses.default
  }

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Salvar mensagem do usuário
    try {
      await insertChatMessage({
        session_id: sessionId,
        message: messageText,
        is_bot: false,
        message_type: "text",
      })
    } catch (error) {
      console.error("Erro ao salvar mensagem do usuário:", error)
    }

    // Simular digitação do bot
    setTimeout(
      async () => {
        const botResponseText = getBotResponse(messageText)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponseText,
          isBot: true,
          timestamp: new Date(),
          type: "text",
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)

        // Salvar resposta do bot
        try {
          await insertChatMessage({
            session_id: sessionId,
            message: botResponseText,
            is_bot: true,
            message_type: "text",
          })
        } catch (error) {
          console.error("Erro ao salvar mensagem do bot:", error)
        }
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleQuickReply = (reply: QuickReply) => {
    handleSendMessage(reply.text)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-16 h-16 rounded-full shadow-2xl transition-all duration-500 group relative overflow-hidden",
            isOpen
              ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rotate-45"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-110 animate-bounce",
          )}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Icon */}
          <div className="relative z-10">
            {isOpen ? <X className="w-8 h-8 text-white" /> : <MessageCircle className="w-8 h-8 text-white" />}
          </div>

          {/* Pulse Ring */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 animate-ping opacity-20"></div>
          )}

          {/* Notification Badge */}
          {!isOpen && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <Card className="h-full bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
            {/* Header */}
            <CardHeader className="pb-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">Assistente GV</CardTitle>
                    <p className="text-sm text-purple-300 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Online agora
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start space-x-3",
                        message.isBot ? "justify-start" : "justify-end flex-row-reverse space-x-reverse",
                      )}
                    >
                      {/* Avatar */}
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg",
                          message.isBot
                            ? "bg-gradient-to-r from-purple-600 to-blue-600"
                            : "bg-gradient-to-r from-green-500 to-emerald-500",
                        )}
                      >
                        {message.isBot ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={cn(
                          "max-w-[280px] rounded-2xl px-4 py-3 shadow-lg relative",
                          message.isBot
                            ? "bg-gradient-to-r from-slate-800/90 to-purple-800/90 text-white border border-purple-500/30"
                            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white",
                        )}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                        <div
                          className={cn(
                            "text-xs opacity-70 mt-2",
                            message.isBot ? "text-purple-300" : "text-purple-100",
                          )}
                        >
                          {formatTime(message.timestamp)}
                        </div>

                        {/* Message Tail */}
                        <div
                          className={cn(
                            "absolute top-4 w-3 h-3 rotate-45",
                            message.isBot
                              ? "-left-1.5 bg-gradient-to-r from-slate-800/90 to-purple-800/90"
                              : "-right-1.5 bg-gradient-to-r from-purple-600 to-blue-600",
                          )}
                        ></div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gradient-to-r from-slate-800/90 to-purple-800/90 rounded-2xl px-4 py-3 border border-purple-500/30">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className="p-4 border-t border-purple-500/20 bg-gradient-to-r from-purple-600/10 to-blue-600/10">
                  <p className="text-sm text-purple-300 mb-3 font-medium">Sugestões rápidas:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickReplies.slice(0, 4).map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs bg-slate-800/50 border-purple-500/30 text-purple-300 hover:bg-purple-600/20 hover:text-white hover:border-purple-400/50 transition-all duration-300 rounded-xl h-auto py-2 px-3"
                      >
                        <reply.icon className="w-3 h-3 mr-1" />
                        {reply.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-purple-500/20 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-4 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                  >
                    {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default IntelligentChatbot
