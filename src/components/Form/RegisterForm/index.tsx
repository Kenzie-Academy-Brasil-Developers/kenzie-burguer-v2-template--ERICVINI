import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema, tRegisterFormValues } from "./RegisterFormSchema";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../providers/UserContext";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tRegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const { registerUser } = useContext(UserContext);

  const OnSubmit: SubmitHandler<tRegisterFormValues> = (formData) => {
    registerUser(formData)
  };

  return (
    <StyledForm onSubmit={handleSubmit(OnSubmit)}>
      <Input
        id="name"
        label="Name"
        type="text"
        placeholder=" "
        {...register("name")}
        error={errors.name && errors.name.message}
      />
      <Input
        id="email"
        label="Email"
        type="text"
        placeholder=" "
        {...register("email")}
        error={errors.email && errors.email.message}
      />
      <Input
        id="password"
        label="Senha"
        type="password"
        placeholder=" "
        {...register("password")}
        error={errors.password && errors.password.message}
      />
      <Input
        id="confirmPassword"
        label="Confirmar Senha"
        type="password"
        placeholder=" "
        {...register("confirm")}
        error={errors.confirm && errors.confirm.message}
      />
      <StyledButton $buttonSize="default" $buttonStyle="gray" type="submit">
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
