import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState, LocationMarker, LocationType } from "./store-interfaces";

const initialState: GlobalState = {
  theme: "default",
  folderList: [],
  folderOpen: false,
  locationList: [],
  locationMarkers: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.theme = action.payload ? "dark" : "default";
    },
    addFolder: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;
      state.folderList.push({ id, name });
    },
    setFolderOpen: (state, action: PayloadAction<boolean>) => {
      state.folderOpen = action.payload;
    },
    setLocationList: (state, action: PayloadAction<LocationType>) => {
      const newLocation: LocationType = {
        id: action.payload.id,
        name: action.payload.name,
        address: action.payload.address,
      };
      if (!state.locationList) {
        state.locationList = [];
      }
      state.locationList.push(newLocation);
    },
    addMarker: (state, action: PayloadAction<LocationMarker>) => {
      const newMarker: LocationMarker = {
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
      state.locationMarkers.push(newMarker);
    },
  },
});

export const {
  setTheme,
  addFolder,
  setFolderOpen,
  setLocationList,
  addMarker,
} = globalSlice.actions;
export default globalSlice.reducer;
