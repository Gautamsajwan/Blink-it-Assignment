import express from 'express'
import connectDB from './config/mongoDB.js'
import FileRoutes from './routes/FileRoutes.js'
import AuthRoutes from './routes/AuthRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'

const port = process.env.PORT || 5000
const app = express()

// middlewares
app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["Set-Cookie"]
}))
app.use(express.json())
app.use(cookieParser())

// routes
app.get('/', (req, res) => {
    res.json("hello world");
})
app.use('/file', FileRoutes)
app.use('/auth', AuthRoutes)

const startServer = async() => {
    try {
        connectDB()
        app.listen(port, () => {
            console.log(`server is listening on http://localhost:${port}`);
        })
    } catch(error) {
        console.error(error.message)
    }
}

startServer()