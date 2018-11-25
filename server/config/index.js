export const {
  APP_PORT = process.env.PORT || 5001,
  NODE_ENV = 'dev',
  JWT_SECRET = 'superdupersectret',


  DB_USER = 'moontory',
  DB_PASS = 'tsuki951',
  DB_HOST = 'ds143573.mlab.com',
  DB_PORT = '43573',
  DB_NAME = 'tsuki-dev',
  MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
} = process.env
