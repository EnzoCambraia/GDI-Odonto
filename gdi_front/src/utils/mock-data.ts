export const equipment = [
  {
    id: 1,
    name: "Estetoscópio",
    category: "Odontologia",
    qty_total: 3,
    qty_available: 3,
  },
  {
    id: 2,
    name: "Esfigmomanômetro",
    category: "Odontologia",
    qty_total: 1,
    qty_available: 1,
  },
  {
    id: 3,
    name: "Alicate 121",
    category: "Odontologia",
    qty_total: 2,
    qty_available: 2,
  },
  {
    id: 4,
    name: "Babador descartável pacote com 100 unidades",
    category: "Odontologia",
    qty_total: 1,
    qty_available: 1,
  },
  {
    id: 5,
    name: "Micromotor kavo",
    category: "Odontologia",
    qty_total: 1,
    qty_available: 1,
  },
  {
    id: 6,
    name: "Baixa rotação Kavo",
    category: "Odontologia",
    qty_total: 1,
    qty_available: 1,
  },
  {
    id: 7,
    name: "Alta rotação",
    category: "Odontologia",
    qty_total: 2,
    qty_available: 2,
  },
  {
    id: 8,
    name: "Jacaré",
    category: "Odontologia",
    qty_total: 1,
    qty_available: 1,
  },
  {
    id: 9,
    name: "Pote Dappen",
    category: "Odontologia",
    qty_total: 17,
    qty_available: 17,
  },
  {
    id: 10,
    name: "Espelho de mão",
    category: "Odontologia",
    qty_total: 2,
    qty_available: 2,
  },
  {
    id: 11,
    name: "Kit Cera para escultura",
    category: "Odontologia",
    qty_total: 2,
    qty_available: 2,
  },
  {
    id: 12,
    name: "Espelho sem cabo",
    category: "Odontologia",
    qty_total: 3,
    qty_available: 3,
  },
  {
    id: 13,
    name: "Sonda exploradora nº 5",
    category: "Odontologia",
    qty_total: 45,
    qty_available: 45,
  },
  {
    id: 14,
    name: "Óculos de proteção",
    category: "Odontologia",
    qty_total: 4,
    qty_available: 4,
  },
  {
    id: 15,
    name: "Peça reta Kavo",
    category: "Odontologia",
    qty_total: 1,
    qty_available: 1,
  },
  {
    id: 16,
    name: "Sonda OMS",
    category: "Odontologia",
    qty_total: 5,
    qty_available: 5,
  },
  {
    id: 17,
    name: "Sonda Glickman",
    category: "Odontologia",
    qty_total: 15,
    qty_available: 15,
  },
  {
    id: 18,
    name: "Espelho com Cabo",
    category: "Odontologia",
    qty_total: 33,
    qty_available: 33,
  },
  {
    id: 19,
    name: "Pinça clínica",
    category: "Odontologia",
    qty_total: 39,
    qty_available: 39,
  },
  {
    id: 20,
    name: "Kit Moldeiras Parciais",
    category: "Odontologia",
    qty_total: 1,
    qty_available: 1,
  },
] as const;

export const loans = [
  {
    id: 101,
    user_id: "7e7f5096-b2ac-4b3a-9950-8db2e92fdd11", // Supabase Auth UUID
    borrower_name: "Ana Souza", // ⇢ resolvido no front
    opened_at: "2025-07-11T10:15:00-03:00",
    due_at: "2025-07-14T10:15:00-03:00",
    closed_at: null, // ⇒ empréstimo em aberto
    items: [
      { equipment_id: 1, name: "Câmera DSLR Canon T7i", qty: 2 },
      { equipment_id: 3, name: "Notebook Dell i7 16 GB", qty: 1 },
    ],
  },
  {
    id: 102,
    user_id: "1cb1748f-e760-4980-9b06-3a1048bfcb77",
    borrower_name: "Carlos Lima",
    opened_at: "2025-07-10T15:40:00-03:00",
    due_at: "2025-07-13T15:40:00-03:00",
    closed_at: null, // em aberto (e atrasado!)
    items: [{ equipment_id: 1, name: "Câmera DSLR Canon T7i", qty: 1 }],
  },
  {
    id: 103,
    user_id: "56871e25-0c8f-4204-8c61-1914904cd94b",
    borrower_name: "Prof. Marina Alves",
    opened_at: "2025-07-07T09:00:00-03:00",
    due_at: "2025-07-10T09:00:00-03:00",
    closed_at: "2025-07-10T08:45:00-03:00", // já devolvido
    items: [{ equipment_id: 4, name: "Projetor Epson X41", qty: 1 }],
  },
] as const;

export const summary = {
  equipment_types: equipment.length, // 5
  total_units: equipment.reduce((t, e) => t + e.qty_total, 0), // 30
  units_available: equipment.reduce((t, e) => t + e.qty_available, 0), // 24
  units_in_use: equipment.reduce(
    (t, e) => t + (e.qty_total - e.qty_available),
    0
  ),
  open_loans: loans.filter((l) => !l.closed_at).length, // 2
  overdue_loans: loans.filter(
    (l) => !l.closed_at && new Date(l.due_at) < new Date()
  ).length, // 1
} as const;

export const equipmentInUse = loans
  .filter((l) => !l.closed_at)
  .flatMap((l) =>
    l.items.map((it) => ({
      loan_id: l.id,
      borrower_name: l.borrower_name,
      equipment_id: it.equipment_id,
      name: it.name,
      qty: it.qty,
      due_at: l.due_at,
      is_overdue: new Date(l.due_at) < new Date(),
    }))
  ) as const;

export const inventoryTable = equipment.map((e) => ({
  id: e.id,
  name: e.name,
  category: e.category,
  total: e.qty_total,
  available: e.qty_available,
  in_use: e.qty_total - e.qty_available,
  status:
    e.qty_available === 0
      ? "Indisponível"
      : e.qty_available < e.qty_total
      ? "Parcial"
      : "Livre",
})) as const;
