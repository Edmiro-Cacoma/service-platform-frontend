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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Definindo o schema de validação com Zod
const forgotPasswordSchema = z.object({
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/, {
    message: "Telefone deve estar no formato internacional (ex: +5511999999999)",
  }),
})

// Tipo inferido do schema
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  // Inicializando o formulário com react-hook-form e validação zod
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phone: "",
    },
  })

  // Função para lidar com o envio do formulário
  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsSubmitting(true)
    setFormStatus({ type: null, message: null })

    try {
      const response = await axios.post("http://localhost:5000/auth/forgot-password", data)

      setFormStatus({
        type: "success",
        message: response.data.message || "Código de recuperação enviado para seu telefone.",
      })

      // Redirecionar para a página de redefinição de senha após 2 segundos
      setTimeout(() => {
        router.push(`/reset-password?phone=${encodeURIComponent(data.phone)}`)
      }, 2000)
    } catch (error) {
      console.error("Erro ao solicitar recuperação de senha:", error)
      setFormStatus({
        type: "error",
        message: "Falha ao processar a solicitação. Verifique o número de telefone.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Recuperar senha</CardTitle>
          <CardDescription className="text-center">
            Digite seu número de telefone para receber um código de recuperação
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
                    <FormDescription>Digite o número de telefone associado à sua conta</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar código de recuperação"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            Lembrou sua senha?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Voltar para o login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
