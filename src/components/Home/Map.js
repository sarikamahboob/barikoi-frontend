import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import blueMarker from "../../assets/images/blue.png";
// import yellowMarker from "../../assets/images/yellow.png";
import blackMarker from "../../assets/images/black.png";
import greenMarker from "../../assets/images/green.png";
import redMarker from "../../assets/images/red.png";

const icon = L.icon({
  iconUrl: "../../assets/images/map-marker.png",
  iconSize: [38, 38],
});

const position = [51.505, -0.09];

function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.latitude, selectPosition?.longitude),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPosition]);

  return null;
}

const Map = ({ selectPosition,setSidebarOpen }) => {
  const locationSelection = [
    selectPosition?.latitude,
    selectPosition?.longitude,
  ];
  return (
    <div>
      <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectPosition && (
          <Marker
            position={locationSelection}
            icon={
              new Icon({
                iconUrl: selectPosition.pType === "Admin" ? greenMarker : (selectPosition.pType === "Office" ? redMarker : (selectPosition.pType === "Residential" ? blueMarker : blackMarker)),
                iconSize: [32,40],
                iconAnchor: [12, 41],
              })
            }
          ></Marker>
        )}
        <ResetCenterView selectPosition={selectPosition} />
      </MapContainer>
    </div>
  );
};

export default Map;
