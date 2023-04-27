const router = require("express").Router()
const { listAllPeople, listHomePageUsers, getNearUsers, getUserClasses, getUserFriends, getUserMatch, getOneUser, getPopulatedUser, editUser, deleteUser, makeFriend, unfollowFriend } = require("../controllers/user.controller")

router.get("/listHomeUsers", listHomePageUsers)
router.get("/listAllPeople", listAllPeople)
router.get("/getUserClasses/:id", getUserClasses)
router.get("/getUserFriends/:id", getUserFriends)
router.get("/getOneUser/:id", getOneUser)
router.get("/getPopulatedUser/:id", getPopulatedUser)
router.get("/getUserMatch/:id", getUserMatch)
router.post("/getNearUsers/:userId", getNearUsers)
router.put("/edit/:id", editUser)
router.put("/makeFriend/:friend_id/:id", makeFriend)
router.put("/unfollow/:friend_id/:id", unfollowFriend)
router.delete("/delete/:id", deleteUser)

module.exports = router
