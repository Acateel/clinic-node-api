import dotenv from 'dotenv'
import express from 'express'

//read .env file
dotenv.config()

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Express work correct' })
})

app.listen(port, () => {
  console.log(`[SERVER]: Server is running at http://localhost:${port}`)
})
