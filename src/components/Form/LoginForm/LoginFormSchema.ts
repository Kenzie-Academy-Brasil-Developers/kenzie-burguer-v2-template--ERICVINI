import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .nonempty("*Campo Obrigatório")
    .email("Por favor Insira o email corretamente"),
  password: z
    .string()
    .nonempty("*Campo Obrigatório")
    .min(7, "É necessário ao menos 7 caracteres")
    .regex(/(?=.*?[A-Z])/, "É necessário ao menos uma letra maiúscula")
    .regex(/(?=.*?[a-z])/, "É necessário ao menos uma letra minúscula")
    .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número")
    .regex(/\W|_/, "É necessário ter ao menos um símbolo especial"),
});

export type tLoginFormValues = z.infer<typeof LoginFormSchema>;
