import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";
import { tLoginFormValues } from "../LoginForm/LoginFormSchema";

interface iInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null | undefined;
  label: string;
  id: string;
}

const Input = forwardRef(
  (
    { id, label, error,...rest }: iInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <div>
      <StyledInputContainer>
        <input id={id} ref={ref} {...rest} />
        <label htmlFor={id}>{label}</label>
      </StyledInputContainer>
      {error && <StyledParagraph fontColor="red">{error}</StyledParagraph>}
    </div>
  )
);

export default Input;
