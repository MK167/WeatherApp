// z is imported as fb (form builder) like angular1 to avoid confusion with react-hook-form's zodResolver
import { z as fb } from "zod";

// REGEX for password: Minimum 6 characters, at least one letter and one number
// REGEX for phone: Optional + followed by 7 to 15 digits
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const phoneRegex = /^\+?[0-9]{7,15}$/;

export const formGroup = fb
  .object({
    firstName: fb
      .string()
      .nonempty({ message: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters" })
      .max(100),
    lastName: fb
      .string()
      .nonempty({ message: "Last name is required" })
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(100),
    email: fb
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Invalid email address" })
      .max(100),
    password: fb
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(100)
      .regex(passwordRegex, {
        message: "Password must contain at least one letter and one number",
      }),
    confirmPassword: fb
      .string()
      .nonempty({ message: "Confirm password is required" })
      .min(6, { message: "Confirm password must be at least 6 characters" })
      .max(100),
    phone: fb
      .string()
      .nonempty({ message: "Phone number is required" })
      .regex(phoneRegex, { message: "Invalid phone number" }),
    country: fb.string().nonempty({ message: "Please select a country" }),
    bio: fb
      .string()
      .nonempty({ message: "Bio is required" })
      .max(500, { message: "Bio must be at most 500 characters" }),
    gender: fb
      .string({ message: "Please select a gender" })
      .nonempty({ message: "Please select a gender" }),
    profileImage: fb
      .custom<FileList>()
      .refine((files) => files && files.length > 0, {
        message: "Please upload a file",
      })
      .refine((files) => !files?.[0] || files[0].size <= 5 * 1024 * 1024, {
        message: "File must be less than 5MB",
      })
      .refine(
        (files) =>
          !files?.[0] ||
          ["image/jpeg", "image/jpg", "image/png", "application/pdf"].includes(
            files[0].type,
          ),
        { message: "Only JPG, PNG, or PDF files are allowed" },
      ),
    checkbox: fb.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Infer the TypeScript type from the Zod schema
export type FormInputs = fb.infer<typeof formGroup>;
