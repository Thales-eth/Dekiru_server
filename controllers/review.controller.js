const Review = require("../models/Review.model")
const User = require("../models/User.model")

const getAllReviews = async (req, res, next) => {
    const { user_id } = req.params

    try {
        const populatedUser = await User
            .findById(user_id)
            .populate("reviews")

        res.status(200).json(populatedUser.reviews)

    } catch (error) {
        err => res.status(500).json({ error: error.message })
    }
}

const getSingleReview = async (req, res) => {
    const { review_id } = req.params

    try {
        const singleReview = await Review.findById(review_id).populate("author")
        res.status(200).json(singleReview)

    } catch (error) {
        err => res.status(500).json({ error: error.message })
    }
}

const createReview = (req, res, next) => {
    const { rating, title, description, author } = req.body
    const { user_id } = req.params

    Review
        .create({ rating, title, description, author })
        .then(({ _id: review_id }) => User.findByIdAndUpdate(user_id, { $addToSet: { reviews: review_id } }, { new: true }).populate("reviews"))
        .then(updatedUser => {
            return updatedUser.calculateScore(updatedUser.reviews)
        })
        .then(user => {
            return user.save()
        })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

const editReview = async (req, res, next) => {
    const { id, reviewed_id } = req.params
    const { rating, title, description } = req.body

    // HAY QUE REACTUALIZAR EL RATING DEL MAN...
    try {
        const updatedReview = await Review.findByIdAndUpdate(id, { rating, title, description }, { new: true })
        // CALCULA SCORE DEL PAVO
        const reviewedUser = await User.findById(reviewed_id).populate("reviews")
        reviewedUser.calculateScore(reviewedUser.reviews)
        await reviewedUser.save()

        res.status(200).json(updatedReview)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteReview = (req, res) => {
    const { id } = req.params
    const { user_id } = req.params

    Review
        .findByIdAndDelete(id)
        .then(() => User.findByIdAndUpdate(user_id, { $pull: { reviews: id } }, { new: true }).populate({ path: "reviews", populate: { path: "author" } }))
        .then(updatedUser => {
            return updatedUser.calculateScore(updatedUser.reviews)
        })
        .then(updatedUser => {
            return updatedUser.save()
        })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
}

module.exports = { getAllReviews, getSingleReview, createReview, editReview, deleteReview } 