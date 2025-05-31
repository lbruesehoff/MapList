import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";
import React from "react";
import "./Map.scss";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Map: React.FC = () => {
  return (
    <div className="map-container">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <div className="map">
          <GoogleMap
            style={{}}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          />
        </div>
      </APIProvider>
    </div>
  );
};

export default Map;
