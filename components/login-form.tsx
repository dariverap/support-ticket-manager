"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Mail, Lock, Sparkles, Info } from "lucide-react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Error al iniciar sesión');
      }
      
      const user = await res.json();
      if (user && user.id) {
        // Guardar el usuario en el estado de autenticación global
        localStorage.setItem('user', JSON.stringify(user));
        // Redirigir al dashboard
        window.dispatchEvent(new Event('userLoggedIn'));
        router.push('/dashboard');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al iniciar sesión');
    }
  }

  return (
    <Card className="w-full max-w-md glass-effect shadow-2xl border-0 animate-scale-in">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl animate-pulse-glow">
            <Building2 className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
          Bienvenido al sistema de soporte interno
        </CardTitle>
        <CardDescription className="text-gray-600 flex items-center justify-center gap-1">
          <Sparkles className="h-4 w-4 text-purple-500" />
          Ingresa tus credenciales para acceder
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mensaje de credenciales de prueba */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Credenciales de prueba</span>
          </div>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Email:</strong> test@test.com</p>
            <p><strong>Contraseña:</strong> password123</p>
            <p className="text-xs text-blue-600 mt-2">
              ✨ Usuario con tickets y comentarios para probar todas las funcionalidades
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                id="email"
                
                placeholder="tu@empresa.com"
                
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Contraseña
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Iniciar sesión
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
