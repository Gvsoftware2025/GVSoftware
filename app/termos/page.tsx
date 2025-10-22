import { FileText, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center py-16 animate-fade-in">
          <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-400/30 px-6 py-3 text-sm backdrop-blur-sm shadow-lg animate-bounce-in mb-6">
            <FileText className="w-4 h-4 mr-2" />
            Documentos Legais
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-in-up">
            Termos de{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text">
              Uso
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto animate-fade-in-delay">
            Leia atentamente nossos termos e condições para o uso dos serviços da GV Software.
          </p>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <Card className="bg-slate-800/80 border-slate-700/50 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-8 text-gray-300 leading-relaxed space-y-6">
              <p>
                Bem-vindo aos Termos de Uso da GV Software. Ao acessar ou utilizar nossos serviços, você concorda em
                cumprir e estar vinculado a estes termos. Se você não concordar com qualquer parte dos termos, não
                poderá acessar os serviços.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 1. Aceitação dos Termos
              </h2>
              <p>
                Ao utilizar os serviços da GV Software, você reconhece que leu, entendeu e concorda em estar vinculado a
                estes Termos de Uso, bem como à nossa Política de Privacidade. Estes termos podem ser atualizados
                periodicamente, e o uso continuado dos serviços após tais alterações constitui sua aceitação dos novos
                termos.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 2. Uso dos Serviços
              </h2>
              <p>
                Os serviços da GV Software são fornecidos para fins de desenvolvimento de software, consultoria e
                design. Você concorda em usar os serviços apenas para fins lícitos e de maneira que não infrinja os
                direitos de, ou restrinja ou iniba o uso e o desfrute dos serviços por terceiros.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Não utilizar os serviços para qualquer atividade ilegal ou não autorizada.</li>
                <li>Não tentar interferir no funcionamento adequado dos serviços.</li>
                <li>
                  Não reproduzir, duplicar, copiar, vender, revender ou explorar qualquer parte dos serviços sem
                  permissão expressa por escrito da GV Software.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 3. Propriedade Intelectual
              </h2>
              <p>
                Todo o conteúdo e materiais disponíveis nos serviços da GV Software, incluindo, mas não se limitando a
                textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais, compilações de dados
                e software, são propriedade da GV Software ou de seus fornecedores de conteúdo e são protegidos por leis
                de direitos autorais e outras leis de propriedade intelectual.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 4. Limitação de Responsabilidade
              </h2>
              <p>
                A GV Software não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais,
                consequenciais ou exemplares, incluindo, mas não se limitando a, danos por perda de lucros, boa vontade,
                uso, dados ou outras perdas intangíveis, resultantes do uso ou da incapacidade de usar os serviços.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 5. Rescisão
              </h2>
              <p>
                Podemos rescindir ou suspender seu acesso aos nossos serviços imediatamente, sem aviso prévio ou
                responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 6. Lei Aplicável
              </h2>
              <p>
                Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas
                disposições sobre conflitos de leis.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" /> 7. Contato
              </h2>
              <p>
                Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através do email:{" "}
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
