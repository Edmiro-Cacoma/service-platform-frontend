import { DashboardShell } from "@/app/dashboard/provider/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function MessagesPage() {
    // Dados de exemplo para mensagens
    const messages = [
        {
            id: 1,
            sender: "João Eletricista",
            avatar: "J",
            content: "Olá! Estou confirmando o serviço de manutenção elétrica para amanhã às 14h. Está tudo certo para você?",
            time: "Há 2 horas",
            unread: true,
        },
        {
            id: 2,
            sender: "Limpeza Express",
            avatar: "L",
            content: "Bom dia! Gostaria de confirmar o endereço para o serviço de limpeza agendado para quinta-feira.",
            time: "Ontem",
            unread: true,
        },
        {
            id: 3,
            sender: "Refrigeração Total",
            avatar: "R",
            content: "Obrigado por escolher nossos serviços! Como foi a experiência com a instalação do ar condicionado?",
            time: "Há 3 dias",
            unread: false,
        },
        {
            id: 4,
            sender: "Encanadores Rápidos",
            avatar: "E",
            content: "Lamentamos o cancelamento do serviço. Esperamos poder atendê-lo em uma próxima oportunidade.",
            time: "Há 1 semana",
            unread: false,
        },
    ]

    return (
        <DashboardShell>
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Mensagens</h1>
                    <p className="text-muted-foreground">Gerencie suas conversas com prestadores de serviço</p>
                </div>

                <div className="flex w-full items-center space-x-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Buscar mensagens..." className="pl-8" />
                    </div>
                    <Button variant="outline">Filtrar</Button>
                </div>

                <div className="grid gap-4">
                    {messages.map((message) => (
                        <Card
                            key={message.id}
                            className={`cursor-pointer transition-colors hover:bg-accent/50 ${message.unread ? "border-l-4 border-l-blue-500" : ""}`}
                        >
                            <CardContent className="p-4">
                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500 font-semibold">
                                        {message.avatar}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className={`font-medium ${message.unread ? "font-semibold" : ""}`}>{message.sender}</h3>
                                            <span className="text-xs text-muted-foreground">{message.time}</span>
                                        </div>
                                        <p
                                            className={`text-sm ${message.unread ? "font-medium text-foreground" : "text-muted-foreground"}`}
                                        >
                                            {message.content}
                                        </p>
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
