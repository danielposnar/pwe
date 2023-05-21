const {
    getAllUsersConversations,
    createNew
  } = require("../controllers/conversationController");

const router = require('express').Router();
router.get("/allusersconversations/:id", getAllUsersConversations);
router.post("/createnewconversation", createNew);
module.exports = router;