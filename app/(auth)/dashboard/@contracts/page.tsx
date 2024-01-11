import { getExpiringContractsAction } from "@/src/actions/get-expiring-contracts";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { differenceInCalendarDays, format } from "date-fns";

export default async function Contracts() {
  const { data } = await getExpiringContractsAction({
    page: "1",
    limit: "100",
  });

  function StatusToDueDate(data: Date): "SAFE" | "ALERT" | "DANGER" {
    const result = differenceInCalendarDays(data, new Date());
    if (result <= 30) return "DANGER";
    if (result <= 90 && result > 30) return "ALERT";
    return "SAFE";
  }

  return (
    <Card className="p-0 w-full aspect-square overflow-y-hidden">
      {data.map((contract) => {
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
                  {differenceInCalendarDays(contract.dueDate, new Date()) > 1
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
