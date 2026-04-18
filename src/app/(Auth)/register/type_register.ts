import { registerschema } from "./registerschema";
import * as zod from"zod"
export type RegisterFormData = zod.infer<typeof registerschema>;
