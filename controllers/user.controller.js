const User = require("../models/User.model")
const Post = require("../models/Post.model")

const listAllPeople = (req, res) => {
    User
        .find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: err.message }))
}

const listHomePageUsers = (_req, res) => {
    User
        .find({ username: { $in: ["もも", "あみ", "ペドロ"] } })
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: err.message }))
}

const getUserClasses = (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .populate({
            path: "classes",
            populate: {
                path: "teacher"
            }
        })
        .then(users => res.status(200).json(users.classes))
        .catch(err => res.status(500).json({ error: err.message }))
}

const getUserFriends = (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .populate("penfriends")
        .then(user => res.status(200).json(user.penfriends))
        .catch(err => res.status(500).json({ error: err.message }))
}

const getUserMatch = async (req, res) => {
    const { id } = req.params

    const mainUser = await User.findById(id)

    const mainUserInterests = mainUser.interests

    const userInterestsSet = new Set(mainUserInterests)

    const targetLanguage = mainUser.language === "Spanish" ? "Japanese" : "Spanish"

    const matchUser = await User.find({ _id: { $ne: id, $nin: mainUser.matches }, language: targetLanguage }).then(users => {
        let total = 0
        let ans = null

        users.forEach(user => {
            let acc = 0
            for (interest of user.interests) {
                if (userInterestsSet.has(interest)) acc++
            }

            if (acc > total) {
                total = acc
                ans = user
            }
        })

        return ans
    })

    if (matchUser) {
        await User.findByIdAndUpdate(id, { $addToSet: { matches: matchUser._id } })
    }

    res.status(200).json(matchUser)
}

const getOneUser = (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .populate([{
            path: "classes",
            populate: {
                path: "teacher"
            }
        },
        {
            path: "reviews",
            populate: {
                path: "author"
            }
        }]
        )
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err.message }))
}

const getPopulatedUser = (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .populate([{
            path: "matches",
        },
        {
            path: "classes",
            populate: {
                path: "teacher"
            }
        },
        {
            path: "penfriends",
        },
        {
            path: "reviews",
            populate: {
                path: "author"
            }
        }
        ]
        )
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err.message }))
}

const getNearUsers = (req, res) => {
    const { userId } = req.params
    const { coordinates } = req.body

    User.find({
        _id: { $ne: userId },
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates
                },
                $maxDistance: 50000
            }
        }
    })
        .populate([
            {
                path: "posts",
                populate: {
                    path: "author"
                }
            },
            {
                path: "classes",
                populate: {
                    path: "teacher"
                }
            }
        ])
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: err.message }))
}

const editUser = (req, res) => {
    const { id } = req.params
    const { username, email, avatar, language, age, interests, location } = req.body

    User
        .findByIdAndUpdate(id, { username, email, avatar, language, age, interests, location }, { new: true })
        .then(editedUser => {
            const newToken = editedUser.signToken()
            res.status(200).json({ newToken })
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

const makeFriend = (req, res) => {
    const { friend_id, id } = req.params

    User
        .findByIdAndUpdate(id, { $addToSet: { penfriends: friend_id } }, { new: true })
        .then(userWithFriends => {
            res.status(200).json(userWithFriends)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

const unfollowFriend = (req, res) => {
    const { friend_id, id } = req.params

    User
        .findByIdAndUpdate(id, { $pull: { penfriends: friend_id } }, { new: true })
        .then(updatedUser => res.status(200).json(updatedUser))
        .catch(err => res.status(500).json({ error: err.message }))
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        await User.findByIdAndDelete(id)
        await Post.deleteMany({ author: id })
        await Message.deleteMany({ sender: id })
        res.sendStatus(200)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { listAllPeople, getNearUsers, listHomePageUsers, getUserClasses, getUserFriends, getUserMatch, getOneUser, getPopulatedUser, editUser, deleteUser, makeFriend, unfollowFriend }