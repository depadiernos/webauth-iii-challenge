const express = require("express")
const usersModel = require("../models/users-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const users = await usersModel.find(req.user.department)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

module.exports = router
