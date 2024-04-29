import React from "react";

export const CountersWrapper = ({ children }) => {
  return (
    <div className="gap-5 counters__wrapper 2xl:grid-cols-5 min-[2700px]:grid-cols-9 min-[2200px]:grid-cols-8 justify-center grid min-[900px]:grid-cols-3 min-[550px]:grid-cols-2 min-[1200px]:grid-cols-4 p-5 grid-cols-none min-[550px]:pt-5 pt-10">
      {children}
    </div>
  );
};
