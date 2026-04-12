import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          disabled={isPending}
          {...register("email", {
            required: "Email is required",
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isPending}
          {...register("password", {
            required: "Password is required",
          })}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button type="submit" size="large" disabled={isPending}>
          {isPending ? "Signing in..." : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
