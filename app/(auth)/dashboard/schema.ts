import { Contract } from "@/src/domain/entities/contract";
import { ExpiringContract } from "@/src/domain/entities/expiring-contract";
import { s } from "@/src/infra/schema";

const DashboardPageSkeleton = {
  data: s.object({
    contracts: Contract.array(),
    expiringContracts: ExpiringContract.array(),
  }),
};

export const DashboardPage = s.object(DashboardPageSkeleton);
export type DashboardPage = s.infer<typeof DashboardPage>;
