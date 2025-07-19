import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchPostAdmin} from "../redux/slice/adminSlice";
import type { AppDispatch, RootState } from "../redux/store";
import { updateData } from "../redux/slice/formSlice";

export const useCatalogHook = () => {
  const [toggleCategory, setToggleCategory] = React.useState(false);
  const catalog = useSelector((state: RootState) => state.category.catalog);
  const checkRefCatalog = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        checkRefCatalog.current &&
        !checkRefCatalog.current.contains(e.target as Node)
      ) {
        setToggleCategory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checkRefCatalog]);

  return {
    toggleCategory,
    setToggleCategory,
    catalog,
    checkRefCatalog,
  };
};

export const useColorHook = () => {
  const [toggleColor, setToggleColor] = React.useState(false);
  const checkColorRef = React.useRef<HTMLUListElement>(null);
  const color = useSelector((state: RootState) => state.color.color);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        checkColorRef.current &&
        !checkColorRef.current.contains(e.target as Node)
      ) {
        setToggleColor(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checkColorRef]);

  return {
    toggleColor,
    setToggleColor,
    color,
    checkColorRef,
  };
};

export const useStructuraHook = () => {
  const [toggleStructura, setToggleStructura] = React.useState(false);
  const checkStructuraRef = React.useRef<HTMLUListElement>(null);
  const structura = useSelector(
    (state: RootState) => state.structura.structura
  );

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        checkStructuraRef.current &&
        !checkStructuraRef.current.contains(e.target as Node)
      ) {
        setToggleStructura(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checkStructuraRef]);

  return {
    toggleStructura,
    setToggleStructura,
    checkStructuraRef,
    structura,
  };
};

export const useFormatHook = () => {
  const [toggleFormat, setToggleFormat] = React.useState(false);
  const checkFormatRef = React.useRef<HTMLUListElement>(null);
  const format = useSelector((state: RootState) => state.format.format);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        checkFormatRef.current &&
        !checkFormatRef.current.contains(e.target as Node)
      ) {
        setToggleFormat(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checkFormatRef]);

  return {
    toggleFormat,
    setToggleFormat,
    format,
    checkFormatRef,
  };
};

export const useLightHook = () => {
  const [toggleLight, setToggleLight] = React.useState(false);
  const checkLightRef = React.useRef<HTMLUListElement>(null);
  const light = useSelector((state: RootState) => state.light.light);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        checkLightRef.current &&
        !checkLightRef.current.contains(e.target as Node)
      ) {
        setToggleLight(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checkLightRef]);

  return {
    setToggleLight,
    toggleLight,
    light,
    checkLightRef,
  };
};

export const useAddProductHook = () => {
  const form_ = useSelector((state: RootState) => state.form.values);
  const [formFile, setFormFile] = React.useState({
    img: "",
    imgArchive: [],
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files?.length === 1) {
      setFormFile((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormFile((prev) => ({ ...prev, [name]: files }));
    }
  };

  const handleSubmitForm = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      if (formFile.img) formData.append("img", formFile.img);
      if (formFile.imgArchive)
        [...formFile.imgArchive].forEach((file) =>
          formData.append("imgArchive", file)
        );

      formData.append(
        "data",
        JSON.stringify({
          title: form_.title,
          price: form_.price,
          oldPrice: form_.oldPrice,
          sale: form_.sale,
          new: form_.new,
          catalog: form_.catalog,
          light: form_.light,
          color: form_.color,
          format: form_.format,
          structura: form_.structura,
        })
      );

      await dispatch(FetchPostAdmin(formData));
      setFormFile({
        img: "",
        imgArchive: [],
      });
      dispatch(updateData())
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleSubmitForm,
    handleFile,
  };
};


