export const {
  APP_PORT = process.env.PORT || 5001,
  NODE_ENV = 'dev',
  JWT_SECRET = 'superdupersectret',


  DB_USER = '',
  DB_PASS = '',
  DB_HOST = '',
  DB_PORT = '',
  DB_NAME = '',
  MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
} = process.env
