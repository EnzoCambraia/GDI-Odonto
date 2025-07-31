"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus, ArrowLeft } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface Equipamento {
  id: number;
  nome: string;
  descricao: string;
  quantidade: number;
}

export default function GerenciamentoEquipamentos() {
  const router = useRouter();
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([
    { id: 1, nome: "Autoclave", descricao: "Esterilização", quantidade: 2 },
    {
      id: 2,
      nome: "Cadeira Odontológica",
      descricao: "Atendimento",
      quantidade: 3,
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Equipamento | null>(null);
  const [form, setForm] = useState({ nome: "", descricao: "", quantidade: 1 });

  function abrirNovo() {
    setEditando(null);
    setForm({ nome: "", descricao: "", quantidade: 1 });
    setModalOpen(true);
  }

  function abrirEditar(equip: Equipamento) {
    setEditando(equip);
    setForm({
      nome: equip.nome,
      descricao: equip.descricao,
      quantidade: equip.quantidade,
    });
    setModalOpen(true);
  }

  function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome.trim()) return;
    if (editando) {
      setEquipamentos((prev) =>
        prev.map((eq) => (eq.id === editando.id ? { ...eq, ...form } : eq))
      );
    } else {
      setEquipamentos((prev) => [
        ...prev,
        { id: prev.length ? prev[prev.length - 1].id + 1 : 1, ...form },
      ]);
    }
    setModalOpen(false);
  }

  function handleExcluir(id: number) {
    if (window.confirm("Tem certeza que deseja excluir este equipamento?")) {
      setEquipamentos((prev) => prev.filter((eq) => eq.id !== id));
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-8">
      <div className="w-full max-w-2xl flex items-center gap-2 mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-card border shadow hover:bg-muted transition"
          type="button"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
      </div>
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">
            Equipamentos Cadastrados
          </CardTitle>
          <Button onClick={abrirNovo} className="gap-2">
            <Plus className="w-4 h-4" /> Novo Equipamento
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipamentos.map((eq) => (
                <TableRow key={eq.id}>
                  <TableCell>{eq.nome}</TableCell>
                  <TableCell>{eq.descricao}</TableCell>
                  <TableCell>{eq.quantidade}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => abrirEditar(eq)}
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleExcluir(eq.id)}
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {equipamentos.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-6 text-muted-foreground"
                  >
                    Nenhum equipamento cadastrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg focus:outline-none flex flex-col gap-4">
            <Dialog.Title className="text-lg font-bold mb-2">
              {editando ? "Editar Equipamento" : "Novo Equipamento"}
            </Dialog.Title>
            <form onSubmit={handleSalvar} className="flex flex-col gap-4">
              <Input
                placeholder="Nome do equipamento"
                value={form.nome}
                onChange={(e) =>
                  setForm((f) => ({ ...f, nome: e.target.value }))
                }
                required
              />
              <Textarea
                placeholder="Descrição"
                value={form.descricao}
                onChange={(e) =>
                  setForm((f) => ({ ...f, descricao: e.target.value }))
                }
                className="min-h-24"
              />
              <Input
                placeholder="Quantidade"
                type="number"
                min={1}
                value={form.quantidade}
                onChange={(e) =>
                  setForm((f) => ({ ...f, quantidade: Number(e.target.value) }))
                }
                required
              />
              <div className="flex justify-end gap-2 mt-2">
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
