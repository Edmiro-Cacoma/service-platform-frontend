"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from "axios"
import Link from "next/link"
import { AlertCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Definindo o schema de validação com Zod
const loginSchema = z.object({
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/, {
    message: "Telefone deve estar no formato internacional (ex: +5511999999999)",
  }),
  password: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres",
  }),
})

// Tipo inferido do schema
type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  // Inicializando o formulário com react-hook-form e validação zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  })

  // Função para lidar com o envio do formulário
  async function onSubmit(data: LoginFormValues) {
    setIsSubmitting(true)
    setFormStatus({ type: null, message: null })

    try {
      const response = await axios.post("http://localhost:5000/auth/login", data)

      setFormStatus({
        type: "success",
        message: "Login realizado com sucesso!",
      })

      // Armazenar token e redirecionar para o dashboard apropriado
      localStorage.setItem("token", response.data.token)

      // Redirecionar com base no tipo de usuário (exemplo)
      setTimeout(() => {
        if (response.data.user.role === "REQUESTER") {
          router.push("/dashboard/requester")
        } else {
          router.push("/dashboard/provider")
        }
      }, 1000)
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      setFormStatus({
        type: "error",
        message: "Falha ao fazer login. Verifique suas credenciais.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para acessar a plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formStatus.type && (
            <Alert
              variant={formStatus.type === "error" ? "destructive" : "default"}
              className={`mb-4 ${formStatus.type === "success" ? "bg-green-50 text-green-800 border-green-200" : ""}`}
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{formStatus.type === "success" ? "Sucesso!" : "Erro!"}</AlertTitle>
              <AlertDescription>{formStatus.message}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="+5511999999999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                  Esqueceu sua senha?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            Não possui uma conta?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Registre-se
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
