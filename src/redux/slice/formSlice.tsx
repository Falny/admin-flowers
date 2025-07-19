import { createSlice } from "@reduxjs/toolkit";

type ItemState = {
  values: {
    title: string;
    price: string;
    oldPrice: string;
    sale: boolean;
    new: boolean;
    catalog: string[];
    light: string[];
    color: string[];
    format: string[];
    structura: string[];
  };
  errors: {
    price: string;
    oldPrice: string;
  };
};

const initialState: ItemState = {
  values: {
    title: "",
    price: "",
    oldPrice: "",
    sale: false,
    new: false,
    catalog: [],
    light: [],
    color: [],
    format: [],
    structura: [],
  },
  errors: {
    price: "",
    oldPrice: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.values.title = action.payload;
    },
    setPrice(state, action) {
      if (/^\d*$/.test(action.payload)) {
        state.values.price = action.payload;
        state.errors.price = "";
      } else {
        state.errors.price = "Поле должно содержать только цифры";
      }
    },
    setOldPrice(state, action) {
      if (/^\d*$/.test(action.payload)) {
        state.values.oldPrice = action.payload;
        state.errors.oldPrice = "";
      } else {
        state.errors.oldPrice = "Поле должно содержать только цифры";
      }
    },
    setNew(state, action) {
      state.values.new = action.payload;
    },
    setSale(state, action) {
      state.values.sale = action.payload;
    },
    setCatalog(state, action) {
      state.values.catalog = [
        ...state.values.catalog,
        action.payload.toString(),
      ];
    },
    deleteCatalog(state, action) {
      state.values.catalog = state.values.catalog.filter(
        (el) => el !== action.payload.toString()
      );
    },
    setColor(state, action) {
      state.values.color = [...state.values.color, action.payload.toString()];
    },
    deleteColor(state, action) {
      state.values.color = state.values.color.filter(
        (el) => el !== action.payload.toString()
      );
    },
    setStructura(state, action) {
      state.values.structura = [
        ...state.values.structura,
        action.payload.toString(),
      ];
    },
    deleteStructura(state, action) {
      state.values.structura = state.values.structura.filter(
        (el) => el !== action.payload.toString()
      );
    },
    setFormat(state, action) {
      state.values.format = [...state.values.format, action.payload.toString()];
    },
    deleteFormat(state, action) {
      state.values.format = state.values.format.filter(
        (el) => el !== action.payload.toString()
      );
    },
    setLight(state, action) {
      state.values.light = [...state.values.light, action.payload.toString()];
    },
    deleteLight(state, action) {
      state.values.light = state.values.light.filter(
        (el) => el !== action.payload.toString()
      );
    },
    updateData: () => initialState,
  },
});

export default formSlice.reducer;

export const {
  setTitle,
  setPrice,
  setOldPrice,
  setNew,
  setSale,
  setCatalog,
  deleteCatalog,
  setColor,
  deleteColor,
  setStructura,
  deleteStructura,
  setFormat,
  deleteFormat,
  setLight,
  deleteLight,
  updateData,
} = formSlice.actions;
