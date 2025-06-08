export interface GlobalState {
  theme: string; // Theme can be 'default', 'dark', etc.
  folderList: FolderType[]; // List of folders
  folderOpen: boolean; // Indicates if the folder is open
  locationList?: LocationType[]; // Optional list of locations
}

export interface FolderType {
  id: string; // Unique identifier for the folder
  name: string; // Name of the folder
}
export interface LocationType {
  id: string; // Unique identifier for the location
  name: string; // Name of the location
  address: string; // Address of the location
}
