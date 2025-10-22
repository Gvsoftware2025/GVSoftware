"use client"

import { useState, useEffect, useRef } from "react"
import {
  X,
  Sparkles,
  User,
  Mail,
  Phone,
  Target,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Clock,
  Send,
} from "lucide-react"

// Types
interface FormData {
  name: string
  email: string
  phone: string
  subject: string
}

interface ChatMessage {
  id: string
  conversation_id?: string
  type: "bot" | "user" | "admin"
  content: string
  timestamp: Date
  sender_name?: string
  is_read?: boolean
}

interface ChatOption {
  id: string
  icon: string
  title: string
  description: string
  type: "live_chat" | "faq" | "quote" | "services" | "meeting"
  auto_message?: string
}

type ChatStep = "welcome" | "form" | "options" | "chat" | "faq" | "quote" | "services" | "meeting" | "submitted"

// Auto Messages
const AUTO_MESSAGES = {
  quote:
    "Ótima escolha! 💼 Para criar um orçamento personalizado, preciso entender melhor seu projeto. Pode me contar mais detalhes sobre o que você tem em mente? (site, app, sistema, etc.)",
  services:
    "Perfeito! 🚀 Temos várias soluções incríveis para oferecer. Qual tipo de serviço mais te interessa: desenvolvimento web, aplicativos mobile, sistemas personalizados ou e-commerce?",
  meeting:
    "Excelente! 📅 Adoraria agendar uma conversa com você. Qual seria o melhor horário? Manhã, tarde ou noite? E qual dia da semana funciona melhor?",
  welcome:
    "Olá! 👋 Seja muito bem-vindo(a) à GV Software! Sou seu assistente inteligente e estou aqui para te ajudar com tudo que precisar. Vamos começar nossa conversa?",
  faq_intro:
    "Vou te ajudar com as dúvidas mais frequentes! 🤖 Se não encontrar o que procura, posso te conectar diretamente com nossa equipe.",
  live_chat_connecting:
    "Perfeito! 💬 Estou conectando você com nossa equipe de suporte. Em instantes um especialista estará disponível para te atender pessoalmente!",
  business_hours:
    "📞 Nosso horário de atendimento é de segunda a sexta, das 9h às 18h. Fora deste horário, deixe sua mensagem que responderemos no próximo dia útil!",
}

// Robot Icon Component
const RobotIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <div className={`${className} relative flex items-center justify-center`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Antena */}
      <circle cx="50" cy="15" r="3" fill="#ffffff" opacity="0.9" />
      <line x1="50" y1="18" x2="50" y2="30" stroke="#ffffff" strokeWidth="2" opacity="0.8" />

      {/* Gradientes */}
      <defs>
        <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="robotFace" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>
      </defs>

      {/* Cabeça */}
      <rect x="25" y="30" width="50" height="35" rx="8" fill="url(#robotGradient)" />

      {/* Tela do rosto */}
      <rect x="30" y="35" width="40" height="25" rx="5" fill="url(#robotFace)" />

      {/* Olhos */}
      <circle cx="40" cy="45" r="4" fill="#ffffff" />
      <circle cx="60" cy="45" r="4" fill="#ffffff" />
      <circle cx="40" cy="45" r="2" fill="#3b82f6" className="animate-pulse" />
      <circle cx="60" cy="45" r="2" fill="#3b82f6" className="animate-pulse" />

      {/* Boca */}
      <rect x="45" y="52" width="10" height="3" rx="1.5" fill="#ffffff" opacity="0.8" />

      {/* Corpo */}
      <rect x="35" y="65" width="30" height="25" rx="6" fill="url(#robotGradient)" opacity="0.9" />

      {/* Botões no corpo */}
      <circle cx="45" cy="75" r="2" fill="#ffffff" opacity="0.7" />
      <circle cx="55" cy="75" r="2" fill="#ffffff" opacity="0.7" />

      {/* Braços */}
      <circle cx="20" cy="70" r="6" fill="url(#robotGradient)" opacity="0.8" />
      <circle cx="80" cy="70" r="6" fill="url(#robotGradient)" opacity="0.8" />

      {/* Brilho na cabeça */}
      <ellipse cx="45" cy="35" rx="8" ry="4" fill="#ffffff" opacity="0.3" />
    </svg>
  </div>
)

