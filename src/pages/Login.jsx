import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { notify } from "../components/Notification";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import Input from "../components/İnput";
import Button from "../components/Button";

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
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    (data) => {
      console.log(data);
      notify(t("Sign in Success"));
      navigate("/home");
      reset();
    },
    [navigate, reset, t]
  );
  const HandleCancel = () => {
    notify(t("Sign in cancelled"));
    reset();
    navigate("/");
  };
  return (
    <motion.div
      className="max-w-md p-8 mx-auto mt-8 bg-white border shadow-md rounded-[18px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-6 text-4xl font-semibold text-center text-gray-800">
        {t("Sign in")}
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
            className="w-full"
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
            className="w-full"
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
          >
            {t("Sign in")}
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
          >
            {t("Sign up")}
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
            onClick={() => HandleCancel()}
            className="w-full px-5 py-[8.7px]"
          >
            {t("Cancel")}
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default Login;
