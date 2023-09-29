import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export default z;
