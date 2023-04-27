const router = require("express").Router()
const { getClasses, getOneClass, createClass, joinClass, leaveClass, editClass, deleteClass } = require("../controllers/class.controller")

router.get("/list/:skipValue", getClasses)
router.get("/getOne/:class_id", getOneClass)
router.post("/create", createClass)
router.put("/join/:class_id/:user_id", joinClass)
router.put("/leave/:class_id/:user_id", leaveClass)
router.put("/edit/:class_id", editClass)
router.delete("/delete/:class_id/:teacher_id", deleteClass)

module.exports = router
