import express from 'express'
import dotenv from 'dotenv'
import dataRoutes from './routes/dataRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/data', dataRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 500

app.listen(
  5000,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
