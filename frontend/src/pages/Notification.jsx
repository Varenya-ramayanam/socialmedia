import { useState } from "react";
import { Bell, CheckCircle, MessageCircle, UserPlus } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "friend_request", message: "John Doe sent you a friend request.", icon: <UserPlus size={20} />, read: false },
    { id: 2, type: "message", message: "Alice sent you a new message.", icon: <MessageCircle size={20} />, read: false },
    { id: 3, type: "task_complete", message: "You completed your daily goal! 🎯", icon: <CheckCircle size={20} />, read: true },
    { id: 4, type: "general", message: "New app update available!", icon: <Bell size={20} />, read: true },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">No new notifications.</p>
      ) : (
        <ul>
          {notifications.map((notif) => (
            <li key={notif.id} className={`flex items-center gap-3 p-3 border-b ${notif.read ? "bg-gray-100" : "bg-white"}`}>
              <div className="text-blue-500">{notif.icon}</div>
              <p className="flex-1">{notif.message}</p>
              {!notif.read && (
                <button onClick={() => markAsRead(notif.id)} className="text-sm text-blue-600 underline">
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
