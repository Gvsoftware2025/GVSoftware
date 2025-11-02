"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, Loader2, CheckCircle, MapPin, Clock, Send, Sparkles, MessageSquare, User } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Nome é obrigatório"
        if (value.trim().length < 2) return "Nome deve ter pelo menos 2 caracteres"
        break
      case "email":
        if (!value.trim()) return "Email é obrigatório"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return "Email inválido"
        break
      case "subject":
        if (!value.trim()) return "Assunto é obrigatório"
        break
      case "message":
        if (!value.trim()) return "Mensagem é obrigatória"
        if (value.trim().length < 10) return "Mensagem deve ter pelo menos 10 caracteres"
        break
    }
    return undefined
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: FormErrors = {}
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error) newErrors[key as keyof FormErrors] = error
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      // Enviar para a API
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar mensagem")
      }

      // Sucesso!
      setIsSubmitted(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        setErrors({})
      }, 5000)
    } catch (error) {
      console.error("Erro ao enviar:", error)
      alert("Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato diretamente pelo email.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }
    setFocusedField(null)
  }

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
  }

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }))

    // Clear error when subject is selected
    if (errors.subject) {
      setErrors((prev) => ({
        ...prev,
        subject: undefined,
      }))
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 relative">
      <AnimatedBackground />

      <section className="pt-32 pb-20 px-4 relative">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in mb-8">
            <Badge className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30 px-6 py-3 text-sm backdrop-blur-sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Fale Conosco
            </Badge>
          </div>

          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-float shadow-2xl">
            <Mail className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-in-up font-poppins">
            Entre em <span className="gradient-text">Contato</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-in-up">
            Transformamos suas ideias em soluções digitais inovadoras. Vamos conversar sobre seu próximo projeto.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <a
              href="mailto:contato.gvsoftware@gmail.com"
              className="flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 group"
            >
              <Mail className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
              <span className="text-white text-sm font-medium">contato.gvsoftware@gmail.com</span>
            </a>
            <a
              href="tel:+5517997853416"
              className="flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-700 hover:border-green-500 transition-all duration-300 hover:scale-105 group"
            >
              <Phone className="w-5 h-5 text-green-400 group-hover:text-green-300" />
              <span className="text-white text-sm font-medium">(17) 99785-3416</span>
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Resposta em 24h",
                description: "Garantimos resposta rápida para todas as mensagens",
                gradient: "from-blue-600 to-cyan-600",
              },
              {
                icon: Sparkles,
                title: "Orçamento Gratuito",
                description: "Análise completa sem compromisso inicial",
                gradient: "from-green-600 to-teal-600",
              },
              {
                icon: CheckCircle,
                title: "Suporte Completo",
                description: "Acompanhamento total durante todo o projeto",
                gradient: "from-purple-600 to-pink-600",
              },
            ].map((benefit, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 text-center group hover:scale-105 backdrop-blur-sm h-full">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                    >
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
              Nossa <span className="gradient-text">Localização</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Estamos localizados em São José do Rio Preto, SP, atendendo clientes em todo o Brasil.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <Card className="bg-slate-800/50 border-slate-700 overflow-hidden backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="relative h-[400px] bg-slate-700/50">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709486092!2d-49.46383!3d-20.81972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bdada5e0d8c5e5%3A0x5c7e6f0c1c8c8c8c!2sS%C3%A3o%20Jos%C3%A9%20do%20Rio%20Preto%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {/* Email */}
              <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                      <p className="text-gray-400 text-sm mb-2">contato.gvsoftware@gmail.com</p>
                      <a
                        href="mailto:contato.gvsoftware@gmail.com"
                        className="text-purple-400 hover:text-purple-300 text-sm font-medium inline-flex items-center gap-1 transition-colors"
                      >
                        Enviar email
                        <Send className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Telefone */}
              <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">Telefone</h3>
                      <p className="text-gray-400 text-sm mb-2">(17) 99785-3416</p>
                      <a
                        href="tel:+5517997853416"
                        className="text-green-400 hover:text-green-300 text-sm font-medium inline-flex items-center gap-1 transition-colors"
                      >
                        Ligar agora
                        <Phone className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Localização */}
              <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">Localização</h3>
                      <p className="text-gray-400 text-sm">São José do Rio Preto, SP</p>
                      <p className="text-gray-500 text-xs mt-1">Atendimento em todo o Brasil</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Horário de Atendimento */}
              <Card className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-4">Horário de Atendimento</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">Segunda - Sexta:</span>
                          <span className="text-white font-medium text-sm">9:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">Sábado:</span>
                          <span className="text-white font-medium text-sm">9:00 - 13:00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">Domingo:</span>
                          <span className="text-gray-400 font-medium text-sm">Fechado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
              Envie sua <span className="gradient-text">mensagem</span>
            </h2>
            <p className="text-xl text-gray-400">
              Preencha o formulário abaixo e receberemos sua mensagem diretamente no email.
            </p>
          </div>

          {isSubmitted ? (
            <Card className="bg-gradient-to-br from-green-600/20 to-teal-600/20 border-green-500/30 animate-scale-in backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce shadow-2xl">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Mensagem Enviada com Sucesso!</h3>
                <p className="text-gray-300 text-lg mb-6">
                  Obrigado pelo contato! Recebemos sua mensagem e responderemos em breve.
                </p>
                <div className="flex items-center justify-center space-x-2 text-green-400">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">Você receberá uma resposta em até 24 horas</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nome */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium flex items-center space-x-2 text-base">
                      <User className="w-4 h-4 text-purple-400" />
                      <span>Nome Completo *</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={handleBlur}
                        className={`bg-slate-700/50 border-2 text-white placeholder:text-gray-400 rounded-xl py-6 px-4 transition-all duration-300 text-base ${
                          errors.name
                            ? "border-red-500 focus:border-red-400"
                            : focusedField === "name"
                              ? "border-purple-500 shadow-lg shadow-purple-500/20"
                              : "border-slate-600 focus:border-purple-500"
                        }`}
                        placeholder="Seu nome completo"
                      />
                      {errors.name && (
                        <div className="flex items-center space-x-1 mt-2 text-red-400 text-sm animate-slide-in-up">
                          <span>⚠</span>
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium flex items-center space-x-2 text-base">
                      <Mail className="w-4 h-4 text-purple-400" />
                      <span>Email *</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        className={`bg-slate-700/50 border-2 text-white placeholder:text-gray-400 rounded-xl py-6 px-4 transition-all duration-300 text-base ${
                          errors.email
                            ? "border-red-500 focus:border-red-400"
                            : focusedField === "email"
                              ? "border-purple-500 shadow-lg shadow-purple-500/20"
                              : "border-slate-600 focus:border-purple-500"
                        }`}
                        placeholder="seu.email@exemplo.com"
                      />
                      {errors.email && (
                        <div className="flex items-center space-x-1 mt-2 text-red-400 text-sm animate-slide-in-up">
                          <span>⚠</span>
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Assunto */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white font-medium flex items-center space-x-2 text-base">
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                      <span>Assunto *</span>
                    </Label>
                    <Select value={formData.subject} onValueChange={handleSubjectChange}>
                      <SelectTrigger
                        className={`bg-slate-700/50 border-2 text-white rounded-xl py-6 px-4 h-auto transition-all duration-300 text-base ${
                          errors.subject
                            ? "border-red-500 focus:border-red-400"
                            : "border-slate-600 focus:border-purple-500"
                        }`}
                      >
                        <SelectValue placeholder="Selecione o assunto da sua mensagem" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="Orçamento" className="text-white hover:bg-slate-700 py-3">
                          💰 Solicitar Orçamento
                        </SelectItem>
                        <SelectItem value="Serviços" className="text-white hover:bg-slate-700 py-3">
                          🚀 Informações sobre Serviços
                        </SelectItem>
                        <SelectItem value="Suporte" className="text-white hover:bg-slate-700 py-3">
                          🛠️ Suporte Técnico
                        </SelectItem>
                        <SelectItem value="Dúvida" className="text-white hover:bg-slate-700 py-3">
                          ❓ Dúvida Geral
                        </SelectItem>
                        <SelectItem value="Parceria" className="text-white hover:bg-slate-700 py-3">
                          🤝 Proposta de Parceria
                        </SelectItem>
                        <SelectItem value="Outro" className="text-white hover:bg-slate-700 py-3">
                          📋 Outro Assunto
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subject && (
                      <div className="flex items-center space-x-1 mt-2 text-red-400 text-sm animate-slide-in-up">
                        <span>⚠</span>
                        <span>{errors.subject}</span>
                      </div>
                    )}
                  </div>

                  {/* Mensagem */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white font-medium flex items-center space-x-2 text-base">
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                      <span>Mensagem *</span>
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus("message")}
                        onBlur={handleBlur}
                        rows={6}
                        maxLength={500}
                        className={`bg-slate-700/50 border-2 text-white placeholder:text-gray-400 rounded-xl py-4 px-4 transition-all duration-300 resize-none text-base ${
                          errors.message
                            ? "border-red-500 focus:border-red-400"
                            : focusedField === "message"
                              ? "border-purple-500 shadow-lg shadow-purple-500/20"
                              : "border-slate-600 focus:border-purple-500"
                        }`}
                        placeholder="Descreva seu projeto, dúvida ou necessidade..."
                      />
                      <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-slate-800/80 px-2 py-1 rounded">
                        {formData.message.length}/500
                      </div>
                      {errors.message && (
                        <div className="flex items-center space-x-1 mt-2 text-red-400 text-sm animate-slide-in-up">
                          <span>⚠</span>
                          <span>{errors.message}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-2xl hover:shadow-purple-500/30"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Enviando mensagem...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Enviar Mensagem</span>
                      </div>
                    )}
                  </Button>

                  <p className="text-center text-gray-400 text-sm mt-4">
                    Ao enviar, você concorda com nossa política de privacidade
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
