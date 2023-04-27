const Post = require("../models/Post.model")
const User = require("../models/User.model")

const getPosts = (req, res) => {
    const { skipValue } = req.params

    Post
        .find()
        .populate("author")
        .skip(skipValue)
        .limit(4)
        .sort({ createdAt: -1 })
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({ error: err.message }))
}

const getSinglePost = (req, res) => {
    const { post_id } = req.params

    Post
        .findById(post_id)
        .populate("author")
        .then(post => res.status(200).json(post))
        .catch(err => res.status(500).json({ error: err.message }))
}

const createPost = async (req, res) => {
    const { title, description, author } = req.body

    try {
        const createdPost = await Post.create({ title, description, author })
        await User.findByIdAndUpdate(author, { $addToSet: { posts: createdPost._id } }, { new: true })

        res.status(200).json(createdPost)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const editPost = (req, res) => {
    const { id } = req.params
    const { title, description, author } = req.body

    Post
        .findByIdAndUpdate(id, { title, description, author }, { new: true })
        .then(updatedPost => res.status(200).json(updatedPost))
        .catch(err => res.status(500).json({ error: err.message }))
}

const deletePost = (req, res) => {
    const { id } = req.params

    Post
        .findByIdAndDelete(id)
        .then(() => Post.find().populate("author"))
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({ error: err.message }))
}

module.exports = { getPosts, getSinglePost, createPost, editPost, deletePost }  