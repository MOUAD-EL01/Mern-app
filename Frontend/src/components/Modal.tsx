import React from "react";
import { useForm } from "react-hook-form";

const Modal = ({ defaultValues, onSubmit, onClose }: any) => {
  const { register, handleSubmit } = useForm({ defaultValues });
  const role = window.localStorage.getItem("UserRole");

  return (
    <>
      <div
        className="fixed inset-0 bg-[#4B5563] opacity-50 z-50"
        onClick={onClose}
      ></div>
      <div className="fixed top-[330px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="p-6 rounded-lg bg-[#4B5563]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-bold text-white">
                {" "}
                NOM DU PRODUIT
              </label>
              <input
                {...register("productName")}
                type="text"
                className="mt-1 p-2 w-[500px] border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-white">
                QUANTITÉ
              </label>
              <input
                {...register("quantity")}
                type="number"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            {role === "admin" && (
              <div className="mb-4">
                <label className="block text-sm font-bold text-white">
                  ÉTAT
                </label>
                <select
                  {...register("status")}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="Pending">Pending</option>
                  <option value="Refused">Refused</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            )}

            <div className=" flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
