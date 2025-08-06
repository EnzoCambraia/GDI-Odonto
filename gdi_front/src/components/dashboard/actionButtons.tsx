import { Package, Plus } from "lucide-react";

interface ActionButtonsProps {
  onCadastrar: () => void;
  onGerenciar: () => void;
}

export function ActionButtons({
  onCadastrar,
  onGerenciar,
}: ActionButtonsProps) {
  const actionButtons = [
    {
      title: "Cadastrar Equipamento",
      description: "Adicionar novo equipamento ao inventário",
      icon: Plus,
      color: "bg-purple-100 text-purple-900 hover:bg-purple-200",
      onClick: onCadastrar,
      disabled: false,
    },
    {
      title: "Gerenciar Equipamentos",
      description: "Visualizar e editar equipamentos existentes",
      icon: Package,
      color: "bg-orange-100 text-orange-900 hover:bg-orange-200",
      onClick: onGerenciar,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {actionButtons.map((button, index) => (
        <button
          key={index}
          onClick={button.disabled ? undefined : button.onClick}
          disabled={button.disabled}
          className={`rounded-2xl p-4 shadow-sm border transition duration-300 ${
            button.disabled
              ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-500"
              : `hover:shadow-md cursor-pointer ${button.color}`
          }`}
        >
          <div className="flex items-center gap-2">
            <button.icon className="w-6 h-6" />
            <div className="text-left">
              <p className="text-base font-semibold">{button.title}</p>
              <p className="text-xs opacity-80">{button.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
