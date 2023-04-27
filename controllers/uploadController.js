const uploadImage = (req, res, next) => {
    if (!req.file.path) {
        res.status(200).json("")
    }

    else {
        res.status(200).json(req.file.path)
    }
}

module.exports = { uploadImage }