import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, AuthRoutes } from "./components";
import { AddCounterContainer } from "./components/CounterContainers/AddCounterContainer";
import { logout, login } from "./app/slices/auth";
import authService from "./appwrite/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "./components/Loader";

import { setCounters } from "./app/slices/counter";
import counterService from "./appwrite/counter";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    counterService
      .getCounters()
      .then((counters) => {
        if (counters) {
          dispatch(setCounters(counters.documents));
        }
      })
      .catch((error) => {
        console.log("catch", error);
      })
      .finally(() => {});
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<AuthRoutes />} />
          <Route path="/new" element={<AddCounterContainer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
