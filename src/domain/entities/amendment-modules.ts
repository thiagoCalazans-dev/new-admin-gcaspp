import { s } from "@/src/infra/schema";
import { Module } from "./module";

const amendmentModuleSkeleton = {
  id: s.string(),
  module: Module,
  amendmentId: s.string(),
  value: s.number(),
};

export const AmendmentModule = s.object(amendmentModuleSkeleton);
export type AmendmentModule = s.infer<typeof AmendmentModule>;
