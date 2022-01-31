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
import "./Allcss/checkout.css";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
  Button,
  Form,
} from "react-bootstrap";
import one from "../imges/one.svg";
import two from "../imges/two.svg";
import three from "../imges/three.svg";

const   CabsScreen = () => {
  const [{ pickup, dropoff, date, passengers, distance ,TypeTravel }] = useRideValue();
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [travel , settravel]=useState([])
  const navigate = useNavigate();



  
  useEffect(() => {
    const tra=JSON.parse(localStorage.getItem('travelDetail'))
    settravel(tra)
    console.log({passengers})
   
  }, [])

  const onPageLoad = useCallback(() => {
    let localdata=JSON.parse(localStorage.getItem('travelDetail'))

    let typeoftravel =localdata?.pickup?.text?.toLowerCase()
    let totalpassanger= Number(localdata?.passengers?.adults)+Number(localdata?.passengers?.children)+Number(localdata?.passengers?.infants)
    console.log(totalpassanger)
 
      pmlAPI.get('/api/allcabuser')
      .then(res=>{

        let data=res?.data?.filter((w)=>{
         let compareee= w.region.toLowerCase()
         
         return compareee ==typeoftravel && totalpassanger  <= Number(w.seats)
        })
     
        setCabs(data);
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
    cabs?.map((cab) => (
      <CabCard
        carModel={cab?.carModel}
        seats={cab?.seats}
        luggage={cab?.luggage}
        price={cab?.price}
        cabImage={cab?.cabImage}
        cabId={cab?.userId}
        distance={travel?.distance}
        region={cab?.region}
      />
    ));

  return (
    <>
    <br>
  </br>
  
    <div className="cab-screen">
      <div className="cab-grid">
        <div className="ride-info">
          <div className="ride-info__title">
            <h2 className="h2--2">Your Booking</h2>
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
            <h3 className="h3 h3--1">Pick-up Date </h3>
            <h3 className="h3">
              {moment(travel?.date?.to).format("MMMM Do YYYY, h:mm a")} {travel?.date?.from ?'To':''} {moment(travel?.date?.from).format("MMMM Do YYYY, h:mm a")}
            </h3>
          </div>
          <div className="ride-info__passengers">
            <h3 className="h3 h3--1">Passengers</h3>
            <h3 className="h3">
              {travel?.passengers?.adults} adt, {travel?.passengers?.children} chd,{" "}
              {travel?.passengers?.infants} inf
            </h3>
          </div>

          <div>
        <Card style={{ width: "30rem" }}>
                  <Card.Header className="heading ">
                    Why Sign up or Login?
                  </Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col sm={3}>
                          {" "}
                          <img src={one} />
                        </Col>
                        <Col sm={9}>
                          <Card.Title>Unlock exclusive benefits</Card.Title>
                          <Card.Text>
                            Get amazing discounts on the first ride and
                            additional on others
                          </Card.Text>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col sm={3}>
                          <img src={two} />
                        </Col>
                        <Col sm={9}>
                          <Card.Title>
                            Track & Manage your bookings from one place
                          </Card.Title>
                          <Card.Text>
                            You can keep a track of your cab & manage all
                            bookings from one place
                          </Card.Text>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col sm={3}>
                          <img src={three} />
                        </Col>
                        <Col sm={9}>
                          <Card.Title>
                            Book faster with the saved details
                          </Card.Title>
                          <Card.Text>
                            The saved details can be used again to book your cab
                            ride
                          </Card.Text>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
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
    </>
  );
};

export default CabsScreen;