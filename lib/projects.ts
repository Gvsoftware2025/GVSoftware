export interface Project {
  id: number
  title: string
  description: string
  images: string[]
  category: string
  technologies: string[]
  status: string
  client: string
  features: string[]
  link?: string
  longDescription?: string
  projectUrl?: string
  githubUrl?: string
  featured?: boolean
  createdAt?: string
  showProjectButton?: boolean
}

// Dados iniciais padrão
const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Cardápio Digital BebidasON",
    description:
      "Cardápio digital moderno e interativo para empresa de bebidas com interface intuitiva e design responsivo",
    longDescription:
      "Plataforma completa para gestão de cardápios digitais com interface moderna, sistema de categorias, controle de estoque e integração com sistemas de pagamento. Desenvolvido com React e Node.js.",
    images: ["/em-desenvolvimento.png"],
    category: "web",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    status: "Concluído",
    client: "BebidasON",
    features: ["Interface moderna", "Design responsivo", "Navegação intuitiva", "Catálogo de produtos"],
    link: "https://cardapio-digital-bebidas-on.vercel.app/",
    projectUrl: "https://cardapio-digital-bebidas-on.vercel.app/",
    githubUrl: "https://github.com/gvsoftware/cardapio-digital",
    featured: true,
    createdAt: "2024-01-15",
    showProjectButton: true,
  },
  {
    id: 2,
    title: "Sistema de Gestão BebidasON",
    description: "Sistema completo de gestão empresarial para controle de estoque, vendas e dashboard analytics",
    longDescription:
      "Sistema robusto de gestão empresarial com módulos de estoque, vendas, relatórios financeiros e dashboard analítico. Interface intuitiva e responsiva para desktop e mobile.",
    images: ["/em-desenvolvimento.png"],
    category: "sistema",
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma"],
    status: "Concluído",
    client: "BebidasON",
    features: ["Gestão de estoque", "Controle de vendas", "Dashboard analytics", "Relatórios detalhados"],
    link: "https://bebidas-on-sistema-de-gestao.vercel.app/",
    projectUrl: "https://bebidas-on-sistema-de-gestao.vercel.app/",
    githubUrl: "https://github.com/gvsoftware/sistema-gestao",
    featured: true,
    createdAt: "2024-02-20",
    showProjectButton: true,
  },
  {
    id: 3,
    title: "E-commerce Moderno",
    description: "Plataforma de e-commerce completa com carrinho de compras, pagamentos e gestão de produtos",
    longDescription:
      "E-commerce completo com carrinho de compras, sistema de pagamento, gestão de produtos, painel administrativo e dashboard de vendas. Design responsivo e otimizado para conversão.",
    images: ["/em-desenvolvimento.png"],
    category: "web",
    technologies: ["Next.js", "React", "Stripe", "MongoDB"],
    status: "Em Desenvolvimento",
    client: "Cliente Confidencial",
    features: ["Carrinho de compras", "Pagamentos online", "Gestão de produtos", "Painel administrativo"],
    featured: false,
    createdAt: "2024-03-10",
    showProjectButton: false,
  },
  {
    id: 4,
    title: "App de Delivery",
    description:
      "Aplicativo mobile para delivery de comida com rastreamento em tempo real e múltiplas formas de pagamento",
    longDescription:
      "Aplicativo mobile completo para delivery com geolocalização, rastreamento em tempo real, sistema de pagamento integrado e notificações push. Interface otimizada para UX.",
    images: [
      "/em-desenvolvimento.png",
      "/em-desenvolvimento.png",
      "/em-desenvolvimento.png",
      "/em-desenvolvimento.png",
    ],
    category: "mobile",
    technologies: ["React Native", "Node.js", "MongoDB", "Socket.io"],
    status: "Em Desenvolvimento",
    client: "RestauranteTech",
    features: ["Rastreamento em tempo real", "Múltiplos pagamentos", "Chat com entregador", "Avaliações"],
    featured: false,
    createdAt: "2024-04-05",
    showProjectButton: false,
  },
  {
    id: 5,
    title: "Sistema ERP Empresarial",
    description: "Sistema ERP completo para gestão empresarial com módulos financeiro, RH e vendas",
    longDescription:
      "Sistema ERP robusto com módulos financeiro, RH, estoque, vendas e relatórios. Dashboard executivo com métricas em tempo real e integração com APIs externas.",
    images: ["/em-desenvolvimento.png"],
    category: "sistema",
    technologies: ["Vue.js", "Laravel", "MySQL", "Docker"],
    status: "Em Desenvolvimento",
    client: "Empresa XYZ",
    features: ["Módulo financeiro", "Gestão de RH", "Controle de vendas", "Relatórios gerenciais"],
    featured: true,
    createdAt: "2024-05-12",
    showProjectButton: false,
  },
  {
    id: 6,
    title: "Landing Page Corporativa",
    description: "Landing page moderna e responsiva para empresa de tecnologia com animações e design atrativo",
    longDescription:
      "Landing page corporativa com design moderno, animações suaves, formulários de contato, integração com CRM e otimização para SEO. Foco em conversão e experiência do usuário.",
    images: ["/em-desenvolvimento.png"],
    category: "web",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    status: "Em Desenvolvimento",
    client: "TechCorp",
    features: ["Animações suaves", "Design responsivo", "SEO otimizado", "Formulário de contato"],
    featured: false,
    createdAt: "2024-06-18",
    showProjectButton: false,
  },
  {
    id: 7,
    title: "App Fitness Tracker",
    description: "Aplicativo para acompanhamento de exercícios e dieta com sincronização na nuvem",
    longDescription:
      "App mobile para tracking de exercícios, definição de metas, acompanhamento de progresso e integração com wearables. Interface gamificada para engajamento do usuário.",
    images: ["/em-desenvolvimento.png"],
    category: "mobile",
    technologies: ["Flutter", "Firebase", "Node.js"],
    status: "Em Desenvolvimento",
    client: "FitnessTech",
    features: ["Tracking de exercícios", "Planos de dieta", "Sincronização na nuvem", "Estatísticas detalhadas"],
    featured: false,
    createdAt: "2024-07-22",
    showProjectButton: false,
  },
  {
    id: 8,
    title: "Dashboard Analytics",
    description: "Dashboard interativo para visualização de dados e métricas empresariais em tempo real",
    longDescription:
      "Dashboard interativo com visualizações avançadas, relatórios customizáveis, integração com múltiplas fontes de dados e alertas automáticos. Ideal para tomada de decisões estratégicas.",
    images: ["/em-desenvolvimento.png"],
    category: "sistema",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
    status: "Em Desenvolvimento",
    client: "DataCorp",
    features: ["Gráficos interativos", "Dados em tempo real", "Filtros avançados", "Exportação de relatórios"],
    featured: true,
    createdAt: "2024-08-30",
    showProjectButton: false,
  },
]

