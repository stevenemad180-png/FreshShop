import * as zod from "zod";

export const registerschema = zod
  .object({
    name: zod.string().nonempty("Name is required"),
    email: zod.string().email("Enter a valid email"),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
        "Password must be strong"
      ),
    rePassword: zod.string().nonempty("Confirm password is required"),
    phone: zod
      .string()
      .nonempty("Phone is required")
      .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });