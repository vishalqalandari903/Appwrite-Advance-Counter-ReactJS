import React from "react";
import { SparklesCore } from "../ui/sparkles";

export const FormRightSide = () => {
  return (
    <div className="flex-grow min-h-full bg-black  md:w-[50%] pt-10 w-0">
      <div className="h-full w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="lg:text-5xl md:text-4xl font-bold text-center text-white relative z-20">
          A Functional Counter
        </h1>
        <h5 className="lg:text-lg md:text-sm font-bold text-center text-white relative z-20">
          You Would Never Have Seen Before
        </h5>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>

      {/* <LampContainer /> */}
      {/* <motion.h1
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
            >
            </motion.h1> */}
      {/* </LampContainer> */}
    </div>
  );
};
