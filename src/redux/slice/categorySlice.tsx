import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export type Catalog = {
  _id: string;
  catalog: string;
};

interface CatalogState {
  catalog: Catalog[];
  status: string;
}

export const FetchCategoryPost = createAsyncThunk(
  "admin/fetchCategoryPost",
  async (catalog: string) => {
    try {
      await instance.post("/category", { catalog });
    } catch (err) {
      console.log(err);
    }
  }
);

export const FetchCategoryGet = createAsyncThunk(
  "admin/fetchCategoryGet",
  async () => {
    try {
      const { data } = await instance.get("/category");
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const FetchCategoryDelete = createAsyncThunk(
  "admin/fetchCategoryDelete",
  async (id: string) => {
    try {
      await instance.delete(`/category/${id}`);
      return id;
    } catch (err) {
      console.log(err);
      alert("Не удалось удалить категорию");
    }
  }
);

export const FetchCategoryPatch = createAsyncThunk(
  "admin/fetchCategoryPatch",
  async ({ id, catalog }: { id: string; catalog: string}) => {
    try {
      const { data } = await instance.patch(`/category/${id}`, {catalog});
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const initialState: CatalogState = {
  catalog: [],
  status: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchCategoryGet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchCategoryGet.fulfilled, (state, action) => {
        state.catalog = action.payload;
        state.status = "success";
      })
      .addCase(FetchCategoryGet.rejected, (state) => {
        state.status = "error";
      })
      .addCase(FetchCategoryDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchCategoryDelete.fulfilled, (state, action) => {
        state.catalog = state.catalog.filter((el) => el._id !== action.payload);
        state.status = "success";
      })
      .addCase(FetchCategoryDelete.rejected, (state) => {
        state.status = "error";
      })
      .addCase(FetchCategoryPatch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchCategoryPatch.fulfilled, (state, action) => {
        state.catalog = state.catalog.map(
          (el) => el._id === action.payload._id ? { ...el, catalog: action.payload.catalog } : el
        ) 
        state.status = "success";
      })
      .addCase(FetchCategoryPatch.rejected, (state) => {
        state.status = "error";
      })
  },
});

export default categorySlice.reducer;
