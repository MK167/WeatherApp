import { z } from "zod";
export const formGroup = z
  .object({
    firstName: z
      .string()
      .nonempty({ message: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters" })
      .max(100),
    lastName: z
      .string()
      .nonempty({ message: "Last name is required" })
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(100),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Invalid email address" })
      .max(100),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(100)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message:
          "Confirm password must contain at least one letter and one number",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password is required" })
      .min(6, { message: "Confirm password must be at least 6 characters" })
      .max(100),
    phone: z
      .string()
      .nonempty({ message: "Phone number is required" })
      .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number"),
    country: z.string().nonempty({ message: "Please select a country" }),
    bio: z
      .string()
      .nonempty({ message: "Bio is required" })
      .max(500, { message: "Bio must be at most 500 characters" }),
    gender: z.string().nonempty({ message: "Please select a gender" }),
    profileImage: z
      .custom<FileList>()
      .refine((files) => files && files.length > 0, "Please upload a file")
      .refine(
        (files) => !files?.[0] || files[0].size <= 5 * 1024 * 1024,
        "File must be less than 5MB"
      )
      .refine(
        (files) =>
          !files?.[0] ||
          ["image/jpeg", "image/jpg", "image/png", "application/pdf"].includes(
            files[0].type
          ),
        "Only JPG, PNG, or PDF files are allowed"
      ),
    checkbox: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormInputs = z.infer<typeof formGroup>;
