const User = require('../models/userModel')
const { OAuth2Client } = require('google-auth-library')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const getCurrentUser = async (req, res) => {
  try {
    const { email, name, picture } = req.user

    const user = { email: email, name: name, picture: picture }

    res.status(200).json({
      success: true,
      message: 'success',
      user,
    })
  } catch (error) {
    console.log(`Error : ${error.message}`)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const logoutUser = async (req, res) => {
  res.clearCookie('token')
  res.status(200).json({
    success: true,
    message: 'Current user logout successfully',
  })
}

const callBack = async (req, res) => {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const redirectUri = process.env.GOOGLE_REDIRECT_URI

    const client = new OAuth2Client(clientId, clientSecret, redirectUri)

    const authorizeUrl = client.generateAuthUrl({
      access_type: 'offline',
      scope: ['email', 'profile'],
      response_type: 'code',
      prompt: 'consent',
    })

    res.status(200).json({
      success: true,
      message: 'Google Auth Url generated successfully',
      url: authorizeUrl,
    })
  } catch (error) {
    console.log(`Error : ${error.message}`)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const oauth = async (req, res) => {
  const code = req.query.code

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI

  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    })

    const { access_token } = response.data

    const userInfoResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    )

    const userInfo = userInfoResponse.data

    let user = await User.findOne({ email: userInfo.email })

    if (!user) {
      user = new User({
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        googleId: userInfo.sub,
      })

      await user.save()
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
    })

    res.redirect('http://localhost:3000')
  } catch (error) {
    console.error('Error during OAuth callback:', error)
    res.status(500).send('Authentication failed')
  }
}

const authenticate = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).send('Access denied. No token provided.')
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = await User.findById(decoded.userId)
    next()
  } catch (error) {
    res.status(400).send('Invalid token.')
  }
}

module.exports = { getCurrentUser, logoutUser, callBack, authenticate, oauth }
