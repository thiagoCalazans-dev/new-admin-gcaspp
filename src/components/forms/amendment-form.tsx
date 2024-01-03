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
import { DatePicker } from "../ui/date-picker";
import { useToast } from "@/src/hooks/useToast";
import { createAmendmentAction } from "@/src/actions/create-amendment-action";

const FormAmendmentSkeleton = {
  number: s.string().min(1, "campo obrigatório"),
  value: s
    .string()
    .min(1, "campo obrigatório")
    .transform((string) => string.replace(",", ".")),
  subscriptionDate: s.date(),
  dueDate: s.date(),
};

export const FormAmendment = s.object(FormAmendmentSkeleton);

export type FormAmendment = s.infer<typeof FormAmendment>;

interface AmendmentFormProps {
  contractId: string;
}

export function AmendmentForm({ contractId }: AmendmentFormProps) {
  const { onError, onSuccess } = useToast();

  const form = useForm<FormAmendment>({
    resolver: zodResolver(FormAmendment),
    defaultValues: {
      dueDate: new Date(),
      number: "",
      subscriptionDate: new Date(),
      value: "",
    },
  });

  async function onSubmit(formValues: FormAmendment) {
    try {
      await createAmendmentAction({
        ...formValues,
        number: Number(formValues.number),
        value: Number(formValues.value),
        contractId,
      });
      onSuccess("Contrato adcionado com sucesso");
      form.reset();
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  console.log(form.formState.errors);

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
                  <FormLabel>Número do Aditivo</FormLabel>
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
            <DatePicker
              form={form}
              label="Data de Assinatura"
              name="subscriptionDate"
            />
            <DatePicker form={form} label="Data de Vencimento" name="dueDate" />
          </div>
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
