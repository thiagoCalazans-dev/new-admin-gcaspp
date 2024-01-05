import { s } from "@/src/infra/schema";
import { Module } from "./module";
import { Entity } from "./entity";

const amendmentModuleSkeleton = {
  id: s.string(),
  module: Module,
  entity: Entity,
  amendmentId: s.string(),
  value: s.number().positive(),
  implementationValue: s.number().nonnegative(),
  monthValue: s.number().positive(),
};

export const AmendmentModule = s.object(amendmentModuleSkeleton);

export type AmendmentModule = s.infer<typeof AmendmentModule>;
