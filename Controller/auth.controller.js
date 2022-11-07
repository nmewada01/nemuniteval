
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { AuthModel } = require("../Model/auth.model");
require("dotenv").config()
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const checkUser = await AuthModel.findOne({ email: email })
    if (checkUser) {
        res.send({ "msg": "User already exist. please try loggin in" })
    } else {
        bcrypt.hash(password, 4, async function (err, hash) {
            if (err) {
                res.send({ "msg": "something went wrong. please try again later" })
            } else {
                const new_user = new AuthModel({
                    email: email,
                    password: hash,
                    ip: ip

                })
                await new_user.save()
                res.send({ "msg": "signup successfully" })
            }
        });
    }


}
const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await AuthModel.findOne({ email })
    const hash = user.password
    bcrypt.compare(password, hash).then(function (result) {
        if (result) {
            const token = jwt.sign({ email: email }, process.env.SECRET_KEY);
            res.send({ "msg": "Login Successfully", "token": token })
        } else {
            res.send({ "msg": "Login failed" })
        }
    });
}
const authOperations = { signupUser, LoginUser }

module.exports = {
    authOperations
}