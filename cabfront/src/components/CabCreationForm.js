import React, { useState } from "react";
import pmlAPI from "../api/pmlAPI";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import {
  StateDropdown,
  RegionDropdown,
} from "react-indian-state-region-selector";

const CabCreationForm = ({ setCabCreation }) => {
  const navigate = useNavigate();
  const [cabData, setcabData] = useState({
    userId: JSON.parse(localStorage.getItem("userData")).id,
    carModel: "",
    luggage: "",
    seats: "",
    price: "",
    cabImage: "",
    region: "",
  });

  let allstate = [
    {
      abbreviation: "AN",
      name: "Andaman and Nicobar Islands",
    },
    {
      abbreviation: "AP",
      name: "Andhra Pradesh",
    },
    {
      abbreviation: "AR",
      name: "Arunachal Pradesh",
    },
    {
      abbreviation: "AS",
      name: "Assam",
    },
    {
      abbreviation: "BR",
      name: "Bihar",
    },
    {
      abbreviation: "CG",
      name: "Chandigarh",
    },
    {
      abbreviation: "CH",
      name: "Chhattisgarh",
    },
    {
      abbreviation: "DH",
      name: "Dadra and Nagar Haveli",
    },
    {
      abbreviation: "DD",
      name: "Daman and Diu",
    },
    {
      abbreviation: "DL",
      name: "Delhi",
    },
    {
      abbreviation: "GA",
      name: "Goa",
    },
    {
      abbreviation: "GJ",
      name: "Gujarat",
    },
    {
      abbreviation: "HR",
      name: "Haryana",
    },
    {
      abbreviation: "HP",
      name: "Himachal Pradesh",
    },
    {
      abbreviation: "JK",
      name: "Jammu and Kashmir",
    },
    {
      abbreviation: "JH",
      name: "Jharkhand",
    },
    {
      abbreviation: "KA",
      name: "Karnataka",
    },
    {
      abbreviation: "KL",
      name: "Kerala",
    },
    {
      abbreviation: "LD",
      name: "Lakshadweep",
    },
    {
      abbreviation: "MP",
      name: "Madhya Pradesh",
    },
    {
      abbreviation: "MH",
      name: "Maharashtra",
    },
    {
      abbreviation: "MN",
      name: "Manipur",
    },
    {
      abbreviation: "ML",
      name: "Meghalaya",
    },
    {
      abbreviation: "MZ",
      name: "Mizoram",
    },
    {
      abbreviation: "NL",
      name: "Nagaland",
    },
    {
      abbreviation: "OR",
      name: "Odisha",
    },
    {
      abbreviation: "PY",
      name: "Puducherry",
    },
    {
      abbreviation: "PB",
      name: "Punjab",
    },
    {
      abbreviation: "RJ",
      name: "Rajasthan",
    },
    {
      abbreviation: "SK",
      name: "Sikkim",
    },
    {
      abbreviation: "TN",
      name: "Tamil Nadu",
    },
    {
      abbreviation: "TS",
      name: "Telangana",
    },
    {
      abbreviation: "TR",
      name: "Tripura",
    },
    {
      abbreviation: "UP",
      name: "Uttar Pradesh",
    },
    {
      abbreviation: "UK",
      name: "Uttarakhand",
    },
    {
      abbreviation: "WB",
      name: "West Bengal",
    },
  ];
  const handleCabFormSubmit = async (e) => {
    e.preventDefault();

    console.log(cabData);

    await pmlAPI
      .post(`/api/addCab`, cabData)
      .then((res) => {
        if (res?.data) {
          swal({
            title: "success",
            text: res.data.massage,
            icon: "success",
          });
          navigate("/dashboard/allcabs");
        } else {
          swal({
            title: "Error",
            text: res.data.massage,
            icon: "error",
            dangerMode: true,
          });
        }

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setCabCreation(false);
  };

  return (
    <form className="cab-form" onSubmit={handleCabFormSubmit}>
      <div className="cab-form__container">
        <div className="cab-form__input">
          <label htmlFor="carModel">
            <p className="p p--1">Car Model</p>
          </label>
          <input
            type="text"
            id="carModel"
            placeholder="Car model..."
            value={cabData.carModel}
            onChange={(e) => {
              setcabData({
                ...cabData,
                carModel: e.target.value,
              });
            }}
            style={{
              fontSize: "16px",
              fontWeight: "normal",
            }}
          />
        </div>
      </div>

      <div className="cab-form__container">
        <div className="cab-form__input">
          <label htmlFor="carLuggage">
            <p className="p p--1">Luggage space</p>
          </label>
          <input
            type="number"
            id="carLuggage"
            min="0"
            value={cabData.luggage}
            onChange={(e) => {
              setcabData({
                ...cabData,
                luggage: e.target.value,
              });
            }}
            style={{
              fontSize: "16px",
              fontWeight: "normal",
            }}
          />
        </div>
      </div>

      <div className="cab-form__container">
        <div className="cab-form__input">
          <label htmlFor="carSeats">
            <p className="p p--1">Available seats</p>
          </label>
          <input
            type="number"
            id="carSeats"
            min="0"
            value={cabData.seats}
            onChange={(e) => {
              setcabData({
                ...cabData,
                seats: e.target.value,
              });
            }}
            style={{
              fontSize: "16px",
              fontWeight: "normal",
            }}
          />
        </div>
      </div>

      <div className="cab-form__container">
        <div className="cab-form__input">
          <label htmlFor="price">
            <p className="p p--1">Price per KM</p>
          </label>
          <input
            type="number"
            id="price"
            step="any"
            value={cabData.price}
            onChange={(e) => {
              setcabData({
                ...cabData,
                price: e.target.value,
              });
            }}
            style={{
              fontSize: "16px",
              fontWeight: "normal",
            }}
          />
        </div>
      </div>
      <div className="cab-form__container">
        <div className="cab-form__input">
          <label htmlFor="carImage">
            <p className="p p--1">Region</p>
          </label>
          <select
            style={{
              fontSize: "16px",
              fontWeight: "normal",
            }}
            onChange={(e)=>{
              setcabData({
                ...cabData,
                region: e.target.value,
              });
            }}
          >
            {allstate?.map((w) => {
              return (
                <option value={w.name}>{w.name}</option>
              )
            })}
          </select>
        </div>
      </div>

      <div className="cab-form__container">
        <div className="cab-form__input">
          <label htmlFor="carImage">
            <p className="p p--1">Car image URL</p>
          </label>
          <input
            type="text"
            id="carImage"
            placeholder="Car image..."
            value={cabData.cabImage}
            onChange={(e) => {
              setcabData({
                ...cabData,
                cabImage: e.target.value,
              });
            }}
            style={{
              fontSize: "16px",
              fontWeight: "normal",
            }}
          />
        </div>
      </div>

      <button className="btn btn--2" type="submit">
        Add Cab
      </button>
    </form>
  );
};

export default CabCreationForm;
