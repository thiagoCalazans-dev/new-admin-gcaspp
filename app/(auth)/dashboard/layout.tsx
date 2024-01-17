export default function DashboardLayout({
  children,
  contracts,
  invoices,
}: {
  children: React.ReactNode;
  contracts: React.ReactNode;
  invoices: React.ReactNode;
}) {
  return (
    <div className="flex-1 space-y-4 pt-6 container">
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">
            Contratos a vencer
          </h2>
          {contracts}
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">
            Dia do Faturamento
          </h2>
          <div>{invoices}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
