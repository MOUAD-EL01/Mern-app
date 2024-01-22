import { useQuery, useMutation, useQueryClient } from "react-query";
import UserOrderTable from "../components/UserOrderTable";
import { useState } from "react";
import { Order } from "../types/FormDataType";
import { useCookies } from "react-cookie";

import {
  fetchUserOrders,
  deleteUserOrder,
  updateUserOrder,
  getAllOrders,
} from "../fetch/fetchLogique";

// Define the order type

// const fetchUserOrders = async (userId: string) => {
//   const response = await axios.get<Order[]>(
//     `http://localhost:4000/orders/UserOrder/${userId}`
//   );

//   return response.data;
// };

// const deleteUserOrder = async (id: string) => {
//   await axios.delete(`http://localhost:4000/orders/${id}`);
// };

const UserSpace = () => {
  const [dataVisible, setDatavisble] = useState(true);
  const role = window.localStorage.getItem("UserRole");
  const [Cookie, setCookie] = useCookies(["access_token"]);
  // Fetch user ID from localStorag
  const queryClient = useQueryClient();
  const userId = window.localStorage.getItem("UserId");

  // Fetch user orders using React Query
  // const { data, refetch } = useQuery<Order[]>(["userOrders", userId], () =>
  //   fetchUserOrders(userId)
  // );
  // Fetch user orders using React Query
  const { data, refetch } = useQuery<Order[]>(
    ["userOrders", userId],
    () => (userId ? fetchUserOrders(userId, Cookie.access_token) : []),
    {
      enabled: !!userId,
      retry: 1, // Only enable the query when userId is truthy
      // refetchOnWindowFocus: true,
      onError: () => {
        setDatavisble(false);
        refetch;
      },
    }
  );
  const { data: allOrders } = useQuery<Order[]>(
    ["Orders"],
    () => getAllOrders(Cookie.access_token),
    {
      enabled: !!userId,
      retry: 1, // Only enable the query when userId is truthy
      // refetchOnWindowFocus: true,
      onError: () => {
        setDatavisble(false);
        refetch;
      },
    }
  );
  // const prevDataLength = React.useRef(data?.length || 0);
  // Use React Query mutation for deleting an order
  const deleteOrderMutation = useMutation(deleteUserOrder, {
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["userOrders", userId]);
    //   // setDatavisble(false);
    // },
    onSuccess: () => {
      if (role === "user") {
        queryClient.invalidateQueries(["userOrders", userId]);
      } else {
        queryClient.invalidateQueries(["Orders"]);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["userOrders", userId]);
    },
    onError: (error) => {
      console.error("Error deleting user order:", error);
      // You can add custom error handling logic here
    },
  });

  // Render the table with user orders
  return (
    <div className="">
      {dataVisible ? (
        <UserOrderTable
          data={role === "user" ? data : allOrders}
          deleteOrderMutation={deleteOrderMutation}
        />
      ) : (
        <center>
          {" "}
          <p className="my-8 uppercase font-semibold">
            Aucune commande disponible
          </p>
        </center>
      )}
    </div>
  );
};

export default UserSpace;
