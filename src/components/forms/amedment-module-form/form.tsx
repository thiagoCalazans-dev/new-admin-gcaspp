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
import { Combobox } from "../../ui/combobox";
import { useToast } from "@/src/hooks/useToast";
import { Module } from "@/src/domain/entities/module";
import { createAmendmentModuleAction } from "@/src/actions/create-amendment-module-action";
import { Plus } from "@/src/infra/icons";

interface AmendmentModulesFormProps {
  modules: Module[];
  amendmentId: string;
}

const FormAmendmentModulesSkeleton = {
  moduleId: s.string(),
  value: s
    .string()
    .min(1, "campo obrigatório")
    .transform((string) => string.replace(",", ".")),
};

export const FormAmendmentModules = s.object(FormAmendmentModulesSkeleton);

export type FormAmendmentModules = s.infer<typeof FormAmendmentModules>;

export function ClientAmendmentModulesForm({
  modules,
  amendmentId,
}: AmendmentModulesFormProps) {
  const { onError, onSuccess } = useToast();

  const form = useForm<FormAmendmentModules>({
    resolver: zodResolver(FormAmendmentModules),
    defaultValues: {
      moduleId: "",
      value: "",
    },
  });

  async function onSubmit(formValues: FormAmendmentModules) {
    try {
      await createAmendmentModuleAction({
        ...formValues,
        amendmentId,
        value: Number(formValues.value),
      });
      onSuccess("Contrato adcionado com sucesso");
      form.reset();
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-4  items-end"
      >
        <div className="flex gap-3  items-start">
          <Combobox data={modules} form={form} label="Módulo" name="moduleId" />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 w-full">
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
        <Button
          disabled={form.formState.isSubmitting}
          className="flex gap-3"
          type="submit"
        >
          Adcionar <Plus />
        </Button>
      </form>
    </Form>
  );
}
