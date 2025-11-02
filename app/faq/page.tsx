"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  HelpCircle,
  MessageCircle,
  Zap,
  Search,
  Code,
  DollarSign,
  Clock,
  Headphones,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const faqCategories = [
    {
      id: "services",
      name: "Serviços",
      icon: Code,
      color: "from-purple-600 to-blue-600",
      questions: [
        {
          question: "Quais serviços a GV Software oferece?",
          answer:
            "Oferecemos desenvolvimento web (websites, sistemas, e-commerce), aplicativos mobile (iOS e Android), design UI/UX, otimização SEO, consultoria em TI e suporte técnico. Nosso objetivo é fornecer soluções digitais completas e personalizadas para cada cliente.",
        },
        {
          question: "Vocês trabalham com quais tecnologias?",
          answer:
            "Somos versáteis em diversas tecnologias modernas, incluindo React, Next.js, Node.js, Python, TypeScript, bancos de dados SQL e NoSQL, React Native, Flutter, entre outras. Escolhemos a tecnologia mais adequada para cada projeto, garantindo performance e escalabilidade.",
        },
        {
          question: "Vocês desenvolvem aplicativos mobile?",
          answer:
            "Sim! Desenvolvemos aplicativos nativos para iOS (Swift) e Android (Kotlin), além de aplicativos híbridos usando React Native e Flutter. Oferecemos desde o design até a publicação nas lojas de aplicativos.",
        },
      ],
    },
    {
      id: "pricing",
      name: "Preços e Orçamento",
      icon: DollarSign,
      color: "from-green-600 to-teal-600",
      questions: [
        {
          question: "Qual o custo para desenvolver um website ou aplicativo?",
          answer:
            "O custo varia muito dependendo da complexidade, funcionalidades e prazo do projeto. Projetos simples podem começar a partir de R$ 2.500, enquanto sistemas mais complexos podem variar bastante. Oferecemos orçamentos personalizados após uma análise detalhada das suas necessidades. Entre em contato para uma consulta gratuita!",
        },
        {
          question: "Como posso solicitar um orçamento?",
          answer:
            "Você pode solicitar um orçamento de três formas: preenchendo o formulário em nossa página de Contato, enviando um email para contato.gvsoftware@gmail.com ou ligando para (17) 99785-3416. Responderemos em até 24 horas com uma proposta detalhada!",
        },
        {
          question: "Vocês oferecem planos de pagamento?",
          answer:
            "Sim! Oferecemos opções flexíveis de pagamento, incluindo parcelamento e pagamento por etapas do projeto. Discutimos as melhores condições durante a fase de orçamento para atender ao seu orçamento.",
        },
      ],
    },
    {
      id: "process",
      name: "Processo e Prazos",
      icon: Clock,
      color: "from-blue-600 to-cyan-600",
      questions: [
        {
          question: "Como funciona o processo de desenvolvimento de um projeto?",
          answer:
            "Nosso processo segue 4 etapas principais: 1) Descoberta - entendemos suas necessidades e objetivos; 2) Planejamento - criamos uma estratégia detalhada e cronograma; 3) Desenvolvimento - construímos sua solução com as melhores tecnologias; 4) Entrega - lançamos seu projeto e oferecemos suporte contínuo.",
        },
        {
          question: "Quanto tempo leva para um projeto ser concluído?",
          answer:
            "O prazo de entrega depende da escala e complexidade do projeto. Landing pages simples podem levar 1-2 semanas, websites completos 2-4 semanas, e-commerce 4-8 semanas, e sistemas mais complexos podem levar vários meses. Definimos um cronograma claro no início de cada projeto.",
        },
        {
          question: "Posso solicitar alterações durante o desenvolvimento?",
          answer:
            "Sim, a flexibilidade é parte do nosso processo ágil. Embora seja ideal ter um escopo bem definido, entendemos que as necessidades podem evoluir. Discutiremos e planejaremos quaisquer alterações para garantir que o projeto continue no caminho certo, sempre mantendo você informado sobre impactos no prazo e custo.",
        },
        {
          question: "Vocês fazem reuniões de acompanhamento?",
          answer:
            "Sim! Realizamos reuniões regulares de acompanhamento para apresentar o progresso, coletar feedback e garantir que o projeto está alinhado com suas expectativas. A frequência das reuniões é definida de acordo com a complexidade do projeto.",
        },
      ],
    },
    {
      id: "support",
      name: "Suporte e Manutenção",
      icon: Headphones,
      color: "from-orange-600 to-red-600",
      questions: [
        {
          question: "A GV Software oferece suporte após a entrega do projeto?",
          answer:
            "Sim! Oferecemos suporte técnico e manutenção contínua para garantir que seu sistema ou aplicativo funcione perfeitamente. Temos planos de suporte flexíveis que incluem correção de bugs, atualizações de segurança, melhorias de performance e novas funcionalidades.",
        },
        {
          question: "O que está incluído no suporte técnico?",
          answer:
            "Nosso suporte inclui: correção de bugs, atualizações de segurança, backup e monitoramento, otimização de performance, suporte por email e telefone, e atualizações de conteúdo. Oferecemos diferentes níveis de suporte para atender suas necessidades.",
        },
        {
          question: "Qual o tempo de resposta do suporte?",
          answer:
            "Garantimos resposta em até 24 horas para todos os chamados. Para clientes com planos de suporte premium, oferecemos atendimento prioritário com resposta em até 4 horas durante horário comercial.",
        },
      ],
    },
  ]

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          (selectedCategory === "all" || category.id === selectedCategory) &&
          (searchTerm === "" ||
            q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  const totalQuestions = faqCategories.reduce((acc, cat) => acc + cat.questions.length, 0)

  return (
    <div className="min-h-screen bg-slate-900 relative">
      <AnimatedBackground />

      <section className="pt-32 pb-20 px-4 relative">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in mb-8">
            <Badge className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30 px-6 py-3 text-sm backdrop-blur-sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              Perguntas Frequentes
            </Badge>
          </div>

          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-float shadow-2xl">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-in-up font-poppins">
            Suas Dúvidas, <span className="gradient-text">Nossas Respostas</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-in-up">
            Encontre aqui as respostas para as perguntas mais comuns sobre nossos serviços e processos.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">{totalQuestions}</div>
              <div className="text-sm text-gray-400">Perguntas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">{faqCategories.length}</div>
              <div className="text-sm text-gray-400">Categorias</div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar perguntas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                    className={
                      selectedCategory === "all"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "border-slate-600 text-gray-300 hover:bg-slate-800"
                    }
                  >
                    Todas
                  </Button>
                  {faqCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={
                        selectedCategory === category.id
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "border-slate-600 text-gray-300 hover:bg-slate-800"
                      }
                    >
                      <category.icon className="w-4 h-4 mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={category.id} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  <p className="text-sm text-gray-400">{category.questions.length} perguntas</p>
                </div>
              </div>

              {/* Accordion */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-slate-600 transition-all duration-300">
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.id}-item-${index}`}
                        className="border-b border-slate-700 last:border-b-0"
                      >
                        <AccordionTrigger className="text-left text-white hover:text-purple-400 transition-colors duration-300 py-4 group">
                          <div className="flex items-start gap-3 pr-4">
                            <div className="w-6 h-6 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-purple-600/30 transition-colors">
                              <MessageCircle className="w-4 h-4 text-purple-400" />
                            </div>
                            <span className="font-semibold text-base">{item.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 leading-relaxed pl-9 pb-4 pt-2">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          ))}

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Nenhuma pergunta encontrada</h3>
                <p className="text-gray-400 mb-6">Tente ajustar sua busca ou categoria</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                  }}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ainda Tem <span className="gradient-text">Perguntas</span>?
              </h2>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                Não hesite em nos contatar. Nossa equipe está pronta para ajudar e esclarecer todas as suas dúvidas!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Fale Conosco
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/servicos">
                  <Button
                    variant="outline"
                    className="border-slate-600 text-gray-300 hover:bg-slate-800 px-8 py-3 text-lg font-semibold hover:border-purple-500 transition-all duration-300 bg-transparent"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Ver Serviços
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
