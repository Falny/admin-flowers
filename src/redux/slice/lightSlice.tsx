import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export type Light = {
  _id: string;
  light: string;
};

interface LightState {
  light: Light[];
  status: string;
}

export const FetchLightPost = createAsyncThunk(
  "admin/fetchLightPost",
  async (light: string) => {
    try {
      await instance.post("/light", { light });
    } catch (err) {
      console.log(err);
    }
  }
);

export const FetchLightGet = createAsyncThunk(
  "admin/fetchLightGet",
  async () => {
    try {
      const { data } = await instance.get("/light");
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const FetchLightDelete = createAsyncThunk(
  "admin/fetchLightDelete",
  async (id: string) => {
    try {
      await instance.delete(`/light/${id}`);
      return id;
    } catch (err) {
      throw err;
    }
  }
);

export const FetchLightPatch = createAsyncThunk(
  "admin/fetchLightPatch",
  async ({ id, light }: { id: string; light: string }) => {
    try {
      const { data } = await instance.patch(`/light/${id}`, { light });
      return data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: LightState = {
  light: [],
  status: "",
};

const lightSlice = createSlice({
  name: "light",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchLightGet.pending, (state) => {
        state.status = "pending";
      })
      .addCase(FetchLightGet.fulfilled, (state, action) => {
        state.light = action.payload;
        state.status = "success";
      })
      .addCase(FetchLightGet.rejected, (state) => {
        state.status = "error";
      })
      .addCase(FetchLightDelete.pending, (state) => {
        state.status = "pending";
      })
      .addCase(FetchLightDelete.fulfilled, (state, action) => {
        state.light = state.light.filter((el) => el._id !== action.payload);
        state.status = "success";
      })
      .addCase(FetchLightDelete.rejected, (state) => {
        state.status = "error";
      })
      .addCase(FetchLightPatch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(FetchLightPatch.fulfilled, (state, action) => {
        state.light = state.light.map((el) =>
          el._id === action.payload._id
            ? { ...el, light: action.payload.light }
            : el
        );
        state.status = "success";
      })
      .addCase(FetchLightPatch.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default lightSlice.reducer;
