import { SubmitHandler, useForm } from "react-hook-form";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, tLoginFormValues } from "./LoginFormSchema";
import { useContext, useEffect } from "react";
import { UserContext } from '../../../providers/UserContext';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tLoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
  });

  const {loginUser} = useContext(UserContext);

  const submit: SubmitHandler<tLoginFormValues> = (formData) => {
    loginUser(formData)
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        id="email"
        label="Email"
        type="text"
        placeholder=" "
        {...register("email")}
        error={errors.email && errors.email.message}
      />
      <Input
        id="senha"
        label="Senha"
        type="password"
        placeholder=" "
        {...register("password")}
        error={errors.password && errors.password.message}
      />
      <StyledButton $buttonSize="default" $buttonStyle="green" type="submit">
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
