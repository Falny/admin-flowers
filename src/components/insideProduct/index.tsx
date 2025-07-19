import React from "react";
import "./style.scss";
import { Filed } from "../field";
import { EditFiledArray } from "../editFiledArray";
import {
  editAddStructura,
  editDeleteStructura,
  editNew,
  editOldPrice,
  editPrice,
  editSale,
  editTitle,
  editAddFormat,
  editDeleteFormat,
  editAddLight,
  editDeleteLight,
  editAddColor,
  editDeleteColor,
  editAddCatalog,
  editDeleteCatalog,
} from "../../redux/slice/editProductSlice";
import { useProductHook } from "../../hook/useEditProduct";
import type { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";

export const InsideProduct = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
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
  } = useProductHook();

  return (
    <>
      <div className="common-container">
        <div className="header-product">
          <h3 className="title">Карточка товара</h3>
          <button className="edit-btn" onClick={() => handleUpdateData()}>
            {toggleEdit ? "сохранить" : "Редактировать"}
          </button>
        </div>
        <div className="item-container">
          <div className="item-left">
            <img
              src={`http://localhost:1111${item_.img}`}
              alt=""
              className="item-img"
            />
          </div>

          <div className="item-right">
            <Filed
              title={"Название"}
              field={item_.title}
              toggle={toggleEdit}
              handleChangeElement={(text: string) => dispatch(editTitle(text))}
              toggleField={toggleEditField.title}
              setToggleField={setToggleEditField}
              name={"title"}
            />
            <Filed
              title={"Цена"}
              field={item_.price}
              toggle={toggleEdit}
              handleChangeElement={(text: string) => dispatch(editPrice(text))}
              toggleField={toggleEditField.price}
              setToggleField={setToggleEditField}
              name={"price"}
              checkNum={error_.price}
            />

            {(item_.oldPrice || toggleEdit) && (
              <Filed
                title={"Старая цена"}
                field={item_.oldPrice}
                toggle={toggleEdit}
                handleChangeElement={(text: string) =>
                  dispatch(editOldPrice(text))
                }
                toggleField={toggleEditField.oldPrice}
                setToggleField={setToggleEditField}
                name={"oldPrice"}
                checkNum={error_.oldPrice}
              />
            )}

            <div className="item-block">
              <div className="item-checked">
                <p className="form-text">Новое</p>
                <input
                  type="checkbox"
                  className="item-checked"
                  checked={item_.new}
                  onChange={
                    toggleEdit
                      ? (e: React.ChangeEvent<HTMLInputElement>) =>
                          dispatch(editNew(e.target.checked))
                      : undefined
                  }
                />
              </div>
            </div>
            <div className="item-block">
              <div className="item-checked">
                <p className="form-text">Скидка</p>
                <input
                  type="checkbox"
                  className="item-checked"
                  checked={item_.sale}
                  onChange={
                    toggleEdit
                      ? (e: React.ChangeEvent<HTMLInputElement>) =>
                          dispatch(editSale(e.target.checked))
                      : undefined
                  }
                />
              </div>
            </div>

            <EditFiledArray
              title={"Состав"}
              elem={item_.structura}
              toggle={toggleEdit}
              toggleField={toggleEditArray.structura}
              setToggleArray={setToggleEditArray}
              list={structura}
              item={"structura"}
              funcAddItem={(text) => dispatch(editAddStructura(text))}
              funcDeleteItem={(text) => dispatch(editDeleteStructura(text))}
            />

            <EditFiledArray
              title={"Формат букета"}
              elem={item_.format}
              toggle={toggleEdit}
              toggleField={toggleEditArray.format}
              setToggleArray={setToggleEditArray}
              list={format}
              item={"format"}
              funcAddItem={(text) => dispatch(editAddFormat(text))}
              funcDeleteItem={(text) => dispatch(editDeleteFormat(text))}
            />
            <EditFiledArray
              title={"Свет"}
              elem={item_.light}
              toggle={toggleEdit}
              toggleField={toggleEditArray.light}
              setToggleArray={setToggleEditArray}
              list={light}
              item={"light"}
              funcAddItem={(text) => dispatch(editAddLight(text))}
              funcDeleteItem={(text) => dispatch(editDeleteLight(text))}
            />

            <EditFiledArray
              title={"Цвета в букете"}
              elem={item_.color}
              toggle={toggleEdit}
              toggleField={toggleEditArray.color}
              setToggleArray={setToggleEditArray}
              list={color}
              item={"color"}
              funcAddItem={(text) => dispatch(editAddColor(text))}
              funcDeleteItem={(text) => dispatch(editDeleteColor(text))}
            />

            <EditFiledArray
              title={"Каталог"}
              elem={item_.catalog}
              toggle={toggleEdit}
              toggleField={toggleEditArray.catalog}
              setToggleArray={setToggleEditArray}
              list={category}
              item={"catalog"}
              funcAddItem={(text) => dispatch(editAddCatalog(text))}
              funcDeleteItem={(text) => dispatch(editDeleteCatalog(text))}
            />

            <div className="item-block">
              <p className="form-text">Изображения</p>
              <ul className="item-imgs">
                {item_.imgArchive.map((elem, index) => (
                  <img
                    key={index}
                    src={`http://localhost:1111${elem}`}
                    alt=""
                    className="item-archive"
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
