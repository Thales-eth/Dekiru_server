const Class = require("../models/Class.model")
const User = require("../models/User.model")
const stripe = require('stripe')(`sk_test_${process.env.STRIPE_API_KEY}`);

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
        .populate({ path: "teacher", populate: { path: "reviews", populate: { path: "author" } } })
        .then(singleClass => res.status(200).json(singleClass))
        .catch(err => res.status(500).json({ error: err.message }))
}

const createClass = async (req, res, next) => {
    const { title, description, teacher } = req.body

    try {
        const singleTeacher = await User.findById(teacher)

        const stripeClass = await stripe.products.create({
            name: title,
            description,
            images: [singleTeacher.avatar],
        });

        const price = await stripe.prices.create({
            unit_amount: 2000,
            currency: 'usd',
            product: stripeClass.id,
        })

        const createdClass = await Class.create({ title, description, teacher, productId: price.id })

        await User.findByIdAndUpdate(singleTeacher._id, { $addToSet: { classes: createdClass._id } }, { new: true })

        res.sendStatus(201)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const joinClass = (req, res) => {
    const { class_id, user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { classes: class_id } })
        .then(() => res.status(200).json({ msg: "successfully joined the class" }))
        .catch(err => res.status(500).json({ error: err.message }))
}

const leaveClass = (req, res) => {
    const { class_id, user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { classes: class_id } }, { new: true })
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
        }
        ]
        )
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err.message }))
}

const editClass = (req, res, next) => {
    const { class_id } = req.params
    const { title, description, teacher } = req.body

    Class
        .findByIdAndUpdate(class_id, { title, description, teacher }, { new: true })
        .then(updatedClass => res.status(200).json(updatedClass))
        .catch(err => res.status(500).json({ error: err.message }))
}

const deleteClass = async (req, res) => {
    const { class_id } = req.params
    console.log("LA CLASEEECITA", class_id)

    try {
        await Class.findByIdAndDelete(class_id)
        const enrolledUsers = await User.find({ classes: class_id })
        console.log("LOS ENROLLED", enrolledUsers)
        enrolledUsers.forEach(async (enrolledUser) => {
            await User.findByIdAndUpdate(enrolledUser._id, { $pull: { classes: class_id } }, { new: true })
        })

        res.sendStatus(200)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}


module.exports = { getClasses, getOneClass, createClass, joinClass, leaveClass, editClass, deleteClass }