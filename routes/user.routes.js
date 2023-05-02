const router = require("express").Router()
const { verifyToken } = require("../middlewares/verifyToken")
const { listAllPeople, listHomePageUsers, getNearUsers, getUserClasses, getUserFriends, getUserMatch, getOneUser, getPopulatedUser, editUser, deleteUser, makeFriend, unfollowFriend } = require("../controllers/user.controller")

router.get("/listHomeUsers", listHomePageUsers)
router.get("/listAllPeople", verifyToken, listAllPeople)
router.get("/getUserClasses/:id", verifyToken, getUserClasses)
router.get("/getUserFriends/:id", verifyToken, getUserFriends)
router.get("/getOneUser/:id", verifyToken, getOneUser)
router.get("/getPopulatedUser/:id", verifyToken, getPopulatedUser)
router.get("/getUserMatch/:id", verifyToken, getUserMatch)
router.post("/getNearUsers/:userId", verifyToken, getNearUsers)
router.put("/edit/:id", verifyToken, editUser)
router.put("/makeFriend/:friend_id/:id", verifyToken, makeFriend)
router.put("/unfollow/:friend_id/:id", verifyToken, unfollowFriend)
router.delete("/delete/:id", verifyToken, deleteUser)

module.exports = router
