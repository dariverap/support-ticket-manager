"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, User, Mail, Lock, Stars } from "lucide-react"

export default function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: name, email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Registro exitoso - mostrar mensaje y redirigir al login
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        router.push('/');
      } else {
        // Error del servidor
        alert(data.error || 'Error en el registro');
      }
    } catch (err) {
      console.error('Error en el registro:', err);
      alert('Error de conexión. Inténtalo de nuevo.');
    }
  }

  return (
    <Card className="w-full max-w-md glass-effect shadow-2xl border-0 animate-scale-in">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 rounded-2xl animate-pulse-glow">
            <Building2 className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent">
          Crear cuenta nueva
        </CardTitle>
        <CardDescription className="text-gray-600 flex items-center justify-center gap-1">
          <Stars className="h-4 w-4 text-emerald-500" />
          Completa los datos para registrarte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Nombre completo
            </Label>
            <div className="relative group">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                id="name"
                type="text"
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="tu@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Contraseña
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Crear cuenta
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/"
              className="text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-300"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
