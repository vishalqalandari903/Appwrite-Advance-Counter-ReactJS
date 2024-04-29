import { Route, Routes, useLocation } from "react-router-dom";
import { Signup, Login, FormRightSide } from "../index";
import { NotFound } from "./NotFound";

export const AuthRoutes = () => {
  const location = useLocation();
  const pathsToShowRightSide = ["/login", "/signup"];
  const showFormRightSide = pathsToShowRightSide.includes(location.pathname);

  return (
    <>
      <div className="w-full mx-auto min-h-[100vh] flex box-border rounded-none shadow-input dark:bg-black">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {showFormRightSide ? <FormRightSide /> : undefined}
      </div>
    </>
  );
};
