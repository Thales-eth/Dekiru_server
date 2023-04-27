const Class = require("../models/Class.model")
const User = require("../models/User.model")

const getClasses = (req, res) => {
    const { skipValue } = req.params

    Class
        .find()
        .populate("teacher")
        .sort({ createdAt: -1 })
        .skip(skipValue)
        .limit(4)
        .then(classes => res.status(200).json(classes))
        .catch(err => res.status(500).json({ error: err.message }))
}

const getOneClass = (req, res, next) => {
    const { class_id } = req.params

    Class
        .findById(class_id)
        .then(singleClass => res.status(200).json(singleClass))
        .catch(err => res.status(500).json({ error: err.message }))
}

const createClass = async (req, res, next) => {
    const { title, description, teacher } = req.body

    try {
        const singleTeacher = await User.findById(teacher)
        const createdClass = await Class.create({ title, description, teacher })
        const newUser = await User.findByIdAndUpdate(singleTeacher._id, { $addToSet: { classes: createdClass._id } }, { new: true })
        console.log("EL NUEVO USERINNOO ===>", newUser)
        res.sendStatus(201)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const joinClass = (req, res, next) => {
    const { class_id, user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { classes: class_id } })
        .then(() => res.status(200).json({ msg: "successfully joined the class" }))
        .catch(err => res.status(500).json({ error: err.message }))
}

const leaveClass = (req, res, next) => {
    const { class_id, user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { classes: class_id } })
        .then(() => User.findById(user_id).populate({ path: "classes", populate: { path: "teacher" } }))
        .then(user => res.status(200).json(user.classes))
        .catch(err => res.status(500).json({ error: err.message }))
}

const editClass = (req, res) => {
    const { class_id } = req.params
    const { title, description, teacher } = req.body

    Class
        .findByIdAndUpdate(class_id, { title, description, teacher }, { new: true })
        .then(updatedClass => res.status(200).json(updatedClass))
        .catch(err => res.status(500).json({ error: err.message }))
}

const deleteClass = (req, res) => {
    const { class_id, teacher_id } = req.params

    Class
        .findByIdAndDelete(class_id)
        .then(() => User.findByIdAndUpdate(teacher_id, { $pull: { classes: teacher_id } }))
        .then(() => Class.find().populate("teacher"))
        .then(allClasses => res.status(200).json(allClasses))
        .catch(err => res.status(500).json({ error: err.message }))
}


module.exports = { getClasses, getOneClass, createClass, joinClass, leaveClass, editClass, deleteClass }