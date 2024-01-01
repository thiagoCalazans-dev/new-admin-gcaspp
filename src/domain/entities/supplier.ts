import { s } from "@/src/infra/schema";

const supplierSkeleton = {
  id: s.string(),
  name: s.string(),
  cnpj: s.string().refine((cnpj) => {
    const value = cnpj.replace(/[^\d]/g, "");
    if (value.length !== 14) throw new Error("Cnpj precisa ter 14 caracteres");
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(value)) {
      throw new Error("CNPJ Invalido");
    }
    return cnpj;
  }),
  zipCode: s.string(),
  neighborhood: s.string(),
  city: s.string(),
  address: s.string(),
  number: s.number().min(0).nullable(),
  observation: s.string().nullable(),
};

export const Supplier = s.object(supplierSkeleton).required();
export type Supplier = s.infer<typeof Supplier>;
