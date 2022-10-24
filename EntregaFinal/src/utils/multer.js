const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "public/avatars")
  },
  filename: (req, file, cb) => {
    const { userName } = req.body
    cb(null, "avatar_" + userName + "_" + file.originalname)
  }
})

const upload = multer({storage: storage})

const pathFormatter = (path) => {
  const deform = path.split('\\')
  deform.shift()
  const reform = deform.join('/')
  
  return `/${reform}`
}

module.exports = { upload, pathFormatter}