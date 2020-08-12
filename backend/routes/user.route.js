import User from '../models/user.model'
import express from 'express'
const router = express.Router()

router.post('/signin', async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  })
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(user)
      
    })
  } else {
    res.status(401).send({ msg: 'Invalid email or password' })
  }
})

router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Harry',
      email: 'harry.smith@gmail.com',
      password: '12345',
      isAdmin: true
    })
    const newUser = await user.save()
    res.send(newUser)
  } catch(err) {
    res.send(err)
  }
})

module.exports = router