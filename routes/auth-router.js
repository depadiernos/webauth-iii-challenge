const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const usersModel = require("../models/users-model")
const { jwtSecret } = require("../config/secrets")

const router = express.Router()

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body
    const newUser =
      username && password
        ? await usersModel.add(req.body)
        : res.status(500).json({ message: "missing username and/or password" })
    res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
})

router.post("/login", async (req, res, next) => {
  const generateToken = (user) => {
    const payload = {
      subject: user.id,
      username: user.username,
      department: user.department
    }
    const options = {
      expiresIn: "1d"
    }
    return jwt.sign(payload, jwtSecret, options)
  }

  try {
    const { username, password } = req.body
    const [user] = await usersModel.findBy({ username })
    const validatePassword = await bcrypt.compare(password, user.password)

    if (user && validatePassword) {
      const token = generateToken(user)
      res.status(200).json({
        message: `It's dangerous to go alone, ${user.username}. Take this token.`,
        token
      })
    } else {
      res.status(401).json({ massage: "You shall not pass!" })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
