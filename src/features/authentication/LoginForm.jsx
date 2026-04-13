import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useLogin } from "./useLogin";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.5);
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1.2rem 1.6rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #f0f0fa;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }

  &:focus {
    border-color: rgba(99, 102, 241, 0.6);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 1.3rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
  margin-top: 0.4rem;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(99, 102, 241, 0.5);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.span`
  font-size: 1.2rem;
  color: #f87171;
`;

function LoginForm() {
  const { login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit({ email, password }) {
    login({ email, password });
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Label htmlFor="email">Email address</Label>
        <StyledInput
          type="email"
          id="email"
          placeholder="you@example.com"
          autoComplete="username"
          disabled={isPending}
          {...register("email", { required: "Email is required" })}
        />
        {errors?.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="password">Password</Label>
        <StyledInput
          type="password"
          id="password"
          placeholder="••••••••"
          autoComplete="current-password"
          disabled={isPending}
          {...register("password", { required: "Password is required" })}
        />
        {errors?.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
      </FieldGroup>

      <SubmitBtn type="submit" disabled={isPending}>
        {isPending ? "Signing in…" : "Sign In"}
      </SubmitBtn>
    </StyledForm>
  );
}

export default LoginForm;
