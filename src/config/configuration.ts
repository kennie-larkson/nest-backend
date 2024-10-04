export type EnvTypes = {
  PORT: number;
  DBURL: string;
  JWTSECRET: string;
  NODE_ENV: string;
};

export default (): EnvTypes => {
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const isDevelopment = NODE_ENV === 'development';

  return {
    NODE_ENV,
    PORT: parseInt(process.env.PORT || '3000', 10),
    DBURL: isDevelopment ? process.env.DEV_DB_URL : process.env.DEV_DB_URL,
    JWTSECRET: isDevelopment
      ? process.env.DEV_JWT_SECRET
      : process.env.PROD_JWT_SECRET,
  };
};
