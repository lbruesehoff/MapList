import {
  APIProvider,
  Map as GoogleMap,
  Marker,
} from "@vis.gl/react-google-maps";
import React, { useEffect, useRef, useState } from "react";
import "./Map.scss";
import { useSelector } from "react-redux";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Map: React.FC = () => {
  const markerLocations = useSelector(
    (state: any) => state.global.locationMarkers
  );
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <div className="map-container">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <div className="map">
          <GoogleMap
            style={{}}
            // center={
            //   markerLocations.length > 0
            //     ? { lat: markerLocations[0].lat, lng: markerLocations[0].lng }
            //     : userLocation || { lat: 44.9778, lng: -93.265 }
            // }
            defaultCenter={
              markerLocations.length > 0
                ? { lat: markerLocations[0].lat, lng: markerLocations[0].lng }
                : userLocation || { lat: 44.9778, lng: -93.265 }
            }
            defaultZoom={10}
            gestureHandling={"greedy"}
            disableDefaultUI={false}
          >
            {markerLocations.length > 0 &&
              markerLocations.map((location: any, index: number) => (
                <Marker
                  key={index}
                  position={{ lat: location.lat, lng: location.lng }}
                  title={location.title || "Marker"}
                  label={location.label || ""}
                  onClick={() => {
                    console.log(`Marker ${index} clicked`);
                  }}
                />
              ))}
          </GoogleMap>
        </div>
      </APIProvider>
    </div>
  );
};

export default Map;
