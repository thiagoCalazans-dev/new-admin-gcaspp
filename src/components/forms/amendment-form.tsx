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
      dueDate: "",
      number: "",
      subscriptionDate: "",
      value: "",
    },
  });

  async function onSubmit(formValues: FormAmendment) {
    try {
      await createAmendmentAction({
        ...formValues,
        number: Number(formValues.number),
        value: Number(formValues.value),
        dueDate: new Date(formValues.dueDate.split("/").reverse().join("/")),
        subscriptionDate: new Date(
          formValues.subscriptionDate.split("/").reverse().join("/")
        ),
        contractId,
      });
      onSuccess("Aditivo adicionado com sucesso");
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
