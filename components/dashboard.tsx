"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

function formatSafeDate(date: string) {
  if (!date) return "Sin fecha";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Sin fecha";
  return format(d, "dd 'de' MMMM 'de' yyyy", { locale: es });
}
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock, AlertCircle, CheckCircle2, Calendar, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Ticket {
  id: number
  title: string
  status: "abierto" | "en-proceso" | "resuelto"
  priority: "baja" | "media" | "alta"
  date: string
  category: string
}

const mockTickets: Ticket[] = [
  {
    id: 1,
    title: "Problema con impresora de oficina",
    status: "abierto",
    priority: "media",
    date: "2024-01-15",
    category: "hardware",
  },
  {
    id: 2,
    title: "Error en sistema de facturación",
    status: "en-proceso",
    priority: "alta",
    date: "2024-01-14",
    category: "software",
  },
  {
    id: 3,
    title: "Conexión lenta a internet",
    status: "resuelto",
    priority: "baja",
    date: "2024-01-13",
    category: "red",
  },
]

export default function Dashboard() {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null)
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/");
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
  
    // Fetch tickets del usuario
    fetch(`/api/tickets?user_id=${parsedUser.id}`)
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(() => setTickets([]));
  }, [router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "abierto":
        return <Clock className="h-4 w-4" />
      case "en-proceso":
        return <AlertCircle className="h-4 w-4" />
      case "resuelto":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
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

  if (!user) {
    return <div>Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div
          className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Navbar />
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-slide-up">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            <h1 className="text-4xl font-bold mb-2">¡Hola, {user.name}! ✨</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Bienvenido a tu panel de soporte. Aquí puedes gestionar todos tus tickets.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-effect border-0 card-hover animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tickets Abiertos</p>
                  <p className="text-3xl font-bold text-yellow-600">1</p>
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-amber-400 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0 card-hover animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En Proceso</p>
                  <p className="text-3xl font-bold text-blue-600">1</p>
                </div>
                <div className="bg-gradient-to-r from-blue-400 to-indigo-400 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0 card-hover animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resueltos</p>
                  <p className="text-3xl font-bold text-green-600">1</p>
                </div>
                <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-3 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Mis Tickets
          </h2>
          <Link href="/new-ticket">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              <Zap className="h-4 w-4 mr-1" />
              Crear nuevo ticket
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket, index) => (
            <Card
              key={ticket.id}
              className="glass-effect border-0 card-hover animate-slide-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <Link href={`/ticket/${ticket.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">{ticket.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm text-gray-500 font-medium">Ticket #{ticket.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <Badge variant="default" className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                    
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    {formatSafeDate(ticket.date)}
                  </div>
                  <div className="text-sm text-gray-600 capitalize font-medium">
                    <span className="text-purple-600">Categoría:</span> {ticket.category}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {tickets.length === 0 && (
          <div className="text-center py-16 animate-slide-up">
            <div className="text-gray-400 mb-6">
              <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                <Clock className="h-12 w-12 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No tienes tickets aún</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Crea tu primer ticket para comenzar a gestionar tus solicitudes de soporte.
            </p>
            <Link href="/new-ticket">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                <Plus className="h-5 w-5 mr-2" />
                <Zap className="h-5 w-5 mr-1" />
                Crear primer ticket
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
