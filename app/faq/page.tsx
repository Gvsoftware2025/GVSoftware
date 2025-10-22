import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle, MessageCircle, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FAQPage() {
  const faqItems = [
    {
      question: "Quais serviços a GV Software oferece?",
      answer:
        "Oferecemos desenvolvimento web (websites, sistemas, e-commerce), aplicativos mobile (iOS e Android), design UI/UX e consultoria em TI. Nosso objetivo é fornecer soluções digitais completas e personalizadas.",
    },
    {
      question: "Como funciona o processo de desenvolvimento de um projeto?",
      answer:
        "Nosso processo começa com uma reunião para entender suas necessidades e objetivos. Em seguida, elaboramos uma proposta detalhada, seguida pelas etapas de design, desenvolvimento, testes, lançamento e suporte pós-entrega.",
    },
    {
      question: "Qual o custo para desenvolver um website ou aplicativo?",
      answer:
        "O custo varia muito dependendo da complexidade, funcionalidades e prazo do projeto. Oferecemos orçamentos personalizados após uma análise detalhada das suas necessidades. Entre em contato para uma consulta gratuita!",
    },
    {
      question: "Quanto tempo leva para um projeto ser concluído?",
      answer:
        "O prazo de entrega depende da escala e complexidade do projeto. Projetos menores podem levar algumas semanas, enquanto sistemas mais complexos podem levar vários meses. Definimos um cronograma claro no início de cada projeto.",
    },
    {
      question: "A GV Software oferece suporte após a entrega do projeto?",
      answer:
        "Sim, oferecemos suporte técnico e manutenção contínua para garantir que seu sistema ou aplicativo funcione perfeitamente. Temos planos de suporte flexíveis para atender às suas necessidades.",
    },
    {
      question: "Posso solicitar alterações durante o desenvolvimento?",
      answer:
        "Sim, a flexibilidade é parte do nosso processo ágil. Embora seja ideal ter um escopo bem definido, entendemos que as necessidades podem evoluir. Discutiremos e planejaremos quaisquer alterações para garantir que o projeto continue no caminho certo.",
    },
    {
      question: "Vocês trabalham com quais tecnologias?",
      answer:
        "Somos versáteis em diversas tecnologias modernas, incluindo React, Next.js, Node.js, Python, bancos de dados SQL e NoSQL, React Native, Flutter, entre outras. Escolhemos a tecnologia mais adequada para cada projeto.",
    },
    {
      question: "Como posso solicitar um orçamento?",
      answer:
        "Você pode solicitar um orçamento preenchendo o formulário em nossa página de Contato, enviando um email para contato.gvsoftware@gmail.com ou ligando para (17) 99785-3416. Teremos prazer em discutir seu projeto!",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center py-16 animate-fade-in">
          <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-400/30 px-6 py-3 text-sm backdrop-blur-sm shadow-lg animate-bounce-in mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            Perguntas Frequentes
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-in-up">
            Suas Dúvidas,
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text">
              Nossas Respostas
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto animate-fade-in-delay">
            Encontre aqui as respostas para as perguntas mais comuns sobre nossos serviços e processos.
          </p>
        </section>

        {/* FAQ Accordion */}
        <section className="py-12">
          <Card className="bg-slate-800/80 border-slate-700/50 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-slate-700 last:border-b-0 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <AccordionTrigger className="text-lg font-semibold text-white hover:text-purple-400 transition-colors duration-300">
                      <div className="flex items-center text-left">
                        <MessageCircle className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                        {item.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 leading-relaxed pl-8 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center animate-fade-in-delay">
          <Card className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-500/30 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ainda Tem Perguntas?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Não hesite em nos contatar. Nossa equipe está pronta para ajudar!
              </p>
              <Link href="/contato">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                  Fale Conosco
                  <Zap className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
