"use client"

import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Input } from "antd";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import { toast } from "react-toastify";

const SignUp = () => {
//   const router = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    retryPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    retryPassword: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleApiCall = async (data:any) => {
    try {
      setIsLoading(true);

    //   const response = await getUserSignUp(data);
    //   console.log(response, "this is response");
    //   const token = response?.data?.data?.token;
    //   if (token) {
    //     Cookies.set("auth_token", token);
    //     router("/dashboard");
    //   }
      toast.success("Successfully Sign Up.");
    } catch (error) {
      console.error("API call error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    console.log(formData, "formdata");

    // Validation
    const validationErrors = {
      name: "",
      email: "",
      password: "",
      retryPassword: "",
    };
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = "Invalid email";
    }
    if (!formData.name) {
      validationErrors.name = "Full Name is required";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    }

    if (!formData.retryPassword) {
      validationErrors.retryPassword = "Password is required";
    } else if (formData.password !== formData.retryPassword) {
      validationErrors.retryPassword = "Password doesn`t matched please retry";
    }

    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => !error)) {
      setIsLoading(true);
      const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      console.log(data, "this is data sign up");
      handleApiCall(data);
    }
  };

  const isValidEmail = (email:any) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="min-h-screen   flex items-center gap-y-10 flex-col md:py-10 justify-center">
        <div className="bg-white border shadow-xl rounded-xl md:min-w-[600px] z-30 px-8 py-5  flex flex-col gap-y-1">
          <span className=" flex justify-center ">
            <img 
            // src={ZEBRA_ICON} 
            alt="Logo" className="object-contain " />
          </span>
          <h1 className="text-xl font-medium lg:font-normal lg:text-3xl mt-1 leading-10 text-gray-700 text-center w-full">
            Welcome to chuha
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col  gap-2 mt-2">
            <div className="col-span-1 flex-col flex gap-y-.5">
              <label className="text-base pb-2">Full Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                size="large"
                className="rounded border border-gray-600"
              />
              {errors.name && <p className="text-danger">{errors.name}</p>}
            </div>

            <div className=" gap-x-2">
              <div className="col-span-1 flex-col flex gap-y-.5">
                <label className="text-base   pb-2">Email</label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  size="large"
                  className="rounded border border-gray-600"
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>{" "}
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="col-span-1 flex-col flex gap-y-.5">
                <label className="text-base   pb-2">Password</label>
                <Input.Password
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  size="large"
                  className="rounded border border-gray-600"
                />
                {errors.password && (
                  <p className="text-danger">{errors.password}</p>
                )}
              </div>
              <div className="col-span-1 flex-col flex gap-y-.5">
                <label className="text-base pb-2">Retry-Password</label>
                <Input.Password
                  name="retryPassword"
                  value={formData.retryPassword}
                  onChange={handleChange}
                  size="large"
                  className="rounded border border-gray-600"
                />
                {errors.retryPassword && (
                  <p className="text-danger">{errors.retryPassword}</p>
                )}
              </div>
            </div>

            <span className="flex justify-center mt-4">
              <button className="w-min p-1 rounded border hover:border-primary hover:text-primary">
                <span className="flex gap-x-2 px-6 py-1 whitespace-nowrap flex items-center">
                  Continue
                  <BsArrowRight className="w-4 h-4 " />
                </span>
              </button>
            </span>
            {/* <p className='text-center text-sm'>OR</p>*/}
            <span className="flex justify-center "></span>
            <span className="flex justify-center "></span>
            <span className="text-center flex justify-center text-sm w-full">
              Don’t have an account?&nbsp;
              <p
                // onClick={() => router("/")}
                className="text-primary w-2 px-1 hover:font-bold hover:underline cursor-pointer"
              >
                SignIn
              </p>
            </span>
            <span className="text-center text-sm">
              ©2023 - Zebralearn. All rights reserved
            </span>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUp;