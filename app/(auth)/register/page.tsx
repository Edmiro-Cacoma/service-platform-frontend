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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Definindo o schema de validação com Zod
const registerSchema = z.object({
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/, {
    message: "Telefone deve estar no formato internacional (ex: +5511999999999)",
  }),
  password: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres",
  }),
  role: z.enum(["REQUESTER", "PROVIDER"], {
    required_error: "Por favor selecione um tipo de usuário",
  }),
})

// Tipo inferido do schema
type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  // Inicializando o formulário com react-hook-form e validação zod
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: "",
      password: "",
      role: undefined,
    },
  })

  // Função para lidar com o envio do formulário
  async function onSubmit(data: RegisterFormValues) {
    setIsSubmitting(true)
    setFormStatus({ type: null, message: null })

    try {
      const response = await axios.post("http://localhost:5000/auth/register", data)

      setFormStatus({
        type: "success",
        message: response.data.message || "Usuário registrado com sucesso! OTP enviado.",
      })

      // Redirecionar para a página de login após 2 segundos
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      console.error("Erro ao registrar:", error)
      setFormStatus({
        type: "error",
        message: "Falha ao registrar. Por favor, tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Criar conta</CardTitle>
          <CardDescription className="text-center">
            Preencha os dados abaixo para se registrar na plataforma
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
                      <Input placeholder="+244 926830912" {...field} />
                    </FormControl>
                    <FormDescription>Digite seu número no formato internacional com o código do país</FormDescription>
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
                    <FormDescription>Sua senha deve ter pelo menos 6 caracteres</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de usuário</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione seu tipo de usuário" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="REQUESTER">Solicitante</SelectItem>
                        <SelectItem value="PROVIDER">Prestador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Escolha se você deseja solicitar ou prestar serviços</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  "Registrar"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            Já possui uma conta?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
