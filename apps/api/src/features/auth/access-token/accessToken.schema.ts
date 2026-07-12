import z from "zod";

const accessTokenServiceSchema = z.object({
  oldRefreshToken: z.string(),
  deviceId: z.string(),
});

export default accessTokenServiceSchema;
