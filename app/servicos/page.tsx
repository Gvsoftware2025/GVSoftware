import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
} from "lucide-react"

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Rocket className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nossos <span className="gradient-text">Serviços</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Oferecemos soluções completas para impulsionar o seu negócio no mundo digital.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Desenvolvimento Web */}
            <Card className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Desenvolvimento Web</h3>
                <p className="text-gray-300 mb-6">
                  Criação de websites personalizados, desde landing pages até plataformas complexas, com foco em
                  performance e experiência do usuário.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Sites responsivos e otimizados
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    E-commerce e lojas virtuais
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Sistemas web sob medida
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* UI/UX Design */}
            <Card className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 border-pink-500/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">UI/UX Design</h3>
                <p className="text-gray-300 mb-6">
                  Design de interfaces intuitivas e agradáveis, focadas na melhor experiência do usuário e alinhadas com
                  a identidade visual da sua marca.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Design de interface (UI)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Experiência do usuário (UX)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Protótipos interativos
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Aplicações Mobile */}
            <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Aplicações Mobile</h3>
                <p className="text-gray-300 mb-6">
                  Desenvolvimento de aplicativos móveis nativos (iOS e Android) e híbridos, com foco em performance,
                  segurança e escalabilidade.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Apps nativos (Swift, Kotlin)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Apps híbridos (React Native)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Testes e publicação nas lojas
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Otimização SEO */}
            <Card className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-cyan-500/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Otimização SEO</h3>
                <p className="text-gray-300 mb-6">
                  Otimização de sites para melhorar o posicionamento nos resultados de busca do Google, aumentando o
                  tráfego orgânico e a visibilidade da sua marca.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Análise de palavras-chave
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Otimização on-page e off-page
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Relatórios e acompanhamento
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Consultoria em TI */}
            <Card className="bg-gradient-to-br from-green-600/20 to-teal-600/20 border-green-500/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Consultoria em TI</h3>
                <p className="text-gray-300 mb-6">
                  Consultoria especializada para identificar as melhores soluções de tecnologia para o seu negócio,
                  desde a escolha de softwares até a implementação de infraestrutura.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Planejamento estratégico de TI
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Análise de sistemas e processos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Implementação de soluções
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Suporte e Manutenção */}
            <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center mb-6">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Suporte e Manutenção</h3>
                <p className="text-gray-300 mb-6">
                  Serviços de suporte técnico e manutenção para garantir o bom funcionamento dos seus sistemas e
                  aplicações, com atendimento rápido e eficiente.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Suporte técnico online
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Manutenção preventiva e corretiva
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Atualizações e upgrades
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Por que <span className="gradient-text">Escolher</span> a GV Software?
            </h2>
            <p className="text-xl text-gray-400">Nossos diferenciais que garantem o sucesso do seu projeto.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Expertise */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Expertise</h3>
                <p className="text-gray-400 leading-relaxed">
                  Equipe altamente qualificada e experiente em diversas tecnologias e metodologias.
                </p>
              </CardContent>
            </Card>

            {/* Inovação */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Inovação</h3>
                <p className="text-gray-400 leading-relaxed">
                  Buscamos constantemente as últimas tendências e tecnologias para oferecer soluções inovadoras.
                </p>
              </CardContent>
            </Card>

            {/* Foco no Cliente */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Foco no Cliente</h3>
                <p className="text-gray-400 leading-relaxed">
                  Priorizamos a satisfação do cliente, oferecendo atendimento personalizado e soluções sob medida.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Dúvidas Frequentes?</h3>
                  <p className="text-gray-300 mb-6">
                    Confira nossa página de perguntas frequentes com respostas para as dúvidas mais comuns sobre nossos
                    serviços.
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full">
                    Ver FAQs
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
