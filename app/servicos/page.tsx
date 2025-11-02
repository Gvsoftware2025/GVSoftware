"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Palette,
  Smartphone,
  Search,
  Shield,
  Headphones,
  Rocket,
  CheckCircle,
  Users,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  Clock,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { AnimatedBackground } from "@/components/animated-background"

export default function ServicosPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const services = [
    {
      icon: Code,
      title: "Desenvolvimento Web",
      description:
        "Criação de websites personalizados, desde landing pages até plataformas complexas, com foco em performance e experiência do usuário.",
      features: ["Sites responsivos e otimizados", "E-commerce e lojas virtuais", "Sistemas web sob medida"],
      gradient: "from-purple-600 to-blue-600",
      bgGradient: "from-purple-600/20 to-blue-600/20",
      borderColor: "border-purple-500/30",
      hoverBorder: "hover:border-purple-500",
      price: "A partir de R$ 2.500",
      duration: "2-4 semanas",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Design de interfaces intuitivas e agradáveis, focadas na melhor experiência do usuário e alinhadas com a identidade visual da sua marca.",
      features: ["Design de interface (UI)", "Experiência do usuário (UX)", "Protótipos interativos"],
      gradient: "from-pink-600 to-purple-600",
      bgGradient: "from-pink-600/20 to-purple-600/20",
      borderColor: "border-pink-500/30",
      hoverBorder: "hover:border-pink-500",
      price: "A partir de R$ 1.800",
      duration: "1-3 semanas",
    },
    {
      icon: Smartphone,
      title: "Aplicações Mobile",
      description:
        "Desenvolvimento de aplicativos móveis nativos (iOS e Android) e híbridos, com foco em performance, segurança e escalabilidade.",
      features: ["Apps nativos (Swift, Kotlin)", "Apps híbridos (React Native)", "Testes e publicação nas lojas"],
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-600/20 to-cyan-600/20",
      borderColor: "border-blue-500/30",
      hoverBorder: "hover:border-blue-500",
      price: "A partir de R$ 5.000",
      duration: "4-8 semanas",
    },
    {
      icon: Search,
      title: "Otimização SEO",
      description:
        "Otimização de sites para melhorar o posicionamento nos resultados de busca do Google, aumentando o tráfego orgânico e a visibilidade da sua marca.",
      features: ["Análise de palavras-chave", "Otimização on-page e off-page", "Relatórios e acompanhamento"],
      gradient: "from-cyan-600 to-teal-600",
      bgGradient: "from-cyan-600/20 to-teal-600/20",
      borderColor: "border-cyan-500/30",
      hoverBorder: "hover:border-cyan-500",
      price: "A partir de R$ 800/mês",
      duration: "Contínuo",
    },
    {
      icon: Shield,
      title: "Consultoria em TI",
      description:
        "Consultoria especializada para identificar as melhores soluções de tecnologia para o seu negócio, desde a escolha de softwares até a implementação de infraestrutura.",
      features: ["Planejamento estratégico de TI", "Análise de sistemas e processos", "Implementação de soluções"],
      gradient: "from-green-600 to-teal-600",
      bgGradient: "from-green-600/20 to-teal-600/20",
      borderColor: "border-green-500/30",
      hoverBorder: "hover:border-green-500",
      price: "Sob consulta",
      duration: "Variável",
    },
    {
      icon: Headphones,
      title: "Suporte e Manutenção",
      description:
        "Serviços de suporte técnico e manutenção para garantir o bom funcionamento dos seus sistemas e aplicações, com atendimento rápido e eficiente.",
      features: ["Suporte técnico online", "Manutenção preventiva e corretiva", "Atualizações e upgrades"],
      gradient: "from-orange-600 to-red-600",
      bgGradient: "from-orange-600/20 to-red-600/20",
      borderColor: "border-orange-500/30",
      hoverBorder: "hover:border-orange-500",
      price: "A partir de R$ 500/mês",
      duration: "Contínuo",
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
              <Sparkles className="w-4 h-4 mr-2" />
              Soluções Completas
            </Badge>
          </div>

          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-float shadow-2xl">
            <Rocket className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-in-up font-poppins">
            Nossos <span className="gradient-text">Serviços</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-in-up">
            Oferecemos soluções completas para impulsionar o seu negócio no mundo digital com tecnologia de ponta e
            design excepcional.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <Card
                  className={`bg-gradient-to-br ${service.bgGradient} ${service.borderColor} ${service.hoverBorder} h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm group ${
                    activeCard === index ? "scale-105 shadow-2xl" : ""
                  }`}
                >
                  <CardContent className="p-8">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price and Duration */}
                    <div className="border-t border-slate-700/50 pt-6 space-y-3">
                      <div className="flex items-center text-sm text-gray-400">
                        <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                        <span className="font-medium text-white">{service.price}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="w-4 h-4 mr-2 text-blue-400" />
                        <span>{service.duration}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href="/contato">
                      <Button
                        className={`w-full mt-6 bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white rounded-full font-medium transition-all duration-300 group-hover:scale-105`}
                      >
                        Solicitar Orçamento
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-800/30 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30 px-6 py-3 text-sm backdrop-blur-sm mb-6">
              <Award className="w-4 h-4 mr-2" />
              Nossos Diferenciais
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
              Por que <span className="gradient-text">Escolher</span> a GV Software?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Nossos diferenciais que garantem o sucesso do seu projeto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Expertise",
                description: "Equipe altamente qualificada e experiente em diversas tecnologias e metodologias.",
                gradient: "from-purple-600 to-blue-600",
              },
              {
                icon: Zap,
                title: "Agilidade",
                description: "Processos otimizados e metodologias ágeis para entregas rápidas e eficientes.",
                gradient: "from-blue-600 to-cyan-600",
              },
              {
                icon: TrendingUp,
                title: "Resultados",
                description: "Foco em soluções que geram resultados reais e impacto positivo no seu negócio.",
                gradient: "from-cyan-600 to-teal-600",
              },
              {
                icon: Users,
                title: "Suporte",
                description: "Atendimento personalizado e suporte contínuo para garantir seu sucesso.",
                gradient: "from-teal-600 to-green-600",
              },
            ].map((item, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 text-center h-full hover:scale-105 backdrop-blur-sm group">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
              Nosso <span className="gradient-text">Processo</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Como trabalhamos para transformar suas ideias em realidade.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Descoberta",
                description: "Entendemos suas necessidades e objetivos de negócio.",
                icon: MessageSquare,
              },
              {
                step: "02",
                title: "Planejamento",
                description: "Criamos uma estratégia detalhada e cronograma do projeto.",
                icon: Code,
              },
              {
                step: "03",
                title: "Desenvolvimento",
                description: "Construímos sua solução com as melhores tecnologias.",
                icon: Rocket,
              },
              {
                step: "04",
                title: "Entrega",
                description: "Lançamos seu projeto e oferecemos suporte contínuo.",
                icon: CheckCircle,
              },
            ].map((process, index) => (
              <div
                key={index}
                className="text-center animate-fade-in group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <process.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-slate-800 border-2 border-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-purple-300 font-bold text-sm">{process.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{process.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-slate-800/30 relative">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 max-w-4xl mx-auto backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <CardContent className="p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-4">Dúvidas Frequentes?</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Confira nossa página de perguntas frequentes com respostas para as dúvidas mais comuns sobre nossos
                    serviços e processos.
                  </p>
                  <Link href="/faq">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-medium hover:scale-105 transition-all duration-300">
                      Ver FAQs
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
              Pronto para <span className="gradient-text">começar</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Entre em contato conosco e descubra como podemos transformar suas ideias em soluções digitais de sucesso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300">
                  <Rocket className="w-5 h-5 mr-2" />
                  Solicitar Orçamento
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  className="border-slate-600 text-gray-300 hover:bg-slate-800 px-8 py-3 rounded-full font-medium text-lg hover:border-purple-500 transition-all duration-300 bg-transparent"
                >
                  <Award className="w-5 h-5 mr-2" />
                  Ver Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
