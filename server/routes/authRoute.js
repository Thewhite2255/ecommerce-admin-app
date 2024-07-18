const express = require('express')
const router = express.Router()

const {
  callBack,
  oauth,
  authenticate,
  getCurrentUser,
  logoutUser,
} = require('../controllers/authControllers')

router.post('/google/callback', callBack)
router.post('/logout', logoutUser)
router.get('/google/', oauth)
router.get('/user', authenticate, getCurrentUser)

module.exports = router
