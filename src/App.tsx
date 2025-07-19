import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { AddProduct } from "./components/addProduct";
import { Product } from "./components/product";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/store";
import { FetchGetProduct } from "./redux/slice/adminSlice";
import { InsideProduct } from "./components/insideProduct";
import { CreateCategory } from "./components/createCategory";
import { FetchCategoryGet } from "./redux/slice/categorySlice";
import { CreateStructura } from "./components/createStructura";
import { FetchStructuraGet } from "./redux/slice/structuraSlice";
import { CreateColor } from "./components/createColor";
import { FetchColorGet } from "./redux/slice/colorSlice";
import { FetchLightGet } from "./redux/slice/lightSlice";
import { CreateLight } from "./components/createLight";
import { FetchFormatGet } from "./redux/slice/formatSlice";
import { CreateFormat } from "./components/createFormat";

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(FetchGetProduct());
    dispatch(FetchCategoryGet());
    dispatch(FetchStructuraGet());
    dispatch(FetchColorGet());
    dispatch(FetchLightGet());
    dispatch(FetchFormatGet());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<AddProduct />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<InsideProduct />} />
          <Route path='/category' element={<CreateCategory/> } />
          <Route path='/structura' element={<CreateStructura/> } />
          <Route path='/color' element={<CreateColor/> } />
          <Route path='/light' element={<CreateLight/> } />
          <Route path='/format' element={<CreateFormat/> } />
        </Route>
      </Routes>
    </>
  );
};
