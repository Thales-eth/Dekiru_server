const User = require("../models/User.model")
const jwt = require('jsonwebtoken')

const signup = (req, res, next) => {
    const { username, email, password, language, avatar, role, age, interests, location } = req.body

    User.create({ username, email, password, avatar, language, role, age, interests, location })
        .then(user => {
            const { _id, email, username } = user;
            const payload = { _id, email, username }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "12h" }
            )

            res.status(200).json({ authToken })
        })
        .catch(err => {
            next(err)
        })
}

const login = (req, res, next) => {

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ err: ["Provide email and password."] });
        return;
    }

    User
        .findOne({ email })
        .then(foundUser => {

            if (!foundUser) {
                res.status(401).json({ err: ["User not found."] })
                return;
            }

            if (foundUser.comparePassword(password)) {

                const { _id, email, username } = foundUser;
                const payload = { _id, email, username }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "48h" }
                )

                res.status(200).json({ authToken })
            }

            else {
                res.status(401).json({ err: ["Incorrect password"] });
            }

        })
        .catch(err => next(err));
}

const getLoggedUser = (req, res) => {
    const { _id: user_id } = req.payload

    User
        .findById(user_id)
        .select("-createdAt -updatedAt -__v")
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

module.exports = { signup, login, getLoggedUser }