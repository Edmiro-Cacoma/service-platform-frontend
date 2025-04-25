"use client"

import { useState } from "react"
import { DashboardShell } from "@/app/dashboard/provider/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Clock, MapPin, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function RequestServicePage() {
  const [date, setDate] = useState<Date>()
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <DashboardShell >
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Solicitar Novo Serviço</h1>
          <p className="text-muted-foreground">Preencha os detalhes para solicitar um serviço</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    step > index + 1
                      ? "bg-blue-500 text-white"
                      : step === index + 1
                        ? "bg-blue-100 text-blue-500 border border-blue-500"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-xs text-muted-foreground">
                  {index === 0 ? "Detalhes" : index === 1 ? "Agendamento" : "Confirmação"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 relative">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
            <div
              className="absolute top-0 left-0 h-1 bg-blue-500 transition-all"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Serviço</CardTitle>
              <CardDescription>Informe o tipo de serviço e detalhes do que precisa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service-type">Tipo de Serviço</Label>
                <Select>
                  <SelectTrigger id="service-type">
                    <SelectValue placeholder="Selecione o tipo de serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electrical">Elétrica</SelectItem>
                    <SelectItem value="plumbing">Encanamento</SelectItem>
                    <SelectItem value="cleaning">Limpeza</SelectItem>
                    <SelectItem value="ac">Ar Condicionado</SelectItem>
                    <SelectItem value="painting">Pintura</SelectItem>
                    <SelectItem value="gardening">Jardinagem</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-title">Título</Label>
                <Input id="service-title" placeholder="Ex: Instalação de tomadas na sala" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-description">Descrição</Label>
                <Textarea
                  id="service-description"
                  placeholder="Descreva em detalhes o serviço que você precisa"
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-urgency">Urgência</Label>
                <Select>
                  <SelectTrigger id="service-urgency">
                    <SelectValue placeholder="Selecione a urgência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa - Pode esperar alguns dias</SelectItem>
                    <SelectItem value="medium">Média - Preciso em até 48 horas</SelectItem>
                    <SelectItem value="high">Alta - Preciso o quanto antes</SelectItem>
                    <SelectItem value="emergency">Emergência - Preciso imediatamente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fotos (opcional)</Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 hover:border-blue-500">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="rounded-full bg-blue-50 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-blue-500"
                        >
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                          <line x1="16" x2="22" y1="5" y2="5"></line>
                          <line x1="19" x2="19" y1="2" y2="8"></line>
                          <circle cx="9" cy="9" r="2"></circle>
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                        </svg>
                      </div>
                      <span className="text-xs text-muted-foreground">Adicionar foto</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard/requester">Cancelar</Link>
              </Button>
              <Button onClick={nextStep} className="bg-blue-500 hover:bg-blue-600">
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Agendamento</CardTitle>
              <CardDescription>Escolha a data, horário e local do serviço</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={ptBR} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Select>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Manhã (8h - 12h)</SelectItem>
                    <SelectItem value="afternoon">Tarde (13h - 17h)</SelectItem>
                    <SelectItem value="evening">Noite (18h - 21h)</SelectItem>
                    <SelectItem value="specific">Horário específico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specific-time">Horário específico (opcional)</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input id="specific-time" type="time" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input id="address" placeholder="Rua, número, bairro" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" placeholder="Cidade" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" placeholder="Estado" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="complement">Complemento (opcional)</Label>
                <Input id="complement" placeholder="Apartamento, bloco, referência" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button onClick={nextStep} className="bg-blue-500 hover:bg-blue-600">
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Confirmação</CardTitle>
              <CardDescription>Revise os detalhes do serviço antes de confirmar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">
                      Ao confirmar, sua solicitação será enviada para prestadores disponíveis. Você poderá receber
                      propostas em breve.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Detalhes do Serviço</h3>
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                    <div className="text-sm">
                      <span className="font-medium text-muted-foreground">Tipo de Serviço:</span> Elétrica
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-muted-foreground">Urgência:</span> Média
                    </div>
                    <div className="text-sm sm:col-span-2">
                      <span className="font-medium text-muted-foreground">Título:</span> Instalação de tomadas na sala
                    </div>
                    <div className="text-sm sm:col-span-2">
                      <span className="font-medium text-muted-foreground">Descrição:</span> Preciso instalar 3 tomadas
                      novas na sala de estar. A fiação já está passada, falta apenas a instalação das tomadas.
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Agendamento</h3>
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                    <div className="text-sm">
                      <span className="font-medium text-muted-foreground">Data:</span>{" "}
                      {date ? format(date, "PPP", { locale: ptBR }) : "Não selecionada"}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-muted-foreground">Horário:</span> Tarde (13h - 17h)
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Local</h3>
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                    <div className="text-sm sm:col-span-2">
                      <span className="font-medium text-muted-foreground">Endereço:</span> Rua Exemplo, 123
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-muted-foreground">Cidade:</span> São Paulo
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-muted-foreground">Estado:</span> SP
                    </div>
                    <div className="text-sm sm:col-span-2">
                      <span className="font-medium text-muted-foreground">Complemento:</span> Apartamento 42, Bloco B
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600">Confirmar Solicitação</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardShell>
  )
}
