import { DashboardShell } from "@/app/dashboard/provider/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, CheckCircle, XCircle, Search, Filter, PlusCircle } from "lucide-react"
import Link from "next/link"

export default function RequesterServicesPage() {
  // Dados de exemplo para serviços
  const services = [
    {
      id: 1,
      title: "Manutenção Elétrica",
      provider: "João Eletricista",
      status: "scheduled",
      date: "Amanhã, 14:00",
      address: "Rua Exemplo, 123 - São Paulo, SP",
      price: "R$ 150,00",
    },
    {
      id: 2,
      title: "Limpeza Geral",
      provider: "Limpeza Express",
      status: "in_progress",
      date: "Em andamento",
      address: "Av. Principal, 456 - São Paulo, SP",
      price: "R$ 200,00",
    },
    {
      id: 3,
      title: "Instalação de Ar Condicionado",
      provider: "Refrigeração Total",
      status: "pending",
      date: "Aguardando confirmação",
      address: "Rua Secundária, 789 - São Paulo, SP",
      price: "R$ 350,00",
    },
    {
      id: 4,
      title: "Conserto de Encanamento",
      provider: "Encanadores Rápidos",
      status: "completed",
      date: "15/04/2023, 10:00",
      address: "Rua Exemplo, 123 - São Paulo, SP",
      price: "R$ 180,00",
    },
    {
      id: 5,
      title: "Pintura de Sala",
      provider: "Pintores Profissionais",
      status: "completed",
      date: "10/03/2023, 09:00",
      address: "Av. Principal, 456 - São Paulo, SP",
      price: "R$ 500,00",
    },
    {
      id: 6,
      title: "Reparo de Computador",
      provider: "TechSupport",
      status: "cancelled",
      date: "Cancelado em 05/03/2023",
      address: "Rua Secundária, 789 - São Paulo, SP",
      price: "R$ 120,00",
    },
  ]

  // Função para renderizar o ícone de status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
      case "scheduled":
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  // Função para renderizar o texto de status
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "scheduled":
        return "Agendado"
      case "in_progress":
        return "Em andamento"
      case "completed":
        return "Concluído"
      case "cancelled":
        return "Cancelado"
      default:
        return ""
    }
  }

  // Função para renderizar a cor de fundo do status
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-orange-100 text-orange-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return ""
    }
  }

  return (
    <DashboardShell >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meus Serviços</h1>
            <p className="text-muted-foreground">Gerencie todos os seus serviços solicitados</p>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600" asChild>
            <Link href="/dashboard/requester/request-service">
              <PlusCircle className="mr-2 h-4 w-4" />
              Solicitar Novo Serviço
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar serviços..." className="pl-8" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="scheduled">Agendados</SelectItem>
                <SelectItem value="in_progress">Em andamento</SelectItem>
                <SelectItem value="completed">Concluídos</SelectItem>
                <SelectItem value="cancelled">Cancelados</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Ativos</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-4">
            <div className="grid gap-4">
              {services
                .filter((service) => ["pending", "scheduled", "in_progress"].includes(service.status))
                .map((service) => (
                  <Card key={service.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div
                          className={`w-full sm:w-1 ${
                            service.status === "scheduled"
                              ? "bg-blue-500"
                              : service.status === "in_progress"
                                ? "bg-orange-500"
                                : "bg-yellow-500"
                          }`}
                        ></div>
                        <div className="flex-1 p-6">
                          <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(service.status)}
                              <h3 className="font-semibold">{service.title}</h3>
                            </div>
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium w-fit ${getStatusBgColor(
                                service.status,
                              )}`}
                            >
                              {getStatusText(service.status)}
                            </span>
                          </div>
                          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-muted-foreground">
                            <div>Prestador: {service.provider}</div>
                            <div>Data: {service.date}</div>
                            <div>Local: {service.address}</div>
                            <div>Valor: {service.price}</div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              Detalhes
                            </Button>
                            <Button variant="outline" size="sm">
                              Mensagem
                            </Button>
                            {service.status === "pending" && (
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                Cancelar
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <div className="grid gap-4">
              {services
                .filter((service) => service.status === "completed")
                .map((service) => (
                  <Card key={service.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1 bg-green-500"></div>
                        <div className="flex-1 p-6">
                          <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(service.status)}
                              <h3 className="font-semibold">{service.title}</h3>
                            </div>
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium w-fit ${getStatusBgColor(
                                service.status,
                              )}`}
                            >
                              {getStatusText(service.status)}
                            </span>
                          </div>
                          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-muted-foreground">
                            <div>Prestador: {service.provider}</div>
                            <div>Data: {service.date}</div>
                            <div>Local: {service.address}</div>
                            <div>Valor: {service.price}</div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              Detalhes
                            </Button>
                            <Button variant="outline" size="sm">
                              Avaliar
                            </Button>
                            <Button variant="outline" size="sm">
                              Solicitar Novamente
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="cancelled" className="mt-4">
            <div className="grid gap-4">
              {services
                .filter((service) => service.status === "cancelled")
                .map((service) => (
                  <Card key={service.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1 bg-red-500"></div>
                        <div className="flex-1 p-6">
                          <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(service.status)}
                              <h3 className="font-semibold">{service.title}</h3>
                            </div>
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium w-fit ${getStatusBgColor(
                                service.status,
                              )}`}
                            >
                              {getStatusText(service.status)}
                            </span>
                          </div>
                          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-muted-foreground">
                            <div>Prestador: {service.provider}</div>
                            <div>Data: {service.date}</div>
                            <div>Local: {service.address}</div>
                            <div>Valor: {service.price}</div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              Detalhes
                            </Button>
                            <Button variant="outline" size="sm">
                              Solicitar Novamente
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
