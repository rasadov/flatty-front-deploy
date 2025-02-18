import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { notify } from "../components/Notification";
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { addToWishlist } from "../store/slices/wishlistSlice";
import { Button, Input } from "../components";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        console.log("Login started");
        await dispatch(loginUser(data)).unwrap();
        console.log("Login successful");
        notify("Sign in Success");
        const { from, item } = location.state || { from: { pathname: "/" } };
        if (item) {
          dispatch(addToWishlist(item));
          notify("Item added to wishlist");
        }
        navigate(from);
        console.log("Login successful");
        console.log(from);
        reset();
      } catch (error) {
        notify(error.message || "Login failed");
      }
    },
    [dispatch, navigate, reset, location]
  );

  const handleCancel = () => {
    notify("Sign in cancelled");
    reset();
    navigate("/");
  };

  return (
    <motion.div
      className="max-w-md p-8 mx-auto  bg-white border shadow-md rounded-[18px] mt-[65%] sm:mt-[15%]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1
        style={{
          color: "rgba(15, 29, 64, 1)",
          fontSize: "28px",
          fontWeight: "600",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        Sign in
      </h1>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Input
            type="email"
            error={errors.email}
            {...register("email")}
            placeholder="Email"
            className="w-full border-none bg-white"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Input
            type="password"
            error={errors.password}
            {...register("password")}
            placeholder="Password"
            className="w-full border-none bg-white"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            className="w-full mt-[39px!important] px-5 py-[8.7px]"
            style={{
              borderRadius: "3px",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Sign in
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/register")}
            className="w-full px-5 py-[8.7px]"
            style={{
              borderRadius: "3px",
              border: "1px solid rgba(166, 115, 239, 1)",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Sign up
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button
            type="button"
            variant="cancel"
            onClick={handleCancel}
            className="w-full px-5 py-[8.7px]"
            style={{
              borderRadius: "3px",
              border: "1px solid rgba(202, 205, 213, 1)",
              background: "rgba(255, 255, 255, 1)",
              color: "rgba(82, 92, 118, 1)",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Cancel
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default Login;
