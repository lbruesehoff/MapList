import React from "react";
import "./Location-List.scss";
import Folder from "../../components/Folder/Folder";
import Map from "../../components/Map/Map";

const LocationList: React.FC = () => {
  return (
    <div className="list-container">
      <div className="folder-container">
        <Folder name="Folder Name" />
      </div>
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
};

export default LocationList;
