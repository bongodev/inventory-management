import dotenv from "dotenv";
dotenv.config();
type EnvConfig = {
  NODE_ENV: "development" | "production" | "test";
  PORT: number;
  JWT_SECRET: string;
  MONGO_URI: string;
  CORS_ORIGIN: string;
};

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(
      `CRITICAL ERROR: Environment variable '${key}' is missing.`
    );
  }
  return value;
};

const config: EnvConfig = {
  NODE_ENV: (process.env.NODE_ENV as EnvConfig["NODE_ENV"]) || "development",
  PORT: parseInt(getEnvVar("PORT", "6070"), 10),
  MONGO_URI: getEnvVar("MONGO_URI"),
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  CORS_ORIGIN: getEnvVar("CORS_ORIGIN", "http://localhost:3000"),
};

export const envConfig = Object.freeze(config);
