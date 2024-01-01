import { s } from "@/src/infra/schema";

const moduleSkeleton = {
  id: s.string(),
  name: s.string(),
};

export const Module = s.object(moduleSkeleton).required();
export type Module = s.infer<typeof Module>;
