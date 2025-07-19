import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export type Structura = {
  _id: string;
  structura: string;
};

interface StructuraState {
  structura: Structura[];
  status: string;
}

export const FetchStructuraPost = createAsyncThunk(
  "admin/fetchStructuraPost",
  async (structura: string) => {
    try {
      await instance.post("/structura", { structura });
    } catch (err) {
      console.log(err);
    }
  }
);

export const FetchStructuraGet = createAsyncThunk(
  "admin/fetchStructuraGet",
  async () => {
    try {
      const { data } = await instance.get("/structura");
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const FetchStructuraDelete = createAsyncThunk(
  "admin/fetchStructuraDelete",
  async (id: string) => {
    try {
      await instance.delete(`/structura/${id}`);
      return id;
    } catch (err) {
      throw err;
    }
  }
);

export const FetchStructuraPatch = createAsyncThunk(
  "admin/fetchStructuraPatch",
  async ({ id, structura }: { id: string; structura: string }) => {
    try {
      const { data } = await instance.patch(`/structura/${id}`, { structura });
      return data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: StructuraState = {
  structura: [],
  status: "",
};

const structuraSlice = createSlice({
  name: "structura",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchStructuraGet.pending, (state) => {
        state.status = "pending";
      })
      .addCase(FetchStructuraGet.fulfilled, (state, action) => {
        state.structura = action.payload;
        state.status = "success";
      })
      .addCase(FetchStructuraGet.rejected, (state) => {
        state.status = "error";
      })
      .addCase(FetchStructuraDelete.pending, (state) => {
        state.status = "pending";
      })
      .addCase(FetchStructuraDelete.fulfilled, (state, action) => {
        state.structura = state.structura.filter(
          (el) => el._id !== action.payload
        );
        state.status = "success";
      })
      .addCase(FetchStructuraDelete.rejected, (state) => {
        state.status = "error";
      })
      .addCase(FetchStructuraPatch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(FetchStructuraPatch.fulfilled, (state, action) => {
        state.structura = state.structura.map((el) =>
          el._id === action.payload._id
            ? { ...el, structura: action.payload.structura }
            : el
        );
        state.status = "success";
      })
      .addCase(FetchStructuraPatch.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default structuraSlice.reducer;
