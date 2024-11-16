import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { notify } from "@components/Notification";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import Input from "../components/İnput";
import Button from "../components/Button";
import {
  CheckSquare,
  CheckSquareFull,
  HouseIcon,
  UserCircle,
  Warning,
} from "../assets/icons";

// Validation Schema
const schema = yup.object({
  role: yup.string().required("Role is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  name: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(
      /^\+\d{5,}$/,
      "Please enter a valid mobile number with country code"
    ),
  password: yup
    .string()
    .min(8, "Use 8 or more characters with a mix of letters, numbers & symbols")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[@$!%*?&#]/, "Must contain a special character")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  serialNumber: yup.string().when("role", {
    is: "agent",
    then: (schema) => schema.required("Serial number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [role, setRole] = useState("buyer");
  const [isHuman, setIsHuman] = useState(false); // State for checkbox
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      role: "buyer",
    },
  });

  const onSubmit = useCallback(
    (data) => {
      if (!isHuman) {
        notify("Please confirm you're not a robot");
        return;
      }
      console.log("Form data:", data);
      notify("Account created successfully!");
      reset();
      navigate("/login");
    },
    [reset, navigate, isHuman]
  );

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setValue("role", selectedRole);
  };
  const handleCancel = () => {
    notify(t("Register Cancelled"));
    reset();
    navigate("/login");
  };
  const handleCheckboxChange = () => {
    setIsHuman((prev) => !prev);
  };

  return (
    <motion.div
      className="max-w-md sm:p-6 p-8 mx-auto mt-2 border shadow-md rounded-[18px] bg-white"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className=" text-3xl font-semibold  text-[#0F1D40]">
        {t("Select Your Role")}
      </h1>
      <div className="flex justify-center my-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full text-stone-950"
        >
          <Button
            type="button"
            variant="cancel"
            className={`text-stone-950 text-sm flex justify-center rounded-l-[3px] items-center space-x-2 px-5 py-[11px] w-full ${
              role === "buyer"
                ? "bg-[#b9bbc1] font-bold text-[#000]"
                : "bg-[#EEEFF2] font-normal text-[#000]"
            }`}
            onClick={() => handleRoleChange("buyer")}
          >
            <UserCircle />
            <span>{t("Buyer")}</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full text-stone-950"
        >
          <Button
            type="button"
            variant="cancel"
            className={`text-stone-950 text-sm flex justify-center items-center rounded-r-lg space-x-2 px-5 py-[11px] w-full ${
              role === "agent"
                ? "bg-[#b9bbc1] font-bold text-[#000]"
                : "bg-[#EEEFF2] font-normal text-[#000]"
            }`}
            onClick={() => handleRoleChange("agent")}
          >
            <HouseIcon />
            <span>{t("Agent")}</span>
          </Button>
        </motion.div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <Input
          type="email"
          error={errors.email}
          {...register("email")}
          placeholder={t("Email")}
          className="w-full"
        />
        <Input
          type="text"
          error={errors.name}
          {...register("name")}
          placeholder={t("Name Surname")}
          className="w-full"
        />
        <Input
          type="text"
          error={errors.mobile}
          {...register("mobile")}
          placeholder={t("Mobile number")}
          className="w-full"
        />
        {role === "agent" && (
          <Input
            type="text"
            error={errors.serialNumber}
            {...register("serialNumber")}
            placeholder={t("Enter Serial Number")}
            className="w-full"
          />
        )}
        <Input
          type="password"
          error={errors.password}
          {...register("password")}
          placeholder={t("Create a password")}
          className="w-full"
        />
        <Input
          type="password"
          error={errors.confirmPassword}
          {...register("confirmPassword")}
          placeholder={t("Confirm password")}
          className="w-full"
        />
        <p className="flex items-center text-[#525C76] text-[10px]">
          <Warning />
          {t(
            "Use 8 or more characters with a mix of letters, numbers & symbols"
          )}
        </p>
        {/* reCAPTCHA with framer-motion animation */}
        <motion.div
          className="flex items-center w-full p-2 py-[21px] space-x-2 border rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="cursor-pointer"
            onClick={handleCheckboxChange}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isHuman ? <CheckSquareFull /> : <CheckSquare />}
          </div>
          <span className="text-gray-600">{t("I'm not a robot")}</span>
        </motion.div>
        {/* Terms agreement */}
        <div className="flex items-center">
          <span className="text-sm text-stone-500">
            {t("By creating an account, you agree to our ")}
            <Link to={""} className="text-stone-950 hover:text-[#8247E5]">
              {t("Terms of use")}
            </Link>{" "}
            {t("and ")}
            <Link to={""} className="text-stone-950 hover:text-[#8247E5]">
              {t("Privacy Policy")}
            </Link>
          </span>
        </div>

        {/* Create account button */}
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          className="w-full mt-[36px!important] px-5 py-[8.7px]"
        >
          {t("Create account")}
        </Button>

        {/* Log in button */}
        <p className="text-sm ">
          <span className="text-stone-500">
            {t("Already have an account? ")}
          </span>
          <Link to={"/login"} className="text-stone-950">
            {t("Log in")}
          </Link>
        </p>

        {/* Cancel button with framer-motion animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            type="button"
            variant="cancel"
            onClick={() => handleCancel()} // Calling the cancel function
            className="w-full px-5 py-[8.7px]"
          >
            {t("Cancel")}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Register;
