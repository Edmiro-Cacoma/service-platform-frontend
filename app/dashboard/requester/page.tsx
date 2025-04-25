import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/app/dashboard/provider/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, MessageSquare, Star, PlusCircle } from "lucide-react"
import Link from "next/link"

export default function RequesterDashboardPage() {
  return (
    <DashboardShell >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Olá, Cliente</h1>
            <p className="text-muted-foreground">Bem-vindo ao seu painel de solicitante de serviços</p>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600" size="lg" asChild>
            <Link href="/dashboard/requester/request-service">
              <PlusCircle className="mr-2 h-4 w-4" />
              Solicitar Novo Serviço
            </Link>
          </Button>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Serviços Ativos</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Serviços em andamento ou agendados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Serviços Concluídos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 no último mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
              <MessageSquare className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">3 novas mensagens não lidas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avaliações Enviadas</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Média de 4.7 estrelas</p>
            </CardContent>
          </Card>
        </div>

        {/* Serviços em andamento */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Serviços em Andamento</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/requester/services">Ver todos</Link>
            </Button>
          </div>
          <div className="grid gap-4">
            {[
              {
                id: 1,
                title: "Manutenção Elétrica",
                provider: "João Eletricista",
                status: "scheduled",
                date: "Amanhã, 14:00",
                address: "Rua Exemplo, 123 - São Paulo, SP",
              },
              {
                id: 2,
                title: "Limpeza Geral",
                provider: "Limpeza Express",
                status: "in_progress",
                date: "Em andamento",
                address: "Av. Principal, 456 - São Paulo, SP",
              },
              {
                id: 3,
                title: "Instalação de Ar Condicionado",
                provider: "Refrigeração Total",
                status: "pending",
                date: "Aguardando confirmação",
                address: "Rua Secundária, 789 - São Paulo, SP",
              },
            ].map((service) => (
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
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-semibold">{service.title}</h3>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            service.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : service.status === "in_progress"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {service.status === "scheduled"
                            ? "Agendado"
                            : service.status === "in_progress"
                              ? "Em andamento"
                              : "Pendente"}
                        </span>
                      </div>
                      <div className="mb-4 text-sm text-muted-foreground">
                        <div>Prestador: {service.provider}</div>
                        <div>Data: {service.date}</div>
                        <div>Local: {service.address}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                        <Button variant="outline" size="sm">
                          Mensagem
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Seção de categorias populares e prestadores recomendados */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Categorias Populares</CardTitle>
              <CardDescription>Encontre prestadores por categoria de serviço</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Eletricista", icon: "⚡" },
                  { name: "Encanador", icon: "🔧" },
                  { name: "Limpeza", icon: "🧹" },
                  { name: "Ar Condicionado", icon: "❄️" },
                  { name: "Pintura", icon: "🎨" },
                  { name: "Jardinagem", icon: "🌱" },
                ].map((category) => (
                  <Button key={category.name} variant="outline" className="justify-start h-auto py-3">
                    <span className="mr-2 text-lg">{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prestadores Recomendados</CardTitle>
              <CardDescription>Baseado nos seus serviços anteriores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "João Eletricista",
                    category: "Eletricista",
                    rating: 4.9,
                    services: 120,
                  },
                  {
                    name: "Limpeza Express",
                    category: "Limpeza",
                    rating: 4.7,
                    services: 85,
                  },
                  {
                    name: "Refrigeração Total",
                    category: "Ar Condicionado",
                    rating: 4.8,
                    services: 64,
                  },
                ].map((provider) => (
                  <div key={provider.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-500 font-semibold">
                        {provider.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{provider.name}</div>
                        <div className="text-sm text-muted-foreground">{provider.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{provider.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{provider.services} serviços</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
