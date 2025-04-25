import { DashboardShell } from "@/app/dashboard/provider/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
          <p className="text-muted-foreground">Gerencie suas informações pessoais e configurações de conta</p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="personal">Pessoal</TabsTrigger>
            <TabsTrigger value="account">Conta</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais aqui. Estas informações serão exibidas publicamente.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row md:gap-4">
                  <div className="mb-4 md:mb-0 md:w-1/3">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-500 text-2xl font-bold">
                      U
                    </div>
                  </div>
                  <div className="space-y-4 md:w-2/3">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" defaultValue="Usuário Exemplo" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" defaultValue="+5511999999999" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input id="address" defaultValue="Rua Exemplo, 123 - São Paulo, SP" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-blue-500 hover:bg-blue-600">Salvar Alterações</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Conta</CardTitle>
                <CardDescription>Gerencie as configurações da sua conta e altere sua senha</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4 text-lg font-medium">Tipo de Conta</h3>
                  <div className="rounded-md border p-4">
                    <div className="font-medium">Solicitante</div>
                    <p className="text-sm text-muted-foreground">
                      Sua conta está configurada como solicitante de serviços
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  Excluir Conta
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600">Salvar Alterações</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>Configure como e quando deseja receber notificações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Aqui você pode adicionar checkboxes ou toggles para preferências de notificação */}
                  <p className="text-muted-foreground">Configurações de notificação em desenvolvimento...</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-blue-500 hover:bg-blue-600">Salvar Preferências</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
