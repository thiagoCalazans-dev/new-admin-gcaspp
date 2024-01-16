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
import { Entity } from "@/src/domain/entities/entity";
import { Modal } from "../../ui/modal";
import { ModuleForm } from "../module-form";

interface AmendmentModulesFormProps {
  entities: Entity[];
  modules: Module[];
  amendmentId: string;
}

const FormAmendmentModulesSkeleton = {
  moduleId: s.string(),
  entityId: s.string(),
  value: s
    .string()
    .min(1, "campo obrigatório")
    .transform((string) => string.replace(",", ".")),
  monthValue: s
    .string()
    .min(1, "campo obrigatório")
    .transform((string) => string.replace(",", ".")),
  implementationValue: s
    .string()
    .default("0")
    .transform((string) => string.replace(",", ".")),
};

export const FormAmendmentModules = s.object(FormAmendmentModulesSkeleton);

export type FormAmendmentModules = s.infer<typeof FormAmendmentModules>;

export function ClientAmendmentModulesForm({
  modules,
  entities,
  amendmentId,
}: AmendmentModulesFormProps) {
  const { onError, onSuccess } = useToast();

  const form = useForm<FormAmendmentModules>({
    resolver: zodResolver(FormAmendmentModules),
    defaultValues: {
      moduleId: "",
      entityId: "",
      value: "",
    },
  });

  async function onSubmit(formValues: FormAmendmentModules) {
    try {
      await createAmendmentModuleAction({
        ...formValues,
        amendmentId,
        value: Number(formValues.value),
        implementationValue: Number(formValues.implementationValue),
        monthValue: Number(formValues.monthValue),
      });
      onSuccess("Contrato adcionado com sucesso");
      form.reset();
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4  items-start">
          <div className="flex gap-2 items-end">
            <Combobox
              data={modules}
              form={form}
              label="Módulo"
              name="moduleId"
            />
            <Modal
              title="Cadastrar Modulo"
              description="Adicione um novo módulo"
              textButton={<Plus />}
            >
              <ModuleForm />
            </Modal>
          </div>
          <Combobox
            data={entities}
            form={form}
            label="Entidade"
            name="entityId"
          />
        </div>
        <div className="grid grid-cols-4 gap-4  items-end">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <FormLabel>Valor Total</FormLabel>
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
          <FormField
            control={form.control}
            name="monthValue"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <FormLabel>Valor Mensal</FormLabel>
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
          <FormField
            control={form.control}
            name="implementationValue"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <FormLabel>Valor Implantação</FormLabel>
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
          <Button
            disabled={form.formState.isSubmitting}
            className="flex gap-3 w-full"
            type="submit"
          >
            Adicionar
            <Plus />
          </Button>
        </div>
      </form>
    </Form>
  );
}
