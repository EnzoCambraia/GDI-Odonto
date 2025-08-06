"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { equipamentService } from "@/services/equipmentService";
import { DashboardCards } from "@/components/dashboard/dashboardCards";
import { ActionButtons } from "@/components/dashboard/actionButtons";
import { EquipmentTable } from "@/components/dashboard/equipmentTable";
import { CreateEquipmentModal } from "@/components/dashboard/createEquipmentModal";
import { useRouter } from "next/navigation";

interface Equipment {
  id: string;
  name: string;
  category: string;
  qty_total: number;
  qty_available: number;
  status: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [equipamentos, setEquipamentos] = useState<Equipment[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEquipamentos = async () => {
      try {
        setIsLoading(true);
        const data = await equipamentService.getAll();
        setEquipamentos(data);
      } catch (error) {
        console.error("Erro ao carregar equipamentos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEquipamentos();
  }, []);

  const statistics = useMemo(() => {
    return equipamentos.reduce(
      (acc, item) => {
        const total = item.qty_total || 0;
        const available = item.qty_available || 0;
        const emprestados = total - available;

        return {
          totalEmEstoque: acc.totalEmEstoque + total,
          equipamentosLivres: acc.equipamentosLivres + available,
          equipamentosEmprestados: acc.equipamentosEmprestados + emprestados,
        };
      },
      {
        totalEmEstoque: 0,
        equipamentosLivres: 0,
        equipamentosEmprestados: 0,
      }
    );
  }, [equipamentos]);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleNavigateToEquipments = useCallback(() => {
    router.push("/equipamentos/gerenciamento");
  }, [router]);

  const handleCreateEquipment = useCallback(
    async (data: {
      name: string;
      category: string;
      qty_total: string;
      qty_available: string;
    }) => {
      try {
        const equipmentData = {
          name: data.name,
          category: data.category,
          qty_total: parseInt(data.qty_total),
          qty_available: parseInt(data.qty_available),
          status: "AVAILABLE",
        };

        const newEquipment = await equipamentService.createEquipment(data);

        setEquipamentos((prev) => [...prev, newEquipment]);

        setIsModalOpen(false);
      } catch (error) {
        console.error("Erro ao criar equipamento:", error);

        try {
          const updatedEquipamentos = await equipamentService.getAll();
          setEquipamentos(updatedEquipamentos);
        } catch (reloadError) {
          console.error("Erro ao recarregar equipamentos:", reloadError);
        }

        throw error;
      }
    },
    []
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          <span className="ml-3 text-muted-foreground">
            Carregando equipamentos...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <DashboardCards
        totalEmEstoque={statistics.totalEmEstoque}
        equipamentosLivres={statistics.equipamentosLivres}
        equipamentosEmprestados={statistics.equipamentosEmprestados}
      />

      <ActionButtons
        onCadastrar={handleOpenModal}
        onGerenciar={handleNavigateToEquipments}
      />

      <EquipmentTable
        search={search}
        statusFilter={statusFilter}
        onSearchChange={setSearch}
        onStatusFilterChange={setStatusFilter}
        onEquipamentosChange={setEquipamentos}
      />

      {isModalOpen && (
        <CreateEquipmentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleCreateEquipment}
        />
      )}
    </div>
  );
}
