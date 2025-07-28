"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { summary, inventoryTable } from "@/utils/mock-data";
import { Plus, Package } from "lucide-react";

const statuses = ["Livre", "Parcial", "Indisponível"];

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  total: number;
  available: number;
  in_use: number;
  status: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const filteredData = useMemo(() => {
    return inventoryTable.filter((item: InventoryItem) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        !statusFilter || statusFilter === "all"
          ? true
          : item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const cards = [
    {
      title: "Total em Estoque",
      value: summary.total_units,
      color: "bg-blue-100 text-blue-900",
    },
    {
      title: "Equipamentos Livres",
      value: summary.units_available,
      color: "bg-green-100 text-green-900",
    },
    {
      title: "Emprestados",
      value: summary.units_in_use,
      color: "bg-red-100 text-red-900",
    },
  ];

  const actionButtons = [
    {
      title: "Cadastrar Equipamento",
      description: "Adicionar novo equipamento ao inventário",
      icon: Plus,
      color: "bg-purple-100 text-purple-900 hover:bg-purple-200",
      onClick: () => router.push("/equipamentos/cadastro"),
    },
    {
      title: "Gerenciar Equipamentos",
      description: "Visualizar e editar equipamentos existentes",
      icon: Package,
      color: "bg-orange-100 text-orange-900 hover:bg-orange-200",
      onClick: () => router.push("/equipamentos"),
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 shadow-sm border transition duration-300 hover:shadow-md ${card.color}`}
          >
            <p className="text-sm text-muted-foreground">{card.title}</p>
            <p className="text-4xl font-semibold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {actionButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className={`rounded-2xl p-6 shadow-sm border transition duration-300 hover:shadow-md cursor-pointer ${button.color}`}
          >
            <div className="flex items-center gap-3">
              <button.icon className="w-8 h-8" />
              <div className="text-left">
                <p className="text-lg font-semibold">{button.title}</p>
                <p className="text-sm opacity-80">{button.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col flex-1 rounded-xl overflow-hidden border bg-card shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Inventário de Equipamentos</h2>
          <p className="text-sm text-muted-foreground">
            Equipamentos disponíveis e emprestados
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 p-4 border-b">
          <Input
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-1/3"
          />

          <Select onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-auto h-full">
          <Table className="min-w-full text-sm">
            <TableHeader className="sticky top-0 bg-background z-10 border-b">
              <TableRow>
                <TableHead>Nome</TableHead>
                {/* <TableHead>Categoria</TableHead> */}
                <TableHead>Total</TableHead>
                <TableHead>Disponíveis</TableHead>
                <TableHead>Em uso</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: InventoryItem) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  {/* <TableCell>{item.category}</TableCell> */}
                  <TableCell>{item.total}</TableCell>
                  <TableCell>{item.available}</TableCell>
                  <TableCell>{item.in_use}</TableCell>
                  <TableCell>
                    <span
                      className={`
                        px-2 py-1 rounded-full font-medium
                        ${
                          item.status === "Livre"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Parcial"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-muted-foreground"
                  >
                    Nenhum equipamento encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
