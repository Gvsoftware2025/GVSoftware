import { Shield, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center py-16 animate-fade-in">
          <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-400/30 px-6 py-3 text-sm backdrop-blur-sm shadow-lg animate-bounce-in mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Documentos Legais
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-in-up">
            Política de{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text">
              Privacidade
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto animate-fade-in-delay">
            Sua privacidade é importante para nós. Entenda como coletamos, usamos e protegemos seus dados.
          </p>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <Card className="bg-slate-800/80 border-slate-700/50 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-8 text-gray-300 leading-relaxed space-y-6">
              <p>
                A GV Software está comprometida em proteger a privacidade dos seus usuários. Esta Política de
                Privacidade descreve como coletamos, usamos e compartilhamos suas informações pessoais quando você
                visita ou utiliza nossos serviços.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 1. Informações que Coletamos
              </h2>
              <p>Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços para você:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>Informações Pessoais:</strong> Nome, sobrenome, endereço de e-mail, número de telefone e
                  outras informações que você nos fornece voluntariamente ao preencher formulários de contato ou
                  solicitar orçamentos.
                </li>
                <li>
                  <strong>Dados de Uso:</strong> Informações sobre como o serviço é acessado e utilizado, como endereço
                  IP, tipo de navegador, páginas visitadas, tempo gasto nas páginas, etc.
                </li>
                <li>
                  <strong>Cookies e Tecnologias de Rastreamento:</strong> Utilizamos cookies e tecnologias similares
                  para rastrear a atividade em nosso serviço e manter certas informações.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 2. Como Usamos Suas Informações
              </h2>
              <p>A GV Software utiliza os dados coletados para diversas finalidades:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Para fornecer e manter nossos serviços.</li>
                <li>Para notificá-lo sobre alterações em nossos serviços.</li>
                <li>
                  Para permitir que você participe de recursos interativos de nosso serviço quando você optar por
                  fazê-lo.
                </li>
                <li>Para fornecer suporte ao cliente.</li>
                <li>Para coletar análises ou informações valiosas para que possamos melhorar nosso serviço.</li>
                <li>Para monitorar o uso do nosso serviço.</li>
                <li>Para detectar, prevenir e resolver problemas técnicos.</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 3. Compartilhamento de Dados
              </h2>
              <p>
                Não vendemos, trocamos ou transferimos suas informações de identificação pessoal a terceiros. Isso não
                inclui terceiros confiáveis que nos auxiliam na operação do nosso site, na condução dos nossos negócios
                ou na prestação de serviços a você, desde que essas partes concordem em manter essas informações
                confidenciais.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 4. Segurança dos Dados
              </h2>
              <p>
                A segurança dos seus dados é importante para nós. Empregamos medidas de segurança físicas, eletrônicas e
                administrativas para proteger suas informações pessoais contra acesso não autorizado, uso indevido ou
                divulgação. No entanto, nenhum método de transmissão pela Internet ou método de armazenamento eletrônico
                é 100% seguro.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 5. Seus Direitos de Proteção de Dados (LGPD)
              </h2>
              <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Acessar, corrigir ou excluir suas informações pessoais.</li>
                <li>Retirar o consentimento a qualquer momento.</li>
                <li>Opor-se ao processamento de seus dados.</li>
                <li>Solicitar a portabilidade dos seus dados.</li>
              </ul>
              <p>Para exercer esses direitos, entre em contato conosco.</p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 6. Alterações a Esta Política de Privacidade
              </h2>
              <p>
                Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer
                alterações publicando a nova Política de Privacidade nesta página.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 7. Contato
              </h2>
              <p>
                Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através do
                email:{" "}
                <a href="mailto:contato.gvsoftware@gmail.com" className="text-purple-400 hover:underline">
                  contato.gvsoftware@gmail.com
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
