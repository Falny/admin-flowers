import React from "react";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchGetProduct,
  FetchPatchProduct,
} from "../redux/slice/editProductSlice";

export const useProductHook = () => {
  const { id } = useParams();
  const item_ = useSelector((state: RootState) => state.edit.values);
  const error_ = useSelector((state: RootState) => state.edit.errors);

  const [toggleEdit, setToggleEdit] = React.useState(false);

  const [toggleEditField, setToggleEditField] = React.useState({
    title: false,
    price: false,
    oldPrice: false,
  });

  const [toggleEditArray, setToggleEditArray] = React.useState({
    structura: false,
    format: false,
    color: false,
    catalog: false,
    light: false,
  });

  const structura = useSelector(
    (state: RootState) => state.structura.structura
  );
  const format = useSelector((state: RootState) => state.format.format);
  const light = useSelector((state: RootState) => state.light.light);
  const color = useSelector((state: RootState) => state.color.color);
  const category = useSelector((state: RootState) => state.category.catalog);

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    if (!id) return alert("ошибка карточки товара");
    dispatch(FetchGetProduct(id));
  }, [id]);

  const handleUpdateData = () => {
    setToggleEdit(!toggleEdit);

    if (!id) {
      alert("Ошибка продукта");
      return;
    }

    if (toggleEdit) {
      dispatch(
        FetchPatchProduct({
          id,
          title: item_.title,
          price: item_.price,
          oldPrice: item_.oldPrice ? item_.oldPrice : "",
          sale: item_.sale,
          newBol: item_.new,
          structura: item_.structura,
          format: item_.format,
          light: item_.light,
          color: item_.color,
          catalog: item_.catalog,
        })
      );
    }
  };

  return {
    item_,
    error_,
    toggleEdit,
    toggleEditField,
    setToggleEditField,
    toggleEditArray,
    setToggleEditArray,
    structura,
    format,
    light,
    color,
    category,
    handleUpdateData,
  };
};
