"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Trash2,
  Plus,
  ArrowLeft,
  Search,
  Package,
  Loader2,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { equipamentService } from "@/services/equipmentService";

interface Equipment {
  id: string;
  name: string;
  category: string;
  qty_total: number;
  qty_available: number;
  status: string;
  description?: string;
}

export default function GerenciamentoEquipamentos() {
  const router = useRouter();
  const [equipamentos, setEquipamentos] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Equipment | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    qty_total: 1,
    qty_available: 1,
    status: "Disponível",
  });

  useEffect(() => {
    const fetchEquipamentos = async () => {
      try {
        setLoading(true);
        const data = await equipamentService.getAll();
        setEquipamentos(data);
      } catch (error) {
        console.error("Erro ao buscar equipamentos:", error);
      } finally {
        setLoading(false);
      }
    };

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

  function abrirNovo() {
    setEditando(null);
    setForm({
      name: "",
      category: "",
      description: "",
      qty_total: 1,
      qty_available: 1,
      status: "Disponível",
    });
    setModalOpen(true);
  }

  function abrirEditar(equip: Equipment) {
    setEditando(equip);
    setForm({
      name: equip.name,
      category: equip.category,
      description: equip.description || "",
      qty_total: equip.qty_total,
      qty_available: equip.qty_available,
      status: equip.status,
    });
    setModalOpen(true);
  }

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim()) return;

    try {
      if (editando) {
        const equipmentToUpdate = {
          id: editando.id,
          ...form,
        };
        const updatedEquipment = await equipamentService.updateEquipament(
          equipmentToUpdate
        );
        setEquipamentos((prev) =>
          prev.map((eq) => (eq.id === editando.id ? updatedEquipment : eq))
        );
      } else {
        const newEquipment = await equipamentService.createEquipment(form);
        setEquipamentos((prev) => [...prev, newEquipment]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar equipamento:", error);
    }
  }

  async function handleExcluir(id: string) {
    if (window.confirm("Tem certeza que deseja excluir este equipamento?")) {
      try {
        const equipmentToDelete = { id };
        await equipamentService.deleteEquipament(equipmentToDelete);
        setEquipamentos((prev) => prev.filter((eq) => eq.id !== id));
      } catch (error) {
        console.error("Erro ao excluir equipamento:", error);
      }
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "Disponível":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Disponível
          </Badge>
        );
      case "Indisponível":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Indisponível
          </Badge>
        );
      case "Emprestado":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Emprestado
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">
            Carregando equipamentos...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Gerenciamento de Equipamentos
              </h1>
              <p className="text-muted-foreground">
                {equipamentos.length} equipamento(s) cadastrado(s)
              </p>
            </div>
          </div>
        </div>
        <Button onClick={abrirNovo} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Equipamento
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome ou categoria..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="DISPONIVEL">Disponível</SelectItem>
                <SelectItem value="INDISPONIVEL">Indisponível</SelectItem>
                <SelectItem value="EMPRESTADO">Emprestado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Equipamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Quantidade Total</TableHead>
                <TableHead>Disponível</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipamentos.map((eq) => (
                <TableRow key={eq.id}>
                  <TableCell className="font-medium">{eq.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {eq.category}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{eq.qty_total}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{eq.qty_available}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(eq.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => abrirEditar(eq)}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleExcluir(eq.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEquipamentos.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-muted-foreground"
                  >
                    {search || statusFilter
                      ? "Nenhum equipamento encontrado com os filtros aplicados."
                      : "Nenhum equipamento cadastrado. Clique em 'Novo Equipamento' para começar."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg duration-200">
            <Dialog.Title className="text-lg font-semibold mb-4">
              {editando ? "Editar Equipamento" : "Novo Equipamento"}
            </Dialog.Title>

            <form onSubmit={handleSalvar} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nome</label>
                <Input
                  placeholder="Nome do equipamento"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Categoria</label>
                <Input
                  placeholder="Categoria do equipamento"
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Descrição</label>
                <Textarea
                  placeholder="Descrição (opcional)"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="mt-1 resize-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    Quantidade Total
                  </label>
                  <Input
                    type="number"
                    min={1}
                    value={form.qty_total}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        qty_total: Number(e.target.value),
                      }))
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Quantidade Disponível
                  </label>
                  <Input
                    type="number"
                    min={0}
                    max={form.qty_total}
                    value={form.qty_available}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        qty_available: Number(e.target.value),
                      }))
                    }
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm((f) => ({ ...f, status: value }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DISPONIVEL">Disponível</SelectItem>
                    <SelectItem value="INDISPONIVEL">Indisponível</SelectItem>
                    <SelectItem value="EMPRESTADO">Emprestado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editando ? "Salvar" : "Adicionar"}
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
