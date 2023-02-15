const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const postRouter = require('./routes/posts')
const userRoutes = require("./routes/user")

dotenv.config()

app.use(bodyParser.json({
    limit: "30mb",
    extended:true
}))

app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}))

//Cors should be above your middleware
app.use(cors())

app.get('/', (req, res) => {
    res.send("APP IS RUNNING")
})




app.use('/posts', postRouter)
app.use('/users', userRoutes)


const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000


mongoose.connect(CONNECTION_URL, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}...`)))
.catch((err) => {console.error(err.message)})

