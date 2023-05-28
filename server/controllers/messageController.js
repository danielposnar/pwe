const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const conversationId = req.params.id;
    const messages = await Messages.find({ conversationId: conversationId}).sort({ updatedAt: 1 });
    return res.status(200).json(messages);
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

    if (data) return res.status(200).json({ msg: "Message added successfully.", "status": true });
    else return res.status(400).json({ msg: "Failed to add message to the database.", "status": false });
  } catch (ex) {
    next(ex);
  }
};