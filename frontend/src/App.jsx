import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/auth/Signup";
import LoginForm from "./components/auth/Login";
import { useAuth } from "./context/AuthProvider";
import HomePage from "./pages/home/HomePage";
// import Navbar from "./components/custom/Navbar";
import ProfilePage from "./pages/Profile";
import Chat from "./pages/Chat";
import Notification from "./pages/Notification";
import Layout from "./components/custom/Layout";
function App() {
  const { user: authUser } = useAuth();

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={authUser ? <Layout /> : <LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<Notification/>} />
      </Routes>
    </>
  );
}

export default App;
