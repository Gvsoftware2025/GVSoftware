"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SearchFilters {
  category: string[]
  status: string[]
  dateRange: string
}

interface AdvancedSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void
  onClear: () => void
}

export function AdvancedSearch({ onSearch, onClear }: AdvancedSearchProps) {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>({
    category: [],
    status: [],
    dateRange: "all",
  })
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["Web", "Mobile", "Design", "Consultoria"]
  const statuses = ["Ativo", "Concluído", "Em Desenvolvimento", "Pausado"]

  const handleSearch = () => {
    onSearch(query, filters)
  }

  const handleClear = () => {
    setQuery("")
    setFilters({
      category: [],
      status: [],
      dateRange: "all",
    })
    onClear()
  }

  const toggleFilter = (type: keyof SearchFilters, value: string) => {
    if (type === "dateRange") {
      setFilters((prev) => ({ ...prev, [type]: value }))
    } else {
      setFilters((prev) => ({
        ...prev,
        [type]: prev[type].includes(value) ? prev[type].filter((item) => item !== value) : [...prev[type], value],
      }))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar projetos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={() => setShowFilters(!showFilters)} variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
        <Button onClick={handleSearch}>Buscar</Button>
        <Button onClick={handleClear} variant="ghost">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <h4 className="font-medium mb-2">Categoria</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={filters.category.includes(category) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter("category", category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Status</h4>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Badge
                  key={status}
                  variant={filters.status.includes(status) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter("status", status)}
                >
                  {status}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
