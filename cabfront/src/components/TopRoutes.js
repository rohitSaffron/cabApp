import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./Allcss/topRoutes.css"

const TopRoutes = () => {
  return (
    <section className="top-routes">
      <div className="top-routes__container">
        <h2 className="h2 h2--2  mt-big">Top Cab Routes</h2>
      </div>
      <div className="top-routes__container">
        <div className="top-routes__route">
          <LocationOnIcon />
          <p className="p p--1">Mumbai - Pune</p>
        </div>
        <div className="top-routes__route">
          <LocationOnIcon />
          <p className="p p--1">Chennai - Pondicherry</p>
        </div>
        <div className="top-routes__route">
          <LocationOnIcon />
          <p className="p p--1">Bangalore - Coorg</p>
        </div>
        <div className="top-routes__route">
          <LocationOnIcon />
          <p className="p p--1">Pune - Shirdi</p>
        </div>
        <div className="top-routes__route">
          <LocationOnIcon />
          <p className="p p--1">New Delhi - Chandigarh</p>
        </div>
        <div className="top-routes__route">
          <LocationOnIcon />
          <p className="p p--1">Pune - Mumbai</p>
        </div>
        <div className="top-routes__route">
          <LocationOnIcon />
          <p className="p p--1">Chandigarh - Manali</p>
        </div>
        <div className="top-routes__route">
          <LocationOnIcon />
          <p className="p p--1">Delhi - Agra</p>
        </div>
        <div className="top-routes__route">
          <LocationOnIcon />
          <p className="p p--1">Pune - Shirdi</p>
        </div>
        <div className="top-routes__route">
          <LocationOnIcon />
          <p className="p p--1">Delhi - Haridwar</p>
        </div>
        <div className="top-routes__route">
          <LocationOnIcon />
          <p className="p p--1">Chandigarh - Shimla</p>
        </div>
        <div className="top-routes__route">
          <LocationOnIcon />
          <p className="p p--1">Dehradun - Mussoorie</p>
        </div>
      </div>
    </section>
  );
};

export default TopRoutes;
