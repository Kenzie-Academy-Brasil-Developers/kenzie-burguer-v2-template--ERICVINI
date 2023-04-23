import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    name: z.string().nonempty("*Campo Obrigatório").min(1, "erro"),
    email: z.string().nonempty("*Campo Obrigatório").email("Por favor insira o email corretamente"),
    password: z
      .string()
      .nonempty("*Campo Obrigatório")
      .min(7, "É obrigatório ter pelo menos 7 caracteres")
      .regex(/(?=.*?[A-Z])/, "É necessário ao menos uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "É necessário ao menos uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número")
      .regex(/\W|_/, "É necessário ter ao menos um símbolo especial"),
    confirm: z.string().nonempty("*Campo Obrigatório"),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "As senhas precisam ser iguais",
    path: ["confirm"],
  });

export type tRegisterFormValues = z.infer<typeof RegisterFormSchema>;
