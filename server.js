const express = require('express')
require('dotenv').config()  //init dotenv
const morgan = require('morgan')
const helmet = require('helmet')

const mongoConfig = require('./config/mongoConfig')
const contactRouter = require('./routes/contactRouter')
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouther')

const app = express()
const PORT = 5005

//middlewhere
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

// routers
app.use('/contacts', contactRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) =>{
    res.status(200).json("Welcome to my API!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoConfig()
})