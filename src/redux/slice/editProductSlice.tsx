import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

type EditType = {
  values: {
    _id: string;
    img: string;
    title: string;
    price: string;
    oldPrice: string;
    sale: boolean;
    new: boolean;
    structura: string[];
    imgArchive: string[];
    format: string[];
    color: string[];
    light: string[];
    catalog: string[];
  };
  errors: {
    price: string;
    oldPrice: string;
  };
  status: string;
};

type EditItem = {
  id: string;
  title: string;
  price: string;
  oldPrice: string;
  sale: boolean;
  newBol: boolean;
  structura: string[];
  color: string[];
  format: string[];
  light: string[];
  catalog: string[];
};

export const FetchGetProduct = createAsyncThunk(
  "edit/fetchGetProduct",
  async (id: string) => {
    try {
      const { data } = await instance.get(`/cards/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const FetchPatchProduct = createAsyncThunk(
  "admin/fetchPatchProduct",
  async (product: EditItem) => {
    try {
      const { data } = await instance.patch(`/cards/${product.id}`, {
        product,
      });
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const initialState: EditType = {
  values: {
    _id: "",
    img: "",
    title: "",
    price: "",
    oldPrice: "",
    sale: false,
    new: false,
    structura: [],
    imgArchive: [],
    format: [],
    color: [],
    light: [],
    catalog: [],
  },
  errors: {
    price: "",
    oldPrice: "",
  },
  status: "",
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    editTitle(state, action) {
      console.log(state.values.title, action);
      state.values.title = action.payload;
    },
    editPrice(state, action) {
      if (/^\d*$/.test(action.payload)) {
        state.values.price = action.payload;
        state.errors.price = "";
      } else {
        state.errors.price = "Поле должно содержать цифры";
      }
    },
    editOldPrice(state, action) {
      if (/^\d*$/.test(action.payload)) {
        state.values.oldPrice = action.payload;
        state.errors.oldPrice = "";
      } else {
        state.errors.oldPrice = "Поле должно содержать цифры";
      }
    },
    editNew(state, action) {
      state.values.new = action.payload;
      console.log(state.values.new);
    },
    editSale(state, action) {
      state.values.sale = action.payload;
      console.log(state.values.sale);
    },
    editAddStructura(state, action) {
      state.values.structura = [
        ...state.values.structura,
        action.payload.toString(),
      ];
    },
    editDeleteStructura(state, action) {
      state.values.structura = state.values.structura.filter(
        (el) => el !== action.payload.toString()
      );
    },
    editAddFormat(state, action) {
      state.values.format = [...state.values.format, action.payload.toString()];
    },
    editDeleteFormat(state, action) {
      state.values.format = state.values.format.filter(
        (el) => el !== action.payload.toString()
      );
    },
    editAddLight(state, action) {
      state.values.light = [...state.values.light, action.payload.toString()];
    },
    editDeleteLight(state, action) {
      state.values.light = state.values.light.filter(
        (el) => el !== action.payload.toString()
      );
    },
    editAddColor(state, action) {
      state.values.color = [...state.values.color, action.payload.toString()];
    },
    editDeleteColor(state, action) {
      state.values.color = state.values.color.filter(
        (el) => el !== action.payload.toString()
      );
    },
    editAddCatalog(state, action) {
      state.values.catalog = [
        ...state.values.catalog,
        action.payload.toString(),
      ];
    },
    editDeleteCatalog(state, action) {
      state.values.catalog = state.values.catalog.filter(
        (el) => el !== action.payload.toString()
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchGetProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchGetProduct.fulfilled, (state, action) => {
        state.status = "succcess";
        state.values = action.payload;
      })
      .addCase(FetchGetProduct.rejected, (state) => {
        state.status = "error";
      })
      .addCase(FetchPatchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchPatchProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.values = {
          ...state.values,
          ...action.payload,
          img: state.values.img,
          imgArchive: state.values.imgArchive,
        };
      })
      .addCase(FetchPatchProduct.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const {
  editTitle,
  editPrice,
  editOldPrice,
  editNew,
  editSale,
  editAddStructura,
  editDeleteStructura,
  editAddFormat,
  editDeleteFormat,
  editAddLight,
  editDeleteLight,
  editAddColor,
  editDeleteColor,
  editAddCatalog,
  editDeleteCatalog,
} = editSlice.actions;
export default editSlice.reducer;
