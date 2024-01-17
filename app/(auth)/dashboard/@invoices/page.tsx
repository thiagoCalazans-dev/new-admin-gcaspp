import { getContractsAction } from "@/src/actions/get-contracts-action";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";

export default async function Invoices() {
  const { data, total, pages } = await getContractsAction({
    page: "1",
    limit: "10000",
  });

  const orderedDataByBillingDay = data.sort((a, b) => {
    return a.billingDay - b.billingDay;
  });

  function billingDayStatus(day: number): string {
    const currentDay = new Date().getDate();
    console.log(currentDay);
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
