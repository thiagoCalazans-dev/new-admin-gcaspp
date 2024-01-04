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
  zipCode: s
    .string()
    .regex(/^[0-9]{5}-?[0-9]{3}$/, "deve ser no formato 00000-000"),
  neighborhood: s.string(),
  city: s.string(),
  address: s.string(),
  number: s.coerce.number().nullable().default(null),
  observation: s.string().nullable().default(null),
};

export const Supplier = s.object(supplierSkeleton);
export type Supplier = s.infer<typeof Supplier>;
