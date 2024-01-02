import React from "react";
import { Route, Routes } from "react-router-dom";
import NewAddProduct from "./Component/NewAddProduct";



function App() {
    return (
      <Routes>
        <Route path="/" element={<NewAddProduct />} />


        </Routes>
  );
}

export default App;