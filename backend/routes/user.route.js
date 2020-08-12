import User from '../models/user.model'
import express from 'express'
const router = express.Router()

router.get('/users/createadmin', async (req, res) => {
  const user = new User({
    name: ''
  })
})