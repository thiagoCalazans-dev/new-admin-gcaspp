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
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="w-full grid grid-cols-2 gap-4">
        <div>{contracts}</div>
        <div>{invoices}</div>
      </div>
      {children}
    </div>
  );
}
