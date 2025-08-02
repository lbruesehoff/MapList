import {
  APIProvider,
  Map as GoogleMap,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import React, { useEffect, useRef, useState } from "react";
import "./Map.scss";
import { useSelector } from "react-redux";
import { mapStyles } from "./MapStyles";
import { MapStyleTypes } from "./Map-Types";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const FitBounds: React.FC<{ locations: any[] }> = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (map && locations && locations.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((location: any) => {
        bounds.extend({
          lat: location.geoLocation.lat,
          lng: location.geoLocation.lng,
        });
      });

      map.fitBounds(bounds);

      const currentZoom = map.getZoom();
      map.setZoom(locations.length < 2 ? currentZoom - 5 : currentZoom - 1);
    }
  }, [map, locations]);

  return null;
};

const Map: React.FC = () => {
  const selectedFolder = useSelector(
    (state: any) => state.global.selectedFolder
  );
  const getTheme = useSelector((state: any) => state.global.theme);

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [mapStyle, setMapStyle] = useState<MapStyleTypes>(MapStyleTypes.Light);

  useEffect(() => {}, [getTheme]);

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
            styles={mapStyles(getTheme)}
            defaultZoom={13}
            defaultCenter={
              selectedFolder.locations && selectedFolder.locations.length > 0
                ? {
                    lat: selectedFolder.locations[0].geoLocation.lat,
                    lng: selectedFolder.locations[0].geoLocation.lng,
                  }
                : userLocation || { lat: 44.9778, lng: -93.265 }
            }
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            draggable={true}
          >
            <FitBounds locations={selectedFolder.locations || []} />
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
