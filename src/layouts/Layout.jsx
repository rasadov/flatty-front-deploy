import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Footer } from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-grow  bg-[#F4F2FF]">
        <Header />
        <div className="px-6  mx-auto max-w-[1440px] bg-[#F4F2FF]">
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
