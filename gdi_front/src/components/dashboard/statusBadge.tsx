interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "DISPONIVEL":
        return {
          style:
            "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
          text: "Disponível",
          dot: "bg-green-500",
        };
      case "EMPRESTADO":
        return {
          style:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
          text: "Emprestado",
          dot: "bg-yellow-500",
        };
      case "INDISPONIVEL":
        return {
          style: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
          text: "Indisponível",
          dot: "bg-red-500",
        };
      default:
        return {
          style:
            "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-dashed border",
          text: "Sem status",
          dot: "bg-gray-400",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`px-2 py-1 rounded-full font-medium inline-flex items-center gap-1.5 text-xs transition-colors duration-200 ${config.style}`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.text}
    </span>
  );
}
