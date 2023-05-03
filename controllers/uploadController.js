const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const os = require('os');
const path = require('path');

const uploadImage = (req, res, next) => {
    if (!req.file.path) {
        res.status(200).json("")
    }

    else {
        res.status(200).json(req.file.path)
    }
}

const uploadAudio = async (req, res) => {

    console.log(req.file)
    try {
        const { buffer, originalname } = req.file;

        const tempFilePath = path.join(os.tmpdir(), originalname);
        await fs.promises.writeFile(tempFilePath, buffer);

        const result = await cloudinary.uploader.upload(tempFilePath);
        console.log(result);

        await fs.promises.unlink(tempFilePath); // remove the temporary file

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};


module.exports = { uploadImage, uploadAudio }