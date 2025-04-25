"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
const otpSchema = z.object({
  otp: z.string().min(4, {
    message: "O código OTP deve ter pelo menos 4 dígitos",
  }),
})

type OtpFormValues = z.infer<typeof otpSchema>

export default function VerifyOtpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone") || ""
  const role = searchParams.get("role") || ""

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  // Temporizador para reenvio do código
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Referências para os inputs do OTP
  const otpInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  // Estado para armazenar os dígitos do OTP
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""])

  // Inicializando o formulário com react-hook-form e validação zod
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

  // Efeito para iniciar o temporizador
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  // Função para lidar com a mudança em um dígito do OTP
  const handleOtpDigitChange = (index: number, value: string) => {
    // Permitir apenas números
    if (value && !/^\d*$/.test(value)) return

    // Atualizar o estado dos dígitos
    const newOtpDigits = [...otpDigits]
    newOtpDigits[index] = value.slice(0, 1) // Garantir que seja apenas um dígito
    setOtpDigits(newOtpDigits)

    // Atualizar o valor do formulário
    form.setValue("otp", newOtpDigits.join(""))

    // Mover o foco para o próximo input se um dígito foi inserido
    if (value && index < otpInputRefs.length - 1) {
      otpInputRefs[index + 1].current?.focus()
    }
  }

  // Função para lidar com a tecla backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Se backspace for pressionado e o campo estiver vazio, mover para o campo anterior
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus()
    }
  }

  // Função para lidar com o envio do formulário
  async function onSubmit(data: OtpFormValues) {
    setIsSubmitting(true)
    setFormStatus({ type: null, message: null })

    try {
      const response = await axios.post("http://localhost:5000/auth/verify-otp", {
        phone,
        otp: data.otp,
      })

      setFormStatus({
        type: "success",
        message: response.data.message || "Verificação bem-sucedida!",
      })

      // Armazenar token e redirecionar para o dashboard apropriado
      localStorage.setItem("token", response.data.token)

      // Redirecionar com base no tipo de usuário
      setTimeout(() => {
        if (role === "REQUESTER") {
          router.push("/dashboard/requester")
        } else {
          router.push("/dashboard/provider")
        }
      }, 1500)
    } catch (error) {
      console.error("Erro ao verificar OTP:", error)
      setFormStatus({
        type: "error",
        message: "Código inválido. Por favor, tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Função para reenviar o código OTP
  async function resendOtp() {
    if (!canResend) return

    setIsResending(true)
    setFormStatus({ type: null, message: null })

    try {
      const response = await axios.post("http://localhost:5000/auth/resend-otp", {
        phone,
      })

      setFormStatus({
        type: "success",
        message: response.data.message || "Novo código enviado com sucesso!",
      })

      // Reiniciar o temporizador
      setCountdown(60)
      setCanResend(false)
    } catch (error) {
      console.error("Erro ao reenviar OTP:", error)
      setFormStatus({
        type: "error",
        message: "Falha ao reenviar o código. Por favor, tente novamente.",
      })
    } finally {
      setIsResending(false)
    }
  }

  // Função para formatar o tempo restante
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verificação de Telefone</CardTitle>
          <CardDescription className="text-center">Digite o código de verificação enviado para {phone}</CardDescription>
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
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex   flex-col items-center justify-center">
                    <div >
                      <FormLabel>Código de Verificação</FormLabel>
                    </div>

                    <FormControl>
                      <div className="flex justify-center gap-2">
                        {otpDigits.map((digit, index) => (
                          <Input
                            key={index}
                            ref={otpInputRefs[index]}
                            value={digit}
                            onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="h-12 w-12 text-center text-lg"
                            maxLength={1}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormDescription className="text-center">
                      O código expira em {formatTime(countdown)}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={resendOtp}
                  disabled={!canResend || isResending}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Reenviando...
                    </>
                  ) : canResend ? (
                    "Reenviar código"
                  ) : (
                    `Reenviar código em ${formatTime(countdown)}`
                  )}
                </Button>
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  "Verificar"
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
