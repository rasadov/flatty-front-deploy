// src/pages/Profile.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { notify } from "../components/Notification";

const schema = yup.object({
  fullName: yup.string().required("Ad və Soyad tələb olunur"),
  phoneNumber: yup.string().required("Telefon nömrəsi tələb olunur"),
  email: yup
    .string()
    .email("Düzgün email daxil edin")
    .required("Email tələb olunur"),
});

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Profil məlumatları:", data);
    notify("Profil məlumatlarınız yeniləndi!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Profil Məlumatları
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-gray-600">Ad və Soyad</label>
          <input
            type="text"
            {...register("fullName")}
            className="input"
            placeholder="Roberto Baggio"
          />
          <p className="text-red-500">{errors.fullName?.message}</p>
        </div>
        <div>
          <label className="text-gray-600">Telefon Nömrəsi</label>
          <input
            type="text"
            {...register("phoneNumber")}
            className="input"
            placeholder="+994501234567"
          />
          <p className="text-red-500">{errors.phoneNumber?.message}</p>
        </div>
        <div>
          <label className="text-gray-600">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input"
            placeholder="roberto@example.com"
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Yenilə
        </button>
      </form>
    </div>
  );
};

export default Profile;
