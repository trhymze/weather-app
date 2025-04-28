import React from "react";
import Weather from "./Weather";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Weather />
      <ToastContainer />
    </div>
  );
}

export default App;
