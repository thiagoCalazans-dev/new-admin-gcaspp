import { getContractsAction } from "@/src/actions/get-contracts-action";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Amendment } from "@/src/domain/entities/amendment";
import { differenceInCalendarDays, format } from "date-fns";

export default async function Contracts() {
  const { data } = await getContractsAction({
    page: "1",
    limit: "10",
  });

  const SortedContracts = data
    .map((contract) => {
      const currentAmendment = getCurrentAmendment(contract.amendments);

      return {
        id: contract.id,
        name: contract.supplier.name,
        number: contract.number,
        amendmentNumber: currentAmendment,
        status: StatusToDueDate(contract.amendments[currentAmendment].dueDate),
        daysToDeadline: differenceInCalendarDays(
          contract.amendments[currentAmendment].dueDate,
          new Date()
        ),
        dueDate: contract.amendments[currentAmendment].dueDate,
      };
    })
    .sort((a, b) => a.daysToDeadline - b.daysToDeadline);

  function getCurrentAmendment(amendments: Amendment[]) {
    return amendments.reduce(
      (acc, data) => Math.max(acc, data.number),
      -Infinity
    );
  }

  type DueDateStatus = "DANGER" | "ALERT" | null;

  function StatusToDueDate(data: Date): DueDateStatus {
    const result = differenceInCalendarDays(data, new Date());
    console.log(result);
    if (result <= 30) return "DANGER";
    if (result <= 90 && result > 30) return "ALERT";
    return null;
  }

  return (
    <Card>
      <CardHeader>Contratos a vencer</CardHeader>
      <CardContent className="space-y-4">
        {SortedContracts.map((contract) => {
          return (
            <Card key={contract.id} className="">
              <CardHeader className="flex">
                Contrato: {contract.number}/{contract.amendmentNumber} -
                {contract.name}
              </CardHeader>
              <CardContent
                data-status={contract.status}
                className="grid grid-cols-2 text-primary data-[status=DANGER]:text-red-500 data-[status=ALERT]:text-orange-500"
              >
                <span>
                  Data de Vencimento:
                  {format(contract.dueDate, "dd/MM/yyyy")}
                </span>
                <strong>FALTAM: {contract.daysToDeadline}</strong>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
