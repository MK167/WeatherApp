// z is imported as fb (form builder) like angular1 to avoid confusion with react-hook-form's zodResolver
import { z as fb } from "zod";

// REGEX for password: Minimum 6 characters, at least one letter and one number
// REGEX for phone: Optional + followed by 7 to 15 digits
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const loginFormGroup = fb
  .object({
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
    })

// Infer the TypeScript type from the Zod schema
export type LoginFormInputs = fb.infer<typeof loginFormGroup>;
