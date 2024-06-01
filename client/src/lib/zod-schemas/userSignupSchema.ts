import { z } from 'zod';
import validator from 'validator';
import axios from "axios";

export const FormDataSchema = z.object({
  firstName: z.string().min(1, "First name is required").refine((data) => validator.isAlpha(data), "No numbers or special characters"),
  lastName: z.string().min(1, "Last name is required").refine((data) => validator.isAlpha(data), "No numbers or special characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  password2: z.string().min(6, "Password must be at least 6 characters"),
}).superRefine(async ({ password, password2, email }, ctx) => {
  if (password2 !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["password2"]
    })
  }

  if (!email) return;

  try {
    const result = await axios.get(
      `http://localhost:5000/api/users/email/${email}`
    );
    if (result.data) {
      ctx.addIssue({
        code: "custom",
        message: "Email is already registered",
        path: ["email"],
      });
    }
  } catch (error) {
    console.error("Error fetching email: ", error);
  }
})