import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mockUser = {
      email: "admin@gdi.com",
      password: "123",
    };

    if (email === mockUser.email && password === mockUser.password) {
      toast.success("Login realizado com sucesso!");
      setError("");
      router.push("/dashboard/tabelas");
    } else {
      console.log("Login failed");
      toast.error("Email ou senha inválidos");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow-2xl border-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="flex flex-col gap-8 justify-center p-8"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center text-center gap-2 mb-2">
              <h1 className="text-3xl font-extrabold tracking-tight">
                Bem-Vindo
              </h1>
              <p className="text-muted-foreground text-balance text-base">
                Utilize suas credenciais para acessar
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center font-medium">
                {error}
              </p>
            )}

            <div className="grid gap-3">
              <Label htmlFor="email" className="font-bold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password" className="font-bold">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-800 hover:bg-red-900 text-white font-semibold rounded-md shadow-md transition h-11 text-base"
            >
              Login
            </Button>
          </form>
          <div className="hidden md:flex flex-col items-center justify-center h-full border-l">
            <Image
              src="/logo.png"
              alt="Imagem"
              width={240}
              height={160}
              className="object-contain drop-shadow-lg dark:brightness-[0.7] dark:grayscale"
              priority
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
