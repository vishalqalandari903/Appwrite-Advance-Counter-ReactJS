import React, { useEffect, useState } from "react";
import { Header, AllCounters } from "./index";
export const Home = () => {
  return (
    <>
      <Header />
      <AllCounters />
    </>
  );
  // ) : (
  //   <>
  //     <div className="h-[100vh] flex-col gap-5 w-[100%] bg-background relative flex justify-center items-center">
  //       <div className=" absolute right-5 top-2">
  //         <ThemeBtn />
  //       </div>
  //       <h1 className=" font-bold text-3xl text-primary_hover text-center px-10">
  //         Please Login First To use Counter Application
  //       </h1>
  //       <div className="flex gap-2">
  //         <button
  //           onClick={(e) => navigate("/login")}
  //           className="p-2 cursor-pointer hover:bg-primary_hover bg-primary px-4 text-xl rounded-lg uppercase text-white"
  //         >
  //           Login
  //         </button>
  //         <button
  //           onClick={(e) => navigate("/")}
  //           className="p-2 cursor-pointer border border-primary hover:bg-primary hover:text-white px-4 text-xl rounded-lg uppercase text-primary"
  //         >
  //           Sign up
  //         </button>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Home;
