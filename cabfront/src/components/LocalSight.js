import React, { useEffect, useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { TextField, Checkbox } from "@mui/material";
import "./Allcss/localSight.css";
import Footer from "./Footer";
import { useRideValue } from "../context/rideContext";
import Geocoder from "./Geocoder";
// API
import pmlAPI from "../api/pmlAPI";
import swal from "sweetalert";
// React router
import { useNavigate } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function LocalSight() {
  const [{ pickup, dropoff, passengers, date }, dispatch] = useRideValue();
  const navigate = useNavigate();

  const [data, setdata] = useState({
    name: "",
    email: "",
    phone: "",
    passengers: "",
    date: "",
  });
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (Object.keys(pickup).length !== 0 && Object.keys(dropoff).length !== 0) {
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup.center[0]},${pickup.center[1]};${dropoff.center[0]},${dropoff.center[1]}?access_token=pk.eyJ1IjoiaGVjdG9yZzIyMTEiLCJhIjoiY2t0eWtxbmhtMDhwMTJwcG1jZXd0b3VhMSJ9.8XhBErdMP3PqsR-xN-NkMA`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.routes) {
            console.log(data);
            dispatch({
              type: "ADD_DURATION",
              duration: data.routes[0]?.duration,
            });
            dispatch({
              type: "ADD_DISTANCE",
              distance: data.routes[0]?.distance,
            });
          }
        });
    }
  }, [dispatch, pickup, dropoff]);

  const localsightseenBtn = async (event) => {
    event.preventDefault();
    setloading(true);

    if (pickup.place_name) {
      let maindata = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: pickup.place_name,
        passengers: data.passengers,
        date: data.date,
      };

      let vvv = await pmlAPI.post("/api/localsightseen", maindata);

      if (vvv.data.massage) {
        swal({
          title: "Success",
          text: vvv.data.massage,
          icon: "success",
        });
        setloading(false);

        navigate("/");
      } else {
        swal({
          title: "Error",
          text: "Something Went Wronge",
          icon: "error",
        });
        setloading(false);
      }
    } else {
      swal({
        title: "Error",
        text: "Plz Select Location",
        icon: "error",
        dangerMode: true,
      });
      setloading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <>
      <br></br>
      <br></br>

      <Container fluid className="localContainer">
        <Row>
          <Col sm className="localColh1"></Col>
          <Col sm className="localColh1">
            <h1 className="titlemain">LOCAL SIGHTSEEING</h1>
          </Col>
          <Col sm className="localColh1"></Col>
        </Row>
      </Container>

      <Container>
        <Form onSubmit={localsightseenBtn}>
          <Row>
            <Col sm></Col>
            <Col sm className="secondTitle">
              <h2 className="titleSecond">LOCAL SIGHTSEEING</h2>
            </Col>
            <Col sm></Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col>
              <p className="localSightParaSecond">
                Give Us A Chance To Make Your Sightseeing Experience Memorable
                By Leaving Your Details Below And We Shall Get In Touch With You
              </p>
            </Col>
          </Row>

          <br></br>

          <div className="good_box">
            <Row className="textfieldRow">
              <Col sm>
                {" "}
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  className="textField"
                  required
                  value={data.name}
                  onChange={(e) => {
                    setdata({
                      ...data,
                      name: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col sm>
                {" "}
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className="textField"
                  type="email"
                  value={data.email}
                  required
                  onChange={(e) => {
                    setdata({
                      ...data,
                      email: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>

            <Row className="textfieldRow">
              <Col sm className="location_now">
                {" "}
                <div className="geocoder">
                  <Geocoder
                    id="outlined-basic"
                    variant="outlined"
                   // className="textField "
                    number={1}
                  />
                </div>
              </Col>
              <Col sm className="phoneTextfield">
                {" "}
                <TextField
                  id="outlined-basic"
                  label="Phone No"
                  variant="outlined"
                  type="tel"
                  className="textField "
                  value={data.phone}
                  required
                  onChange={(e) => {
                    setdata({
                      ...data,
                      phone: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>

            <Row className="textfieldRow">
              <Col sm>
                <TextField
                  id="outlined-basic"
                  label="No. Of Passanger"
                  variant="outlined"
                  className="textFieldsingle"
                  type="number"
                  value={data.passengers}
                  required
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    setdata({
                      ...data,
                      passengers: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col sm>
                {" "}
                <TextField
                  id="outlined-basic"
                  label="Date"
                  variant="outlined"
                  className="text_Field"
                  type="datetime-local"
                  sx={{ width: "330px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  onChange={(e) => {
                    setdata({
                      ...data,
                      date: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
          </div>

          <div className="at_end">
            <Row>
              <Col sm={1}>
                {" "}
                <Checkbox {...label} required />
              </Col>
              <Col sm={11}>
                <p>
                  I have read & accept the <a href="https://pmlholidays.com/policies?type=privacypolicy"
                target="_blank"
                >Privacy Policy</a>
                </p>
              </Col>
            </Row>

            <Row>
              <Col sm={1}>
                {" "}
                <Checkbox {...label} required />
              </Col>
              <Col sm={11}>
                <p>
                  Yes, I would like to receive updates about product & services,
                  promotions, special offers, news & events from Paul Merchants
                  Ltd. team via SMS/Email/Tele-Call.
                </p>
              </Col>
            </Row>

            <Row>
              <Col sm></Col>
              <Col sm>
                <Button type="submit" className="submitButton ">
                  {loading ? "Loading ..." : "Submit"}
                </Button>
              </Col>
              <Col sm></Col>
            </Row>
          </div>
        </Form>
      </Container>

      <Footer />
    </>
  );
}
