"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Mail,
  Calendar,
  AlertCircle,
  Loader2,
  Zap,
  Star,
  CheckCircle,
} from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  type?: "text" | "form" | "success"
}

interface FormData {
  nome: string
  sobrenome: string
  email: string
  assunto: string
  mensagem: string
}

export function EnhancedChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showInitialForm, setShowInitialForm] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    sobrenome: "",
    email: "",
    assunto: "",
    mensagem: "",
  })
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const botResponses = {
    greeting: [
      "Olá! 👋 Obrigado por preencher o formulário! Como posso ajudá-lo hoje?",
      "Oi! Que bom ter você aqui! Recebi suas informações. Em que posso ajudar?",
      "Olá! Formulário recebido com sucesso! Estou aqui para tirar suas dúvidas. Como posso ajudar?",
    ],
    services: [
      "Oferecemos desenvolvimento web, aplicativos mobile, design UI/UX e consultoria em TI. Qual serviço te interessa mais? 🚀",
      "Nossos principais serviços: 🖥️ Desenvolvimento Web, 📱 Apps Mobile, 🎨 Design UI/UX e 🔧 Consultoria. Quer saber mais?",
    ],
    contact: [
      "Nossa equipe entrará em contato em até 24 horas! Também pode ligar para (17) 99785-3416 📞",
      "Perfeito! Já temos suas informações. Nossa equipe responderá em breve! 📧",
    ],
    portfolio: [
      "Nosso projeto destaque é o Sistema Bebidas ON! 🍺 Uma solução completa de gestão empresarial. Confira nosso portfolio!",
      "Desenvolvemos o Sistema de Gestão Bebidas ON e outros projetos incríveis! Quer ver nosso trabalho? 💼",
    ],
    pricing: [
      "Oferecemos orçamento gratuito e personalizado! 💰 Com suas informações, nossa equipe preparará uma proposta sob medida!",
      "Cada projeto é único! Fazemos uma análise gratuita e criamos uma proposta sob medida. Vamos conversar sobre seu projeto?",
    ],
    talkToAgent: [
      "Para falar diretamente com um de nossos atendentes, você pode ligar para (17) 99785-3416 ou enviar um email para contato.gvsoftware@gmail.com. Nossa equipe está pronta para te ajudar!",
      "Entendido! Se precisar de um atendimento mais personalizado, entre em contato conosco por telefone (17) 99785-3416 ou email contato.gvsoftware@gmail.com. Estamos à disposição!",
    ],
    default: [
      "Interessante! Nossa equipe analisará sua solicitação e entrará em contato com mais detalhes! 🤝",
      "Ótima pergunta! Com suas informações, nossa equipe pode dar uma resposta mais específica em breve! 📝",
    ],
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const getRandomResponse = (type: keyof typeof botResponses) => {
    const responses = botResponses[type]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const getBotResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase()

    if (message.includes("serviço") || message.includes("desenvolvimento") || message.includes("app")) {
      return getRandomResponse("services")
    }
    if (message.includes("contato") || message.includes("telefone") || message.includes("email")) {
      return getRandomResponse("contact")
    }
    if (message.includes("portfolio") || message.includes("projeto") || message.includes("trabalho")) {
      return getRandomResponse("portfolio")
    }
    if (message.includes("preço") || message.includes("orçamento") || message.includes("valor")) {
      return getRandomResponse("pricing")
    }
    if (message.includes("atendente") || message.includes("humano") || message.includes("falar com alguem")) {
      return getRandomResponse("talkToAgent")
    }
    return getRandomResponse("default")
  }

  const addBotMessage = (text: string, type: "text" | "form" | "success" = "text") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      type,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    const userMessage = inputValue
    setInputValue("")
    setIsTyping(true)

    setTimeout(
      () => {
        const botResponse = getBotResponse(userMessage)
        addBotMessage(botResponse)
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const validateForm = () => {
    const errors: Partial<FormData> = {}

    if (!formData.nome.trim()) errors.nome = "Nome é obrigatório"
    if (!formData.sobrenome.trim()) errors.sobrenome = "Sobrenome é obrigatório"
    if (!formData.email.trim()) errors.email = "Email é obrigatório"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Email inválido"
    if (!formData.assunto) errors.assunto = "Assunto é obrigatório"
    if (!formData.mensagem.trim()) errors.mensagem = "Mensagem é obrigatória"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmitForm = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowInitialForm(false)

    // Add welcome message after form submission
    setTimeout(() => {
      addBotMessage(getRandomResponse("greeting"))
    }, 500)

    // Reset form
    setFormData({
      nome: "",
      sobrenome: "",
      email: "",
      assunto: "",
      mensagem: "",
    })
    setFormErrors({})
  }

  const quickActions = [
    { text: "Ver Serviços", icon: "🚀" },
    { text: "Portfolio", icon: "💼" },
    { text: "Orçamento", icon: "💰" },
    { text: "Suporte", icon: "🛠️" },
    { text: "Falar com Atendente", icon: "📞" }, // New quick action
  ]

  return (
    <>
      {/* Modern Animated Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-110 animate-gradient-spin ${
            isOpen ? "rotate-180" : ""
          }`}
          size="icon"
        >
          {/* Animated Background Rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 animate-ping opacity-20"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 animate-pulse opacity-30"></div>

          {/* Icon */}
          <div className="relative z-10">
            {isOpen ? (
              <X className="w-7 h-7 text-white animate-spin-slow" />
            ) : (
              <Bot className="w-7 h-7 text-white animate-bounce-subtle" /> // Modern Bot icon
            )}
          </div>
        </Button>
      </div>

      {/* Floating notification */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-40 animate-bounce-in max-w-xs">
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-4 py-3 rounded-2xl text-sm shadow-xl backdrop-blur-sm border border-white/20 animate-float">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 animate-spin text-yellow-300" />
              <span className="font-medium">Precisa de ajuda? Clique aqui!</span>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)] animate-scale-in">
          <Card className="bg-slate-900/95 border-slate-700 backdrop-blur-xl shadow-2xl overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-slate-700">
              <CardTitle className="flex items-center space-x-3 text-white">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center animate-pulse-glow">
                    <Bot className="w-5 h-5 text-white animate-bounce-subtle" />
                  </div>
                  {/* Removed the small green circle */}
                </div>
                <div>
                  <div className="text-lg font-bold flex items-center">
                    Assistente GV
                    <Star className="w-4 h-4 text-yellow-400 ml-2 animate-spin-slow" />
                  </div>
                  <div className="text-xs text-green-400 font-normal flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Online • Resposta instantânea
                  </div>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {/* Initial Form */}
              {showInitialForm ? (
                <div className="p-4 h-[400px] overflow-y-auto scrollbar-hide bg-slate-800/80">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-glow">
                      <Zap className="w-6 h-6 text-white animate-bounce-subtle" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Bem-vindo à GV Software!</h3>
                    <p className="text-gray-300 text-sm">Preencha o formulário para começarmos nossa conversa</p>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="nome" className="text-xs text-gray-300 flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          Nome *
                        </Label>
                        <Input
                          id="nome"
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          className="bg-slate-700/80 border-slate-600 text-white text-sm h-8 focus:border-purple-500"
                          placeholder="Seu nome"
                        />
                        {formErrors.nome && (
                          <p className="text-red-400 text-xs mt-1 flex items-center animate-slide-in-up">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {formErrors.nome}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="sobrenome" className="text-xs text-gray-300 flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          Sobrenome *
                        </Label>
                        <Input
                          id="sobrenome"
                          value={formData.sobrenome}
                          onChange={(e) => setFormData({ ...formData, sobrenome: e.target.value })}
                          className="bg-slate-700/80 border-slate-600 text-white text-sm h-8 focus:border-purple-500"
                          placeholder="Sobrenome"
                        />
                        {formErrors.sobrenome && (
                          <p className="text-red-400 text-xs mt-1 flex items-center animate-slide-in-up">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {formErrors.sobrenome}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-xs text-gray-300 flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-slate-700/80 border-slate-600 text-white text-sm h-8 focus:border-purple-500"
                        placeholder="seu@email.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-400 text-xs mt-1 flex items-center animate-slide-in-up">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="assunto" className="text-xs text-gray-300 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Assunto *
                      </Label>
                      <Select
                        value={formData.assunto}
                        onValueChange={(value) => setFormData({ ...formData, assunto: value })}
                      >
                        <SelectTrigger className="bg-slate-700/80 border-slate-600 text-white text-sm h-8 focus:border-purple-500">
                          <SelectValue placeholder="Selecione o assunto" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="desenvolvimento-web">🖥️ Desenvolvimento Web</SelectItem>
                          <SelectItem value="app-mobile">📱 Aplicativo Mobile</SelectItem>
                          <SelectItem value="design-uiux">🎨 Design UI/UX</SelectItem>
                          <SelectItem value="consultoria">🔧 Consultoria em TI</SelectItem>
                          <SelectItem value="orcamento">💰 Orçamento</SelectItem>
                          <SelectItem value="suporte">🛠️ Suporte</SelectItem>
                          <SelectItem value="outro">❓ Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.assunto && (
                        <p className="text-red-400 text-xs mt-1 flex items-center animate-slide-in-up">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {formErrors.assunto}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="mensagem" className="text-xs text-gray-300 flex items-center">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Mensagem *
                      </Label>
                      <Textarea
                        id="mensagem"
                        value={formData.mensagem}
                        onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                        className="bg-slate-700/80 border-slate-600 text-white text-sm resize-none focus:border-purple-500 transition-all duration-300"
                        placeholder="Conte-nos sobre seu projeto..."
                        rows={3}
                      />
                      {formErrors.mensagem && (
                        <p className="text-red-400 text-xs mt-1 flex items-center animate-slide-in-up">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {formErrors.mensagem}
                        </p>
                      )}
                    </div>

                    <Button
                      onClick={handleSubmitForm}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-9 font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Enviando...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Send className="w-4 h-4" />
                          <span>Iniciar Conversa</span>
                        </div>
                      )}
                    </Button>

                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span>Seus dados estão seguros conosco</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Messages */}
                  <div className="h-[400px] overflow-y-auto p-4 space-y-3 scrollbar-hide bg-slate-800/80">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-slide-in-up`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                            message.isBot
                              ? "bg-slate-700 text-white rounded-bl-sm"
                              : "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-sm"
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.isBot && (
                              <div className="w-5 h-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Bot className="w-3 h-3 text-white" />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="text-sm leading-relaxed">{message.text}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </p>
                            </div>
                            {!message.isBot && (
                              <div className="w-5 h-5 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <User className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Quick Actions */}
                    {messages.length === 1 && (
                      <div className="animate-fade-in">
                        <div className="text-center text-xs text-gray-400 mb-2">Ações rápidas:</div>
                        <div className="grid grid-cols-2 gap-2">
                          {quickActions.map((action, index) => (
                            <Button
                              key={index}
                              onClick={() => {
                                addUserMessage(action.text)
                                setIsTyping(true)
                                setTimeout(() => {
                                  const botResponse = getBotResponse(action.text)
                                  addBotMessage(botResponse)
                                  setIsTyping(false)
                                }, 1000)
                              }}
                              variant="outline"
                              className="bg-slate-700/80 border-slate-600 text-gray-300 hover:bg-slate-600 text-xs py-2 h-auto hover:scale-105 transition-all duration-300"
                            >
                              <span className="mr-1">{action.icon}</span>
                              {action.text}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {isTyping && (
                      <div className="flex justify-start animate-fade-in">
                        <div className="bg-slate-700 text-white p-3 rounded-2xl rounded-bl-sm max-w-[80%]">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                              <Bot className="w-3 h-3 text-white" />
                            </div>
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

                  {/* Input */}
                  <div className="p-4 border-t border-slate-700 bg-slate-800/80">
                    <div className="flex space-x-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 bg-slate-700/80 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 rounded-full"
                        disabled={isTyping}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full w-9 h-9 p-0 hover:scale-110 transition-all duration-300"
                        size="icon"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-center mt-2">
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <Sparkles className="w-3 h-3 animate-pulse" />
                        <span>Powered by GV Software AI</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
