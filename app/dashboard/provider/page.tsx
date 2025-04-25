import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/app/dashboard/provider/dashboard-shell"
import { Clock, CheckCircle, MessageSquare } from "lucide-react"

export default function DashboardPage() {
    return (
        <DashboardShell>
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao seu Dashboard</h1>
                    <p className="text-muted-foreground">Aqui você pode gerenciar seus serviços, mensagens e perfil.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Serviços Pendentes</CardTitle>
                            <Clock className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">+2 desde a última semana</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Serviços Concluídos</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-muted-foreground">+5 desde o último mês</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
                            <MessageSquare className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">3 novas mensagens não lidas</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Atividade Recente</CardTitle>
                            <CardDescription>Suas últimas atividades na plataforma</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-blue-100 p-2">
                                        <Clock className="h-4 w-4 text-blue-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Novo serviço solicitado</p>
                                        <p className="text-xs text-muted-foreground">Há 2 horas</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-green-100 p-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Serviço concluído</p>
                                        <p className="text-xs text-muted-foreground">Ontem</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-orange-100 p-2">
                                        <MessageSquare className="h-4 w-4 text-orange-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Nova mensagem recebida</p>
                                        <p className="text-xs text-muted-foreground">Há 3 dias</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Próximos Serviços</CardTitle>
                            <CardDescription>Serviços agendados para os próximos dias</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">Manutenção Elétrica</p>
                                        <p className="text-sm text-muted-foreground">Residencial</p>
                                    </div>
                                    <div className="text-sm text-right">
                                        <p className="font-medium">Amanhã</p>
                                        <p className="text-muted-foreground">14:00</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">Limpeza Geral</p>
                                        <p className="text-sm text-muted-foreground">Comercial</p>
                                    </div>
                                    <div className="text-sm text-right">
                                        <p className="font-medium">Quinta-feira</p>
                                        <p className="text-muted-foreground">09:30</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">Instalação de Ar Condicionado</p>
                                        <p className="text-sm text-muted-foreground">Residencial</p>
                                    </div>
                                    <div className="text-sm text-right">
                                        <p className="font-medium">Sexta-feira</p>
                                        <p className="text-muted-foreground">11:00</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardShell>
    )
}
