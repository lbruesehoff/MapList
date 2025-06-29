export interface GlobalState {
  theme: string; // Theme can be 'default', 'dark', etc.
  selectedFolder: FolderType;
  folders: FolderType[]; // List of folders
  folderOpen: boolean; // Indicates if the folder is open
  locationMarkers: LocationMarker[]; // Optional list of location markers
}

export interface FolderType {
  id: string; // Unique identifier for the folder
  name: string; // Name of the folder
  locations?: LocationType[]; // Optional list of locations within the folder
}
export interface LocationType {
  id: string; // Unique identifier for the location
  folderId: string; // Optional folder ID if the location belongs to a folder
  name: string; // Name of the location
  address: string; // Address of the location
  geoLocation: LocationMarker; // Optional geographical location of the location
}

export interface LocationMarker {
  lat: number; // Latitude of the marker
  lng: number; // Longitude of the marker
}
