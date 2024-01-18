import { getContractsAction } from "@/src/actions/get-contracts-action";
import { getExpiringContractsAction } from "@/src/actions/get-expiring-contracts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data: expiringContracts } = await getExpiringContractsAction({
      page: "1",
      limit: "100",
    });

    const { data: Contracts } = await getContractsAction({
      page: "1",
      limit: "10000",
    });

    return NextResponse.json(
      {
        data: {
          contracts: Contracts,
          expiringContracts: expiringContracts,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(null, {
      status: 500,
      statusText: "Something went wrong!",
    });
  }
}
