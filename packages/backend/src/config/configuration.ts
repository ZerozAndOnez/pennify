export interface Environment {
  nodeEnv: string;
  mongodbUri: string;
  jwtSecret: string;
}

export default (): Environment => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: String(process.env.MONGODB_URI),
  jwtSecret: String(process.env.JWT_SECRET),
});
