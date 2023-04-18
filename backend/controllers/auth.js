const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email.toLowerCase()});

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({
                userId: user._id,
                email
            }, process.env.TOKEN_KEY, {expiresIn: "24h"});

            return res.status(200).json({
                userData: {
                    email: user.email,
                    token: token,
                    username: user.username,
                    _id: user._id
                }
            });
        }

        return res.status(400).json({error: "Invalid credentials."});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
};

const postRegister = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const user = await User.exists({email: email.toLowerCase()});

        if (user) {
            return res.status(409).json({error: "E-mail already in use."});
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({username, password: encryptedPassword, email: email.toLowerCase()});

        const token = jwt.sign({
            userId: newUser._id,
            email
        }, process.env.TOKEN_KEY, {expiresIn: "10h"});
        res.status(201).json({
            userData: {
                email: newUser.email,
                token: token,
                username: newUser.username,
                _id: newUser._id
            }
        });
        // newUser.save()
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error occured."});
    }
};
const authControllers = {
    postLogin,
    postRegister
};

module.exports = authControllers;
