import RegisterForm from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Elementos decorativos animados */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div
        className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute -bottom-32 left-1/2 w-72 h-72 bg-gradient-to-r from-teal-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <RegisterForm />
      </div>
    </div>
  )
}
