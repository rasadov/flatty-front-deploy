import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Footer } from "./Footer";
import { useSelector } from "react-redux";

const Layout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-grow  bg-[#F4F2FF] ">
        <Header key={isLoggedIn ? "logged-in" : "logged-out"} />
        <div className="px-10.26 my-20 mx-auto max-w-[1440px] sm:p-3">
          <Outlet />
        </div>
        <div className="px-6  mx-auto  bg-[#ECE8FF]">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Layout;
