// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// type FormValue = {
//   email: string;
//   password: string;
//   confirmPassword: string;
//   date_de_naissance?: Date;
// };

// const register = () => {
//   const form = useForm<FormValue>();
//   const { register, handleSubmit, formState, watch } = form;
//   const { errors } = formState;
//   const password = watch("password");
//   const navigate = useNavigate();
//   const validatePassword = (value: string) => {
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;
//     return (
//       regex.test(value) ||
//       "Le mot de passe doit avoir au moins 5 caractères, une majuscule, une minuscule et un chiffre."
//     );
//   };

//   const onSubmit = async (data: FormValue) => {
//     // console.log(data);
//     const { email, password, date_de_naissance } = data;

//     try {
//       const response = await axios.post("http://localhost:4000/auth/register", {
//         email,
//         password,
//         date_de_naissance,
//       });

//       // Handle success response
//       console.log("register successful:", response.data);
//       navigate("/Login");
//     } catch (error: any) {
//       // Handle error
//       console.error("register failed:", error.response?.data || error.message);
//     }
//   };
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerUser } from "../fetch/fetchLogique";
import { FormValue } from "../types/FormDataType";

const register = () => {
  const form = useForm<FormValue>();
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  const password = watch("password");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const validatePassword = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;
    return (
      regex.test(value) ||
      "Le mot de passe doit avoir au moins 5 caractères, une majuscule, une minuscule et un chiffre."
    );
  };

  const registrationMutation = useMutation(
    async (data: FormValue) => {
      const { email, password, date_de_naissance } = data;
      registerUser({ email, password, date_de_naissance });
    },
    {
      onSuccess: () => {
        navigate("/Login");
        queryClient.invalidateQueries("user"); // Assuming there is a 'user' query, replace it with the actual key
      },
      onError: (error: any) => {
        console.error(
          "Registration failed:",
          error.response?.data || error.message
        );
      },
    }
  );

  const onSubmit = (data: FormValue) => {
    registrationMutation.mutate(data);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Créer un compte
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
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Format d'email invalide",
                    },
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
                  htmlFor="date_de_naissance"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date de naissance
                </label>
                <input
                  type="date"
                  id="date_de_naissance"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("date_de_naissance", {
                    required: "Veuillez entrer votre date de naissance",
                  })}
                />
                {errors.date_de_naissance && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.date_de_naissance.message}
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
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  {...register("password", {
                    required: "Veuillez entrer votre mot de passe",
                    validate: validatePassword,
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className={`bg-gray-50 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  {...register("confirmPassword", {
                    required: "Veuillez confirmer votre mot de passe",
                    validate: (value) =>
                      value === password ||
                      "Les mots de passe ne correspondent pas",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                S'inscrire
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Vous avez déjà un compte?{" "}
                {/* <a
                  href="#"
            
                >
                  Connectez-vous
                </a> */}
                <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  <Link to="/Login"> Connectez-vous</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default register;
