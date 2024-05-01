"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "@/app/slices/auth";
import authService from "@/appwrite/auth";
import { useDispatch } from "react-redux";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    setLoginLoading(true);

    authService
      .login({ email: data.email, password: data.password })
      .then((data) => {
        login({ userData: data });
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };
  return (
    <>
      <div className="flex justify-center md:w-[50%] w-[100%]">
        <div className="p-4 pb-0 box-border shadow-md bg-white w-full ">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Login Form
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 flex items-center dark:text-neutral-300">
            New User?
            <Link
              className=" ml-2 bg-primary hover:bg-primary_hover text-white p-2 px-4 rounded-lg"
              to={"/signup"}
            >
              Signup
            </Link>
          </p>

          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4 flex-col pb-4">
              <div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                    name="email"
                    {...register("email")}
                    required
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    {...register("password")}
                    required
                  />
                </LabelInputContainer>

                <div className="flex gap-3 flex-wrap mb-4">
                  <button
                    className="relative flex-1 group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                  >
                    <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      GitHub
                    </span>
                    <BottomGradient />
                  </button>
                  <button
                    className="relative flex-1 group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                  >
                    <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      Google
                    </span>
                    <BottomGradient />
                  </button>
                  <button
                    className="relative flex-1 group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                  >
                    <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      OnlyFans
                    </span>
                    <BottomGradient />
                  </button>
                </div>

                <button
                  className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${
                    loginLoading ? "opacity-80" : ""
                  }`}
                  type="submit"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Logging in..." : "Login"}{" "}
                  {!loginLoading && (
                    <i className="fa-solid fa-arrow-right-long"></i>
                  )}
                  <BottomGradient />
                </button>
              </div>

              {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