// Form Component
const ChatBotForm = ({
  formData,
  setFormData,
  onComplete,
}: {
  formData: FormData
  setFormData: (data: FormData) => void
  onComplete: () => void
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [emailError, setEmailError] = useState("")

  const steps = [
    {
      question: "Como posso te chamar?",
      field: "name" as keyof FormData,
      placeholder: "Seu nome...",
      icon: User,
      type: "text",
    },
    {
      question: "Qual seu melhor email?",
      field: "email" as keyof FormData,
      placeholder: "seu@email.com",
      icon: Mail,
      type: "email",
    },
    {
      question: "Seu WhatsApp?",
      field: "phone" as keyof FormData,
      placeholder: "(17) 99999-9999",
      icon: Phone,
      type: "tel",
    },
    {
      question: "O que você precisa?",
      field: "subject" as keyof FormData,
      placeholder: "Site, app, sistema...",
      icon: Target,
      type: "text",
    },
  ]

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleNext = () => {
    const currentField = steps[currentStep]?.field
    const currentValue = currentField ? formData[currentField] : ""

    if (currentField === "email") {
      if (!validateEmail(currentValue)) {
        setEmailError("Email inválido")
        return
      }
      setEmailError("")
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const currentField = steps[currentStep]?.field
  const currentValue = currentField ? formData[currentField] : ""
  const CurrentIcon = steps[currentStep]?.icon
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="p-5 space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 h-2 rounded-full 
                     transition-all duration-700 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 font-medium">
          <span>
            Etapa {currentStep + 1} de {steps.length}
          </span>
          <span className="text-indigo-600 font-bold">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Bot Message */}
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 
                      rounded-full flex items-center justify-center flex-shrink-0 animate-pulse"
        >
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div
          className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl rounded-tl-lg p-4 max-w-[250px] 
                      shadow-lg border border-gray-200"
        >
          <p className="text-gray-800 font-semibold text-sm">{steps[currentStep]?.question}</p>
        </div>
      </div>

      {/* User Input */}
      <div className="flex items-end gap-3 justify-end">
        <div
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl rounded-br-lg 
                      p-5 max-w-[280px] shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
        >
          <div className="space-y-4">
            <div className="relative group">
              {CurrentIcon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <CurrentIcon className="w-4 h-4 text-white/90 group-focus-within:text-white transition-colors" />
                </div>
              )}
              <input
                type={steps[currentStep]?.type}
                placeholder={steps[currentStep]?.placeholder}
                value={currentValue}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [currentField]: e.target.value,
                  })
                  if (emailError) setEmailError("")
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && currentValue.trim()) {
                    handleNext()
                  }
                }}
                className="w-full pl-10 pr-3 py-3 bg-white/20 border-2 border-white/40 
                         rounded-2xl text-white placeholder-white/80 backdrop-blur-sm
                         focus:outline-none focus:ring-4 focus:ring-white/30 
                         focus:border-white/70 transition-all text-sm font-medium
                         hover:bg-white/25 focus:scale-[1.02]"
                required
                autoFocus
              />
            </div>

            {emailError && (
              <div
                className="text-red-100 text-xs bg-red-500/40 px-3 py-2 rounded-xl border border-red-400/50 
                            backdrop-blur-sm"
              >
                ⚠️ {emailError}
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={!currentValue.trim() || !!emailError}
              className="w-full bg-white/25 hover:bg-white/35 text-white py-3 rounded-2xl 
                       transition-all duration-300 flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm
                       border-2 border-white/50 hover:border-white/70 font-bold text-sm
                       hover:scale-[1.02] active:scale-[0.98] group shadow-lg"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Vamos começar!
                </>
              ) : (
                <>
                  Próximo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
        <div
          className="w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full 
                      flex items-center justify-center shadow-lg"
        >
          <User className="w-4 h-4 text-gray-700" />
        </div>
      </div>
    </div>
  )
}

// Options Component
const ChatBotOptions = ({
  onSelectOption,
  userName,
}: {
  onSelectOption: (option: ChatOption) => void
  userName: string
}) => {
  const options: ChatOption[] = [
    {
      id: "live_chat",
      icon: "💬",
      title: "Chat ao Vivo",
      description: "Fale direto com nossa equipe",
      type: "live_chat",
      auto_message: AUTO_MESSAGES.live_chat_connecting,
    },
    {
      id: "faq",
      icon: "🤖",
      title: "Perguntas Frequentes",
      description: "Respostas rápidas",
      type: "faq",
      auto_message: AUTO_MESSAGES.faq_intro,
    },
    {
      id: "quote",
      icon: "💼",
      title: "Solicitar Orçamento",
      description: "Proposta personalizada",
      type: "quote",
      auto_message: AUTO_MESSAGES.quote,
    },
    {
      id: "services",
      icon: "🚀",
      title: "Nossos Serviços",
      description: "Conheça nossas soluções",
      type: "services",
      auto_message: AUTO_MESSAGES.services,
    },
    {
      id: "meeting",
      icon: "📅",
      title: "Agendar Reunião",
      description: "Conversa personalizada",
      type: "meeting",
      auto_message: AUTO_MESSAGES.meeting,
    },
  ]

  return (
    <div className="p-4 space-y-4">
      {/* Bot Welcome */}
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 
                      rounded-full flex items-center justify-center flex-shrink-0"
        >
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="bg-gray-100 rounded-2xl rounded-tl-md p-4 max-w-[250px]">
          <p className="text-gray-800 font-medium text-sm">
            Ótimo, {userName}! 🎉<br />
            Como posso te ajudar?
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => onSelectOption(option)}
            className="w-full bg-white border border-gray-200 
                     rounded-xl p-3 text-left hover:shadow-md hover:border-indigo-300 
                     transition-all duration-200 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xl group-hover:scale-110 transition-transform">{option.icon}</div>
                <div>
                  <h4
                    className="font-medium text-gray-800 group-hover:text-indigo-700 
                               transition-colors text-sm"
                  >
                    {option.title}
                  </h4>
                  <p className="text-xs text-gray-600">{option.description}</p>
                </div>
              </div>
              <ArrowRight
                className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 
                                   group-hover:translate-x-1 transition-all flex-shrink-0"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Info Cards */}
      <div className="space-y-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <div className="flex items-center gap-2 text-blue-800">
            <Clock className="w-4 h-4" />
            <div>
              <p className="font-medium text-xs">Horário de Atendimento</p>
              <p className="text-xs">Segunda a Sexta • 9h às 18h</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
          <p className="font-medium text-green-800 text-xs mb-1">📱 WhatsApp Direto</p>
          <p className="text-xs text-green-700">(17) 99785-3416</p>
        </div>
      </div>
    </div>
  )
}

