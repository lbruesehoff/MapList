import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  theme: string; // Theme can be 'default', 'dark', etc.
}

const initialState: GlobalState = {
  theme: "default", // Default theme
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      // This reducer can be used to set a loading state
      // For example, you might want to show a loading spinner
      state.theme = action.payload ? "dark" : "default"; // Toggle between dark and default themes
    },
  },
});

export const { setTheme } = globalSlice.actions;
export default globalSlice.reducer;
