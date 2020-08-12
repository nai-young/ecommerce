import data from '../frontend/src/data'
import express from 'express'
import dotenv from 'dotenv'
import config from './config'
import mongoose from 'mongoose'
import userRoute from './routes/user.route'

dotenv.config()

const mongodbUrl = config.MONGODB_URL
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(err => console.log(err.reason))

const app = express()

app.use('/users', userRoute)

app.get('/products/:id', (req, res) => {
  const productId = req.params.id
  const product = data.products.find(x => x._id === productId)
  if (product) res.send(product)
  res.status(404).send({ msg: 'Product not found' })
})
app.get('/products', (req, res) => {
  res.send(data.products)
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))