"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const loadEquipamentos = async () => {
      try {
        const data = await equipamentService.listarTodos();
        setEquipamentos(data);
      } catch (error) {
        console.error("Erro ao carregar equipamentos:", error);
      }
    };
    loadEquipamentos();
  }, []);

  const totalEmEstoque = equipamentos.reduce(
    (total, item) => total + (item.qty_total || 0),
    0
  );
  const equipamentosLivres = equipamentos.reduce(
    (total, item) => total + (item.qty_available || 0),
    0
  );
  const equipamentosEmprestados = equipamentos.reduce((total, item) => {
    const emprestados = (item.qty_total || 0) - (item.qty_available || 0);
    return total + emprestados;
  }, 0);

  const handleCreateEquipment = async (data: {
    name: string;
    category: string;
    qty_total: string;
    qty_available: string;
  }) => {
    await equipamentService.criar(data);
    const updatedEquipamentos = await equipamentService.listarTodos();
    setEquipamentos(updatedEquipamentos);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <DashboardCards
        totalEmEstoque={totalEmEstoque}
        equipamentosLivres={equipamentosLivres}
        equipamentosEmprestados={equipamentosEmprestados}
      />

      <ActionButtons
        onCadastrar={() => setIsModalOpen(true)}
        onGerenciar={() => router.push("/equipamentos")}
      />

      <EquipmentTable
        search={search}
        statusFilter={statusFilter}
        onSearchChange={setSearch}
        onStatusFilterChange={setStatusFilter}
        onEquipamentosChange={(equipamentos) => setEquipamentos(equipamentos)}
      />

      <CreateEquipmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateEquipment}
      />
    </div>
  );
}
