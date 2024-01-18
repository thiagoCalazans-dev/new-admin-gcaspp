import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { DashboardPage } from "../schema";

export default async function Invoices() {
  const dashboard = await fetch(`${process.env.BASE_URL_API}/dashboard`, {
    cache: "default",
    next: { revalidate: 43200, tags: ["dashboard"] }, // revalidate at most 12 hours
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data }: DashboardPage = await dashboard.json();

  const orderedDataByBillingDay = data.contracts.sort((a, b) => {
    return a.billingDay - b.billingDay;
  });

  function billingDayStatus(day: number): string {
    const currentDay = new Date().getDate();

    if (currentDay === day) return "DANGER";
    if (currentDay < day) return "ALERT";
    return "SAFE";
  }

  return (
    <Card className="p-0 w-full aspect-square overflow-y-auto">
      {orderedDataByBillingDay.map((contract) => {
        return (
          <div key={contract.id} className="px-4">
            <div className="flex items-center justify-between pt-4 pb-1">
              <CardHeader className="flex p-0">
                <span>
                  <strong className="font-semibold uppercase">
                    {contract.supplier.name}
                  </strong>
                  : {contract.number}
                </span>
              </CardHeader>
              <CardContent
                data-status={billingDayStatus(contract.billingDay)}
                className="flex p-0  items-center text-primary data-[status=DANGER]:text-red-500 data-[status=ALERT]:text-orange-500"
              >
                <strong className="font-semibold uppercase">
                  {contract.billingDay}
                </strong>
              </CardContent>
            </div>
            <Separator className="px-4" />
          </div>
        );
      })}
    </Card>
  );
}
