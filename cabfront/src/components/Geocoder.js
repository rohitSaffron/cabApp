import { useEffect } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// Context
import { useRideValue } from "../context/rideContext";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGVjdG9yZzIyMTEiLCJhIjoiY2t0eWtxbmhtMDhwMTJwcG1jZXd0b3VhMSJ9.8XhBErdMP3PqsR-xN-NkMA";

const Geocoder = ({ number }) => {
  const [, dispatch] = useRideValue();

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      country: "in",
      bbox: [
        68.0753944015233, 6.65718310150864, 97.3950629309158, 35.6732489160381,
      ],
    });

    geocoder.addTo(`#geocoder${number}`);
    geocoder.on("result", (e) => {
     
     
      if (number === 1) dispatch({ type: "ADD_PICKUP", pickup: e.result });
      if (number === 2) dispatch({ type: "ADD_DROPOFF", dropoff: e.result });
    });
  }, [dispatch, number]);

  return <div className="geocoder" id={`geocoder${number}`}></div>;
};

export default Geocoder;
