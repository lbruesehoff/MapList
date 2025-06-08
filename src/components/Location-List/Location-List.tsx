import React from "react";
import "./Location-List.scss"; // Assuming you have some styles for the component

interface Location {
  id: number;
  name: string;
  address: string;
}

interface LocationListProps {
  locations: Location[];
  onSelect?: (location: Location) => void;
}

const LocationList: React.FC<LocationListProps> = ({ locations, onSelect }) => {
  return (
    <ul>
      {locations.map((location, index) => (
        <ul className="list bg-base-100 rounded-box shadow-md">
          {/* <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Most played songs this week
          </li> */}

          <li className="list-row">
            <div className="text-4xl font-thin opacity-30 tabular-nums">
              {index + 1}
            </div>
            <div>
              <img
                className="size-10 rounded-box"
                src="https://img.daisyui.com/images/profile/demo/1@94.webp"
              />
            </div>
            <div className="list-col-grow">
              <div>{location.name}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {location.address}
              </div>
            </div>
            {/* <button className="btn btn-square btn-ghost">
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
            </button> */}
          </li>
        </ul>
      ))}
    </ul>
  );
};

export default LocationList;
