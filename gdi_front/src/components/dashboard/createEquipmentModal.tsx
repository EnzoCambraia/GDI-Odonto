import { useState } from "react";
import { DialogTitle, DialogContent, Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Package, Tag, Hash, CheckCircle2 } from "lucide-react";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setFormData({ name: "", category: "", qty_total: "", qty_available: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setTimeout(() => {
        setFormData({
          name: "",
          category: "",
          qty_total: "",
          qty_available: "",
        });
      }, 200);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 border-b">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/20 border">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Novo Equipamento
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Adicione um novo equipamento ao inventário
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Package className="h-4 w-4 text-primary" />
              Nome do Equipamento
            </Label>
            <div className="relative">
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ex: Espelho de mão"
                required
                disabled={isSubmitting}
                className="pl-4 h-11 transition-all focus:ring-2 focus:ring-primary/20 border-muted-foreground/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Tag className="h-4 w-4 text-primary" />
              Categoria
            </Label>
            <div className="relative">
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="Ex: "
                required
                disabled={isSubmitting}
                className="pl-4 h-11 transition-all focus:ring-2 focus:ring-primary/20 border-muted-foreground/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="qty_total"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Hash className="h-4 w-4 text-primary" />
                Qtd. Total
              </Label>
              <div className="relative">
                <Input
                  id="qty_total"
                  type="number"
                  min="1"
                  value={formData.qty_total}
                  onChange={(e) =>
                    setFormData({ ...formData, qty_total: e.target.value })
                  }
                  placeholder="0"
                  required
                  disabled={isSubmitting}
                  className="pl-4 pr-12 h-11 transition-all focus:ring-2 focus:ring-primary/20 border-muted-foreground/20"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                  un.
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="qty_available"
                className="text-sm font-medium flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Qtd. Disponível
              </Label>
              <div className="relative">
                <Input
                  id="qty_available"
                  type="number"
                  min="0"
                  max={formData.qty_total || undefined}
                  value={formData.qty_available}
                  onChange={(e) =>
                    setFormData({ ...formData, qty_available: e.target.value })
                  }
                  placeholder="0"
                  required
                  disabled={isSubmitting}
                  className="pl-4 pr-12 h-11 transition-all focus:ring-2 focus:ring-primary/20 border-muted-foreground/20"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                  un.
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
              A quantidade disponível não pode ser maior que a quantidade total
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Cadastrando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Cadastrar
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
