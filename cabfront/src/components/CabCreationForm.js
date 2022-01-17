import React, { useState } from "react";
import pmlAPI from "../api/pmlAPI";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const CabCreationForm = ({ setCabCreation }) => {
  const navigate = useNavigate();
  const [cabData , setcabData]=useState({
    userId:JSON.parse(localStorage.getItem('userData')).id,
    carModel:'',
    luggage:'',
    seats:'',
    price:'',
    cabImage:''

  })
  

  const handleCabFormSubmit = async (e) => {
    e.preventDefault();

    console.log(cabData)

    
    await pmlAPI.post(`/api/addCab`,cabData )
    .then(res=>{
      if(res?.data){
        swal({
        title: "success",
        text: res.data.massage,
        icon: "success",
       
      })
      navigate('/dashboard/allcabs')

      }else{
        swal({
        title: "Error",
        text: res.data.massage,
        icon: "error",
        dangerMode: true,
      })

      }
      
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })

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
                carModel: e.target.value
              })
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
                luggage: e.target.value
              })
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
                seats: e.target.value
              })
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
                price: e.target.value
              })
            }}
          />
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
                cabImage: e.target.value
              })
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
