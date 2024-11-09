export interface Environment {
  nodeEnv: string;
  mongodbUri: string;
}

export default (): Environment => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: String(process.env.MONGODB_URI),
});
