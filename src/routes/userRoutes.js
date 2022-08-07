const {auth, isUser} = require("../middleware/authMiddleware")
const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.route("/").get(userController.getAllUsers);
router.get("/user", auth, isUser, userController.getLoggedInUser);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.route("/:id").get(auth, userController.getOneUser).patch(auth, isUser, userController.updateUser).delete(auth, isUser, userController.deleteUser);


module.exports = router;