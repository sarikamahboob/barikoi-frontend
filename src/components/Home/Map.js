// import L, { Icon } from "leaflet";
// import "leaflet/dist/leaflet.css";
import { MapView } from "@deck.gl/core";
import { DeckGL } from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect } from "react";
import { Map, Marker } from "react-map-gl";
// import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import blueMarker from "../../assets/images/blue.png";
// import yellowMarker from "../../assets/images/yellow.png";
import blackMarker from "../../assets/images/black.png";
import redMarker from "../../assets/images/red.png";

// const icon = L.icon({
//   iconUrl: "../../assets/images/map-marker.png",
//   iconSize: [38, 38],
// });

// const position = [51.505, -0.09];

// function ResetCenterView(props) {
//   const { selectPosition } = props;
//   const map = useMap();

//   useEffect(() => {
//     if (selectPosition) {
//       map.setView(
//         L.latLng(selectPosition?.latitude, selectPosition?.longitude),
//         map.getZoom(),
//         {
//           animate: true,
//         }
//       );
//     }
//   }, [selectPosition]);

//   return null;
// }

const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
};

// const data = [
//   {
//     sourcePosition: [-122.41669, 37.7853],
//     targetPosition: [-122.41669, 37.781],
//   },
// ];

// const layers = [new LineLayer({ id: "line-layer", data })];

const MainMap = ({ selectPosition, setSidebarOpen }) => {
  // const locationSelection = [
  //   selectPosition?.latitude,
  //   selectPosition?.longitude,
  // ];
  // const layers = [new LineLayer({ id: "line-layer", data })];
  const TOKEN =
    "pk.eyJ1Ijoic2FyaWthMzQzIiwiYSI6ImNsZno2OHhnaTE3emYzcXF1em5mOHVwaDcifQ.r4d8RIU9Dja96ijziSKBfQ";
  console.log(TOKEN);
  console.log(selectPosition?.latitude, selectPosition?.longitude);
  useEffect(() => {}, [selectPosition]);
  return (
    <div>
      {selectPosition ? (
        <DeckGL
          initialViewState={{
            longitude: Number(selectPosition?.longitude),
            latitude: Number(selectPosition?.latitude),
            zoom: 13,
          }}
          controller={true}
        >
          <MapView id="map" width="100%" controller={true}>
            <Map
              style={{ width: "100%", height: "100%" }}
              mapboxAccessToken={TOKEN}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              {selectPosition && (
                <Marker
                  longitude={Number(selectPosition?.longitude)}
                  latitude={Number(selectPosition?.latitude)}
                  anchor="bottom"
                >
                  {selectPosition.pType === "Admin" ? (
                    <img src={blueMarker} alt="marker" />
                  ) : selectPosition.pType === "Office" ? (
                    <img src={redMarker} alt="marker" />
                  ) : selectPosition.pType === "Residential" ? (
                    <img src={blueMarker} alt="marker" />
                  ) : (
                    <img src={blackMarker} alt="marker" />
                  )}
                </Marker>
              )}
            </Map>
          </MapView>
        </DeckGL>
      ) : (
        <DeckGL
          initialViewState={{
            longitude: -122.41669,
            latitude: 37.7853,
            zoom: 13,
          }}
          controller={true}
        >
          <MapView id="map" width="100%" controller={true}>
            <Map
              style={{ width: "100%", height: "100%" }}
              mapboxAccessToken={TOKEN}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            ></Map>
          </MapView>
        </DeckGL>
      )}
      {/* <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
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
      </MapContainer> */}
    </div>
  );
};

export default MainMap;
