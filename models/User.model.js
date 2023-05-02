const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs")
const saltRounds = +process.env.SALT
const jwt = require('jsonwebtoken')


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "A username is needed!"],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, "An email is needed"],
      unique: true,
      minLength: 1,
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Choose a valid email"
      ]
    },
    password: {
      type: String,
      required: [true, "A password is needed!"],
      minLength: [1, "Password too short"]
      // match: [/^(?=.*[0-9]).{8,}$/, "Password must be 8 characters long and contain at least one number"]
    },
    avatar: {
      type: String,
      default: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80",
      set: (value) => !value ?
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80"
        :
        value
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      }
    },
    age: { type: Number, min: 16 },
    role: { type: String, enum: ["Admin", "Student", "Teacher"] },
    language: { type: String, enum: ["Spanish", "Japanese"] },
    interests: [{ type: String }],
    penfriends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    conversations: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
    matches: [{ type: Schema.Types.ObjectId, ref: "User" }],
    classes: [{ type: Schema.Types.ObjectId, ref: "Class" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    score: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {

  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPwd = await bcrypt.hash(this.password, salt)
    this.password = hashedPwd
    next()
  }
  catch (error) {
    next(error)
  }
})

userSchema.index({ location: '2dsphere' })

userSchema.methods.calculateScore = function (reviews) {

  let totalScore = 0

  if (reviews.length) {
    totalScore = reviews.reduce((acc, curr) => {
      return acc + curr.rating
    }, 0)

    this.score = Math.round(totalScore / reviews.length)
  }

  return this
}

userSchema.methods.comparePassword = function (plainPwd) {
  return bcrypt.compareSync(plainPwd, this.password)
}

userSchema.methods.signToken = function () {
  const { _id, email, username } = this;
  const payload = { _id, email, username }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "48h" }
  )

  return authToken
}

const User = model("User", userSchema);

module.exports = User;
