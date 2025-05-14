import { useContext } from "react";
import { UserContext } from "../context/usercontext";
import { useUserForm } from "../hooks/useUserform";
import type {  FormData } from "../hooks/useUserform";

let idCounter = 1000;

const AddUser = () => {
  const { dispatch } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useUserForm();

  const onSubmit = (data: FormData) => {
    dispatch({
      type: "ADD_USER",
      payload: { ...data, id: idCounter++ },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 text-2xl  ">
      <h2 className="bg-amber-200 px-2 py-2 rounded-3xl  ">Add User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 max-w-md bg-amber-200 rounded-4xl py-4 px-8">
        <input type="text" {...register("name")} placeholder="Name" className="w-full p-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"/>
        {errors.name && <p>{errors.name.message}</p>}

        <input type="email" {...register("email")} placeholder="Email" className="w-full p-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150" />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="number" {...register("age", { valueAsNumber: true })} placeholder="Age" className="w-full p-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"  />
        {errors.age && <p>{errors.age.message}</p>}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-b-full">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
