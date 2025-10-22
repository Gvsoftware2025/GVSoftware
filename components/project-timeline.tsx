"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock, Calendar } from "lucide-react"

interface TimelineItem {
  id: string
  title: string
  description: string
  date: string
  status: "completed" | "in-progress" | "pending"
  category: string
}

interface ProjectTimelineProps {
  items: TimelineItem[]
}

export function ProjectTimeline({ items }: ProjectTimelineProps) {
  const [filter, setFilter] = useState<string>("all")

  const filteredItems = filter === "all" ? items : items.filter((item) => item.category === filter)

  const categories = ["all", ...Array.from(new Set(items.map((item) => item.category)))]

  const getStatusIcon = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "pending":
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-yellow-500"
      case "pending":
        return "bg-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={filter === category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilter(category)}
          >
            {category === "all" ? "Todos" : category}
          </Badge>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {/* Timeline Items */}
        <div className="space-y-6">
          {filteredItems.map((item, index) => (
            <div key={item.id} className="relative flex items-start space-x-4">
              {/* Timeline Dot */}
              <div className={`relative z-10 w-3 h-3 rounded-full ${getStatusColor(item.status)} mt-2`}></div>

              {/* Content */}
              <Card className="flex-1">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.date}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
