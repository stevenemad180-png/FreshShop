import * as zod from "zod";

export const Loginschema = zod
  .object({

    email: zod.string().email("Enter a valid email"),
    password: zod
      .string()
      .nonempty("Password is required")


  })
// 