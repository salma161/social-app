import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

export default function Register() {
  const navigate = useNavigate();
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const schema = z
    .object({
      name: z
        .string()
        .min(1, "please enter your name")
        .max(10, "maximum lenght is 10 chars"),
      email: z.email("invalid email"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "must iclude at least 1 capital letter and 1 small letter and a number and 1 special char with lenght of 8 chars at least"
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .refine((date) => {
          const userDate = new Date(date);
          const now = new Date();
          now.setHours(0, 0, 0, 0);

          return userDate < now;
        }, "please enter a valid date"),
      gender: z.enum(
        ["male", "female"],
        "please choose from the available options"
      ),
    })
    .refine((object) => object.password === object.rePassword, {
      error: "password doesn't match",
      path: ["rePassword"],
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState } = form;

  function handleRegister(data) {
    setisLoading(true);
    axios
      .post(`https://linked-posts.routemisr.com/users/signup`, data)
      .then((res) => {
        if (res.data.message == "success") {
          navigate("/login");
          setisLoading(false);
        }
      })
      .catch((err) => {
        setapiError(err.response.data.error);
        setisLoading(false);
      });
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="max-w-sm mx-auto p-8 pb-16"
    >
      {apiError && (
        <h1 className="bg-red-500/80 font-semibold text-center border-2 border-red-500 mb-2 p-2 text-white">
          {apiError}
        </h1>
      )}
      <div className="mb-2">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Khaled Mohamed"
        />
      </div>

      {formState.errors.name && formState.touchedFields.name ? (
        <p className="text-red-500 font-medium mb-2">
          {formState.errors.name.message}
        </p>
      ) : (
        ""
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
      <div className="mb-2">
        <label
          htmlFor="rePassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Re-password
        </label>
        <input
          type="password"
          id="rePassword"
          {...register("rePassword")}
          placeholder="re-password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {formState.errors.rePassword && formState.touchedFields.rePassword ? (
        <p className="text-red-500 font-medium mb-2">
          {formState.errors.rePassword.message}
        </p>
      ) : (
        ""
      )}
      <div className="mb-2">
        <label
          htmlFor="dateOfBirth"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Birthdate
        </label>
        <input
          type="date"
          id="dateOfBirth"
          {...register("dateOfBirth")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth ? (
        <p className="text-red-500 font-medium mb-2">
          {formState.errors.dateOfBirth.message}
        </p>
      ) : (
        ""
      )}
      <div className="flex gap-6 mb-4">
        <div className="flex items-center">
          <input
            id="male"
            type="radio"
            {...register("gender")}
            value="male"
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="male"
            className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Male
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="female"
            type="radio"
            {...register("gender")}
            value="female"
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="female"
            className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Female
          </label>
        </div>
      </div>
      {formState.errors.gender && formState.touchedFields.gender ? (
        <p className="text-red-500 font-medium mb-2">
          {formState.errors.gender.message}
        </p>
      ) : (
        ""
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isLoading ? (
          <>
            <span>Submit</span>
            <i className="fa-solid fa-spinner fa-spin text-white ms-1"></i>
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
