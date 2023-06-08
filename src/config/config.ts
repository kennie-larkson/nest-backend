const devEnv = {
  jwtSecret: process.env.DEV_JWT_SECRET,
  expiration: process.env.DEV_JWT_TOKEN_EXPIRATION,
};

const prodEnv = {
  jwtSecret: process.env.PROD_JWT_SECRET,
  expiration: process.env.PROD_JWT_TOKEN_EXPIRATION,
};

export default () => {
  console.log('environment', process.env.NODE_ENV);
  console.log(devEnv.jwtSecret);

  return process.env.NODE_ENV === 'development' ? devEnv : prodEnv;
};
