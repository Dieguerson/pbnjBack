const { NODE_ENV } = process.env

const MONGO_URL = NODE_ENV === "DEV" ? process.env.MONGO_URL_DEV : process.env.MONGO_URL_PROD

const settings = {
  mongoDB : {
    url: MONGO_URL || process.env.MONGO_URL_PROD,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    }
  }
}

module.exports = settings