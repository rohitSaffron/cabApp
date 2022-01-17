import { useEffect } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGVjdG9yZzIyMTEiLCJhIjoiY2t0eWtxbmhtMDhwMTJwcG1jZXd0b3VhMSJ9.8XhBErdMP3PqsR-xN-NkMA";

const addToMap = (map, coordinates) => {
  if (coordinates?.length > 0) {
    // const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  }
};

const Map = ({ pickupCoordinates, destinationCoordinates }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // Container ID
      style: "mapbox://styles/hectorg2211/ckw47o6zz3eck14qsch4mwwxd", // Style url
      center: [79.27329, 22.137936], // starting position [lng, lat]
      zoom: 4, // starting zoom
    });

    if (pickupCoordinates) addToMap(map, pickupCoordinates);
    if (destinationCoordinates) addToMap(map, destinationCoordinates);
    if (pickupCoordinates[0] !== 0 && destinationCoordinates[0] !== 0) {
      map.fitBounds([pickupCoordinates, destinationCoordinates], {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
      });
    }

    map.on("load", async () => {
      const query = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}?geometries=geojson&access_token=pk.eyJ1IjoiaGVjdG9yZzIyMTEiLCJhIjoiY2t0eWtxbmhtMDhwMTJwcG1jZXd0b3VhMSJ9.8XhBErdMP3PqsR-xN-NkMA`;
      const response = await fetch(query);
      const data = await response.json();
      if (data.routes?.length > 0) {
        const route = data.routes[0]?.geometry.coordinates;
        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        };

        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#468be8",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
    });
  }, [pickupCoordinates, destinationCoordinates]);

  return <div id="map"></div>;
};

export default Map;
