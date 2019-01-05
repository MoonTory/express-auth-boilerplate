export const {
  APP_PORT = process.env.PORT || 5000,
  NODE_ENV = 'dev',
  JWT_SECRET = 'superdupersectret',
  GOOGLE_CLIENT_ID = '',
  GOOGLE_CLIENT_SECRET = '',


  DB_USER = '',
  DB_PASS = '',
  DB_HOST = '',
  DB_PORT = '',
  DB_NAME = '',
  MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
} = process.env
