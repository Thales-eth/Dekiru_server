const { Schema, model } = require("mongoose")

const reviewSchema = new Schema({
    rating: {
        type: Number,
        max: 5,
        min: 1
    },
    title: {
        type: String,
    },
    description: {
        type: String,
        minLength: 5
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},
    {
        timestamps: true
    }
)

const Review = model("Review", reviewSchema)

module.exports = Review
