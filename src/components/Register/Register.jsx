import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function Register() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

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
    .refine(
      (object) => {
        object.password === object.rePassword;
      },
      {
        error: "password doesn't match",
        path: ["rePassword"],
      }
    );
  let { register, handleSubmit } = form;

  function handleRegister(data) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="max-w-sm mx-auto p-8 pb-16"
    >
      <div className="mb-5">
        <label
          htmlhtmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Name
        </label>
        <input
          type="name"
          id="name"
          {...register("name")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Khaled Mohamed"
        />
      </div>
      <div className="mb-5">
        <label
          htmlhtmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@gmail.com"
        />
      </div>
      <div className="mb-5">
        <label
          htmlhtmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          placeholder="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlhtmlFor="rePassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Re-Password
        </label>
        <input
          type="password"
          id="rePassword"
          {...register("rePassword")}
          placeholder="re-password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlhtmlFor="dateOfBirth"
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
      <div className="flex gap-6 mb-2">
        <div className="flex items-center mb-4">
          <input
            id="male"
            type="radio"
            {...register("gender")}
            value="male"
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked
          />
          <label
            htmlFor="male"
            className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Male
          </label>
        </div>
        <div className="flex items-center mb-4">
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

      <button
        type="submit"
        className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
