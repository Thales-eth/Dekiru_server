const uploadImage = (req, res, next) => {
    if (!req.file.path) {
        res.status(200).json("")
    }

    else {
        res.status(200).json(req.file.path)
    }
}

const uploadAudio = (req, res) => {
    console.log(req.file)

    if (!req.file.path) {
        res.status(400).json({ error: "No file uploaded" });
    } else {
        res.status(200).json({ url: req.file.path });
    }
};


module.exports = { uploadImage, uploadAudio }