"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Definindo o schema de validação com Zod
const resetPasswordSchema = z
  .object({
    phone: z.string().regex(/^\+[1-9]\d{1,14}$/, {
      message: "Telefone deve estar no formato internacional (ex: +5511999999999)",
    }),
    otp: z.string().min(4, {
      message: "O código OTP deve ter pelo menos 4 caracteres",
    }),
    password: z.string().min(6, {
      message: "A nova senha deve ter pelo menos 6 caracteres",
    }),
    confirmPassword: z.string().min(6, {
      message: "A confirmação de senha deve ter pelo menos 6 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

// Tipo inferido do schema
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  // Inicializando o formulário com react-hook-form e validação zod
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      phone: searchParams.get("phone") || "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
  })

  // Atualizar o valor do telefone quando o parâmetro de consulta mudar
  useEffect(() => {
    const phone = searchParams.get("phone")
    if (phone) {
      form.setValue("phone", phone)
    }
  }, [searchParams, form])

  // Função para lidar com o envio do formulário
  async function onSubmit(data: ResetPasswordFormValues) {
    setIsSubmitting(true)
    setFormStatus({ type: null, message: null })

    try {
      const response = await axios.post("http://localhost:5000/auth/reset-password", {
        phone: data.phone,
        otp: data.otp,
        password: data.password,
      })

      setFormStatus({
        type: "success",
        message: response.data.message || "Senha redefinida com sucesso!",
      })

      // Redirecionar para a página de login após 2 segundos
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error) {
      console.error("Erro ao redefinir senha:", error)
      setFormStatus({
        type: "error",
        message: "Falha ao redefinir senha. Verifique o código OTP.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Redefinir senha</CardTitle>
          <CardDescription className="text-center">Digite o código recebido e sua nova senha</CardDescription>
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
                      <Input placeholder="+5511999999999" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código OTP</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o código recebido" {...field} />
                    </FormControl>
                    <FormDescription>Digite o código de verificação enviado para seu telefone</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova senha</FormLabel>
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormDescription>Digite novamente sua nova senha</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Redefinindo...
                  </>
                ) : (
                  "Redefinir senha"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            <Link href="/login" className="text-blue-500 hover:underline">
              Voltar para o login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
