const { addMessage, getMessages } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmessage/", addMessage);
router.get("/getmessages/:id", getMessages);

module.exports = router;