
const { Router } = require("express")
const { authOperations } = require("../Controller/auth.controller")
const routeAuth = Router()


routeAuth.post("/signup", authOperations.signupUser)
routeAuth.post("/login", authOperations.LoginUser)

module.exports = {
    routeAuth
}