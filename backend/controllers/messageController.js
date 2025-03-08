const Message = require('../models/Message');

const sendMessage = async (req, res) => {
    const { sender, content, room } = req.body;
    try {
        const message = new Message({ sender, content, room });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ room: req.params.room }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { sendMessage, getMessages };
