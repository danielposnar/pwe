const Conversation = require("../models/conversationModel");

module.exports.createNew = async (req, res, next) => {
  try {
    const { conversationName, userIds} = req.body;
    const conversation = await Conversation.create({
      conversationName,
      userIds,
    });
    return res.status(201).json({ status: true, conversation });
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
      return res.status(200).json(conversations);
    } catch (ex) {
      next(ex);
    }
  };