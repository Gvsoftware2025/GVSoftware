"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Briefcase,
  Lock,
  RefreshCw,
  Upload,
  X,
  ImageIcon,
  Eye,
  EyeOff,
  CheckCircle,
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Calendar,
  Star,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import { getAllProjects, createProject, updateProject, deleteProject, type Project } from "@/lib/supabase-projects"
import { getStats, updateStats, type SiteStats } from "@/lib/supabase-stats"
import {
  getFeaturedProjectsConfig,
  addFeaturedProject,
  removeFeaturedProject,
  moveFeaturedUp,
  moveFeaturedDown,
  type FeaturedProjectWithDetails,
} from "@/lib/supabase-featured"

const ADMIN_PASSWORD = "GVAdmin!1530"

interface ProjectImage {
  id: string
  url: string
  file?: File
}

export default function AdminPortfolioPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [projectsList, setProjectsList] = useState<Project[]>([])
  const [uploadedImages, setUploadedImages] = useState<ProjectImage[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState("projects")

  const [stats, setStats] = useState<SiteStats | null>(null)
  const [statsForm, setStatsForm] = useState({
    projects_completed: 0,
    satisfied_clients: 0,
    years_experience: 0,
    team_members: 0,
  })
  const [isSavingStats, setIsSavingStats] = useState(false)

  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProjectWithDetails[]>([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    tags: "",
    category: "web",
    demoUrl: "",
    githubUrl: "",
    client: "",
    status: "Em Desenvolvimento",
    featured: false,
    showProjectButton: false,
    features: "",
  })
  const router = useRouter()

  const loadProjects = async () => {
    try {
      const data = await getAllProjects()
      setProjectsList(data)
    } catch (error) {
      console.error("Erro ao carregar projetos:", error)
      toast({
        title: "Erro ao carregar projetos",
        description: "Não foi possível carregar os projetos do banco de dados.",
        variant: "destructive",
      })
    }
  }

  const loadStats = async () => {
    try {
      const data = await getStats()
      if (data) {
        setStats(data)
        setStatsForm({
          projects_completed: data.projects_completed,
          satisfied_clients: data.satisfied_clients,
          years_experience: data.years_experience,
          team_members: data.team_members,
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

  const loadFeaturedProjects = async () => {
    try {
      const data = await getFeaturedProjectsConfig()
      setFeaturedProjects(data)
    } catch (error) {
      console.error("Erro ao carregar projetos em destaque:", error)
    }
  }

  useEffect(() => {
    loadProjects()
    loadStats()
    loadFeaturedProjects()
  }, [])

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = sessionStorage.getItem("gv_admin_portfolio_logged_in")
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
        sessionStorage.setItem("gv_admin_portfolio_logged_in", "true")
        setIsAuthenticated(true)
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao gerenciamento de portfólio.",
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
    sessionStorage.removeItem("gv_admin_portfolio_logged_in")
    setIsAuthenticated(false)
    setPassword("")
    router.push("/")
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com segurança.",
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (uploadedImages.length + files.length > 10) {
      toast({
        title: "Limite excedido",
        description: "Máximo de 10 imagens por projeto!",
        variant: "destructive",
      })
      return
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: `${file.name} excede 5MB!`,
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage: ProjectImage = {
          id: Date.now().toString() + Math.random(),
          url: e.target?.result as string,
          file: file,
        }
        setUploadedImages((prev) => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (imageId: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const imageUrls = uploadedImages.length > 0 ? uploadedImages.map((img) => img.url) : ["/em-desenvolvimento.png"]
      const technologies = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((t) => t)
      const features = formData.features
        .split(",")
        .map((feat) => feat.trim())
        .filter((f) => f)

      const projectData = {
        title: formData.title,
        description: formData.description,
        long_description: formData.longDescription || formData.description,
        category: formData.category,
        status: formData.status,
        client: formData.client,
        featured: formData.featured,
        show_project_button: formData.showProjectButton,
        project_url: formData.demoUrl,
        github_url: formData.githubUrl,
        images: imageUrls,
        technologies,
        features: features.length > 0 ? features : ["Feature padrão"],
      }

      if (editingProject) {
        await updateProject(editingProject.id, projectData)
        toast({
          title: "✅ Projeto atualizado!",
          description: "As alterações foram salvas no banco de dados.",
        })
      } else {
        await createProject(projectData)
        toast({
          title: "✅ Projeto criado!",
          description: "O novo projeto foi adicionado ao banco de dados.",
        })
      }

      await loadProjects()
      await loadFeaturedProjects()
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Erro ao salvar projeto:", error)
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o projeto. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleStatsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingStats(true)

    try {
      const updatedStats = await updateStats(statsForm)
      if (updatedStats) {
        setStats(updatedStats)
        toast({
          title: "✅ Estatísticas atualizadas!",
          description: "Os números foram salvos no banco de dados.",
        })
      }
    } catch (error) {
      console.error("Erro ao salvar estatísticas:", error)
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as estatísticas. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSavingStats(false)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      longDescription: project.long_description || project.description,
      tags: project.technologies.join(", "),
      category: project.category,
      demoUrl: project.project_url || "",
      githubUrl: project.github_url || "",
      client: project.client,
      status: project.status,
      featured: project.featured,
      showProjectButton: project.show_project_button,
      features: project.features.join(", "),
    })

    const existingImages: ProjectImage[] = project.images.map((url, index) => ({
      id: `existing-${index}`,
      url: url,
    }))
    setUploadedImages(existingImages)
    setIsDialogOpen(true)
  }

  const handleDelete = async (projectId: number) => {
    try {
      await deleteProject(projectId)
      await loadProjects()
      await loadFeaturedProjects()
      toast({
        title: "Projeto excluído",
        description: "O projeto foi removido do banco de dados.",
      })
    } catch (error) {
      console.error("Erro ao deletar projeto:", error)
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o projeto.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setEditingProject(null)
    setFormData({
      title: "",
      description: "",
      longDescription: "",
      tags: "",
      category: "web",
      demoUrl: "",
      githubUrl: "",
      client: "",
      status: "Em Desenvolvimento",
      featured: false,
      showProjectButton: false,
      features: "",
    })
    setUploadedImages([])
  }

  const handleAddToFeatured = async (projectId: number) => {
    const success = await addFeaturedProject(projectId)
    if (success) {
      toast({
        title: "✅ Adicionado aos destaques!",
        description: "O projeto agora aparece na homepage.",
      })
      await loadFeaturedProjects()
    } else {
      toast({
        title: "Erro",
        description: "Limite de 3 projetos atingido ou erro ao adicionar.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveFromFeatured = async (featuredId: number) => {
    const success = await removeFeaturedProject(featuredId)
    if (success) {
      toast({
        title: "✅ Removido dos destaques!",
        description: "O projeto foi removido da homepage.",
      })
      await loadFeaturedProjects()
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível remover o projeto.",
        variant: "destructive",
      })
    }
  }

  const handleMoveUp = async (featuredId: number) => {
    const success = await moveFeaturedUp(featuredId)
    if (success) {
      await loadFeaturedProjects()
    }
  }

  const handleMoveDown = async (featuredId: number) => {
    const success = await moveFeaturedDown(featuredId)
    if (success) {
      await loadFeaturedProjects()
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
                Acesso restrito ao gerenciamento do portfólio
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
                    <Lock className="w-5 h-5 mr-2" />
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
      <div className="border-b border-purple-500/20 bg-slate-800/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
                <p className="text-purple-300">GV Software - Gerenciamento Completo</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {projectsList.length} projetos
              </Badge>

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

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-purple-500/30 p-1">
            <TabsTrigger value="projects" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Briefcase className="w-4 h-4 mr-2" />
              Projetos
            </TabsTrigger>
            <TabsTrigger value="featured" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Destaques ({featuredProjects.length}/3)
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Estatísticas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="mb-6 flex items-center justify-between">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={resetForm}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Projeto
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-purple-500/30 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{editingProject ? "Editar Projeto" : "Novo Projeto"}</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      {editingProject ? "Atualize as informações do projeto" : "Preencha os dados do novo projeto"}
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-400 flex items-center">
                        <Briefcase className="w-5 h-5 mr-2" />
                        Informações Básicas
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-gray-300">
                            Título do Projeto *
                          </Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="bg-slate-700/50 border-purple-500/30 text-white h-11"
                            placeholder="Ex: Sistema de Gestão"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="client" className="text-gray-300">
                            Cliente *
                          </Label>
                          <Input
                            id="client"
                            value={formData.client}
                            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                            className="bg-slate-700/50 border-purple-500/30 text-white h-11"
                            placeholder="Ex: Empresa XYZ"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-gray-300">
                          Descrição Curta *
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="bg-slate-700/50 border-purple-500/30 text-white min-h-[80px] resize-none"
                          placeholder="Descrição breve do projeto..."
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="longDescription" className="text-gray-300">
                          Descrição Completa (opcional)
                        </Label>
                        <Textarea
                          id="longDescription"
                          value={formData.longDescription}
                          onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                          className="bg-slate-700/50 border-purple-500/30 text-white min-h-[120px] resize-none"
                          placeholder="Descrição detalhada do projeto..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-gray-300">
                            Categoria *
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                          >
                            <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white h-11">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-purple-500/30">
                              <SelectItem value="web" className="text-white">
                                Web Development
                              </SelectItem>
                              <SelectItem value="mobile" className="text-white">
                                Mobile App
                              </SelectItem>
                              <SelectItem value="sistema" className="text-white">
                                Sistema/Software
                              </SelectItem>
                              <SelectItem value="design" className="text-white">
                                Design/UI/UX
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="status" className="text-gray-300">
                            Status *
                          </Label>
                          <Select
                            value={formData.status}
                            onValueChange={(value) => setFormData({ ...formData, status: value })}
                          >
                            <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white h-11">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-purple-500/30">
                              <SelectItem value="Planejamento" className="text-white">
                                Planejamento
                              </SelectItem>
                              <SelectItem value="Em Desenvolvimento" className="text-white">
                                Em Desenvolvimento
                              </SelectItem>
                              <SelectItem value="Concluído" className="text-white">
                                Concluído
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-gray-300">Projeto Destaque</Label>
                          <div className="flex items-center h-11 px-4 bg-slate-700/50 border border-purple-500/30 rounded-md">
                            <input
                              type="checkbox"
                              id="featured"
                              checked={formData.featured}
                              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                              className="w-4 h-4 text-purple-600 bg-slate-600 border-slate-500 rounded focus:ring-purple-500"
                            />
                            <Label htmlFor="featured" className="ml-2 text-white cursor-pointer">
                              Destacar projeto
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Exibir Botão "Ver Projeto"</Label>
                        <div className="flex items-center h-11 px-4 bg-slate-700/50 border border-purple-500/30 rounded-md">
                          <input
                            type="checkbox"
                            id="showProjectButton"
                            checked={formData.showProjectButton}
                            onChange={(e) => setFormData({ ...formData, showProjectButton: e.target.checked })}
                            className="w-4 h-4 text-purple-600 bg-slate-600 border-slate-500 rounded focus:ring-purple-500"
                          />
                          <Label
                            htmlFor="showProjectButton"
                            className="ml-2 text-white cursor-pointer flex items-center"
                          >
                            {formData.showProjectButton ? (
                              <>
                                <Eye className="w-4 h-4 mr-2 text-green-400" />
                                Botão visível no portfólio
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-4 h-4 mr-2 text-gray-400" />
                                Botão oculto no portfólio
                              </>
                            )}
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-400 flex items-center">
                        <ImageIcon className="w-5 h-5 mr-2" />
                        Imagens do Projeto ({uploadedImages.length}/10)
                      </h3>

                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/60 transition-colors bg-slate-700/20"
                      >
                        <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <p className="text-white font-medium mb-2">Clique para adicionar imagens</p>
                        <p className="text-sm text-gray-400">PNG, JPG, WEBP até 5MB cada (máximo 10 imagens)</p>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />

                      {uploadedImages.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {uploadedImages.map((image, index) => (
                            <div key={image.id} className="relative group">
                              <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-purple-500/30">
                                <Image
                                  src={image.url || "/placeholder.svg"}
                                  alt={`Imagem ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Button
                                    type="button"
                                    size="sm"
                                    onClick={() => removeImage(image.id)}
                                    className="bg-red-500 hover:bg-red-600"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                  {index + 1}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-400">Tecnologias e Features</h3>

                      <div className="space-y-2">
                        <Label htmlFor="tags" className="text-gray-300">
                          Tecnologias (separadas por vírgula) *
                        </Label>
                        <Input
                          id="tags"
                          value={formData.tags}
                          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                          className="bg-slate-700/50 border-purple-500/30 text-white h-11"
                          placeholder="React, TypeScript, Node.js, MongoDB"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="features" className="text-gray-300">
                          Features Principais (separadas por vírgula) *
                        </Label>
                        <Input
                          id="features"
                          value={formData.features}
                          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                          className="bg-slate-700/50 border-purple-500/30 text-white h-11"
                          placeholder="Interface moderna, Design responsivo, Dashboard analytics"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-400">Links do Projeto</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="demoUrl" className="text-gray-300">
                            URL da Demo
                          </Label>
                          <Input
                            id="demoUrl"
                            value={formData.demoUrl}
                            onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                            className="bg-slate-700/50 border-purple-500/30 text-white h-11"
                            placeholder="https://demo.exemplo.com"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="githubUrl" className="text-gray-300">
                            URL do GitHub
                          </Label>
                          <Input
                            id="githubUrl"
                            value={formData.githubUrl}
                            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                            className="bg-slate-700/50 border-purple-500/30 text-white h-11"
                            placeholder="https://github.com/usuario/projeto"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-purple-500/20">
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
                          <>{editingProject ? "Atualizar Projeto" : "Criar Projeto"}</>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsDialogOpen(false)
                          resetForm()
                        }}
                        className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600 h-11"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <Button
                onClick={loadProjects}
                variant="outline"
                className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar Lista
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsList.map((project) => (
                <Card
                  key={project.id}
                  className="bg-slate-800/80 border-purple-500/30 backdrop-blur-xl overflow-hidden hover:border-purple-500/50 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    {project.images.length > 1 && (
                      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {project.images.length} fotos
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded font-semibold">
                        ⭐ Destaque
                      </div>
                    )}
                    {project.show_project_button && (
                      <div className="absolute bottom-2 left-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        Botão visível
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(project)}
                        className="bg-slate-800/80 border-purple-500/30 text-white hover:bg-purple-500/20"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-slate-800/80 border-red-500/30 text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-slate-800 border-purple-500/30">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Confirmar Exclusão</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-300">
                              Tem certeza que deseja excluir o projeto "{project.title}"? Esta ação não pode ser
                              desfeita e removerá o projeto do banco de dados permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">
                              Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(project.id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Excluir Permanentemente
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {project.category}
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{project.status}</Badge>
                    </div>
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <CardDescription className="text-gray-300">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="border-purple-500/30 text-purple-400">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {projectsList.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Nenhum projeto no banco de dados</h3>
                <p className="text-gray-400 mb-6">Comece adicionando seu primeiro projeto</p>
                <Button
                  onClick={() => {
                    resetForm()
                    setIsDialogOpen(true)
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeiro Projeto
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <Card className="bg-slate-800/80 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Sparkles className="w-6 h-6 mr-3 text-purple-400" />
                  Gerenciar Projetos em Destaque
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Selecione até 3 projetos para exibir no carrossel da página inicial. Use os botões para reordenar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {featuredProjects.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-purple-400">
                        Projetos Ativos ({featuredProjects.length}/3)
                      </h3>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Exibindo na Homepage</Badge>
                    </div>

                    {featuredProjects.map((featured, index) => (
                      <Card key={featured.id} className="bg-slate-700/50 border-purple-500/20">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleMoveUp(featured.id)}
                                disabled={index === 0}
                                className="text-white hover:bg-slate-600 h-8 w-8 p-0"
                              >
                                <ChevronUp className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleMoveDown(featured.id)}
                                disabled={index === featuredProjects.length - 1}
                                className="text-white hover:bg-slate-600 h-8 w-8 p-0"
                              >
                                <ChevronDown className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="text-2xl font-bold text-purple-400">#{index + 1}</div>
                            <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={featured.project.images[0] || "/placeholder.svg"}
                                alt={featured.project.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-white truncate">{featured.project.title}</h4>
                              <p className="text-sm text-gray-400 truncate">{featured.project.description}</p>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="outline" className="border-slate-600 text-gray-300 text-xs">
                                  {featured.project.category}
                                </Badge>
                                <Badge variant="outline" className="border-slate-600 text-gray-300 text-xs">
                                  {featured.project.status}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRemoveFromFeatured(featured.id)}
                              className="flex-shrink-0"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Remover
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-bold text-white mb-2">Nenhum projeto em destaque</h3>
                    <p className="text-gray-400 mb-6">
                      Vá para a aba "Projetos" e clique no botão estrela para adicionar projetos aos destaques
                    </p>
                  </div>
                )}

                {featuredProjects.length < 3 && (
                  <div className="space-y-4 mt-8">
                    <h3 className="text-lg font-semibold text-blue-400 mb-4">Projetos Disponíveis para Destaque</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {projectsList
                        .filter((p) => !featuredProjects.find((fp) => fp.project_id === p.id))
                        .map((project) => (
                          <Card key={project.id} className="bg-slate-700/30 border-slate-600/50">
                            <CardContent className="p-4">
                              <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                <Image
                                  src={project.images[0] || "/placeholder.svg"}
                                  alt={project.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <h4 className="font-semibold text-white mb-2 truncate">{project.title}</h4>
                              <div className="flex gap-2 mb-3">
                                <Badge variant="outline" className="border-slate-600 text-gray-300 text-xs">
                                  {project.category}
                                </Badge>
                              </div>
                              <Button
                                onClick={() => handleAddToFeatured(project.id)}
                                size="sm"
                                className="w-full bg-purple-600 hover:bg-purple-700"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Adicionar
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <Card className="bg-slate-800/80 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-purple-400" />
                  Gerenciar Estatísticas do Site
                </CardTitle>
                <CardDescription className="text-gray-300">Edite os números exibidos na página inicial</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStatsSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="projects_completed" className="text-white flex items-center">
                        <Award className="w-4 h-4 mr-2 text-purple-400" />
                        Projetos Finalizados
                      </Label>
                      <Input
                        id="projects_completed"
                        type="number"
                        min="0"
                        value={statsForm.projects_completed}
                        onChange={(e) =>
                          setStatsForm({ ...statsForm, projects_completed: Number.parseInt(e.target.value) || 0 })
                        }
                        className="bg-slate-700/50 border-purple-500/30 text-white h-12 text-lg font-semibold"
                      />
                      <p className="text-sm text-gray-400">Número total de projetos concluídos</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="satisfied_clients" className="text-white flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                        Clientes Satisfeitos
                      </Label>
                      <Input
                        id="satisfied_clients"
                        type="number"
                        min="0"
                        value={statsForm.satisfied_clients}
                        onChange={(e) =>
                          setStatsForm({ ...statsForm, satisfied_clients: Number.parseInt(e.target.value) || 0 })
                        }
                        className="bg-slate-700/50 border-purple-500/30 text-white h-12 text-lg font-semibold"
                      />
                      <p className="text-sm text-gray-400">Total de clientes atendidos</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="years_experience" className="text-white flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                        Anos de Experiência
                      </Label>
                      <Input
                        id="years_experience"
                        type="number"
                        min="0"
                        value={statsForm.years_experience}
                        onChange={(e) =>
                          setStatsForm({ ...statsForm, years_experience: Number.parseInt(e.target.value) || 0 })
                        }
                        className="bg-slate-700/50 border-purple-500/30 text-white h-12 text-lg font-semibold"
                      />
                      <p className="text-sm text-gray-400">Anos de atuação no mercado</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="team_members" className="text-white flex items-center">
                        <Users className="w-4 h-4 mr-2 text-orange-400" />
                        Membros da Equipe
                      </Label>
                      <Input
                        id="team_members"
                        type="number"
                        min="0"
                        value={statsForm.team_members}
                        onChange={(e) =>
                          setStatsForm({ ...statsForm, team_members: Number.parseInt(e.target.value) || 0 })
                        }
                        className="bg-slate-700/50 border-purple-500/30 text-white h-12 text-lg font-semibold"
                      />
                      <p className="text-sm text-gray-400">Tamanho da equipe</p>
                    </div>
                  </div>

                  <div className="border-t border-purple-500/20 pt-6">
                    <h3 className="text-lg font-semibold text-purple-400 mb-4">Preview das Estatísticas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-slate-700/30 rounded-lg p-4 text-center border border-purple-500/20">
                        <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-white">{statsForm.projects_completed}+</p>
                        <p className="text-sm text-gray-400">Projetos Finalizados</p>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-4 text-center border border-green-500/20">
                        <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-white">{statsForm.satisfied_clients}+</p>
                        <p className="text-sm text-gray-400">Clientes Satisfeitos</p>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-4 text-center border border-blue-500/20">
                        <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-white">{statsForm.years_experience}+</p>
                        <p className="text-sm text-gray-400">Anos de Experiência</p>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-4 text-center border border-orange-500/20">
                        <Users className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-white">{statsForm.team_members}+</p>
                        <p className="text-sm text-gray-400">Membros da Equipe</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={isSavingStats}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12"
                    >
                      {isSavingStats ? (
                        <>
                          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      onClick={loadStats}
                      variant="outline"
                      className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600 h-12"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Recarregar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
