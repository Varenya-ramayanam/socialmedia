import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Home, MessageCircle, Bell, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get current route

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">SocialApp</Link>

        {/* Search Bar (Hidden on small screens) */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 rounded-full px-4 py-2 pl-10 text-sm outline-none"
          />
          <Search className="absolute left-3 top-2 text-gray-500" size={18} />
        </div>

        {/* Icons & Profile */}
        <div className="flex items-center gap-6">
          <Link to="/home" className={`cursor-pointer ${location.pathname === "/home" ? "text-blue-600" : ""}`}>
            <Home size={24} />
          </Link>
          <Link to="/chat" className={`cursor-pointer ${location.pathname === "/chat" ? "text-blue-600" : ""}`}>
            <MessageCircle size={24} />
          </Link>
          <Link to="/notifications" className={`cursor-pointer ${location.pathname === "/notifications" ? "text-blue-600" : ""}`}>
            <Bell size={24} />
          </Link>

          {/* Profile Dropdown */}
          <div className="relative dropdown">
            <button onClick={() => setIsOpen(!isOpen)}>
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Logout</button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-14 left-0 w-full">
          <Link to="/" className="block px-4 py-3 hover:bg-gray-100">Home</Link>
          <Link to="/chat" className="block px-4 py-3 hover:bg-gray-100">Messages</Link>
          <Link to="/notifications" className="block px-4 py-3 hover:bg-gray-100">Notifications</Link>
          <Link to="/profile" className="block px-4 py-3 hover:bg-gray-100">Profile</Link>
          <Link to="/settings" className="block px-4 py-3 hover:bg-gray-100">Settings</Link>
          <button className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
