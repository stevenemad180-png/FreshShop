import { Loginschema } from "./Loginschema";
import * as zod from"zod"
export type LoginFormData = zod.infer<typeof Loginschema>;
