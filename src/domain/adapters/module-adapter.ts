import { Module as prismaModule } from "@prisma/client";
import { Module } from "../entities/module";

export const adapterModule = {
  dbToDomain,
};

type dbModule = prismaModule;

function dbToDomain(module: dbModule): Module {
  return Module.parse(module);
}
