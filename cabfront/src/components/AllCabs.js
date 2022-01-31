import React, { useState, useEffect } from "react";
import "./Allcss/Allcab.css";
import pmlAPI from "../api/pmlAPI";
import nodataimg from "../imges/nodataFound.png";
import EditIcon from "@mui/icons-material/Edit";
import { Modal, Button, Form } from "react-bootstrap";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import swal from "sweetalert";
import { nanoid } from 'nanoid'


export default function AllCabs() {
  const [data, setdata] = useState([]);
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [editcab, seteditcab] = useState([]);
  const [forrefresh, setforrefresh] = useState();



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



  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userData")).id;

    pmlAPI
      .get(`/api/allcabs/${id}`)
      .then((res) => {
        //console.log(res.data.cab)
        setdata(res.data.cab);
        setStatus(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userData")).id;

    pmlAPI
      .get(`/api/allcabs/${id}`)
      .then((res) => {
        //console.log(res.data.cab)
        setdata(res.data.cab);
        setStatus(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [forrefresh]);

  const handleClose = () => {
    setShow(false);
  };

  const editcabFunction = () => {
    const data = {
      carModel: editcab.carModel,
      luggage: editcab.luggage,
      seats: editcab.seats,
      price: editcab.price,
      cabImage: editcab.cabImage,
      region : editcab.region
    };
    console.log(data);

    const id = editcab._id;

    pmlAPI
      .put(`/api/editcab/${id}`, data)
      .then((res) => {
        console.log(res);
        setforrefresh(Math.random());
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };


 
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text_inrease_lable">
           Add Cab
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="cab-form">
            <div className="cab-form__container">
              <div className="cab-form__input">
                <label htmlFor="carModel">
                  <p className="p p--1">Car Model</p>
                </label>
                <input
                  className="inputAllcab"
                  type="text"
                  id="carModel"
                  placeholder="Car model..."
                  value={editcab.carModel}
                  onChange={(e) => {
                    seteditcab({
                      ...editcab,
                      carModel: e.target.value,
                    });
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
                  className="inputAllcab"
                  type="number"
                  id="carLuggage"
                  min="0"
                  value={editcab.luggage}
                  onChange={(e) => {
                    seteditcab({
                      ...editcab,
                      luggage: e.target.value,
                    });
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
                  className="inputAllcab"
                  type="number"
                  id="carSeats"
                  min="0"
                  value={editcab.seats}
                  onChange={(e) => {
                    seteditcab({
                      ...editcab,
                      seats: e.target.value,
                    });
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
                  className="inputAllcab"
                  type="number"
                  id="price"
                  step="any"
                  value={editcab.price}
                  onChange={(e) => {
                    seteditcab({
                      ...editcab,
                      price: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="cab-form__container">
              <div className="cab-form__input">
                <label htmlFor="carImage">
                  <p className="p p--1">Reagion </p>
                </label>
                 <select
            style={{
              fontSize: "16px",
              fontWeight: "normal",
            }}
            value={editcab.region}
            onChange={(e)=>{
              console.log(e.target.value)
              seteditcab({
                ...editcab,
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
                  className="inputAllcab"
                  type="text"
                  id="carImage"
                  placeholder="Car image..."
                  value={editcab.cabImage}
                  onChange={(e) => {
                    seteditcab({
                      ...editcab,
                      cabImage: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              editcabFunction();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row ">
        {status ? (
          <>
            {data &&
              data?.map((w) => {
                return (
                  <>
                 
                  
                    <div className="col-sm-9 mainallcabdiv">
                      <div className="row secondallcabdiv">
                        <div className="col-sm-5">
                          <img
                            src={w.cabImage}
                            alt="user"
                            className="imgallcabs"
                          />
                        </div>
                        <div className="col-sm-3">
                          <div>
                            <label className="text_inrease_lable">
                              Car Model
                            </label>
                            <h4 className="allcabsheading">{w?.carModel}</h4>
                          </div>
                          <div>
                            <label className="text_inrease_lable">
                              Available Seats
                            </label>
                            <h4> {w?.seats} </h4>
                          </div>
                          <div>
                            <label className="text_inrease_lable">
                              Luggage Space
                            </label>
                            <h4> {w?.luggage} </h4>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div>
                            <label className="text_inrease_lable">
                              Price Per KM
                            </label>
                            <h4> {w?.price} </h4>
                          </div>
                          <div>
                            <label className="text_inrease_lable">
                              Reagion{" "}
                            </label>
                            <h4> {w?.region} </h4>
                          </div>
                          <div>
                            <label className="text_inrease_lable">
                              Created At{" "}
                            </label>
                            <h4> {w?.createdAt} </h4>
                          </div>
                        </div>
                        <div className="col-sm-1">
                          <div className="icondiv">
                            <a
                              onClick={() => {
                                setShow(true);
                                seteditcab(w);
                                console.log(w)
                              }}
                            >
                              <EditIcon className="svg_icons" />
                            </a>
                          </div>

                          <div className="icondiv">
                            <a
                              onClick={() => {
                                swal({
                                  title: "Are you sure?",
                                  text: "Want To delete Cab",
                                  icon: "warning",
                                  buttons: true,
                                  dangerMode: true,
                                })
                                .then((willDelete) => {
                                  if (willDelete) {
                                    pmlAPI
                                    .delete(`/api/${w._id}`)
                                    .then((res) => {
                                      console.log(res);
                                      setforrefresh(nanoid());
                                      swal("Success!", 'Cab Deleted Succcessfully', "success")
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                   
                                  } else {
                                    swal("Cab  is safe!");
                                  }
                                });





                              }}
                            >
                              <RemoveCircleOutlineIcon className="svg_icons" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </>
        ) : (
          <div className="col-sm-12 mainallcabdiv">
            <div className="row secondallcabdiv">
              <div className="col-sm-2">
                <img src={nodataimg} alt="user" className="imgallcabs" />
              </div>
              <div className="col-sm-5">
                <div>
                  <label className="text_inrease_lable">Car Modal</label>
                  <h4 className="allcabsheading"> No Data Found</h4>
                </div>
                <div>
                  <label className="text_inrease_lable">Available Seats</label>
                  <h4> No Data Found </h4>
                </div>
                <div>
                  <label className="text_inrease_lable">Luggage Space</label>
                  <h4> No Data Found</h4>
                </div>
              </div>
              <div className="col-sm-5">
                <div>
                  <label className="text_inrease_lable">Price Per KM</label>
                  <h4> No Data Found </h4>
                </div>
                <div>
                  <label className="text_inrease_lable">Car ID </label>
                  <h4> No Data Found</h4>
                </div>
                <div>
                  <label className="text_inrease_lable">Created At </label>
                  <h4> No Data Found </h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
