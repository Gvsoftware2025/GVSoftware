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
  Sparkles,
  Zap,
  Users,
  CheckCircle,
  Play,
  Award,
  Target,
  ChevronLeft,
  ChevronRight,
  Rocket,
  TrendingUp,
  Shield,
  Clock,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div
        className="absolute inset-0 opacity-30 transition-all duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.2), transparent 70%)`,
        }}
      />

      <section className="pt-32 pb-20 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="mb-10 animate-fade-in">
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 border-purple-400/40 px-8 py-3.5 text-base backdrop-blur-md shadow-2xl text-purple-200 hover:scale-105 transition-transform duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                Inovação & Tecnologia de Ponta
              </Badge>
            </div>

            <div className="space-y-8 mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tight">
                Transformando
                <br />
                <span className="relative inline-block">
                  <span className="text-gray-300">suas</span>{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
                    ideias
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
                </span>{" "}
                em
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
                  realidade digital
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
                Criamos soluções digitais inovadoras que impulsionam o crescimento do seu negócio com{" "}
                <span className="text-purple-400 font-semibold">tecnologia de ponta</span> e{" "}
                <span className="text-blue-400 font-semibold">design excepcional</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <Link href="/contato">
                <Button className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-10 py-6 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <Play className="w-6 h-6 mr-3 relative z-10" />
                  <span className="relative z-10">Começar Projeto</span>
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform relative z-10" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  className="group border-2 border-purple-400/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 px-10 py-6 rounded-2xl font-bold text-lg backdrop-blur-md transition-all duration-300 hover:scale-105 bg-slate-800/30"
                >
                  <Award className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                  Ver Portfolio
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>100% Seguro</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600" />
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Entrega Rápida</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600" />
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span>Resultados Garantidos</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {[
              {
                number: `${stats.projects_completed}+`,
                label: "Projetos Finalizados",
                icon: Target,
                color: "from-emerald-500 via-green-500 to-teal-500",
                shadowColor: "shadow-emerald-500/20",
              },
              {
                number: `${stats.satisfied_clients}+`,
                label: "Clientes Satisfeitos",
                icon: Users,
                color: "from-blue-500 via-cyan-500 to-sky-500",
                shadowColor: "shadow-blue-500/20",
              },
              {
                number: `${stats.years_experience}+`,
                label: `Ano${stats.years_experience > 1 ? "s" : ""} de Experiência`,
                icon: Award,
                color: "from-purple-500 via-pink-500 to-rose-500",
                shadowColor: "shadow-purple-500/20",
              },
              {
                number: `${stats.team_members}+`,
                label: `Membro${stats.team_members > 1 ? "s" : ""} da Equipe`,
                icon: CheckCircle,
                color: "from-orange-500 via-amber-500 to-yellow-500",
                shadowColor: "shadow-orange-500/20",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className={`group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50 backdrop-blur-xl hover:border-slate-600 transition-all duration-500 hover:scale-105 overflow-hidden ${stat.shadowColor} hover:shadow-2xl`}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

                <CardContent className="p-8 text-center relative">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl relative`}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-3xl blur-sm" />
                    <stat.icon className="w-10 h-10 text-white relative z-10" strokeWidth={2.5} />
                  </div>

                  <div className="text-4xl md:text-5xl font-black text-white mb-3 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-300 font-medium">{stat.label}</div>
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

      <section className="py-24 px-4 bg-slate-800/20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-400/40 px-6 py-3 text-base mb-6 text-green-300 backdrop-blur-md"
            >
              <Zap className="w-5 h-5 mr-2" />
              Nossos Serviços
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Soluções{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Completas
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Oferecemos um portfólio completo de serviços para transformar sua visão em realidade digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                title: "Desenvolvimento Web",
                description: "Sites e sistemas web modernos, responsivos e otimizados para performance",
                gradient: "from-purple-500 via-purple-600 to-blue-600",
                features: ["React & Next.js", "SEO Otimizado", "Performance"],
              },
              {
                icon: Smartphone,
                title: "Apps Mobile",
                description: "Aplicativos nativos e híbridos para iOS e Android com UX excepcional",
                gradient: "from-blue-500 via-cyan-500 to-sky-600",
                features: ["iOS & Android", "React Native", "UX Premium"],
              },
              {
                icon: Palette,
                title: "Design UI/UX",
                description: "Interfaces modernas, intuitivas e focadas na experiência do usuário",
                gradient: "from-pink-500 via-rose-500 to-purple-600",
                features: ["Figma", "Protótipos", "Design System"],
              },
              {
                icon: Settings,
                title: "Consultoria Tech",
                description: "Assessoria especializada em tecnologia e transformação digital",
                gradient: "from-green-500 via-emerald-500 to-teal-600",
                features: ["Arquitetura", "DevOps", "Cloud"],
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50 hover:border-slate-600 transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <CardContent className="p-8 relative">
                  <div className="relative mb-6">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
                    />
                    <div
                      className={`relative w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}
                    >
                      <service.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed mb-6">{service.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="outline"
                        className="bg-slate-700/50 border-slate-600/50 text-gray-300 text-xs px-3 py-1"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/servicos">
              <Button
                variant="outline"
                className="group border-2 border-purple-400/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-md transition-all duration-300 hover:scale-105 bg-transparent"
              >
                Ver Todos os Serviços
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10" />

        <div className="container mx-auto max-w-7xl relative">
          <Card className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-slate-700/50 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-20 blur-2xl" />

            <CardContent className="p-12 md:p-16 relative">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-3xl opacity-50 animate-pulse" />
                  <div className="relative w-28 h-28 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500">
                    <div className="absolute inset-0 bg-white/20 rounded-3xl blur-sm" />
                    <Rocket className="w-14 h-14 text-white relative z-10" strokeWidth={2.5} />
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                    Pronto para{" "}
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                      transformar
                    </span>
                    <br />
                    sua ideia em realidade?
                  </h3>
                  <p className="text-gray-300 mb-10 text-xl leading-relaxed max-w-2xl">
                    Entre em contato conosco e descubra como podemos impulsionar seu negócio com tecnologia de ponta e
                    design excepcional.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                    <Link href="/contato">
                      <Button className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-10 py-6 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <Sparkles className="w-6 h-6 mr-3 relative z-10" />
                        <span className="relative z-10">Começar Agora</span>
                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform relative z-10" />
                      </Button>
                    </Link>
                    <Link href="/portfolio">
                      <Button
                        variant="outline"
                        className="border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-slate-500 px-10 py-6 rounded-2xl font-bold text-lg backdrop-blur-md transition-all duration-300 hover:scale-105 bg-transparent"
                      >
                        <Award className="w-6 h-6 mr-3" />
                        Ver Casos de Sucesso
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .bg-300\% {
          background-size: 300% 300%;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
