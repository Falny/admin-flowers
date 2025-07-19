import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  FetchStructuraDelete,
  FetchStructuraGet,
  FetchStructuraPatch,
  FetchStructuraPost,
} from "../../redux/slice/structuraSlice";
import { CreateCommon } from "../createCommon";

export const CreateStructura = () => {
  const [value, setValue] = React.useState<string>("");
  const [success, setSuccess] = React.useState(false);

  const [getId, setGetId] = React.useState("");
  const [changeInput, setChangeInput] = React.useState<string>("");

  const structura = useSelector(
    (state: RootState) => state.structura.structura
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (success) {
      dispatch(FetchStructuraPost(value));
      setValue("");
    }
  };

  const handleCheck = () => {
    const checkCategory = structura.some((el) =>
      el.structura.toString().toLowerCase().includes(value.toLowerCase())
    );

    if (!checkCategory) {
      setSuccess(true);
    } else {
      setSuccess(false);
      alert("такая категория уже существует");
    }
  };

  const handleDeleteItem = (id: string) => {
    dispatch(FetchStructuraDelete(id));
  };

  const handleChageField = (id: string) => {
    setGetId((prev) => (prev.includes(id) ? "" : id));

    if (changeInput) {
      dispatch(FetchStructuraPatch({ id, structura: changeInput }));
      setChangeInput("");
    }
  };

  React.useEffect(() => {
    dispatch(FetchStructuraGet());
    setSuccess(false);
  }, [success, dispatch]);

  return (
    <>
      <CreateCommon
        title={"Создание состава"}
        field={"Состав"}
        value={value}
        list={structura}
        name={"structura"}
        newName={changeInput}
        setValue={setValue}
        handleCheck={handleCheck}
        getId={getId}
        setChangeInput={setChangeInput}
        handleChageField={handleChageField}
        handleDeleteItem={handleDeleteItem}
        handleSubmitForm={handleSubmitForm}
      />
    </>
  );
};
