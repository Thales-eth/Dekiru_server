const { Schema, model } = require("mongoose")

const postSchema = new Schema({
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

const Post = model("Post", postSchema)

module.exports = Post
