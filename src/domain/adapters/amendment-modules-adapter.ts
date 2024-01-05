import { AmendmentModule } from "../entities/amendment-modules";
import { adapterModule } from "./module-adapter";
import { dbAmendmentModules } from "../database/amendment-modules";
import { adapterEntity } from "./entity-adapter";

export const adapterAmendmentModules = {
  dbToDomain,
};

function dbToDomain(dbAmendmentModule: dbAmendmentModules): AmendmentModule {
  const amendmentModule: AmendmentModule = {
    id: dbAmendmentModule.id,
    amendmentId: dbAmendmentModule.amendment_id,
    module: adapterModule.dbToDomain(dbAmendmentModule.module),
    value: Number(dbAmendmentModule.value),
    implementationValue: Number(dbAmendmentModule.implementation_value),
    monthValue: Number(dbAmendmentModule.month_value),
    entity: adapterEntity.dbToDomain(dbAmendmentModule.entity),
  };
  return AmendmentModule.parse(amendmentModule);
}
