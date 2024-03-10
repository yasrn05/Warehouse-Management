require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const  connection = require('./config/database')

const app = express()
const port = process.env.PORT || 3001;
const hostname = process.env.HOST_NAME;

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

configViewEngine(app)

app.use('/', webRoutes)

app.listen(port,hostname, () => {
  console.log(`Example app listening on port ${port}`)
})