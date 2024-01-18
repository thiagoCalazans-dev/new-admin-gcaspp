import { getExpiringContractsAction } from "@/src/actions/get-expiring-contracts";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { differenceInCalendarDays } from "date-fns";
import { DashboardPage } from "../schema";

export default async function Contracts() {
  const dashboard = await fetch("http://localhost:3000/api/dashboard", {
    cache: "default",
    next: { revalidate: 43200, tags: ["dashboard"] }, // revalidate at most 12 hours
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data }: DashboardPage = await dashboard.json();

  function StatusToDueDate(data: Date): "SAFE" | "ALERT" | "DANGER" {
    const result = differenceInCalendarDays(data, new Date());
    if (result <= 30) return "DANGER";
    if (result <= 90 && result > 30) return "ALERT";
    return "SAFE";
  }

  return (
    <Card className="p-0 w-full aspect-square overflow-y-hidden">
      {data.expiringContracts.map((contract) => {
        return (
          <div key={contract.id} className="px-4">
            <div className="flex items-center justify-between pt-4 pb-1">
              <CardHeader className="flex p-0">
                <span>
                  <strong className="font-semibold uppercase">
                    {contract.name}
                  </strong>
                  : {contract.number}/{contract.amendmentNumber}
                </span>
              </CardHeader>
              <CardContent
                data-status={StatusToDueDate(contract.dueDate)}
                className="flex p-0  items-center text-primary data-[status=DANGER]:text-red-500 data-[status=ALERT]:text-orange-500"
              >
                <strong className="font-semibold uppercase">
                  {differenceInCalendarDays(contract.dueDate, new Date())}
                  {differenceInCalendarDays(contract.dueDate, new Date()) > 1 ||
                  differenceInCalendarDays(contract.dueDate, new Date()) < -1
                    ? " dias"
                    : " dia"}
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
