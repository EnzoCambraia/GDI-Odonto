import { useMemo, useEffect, useState } from "react";
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
import { StatusBadge } from "./statusBadge";
import { equipamentService } from "@/services/equipmentService";

interface Equipment {
  id: string;
  name: string;
  category: string;
  status: string;
  qty_total: number;
  qty_available: number;
}

interface EquipmentTableProps {
  search: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onEquipamentosChange?: (equipamentos: Equipment[]) => void;
}

export function EquipmentTable({
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onEquipamentosChange,
}: EquipmentTableProps) {
  const [equipamentos, setEquipamentos] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEquipamentos = async () => {
    try {
      setLoading(true);
      const data = await equipamentService.listarTodos();
      setEquipamentos(data);
      onEquipamentosChange?.(data);
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipamentos();
  }, []); 

  const filteredEquipamentos = useMemo(() => {
    return equipamentos.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        !statusFilter || statusFilter === "all"
          ? true
          : item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [equipamentos, search, statusFilter]);

  return (
    <div className="flex flex-col flex-1 rounded-xl overflow-hidden border bg-card shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Inventário de Equipamentos</h2>
        <p className="text-sm text-muted-foreground">
          Equipamentos disponíveis e emprestados
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 p-4 border-b">
        <Input
          placeholder="Buscar por nome ou categoria..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="md:w-1/3"
        />

        <Select onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="DISPONIVEL">Disponível</SelectItem>
            <SelectItem value="EMPRESTADO">Emprestado</SelectItem>
            <SelectItem value="INDISPONIVEL">Indisponível</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-auto h-full">
        <Table className="min-w-full text-sm">
          <TableHeader className="sticky top-0 bg-background z-10 border-b">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Disponível</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-muted-foreground"
                >
                  Carregando equipamentos...
                </TableCell>
              </TableRow>
            ) : (
              <>
                {filteredEquipamentos.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.qty_total}</TableCell>
                    <TableCell>{item.qty_available}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                  </TableRow>
                ))}
                {filteredEquipamentos.length === 0 && !loading && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-6 text-muted-foreground"
                    >
                      Nenhum equipamento encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
