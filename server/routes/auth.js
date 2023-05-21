const {
    signup,
    login,
    getAllUsers,
    logOut,
  } = require("../controllers/userController");

const router = require('express').Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);
module.exports = router;