import React, { useEffect, useState } from "react";
import "./Location-List.scss";
import { LocationType } from "../../store/store-interfaces";
import { useDispatch, useSelector } from "react-redux";
import { deleteLocation, setLocationList } from "../../store/global-store";
import { TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { deleteLocationFirestore } from "../../google/Fire-Store/database-calls";
import { getAuth } from "firebase/auth";

import { useGetGoogleMapsApiKeyQuery } from "../../api/firebase-api";
import { mapStyles } from "../Map/MapStyles";

interface Location {
  id: number;
  name: string;
  address: string;
}

interface LocationListProps {
  locations: LocationType[];
  onSelect?: (location: Location) => void;
}

const LocationList: React.FC<LocationListProps> = ({ locations, onSelect }) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const { data: googleMapsApiKeyData } = useGetGoogleMapsApiKeyQuery();
  const user = auth.currentUser;
  const selectedFolder = useSelector(
    (state: any) => state.global.selectedFolder
  );
  const getTheme = useSelector((state: any) => state.global.theme);
  const [removingId, setRemovingId] = useState<string | null>(null); // State to track which location is being removed
  const [isExporting, setIsExporting] = useState(false); // Download state

  const deleteLocationMarker = (location: LocationType) => {
    setRemovingId(location.id);
    setTimeout(() => {
      dispatch(deleteLocation(location));
      deleteLocationFirestore(user?.uid || "", location.folderId, location.id);
      setRemovingId(null);
    }, 400); // Match animation duration
  };

  /**
   * Captures a screenshot of the current map view with all locations marked.
   * Also applies the current theme styles to the static map.
   * @returns
   */
  const captureScreenshot = async () => {
    setIsExporting(true);

    try {
      const apiKey = googleMapsApiKeyData?.apiKey;
      if (!apiKey) {
        console.error("Google Maps API key not found");
        setIsExporting(false);
        return;
      }

      // Calculate center point (average of all locations)
      const center =
        locations.length > 0
          ? locations.reduce(
              (acc, loc) => ({
                lat: acc.lat + loc.geoLocation.lat / locations.length,
                lng: acc.lng + loc.geoLocation.lng / locations.length,
              }),
              { lat: 0, lng: 0 }
            )
          : { lat: 44.9778, lng: -93.265 };

      // Build markers string for each location
      const markersParam = locations
        .map(
          (loc, index) =>
            `markers=color:red|label:${index + 1}|${loc.geoLocation.lat},${
              loc.geoLocation.lng
            }`
        )
        .join("&");

      // Convert theme styles to Static Maps API format
      const themeStyles = mapStyles(getTheme);
      const styleParam =
        themeStyles && Array.isArray(themeStyles)
          ? themeStyles
              .map((style) => {
                let styleString = "&style=";

                if (style.featureType) {
                  styleString += `feature:${style.featureType}|`;
                }
                if (style.elementType) {
                  styleString += `element:${style.elementType}|`;
                }

                if (style.stylers && Array.isArray(style.stylers)) {
                  const rules = style.stylers
                    .map((styler) => {
                      return Object.entries(styler)
                        .map(([key, value]) => {
                          // Convert color format from # to 0x
                          if (
                            key === "color" &&
                            typeof value === "string" &&
                            value.startsWith("#")
                          ) {
                            return `${key}:0x${value.substring(1)}`;
                          }
                          return `${key}:${value}`;
                        })
                        .join("|");
                    })
                    .join("|");

                  styleString += rules;
                }

                return styleString;
              })
              .join("")
          : "";

      // Generate Static Map URL
      const size = "1200x800";
      const zoom = locations.length === 1 ? 13 : 12; // Adjust zoom based on number of locations
      const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${center.lng}&zoom=${zoom}&size=${size}&${markersParam}${styleParam}&key=${apiKey}`;

      // Fetch and download the image
      const response = await fetch(staticMapUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.download = `${selectedFolder?.name || "map"}-map.png`;
      link.href = url;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div>
      <div className="folder-name-container">
        <h2 className="text-secondary folder-name">{selectedFolder?.name}</h2>
        {locations.length > 0 && (
          <div className="export-buttons">
            <button
              className="btn btn-sm btn-secondary"
              onClick={captureScreenshot}
              disabled={isExporting}
            >
              {isExporting ? "Downloading..." : "Download Map"}
            </button>
          </div>
        )}
      </div>
      <ul>
        {locations.length > 0 ? (
          locations.map((location, index) => (
            <ul
              className={`list bg-primary bg-base-100 rounded-box shadow-md location-container${
                removingId === location.id ? " slide-out-left" : ""
              }`}
              key={location.id}
            >
              {/* <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Most played songs this week
          </li> */}

              <li className="list-row location-content">
                <div className="text-primary-content text-4xl font-thin opacity-30 tabular-nums">
                  {index + 1}
                </div>
                <div className="list-col-grow">
                  <div className="text-primary-content">{location.name}</div>
                  <div className="text-primary-content text-xs uppercase font-semibold opacity-60">
                    {location.address}
                  </div>
                </div>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => deleteLocationMarker(location)}
                >
                  <TrashIcon size={32} className="delete-location-icon" />
                </button>
              </li>
            </ul>
          ))
        ) : (
          <div role="alert" className="alert alert-info no-locations">
            <span className="text-primary-content">
              Now, populate the folder with locations. The Old Ones require
              offerings one pin at a time...
            </span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default LocationList;
