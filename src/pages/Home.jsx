// src/pages/Home.jsx

import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="max-w-3xl p-6 mx-auto mt-8 bg-white rounded-lg shadow">
      <h1 className="mb-8 text-4xl font-semibold text-center text-gray-800">
        Flatty
      </h1>

      <div className="flex flex-col flex-wrap justify-center flex-grow gap-4 align-middle">
        <Link
          to="/login"
          className="flex-col flex-wrap justify-center flex-grow gap-4 text-white align-middle transition-colors hover:text-gray-900 focus:text-gray-900 lex"
        >
          <Button
            type="button"
            variant="primary"
            className={"w-full px-5 py-[8.7px]"}
          >
            Sign in
          </Button>
        </Link>
        <Link to={"/register"} className="">
          <Button variant="secondary" className="w-full px-5 py-[8.7px]">
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
