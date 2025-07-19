import React from "react";
import { X } from "lucide-react";
import { Check } from "lucide-react";
import { RefreshCw } from "lucide-react";
import type { Catalog } from "../../redux/slice/categorySlice";
import type { Light } from "../../redux/slice/lightSlice";
import type { Color } from "../../redux/slice/colorSlice";
import type { Structura } from "../../redux/slice/structuraSlice";
import type { Format } from "../../redux/slice/formatSlice";

type CommonProp = {
  title: string;
  field: string;
  value: string;
  list: Catalog[] | Light[] | Color[] | Structura[] | Format[];
  name: "catalog" | "light" | "color" | "structura" | "format";
  newName: string;
  setValue: (text: string) => void;
  handleCheck: () => void;
  getId: string;
  setChangeInput: (text: string) => void;
  handleChageField: (text: string) => void;
  handleDeleteItem: (text: string) => void;
  handleSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const CreateCommon = ({
  title,
  field,
  value,
  list,
  name,
  newName,
  setValue,
  handleCheck,
  getId,
  setChangeInput,
  handleChageField,
  handleDeleteItem,
  handleSubmitForm,
}: CommonProp) => {
  return (
    <>
      <div className="common-container">
        <div className="block">
          <form method="POST" onSubmit={(e) => handleSubmitForm(e)}>
            <h3 className="title">{title}</h3>
            <label htmlFor="" className="add-form-field">
              <span className="form-text">{field}</span>
              <input
                type="text"
                className="form-field"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.value)
                }
              />
            </label>
            <button className="form-btn" onClick={() => handleCheck()}>
              Отправить
            </button>
          </form>
          <div className="block-exist">
            <ul className="block-list">
              {list.map((el) => (
                <li className="block-item" key={el._id}>
                  <input
                    type="text"
                    className="item-fieled"
                    value={getId === el._id ? newName : (el as any)[name]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setChangeInput(e.target.value)
                    }
                  />
                  <button
                    className="item-btn"
                    onClick={() => handleChageField(el._id)}
                  >
                    {getId === el._id ? (
                      <Check className="change-icon" />
                    ) : (
                      <RefreshCw className="change-icon" />
                    )}
                  </button>
                  <button
                    className="item-btn"
                    onClick={() => handleDeleteItem(el._id)}
                  >
                    <X className="delete-icon" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
