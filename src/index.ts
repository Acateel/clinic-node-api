import dotenv from 'dotenv'
//read .env file
dotenv.config()

import app from './app'
import dataSourse from './database/dataSourse'

// init data sourse
dataSourse
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

const port = process.env.PORT
// Start server
app.listen(port, () => {
  console.log(`[SERVER]: Server is running at http://localhost:${port}`)
})
