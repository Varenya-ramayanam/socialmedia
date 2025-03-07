import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/auth/Signup";
import LoginForm from "./components/auth/Login";
import { useAuth } from "./context/AuthProvider";
import HomePage from "./pages/home/HomePage";
import Navbar from "./components/custom/Navbar";
import ProfilePage from "./pages/Profile";
import ChatRoom from "./pages/Chat";

function App() {
  const { user: authUser } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
