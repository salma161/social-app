import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import z from "zod";

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const schema = z.object({
    email: z.email("invalid email"),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "must iclude at least 1 capital letter and 1 small letter and a number and 1 special char with lenght of 8 chars at least"
      ),
  });

  function handleLogin(data) {
    setisLoading(true);
    axios
      .post(`https://linked-posts.routemisr.com/users/signin`, data)
      .then((res) => {
        if (res.data.message == "success") {
          navigate("/");
          setisLoading(false);
        }
      })
      .catch((err) => {
        setisLoading(false);
        setapiError(err.response.data.error);
      });
  }
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });
  let { register, handleSubmit, formState } = form;
  return (
    <form
      className="max-w-sm mx-auto p-8 pb-16 min-h-screen pt-16"
      onSubmit={handleSubmit(handleLogin)}
    >
      {apiError && (
        <h1 className="bg-red-500/80 font-semibold text-center border-2 border-red-500 mb-2 p-2 text-white">
          {apiError}
        </h1>
      )}

      <div className="mb-2">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@gmail.com"
        />
      </div>
      {formState.errors.email && formState.touchedFields.email ? (
        <p className="text-red-500 font-medium mb-2">
          {formState.errors.email.message}
        </p>
      ) : (
        ""
      )}

      <div className="mb-2">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          placeholder="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {formState.errors.password && formState.touchedFields.password ? (
        <p className="text-red-500 font-medium mb-2">
          {formState.errors.password.message}
        </p>
      ) : (
        ""
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="text-white mt-2 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isLoading ? (
          <>
            <span>Login</span>
            <i className="fa-solid fa-spinner fa-spin text-white ms-1"></i>
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}
