import express from 'express'
const app = express()

app.get('/products', (req, res) => {
  res.send(data.products)
})