// import axios from "axios";

// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Toaster, toast } from "sonner";

// type FormValue = {
//   email: string;
//   password: string;
// };

// const login = () => {
//   const form = useForm<FormValue>();
//   const { register, handleSubmit, formState } = form;
//   const { errors } = formState;
//   const navigate = useNavigate();
//   const [_, setCookie] = useCookies(["acces_token"]);
//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const onSubmit = async (data: FormValue) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/auth/login",
//         data
//       );

//       // Handle success response
//       // console.log("Login successful:", response.data);

//       setCookie("acces_token", response.data.token);
//       window.localStorage.setItem("UserId", response.data.userId);
//       navigate("/");
//     } catch (error: any) {
//       // Handle error
//       toast.error("Utilisateur non trouvé");
//       console.error("Login failed:", error.response?.data || error.message);
//     }
//   };
import { useQueryClient } from "react-query";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { loginUser } from "../fetch/fetchLogique";
import { FormValue } from "../types/FormDataType";

const login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [_, setCookie] = useCookies(["access_token"]);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginMutation = useMutation(
    async (data: FormValue) => {
      return loginUser(data);
    },
    {
      onSuccess: (data) => {
        setCookie("access_token", data.token);
        console.log(data);

        window.localStorage.setItem("UserId", data.userId);
        window.localStorage.setItem("UserRole", data.userRole);
        queryClient.invalidateQueries("user"); // You may need to replace 'user' with the key used in your user query
        navigate("/espace-utilisateur");
      },
      onError: (error: any) => {
        toast.error("Utilisateur non trouvé");
        console.error("Login failed:", error.response?.data || error.message);
      },
    }
  );

  const form = useForm<FormValue>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValue) => {
    loginMutation.mutate(data);
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Connectez-vous à votre compte
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Votre email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`bg-gray-50 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="name@company.com"
                  {...register("email", {
                    required: "Veuillez entrer votre email",
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mot de passe
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  {...register("password", {
                    required: "Veuillez entrer votre mot de passe",
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="relative bottom-[45px] left-[33vh]  lg:bottom-[51px] lg:left-[350px]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <button
                type="submit"
                className="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Connect
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Vous n'avez pas encore de compte?{" "}
                <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  <Link to="/Register"> S'inscrire</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          style: {
            borderBottom: "solid",
            borderBottomColor: "red",
          },
        }}
      />
      <Toaster richColors />
    </section>
  );
};

export default login;
