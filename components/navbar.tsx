"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Building2, Home, Plus, LogOut, User, Moon, Sun, Sparkles } from "lucide-react"

export default function Navbar() {
  const [user, setUser] = useState<{ full_name: string; email: string; role: string } | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const updateUser = () => {
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      } else {
        setUser(null)
      }
    }

    updateUser()

    window.addEventListener('userLoggedIn', updateUser)
    window.addEventListener('storage', updateUser)

    return () => {
      window.removeEventListener('userLoggedIn', updateUser)
      window.removeEventListener('storage', updateUser)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.dispatchEvent(new Event('userLoggedOut'))
    router.push("/")
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <nav className="glass-effect border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SoporteTech
              </span>
              <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 group"
              >
                <Home className="h-4 w-4 group-hover:text-blue-600" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link
                href="/new-ticket"
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-all duration-300 hover:scale-105 group"
              >
                <Plus className="h-4 w-4 group-hover:text-purple-600" />
                <span className="font-medium">Crear ticket</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-110"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      {user.full_name?.charAt(0) || <User className="h-4 w-4" />}
                    </div>
                    <span className="hidden md:inline">{user.full_name || user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user.full_name || 'Usuario'}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{user.role || 'Usuario'}</p>
                  </div>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => router.push('/login')} variant="outline" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                Iniciar sesión
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
