import { Button, Form } from "react-bootstrap";
import InputElement from "./InputElement";
import {
  formGroup,
  type FormInputs,
} from "../../validation/registerationValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

const RegisterationForm = () => {
  // Registeration Form
  // Register the form with Zod resolver for validation and onBlur mode for validation trigger
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: zodResolver(formGroup), mode: "onBlur" });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <InputElement
        name="firstName"
        label="First Name"
        type="text"
        placeholder="Enter first name"
        autoComplete="false"
        errors={errors.firstName?.message || ""}
        register={register}
      />

      <InputElement
        name="lastName"
        label="Last Name"
        type="text"
        placeholder="Enter last name"
        autoComplete="false"
        errors={errors.lastName?.message || ""}
        register={register}
      />
      <InputElement
        name="email"
        label="Email address"
        type="email"
        placeholder="Enter email"
        autoComplete="false"
        errors={errors.email?.message || ""}
        register={register}
      />

      <InputElement
        name="password"
        label="Password"
        type="password"
        placeholder="Password"
        autoComplete="false"
        errors={errors.password?.message || ""}
        register={register}
      />

      <InputElement
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        autoComplete="false"
        errors={errors.confirmPassword?.message || ""}
        register={register}
      />

      <InputElement
        name="phone"
        label="Phone Number"
        type="tel"
        placeholder="Enter phone number"
        autoComplete="tel"
        errors={errors.phone?.message || ""}
        register={register}
      />

      <InputElement
        name="country"
        label="Country"
        type="select"
        errors={errors.country?.message || ""}
        register={register}
        options={[
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
          { value: "ca", label: "Canada" },
          { value: "au", label: "Australia" },
        ]}
      />

      <InputElement
        name="gender"
        label="Gender"
        type="radio"
        errors={errors.gender?.message || ""}
        register={register}
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ]}
      />

      <InputElement
        name="profileImage"
        label="Upload Image / PDF"
        type="file"
        accept="image/jpeg,image/jpg,image/png,application/pdf"
        errors={errors.profileImage?.message || ""}
        register={register}
      />

      <InputElement
        name="bio"
        label="Bio"
        type="textarea"
        placeholder="Tell us about yourself"
        rows={4}
        errors={errors.bio?.message || ""}
        register={register}
      />

      <InputElement
        name="dob"
        label="Date of Birth"
        type="date"
        errors={errors.dob?.message || ""}
        register={register}
      />

      <InputElement
        name="checkbox"
        label="Accept Terms and Conditions"
        type="checkbox"
        placeholder=""
        errors={errors.checkbox?.message || ""}
        register={register}
        autoComplete={""}
      />

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RegisterationForm;
