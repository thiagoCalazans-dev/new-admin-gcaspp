"use client";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { s } from "@/src/infra/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createModuleAction } from "@/src/actions/create-module-action";
import { useToast } from "@/src/hooks/useToast";

const FormModuleSkeleton = {
  name: s.string().min(1),
};

export const FormModule = s.object(FormModuleSkeleton);
export type FormModule = s.infer<typeof FormModule>;

export function ModuleForm() {
  const { onError, onSuccess } = useToast();

  const form = useForm<FormModule>({
    resolver: zodResolver(FormModule),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(formValues: FormModule) {
    try {
      await createModuleAction(formValues);
      onSuccess("Módulo adcionado com sucesso");
      form.reset();
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    placeholder="Type"
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
          className="w-full"
          type="submit"
        >
          Salvar
        </Button>
      </form>
    </Form>
  );
}
