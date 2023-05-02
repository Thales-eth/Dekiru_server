const { Schema, model } = require("mongoose")

const classSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        minLength: 5
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productId: { type: String, default: "" }
    // STREAMING REQUIREMENTS...
},
    {
        timestamps: true
    }
)

const Class = model("Class", classSchema)

module.exports = Class
