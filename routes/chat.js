import express from "express";
import chatController from "../controllers/chatControllers.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const newChat = await chatController.saveChatMessage(
      senderId,
      receiverId,
      message
    );
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route untuk mengambil semua pesan chat
router.get("/chat", async (req, res) => {
  try {
    const chatMessages = await chatController.getAllChatMessages();
    res.status(200).json(chatMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
