import {
  APIProvider,
  Map as GoogleMap,
  Marker,
} from "@vis.gl/react-google-maps";
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
            defaultCenter={{ lat: 44.9778, lng: -93.265 }}
            defaultZoom={10}
            gestureHandling={"greedy"}
            disableDefaultUI={false}
          >
            <Marker
              position={{ lat: 44.9778, lng: -93.265 }}
              title="Marker Title"
              label=""
              onClick={() => {
                console.log("Marker clicked");
              }}
            />
          </GoogleMap>
        </div>
      </APIProvider>
    </div>
  );
};

export default Map;
