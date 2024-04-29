"use client";
import React, { useEffect, useState } from "react";
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
import { v4 as uuidv4 } from "uuid";

import { account } from "../../appwrite/appwriteConfig";

export const Signup = () => {
  // useNavigate Hook
  const navigate = useNavigate();

  // Destructing React Hook Form Object
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Setting Custom Variables
  const [passwordError, setPasswordError] = useState("");
  const [watchFields, setWatchFields] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  let { password, confirmPassword } = watch();

  // Setting Password Errors START here
  useEffect(() => {
    if (!errors.password && password !== confirmPassword) {
      setPasswordError("Passwords are not matching");
      setWatchFields(true);
    } else {
      setPasswordError(errors.password?.message);
    }
  }, [errors.password?.message]);
  useEffect(() => {
    if (watchFields) {
      if (password == confirmPassword) {
        setPasswordError("");
      } else {
        if (passwordError == "") {
          setPasswordError("Passwords are not matching");
        }
      }
    }
  }, [confirmPassword, password]);
  // Setting Password Errors END here

  // Submit Form Functionality START here
  const onSubmit = (data) => {
    // Setting Password Errors
    if (data.password !== data.confirmPassword && !errors.password?.message) {
      setWatchFields(true);
      setPasswordError("Passwords are not matching");
      return;
    }

    setSignupLoading(true);

    // Creating Account In Appwrite START here
    const promise = account.create(
      uuidv4(),
      data.email,
      data.password,
      data.fullName
    );

    promise
      .then(
        function (response) {
          navigate("/login");
        },
        function (error) {
          console.log("Signup :: Appwrite Error ::", error);
        }
      )
      .finally(() => {
        setSignupLoading(false);
      });
    // Creating Account In Appwrite END here
  };
  // Submit Form Functionality END here
  return (
    <>
      <div className="flex justify-center md:w-[50%] w-[100%]">
        <div className="p-4 pb-0 box-border shadow-md bg-white w-full ">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Signup Form
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 flex items-center dark:text-neutral-300">
            Already Have An Account?
            <Link
              className=" ml-2 bg-primary hover:bg-primary_hover text-white p-2 px-4 rounded-lg"
              to={"/login"}
            >
              Login
            </Link>
          </p>

          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4 flex-col pb-4">
              <div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      {...register("fullName")}
                      id="fullName"
                      placeholder="Tyler"
                      type="text"
                      required
                    />
                  </LabelInputContainer>
                  {/* <LabelInputContainer>
                    <Label htmlFor="lastname">Last name</Label>
                    <Input
                      {...register("lastName")}
                      id="lastname"
                      placeholder="Durden"
                      type="text"
                    />
                  </LabelInputContainer> */}
                </div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                    required
                  />
                </LabelInputContainer>
                <div className="mb-4">
                  <div className="flex flex-col min-[500px]:flex-row  min-[500px]:space-y-0 space-y-2 min-[500px]:space-x-2  mb-2">
                    <LabelInputContainer>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        {...register("password", {
                          minLength: {
                            value: 8,
                            message: `Password should be of 8 Characters or more`,
                          },
                        })}
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        required
                      />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="confirmPassword">Confirm password</Label>
                      <Input
                        {...register("confirmPassword")}
                        id="confirmPassword"
                        placeholder="••••••••"
                        type="password"
                        required
                      />
                    </LabelInputContainer>
                  </div>

                  {/* <p
                    className={`${
                      errors.password ? "text-red-600" : " text-green-600"
                    }`}
                  >
                    {errors.password ? "❌" : "✅"}{" "}
                    {errors.password
                      ? errors.password.message
                      : "password is Valid"}
                  </p> */}
                  <p className={`text-red-600`}>
                    {passwordError ? "❌" : undefined} {passwordError}
                  </p>
                </div>

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
                  className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] `}
                  type="submit"
                  disabled={signupLoading}
                >
                  {signupLoading ? "Signing up..." : "sign Up"}{" "}
                  {!signupLoading && (
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

// export default Signup;
