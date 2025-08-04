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
import { Search, Filter, Package } from "lucide-react";

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

  const LoadingRows = () => (
    <>
      {[...Array(5)].map((_, i) => (
        <TableRow key={i} className="animate-pulse">
          <TableCell>
            <div className="h-4 bg-muted rounded w-32"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-muted rounded w-24"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-muted rounded w-8"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-muted rounded w-8"></div>
          </TableCell>
          <TableCell>
            <div className="h-6 bg-muted rounded-full w-20"></div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <div className="flex flex-col flex-1 rounded-xl overflow-hidden border bg-card shadow-sm">
      <div className="p-6 border-b bg-gradient-to-r from-background to-muted/20">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Inventário de Equipamentos
          </h2>
          <p className="text-sm text-muted-foreground">
            Gerencie todos os equipamentos disponíveis e emprestados
          </p>
        </div>
      </div>

      <div className="p-4 border-b bg-muted/20">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou categoria..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background border-0 shadow-sm focus:shadow-md transition-shadow"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Select onValueChange={onStatusFilterChange} defaultValue="all">
              <SelectTrigger className="w-[200px] pl-10 bg-background border-0 shadow-sm focus:shadow-md transition-shadow">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="DISPONIVEL">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Disponível
                  </div>
                </SelectItem>
                <SelectItem value="EMPRESTADO">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    Emprestado
                  </div>
                </SelectItem>
                <SelectItem value="INDISPONIVEL">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    Indisponível
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-auto flex-1">
        <Table className="min-w-full">
          <TableHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 border-b">
            <TableRow>
              <TableHead className="font-semibold text-foreground">
                Nome do Equipamento
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Categoria
              </TableHead>
              <TableHead className="font-semibold text-foreground text-center">
                Total
              </TableHead>
              <TableHead className="font-semibold text-foreground text-center">
                Disponível
              </TableHead>
              <TableHead className="font-semibold text-foreground text-center">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <LoadingRows />
            ) : (
              <>
                {filteredEquipamentos.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-muted/50 transition-colors group"
                  >
                    <TableCell className="font-medium py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        {item.name}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="px-2 py-1 rounded-md bg-secondary/50 text-secondary-foreground text-xs font-medium">
                        {item.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-mono font-medium">
                          {item.qty_total}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          un.
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-mono font-medium text-green-600 dark:text-green-400">
                          {item.qty_available}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          un.
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <StatusBadge status={item.status} />
                    </TableCell>
                  </TableRow>
                ))}
                {filteredEquipamentos.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-3 rounded-full bg-muted">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">
                            Nenhum equipamento encontrado
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Tente ajustar os filtros de busca
                          </p>
                        </div>
                      </div>
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
