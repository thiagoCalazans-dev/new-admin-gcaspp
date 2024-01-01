import { s } from "./schema";

const envSkeleton = {
  BASE_URL: s.string().default(""),
};

const envSchema = s.object(envSkeleton);

const processEnv = {
  BASE_URL: "http://localhost:3000",
};

export const env = envSchema.parse(processEnv);