// FAQ Component
const ChatBotFAQ = ({
  onBack,
  userName,
}: {
  onBack: () => void
  userName: string
}) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "Quanto tempo leva para desenvolver um site?",
      answer:
        "O tempo varia de acordo com a complexidade. Sites simples: 2-3 semanas. Sites complexos com funcionalidades avançadas: 4-8 semanas. Sempre fornecemos cronograma detalhado no início do projeto.",
    },
    {
      question: "Vocês desenvolvem aplicativos mobile?",
      answer:
        "Sim! Desenvolvemos apps nativos para iOS e Android, além de aplicações híbridas. Nosso portfólio inclui o app Bebidas ON, que revolucionou o delivery de bebidas.",
    },
    {
      question: "Qual é o investimento para um projeto?",
      answer:
        "Os valores variam conforme escopo e complexidade. Sites institucionais a partir de R$ 2.500. E-commerce a partir de R$ 5.000. Apps mobile a partir de R$ 8.000. Entre em contato para orçamento personalizado!",
    },
    {
      question: "Vocês oferecem suporte após a entrega?",
      answer:
        "Sim! Oferecemos 3 meses de suporte gratuito após a entrega. Depois disso, temos planos de manutenção mensal com preços acessíveis para garantir que tudo funcione perfeitamente.",
    },
    {
      question: "Posso acompanhar o desenvolvimento do projeto?",
      answer:
        "Claro! Você terá acesso a uma área cliente onde pode acompanhar o progresso, fazer comentários e aprovar cada etapa. Mantemos comunicação constante via WhatsApp e reuniões semanais.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-start gap-3 flex-1">
          <div
            className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 
                        rounded-full flex items-center justify-center flex-shrink-0"
          >
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-lg border border-gray-100">
            <p className="text-gray-800 font-medium">Aqui estão as perguntas mais frequentes, {userName}! 🤖</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden 
                     shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full p-4 text-left flex items-center justify-between 
                       hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
              {openFAQ === index ? (
                <ChevronUp className="w-5 h-5 text-purple-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>

            {openFAQ === index && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed mt-3">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 
                    rounded-xl p-4"
      >
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-purple-600" />
          <div>
            <p className="font-medium text-purple-800">Não encontrou sua resposta?</p>
            <p className="text-sm text-purple-600">Clique em "Falar com Atendente" para chat ao vivo!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Live Chat Component
const ChatBotLiveChat = ({
  onBack,
  userName,
  conversationId,
}: {
  onBack: () => void
  userName: string
  conversationId?: string | null
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isConnecting, setIsConnecting] = useState(true)
  const [isOnline, setIsOnline] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false)
      const currentHour = new Date().getHours()
      const isBusinessHours = currentHour >= 9 && currentHour < 18

      setIsOnline(isBusinessHours)

      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        conversation_id: conversationId || undefined,
        type: "bot",
        content: isBusinessHours
          ? `Olá ${userName}! Você está conectado com nossa equipe. Como posso ajudar?`
          : `Olá ${userName}! No momento estamos fora do horário de atendimento (9h às 18h). Deixe sua mensagem que responderemos em breve!`,
        timestamp: new Date(),
      }

      setMessages([welcomeMessage])
    }, 2000)

    return () => clearTimeout(timer)
  }, [userName, conversationId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      conversation_id: conversationId || undefined,
      type: "user",
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        conversation_id: conversationId || undefined,
        type: "bot",
        content: isOnline
          ? "Recebemos sua mensagem! Um de nossos especialistas responderá em instantes."
          : "Sua mensagem foi registrada! Entraremos em contato no próximo horário comercial.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 
                        rounded-full flex items-center justify-center"
          >
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Suporte GV Software</h4>
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-yellow-400"}`}></div>
              <span className="text-gray-600">
                {isConnecting ? "Conectando..." : isOnline ? "Online" : "Fora do horário"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {isConnecting ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Conectando com nossa equipe...</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start gap-2 max-w-[280px] ${
                    message.type === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user" ? "bg-gray-300" : "bg-gradient-to-br from-purple-500 to-blue-600"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-4 h-4 text-gray-600" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl p-3 ${
                      message.type === "user"
                        ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-br-md"
                        : "bg-white text-gray-800 rounded-tl-md shadow-sm border border-gray-100"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span
                      className={`text-xs mt-1 block ${message.type === "user" ? "text-white/70" : "text-gray-500"}`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      {!isConnecting && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 
                       focus:border-purple-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white 
                       px-4 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {!isOnline && (
            <div className="flex items-center gap-2 mt-2 text-sm text-yellow-600">
              <Clock className="w-4 h-4" />
              <span>Fora do horário. Suas mensagens serão respondidas em breve.</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Main ChatBot Component - EXPORTED AS NAMED EXPORT
export function AdvancedChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<ChatStep>("welcome")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
  })
  const [showWelcome, setShowWelcome] = useState(true)
  const [conversationId, setConversationId] = useState<string | null>(null)

  // Load saved state
  useEffect(() => {
    const savedData = localStorage.getItem("chatbot-data")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData(parsed.formData || formData)
        setCurrentStep(parsed.currentStep || "welcome")
        setConversationId(parsed.conversationId || null)
        setShowWelcome(parsed.currentStep === "welcome")
      } catch (error) {
        console.log("Erro ao carregar dados salvos do chatbot")
      }
    }
  }, [])

  // Save state
  useEffect(() => {
    const dataToSave = {
      formData,
      currentStep,
      conversationId,
      timestamp: Date.now(),
    }
    localStorage.setItem("chatbot-data", JSON.stringify(dataToSave))
  }, [formData, currentStep, conversationId])

  useEffect(() => {
    if (isOpen && showWelcome && currentStep === "welcome") {
      const timer = setTimeout(() => {
        setShowWelcome(false)
        setCurrentStep("form")
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, showWelcome, currentStep])

  const handleFormComplete = async () => {
    try {
      const mockConversationId = Date.now().toString()
      setConversationId(mockConversationId)
      console.log("Conversa criada:", mockConversationId)
    } catch (error) {
      console.error("Erro ao criar conversa:", error)
    }

    setCurrentStep("options")
  }

  const handleSelectOption = async (option: ChatOption) => {
    console.log("Opção selecionada:", option.title)

    switch (option.type) {
      case "live_chat":
        setCurrentStep("chat")
        break
      case "faq":
        setCurrentStep("faq")
        break
      case "quote":
        window.location.href = "/contato"
        break
      case "services":
        window.location.href = "/servicos"
        break
      case "meeting":
        window.open(
          "https://wa.me/5517997853416?text=Olá! Gostaria de agendar uma reunião para falar sobre meu projeto.",
          "_blank",
        )
        break
    }
  }

  const resetChat = () => {
    setFormData({ name: "", email: "", phone: "", subject: "" })
    setCurrentStep("welcome")
    setShowWelcome(true)
    setConversationId(null)
    localStorage.removeItem("chatbot-data")
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div>
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          {/* Help Message - Responsive positioning */}
          <div
            className="absolute -top-10 sm:-top-12 -left-24 sm:-left-32 bg-white shadow-2xl border border-gray-200
                       px-3 py-2 sm:px-4 sm:py-3 rounded-2xl text-gray-800 transform transition-all 
                       duration-500 hover:scale-105 backdrop-blur-sm animate-pulse max-w-[200px] sm:max-w-none"
            style={{ animationDuration: "3s" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-xs text-gray-700">Em que posso ajudar hoje? 🤖</span>
            </div>
            <div
              className="absolute bottom-0 right-4 sm:right-6 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] 
                          border-l-transparent border-r-transparent border-t-white"
            ></div>
          </div>

          {/* Chatbot Button - Responsive size */}
          <div className="relative">
            {/* Pulse rings */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 
                          animate-ping opacity-20"
            ></div>
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 
                          animate-ping opacity-15"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Main button - Responsive size */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 
                       text-white p-2 sm:p-3 rounded-full shadow-2xl hover:shadow-indigo-500/25 
                       transition-all duration-500 hover:scale-110 group
                       border-2 border-white/30 animate-bounce hover:animate-none
                       backdrop-blur-sm w-12 h-12 sm:w-14 sm:h-14"
            >
              {/* Inner gradient */}
              <div
                className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent 
                            rounded-full opacity-50"
              ></div>

              {/* Robot icon - Responsive size */}
              <RobotIcon
                className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 mx-auto group-hover:scale-110 
                                  transition-transform duration-300"
              />

              {/* Glow effect */}
              <div
                className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white/40 rounded-full blur-sm 
                            group-hover:w-3 group-hover:h-3 sm:group-hover:w-3.5 sm:group-hover:h-3.5 transition-all duration-300"
              ></div>
            </button>

            {/* Online indicator */}
            <div
              className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 
                          rounded-full border-2 border-white shadow-lg animate-pulse"
            >
              <div className="w-0.5 h-0.5 bg-white rounded-full mx-auto mt-0.5"></div>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50">
          <div
            className="fixed bottom-0 right-0 w-full h-full sm:w-[360px] sm:h-[520px] 
                       bg-white shadow-2xl transition-all duration-500 rounded-t-3xl sm:rounded-3xl
                       sm:bottom-6 sm:right-6 overflow-hidden flex flex-col border border-gray-200
                       transform"
          >
            {/* Header */}
            <div
              className="relative flex items-center justify-between p-4 
                          bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700
                          text-white flex-shrink-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 bg-white/20 rounded-xl flex items-center 
                              justify-center backdrop-blur-sm"
                >
                  <RobotIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base">GV Assistant</h3>
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    Online • Sempre pronto para ajudar
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  className="text-white/80 hover:text-white transition-colors
                           hover:bg-white/10 p-1.5 rounded-lg text-xs font-medium"
                  title="Nova conversa"
                >
                  🔄
                </button>

                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white transition-colors
                           hover:bg-white/10 p-1.5 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
              {currentStep === "welcome" && showWelcome && (
                <div className="h-full flex items-center justify-center p-6">
                  <div className="text-center space-y-4">
                    <div
                      className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 
                                  rounded-3xl flex items-center justify-center shadow-2xl"
                    >
                      <RobotIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-800 text-xl">Olá! 👋</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Sou o assistente inteligente da
                        <br />
                        <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          GV Software
                        </span>
                        <br />
                        Como posso te ajudar hoje?
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === "form" && (
                <div className="h-full overflow-y-auto">
                  <ChatBotForm formData={formData} setFormData={setFormData} onComplete={handleFormComplete} />
                </div>
              )}

              {currentStep === "options" && (
                <div className="h-full overflow-y-auto">
                  <ChatBotOptions onSelectOption={handleSelectOption} userName={formData.name} />
                </div>
              )}

              {currentStep === "faq" && (
                <div className="h-full overflow-y-auto">
                  <ChatBotFAQ onBack={() => setCurrentStep("options")} userName={formData.name} />
                </div>
              )}

              {currentStep === "chat" && (
                <ChatBotLiveChat
                  onBack={() => setCurrentStep("options")}
                  userName={formData.name}
                  conversationId={conversationId}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
