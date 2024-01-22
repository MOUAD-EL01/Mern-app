// api.js

import axios from "axios";
import { FormValue, Order } from "../types/FormDataType";

export const loginUser = async (data: FormValue) => {
  try {
    const response = await axios.post("http://localhost:4000/auth/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const registerUser = async (data: FormValue) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/auth/register",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserOrders = async (userId: string, access_token: string) => {
  try {
    const response = await axios.get<Order[]>(
      `http://localhost:4000/orders/UserOrder/${userId}`,
      {
        headers: { authorization: access_token },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const deleteUserOrder = async (id: string, access_token: string) => {
//   try {
//     console.log(access_token);

//     await axios.delete(`http://localhost:4000/orders/${id}`);
//   } catch (error) {
//     throw error;
//   }
// };
// Modify deleteUserOrder function to match the expected signature
export const deleteUserOrder = async ({
  id,
  access_token,
}: {
  id: string;
  access_token: string;
}) => {
  try {
    // console.log(access_token);

    await axios.delete(`http://localhost:4000/orders/${id}`, {
      headers: { authorization: access_token },
    });
  } catch (error) {
    throw error;
  }
};

export const updateUserOrder = async (
  id: string,
  test: any,
  access_token: string
) => {
  try {
    await axios.put(`http://localhost:4000/orders/${id}`, test, {
      headers: { authorization: access_token },
    });
  } catch (error) {
    throw error;
  }
};
export const addOrder = async (test: any, access_token: string) => {
  try {
    await axios.post(`http://localhost:4000/orders`, test, {
      headers: { authorization: access_token },
    });
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id: any, access_token: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/auth/getUser/${id}`,
      {
        headers: { authorization: access_token },
      }
    );

    // Do something with the response data
    console.log(response.data);

    return response.data; // You might want to return the data for further use
  } catch (error) {
    throw error;
  }
};
export const getAllOrders = async (access_token: string) => {
  try {
    const response = await axios.get(`http://localhost:4000/orders`, {
      headers: { authorization: access_token },
    });

    // Do something with the response data
    // console.log(response.data);

    return response.data; // You might want to return the data for further use
  } catch (error) {
    throw error;
  }
};
