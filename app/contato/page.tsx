"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, Loader2, CheckCircle } from "lucide-react"

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
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Entre em <span className="gradient-text">Contato</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Transformamos suas ideias em soluções digitais inovadoras.
            <br />
            Vamos conversar sobre seu próximo projeto.
          </p>

          {/* Stats Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-700 hover:border-slate-600 transition-all duration-300">
              <Mail className="w-5 h-5 text-yellow-400" />
              <span className="text-white text-sm font-medium">contato.gvsoftware@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-700 hover:border-slate-600 transition-all duration-300">
              <Phone className="w-5 h-5 text-green-400" />
              <span className="text-white text-sm font-medium">(17) 99785-3416</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Resposta em 24h */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 text-center group hover:scale-105">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Resposta em 24h</h3>
                <p className="text-gray-400">Garantimos resposta rápida</p>
              </CardContent>
            </Card>

            {/* Orçamento Gratuito */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 text-center group hover:scale-105">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Orçamento Gratuito</h3>
                <p className="text-gray-400">Sem compromisso inicial</p>
              </CardContent>
            </Card>

            {/* Suporte Completo */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 text-center group hover:scale-105">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Suporte Completo</h3>
                <p className="text-gray-400">Acompanhamento total do projeto</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              {/* Email */}
              <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                      <p className="text-gray-400">contato.gvsoftware@gmail.com</p>
                      <a
                        href="mailto:contato.gvsoftware@gmail.com"
                        className="text-purple-400 hover:text-purple-300 text-sm"
                      >
                        Enviar email →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Telefone */}
              <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Telefone</h3>
                      <p className="text-gray-400">(17) 99785-3416</p>
                      <a href="tel:+5517997853416" className="text-purple-400 hover:text-purple-300 text-sm">
                        Ligar agora →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Horário de Atendimento */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Horário de Atendimento</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Segunda - Sexta:</span>
                      <span className="text-white">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sábado:</span>
                      <span className="text-white">9:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Domingo:</span>
                      <span className="text-white">Fechado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Envie sua <span className="gradient-text">mensagem</span>
                </h2>
                <p className="text-gray-400">
                  Preencha o formulário abaixo e receberemos sua mensagem diretamente no email.
                </p>
              </div>

              {isSubmitted ? (
                <Card className="bg-gradient-to-br from-green-600/20 to-teal-600/20 border-green-500/30 animate-scale-in">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Mensagem Enviada com Sucesso!</h3>
                    <p className="text-gray-300 mb-4">
                      Obrigado pelo contato! Recebemos sua mensagem e responderemos em breve.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-green-400">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Você receberá uma resposta em até 24 horas</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Nome */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white font-medium flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
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
                            className={`bg-slate-700/50 border-2 text-white placeholder:text-gray-400 rounded-xl py-3 px-4 transition-all duration-300 ${
                              errors.name
                                ? "border-red-500 focus:border-red-400"
                                : focusedField === "name"
                                  ? "border-purple-500 shadow-lg shadow-purple-500/20"
                                  : "border-slate-600 focus:border-purple-500"
                            }`}
                            placeholder="Seu nome"
                          />
                          {errors.name && (
                            <div className="flex items-center space-x-1 mt-1 text-red-400 text-sm animate-slide-in-up">
                              <Mail className="w-3 h-3" />
                              <span>{errors.name}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white font-medium flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
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
                            className={`bg-slate-700/50 border-2 text-white placeholder:text-gray-400 rounded-xl py-3 px-4 transition-all duration-300 ${
                              errors.email
                                ? "border-red-500 focus:border-red-400"
                                : focusedField === "email"
                                  ? "border-purple-500 shadow-lg shadow-purple-500/20"
                                  : "border-slate-600 focus:border-purple-500"
                            }`}
                            placeholder="seu.email@exemplo.com"
                          />
                          {errors.email && (
                            <div className="flex items-center space-x-1 mt-1 text-red-400 text-sm animate-slide-in-up">
                              <Phone className="w-3 h-3" />
                              <span>{errors.email}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Assunto - DROPDOWN */}
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-white font-medium flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Assunto *</span>
                        </Label>
                        <Select value={formData.subject} onValueChange={handleSubjectChange}>
                          <SelectTrigger
                            className={`bg-slate-700/50 border-2 text-white rounded-xl py-3 px-4 h-12 transition-all duration-300 ${
                              errors.subject
                                ? "border-red-500 focus:border-red-400"
                                : "border-slate-600 focus:border-purple-500"
                            }`}
                          >
                            <SelectValue placeholder="Selecione o assunto" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="Orçamento" className="text-white hover:bg-slate-700">
                              💰 Solicitar Orçamento
                            </SelectItem>
                            <SelectItem value="Serviços" className="text-white hover:bg-slate-700">
                              🚀 Informações sobre Serviços
                            </SelectItem>
                            <SelectItem value="Suporte" className="text-white hover:bg-slate-700">
                              🛠️ Suporte Técnico
                            </SelectItem>
                            <SelectItem value="Dúvida" className="text-white hover:bg-slate-700">
                              ❓ Dúvida Geral
                            </SelectItem>
                            <SelectItem value="Parceria" className="text-white hover:bg-slate-700">
                              🤝 Proposta de Parceria
                            </SelectItem>
                            <SelectItem value="Outro" className="text-white hover:bg-slate-700">
                              📋 Outro Assunto
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.subject && (
                          <div className="flex items-center space-x-1 mt-1 text-red-400 text-sm animate-slide-in-up">
                            <Mail className="w-3 h-3" />
                            <span>{errors.subject}</span>
                          </div>
                        )}
                      </div>

                      {/* Mensagem */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white font-medium flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
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
                            rows={5}
                            className={`bg-slate-700/50 border-2 text-white placeholder:text-gray-400 rounded-xl py-3 px-4 transition-all duration-300 resize-none ${
                              errors.message
                                ? "border-red-500 focus:border-red-400"
                                : focusedField === "message"
                                  ? "border-purple-500 shadow-lg shadow-purple-500/20"
                                  : "border-slate-600 focus:border-purple-500"
                            }`}
                            placeholder="Descreva seu projeto ou dúvida..."
                          />
                          <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                            {formData.message.length}/500
                          </div>
                          {errors.message && (
                            <div className="flex items-center space-x-1 mt-1 text-red-400 text-sm animate-slide-in-up">
                              <Mail className="w-3 h-3" />
                              <span>{errors.message}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-3">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Enviando mensagem...</span>
                            <div className="flex space-x-1">
                              <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                              <div
                                className="w-1 h-1 bg-white rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-1 h-1 bg-white rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <Mail className="w-5 h-5" />
                            <span>Enviar Mensagem</span>
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
