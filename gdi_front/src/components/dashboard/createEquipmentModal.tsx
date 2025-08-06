import { useState, useCallback, useMemo, memo } from "react";
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
  }) => Promise<void>;
}

export const CreateEquipmentModal = memo(function CreateEquipmentModal({
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

  const handleInputChange = useCallback(
    (field: keyof typeof formData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, [field]: value }));
      },
    []
  );

  const maxAvailable = useMemo(() => {
    const total = parseInt(formData.qty_total);
    return isNaN(total) ? undefined : total;
  }, [formData.qty_total]);

  const isFormValid = useMemo(() => {
    const { name, category, qty_total, qty_available } = formData;
    const totalNum = parseInt(qty_total);
    const availableNum = parseInt(qty_available);

    return (
      name.trim() !== "" &&
      category.trim() !== "" &&
      !isNaN(totalNum) &&
      totalNum > 0 &&
      !isNaN(availableNum) &&
      availableNum >= 0 &&
      availableNum <= totalNum
    );
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isFormValid || isSubmitting) return;

      setIsSubmitting(true);

      try {
        await onSubmit(formData);
        setFormData({
          name: "",
          category: "",
          qty_total: "",
          qty_available: "",
        });
      } catch (error) {
        console.error("Erro ao criar equipamento:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, onSubmit, isFormValid, isSubmitting]
  );

  const handleClose = useCallback(() => {
    if (isSubmitting) return;

    onClose();

    setTimeout(() => {
      setFormData({ name: "", category: "", qty_total: "", qty_available: "" });
    }, 150);
  }, [onClose, isSubmitting]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        <div className="bg-background p-6 border-b">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 border">
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

        <div className="p-6 space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Package className="h-4 w-4 text-primary" />
              Nome do Equipamento
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange("name")}
              placeholder="Ex: Espelho de mão"
              required
              disabled={isSubmitting}
              className="h-11"
              autoComplete="off"
            />
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Tag className="h-4 w-4 text-primary" />
              Categoria
            </Label>
            <Input
              id="category"
              value={formData.category}
              onChange={handleInputChange("category")}
              placeholder="Ex: Beleza"
              required
              disabled={isSubmitting}
              className="h-11"
              autoComplete="off"
            />
          </div>

          {/* Quantidades */}
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
                  onChange={handleInputChange("qty_total")}
                  placeholder="0"
                  required
                  disabled={isSubmitting}
                  className="pr-12 h-11"
                  autoComplete="off"
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
                  max={maxAvailable}
                  value={formData.qty_available}
                  onChange={handleInputChange("qty_available")}
                  placeholder="0"
                  required
                  disabled={isSubmitting}
                  className="pr-12 h-11"
                  autoComplete="off"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                  un.
                </div>
              </div>
            </div>
          </div>

          {/* Info Helper */}
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
              A quantidade disponível não pode ser maior que a quantidade total
            </div>
          </div>

          {/* Buttons */}
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
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="px-6 bg-primary hover:bg-primary/90 disabled:opacity-50"
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
        </div>
      </DialogContent>
    </Dialog>
  );
});

CreateEquipmentModal.displayName = "CreateEquipmentModal";
