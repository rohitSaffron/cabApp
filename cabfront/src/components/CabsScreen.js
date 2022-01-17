import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
// Router
import { useNavigate } from "react-router-dom";

// Contes
import { useRideValue } from "../context/rideContext";

// API
import pmlAPI from "../api/pmlAPI";

import CabCard from "./CabCard";

const   CabsScreen = () => {
  const [{ pickup, dropoff, date, passengers, distance }] = useRideValue();
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [travel , settravel]=useState([])
  const navigate = useNavigate();



  
  useEffect(() => {
    const tra=JSON.parse(localStorage.getItem('travelDetail'))
    settravel(tra)
   
  }, [])

  const onPageLoad = useCallback(() => {
 
      pmlAPI.get('/api/allcabuser')
      .then(res=>{
        setCabs(res.data);
        setTimeout(() => {
                setLoading(false);
              }, 1000);
      }).catch(err=>{
        console.log(err)
        setLoading(false);
      })
  }, [travel]);

  useEffect(() => {
    if (!pickup || !date) navigate("/");
    onPageLoad();
  }, [pickup, date, navigate, onPageLoad]);


console.log(cabs)
  const renderCabs = () =>
    cabs.map((cab) => (
      <CabCard
        carModel={cab.carModel}
        seats={cab.seats}
        luggage={cab.luggage}
        price={cab.price}
        cabImage={cab.cabImage}
        cabId={cab.userId}
        distance={travel?.distance}
      />
    ));

  return (
    <div className="cab-screen">
      <div className="cab-grid">
        <div className="ride-info">
          <div className="ride-info__title">
            <h2 className="h2--2">Your transfer</h2>
          </div>
          <div className="ride-info__pickup">
            <h3 className="h3 h3--1">Pick-up location</h3>
            <h3 className="h3">{travel?.pickup?.place_name}</h3>
          </div>
          {dropoff.place_name && (
            <div className="ride-info__dropoff">
              <h3 className="h3 h3--1">Drop-off location</h3>
              <h3 className="h3">{travel?.dropoff?.place_name}</h3>
            </div>
          )}
          <div className="ride-info__date">
            <h3 className="h3 h3--1">Pick-up Date & time</h3>
            <h3 className="h3">
              {moment(travel?.date).format("MMMM Do YYYY, h:mm a")}
            </h3>
          </div>
          <div className="ride-info__passengers">
            <h3 className="h3 h3--1">Passengers</h3>
            <h3 className="h3">
              {travel?.passengers?.adults} adt, {travel?.passengers?.children} chd,{" "}
              {travel?.passengers?.infants} inf
            </h3>
          </div>
        </div>

        <div className="cab-info">
          <div className="banner">
            <div className="banner__info">
              <div className="banner__img">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/126/126473.png"
                  alt="like"
                />
              </div>
              <div className="banner__text">
                <h3 className="h3">Save up to 30%</h3>
                <p className="p p--2">
                  We will find you the cheapest airport transfers with our
                  verified partners!
                </p>
              </div>
            </div>
            <div className="banner__info">
              <div className="banner__img">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4634/4634905.png"
                  alt="like"
                />
              </div>
              <div className="banner__text">
                <h3 className="h3">Professional drivers</h3>
                <p className="p p--2">
                  Experienced and polite drivers with well-serviced, comfortable
                  cabs.
                </p>
              </div>
            </div>
            <div className="banner__info">
              <div className="banner__img">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/912/912316.png"
                  alt="like"
                />
              </div>
              <div className="banner__text">
                <h3 className="h3">24 / 7 Customer Support</h3>
                <p className="p p--2">
                  We are always available to help you with your transfer
                </p>
              </div>
            </div>
          </div>

          {!loading && renderCabs()}
          {!loading && cabs.length === 0 && <h1>No cabs found</h1>}
          {loading && (
            <>
              <div className="cab-card">
                <div className="cab-card__image">
                  <Skeleton height="200px" width="200px" />
                </div>

                <div className="cab-card__details">
                  <h2 className="h2--2">
                    <Skeleton count={3} />
                  </h2>
                </div>

                <div className="cab-card__price">
                  <h2 className="h2--2">
                    <Skeleton count={2} />
                  </h2>
                </div>
              </div>
              <div className="cab-card">
                <div className="cab-card__image">
                  <Skeleton height="200px" width="200px" />
                </div>

                <div className="cab-card__details">
                  <h2 className="h2--2">
                    <Skeleton count={3} />
                  </h2>
                </div>

                <div className="cab-card__price">
                  <h2 className="h2--2">
                    <Skeleton count={2} />
                  </h2>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CabsScreen;
