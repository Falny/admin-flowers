import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export type AdminType = {
  _id: string;
  img: string;
  title: string;
  price: number;
  oldPrice: number;
  sale: boolean;
  new: boolean;
  imgArchive: string[];
  structura: string[];
  format: string[];
  color: string[];
  light: string[];
  catalog: string[];
};


export const FetchPostAdmin = createAsyncThunk(
  "admin/fetchAdminPost",
  async (product: FormData) => {
    try {
      const { data } = await instance.post("/cards", product, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("данные успешно отправлены");
      return data;
    } catch (err) {
      console.log(err);
      alert("Такое поле уже есть");
      throw err;
    }
  }
);

export const FetchDeleteAdmin = createAsyncThunk(
  "admin/fetchAdminDelete",
  async (id: string) => {
    try {
      await instance.delete(`/cards/${id}`);
      return id;
    } catch (err) {
      console.log(err);
      alert("Такое поле уже есть");
      throw err;
    }
  }
);

export const FetchGetProduct = createAsyncThunk<{ cards: AdminType[] }>(
  "admin/fetchGetProduct",
  async () => {
    try {
      const { data } = await instance.get("/cards");
      return data;
    } catch (err) {
      throw err;
    }
  }
);


interface AdminInterface {
  item: AdminType[];
  status: string;
}

const initialState: AdminInterface = {
  item: [],
  status: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchGetProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchGetProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.item = action.payload.cards;
      })
      .addCase(FetchGetProduct.rejected, (state) => {
        state.status = "error";
      })
      .addCase(FetchDeleteAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchDeleteAdmin.fulfilled, (state, action) => {
        state.status = "success";
        state.item = state.item.filter((el) => el._id !== action.payload);
      })
      .addCase(FetchDeleteAdmin.rejected, (state) => {
        state.status = "error";
      })
      
  },
});

export default adminSlice.reducer;
