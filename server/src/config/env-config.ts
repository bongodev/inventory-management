import dotenv from 'dotenv';
dotenv.config();
type EnvConfig = {
  ENVIRONMENT: 'development' | 'production' | 'test';
  PORT: number;
  JWT_SECRET: string;
  MONGO_URI: string;
  DB_NAME: string;
  CORS_ORIGIN: string;
  BCRYPT_SALT_ROUNDS: number;
};

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(
      `CRITICAL ERROR: Environment variable '${key}' is missing.`,
    );
  }
  return value;
};

const config: EnvConfig = {
  ENVIRONMENT:
    (process.env.ENVIRONMENT as EnvConfig['ENVIRONMENT']) || 'development',
  PORT: parseInt(getEnvVar('PORT', '6070'), 10),
  MONGO_URI: getEnvVar('MONGO_URI'),
  DB_NAME: getEnvVar('DB_NAME'),
  JWT_SECRET: getEnvVar('JWT_SECRET'),
  CORS_ORIGIN: getEnvVar('CORS_ORIGIN', 'http://localhost:3000'),
  BCRYPT_SALT_ROUNDS: parseInt(getEnvVar('BCRYPT_SALT_ROUNDS', '10'), 10),
};

export const envConfig = Object.freeze(config);
