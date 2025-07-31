import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface EquipamentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (equipamento: { nome: string; descricao: string; quantidade: number }) => void;
}

export function EquipamentoModal({ open, onOpenChange, onAdd }: EquipamentoModalProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return;
    onAdd({ nome, descricao, quantidade });
    setNome("");
    setDescricao("");
    setQuantidade(1);
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg focus:outline-none flex flex-col gap-4">
          <Dialog.Title className="text-lg font-bold mb-2">Novo Equipamento</Dialog.Title>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              placeholder="Nome do equipamento"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
            <Textarea
              placeholder="Descrição"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              className="min-h-24"
            />
            <Input
              placeholder="Quantidade"
              type="number"
              min={1}
              value={quantidade}
              onChange={e => setQuantidade(Number(e.target.value))}
              required
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Adicionar</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 