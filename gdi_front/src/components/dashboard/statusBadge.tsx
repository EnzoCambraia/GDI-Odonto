interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "DISPONIVEL":
        return "bg-green-100 text-green-700";
      case "EMPRESTADO":
        return "bg-yellow-100 text-yellow-700";
      case "INDISPONIVEL":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}
    >
      {status}
    </span>
  );
}
