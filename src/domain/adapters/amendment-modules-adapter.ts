import { AmendmentModule } from "../entities/amendment-modules";
import { adapterModule } from "./module-adapter";
import { dbAmendmentModules } from "../database/amendment-modules";

export const adapterAmendmentModules = {
  dbToDomain,
};

function dbToDomain(dbAmendmentModule: dbAmendmentModules): AmendmentModule {
  const amendmentModule: AmendmentModule = {
    id: dbAmendmentModule.id,
    amendmentId: dbAmendmentModule.amendment_id,
    module: adapterModule.dbToDomain(dbAmendmentModule.module),
    value: Number(dbAmendmentModule.value),
  };
  return AmendmentModule.parse(amendmentModule);
}
