"use client";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useForm, zodResolver } from "@/src/infra/hook-form";
import { s } from "@/src/infra/schema";
import { BiddingType } from "@/src/domain/entities/bidding-type";
import { Supplier } from "@/src/domain/entities/supplier";
import { Textarea } from "@/src/components/ui/textarea";
import { Combobox } from "../../ui/combobox";
import { useToast } from "@/src/hooks/useToast";
import { createContractAction } from "@/src/actions/create-contract-action";

interface ContractFormProps {
  biddingTypes: BiddingType[];
  suppliers: Supplier[];
}

const FormContractSkeleton = {
  number: s
    .string()
    .regex(
      /^\d*(\/\d{4})$/,
      "deve possuir apenas numeros finalizar com /0000, ex:/2023"
    ),
  processNumber: s
    .string()
    .regex(
      /^\d*(\/\d{4})$/,
      "deve possuir apenas numeros finalizar com /0000, ex:/2023"
    ),
  biddingTypeId: s.string().min(1, "campo obrigatório"),
  supplierId: s.string().min(1, "campo obrigatório"),
  fixture: s.string().min(1, "campo obrigatório"),
  billingDay: s.string().min(1, "campo obrigatório"),
  value: s
    .string()
    .min(1, "campo obrigatório")
    .transform((string) => string.replace(",", ".")),
  subscriptionDate: s
    .string()
    .regex(
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
      "Deve estar no formato de data 'DD/MM/AAAA'"
    ),
  dueDate: s
    .string()
    .regex(
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
      "Deve estar no formato de data 'DD/MM/AAAA'"
    ),
};

export const FormContract = s.object(FormContractSkeleton);

export type FormContract = s.infer<typeof FormContract>;

export function ClientContractForm({
  biddingTypes,
  suppliers,
}: ContractFormProps) {
  const { onError, onSuccess } = useToast();

  const form = useForm<FormContract>({
    resolver: zodResolver(FormContract),
    defaultValues: {
      biddingTypeId: "",
      billingDay: "",
      dueDate: "",
      fixture: "",
      number: "",
      processNumber: "",
      subscriptionDate: "",
      supplierId: "",
      value: "",
    },
  });

  async function onSubmit(formValues: FormContract) {
    try {
      await createContractAction({
        ...formValues,
        billingDay: Number(formValues.billingDay),
        value: Number(formValues.value),
        dueDate: new Date(formValues.dueDate.split("/").reverse().join("/")),
        subscriptionDate: new Date(
          formValues.subscriptionDate.split("/").reverse().join("/")
        ),
      });
      onSuccess("Contrato adcionado com sucesso");
      form.reset();
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
        <div className="flex flex-col gap-3">
          <div className="grid md:grid-cols-2  gap-3">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do Contrato</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="1234"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="processNumber"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Número do processo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="1234"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-2  gap-3">
            <Combobox
              data={suppliers}
              form={form}
              label="Fornecedor"
              name="supplierId"
            />

            <Combobox
              data={biddingTypes}
              form={form}
              label="Modalidade"
              name="biddingTypeId"
            />
          </div>
          <div className="grid md:grid-cols-2  gap-3">
            <FormField
              control={form.control}
              name="billingDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dia do Faturamento</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder="30"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder="30"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-2  gap-3">
            <FormField
              control={form.control}
              name="subscriptionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Assinatura</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder="01/01/2024"
                      onChange={(e) => {
                        const unmaskedValue = e.target.value.replace(
                          /[^0-9/]/g,
                          ""
                        );
                        if (unmaskedValue.length <= 10) {
                          const formattedValue = unmaskedValue
                            .replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
                            .substring(0, 10);
                          field.onChange(formattedValue);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Vencimento</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder="01/01/2024"
                      onChange={(e) => {
                        const unmaskedValue = e.target.value.replace(
                          /[^0-9/]/g,
                          ""
                        );
                        if (unmaskedValue.length <= 10) {
                          const formattedValue = unmaskedValue
                            .replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
                            .substring(0, 10);
                          field.onChange(formattedValue);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="fixture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objeto</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={form.formState.isSubmitting}
                    placeholder="Lorem ipsum dolor sit amet. Sit ratione nemo et quam officiis et molestiae nihil ad facere omnis"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={form.formState.isSubmitting}
          className="ml-auto w-full"
          type="submit"
        >
          Salvar
        </Button>
      </form>
    </Form>
  );
}
