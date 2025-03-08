import React, { useState, useEffect } from "react";
import socket from "../socket";
import axios from "axios";

const Chat = () => {
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [joinedRoom, setJoinedRoom] = useState(null);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("user");
        if (!storedEmail) {
            console.warn("⚠️ Missing user email! Redirecting...");
            alert("Please log in to use the chat.");
            return;
        }
    
        setUserEmail(storedEmail);
    
        const handleMessage = (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        };
    
        socket.off("receiveMessage", handleMessage); // Prevent duplicate listeners
        socket.on("receiveMessage", handleMessage);
    
        return () => {
            socket.off("receiveMessage", handleMessage);
        };
    }, []);
    

    const joinRoom = async () => {
        if (!room.trim() || room === joinedRoom) return;

        if (joinedRoom) {
            socket.emit("leaveRoom", joinedRoom);
        }

        socket.emit("joinRoom", room);
        setJoinedRoom(room);

        try {
            const { data } = await axios.get(`http://localhost:5000/api/messages/${room}`);
            setMessages(data);
        } catch (error) {
            console.error("⚠️ Error fetching messages:", error);
        }
    };

    const sendMessage = async () => {
        if (!message.trim() || !joinedRoom || !userEmail) {
            console.warn("⚠️ Message, room, or user email missing!");
            return;
        }

        const newMessage = { sender: userEmail, content: message, room: joinedRoom };

        try {
            socket.emit("sendMessage", newMessage);
            await axios.post("http://localhost:5000/api/messages/send", newMessage, {
                headers: { "Content-Type": "application/json" },
            });
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        } catch (error) {
            console.error("🔥 Error sending message:", error);
        }

        setMessage("");
    };

    return (
        <div>
            <h2>Chat Room</h2>
            <p>Logged in as: <strong>{userEmail || "Guest"}</strong></p>
            
            <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Enter room name..."
            />
            <button onClick={joinRoom} disabled={!room.trim()}>
                {joinedRoom ? "Switch Room" : "Join Room"}
            </button>

            {joinedRoom && (
                <>
                    <h3>Room: {joinedRoom}</h3>
                    <div style={{ border: "1px solid black", height: "300px", overflowY: "scroll", padding: "10px" }}>
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <p key={index}>
                                    <strong>{msg.sender}:</strong> {msg.content}
                                </p>
                            ))
                        ) : (
                            <p>No messages yet...</p>
                        )}
                    </div>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </>
            )}
        </div>
    );
};

export default Chat;
