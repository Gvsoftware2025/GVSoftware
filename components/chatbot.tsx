"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! 👋 Sou o assistente virtual da GV Software. Como posso ajudá-lo hoje?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickReplies = [
    "Quais serviços vocês oferecem?",
    "Como posso solicitar um orçamento?",
    "Qual o prazo de desenvolvimento?",
    "Vocês fazem manutenção?",
  ]

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("serviço") || message.includes("desenvolvimento")) {
      return "Oferecemos desenvolvimento web, mobile, sistemas empresariais e consultoria em tecnologia. Cada projeto é personalizado para suas necessidades específicas! 💻"
    }

    if (message.includes("orçamento") || message.includes("preço") || message.includes("valor")) {
      return "Para solicitar um orçamento personalizado, você pode entrar em contato conosco através da página de contato ou pelo WhatsApp (17) 99785-3416. Analisamos cada projeto individualmente! 💰"
    }

    if (message.includes("prazo") || message.includes("tempo") || message.includes("entrega")) {
      return "O prazo varia conforme a complexidade do projeto. Projetos simples: 1-2 semanas, médios: 3-6 semanas, complexos: 2-3 meses. Sempre cumprimos os prazos acordados! ⏰"
    }

    if (message.includes("manutenção") || message.includes("suporte")) {
      return "Sim! Oferecemos suporte e manutenção contínua para todos os nossos projetos. Garantimos que sua solução esteja sempre atualizada e funcionando perfeitamente! 🔧"
    }

    if (message.includes("contato") || message.includes("telefone") || message.includes("email")) {
      return "Você pode nos contatar por:\n📞 (17) 99785-3416\n📧 contato.gvsoftware@gmail.com\n📱 Instagram: @gvsoftware_"
    }

    if (message.includes("portfolio") || message.includes("projetos") || message.includes("trabalhos")) {
      return "Confira nosso portfolio na página de projetos! Temos trabalhos em desenvolvimento web, mobile e sistemas empresariais. Cada projeto é único e inovador! 🚀"
    }

    if (message.includes("tecnologia") || message.includes("linguagem")) {
      return "Trabalhamos com as tecnologias mais modernas: React, Next.js, Node.js, Python, Flutter, React Native, PostgreSQL, MongoDB e muito mais! 🛠️"
    }

    if (message.includes("obrigado") || message.includes("valeu") || message.includes("thanks")) {
      return "Por nada! Fico feliz em ajudar! Se precisar de mais alguma coisa, estarei aqui. Tenha um ótimo dia! 😊"
    }

    if (message.includes("oi") || message.includes("olá") || message.includes("hello")) {
      return "Olá! Bem-vindo à GV Software! 👋 Como posso ajudá-lo hoje? Posso falar sobre nossos serviços, projetos ou tirar qualquer dúvida!"
    }

    // Respostas padrão
    return "Interessante! 🤔 Para melhor atendê-lo, você pode escolher uma das opções abaixo ou entrar em contato diretamente conosco. Nossa equipe está sempre pronta para ajudar!"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simular delay de digitação
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickReply = (reply: string) => {
    setInputValue(reply)
    setTimeout(() => handleSendMessage(), 100)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
        </Button>

        {/* Notification Badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">1</span>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`bg-slate-800 border-slate-700 shadow-2xl transition-all duration-300 ${
          isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
        }`}
      >
        <CardHeader className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">Assistente GV</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm opacity-90">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-1"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[436px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isBot
                        ? "bg-slate-700 text-white"
                        : "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.isBot && <Bot className="w-4 h-4 mt-1 text-purple-400 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">{formatTime(message.timestamp)}</span>
                      </div>
                      {!message.isBot && <User className="w-4 h-4 mt-1 text-blue-200 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 rounded-2xl px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-purple-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="p-4 border-t border-slate-700">
                <p className="text-xs text-gray-400 mb-2">Perguntas frequentes:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-purple-600/20 hover:border-purple-500 text-xs border-slate-600 text-gray-300 transition-colors duration-300"
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-purple-500"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
