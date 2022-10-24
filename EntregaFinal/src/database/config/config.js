const { MONGO_URL } = process.env

const settings = {
  mongoDB : {
    url: 'mongodb://localhost:27017/',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    }
  }
}

module.exports = settings