"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Smartphone,
  Globe,
  Settings,
  Palette,
  ArrowRight,
  Star,
  MessageSquare,
  Sparkles,
  Zap,
  Users,
  CheckCircle,
  Play,
  Award,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import type { SiteStats } from "@/lib/supabase-stats"
import type { Project } from "@/lib/supabase-projects"

interface HomePageClientProps {
  stats: SiteStats
  featuredProjects: Project[]
}

export default function HomePageClient({ stats, featuredProjects }: HomePageClientProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  const testimonials = [
    {
      name: "Renan",
      company: "Fundador, Bebidas ON",
      text: "A GV Software desenvolveu nosso aplicativo Bebidas ON com excelência. A solução criada revolucionou nosso negócio de delivery de bebidas, proporcionando uma experiência incrível para nossos clientes e otimizando nossos processos internos. Recomendo totalmente!",
      rating: 5,
      avatar: "R",
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [mounted, testimonials.length])

  useEffect(() => {
    if (!mounted || featuredProjects.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [mounted, featuredProjects.length])

  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mounted])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const getStatusBadge = (status: string) => {
    if (status === "Concluído") {
      return {
        text: "✨ Projeto Destaque",
        className: "bg-green-500/20 text-green-400 border-green-500/30",
      }
    }
    return {
      text: "🔧 Em Desenvolvimento",
      className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 transition-all duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`,
        }}
      />

      <section className="pt-24 pb-16 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <div className="mb-8">
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-400/30 px-6 py-3 text-sm backdrop-blur-sm shadow-lg text-purple-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Inovação & Tecnologia de Ponta
              </Badge>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Transformando
                <br />
                <span className="text-gray-300">suas</span>{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  ideias
                </span>{" "}
                em
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  realidade digital
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Criamos soluções digitais inovadoras que impulsionam o crescimento do seu negócio com tecnologia de
                ponta e design excepcional.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/contato">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                  <Play className="w-5 h-5 mr-2" />
                  Contato
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  className="border-2 border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <Award className="w-5 h-5 mr-2" />
                  Ver Portfolio
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              {
                number: `${stats.projects_completed}+`,
                label: "Projetos Finalizados",
                icon: Target,
                color: "from-green-500 to-emerald-500",
              },
              {
                number: `${stats.satisfied_clients}+`,
                label: "Clientes Satisfeitos",
                icon: Users,
                color: "from-blue-500 to-cyan-500",
              },
              {
                number: `${stats.years_experience}+`,
                label: `Ano${stats.years_experience > 1 ? "s" : ""} de Experiência`,
                icon: Award,
                color: "from-purple-500 to-pink-500",
              },
              {
                number: `${stats.team_members}+`,
                label: `Membro${stats.team_members > 1 ? "s" : ""} da Equipe`,
                icon: CheckCircle,
                color: "from-orange-500 to-red-500",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className="bg-slate-800/80 border-slate-700/50 backdrop-blur-xl hover:bg-slate-700/80 transition-all duration-300 hover:scale-105 group"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30 px-4 py-2 text-sm mb-4 text-blue-300"
              >
                <Globe className="w-4 h-4 mr-2" />
                Projetos em Destaque
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Nossos{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Trabalhos
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Conheça alguns dos projetos que desenvolvemos com excelência e inovação tecnológica.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {featuredProjects.map((project) => {
                    const badge = getStatusBadge(project.status)
                    return (
                      <div key={project.id} className="w-full flex-shrink-0">
                        <Card className="bg-slate-800/80 border-slate-700/50 overflow-hidden backdrop-blur-xl shadow-2xl">
                          <div className="relative">
                            <img
                              src={project.images[0] || "/placeholder.svg"}
                              alt={project.title}
                              className={`w-full h-64 md:h-80 transition-transform duration-500 ${
                                project.id === 1 ? "object-contain bg-slate-800" : "object-cover"
                              }`}
                            />
                            <div className="absolute top-4 right-4">
                              <Badge variant="outline" className={`${badge.className} shadow-lg`}>
                                {badge.text}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-8">
                            <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                            <p className="text-gray-300 mb-6 text-lg leading-relaxed">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.technologies.slice(0, 4).map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="bg-slate-700/80 border-slate-600 text-gray-300 px-3 py-1"
                                >
                                  {tech}
                                </Badge>
                              ))}
                              {project.technologies.length > 4 && (
                                <Badge
                                  variant="outline"
                                  className="bg-slate-700/80 border-slate-600 text-gray-300 px-3 py-1"
                                >
                                  +{project.technologies.length - 4}
                                </Badge>
                              )}
                            </div>
                            {project.show_project_button && project.project_url && (
                              <Link href={project.project_url} target="_blank">
                                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full w-full hover:scale-105 transition-transform duration-300 text-lg font-semibold">
                                  <Globe className="w-5 h-5 mr-2" />
                                  Ver Projeto Completo
                                  <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                              </Link>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )
                  })}
                </div>
              </div>

              {featuredProjects.length > 1 && (
                <>
                  <Button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full w-12 h-12 z-10 shadow-lg"
                    size="icon"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full w-12 h-12 z-10 shadow-lg"
                    size="icon"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>

                  <div className="flex justify-center mt-6 space-x-2">
                    {featuredProjects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 scale-125"
                            : "bg-slate-600 hover:bg-slate-500"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4 bg-slate-800/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-400/30 px-4 py-2 text-sm mb-4 text-green-300"
            >
              <Zap className="w-4 h-4 mr-2" />
              Nossos Serviços
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Soluções{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Completas
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Code,
                title: "Desenvolvimento Web",
                description: "Sites e sistemas modernos",
                gradient: "from-purple-500 to-blue-500",
              },
              {
                icon: Smartphone,
                title: "Apps Mobile",
                description: "Desenvolvimento iOS e Android",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Palette,
                title: "Design UI/UX",
                description: "Interfaces modernas e intuitivas",
                gradient: "from-pink-500 to-purple-500",
              },
              {
                icon: Settings,
                title: "Consultoria",
                description: "Assessoria especializada em TI",
                gradient: "from-green-500 to-teal-500",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="bg-slate-800/80 border-slate-700/50 hover:scale-105 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              O Que Nossos{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Clientes Dizem
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-800/80 border-slate-700/50 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 text-yellow-400 fill-current mx-1" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed italic font-light">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">{testimonials[currentTestimonial].avatar}</span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white text-xl">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-400 text-lg">{testimonials[currentTestimonial].company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-purple-600/10 to-blue-600/10">
        <div className="container mx-auto max-w-7xl">
          <Card className="bg-slate-800/80 border-slate-700/50 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-12">
              <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Pronto para transformar sua ideia em realidade?
                  </h3>
                  <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                    Entre em contato conosco e descubra como podemos impulsionar seu negócio.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link href="/contato">
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Começar Agora
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
