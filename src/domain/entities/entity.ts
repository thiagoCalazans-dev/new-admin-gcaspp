import { s } from "@/src/infra/schema";

const entitySkeleton = {
  id: s.string(),
  name: s.string(),
};

export const Entity = s.object(entitySkeleton).required();
export type Entity = s.infer<typeof Entity>;
