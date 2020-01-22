const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const authRouter = require("./routes/auth-router")
const usersRouter = require("./routes/users-router")
const { protectedRoute } = require("./middleware")

const server = express()
const port = process.env.PORT || 4000

server.use(helmet())
server.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
)

server.use("api/users", protectedRoute(), usersRouter)
server.use("api/", authRouter)

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ message: "Something went wrong" })
})

server.listen(port, () => {
  console.log(`Running backend on http://localhost:${port}`)
})
