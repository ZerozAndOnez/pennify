export interface Environment {
  nodeEnv: string;
  mongodbUri: string;
  jwtSecret: string;
  sendGridApiKey: string;
  sendGridFromEmail: string;
  frontendUrl: string;
}

export default (): Environment => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: String(process.env.MONGODB_URI),
  jwtSecret: String(process.env.JWT_SECRET),
  sendGridApiKey: String(process.env.SENDGRID_API_KEY),
  sendGridFromEmail: String(process.env.SENDGRID_FROM_EMAIL),
  frontendUrl: String(process.env.FRONTEND_URL),
});
