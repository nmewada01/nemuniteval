const express = require("express")
const { routeAuth } = require("./Route/auth.route")
const { routeTodo } = require("./Route/todo.route")
const app = express()
require("dotenv").config()
const port = process.env.PORT
const cors = require("cors")
const { connection } = require("./Config/db")
app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Welcome to the Unit Evaluation")
})
app.use("/todo", routeTodo)
app.use("/auth", routeAuth)

app.listen(port, async (req, res) => {
    try {
        await connection,
            console.log("database connected")
    }
    catch (err) {
        console.log("error in db")
        console.log(err)
    }
    console.log("listening at " + port)
})
