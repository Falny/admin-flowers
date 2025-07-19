import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import type { AppDispatch, RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import {
  FetchDeleteAdmin,
  FetchGetProduct,
} from "../../redux/slice/adminSlice";
import React from "react";

export const Product = () => {
  const product = useSelector((state: RootState) => state.admin.item);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteItem = (id: string) => {
    dispatch(FetchDeleteAdmin(id));
  };

  React.useEffect(() => {
    dispatch(FetchGetProduct());
  }, []);

  return (
    <>
      <div className="common-container">
        <h3 className="title">Товары</h3>
        <ul className="product">
          {product.map((obj) => (
            <div className="block-item">
              <li className="product-item" key={obj._id}>
                <Link to={`/product/${obj._id}`} className="item-link">
                  <img
                    src={`http://localhost:1111${obj.img}`}
                    alt=""
                    className="product-img"
                  />
                  {obj.title}; {obj.price}; 
                </Link>
                <X
                  onClick={() => handleDeleteItem(obj._id)}
                  className="icon-delete"
                />
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
