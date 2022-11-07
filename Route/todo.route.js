const { todoOperations } = require("../Controller/todo.controller")

const { Router } = require("express")

const routeTodo = Router()
const jwt = require("jsonwebtoken")
require("dotenv").config()
const authentication = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { email } = decoded;
        req.body.email = email;
        next()
    }
    catch (err) {
        res.send({ "msg": "please login" })
    }
}
routeTodo.get("/", todoOperations.getTodo)
routeTodo.get("/:id", authentication, todoOperations.getTodoById)
routeTodo.post("/add", authentication, todoOperations.postTodo)
routeTodo.put("/:id", authentication, todoOperations.putTodo)
routeTodo.delete("/:id", authentication, todoOperations.deleteTodo)

module.exports = {
    routeTodo
}