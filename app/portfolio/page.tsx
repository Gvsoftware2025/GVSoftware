"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Github, Search, Filter, Calendar, CheckCircle2, Loader2 } from "lucide-react"
import { getAllProjects, type Project } from "@/lib/supabase-projects"

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>({})

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto" />
          <p className="text-white text-lg">Carregando projetos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Nosso{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Portfólio
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos com tecnologia de ponta
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-purple-500/30 text-white placeholder:text-gray-400"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px] bg-slate-800/50 border-purple-500/30 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-purple-500/30 text-white">
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[200px] bg-slate-800/50 border-purple-500/30 text-white">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-purple-500/30 text-white">
                <SelectItem value="all">Todos</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "completed" ? "Concluído" : status === "in_progress" ? "Em Andamento" : "Planejamento"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/80 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300 h-full flex flex-col">
                <CardHeader>
                  <div className="relative aspect-video bg-slate-700/50 rounded-lg mb-4 overflow-hidden group">
                    {project.images && project.images.length > 0 ? (
                      <>
                        <img
                          src={project.images[currentImageIndices[project.id] || 0] || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {project.images.length > 1 && (
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                            {project.images.map((_, idx) => (
                              <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  idx === (currentImageIndices[project.id] || 0) ? "bg-purple-500 w-4" : "bg-white/50"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image
                          src="/placeholder.svg"
                          alt={project.title}
                          width={400}
                          height={300}
                          className="opacity-50"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-white text-xl">{project.title}</CardTitle>
                    {getStatusBadge(project.status)}
                  </div>
                  <CardDescription className="text-gray-300">{project.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">{project.category}</Badge>
                    {project.year && (
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.year}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs bg-slate-700/50 border-slate-600 text-gray-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs bg-slate-700/50 border-slate-600 text-gray-300">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                  )}
                  <div className="flex gap-2">
                    {project.show_project_button && project.project_url && (
                      <Button
                        asChild
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
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
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Nenhum projeto encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  )
}
