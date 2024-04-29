import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, AuthRoutes } from "./components";
import { AddCounterContainer } from "./components/CounterContainers/AddCounterContainer";

function App() {
  return (
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
