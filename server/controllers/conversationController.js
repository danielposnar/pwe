const Conversation = require("../models/conversationModel");
const bcrypt = require("bcrypt");

module.exports.createNew = async (req, res, next) => {
  try {
    const { conversationName, userIds} = req.body;
    const conversation = await Conversation.create({
      conversationName,
      userIds,
    });
    return res.json({ status: true, conversation });
  } catch (ex) {
    next(ex);
  }

};

module.exports.getAllUsersConversations = async (req, res, next) => {
    try {
      const userId = req.params.id;
      
      const conversations = await Conversation.find({ userIds: userId }).select([
        "conversationName",
        "userIds",
        "_id",
      ]);
      return res.json(conversations);
    } catch (ex) {
      next(ex);
    }
  };