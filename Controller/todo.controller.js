const { TodoModel } = require("../Model/todo.model")


const getTodo = async (req, res) => {
    const data = await TodoModel.find()
    res.send(data)
}
const postTodo = async (req, res) => {
    const payload = req.body;
    const data = await TodoModel.insertMany([payload])
    res.send(data)
}
const putTodo = async (req, res) => {
    const id = req.params.id;
    await TodoModel.updateOne({ _id: id }, { $set: req.body })
    res.send({ "msg": "data udpated" })
}

const deleteTodo = async (req, res) => {
    const id = req.params.id;

    await TodoModel.deleteOne({ _id: id })
    res.send({ "msg": "data deleted" })
}
const getTodoById = async (req, res) => {
    const id = req.params.id;
    const data = await TodoModel.findOne({ _id: id })
    res.send(data)

}
const getTodoByparams = async (req, res) => {
    const query = req.query.status;
    const data = await TodoModel.find({ status: query })
    res.send(data)
}

const todoOperations = { getTodo, postTodo, putTodo, deleteTodo, getTodoById, getTodoByparams }

module.exports = {
    todoOperations
}