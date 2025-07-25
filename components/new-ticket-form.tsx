"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Send, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

export default function NewTicketForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      alert('Usuario no válido. Por favor inicia sesión de nuevo.');
      return;
    }
    // Incluye user_id real en el body
    try {
      const res = await fetch('/api/tickets/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          title,
          description,
          category,
          priority
        })
      });
      const ticket = await res.json();
      if (ticket && ticket.id) {
        // Redirige o muestra mensaje de éxito
        router.push('/dashboard');
      } else {
        alert(ticket.error || 'Error al crear el ticket');
      }
    } catch (err) {
      alert('Error al crear el ticket');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div
          className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Navbar />
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-slide-up">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-purple-600 mb-6 transition-all duration-300 hover:scale-105 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Volver al dashboard</span>
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Crear nuevo ticket
            </h1>
            <Zap className="h-8 w-8 text-purple-500 animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Describe tu problema para que nuestro equipo pueda ayudarte
          </p>
        </div>

        <Card className="glass-effect border-0 shadow-2xl animate-scale-in">
          <CardHeader className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-t-lg">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Información del ticket
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Completa todos los campos para crear tu solicitud de soporte
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-gray-700 font-semibold text-base">
                  Título del ticket *
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Describe brevemente el problema"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-base py-3"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-gray-700 font-semibold text-base">
                  Descripción del problema *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe detalladamente el problema que estás experimentando..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-base"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="category" className="text-gray-700 font-semibold text-base">
                  Categoría *
                </Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-base py-3">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent className="glass-effect border-white/20">
                    <SelectItem
                      value="software"
                      className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                    >
                      Software
                    </SelectItem>
                    <SelectItem
                      value="hardware"
                      className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                    >
                      Hardware
                    </SelectItem>
                    <SelectItem value="red" className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50">
                      Red
                    </SelectItem>
                    <SelectItem value="otros" className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50">
                      Otros
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-gray-700 font-semibold text-base">Prioridad *</Label>
                <RadioGroup value={priority} onValueChange={setPriority} required className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-green-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300">
                    <RadioGroupItem value="baja" id="baja" className="border-green-500 text-green-500" />
                    <Label htmlFor="baja" className="cursor-pointer flex-1">
                      <span className="font-semibold text-green-700">Baja</span>
                      <span className="text-sm text-gray-600 ml-3">- No es urgente, puede esperar</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-orange-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                    <RadioGroupItem value="media" id="media" className="border-orange-500 text-orange-500" />
                    <Label htmlFor="media" className="cursor-pointer flex-1">
                      <span className="font-semibold text-orange-700">Media</span>
                      <span className="text-sm text-gray-600 ml-3">- Afecta el trabajo pero hay alternativas</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-red-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300">
                    <RadioGroupItem value="alta" id="alta" className="border-red-500 text-red-500" />
                    <Label htmlFor="alta" className="cursor-pointer flex-1">
                      <span className="font-semibold text-red-700">Alta</span>
                      <span className="text-sm text-gray-600 ml-3">
                        - Bloquea el trabajo, necesita atención inmediata
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-3 px-8 text-base flex-1 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Enviar ticket
                </Button>
                <Link href="/dashboard">
                  <Button
                    type="button"
                    variant="outline"
                    className="px-8 py-3 text-base font-semibold border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-300 bg-transparent"
                  >
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
