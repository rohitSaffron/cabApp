import React, { useState, useEffect, useReducer, useMemo } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// eslint-disable-next-line no-unused-vars
import Map from "./Map";
import Geocoder from "./Geocoder";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

// React router
import { useNavigate } from "react-router-dom";

// Dropdown
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Modal, Form, Container, Row, Col, Button } from "react-bootstrap";

// API
import pmlAPI from "../api/pmlAPI";

// Context
import { useRideValue } from "../context/rideContext";
import { jsx } from "@emotion/react";
import "./Allcss/Booking.css";
import Select, { StylesConfig } from "react-select";
import countryList from "react-select-country-list";
import TextField from "@mui/material/TextField";
import date from "date-and-time";
import swal from "sweetalert";
import "./Allcss/bookingSection.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const Booking = () => {
  // NOTE: The following context is for the use of the hidden map
  // const [{ pickup, dropoff, distance, duration, passengers, date }, dispatch] =
  //   useRideValue();
  const [{ pickup, dropoff, passengers, date, TypeTravel }, dispatch] =
    useRideValue();
  const matches = useMediaQuery("(max-width:910px)");

  const [selectedOption, setselectedOption] = useState("outstation");
  const [airportAction, setAirportAction] = useState("");
  const [open, setOpen] = React.useState(false);
  const [show, setshow] = useState(false);
  const [datetime, setdatetime] = useState();
  const [modalshow, setmodalshow] = useState(0);
  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();
  const travale = JSON.parse(localStorage.getItem("userData"));
  const [btnloding, setbtnloding] = useState(false);
  const [marge, setmargin] = useState("20px");
  const [datevale ,setdatevle]=useState({
    to:'',
    from:''
  })
  const [internationaldata, setinternationaldata] = useState({
    name: travale?.name || "No Data Found  plz LogIn",
    email: travale?.email || "No Data Found  plz LogIn",
    phone: "",
    location: "",
    date: "",
    luggage: "",
    passengers: {
      adults: "",
      children: "",
      infants: "",
    },
    textarea: "",
  });
  // const [showMap, setShowMap] = useState(false);

  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    if (
      internationaldata.name == "No Data Found  plz LogIn" &&
      internationaldata.email == "No Data Found  plz LogIn"
    ) {
      setbtnloding(true);
    } else {
      setbtnloding(false);
    }
  }, [internationaldata]);

  const handleSearchClick = async () => {

   


    if (selectedOption === 3) {
      dispatch({
        type: "ADD_DROPOFF",
        dropoff: {},
      });
    }

    /* TODO: Make a post request to build a new ride */
    // pmlAPI.post("/api/v1/rides", {
    //   type: selectedOption,
    //   from: pickup.place_name,
    //   to: dropoff.place_name,
    //   airportTransfer: airportAction,
    //   pickupDate: date,
    //   passengers: passengers.adults + passengers.children + passengers.infants,
    // });

    // Navigate to the next screen if the pickup and a date are selected
    if (Object.keys(pickup).length > 0 && date) navigate("/cabs");
    /* toggleMapRender();
    Create a new ride document
    let document = await pmlAPI.post("/api/v1/rides", {
      from: `${pickup.place_name}`,
      to: `${dropoff.place_name}`,
      distance: `${distance}`,
      coordinates: {
        from: pickup.center,
        to: dropoff.center,
      },
      date: new Date(),
    });
    console.log(document);
    */
  };

  // Dropdown
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const styles = {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: "1px solid",
    p: 2,
    bgcolor: "background.paper",
    borderRadius: "3px",
    width: "300px",
  };

  /* Get the duration of the ride and store it in context */
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

  const handleClose = () => {
    setshow(false);
    setmodalshow(0);
  };

  const modalBtn = async () => {
    if (modalshow == 3) {
      setbtnloding(true);

      await pmlAPI
        .post("/api/inetrquery", internationaldata)
        .then((res) => {
          if (res.data.result) {
            swal({
              title: "success",
              text: res.data.massage,
              icon: "success",
            });
            setshow(false);
            setbtnloding(false);
            setmodalshow(0);
          } else {
            swal({
              title: "Error",
              text: res.data.massage,
              icon: "error",
              dangerMode: true,
            });
            setbtnloding(false);
            setmodalshow(0);
          }
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "Error",
            text: "Somiting Went Wrong Try Again",
            icon: "error",
            dangerMode: true,
          });
          setbtnloding(false);
          setmodalshow(0);
        });
    } else {
      setmodalshow(modalshow + 1);
    }
  };

  useEffect(() => {
    if (matches) {
      setmargin("300px");
    } else {
      setmargin("20px");
    }
  }, [matches]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        className="mainModal"
      >
        <Modal.Header closeButton className="modalmain">
          <Modal.Title className="modaltitle">
            International Travel Query
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalbody">
          <>
            {modalshow == 0 ? (
              <>
                <div className="row">
                  <div className="col-sm-6">
                    <div>
                      <label className="lablename">Name :</label>
                    </div>
                    <div>
                      <label className="lablename">Email :</label>
                    </div>
                    <div>
                      <label className="lablename">Phone No. :</label>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="inputdiv">
                      <span className="inputfield">
                        {internationaldata.name}
                      </span>
                    </div>

                    <div className="inputdiv">
                      <span className="inputfield">
                        {internationaldata.email}
                      </span>
                    </div>
                    <div className="inputdiv">
                      <input
                        type="text"
                        value={internationaldata.phone}
                        className="inputfield"
                        placeholder="Phone No"
                        onChange={(e) => {
                          setinternationaldata({
                            ...internationaldata,
                            phone: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : modalshow == 1 ? (
              <>
                <div className="row">
                  <div className="col-sm-6">
                    <div>
                      <label className="lablename">Location :</label>
                    </div>

                    <div>
                      <label className="lablename">Date And Time :</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="countrydiv">
                      <Select
                        className="selectcountry"
                        options={options}
                        // value={internationaldata.location}
                        onChange={(e) => {
                          setinternationaldata({
                            ...internationaldata,
                            location: e.label,
                          });
                        }}
                      />
                    </div>

                    <div>
                      <TextField
                        id="datetime-local"
                        type="datetime-local"
                        sx={{ width: 250 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setinternationaldata({
                            ...internationaldata,
                            date: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : modalshow == 2 ? (
              <>
                <div className="row">
                  <div className="col-sm-6">
                    <label className="lablename ">Luggage Weight In KG :</label>
                  </div>

                  <div className="col-sm-6">
                    <input
                      type="number"
                      min="0"
                      placeholder="Luggage Weight"
                      className="inputfield"
                      value={internationaldata.luggage}
                      onChange={(e) => {
                        setinternationaldata({
                          ...internationaldata,
                          luggage: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h3>No. of People :</h3>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div>
                      <label className="lablename ">Adults :</label>
                    </div>

                    <div>
                      <label className="lablename ">Childerns:</label>
                    </div>
                    <div>
                      <label className="lablename ">Infants:</label>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div>
                      <input
                        type="number"
                        min="0"
                        placeholder="Adults"
                        className="inputfieldch"
                        value={internationaldata.passengers.adults}
                        onChange={(e) => {
                          setinternationaldata({
                            ...internationaldata,
                            passengers: {
                              ...internationaldata.passengers,
                              adults: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        min="0"
                        placeholder="Childerns"
                        className="inputfieldch"
                        value={internationaldata.passengers.children}
                        onChange={(e) => {
                          setinternationaldata({
                            ...internationaldata,
                            passengers: {
                              ...internationaldata.passengers,
                              children: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        min="0"
                        placeholder="Infants"
                        className="inputfieldch"
                        value={internationaldata.passengers.infants}
                        onChange={(e) => {
                          setinternationaldata({
                            ...internationaldata,
                            passengers: {
                              ...internationaldata.passengers,
                              infants: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div>
                    <label className="lablename ">Any Other query :</label>{" "}
                    <br></br>
                    <textarea
                      id="w3review"
                      name="w3review"
                      rows="9"
                      cols="85"
                      className="textareabook"
                      placeholder="Any Other query "
                      value={internationaldata.textare}
                      onChange={(e) => {
                        setinternationaldata({
                          ...internationaldata,
                          textarea: e.target.value,
                        });
                      }}
                    ></textarea>
                  </div>
                </div>
              </>
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btnmodal"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              modalBtn();
            }}
            disabled={btnloding}
            className="btnmodal"
          >
            {btnloding ? "Loading ......" : " Understood"}
          </Button>
        </Modal.Footer>
      </Modal>

      <section
        className="booking"
        style={{
          marginBottom: marge,
        }}
      >
        <Container>
          <Row>
            <Col sm={3}></Col>
            <Col sm={6}>
              {" "}
              <h2 className="h2 h2--1 headingmain">
                Plan Your Journey With Us!
              </h2>
            </Col>
            <Col sm={3}></Col>
          </Row>
        </Container>

        <div className="booking__container book_hover">
          <p
            className={`p p--1 ${
              selectedOption === "outstation" ? "active" : ""
            }`}
            onClick={() => {
              let data = "outstation";
              dispatch({
                type: "TypeTravel",
                data,
              });
              setselectedOption("outstation");
            }}
          >
            Outstation/Other
          </p>
          {/* <p
                  className={`p p--1 ${
                    selectedOption === "hourly" ? "active" : ""
                  }`}
                  onClick={() => {
                    let data ='hourly'
                    dispatch({
                      type: "TypeTravel",
                      data,
                    });
                    setselectedOption("hourly")
                  }}
                >
                  Hourly
                </p>
                <p
                  className={`p p--1 ${
                    selectedOption === "Airport" ? "active" : ""
                  }`}
                  onClick={() => {
                    setselectedOption("Airport");
                    setshow(true);
                  }}
                >
                  International Travel
                </p> */}
        </div>

        <div className="booking__container"></div>

        <div className="booking__container ">
          <div className="booking__pickup">
            <h2 className="h2 ">Pick-up location</h2>
            <Geocoder number={1} />
          </div>

          {selectedOption !== "hourly" && (
            <div className="booking__dropoff">
              <h2 className="h2 ">Drop-off</h2>
              <Geocoder number={2} />
            </div>
          )}

          <div className="booking__date">
            <h2 className="h2 ">Pick-up Date & Time</h2>
            <input type="date" 
            onChange={(e)=>{
              setdatevle({
                ...datevale,
                to:e.target.value
              })
            }} />

            <input type="date"
             onChange={(e)=>{
              let datedata={
                to:datevale?.to,
                from:e.target.value


              }
              dispatch({
                type: "ADD_DATE",
                date:datedata
              });
            }} />
          </div>

          <div className="booking__passengers">
            <h2 className="h2 ">Passengers</h2>
            <div className="passenger-counter">
              <ClickAwayListener onClickAway={handleClickAway}>
                <Box sx={{ position: "relative" }}>
                  <button
                    type="button"
                    className="passenger-btn"
                    onClick={handleClick}
                  >
                    <h2 className="h2 very_high">
                      {passengers.adults} Adt,
                      {passengers.children} Chd,
                      {passengers.infants} Inf
                    </h2>
                  </button>
                  {open ? (
                    <Box sx={styles} className="passenger-dropdown">
                      <div className="passenger-dropdown__row">
                        <div className="passenger-dropdown__left">
                          <h2 className="h2">Adult</h2>
                          <h3 className="h3 ">12+yrs</h3>
                        </div>
                        <div className="passenger-dropdown__right">
                          <button
                            className="minus"
                            onClick={() => {
                              if (passengers.adults === 0) return;
                              dispatch({
                                type: "SUBTRACT_PASSENGERS_ADULTS",
                                passengers,
                              });
                            }}
                          >
                            -
                          </button>
                          <h3 className="h3 h3--1">{passengers.adults}</h3>
                          <button
                            className="plus"
                            onClick={() => {
                              dispatch({
                                type: "ADD_PASSENGERS_ADULTS",
                                passengers,
                              });
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="passenger-dropdown__row">
                        <div className="passenger-dropdown__left">
                          <h2 className="h2">Children</h2>
                          <h3 className="h3 ">(2+12yrs)</h3>
                        </div>
                        <div className="passenger-dropdown__right">
                          <button
                            className="minus"
                            onClick={() => {
                              if (passengers.children === 0) return;
                              dispatch({
                                type: "SUBTRACT_PASSENGERS_CHILDREN",
                                passengers,
                              });
                            }}
                          >
                            -
                          </button>
                          <h3 className="h3 h3--1">{passengers.children}</h3>
                          <button
                            className="plus"
                            onClick={() => {
                              dispatch({
                                type: "ADD_PASSENGERS_CHILDREN",
                                passengers,
                              });
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="passenger-dropdown__row">
                        <div className="passenger-dropdown__left">
                          <h2 className="h2">Infants</h2>
                          <h3 className="h3 ">(below 2 yrs)</h3>
                        </div>
                        <div className="passenger-dropdown__right">
                          <button
                            className="minus"
                            onClick={() => {
                              if (passengers.infants === 0) return;
                              dispatch({
                                type: "SUBTRACT_PASSENGERS_INFANTS",
                                passengers,
                              });
                            }}
                          >
                            -
                          </button>
                          <h3 className="h3 h3--1">{passengers.infants}</h3>
                          <button
                            className="plus"
                            onClick={() => {
                              dispatch({
                                type: "ADD_PASSENGERS_INFANTS",
                                passengers,
                              });
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </Box>
                  ) : null}
                </Box>
              </ClickAwayListener>
            </div>
          </div>

          <button className="booking__button" onClick={()=>{
            handleSearchClick()
            
            
            }}>
            <SearchRoundedIcon />
            <h2 className="h2">Search</h2>
          </button>
        </div>

        {/* {showMap && (
        <>
          <div className="booking__map">
            <Map
              pickupCoordinates={pickup.center}
              destinationCoordinates={dropoff.center}
            />
          </div>

          <div className="cards ">
            <div className="cards__top">
              <div className="cards__from">
                <h3 className="h3">From:</h3>
                <p className="p p--1">{pickup.place_name}</p>
              </div>
              <div className="cards__to">
                <h3 className="h3">To:</h3>
                <p className="p p--1">{dropoff.place_name}</p>
              </div>
            </div>

            <div className="cards__bottom">
              <div className="cards__duration">
                <h3 className="h3">Duration:</h3>
                <p className="p p--1">{Math.trunc(duration / 60)} Minutes</p>
              </div>
              <div className="cards__distance">
                <h3 className="h3">Distance:</h3>
                <p className="p p--1">{Math.trunc(distance * 0.001)} KM</p>
              </div>
              <div className="cards__bookmark">
                <BookmarkBorderIcon />
              </div>
            </div>
          </div>
        </>
      )} */}
      </section>
    </>
  );
};

export default Booking;
