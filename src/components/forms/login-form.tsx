"use client";
import { useForm, zodResolver } from "@/src/infra/hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { s } from "@/src/infra/schema";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/src/hooks/useToast";

export const FormLoginSchema = s.object({
  user: s.string().min(1),
  password: s.string().min(8),
});
export type FormLogin = s.infer<typeof FormLoginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { onError, onSuccess } = useToast();

  const form = useForm<FormLogin>({
    resolver: zodResolver(FormLoginSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  async function onSubmit(formValues: FormLogin) {
    try {
      await console.log(formValues);
      onSuccess("Bem Vindo");
      router.push("/dashboard");
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px] md:border p-4 md:rounded-xl">
      <div className="flex flex-col space-y-10 text-center items-center">
        <div>
          <h1 className="text-lg font-semibold leading-none tracking-tight">
            Bem Vindo
          </h1>
          <p className="text-sm text-muted-foreground">
            Entre com seu usuário e senha para acesso
          </p>
        </div>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <div className="">
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting}
                        {...field}
                        id="user"
                        placeholder="name@example.com"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting}
                        {...field}
                        id="senha"
                        placeholder="********"
                        type="password"
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
      </div>
    </div>
  );
}
