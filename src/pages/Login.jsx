// src/pages/Login.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { notify } from "../components/Notification";

const schema = yup.object({
  email: yup
    .string()
    .email("Düzgün email daxil edin")
    .required("Email tələb olunur"),
  password: yup
    .string()
    .min(6, "Şifrə ən az 6 simvol olmalıdır")
    .required("Şifrə tələb olunur"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    notify("Uğurla daxil oldunuz!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Daxil Ol</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <div>
          <label className="text-gray-600">Şifrə</label>
          <input
            type="password"
            {...register("password")}
            className="input"
            placeholder="********"
          />
          <p className="text-red-500">{errors.password?.message}</p>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Daxil ol
        </button>
      </form>
    </div>
  );
};

export default Login;
