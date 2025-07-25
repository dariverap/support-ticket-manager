"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  User,
  Tag,
  Flag,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

interface Comment {
  id: number
  author: string
  content: string
  date: string
  type: "system" | "comment"
}

interface Ticket {
  id: string
  title: string
  description: string
  status: string
  priority: string
  date: string
  category: string
  assigned_to?: string
  comments: Comment[]
}

export default function TicketDetail({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`/api/tickets/${ticketId}`)
        if (response.ok) {
          const data = await response.json()
          setTicket(data)
        } else {
          console.error("Error al cargar el ticket")
        }
      } catch (error) {
        console.error("Error al cargar el ticket:", error)
      } finally {
        setLoading(false)
      }
    }

    if (ticketId) {
      fetchTicket()
    }
  }, [ticketId])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "abierto":
        return <Clock className="h-5 w-5" />
      case "en-proceso":
        return <AlertCircle className="h-5 w-5" />
      case "resuelto":
        return <CheckCircle2 className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "abierto":
        return "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200"
      case "en-proceso":
        return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200"
      case "resuelto":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200"
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200"
      case "media":
        return "bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 border-orange-200"
      case "baja":
        return "bg-gradient-to-r from-green-100 to-teal-100 text-green-800 border-green-200"
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando ticket...</p>
        </div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Ticket no encontrado</p>
          <Link href="/dashboard" className="text-blue-600 hover:underline mt-2 inline-block">
            Volver al dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div
          className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Navbar />
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al dashboard
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-effect border-0 shadow-xl animate-slide-up">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-gray-900">{ticket.title}</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Ticket #{ticket.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{ticket.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 shadow-xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-lg">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Historial de actividad
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {ticket.comments.map((comment, index) => (
                  <div key={comment.id}>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                        {comment.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-gray-900">{comment.author}</p>
                          <div className="text-sm text-gray-500">
                            Creado el: {format(new Date(comment.date), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}
                          </div>
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                    {index < ticket.comments.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="glass-effect border-0 shadow-xl animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-t-lg">
                <CardTitle className="text-xl font-bold text-gray-900">Detalles del ticket</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Fecha de creación</p>
                    <p className="text-sm text-gray-600">{new Date(ticket.date).toLocaleDateString("es-ES")}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                  <Tag className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Categoría</p>
                    <p className="text-sm text-gray-600 capitalize font-medium">{ticket.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-yellow-50">
                  <Flag className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Prioridad</p>
                    <Badge className={`${getPriorityColor(ticket.priority)} border font-medium mt-1`}>
                      {ticket.priority}
                    </Badge>
                  </div>
                </div>

                {ticket.assigned_to && (
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                    <User className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Asignado a</p>
                      <p className="text-sm text-gray-600 font-medium">{ticket.assigned_to}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 shadow-xl animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-t-lg">
                <CardTitle className="text-xl font-bold text-gray-900">Estado actual</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50">
                  <div className={`p-3 rounded-full ${getStatusColor(ticket.status)}`}>
                    {getStatusIcon(ticket.status)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 capitalize text-base">{ticket.status}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {ticket.status === "abierto" && "Esperando asignación"}
                      {ticket.status === "en-proceso" && "En revisión por el equipo"}
                      {ticket.status === "resuelto" && "Problema solucionado"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
