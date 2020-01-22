const jwt = require("jsonwebtoken")
const { jwtSecret } = require("./config/secrets")

const protectedRoute = () => (req, res, next) => {
  const notAllowed = { message: "You shall not pass!" }
  const token = req.headers.authorization
  if (!token) {
    res.status(401).json(notAllowed)
  }
  jwt.verify(token, jwtSecret, (err, { id, email, username }) => {
    if (err) {
      res.status(401).json(notAllowed)
    } else {
      req.user = {
        id,
        email,
        username
      }
    }
  })
  next()
}

module.exports = { protectedRoute }
