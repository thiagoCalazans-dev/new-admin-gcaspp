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
import { createBiddingTypeAction } from "@/src/actions/create-bidding-type-action";
import { useToast } from "@/src/hooks/useToast";

const FormBiddingTypeSkeleton = {
  name: s.string().min(1),
};

export const FormBiddingType = s.object(FormBiddingTypeSkeleton);
export type FormBiddingType = s.infer<typeof FormBiddingType>;

export function BiddingTypeForm() {
  const { onError, onSuccess } = useToast();

  const form = useForm<FormBiddingType>({
    resolver: zodResolver(FormBiddingType),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(formValues: FormBiddingType) {
    try {
      await createBiddingTypeAction(formValues);
      onSuccess("Modalidade de licitação adicionada com sucesso");
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
