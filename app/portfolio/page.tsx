"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ExternalLink,
  Github,
  Search,
  Filter,
  Calendar,
  CheckCircle2,
  Loader2,
  Sparkles,
  Award,
  Grid3x3,
  LayoutGrid,
  User,
  Code2,
  Layers,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { getAllProjects, type Project } from "@/lib/supabase-projects"
import { AnimatedBackground } from "@/components/animated-background"

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>({})
  const [gridLayout, setGridLayout] = useState<"2" | "3">("3")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setIsLoading(true)
      const data = await getAllProjects()
      setProjects(data)
      setFilteredProjects(data)
    } catch (error) {
      console.error("Erro ao carregar projetos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((project) => project.status === selectedStatus)
    }

    setFilteredProjects(filtered)
  }, [searchTerm, selectedCategory, selectedStatus, projects])

  useEffect(() => {
    const intervals: { [key: number]: NodeJS.Timeout } = {}

    filteredProjects.forEach((project) => {
      if (project.images && project.images.length > 1) {
        intervals[project.id] = setInterval(() => {
          setCurrentImageIndices((prev) => ({
            ...prev,
            [project.id]: ((prev[project.id] || 0) + 1) % project.images.length,
          }))
        }, 3000)
      }
    })

    return () => {
      Object.values(intervals).forEach(clearInterval)
    }
  }, [filteredProjects])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return

      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowLeft") {
        navigateLightbox("prev")
      } else if (e.key === "ArrowRight") {
        navigateLightbox("next")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxImage, currentLightboxIndex, lightboxImages])

  const categories = Array.from(new Set(projects.map((p) => p.category)))
  const statuses = Array.from(new Set(projects.map((p) => p.status)))

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Concluído", className: "bg-green-500/20 text-green-400 border-green-500/30" },
      in_progress: { label: "Em Andamento", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      planning: { label: "Planejamento", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images)
    setCurrentLightboxIndex(index)
    setLightboxImage(images[index])
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    setLightboxImages([])
    setCurrentLightboxIndex(0)
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxImages.length === 0) return

    let newIndex = currentLightboxIndex
    if (direction === "prev") {
      newIndex = currentLightboxIndex === 0 ? lightboxImages.length - 1 : currentLightboxIndex - 1
    } else {
      newIndex = currentLightboxIndex === lightboxImages.length - 1 ? 0 : currentLightboxIndex + 1
    }

    setCurrentLightboxIndex(newIndex)
    setLightboxImage(lightboxImages[newIndex])
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto" />
          <p className="text-white text-lg">Carregando projetos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 relative">
      <AnimatedBackground />

      <section className="pt-32 pb-20 px-4 relative">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="animate-fade-in mb-8">
              <Badge className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30 px-6 py-3 text-sm backdrop-blur-sm">
                <Award className="w-4 h-4 mr-2" />
                Nossos Trabalhos
              </Badge>
            </div>

            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-float shadow-2xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-poppins">
              Nosso <span className="gradient-text">Portfólio</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Conheça alguns dos projetos que desenvolvemos com tecnologia de ponta e design excepcional.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{projects.length}</div>
                <div className="text-sm text-gray-400">Projetos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">{categories.length}</div>
                <div className="text-sm text-gray-400">Categorias</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {projects.filter((p) => p.status === "completed").length}
                </div>
                <div className="text-sm text-gray-400">Concluídos</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-12 px-4 relative">
        <div className="container mx-auto">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search and Layout Toggle */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Buscar projetos por nome ou descrição..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                    />
                  </div>

                  {/* Grid Layout Toggle */}
                  <div className="flex gap-2 bg-slate-900/50 rounded-lg p-1">
                    <Button
                      variant={gridLayout === "2" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setGridLayout("2")}
                      className={
                        gridLayout === "2"
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "text-gray-400 hover:text-white hover:bg-slate-800"
                      }
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={gridLayout === "3" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setGridLayout("3")}
                      className={
                        gridLayout === "3"
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "text-gray-400 hover:text-white hover:bg-slate-800"
                      }
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Category and Status Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-[220px] bg-slate-900/50 border-slate-600 text-white focus:border-purple-500">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      <SelectItem value="all">Todas as Categorias</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full sm:w-[220px] bg-slate-900/50 border-slate-600 text-white focus:border-purple-500">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      <SelectItem value="all">Todos os Status</SelectItem>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status === "completed"
                            ? "Concluído"
                            : status === "in_progress"
                              ? "Em Andamento"
                              : "Planejamento"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Clear Filters */}
                  {(searchTerm || selectedCategory !== "all" || selectedStatus !== "all") && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("all")
                        setSelectedStatus("all")
                      }}
                      className="border-slate-600 text-gray-300 hover:bg-slate-800"
                    >
                      Limpar Filtros
                    </Button>
                  )}
                </div>

                {/* Results Count */}
                <div className="text-sm text-gray-400">
                  Mostrando <span className="text-purple-400 font-semibold">{filteredProjects.length}</span> de{" "}
                  <span className="text-white font-semibold">{projects.length}</span> projetos
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-20 px-4 relative">
        <div className="container mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${gridLayout}-${filteredProjects.length}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid grid-cols-1 ${gridLayout === "2" ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"} gap-8`}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card
                    className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 h-full flex flex-col group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
                    onClick={() => openProjectDetails(project)}
                  >
                    <CardHeader className="p-0">
                      {/* Project Image */}
                      <div className="relative aspect-video bg-slate-700/50 rounded-t-lg overflow-hidden">
                        {project.images && project.images.length > 0 ? (
                          <>
                            <img
                              src={project.images[currentImageIndices[project.id] || 0] || "/placeholder.svg"}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />

                            {/* Image Indicators */}
                            {project.images.length > 1 && (
                              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                                {project.images.map((_, idx) => (
                                  <div
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                      idx === (currentImageIndices[project.id] || 0)
                                        ? "bg-purple-500 w-6"
                                        : "bg-white/50 w-1.5"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-blue-600/20">
                            <Image
                              src="/placeholder.svg"
                              alt={project.title}
                              width={400}
                              height={300}
                              className="opacity-30"
                            />
                          </div>
                        )}

                        {/* Status Badge Overlay */}
                        <div className="absolute top-3 right-3">{getStatusBadge(project.status)}</div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div>
                          <CardTitle className="text-white text-xl mb-2 group-hover:text-purple-300 transition-colors">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="text-gray-400 leading-relaxed line-clamp-2">
                            {project.description}
                          </CardDescription>
                        </div>

                        {/* Category and Year */}
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            {project.category}
                          </Badge>
                          {project.year && (
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {project.year}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col justify-end p-6 pt-0">
                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.slice(0, 5).map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs bg-slate-700/50 border-slate-600 text-gray-300 hover:bg-slate-700 transition-colors"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 5 && (
                            <Badge variant="outline" className="text-xs bg-slate-700/50 border-slate-600 text-gray-300">
                              +{project.technologies.length - 5}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {project.show_project_button && project.project_url && (
                          <Button
                            asChild
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Ver Projeto
                            </a>
                          </Button>
                        )}
                        {project.github_url && (
                          <Button
                            asChild
                            variant="outline"
                            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 bg-transparent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Nenhum projeto encontrado</h3>
              <p className="text-gray-400 mb-6">Tente ajustar os filtros ou buscar por outros termos.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedStatus("all")
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Limpar Filtros
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-slate-900 border-slate-700 text-white p-0 overflow-hidden">
          <ScrollArea className="max-h-[90vh]">
            <div className="relative">
              {selectedProject?.images && selectedProject.images.length > 0 && (
                <div className="relative h-64 md:h-80 w-full overflow-hidden">
                  <img
                    src={selectedProject.images[0] || "/placeholder.svg"}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => openLightbox(selectedProject.images, 0)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    {selectedProject && getStatusBadge(selectedProject.status)}
                  </div>
                </div>
              )}

              <div className="p-6 md:p-8 space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {selectedProject?.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-3 py-1">
                    {selectedProject?.category}
                  </Badge>
                  {selectedProject?.year && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedProject.year}
                    </Badge>
                  )}
                  {selectedProject?.client && (
                    <Badge className="bg-slate-700/50 text-gray-300 border-slate-600 px-3 py-1 flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {selectedProject.client}
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-purple-300 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Sobre o Projeto
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject?.long_description || selectedProject?.description}
                  </p>
                </div>

                {selectedProject?.technologies && selectedProject.technologies.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-purple-300 flex items-center gap-2">
                      <Code2 className="w-5 h-5" />
                      Tecnologias Utilizadas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="bg-slate-800/50 border-slate-600 text-gray-300 px-3 py-1.5 text-sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject?.features && selectedProject.features.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-purple-300 flex items-center gap-2">
                      <Layers className="w-5 h-5" />
                      Funcionalidades
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject?.images && selectedProject.images.length > 1 && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-purple-300">Galeria</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedProject.images.slice(1).map((image, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer"
                          onClick={() => openLightbox(selectedProject.images, idx + 1)}
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${selectedProject.title} - ${idx + 2}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                            <Search className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-4">
                  {selectedProject?.show_project_button && selectedProject.project_url && (
                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      <a href={selectedProject.project_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visitar Projeto
                      </a>
                    </Button>
                  )}
                  {selectedProject?.github_url && (
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 bg-transparent"
                    >
                      <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Ver no GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {lightboxImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateLightbox("prev")
                  }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateLightbox("next")
                  }}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            <motion.img
              key={lightboxImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImage}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {lightboxImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                {currentLightboxIndex + 1} / {lightboxImages.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
