import { useState } from "react";
import { DialogHeader, DialogTitle, DialogContent, Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface CreateEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    category: string;
    qty_total: string;
    qty_available: string;
  }) => void;
}

export function CreateEquipmentModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateEquipmentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    qty_total: "",
    qty_available: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", category: "", qty_total: "", qty_available: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Equipamento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Equipamento</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Digite o nome do equipamento"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="Digite a categoria"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qty_total">Quantidade Total</Label>
            <Input
              id="qty_total"
              type="number"
              value={formData.qty_total}
              onChange={(e) =>
                setFormData({ ...formData, qty_total: e.target.value })
              }
              placeholder="Digite a quantidade total"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qty_available">Quantidade Disponível</Label>
            <Input
              id="qty_available"
              type="number"
              value={formData.qty_available}
              onChange={(e) =>
                setFormData({ ...formData, qty_available: e.target.value })
              }
              placeholder="Digite a quantidade disponível"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
