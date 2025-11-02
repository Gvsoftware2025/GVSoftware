"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Code,
  Users,
  Target,
  TrendingUp,
  Globe,
  Shield,
  Zap,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Rocket,
  Calendar,
  Star,
  Heart,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"

export default function SobrePage() {
  const teamMembers = [
    {
      name: "Gabriel Vieira",
      role: "CEO & Full Stack Developer",
      image: "/professional-developer-portrait.png",
      bio: "Especialista em desenvolvimento web com foco em soluções escaláveis e inovadoras.",
      skills: ["React", "Next.js", "Node.js", "TypeScript"],
      social: {
        github: "#",
        linkedin: "#",
        email: "gabriel@gvsoftware.com",
      },
    },
    {
      name: "Vitor Silva",
      role: "CTO & Backend Specialist",
      image: "/tech-lead-portrait.png",
      bio: "Arquiteto de software com expertise em sistemas distribuídos e cloud computing.",
      skills: ["Python", "AWS", "Docker", "PostgreSQL"],
      social: {
        github: "#",
        linkedin: "#",
        email: "vitor@gvsoftware.com",
      },
    },
    {
      name: "Ana Costa",
      role: "UI/UX Designer",
      image: "/designer-portrait.png",
      bio: "Designer criativa focada em experiências digitais memoráveis e interfaces intuitivas.",
      skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
      social: {
        github: "#",
        linkedin: "#",
        email: "ana@gvsoftware.com",
      },
    },
  ]

  const timeline = [
    {
      year: "2024",
      title: "Fundação da GV Software",
      description: "Início da jornada com foco em soluções web inovadoras e design excepcional.",
      icon: Rocket,
      color: "from-purple-600 to-blue-600",
    },
    {
      year: "2024 Q2",
      title: "Primeiros Clientes",
      description: "Conquistamos nossos primeiros clientes e entregamos projetos de sucesso.",
      icon: Star,
      color: "from-blue-600 to-cyan-600",
    },
    {
      year: "2024 Q3",
      title: "Expansão da Equipe",
      description: "Crescimento do time com profissionais especializados em diferentes áreas.",
      icon: Users,
      color: "from-cyan-600 to-teal-600",
    },
    {
      year: "2025",
      title: "Novos Horizontes",
      description: "Expandindo nosso portfólio e alcançando novos mercados com soluções inovadoras.",
      icon: TrendingUp,
      color: "from-teal-600 to-green-600",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 relative">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30 px-6 py-3 text-sm backdrop-blur-sm mb-8">
              <Award className="w-4 h-4 mr-2" />
              Nossa História & Missão
            </Badge>
          </div>

          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-float shadow-2xl">
            <Users className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-in-up font-poppins">
            Sobre a <span className="gradient-text">GV Software</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Somos uma empresa especializada em desenvolvimento de software, criando soluções digitais inovadoras que
            transformam negócios e impulsionam o crescimento através da tecnologia de ponta.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                number: "+3",
                label: "Projetos Entregues",
                sublabel: "Soluções desenvolvidas",
                gradient: "from-purple-600 to-blue-600",
              },
              {
                icon: Users,
                number: "+3",
                label: "Clientes Satisfeitos",
                sublabel: "Empresas atendidas",
                gradient: "from-blue-600 to-cyan-600",
              },
              {
                icon: Target,
                number: "1º",
                label: "Ano de Experiência",
                sublabel: "No mercado digital",
                gradient: "from-green-600 to-teal-600",
              },
              {
                icon: TrendingUp,
                number: "100%",
                label: "Taxa de Sucesso",
                sublabel: "Projetos bem-sucedidos",
                gradient: "from-pink-600 to-purple-600",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                >
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-400 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-300 font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30 px-6 py-3 text-sm backdrop-blur-sm mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              Nossa Jornada
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
              Linha do <span className="gradient-text">Tempo</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Acompanhe nossa evolução e os marcos importantes da nossa trajetória.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-blue-600 to-green-600 transform md:-translate-x-1/2" />

              {/* Timeline Items */}
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } animate-fade-in`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-900`}
                      >
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div
                      className={`w-full md:w-5/12 ml-24 md:ml-0 ${index % 2 === 0 ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"}`}
                    >
                      <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-300 border border-purple-500/30">
                              {item.year}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                          <p className="text-gray-400 leading-relaxed">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
              Nossa <span className="gradient-text">Essência</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Conheça os valores e princípios que guiam nossa jornada na criação de soluções digitais excepcionais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Nossa Missão */}
            <div className="animate-slide-in-left">
              <Card className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/30 h-full hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Nossa Missão</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Transformar ideias em soluções digitais inovadoras, oferecendo tecnologia de ponta que impulsiona o
                    crescimento e sucesso dos nossos clientes através de software de alta qualidade e design
                    excepcional.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Nossa Visão */}
            <div className="animate-slide-in-right">
              <Card className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 border-pink-500/30 h-full hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Nossa Visão</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Ser referência no desenvolvimento de software, reconhecida pela excelência técnica, inovação
                    constante e capacidade de criar soluções que realmente fazem a diferença no mercado digital
                    brasileiro.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Valores */}
          <div className="animate-fade-in">
            <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Nossos Valores</h3>
                  <p className="text-gray-400">Os princípios que norteiam cada projeto e decisão</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Inovação",
                      description: "Sempre buscando as melhores e mais modernas tecnologias",
                      icon: Lightbulb,
                    },
                    {
                      title: "Qualidade",
                      description: "Excelência em cada linha de código e pixel do design",
                      icon: CheckCircle,
                    },
                    {
                      title: "Transparência",
                      description: "Comunicação clara e honesta em todas as etapas",
                      icon: Shield,
                    },
                  ].map((value, index) => (
                    <div key={index} className="text-center group">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{value.title}</h4>
                      <p className="text-gray-400 text-sm">{value.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30 px-6 py-3 text-sm backdrop-blur-sm mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Diferenciais
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
              Nossos <span className="gradient-text">Diferenciais</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              O que nos torna únicos no mercado de desenvolvimento de software.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Soluções Globais",
                description:
                  "Desenvolvemos aplicações que atendem padrões internacionais de qualidade, performance e usabilidade.",
                features: ["Padrões Internacionais", "Multi-idioma", "Escalabilidade Global"],
              },
              {
                icon: Shield,
                title: "Segurança Avançada",
                description:
                  "Implementamos as melhores práticas de segurança para proteger seus dados e sistemas contra ameaças.",
                features: ["Criptografia SSL", "Backup Automático", "Monitoramento 24/7"],
              },
              {
                icon: Zap,
                title: "Performance Otimizada",
                description:
                  "Criamos soluções rápidas e eficientes que garantem a melhor experiência do usuário em qualquer dispositivo.",
                features: ["Carregamento Rápido", "Otimização Mobile", "Cache Inteligente"],
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="animate-slide-in-up hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="bg-slate-800/30 border-slate-700 hover:border-slate-600 transition-all duration-300 h-full backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="animate-scale-in">
            <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 max-w-5xl mx-auto backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Pronto para conhecer nossa <span className="gradient-text">equipe</span>?
                </h3>
                <p className="text-gray-300 mb-8 text-lg max-w-3xl mx-auto">
                  Vamos conversar sobre como podemos transformar suas ideias em soluções digitais que realmente fazem a
                  diferença no seu negócio.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contato">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Falar com a Equipe
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/portfolio">
                    <Button
                      variant="outline"
                      className="border-slate-600 text-gray-300 hover:bg-slate-800 px-8 py-3 rounded-full font-medium text-lg hover:border-purple-500 transition-all duration-300 bg-transparent"
                    >
                      <Award className="w-5 h-5 mr-2" />
                      Ver Nosso Trabalho
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
