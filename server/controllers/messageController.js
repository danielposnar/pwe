const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const conversation = req.body;
    ges = await Messages.find({ conversation: conversation}).sort({ updatedAt: 1 });
    res.json(messages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, conversation, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      conversation: conversation,
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};