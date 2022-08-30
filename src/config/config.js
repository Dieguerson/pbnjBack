const { MONGO_URL } = process.env

const settings = {
  mongoDB : {
    url: MONGO_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    }
  }
}

module.exports = settings