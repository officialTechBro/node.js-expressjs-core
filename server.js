import express from 'express'
import path from 'path'
import url from 'url'
import posts from './routes/posts.js'
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js'
import notFound from './middleware/notFound.js'

const PORT = process.env.PORT || 8000

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app = express()

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Logger midddleware
app.use(logger)


//setup static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/api/posts', posts)


//Error Handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
})