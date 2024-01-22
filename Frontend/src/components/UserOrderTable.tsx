import { MdOutlineEdit, MdDeleteForever } from "react-icons/md";
import Modal from "../components/Modal";
import { useState } from "react";
import { updateUserOrder, getUser } from "../fetch/fetchLogique";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useCookies } from "react-cookie";

interface Order {
  _id: string;
  ProductName: string;
  quantity: number;
  state: string;
  // Add more properties as needed
}
const UserOrderTable = ({ data, deleteOrderMutation }: any) => {
  const userId = window.localStorage.getItem("UserId");
  const role = window.localStorage.getItem("UserRole");
  const [openModel, setOpenModel] = useState(false);
  const [Cookie, setCookie] = useCookies(["access_token"]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const queryClient = useQueryClient();
  // const getUserMutation = useMutation(async (id: string) => {
  //   try {
  //     const userData = await getUser(id);
  //     // Do something with userData
  //     console.log(userData);
  //     return userData;
  //   } catch (error) {
  //     // Handle error
  //     console.error(error);
  //     throw error;
  //   }
  // });
  const UpdateMutation = useMutation(
    async (data: any) => {
      return updateUserOrder(
        data.id,
        {
          ProductName: data.productName,
          quantity: data.quantity,
          state: data.status,
        },
        Cookie.access_token
      );
    },
    {
      onSuccess: () => {
        // console.log("ok");
        if (role === "user") {
          queryClient.invalidateQueries(["userOrders", userId]);
        } else {
          queryClient.invalidateQueries(["Orders"]);
        }
      },
      onError: () => {},
    }
  );
  const onSubmit = async (data: any) => {
    try {
      // Update the order

      // getUserMutation.mutate(userId as string);

      UpdateMutation.mutate(data);

      // console.log(data);

      // Close the modal after successful update
      setOpenModel(false);
    } catch (error) {
      console.error("Error updating order:", error);
      // Handle error if needed
    }
  };
  const handleEditClick = (order: Order) => {
    setSelectedOrder(order);
    setOpenModel(!openModel);
    // console.log("Hi");
  };

  return (
    <div className="">
      <div className="flex justify-center">
        <table
          style={{ border: "solid", borderColor: "#b7bcc3" }}
          className=" border-solid border-black bg-gray-600 rounded-md w-full  text-sm text-center mt-8 mx-12 "
        >
          <thead className="text-xs ml-4  uppercase  dark:bg-gray-700 dark:text-gray-700 text-white border-b-4">
            <tr>
              <th scope="col" className="px-0 py-3">
                Nom du produit
              </th>
              <th scope="col" className="px-12 py-3">
                Quantité
              </th>
              <th scope="col" className="px-12 py-3">
                État
              </th>
              <th scope="col" className="px-12 py-3">
                Modifier
              </th>
              <th scope="col" className="px-12 py-3">
                Supprimer
              </th>
            </tr>
          </thead>
          <tbody className="ml-4 text-black bg-white ">
            {data?.map((order: Order) => (
              <tr key={order._id} className="">
                <td className="px-10 py-3  font-semibold border-b-2">
                  {order.ProductName}
                </td>
                <td className="px-10 py-3 font-semibold border-b-2">
                  {order.quantity}
                </td>
                <td className="px-10 py-3 font-semibold border-b-2 ">
                  <div
                    className={clsx(
                      "rounded-xl",
                      // Add a custom class for text shadow glow
                      order.state === "Completed"
                        ? "text-green-700 drop-shadow-xl"
                        : order.state === "Refused"
                        ? "text-red-500"
                        : order.state === "Pending"
                        ? "text-yellow-500"
                        : ""
                    )}
                  >
                    {order.state}
                  </div>
                </td>

                <td className="px-16 py-3 border-b-2 ">
                  <button
                    className="rounded-md bg-gray-800"
                    onClick={() => handleEditClick(order)}
                  >
                    <div className="p-2">
                      <MdOutlineEdit size={20} color="white" />
                    </div>
                  </button>
                </td>
                <td className="px-16 py-3 border-b-2">
                  <button
                    className="rounded-md bg-red-800 "
                    onClick={() =>
                      deleteOrderMutation.mutate(
                        { id: order._id, access_token: Cookie.access_token },
                        Cookie.access_token
                      )
                    }
                    disabled={deleteOrderMutation.isLoading}
                  >
                    <div className="p-2">
                      <MdDeleteForever size={20} color="white" />
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {openModel && selectedOrder && (
          // <div className="absolute top-[20%]  z-10 inset-0  ">
          <Modal
            defaultValues={{
              id: selectedOrder._id,
              productName: selectedOrder.ProductName,
              quantity: selectedOrder.quantity,
              status: selectedOrder.state,
            }}
            onSubmit={onSubmit}
            onClose={() => setOpenModel(false)}
          />
          // </div>
        )}
      </div>
      <div className=" flex justify-end mr-10">
        <Link to={"/ajouterUnOrder"}>
          {" "}
          <button className="  mt-8  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            + Ajouter une Commande
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserOrderTable;
