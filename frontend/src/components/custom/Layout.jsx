import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16"> {/* Push content down so it doesn't overlap with navbar */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
