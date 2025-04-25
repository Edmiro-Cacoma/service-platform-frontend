import { Card, CardContent } from "@/components/ui/card"
import { DashboardShell } from "@/app/dashboard/provider/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle } from "lucide-react"

export default function ServicesPage() {
    // Dados de exemplo para serviços
    const services = [
        {
            id: 1,
            title: "Manutenção Elétrica",
            type: "Residencial",
            status: "pending",
            date: "Amanhã, 14:00",
            provider: "João Eletricista",
        },
        {
            id: 2,
            title: "Limpeza Geral",
            type: "Comercial",
            status: "scheduled",
            date: "Quinta-feira, 09:30",
            provider: "Limpeza Express",
        },
        {
            id: 3,
            title: "Instalação de Ar Condicionado",
            type: "Residencial",
            status: "completed",
            date: "Segunda-feira passada, 11:00",
            provider: "Refrigeração Total",
        },
        {
            id: 4,
            title: "Conserto de Encanamento",
            type: "Residencial",
            status: "cancelled",
            date: "15/04/2023, 10:00",
            provider: "Encanadores Rápidos",
        },
    ]

    // Função para renderizar o ícone de status
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
            case "scheduled":
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
            case "completed":
                return "bg-green-100 text-green-800"
            case "cancelled":
                return "bg-red-100 text-red-800"
            default:
                return ""
        }
    }

    return (
        <DashboardShell>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Meus Serviços</h1>
                        <p className="text-muted-foreground">Gerencie todos os seus serviços em um só lugar</p>
                    </div>
                    <Button className="bg-blue-500 hover:bg-blue-600">Novo Serviço</Button>
                </div>

                <div className="grid gap-4">
                    {services.map((service) => (
                        <Card key={service.id}>
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(service.status)}
                                            <h3 className="font-semibold">{service.title}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{service.type}</p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
                                        <div className="text-sm">
                                            <span className="font-medium">Prestador:</span> {service.provider}
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-medium">Data:</span> {service.date}
                                        </div>
                                        <div className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBgColor(service.status)}`}>
                                            {getStatusText(service.status)}
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Detalhes
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardShell>
    )
}
