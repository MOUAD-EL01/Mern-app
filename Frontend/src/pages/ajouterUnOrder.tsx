import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { addOrder } from "../fetch/fetchLogique";
import { Toaster, toast } from "sonner";
import { useCookies } from "react-cookie";

type Order = {
  ProductName: string;
  quantity: number;
};
const ajouterUnOrder = () => {
  const [Cookie, setCookie] = useCookies(["access_token"]);
  const userId = window.localStorage.getItem("UserId");
  const form = useForm<Order>();
  const { register, handleSubmit, formState, setError } = form;
  const AddOrserMutation = useMutation(
    async (data: Order) => {
      return addOrder(data, Cookie.access_token);
    },
    {
      onSuccess: () => {
        toast.success("Order bien envoyer");
      },
    }
  );
  const onSubmit = (data: Order) => {
    if (/^\d+$/.test(data.ProductName)) {
      setError("ProductName", {
        type: "manual",
        message:
          "Le nom du produit ne peut pas contenir des caractères numériques.",
      });
      return;
    }
    const AllData = {
      ProductName: data.ProductName,
      quantity: data.quantity,
      state: "Pending",
      userOwner: userId,
    };
    AddOrserMutation.mutate(AllData);
    console.log(data);
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center  py-8 mx-auto h-full lg:py-8 lg:mt-10">
          <div className="w-[800px] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Entrez votre commande details
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Votre Produit Nom
                  </label>
                  <input
                    type="text"
                    id="text"
                    className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="name@company.com"
                    {...register("ProductName", {
                      required: "Veuillez saisir le nom du produit.",
                    })}
                  />
                  {formState.errors.ProductName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.ProductName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="Quantite"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Votre Produit Quantite
                  </label>
                  <input
                    type="number"
                    id="Quantite"
                    placeholder="100"
                    className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    {...register("quantity", {
                      required: "Veuillez saisir la quantite du produit.",
                    })}
                  />
                  {formState.errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.quantity.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  commandez maintenant
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Toaster
          toastOptions={{
            style: {
              borderBottom: "solid",
              borderBottomColor: "green",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ajouterUnOrder;
