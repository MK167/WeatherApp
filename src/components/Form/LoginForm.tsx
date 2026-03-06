import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  type LoginFormInputs,
  loginFormGroup,
} from "../../validation/loginValidation";
import { Button, Form } from "react-bootstrap";
import InputElement from "./InputElement";

const LoginForm = () => {
  // Login Form
  // You can create a separate form for login with its own validation schema if needed
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: err },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormGroup),
    mode: "onBlur",
  });

  const onLoginSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Login Form Data:", data);
  };
  return (
      <Form onSubmit={handleLoginSubmit(onLoginSubmit)} noValidate>
        <InputElement
          name="email"
          label="Email address"
          type="email"
          placeholder="Enter email"
          autoComplete="false"
          errors={err.email?.message || ""}
          register={loginRegister}
        />

        <InputElement
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          autoComplete="false"
          errors={err.password?.message || ""}
          register={loginRegister}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
  );
};

export default LoginForm;
