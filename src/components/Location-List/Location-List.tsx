import React, { useState } from "react";
import "./Location-List.scss";
import { LocationType } from "../../store/store-interfaces";
import { useDispatch } from "react-redux";
import { deleteLocation } from "../../store/global-store";

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
  const [removingId, setRemovingId] = useState<string | null>(null); // State to track which location is being removed

  const deleteLocationMarker = (location: LocationType) => {
    setRemovingId(location.id);
    setTimeout(() => {
      dispatch(deleteLocation(location));
      setRemovingId(null);
    }, 400); // Match animation duration
  };

  return (
    <div>
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

              <li className="list-row">
                <div className="text-primary-content text-4xl font-thin opacity-30 tabular-nums">
                  {index + 1}
                </div>
                <div>
                  <img
                    className="size-10 rounded-box"
                    src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                  />
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
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M6 3L20 12 6 21 6 3z"></path>
                    </g>
                  </svg>
                </button>
              </li>
            </ul>
          ))
        ) : (
          <div
            role="alert"
            className="alert alert-info alert-soft no-locations"
          >
            <span>You have 0 locations.. why?</span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default LocationList;
