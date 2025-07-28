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
  const selectedFolder = useSelector(
    (state: any) => state.global.selectedFolder
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
            // center={
            //   selectedFolder.locations > 0
            //     ? {
            //         lat: selectedFolder.locations[0].geoLocation.lat,
            //         lng: selectedFolder.locations[0].geoLocation.lng,
            //       }
            //     : userLocation || { lat: 44.9778, lng: -93.265 }
            // }
            // zoom={10}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            {selectedFolder.locations.length > 0 &&
              selectedFolder.locations.map((location: any, index: number) => (
                <Marker
                  key={index || location.id}
                  position={{
                    lat: location.geoLocation.lat,
                    lng: location.geoLocation.lng,
                  }}
                  title={location.name || "Marker"}
                  label={""}
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
