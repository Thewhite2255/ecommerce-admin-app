require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
//const fileUpload = require('express-fileupload')
const path = require('path')

const connectDB = require('./config/db')

const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const categoryRoute = require('./routes/categoryRoute')
const fileRoute = require('./routes/fileRoute')

const app = express()
const port = process.env.PORT || 5000
console.log(process.env.NODE_ENV)

connectDB()

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/products', productRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/auth', authRoute)
app.use('/api/files', fileRoute)

app.get('/', (req, res) => res.send('Server is running!'))
app.listen(port, () => console.log(`Server is listening on port ${port}`))
