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
      {locations.map((location) => (
        <li
          key={location.id}
          style={{ cursor: onSelect ? "pointer" : "default", marginBottom: 8 }}
          onClick={() => onSelect && onSelect(location)}
        >
          <strong>{location.name}</strong>
          <div>{location.address}</div>
        </li>
      ))}
    </ul>
  );
};

export default LocationList;
