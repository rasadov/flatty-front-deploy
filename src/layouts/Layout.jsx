// src/layouts/Layout.jsx
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 p-4 text-white">Header</header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gray-800 p-4 text-white">Footer</footer>
    </div>
  );
};

export default Layout;
