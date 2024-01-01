import { s } from "@/src/infra/schema";

const paginationSkeleton = {
  page: s
    .string()
    .regex(/^\d+$/, {
      message: "A string deve conter apenas números.",
    })
    .or(
      s.array(
        s.string().regex(/^\d+$/, {
          message: "A string deve conter apenas números.",
        })
      )
    ),
  limit: s
    .string()
    .regex(/^\d+$/, {
      message: "A string deve conter apenas números.",
    })
    .or(
      s.array(
        s.string().regex(/^\d+$/, {
          message: "A string deve conter apenas números.",
        })
      )
    ),
};

export const PaginationParams = s.object(paginationSkeleton).required();
export type PaginationParams = s.infer<typeof PaginationParams>;
