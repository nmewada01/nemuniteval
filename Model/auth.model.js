const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    ip: { type: String, required: true },
    role: { type: String, default: "user" }
})
const AuthModel = mongoose.model("authuser", authSchema)

module.exports = {
    AuthModel
}