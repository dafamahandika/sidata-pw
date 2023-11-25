import Chat from "../models/chat/Chat.js";

const chatController = {
  saveChatMessage: async (senderId, receiverId, message) => {
    try {
      const newChat = new Chat({
        sender: senderId,
        receiver: receiverId,
        message: message,
      });

      await newChat.save();
      return newChat;
    } catch (error) {
      throw error;
    }
  },

  getAllChatMessages: async () => {
    try {
      const chatMessages = await Chat.find().populate(
        "sender receiver",
        "username"
      );
      return chatMessages;
    } catch (error) {
      throw error;
    }
  },
};

export default chatController;