// Chave para localStorage
const STORAGE_KEY = "gv_software_projects"

// Função para carregar projetos do localStorage
export const loadProjects = (): Project[] => {
  if (typeof window === "undefined") return defaultProjects

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProjects
    }
  } catch (error) {
    console.error("Erro ao carregar projetos:", error)
  }

  return defaultProjects
}

// Função para salvar projetos no localStorage
export const saveProjects = (projectsToSave: Project[]): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsToSave))
    // Disparar evento customizado para sincronizar entre abas
    window.dispatchEvent(new Event("projects-updated"))
  } catch (error) {
    console.error("Erro ao salvar projetos:", error)
  }
}

// Array mutável que será a fonte de verdade
let projectsCache: Project[] = []

// Função para obter projetos (sempre atualizado)
export const getProjects = (): Project[] => {
  if (projectsCache.length === 0) {
    projectsCache = loadProjects()
  }
  return projectsCache
}

// Exportar projetos (compatibilidade com código existente)
export const projects = new Proxy([] as Project[], {
  get(target, prop) {
    const currentProjects = getProjects()
    if (prop === "length") return currentProjects.length
    if (typeof prop === "string") {
      const index = Number.parseInt(prop, 10)
      if (!isNaN(index)) return currentProjects[index]
    }
    return currentProjects[prop as keyof Project[]]
  },
  set(target, prop, value) {
    const currentProjects = getProjects()
    if (typeof prop === "string") {
      const index = Number.parseInt(prop, 10)
      if (!isNaN(index)) {
        currentProjects[index] = value
        saveProjects(currentProjects)
        return true
      }
    }
    return false
  },
  has(target, prop) {
    const currentProjects = getProjects()
    return prop in currentProjects
  },
  ownKeys() {
    const currentProjects = getProjects()
    return Reflect.ownKeys(currentProjects)
  },
  getOwnPropertyDescriptor(target, prop) {
    const currentProjects = getProjects()
    return Reflect.getOwnPropertyDescriptor(currentProjects, prop)
  },
})

// Funções utilitárias
export const getProjectById = (id: number): Project | undefined => {
  return getProjects().find((project) => project.id === id)
}

export const getProjectsByCategory = (category: string): Project[] => {
  const currentProjects = getProjects()
  if (category === "all") return currentProjects
  return currentProjects.filter((project) => project.category === category)
}

export const getProjectsByStatus = (status: string): Project[] => {
  const currentProjects = getProjects()
  if (status === "all") return currentProjects
  return currentProjects.filter((project) => project.status === status)
}

export const getFeaturedProjects = (): Project[] => {
  return getProjects().filter((project) => project.featured)
}

export const addProject = (project: Omit<Project, "id">): Project => {
  const currentProjects = getProjects()
  const newProject = {
    ...project,
    id: currentProjects.length > 0 ? Math.max(...currentProjects.map((p) => p.id)) + 1 : 1,
  }
  currentProjects.push(newProject)
  projectsCache = currentProjects
  saveProjects(currentProjects)
  return newProject
}

export const updateProject = (id: number, updatedProject: Partial<Project>): Project | null => {
  const currentProjects = getProjects()
  const index = currentProjects.findIndex((project) => project.id === id)
  if (index === -1) return null

  currentProjects[index] = { ...currentProjects[index], ...updatedProject }
  projectsCache = currentProjects
  saveProjects(currentProjects)
  return currentProjects[index]
}

export const deleteProject = (id: number): boolean => {
  const currentProjects = getProjects()
  const index = currentProjects.findIndex((project) => project.id === id)
  if (index === -1) return false

  currentProjects.splice(index, 1)
  projectsCache = currentProjects
  saveProjects(currentProjects)
  return true
}

// Função para resetar para projetos padrão
export const resetToDefaultProjects = (): void => {
  projectsCache = [...defaultProjects]
  saveProjects(defaultProjects)
}

// Função para exportar projetos
export const exportProjects = (): string => {
  return JSON.stringify(getProjects(), null, 2)
}

// Função para importar projetos
export const importProjects = (jsonString: string): boolean => {
  try {
    const imported = JSON.parse(jsonString)
    if (Array.isArray(imported)) {
      projectsCache = imported
      saveProjects(imported)
      return true
    }
  } catch (error) {
    console.error("Erro ao importar projetos:", error)
  }
  return false
}
