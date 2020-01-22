const bcrypt = require("bcryptjs")
const db = require("../data/db-config")

const find = (filter) => {
  return db("users")
    .where(filter)
    .select("id", "username", "department")
}

const findById = (id) => {
  return db("users")
    .where({ id })
    .first("id", "username", "department")
}

const add = async (user) => {
  user.password = await bcrypt.hash(user.password, 12)
  const [id] = await db("users").insert(user)
  return findById(id)
}

const verifyUser = async (user) => {
  const userExists = await findById(user.id)
  if (userExists) {
    return true
  } else {
    return false
  }
}
