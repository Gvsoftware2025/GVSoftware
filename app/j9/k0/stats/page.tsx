"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Shield, LogOut, TrendingUp, Users, Briefcase, Award, RefreshCw, Save, CheckCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { getStats, updateStats, type SiteStats } from "@/lib/supabase-stats"

const ADMIN_PASSWORD = "GVAdmin!1530"

export default function AdminStatsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [stats, setStats] = useState<SiteStats | null>(null)

  const [formData, setFormData] = useState({
    projectsCompleted: 50,
    satisfiedClients: 40,
    yearsExperience: 5,
    teamMembers: 10,
  })

  const router = useRouter()

  const loadStats = async () => {
    try {
      const data = await getStats()
      if (data) {
        setStats(data)
        setFormData({
          projectsCompleted: data.projects_completed,
          satisfiedClients: data.satisfied_clients,
          yearsExperience: data.years_experience,
          teamMembers: data.team_members,
        })
      }
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error)
      toast({
        title: "Erro ao carregar estatísticas",
        description: "Não foi possível carregar as estatísticas do banco de dados.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = sessionStorage.getItem("gv_admin_stats_logged_in")
      if (isLoggedIn === "true") {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem("gv_admin_stats_logged_in", "true")
        setIsAuthenticated(true)
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao gerenciamento de estatísticas.",
        })
      } else {
        toast({
          title: "Senha incorreta",
          description: "A senha digitada está incorreta. Tente novamente.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro no login:", error)
      toast({
        title: "Erro interno",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("gv_admin_stats_logged_in")
    setIsAuthenticated(false)
    setPassword("")
    router.push("/")
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com segurança.",
    })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const updatedStats = await updateStats({
        projects_completed: formData.projectsCompleted,
        satisfied_clients: formData.satisfiedClients,
        years_experience: formData.yearsExperience,
        team_members: formData.teamMembers,
      })

      if (updatedStats) {
        setStats(updatedStats)
        toast({
          title: "✅ Estatísticas atualizadas!",
          description: "As alterações foram salvas no banco de dados.",
        })
      } else {
        throw new Error("Falha ao atualizar")
      }
    } catch (error) {
      console.error("Erro ao salvar estatísticas:", error)
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as estatísticas. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto animate-spin">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/80 border-purple-500/30 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-white">Painel Administrativo</CardTitle>
              <CardDescription className="text-purple-300">
                Acesso restrito ao gerenciamento de estatísticas
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white text-sm font-medium">
                  Senha de Acesso
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700/50 border-purple-500/30 text-white focus:border-purple-400 h-12"
                  placeholder="Digite a senha"
                  required
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 h-12 rounded-xl transition-all duration-300 hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Acessar Painel
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <div className="border-b border-purple-500/20 bg-slate-800/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Gerenciar Estatísticas</h1>
                <p className="text-purple-300">Números exibidos na página inicial</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push("/j9/k0/portfolio")}
                variant="outline"
                size="sm"
                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 bg-transparent"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Projetos
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 text-red-300 hover:bg-red-500/20 bg-transparent"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-slate-800 border-purple-500/30">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Confirmar Logout</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300">
                      Tem certeza que deseja sair do painel administrativo?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white">
                      Sair
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="bg-slate-800/80 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                Atualizar Estatísticas
              </CardTitle>
              <CardDescription className="text-gray-300">
                Atualize os números que aparecem na página inicial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-4">
                  {/* Projetos Finalizados */}
                  <div className="space-y-2">
                    <Label htmlFor="projectsCompleted" className="text-gray-300 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-purple-400" />
                      Projetos Finalizados
                    </Label>
                    <Input
                      id="projectsCompleted"
                      type="number"
                      min="0"
                      value={formData.projectsCompleted}
                      onChange={(e) => setFormData({ ...formData, projectsCompleted: Number.parseInt(e.target.value) })}
                      className="bg-slate-700/50 border-purple-500/30 text-white h-11"
                      required
                    />
                  </div>

                  {/* Clientes Satisfeitos */}
                  <div className="space-y-2">
                    <Label htmlFor="satisfiedClients" className="text-gray-300 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-purple-400" />
                      Clientes Satisfeitos
                    </Label>
                    <Input
                      id="satisfiedClients"
                      type="number"
                      min="0"
                      value={formData.satisfiedClients}
                      onChange={(e) => setFormData({ ...formData, satisfiedClients: Number.parseInt(e.target.value) })}
                      className="bg-slate-700/50 border-purple-500/30 text-white h-11"
                      required
                    />
                  </div>

                  {/* Anos de Experiência */}
                  <div className="space-y-2">
                    <Label htmlFor="yearsExperience" className="text-gray-300 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-purple-400" />
                      Anos de Experiência
                    </Label>
                    <Input
                      id="yearsExperience"
                      type="number"
                      min="0"
                      value={formData.yearsExperience}
                      onChange={(e) => setFormData({ ...formData, yearsExperience: Number.parseInt(e.target.value) })}
                      className="bg-slate-700/50 border-purple-500/30 text-white h-11"
                      required
                    />
                  </div>

                  {/* Membros da Equipe */}
                  <div className="space-y-2">
                    <Label htmlFor="teamMembers" className="text-gray-300 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-purple-400" />
                      Membros da Equipe
                    </Label>
                    <Input
                      id="teamMembers"
                      type="number"
                      min="0"
                      value={formData.teamMembers}
                      onChange={(e) => setFormData({ ...formData, teamMembers: Number.parseInt(e.target.value) })}
                      className="bg-slate-700/50 border-purple-500/30 text-white h-11"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-purple-500/20">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-11"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Alterações
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={loadStats}
                    className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preview */}
          <div className="space-y-6">
            <Card className="bg-slate-800/80 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  Preview ao Vivo
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Veja como as estatísticas aparecem na página inicial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {/* Projetos Finalizados */}
                  <div className="bg-slate-700/50 p-6 rounded-xl border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Briefcase className="w-8 h-8 text-purple-400" />
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">+</Badge>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{formData.projectsCompleted}</div>
                    <div className="text-sm text-gray-400">Projetos Finalizados</div>
                  </div>

                  {/* Clientes Satisfeitos */}
                  <div className="bg-slate-700/50 p-6 rounded-xl border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-8 h-8 text-blue-400" />
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">+</Badge>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{formData.satisfiedClients}</div>
                    <div className="text-sm text-gray-400">Clientes Satisfeitos</div>
                  </div>

                  {/* Anos de Experiência */}
                  <div className="bg-slate-700/50 p-6 rounded-xl border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Award className="w-8 h-8 text-green-400" />
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">+</Badge>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{formData.yearsExperience}</div>
                    <div className="text-sm text-gray-400">Anos de Experiência</div>
                  </div>

                  {/* Membros da Equipe */}
                  <div className="bg-slate-700/50 p-6 rounded-xl border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-8 h-8 text-yellow-400" />
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">+</Badge>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{formData.teamMembers}</div>
                    <div className="text-sm text-gray-400">Membros da Equipe</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <Card className="bg-slate-800/80 border-blue-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">💡 Dica</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Esses números são exibidos na página inicial do site. Atualize-os regularmente para manter o site
                  sempre atualizado com suas conquistas!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
