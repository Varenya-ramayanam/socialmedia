import { useState } from "react";
import { Send } from "lucide-react";

const ChatRoom = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [joinedRoom, setJoinedRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const joinRoom = () => {
    if (roomNumber.trim()) {
      setJoinedRoom(roomNumber);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "You" }]);
      setMessage("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {!joinedRoom ? (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Join a Chatroom</h2>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            placeholder="Enter Room Number"
            className="border p-2 rounded-md w-64 text-center"
          />
          <button
            onClick={joinRoom}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Join Room
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Room #{joinedRoom}</h2>
          <div className="h-64 overflow-y-auto border p-4 rounded-md bg-gray-100">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">No messages yet...</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-2 rounded-md max-w-xs ${
                    msg.sender === "You"
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-300 text-black self-start"
                  }`}
                >
                  <p className="text-sm">{msg.sender}: {msg.text}</p>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="border p-2 rounded-md flex-grow"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
            >
              <Send size={18} className="mr-1" /> Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
