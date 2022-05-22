const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const postRouter = require('./routes/posts')



app.use(bodyParser.json({
    limit: "30mb",
    extended:true
}))

app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}))

//Cors should be above your middlewares
app.use(cors())








app.use('/posts', postRouter)




const CONNECTION_URL = 'mongodb+srv://kulklex:adekunle08118082878@cluster0.jooda.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000


mongoose.connect(CONNECTION_URL, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}...`)))
.catch((err) => {console.error(err.message)})

