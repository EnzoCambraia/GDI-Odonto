interface DashboardCardsProps {
  totalEmEstoque: number;
  equipamentosLivres: number;
  equipamentosEmprestados: number;
}

export function DashboardCards({
  totalEmEstoque,
  equipamentosLivres,
  equipamentosEmprestados,
}: DashboardCardsProps) {
  const cards = [
    {
      title: "Total em Estoque",
      value: totalEmEstoque,
      color: "bg-blue-100 text-blue-900",
    },
    {
      title: "Equipamentos Livres",
      value: equipamentosLivres,
      color: "bg-green-100 text-green-900",
    },
    {
      title: "Emprestados",
      value: equipamentosEmprestados,
      color: "bg-red-100 text-red-900",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-2xl p-6 shadow-sm border transition duration-300 hover:shadow-md ${card.color}`}
        >
          <p className="text-sm text-muted-foreground">{card.title}</p>
          <p className="text-4xl font-semibold mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
