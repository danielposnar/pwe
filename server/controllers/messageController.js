const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const conversationId = req.params.id;
    const messages = await Messages.find({ conversationId: conversationId}).sort({ updatedAt: 1 });
    return res.json(messages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { message, conversationId, sender } = req.body;
    const data = await Messages.create({
      message: message,
      conversationId: conversationId,
      sender: sender,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};