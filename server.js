const { default: mongoose } = require('mongoose')
const app = require('./app')
const dotenv = require('dotenv')

dotenv.config()


const {DB_HOST, PORT} = process.env
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(error =>  console.log(error.message))

