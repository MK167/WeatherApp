// z is imported as fb (form builder) like angular to keep naming consistent with registerationValidation
import { z as fb } from "zod";

// ─── Nested object schema — equivalent to Angular's nested FormGroup ───────────
const addressSchema = fb.object({
  street: fb.string().nonempty({ message: "Street is required" }),
  city: fb.string().nonempty({ message: "City is required" }),
  state: fb.string().nonempty({ message: "State is required" }),
  zipCode: fb
    .string()
    .nonempty({ message: "Zip code is required" })
    .regex(/^\d{5}(-\d{4})?$/, {
      message: "Invalid zip code (e.g. 10001 or 10001-1234)",
    }),
});

// ─── Array item schema — equivalent to Angular's FormArray of FormControls ────
const skillSchema = fb.object({
  name: fb.string().nonempty({ message: "Skill name is required" }),
});

// ─── Array group schema — equivalent to Angular's FormArray of FormGroups ─────
const workExperienceSchema = fb
  .object({
    company: fb.string().nonempty({ message: "Company is required" }),
    position: fb.string().nonempty({ message: "Position is required" }),
    startYear: fb
      .string()
      .nonempty({ message: "Start year is required" })
      .regex(/^\d{4}$/, { message: "Enter a valid 4-digit year (e.g. 2020)" }),
    isCurrent: fb.boolean(),
    endYear: fb.string().optional(),
  })
  // Conditional cross-field validation inside each group item
  .superRefine((data, ctx) => {
    if (!data.isCurrent) {
      if (!data.endYear || data.endYear.trim() === "") {
        ctx.addIssue({
          code: fb.ZodIssueCode.custom,
          message: "End year is required when not currently working",
          path: ["endYear"],
        });
      } else if (!/^\d{4}$/.test(data.endYear)) {
        ctx.addIssue({
          code: fb.ZodIssueCode.custom,
          message: "Enter a valid 4-digit year (e.g. 2023)",
          path: ["endYear"],
        });
      }
    }
  });

// Main complex form schema combining nested objects and arrays, equivalent to Angular's complex FormGroup with nested FormGroups and FormArrays
export const complexFormSchema = fb.object({
  fullName: fb
    .string()
    .nonempty({ message: "Full name is required" })
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: fb
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),

  // Nested FormGroup
  address: addressSchema,

  // FormArray of simple controls (at least 1 skill)
  skills: fb.array(skillSchema).min(1, { message: "Add at least one skill" }),

  // FormArray of FormGroups (at least 1 experience)
  workExperiences: fb
    .array(workExperienceSchema)
    .min(1, { message: "Add at least one work experience" }),
});

// Infer the TypeScript type for the complex form inputs from the schema
export type ComplexFormInputs = fb.infer<typeof complexFormSchema>;
