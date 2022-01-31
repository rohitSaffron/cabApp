import React, { useState, useEffect } from "react";
import pmlAPI from "../api/pmlAPI";
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
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import "./Allcss/checkout.css";
import moment from "moment";
import SwapHorizSharpIcon from "@mui/icons-material/SwapHorizSharp";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { TextField } from "@mui/material";
import swal from "sweetalert";
import one from "../imges/one.svg";
import two from "../imges/two.svg";
import three from "../imges/three.svg";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [datediff , setdatediff]=useState()
  const [cabprice ,setcabprice]=useState()
  const [tax ,settax]=useState(0)
  const [driver ,setdriver]=useState()
  const[dropff , setdropoff]=useState()

  const [total, settotal] = useState({
    cabprice: "",
    tax: "",
    driver: '',
  });
  const [loading, setloading] = useState(false);
  useEffect(()=>{
    let datalocal = JSON.parse(localStorage.getItem("data"));
    let distance = Number(parseInt(JSON.parse(localStorage.getItem("travelDetail")).distance));
  if(Number(distance/1000)>250){
    
    setcabprice(parseInt(parseInt(distance/1000)*datalocal?.cardDetails?.price)*2)
  }else{
    
    setcabprice(parseInt(Number(datalocal?.cardDetails?.price * 250)))
  }
  



  },[])
  // useEffect(()=>{
  //   let datalocal = JSON.parse(localStorage.getItem("data"));
  //   let distance = Number(parseInt(JSON.parse(localStorage.getItem("travelDetail")).distance));
  //   let details = Number(datalocal?.cardDetails?.price) * distance;
  
   
  //   if(Number(distance/1000)>250){
  //     console.log(parseInt(details/1000)*2)
  //     settax(parseInt((((Number(details) / 1000) / 100) * 8) * 2))
  //   }else{
     
  //     settax(parseInt(datalocal?.cardDetails?.price * 250))
  //   }


  // },[])

  useEffect(() => {
  
    let datalocal = JSON.parse(localStorage.getItem("data"));
    let distance = Number(JSON.parse(localStorage.getItem("travelDetail")).distance);
  
    let details = Number(datalocal?.cardDetails?.price) * distance;
  
   
      
      // settotal({
      //   ...total,
      //   cabprice: parseInt(Number(datalocal?.cardDetails?.price * distance) / 1000)*2,
      //   tax:parseInt((Number(details) / 1000 / 100) * 8 * 2),
      // });

   
   
    
    setdata(datalocal);
   
  }, []);
  

  useEffect(()=>{
    let datepick = JSON.parse(localStorage.getItem("travelDetail")).date;
    const date1 = new Date(datepick?.to);
    const date2 = new Date(datepick?.from);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if(Number(diffDays) == 0){
      
      setdriver(400)

    }else{
      setdriver(400*Number(diffDays))
      

    }
    

    

  },[])



  const bookNow = async () => {
    setloading(true);
    await pmlAPI
      .post("/send", data.senddata)
      .then((res) => {
        console.log(res.data);
        if (res.data.massage) {
          if (res.data.nouser) {
            swal({
              title: "Error",
              text: res.data.massage,
              icon: "error",
              dangerMode: true,
            });
            setloading(false);
          } else {
            swal({
              title: "success",
              text: res.data.massage,
              icon: "success",
            });
            setloading(false);
            navigate("/");
          }
        } else {
          swal({
            title: "Error",
            text: "somithing went wrong",
            icon: "error",
            dangerMode: true,
          });
          setloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "Error",
          text: "plz check internet",
          icon: "error",
          dangerMode: true,
        });
        setloading(false);
      });
  };

 
let travelldetail=JSON.parse(localStorage.getItem('travelDetail'))?.date
useEffect(()=>{
  let textname =JSON.parse(localStorage.getItem('travelDetail'))?.dropoff?.text;
  setdropoff(textname)
},[])

  return (
    <div>
      <br></br>
      <br></br>

      <Container>
        <Container>
          <Row>
            <Col sm={9}>
              <div>
                <Card>
                  <Card.Header>
                    {" "}
                    <LocalTaxiIcon className="logo" />{" "}
                    <span className="heading "> Transfer Detail </span>
                  </Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col sm={3}>
                          <img
                            src={data?.cardDetails?.cabImage}
                            alt="car 1"
                            className="imgcar"
                          />
                        </Col>

                        <Col sm={9}>
                          <h2 className="carmodalheading">
                            {data?.cardDetails?.carModel}
                          </h2>
                          <p>
                            <span className="textUnit">(1 Unit) |</span>{" "}
                            <span className="textUnit">
                              {data?.cardDetails?.seats} Seats |{" "}
                            </span>{" "}
                            <span className="textUnit">
                              {data?.cardDetails?.luggage} Luggage
                            </span>
                          </p>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item className="listItemsecond">
                      <Row>
                        <Col sm={5}>
                          <ListGroup>
                            <ListGroup.Item className="listItemsecond">
                              <h5 className="pickuplocation">
                                Pickup Location{" "}
                              </h5>
                              <p className="fontsize">
                                {data?.senddata?.data?.pickUp}
                              </p>
                            </ListGroup.Item>

                            <ListGroup.Item className="listItemsecond">
                              <h5 className="pickuplocation">
                                Pickup Date & Time{" "}
                              </h5>
                              <p className="fontsize">
                                {" "}
                                {moment(travelldetail?.to).format("MMMM Do YYYY")}
                              </p>
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>
                        <Col sm={2}>
                          <SwapHorizSharpIcon className="logo pickdropicon" />
                        </Col>
                        <Col sm={5}>
                          <ListGroup>
                            <ListGroup.Item className="listItemsecond">
                              <h5 className="pickuplocation">
                                Drop Off Location{" "}
                              </h5>
                              <p className="fontsize">
                                {data?.senddata?.data?.dropoff}
                              </p>
                            </ListGroup.Item>
                            <ListGroup.Item className="listItemsecond">
                              <h5 className="pickuplocation">
                                Drop-Off Date & Time{" "}
                              </h5>
                              <p className="fontsize">
                                {" "}
                                {moment(travelldetail?.from).format("MMMM Do YYYY")}
                              </p>
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>

              <br></br>

              {/* Travellers Details */}
              <div>
                <Card>
                  <Card.Header>
                    {" "}
                    <AccountCircleOutlinedIcon className="logo" />{" "}
                    <span className="heading ">Travellers Details</span>
                  </Card.Header>
                  <Card.Body>
                    {/* name and select */}
                    <Row>
                      <Col sm={4}>
                        <Card.Title className="formheading">Title</Card.Title>
                        <Card.Text>
                          <select className="selectoption">
                            <option className="options">Mr.</option>
                            <option className="options">Mrs.</option>
                            <option className="options">Miss.</option>
                          </select>
                        </Card.Text>
                      </Col>

                      <Col sm={8}>
                        <Card.Title className="formheading">Name</Card.Title>
                        <Card.Text>
                          <Form.Control
                            type="text"
                            placeholder="Enter email"
                            className="inputfiled"
                            value={data?.senddata?.data?.name}
                            onChange={(e) => {
                              setdata({
                                ...data,
                                senddata: {
                                  ...data.senddata,
                                  data: {
                                    ...data.senddata.data,
                                    name: e.target.value,
                                  },
                                },
                              });
                            }}
                          />
                        </Card.Text>
                      </Col>
                    </Row>

                    <ListGroup variant="flush">
                      {/* pic and drop location is in this ection */}

                      <ListGroup.Item>
                        {" "}
                        <Row>
                          <Col sm={6}>
                            <ListGroup variant="flush">
                              <ListGroup.Item>
                                <Card.Title className="formheading">
                                  Pick-Up Address
                                </Card.Title>
                                <Card.Text>
                                  <TextField
                                    id="standard-basic"
                                    label="Enter PickUp Address"
                                    className="textfieldfomnt"
                                    variant="standard"
                                    InputLabelProps={{
                                      style: { fontSize: 17 },
                                    }}
                                    value={
                                      data?.senddata?.data?.pickupDetailAdress
                                    }
                                    sx={{
                                      fontSize: 3,
                                      marginTop: 2,
                                    }}
                                    onChange={(e) => {
                                      setdata({
                                        ...data,
                                        senddata: {
                                          ...data.senddata,
                                          data: {
                                            ...data.senddata.data,
                                            pickupDetailAdress: e.target.value,
                                          },
                                        },
                                      });
                                    }}
                                  />
                                </Card.Text>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Badge
                                  pill
                                  bg="warning"
                                  text="dark"
                                  className="fontsize"
                                >
                                  {data?.senddata?.data?.pickUp}
                                </Badge>
                              </ListGroup.Item>
                            </ListGroup>
                          </Col>

                          <Col sm={6}>
                            <ListGroup variant="flush">
                              <ListGroup.Item>
                                <Card.Title className="formheading">
                                  Drop-Off Address
                                </Card.Title>
                                <Card.Text>
                                  <TextField
                                    id="standard-basic"
                                    label=" EnterDropoff Address"
                                    variant="standard"
                                    InputLabelProps={{
                                      style: { fontSize: 17 },
                                    }}
                                    value={
                                      data?.senddata?.data?.dropoffDetailAdress
                                    }
                                    sx={{
                                      fontSize: 3,
                                      marginTop: 2,
                                    }}
                                    onChange={(e) => {
                                      setdata({
                                        ...data,
                                        senddata: {
                                          ...data.senddata,
                                          data: {
                                            ...data.senddata.data,
                                            dropoffDetailAdress: e.target.value,
                                          },
                                        },
                                      });
                                    }}
                                  />
                                </Card.Text>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Badge
                                  pill
                                  bg="warning"
                                  text="dark"
                                  className="fontsize"
                                >
                                  {data?.senddata?.data?.dropoff}
                                </Badge>
                              </ListGroup.Item>
                            </ListGroup>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {/* email And Phoebn  */}

                      <ListGroup.Item>
                        <Row>
                          <Col sm={6}>
                            <label className="formheading">Email </label>
                            <Form.Control
                              type="email"
                              className="inputfiledcontrol"
                              value={data?.senddata?.data?.email}
                              onChange={(e) => {
                                setdata({
                                  ...data,
                                  senddata: {
                                    ...data.senddata,
                                    data: {
                                      ...data.senddata.data,
                                      email: e.target.value,
                                    },
                                  },
                                });
                              }}
                            />
                          </Col>
                          <Col sm={6}>
                            <label className="formheading">Phone No</label>
                            <Form.Control
                              className="inputfiledcontrol"
                              placeholder="Enter Phone No"
                              type="tel"
                              value={data?.senddata?.data?.phone}
                              onChange={(e) => {
                                setdata({
                                  ...data,
                                  senddata: {
                                    ...data.senddata,
                                    data: {
                                      ...data.senddata.data,
                                      phone: e.target.value,
                                    },
                                  },
                                });
                              }}
                            />
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </div>

              <br></br>
              {/* Read before you book! */}

              <div>
                <Card>
                  <Card.Header>
                    <ArticleOutlinedIcon className="logo" />{" "}
                    <span className="heading ">Read before you book!</span>
                  </Card.Header>
                  <Card.Body className="cardbody">
                    <Card.Title className="ulpadding ulheading">
                      Highlights
                    </Card.Title>
                    <Card.Text className="ulpadding textfontli">
                      <ul>
                        <li>
                          Car will be of any model in car category you choose
                        </li>
                        <li>
                          After 600, per kilometer charge (Rs. 9) will be
                          applicable.
                        </li>
                        <li>Driver Daily allowance 1000</li>
                        <li>Fare includes Vehicle & Fuel charges.</li>
                        <li>
                          Waiting Charges – Not applicable(Chauffer will wait
                          for 45 min. If you are not available at pick up point)
                        </li>
                        <li>
                          Night Charges Amount: Rs 250(Applicable between 11 pm
                          to 6 am)
                        </li>
                        <li>
                          Toll and State Tax not included, to be paid, wherever
                          applicable.
                        </li>
                        <li>
                          Parking & Airport Entry (not included in bill) to be
                          paid wherever applicable.
                        </li>
                      </ul>
                    </Card.Text>
                    <br></br>
                    <Card.Title className="ulpadding ulheading">
                      Cancellation policy
                    </Card.Title>
                    <Card.Text className="ulpadding textfontli">
                      <ul>
                        <li>
                          If cancelled before 4 hours from the journey time, no
                          retention applicable (Free Cancellation).
                        </li>
                        <li>
                          If cancelled within 4 hours of time from the journey
                          time, 25% retention applicable.
                        </li>
                        <li>In case of NO SHOW 25 % retention applicable.</li>
                        <li>
                          PML will not be held responsible for any cancellation
                          or delay of service in case of any natural calamity,
                          agitation or strike, traffic jam or road blockage,
                          etc.
                        </li>
                        <li>
                          PML reserves the right to cancel or change the booking
                          of a vehicle at any point.
                        </li>
                        <li>
                          Any modifications / amendments to the booking are not
                          allowed In the event of cancellation of a cab trip,
                          PML liability will be limited only to the extent of
                          refunding the sum paid by the passenger for the price
                          of the e-ticket.
                        </li>
                        <li>
                          If you want to cancel your cab bookings, then you need
                          to place a cancellation request at Mybookings.PML.com
                          (using desktop/laptop or mobile browser only). Please
                          note that it will be cancelled immediately and a
                          refund will be processed as per the cancellation
                          policy.
                        </li>
                      </ul>
                    </Card.Text>
                  </Card.Body>

                  <Card.Body>
                    <Card.Header>
                      {" "}
                      <span>Important Information</span>
                    </Card.Header>
                    <Row>
                      <Col sm={6}>
                        <br></br>

                        <Card.Title className="ulpadding ulheading">
                          Extra kilometers
                        </Card.Title>
                        <Card.Text className="ulpadding textfontli">
                          <ul>
                            <li>
                              Once you exceed your kms limits, you will be
                              charged extra kms as applicable.
                            </li>
                          </ul>
                        </Card.Text>
                        <br></br>

                        <Card.Title className="ulpadding ulheading">
                          Cab type
                        </Card.Title>
                        <Card.Text className="ulpadding textfontli">
                          <ul>
                            <li>
                              The booking will be for cab type (HATCHBACK, SUV
                              or SEDAN) and we do not commit on providing any
                              preferred cab model. In case any preferred model
                              (like dzire only) is provided in listing than it
                              will be provided.
                            </li>
                          </ul>
                        </Card.Text>
                        <br></br>

                        <Card.Title className="ulpadding ulheading">
                          Waiting and night charges
                        </Card.Title>
                        <Card.Text className="ulpadding textfontli">
                          <ul>
                            <li>
                              Driver shall wait for 45 minutes at pickup
                              location. Post that, your cab will be cancelled
                              without making any refund.
                            </li>
                            <li>
                              Night Charge (applicable between 11 PM to 6 AM
                              only):Rs 250. These charges should be directly
                              paid to the driver.
                            </li>
                          </ul>
                        </Card.Text>
                        <br></br>

                        <Card.Title className="ulpadding ulheading">
                          Cab detail
                        </Card.Title>
                        <Card.Text className="ulpadding textfontli">
                          <ul>
                            <li>
                              Cab details will be shared up to 1 hours prior to
                              departure.
                            </li>
                          </ul>
                        </Card.Text>
                        <br></br>

                        <Card.Title className="ulpadding ulheading">
                          Hilly areas
                        </Card.Title>
                        <Card.Text className="ulpadding textfontli">
                          <ul>
                            <li>
                              Car air-conditioner will not be working in hilly
                              routes & also when the vehicle is not in motion.
                            </li>
                          </ul>
                        </Card.Text>
                        <br></br>

                        <Card.Title className="ulpadding ulheading">
                          Other charges
                        </Card.Title>
                        <Card.Text className="ulpadding textfontli">
                          <ul>
                            <li>
                              In case you are carrying your pet Along INR 300
                              Extra Charges
                            </li>
                            <li>
                              You need to pay toll tax, state tax or other
                              similar taxes directly to the driver if not
                              mentioned in Inclusions/Highlights.
                            </li>
                          </ul>
                        </Card.Text>
                      </Col>
                      <Col sm={6}>
                        <br></br>

                        <Card.Title className="ulpadding ulheading">
                          Baggage policy
                        </Card.Title>
                        <Card.Text className="ulpadding textfontli">
                          <ul>
                            <li>
                              For Compact maximum sitting capacity is 4 and
                              number of Bags allowed 1.
                            </li>
                          </ul>
                        </Card.Text>
                        <br></br>

                        <Card.Title className="ulpadding ulheading">
                          Additional information
                        </Card.Title>
                        <Card.Text className="ulpadding textfontli">
                          <ul>
                            <li>
                              Cab will be provided on the basis of availability.
                            </li>
                            <li>
                              We do not commit on particular fuel type vehicle.
                              It will be as per mentioned in name by cab
                              provider.
                            </li>
                            <li>
                              If a CNG refill has to be done, the turnaround
                              time may be over 30 minutes due to less
                              availability of stations and long queues.
                            </li>
                            <li>
                              Due to traffic or any other unavoidable reason,
                              pickup may be delayed by 30 mins.
                            </li>
                            <li>
                              Distance will be calculated from point to point.
                            </li>
                            <li>
                              You are solely responsible for managing your own
                              travel schedule. Ease My Trip will not be liable
                              for any compensation if you happen to miss your
                              scheduled flight, train or bus due to delay
                              pickup, traffic jam or delay due to any other
                              reason during the trip.
                            </li>
                            <li>
                              In case of partial payment, the balance payment of
                              trip needs to be paid in advance at the time of
                              pick-up.
                            </li>
                            <li>
                              You need to collect the receipts from driver for
                              any toll tax, state tax, night charges or extra km
                              paid directly to the driver during the trip. PML
                              is not liable to provide invoices for such amount.
                            </li>
                            <li>
                              Any grievances or claims related to the cab travel
                              should be reported to PML within 48 hours of
                              travel time.
                            </li>
                          </ul>
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            {/* Price Details field Start here  */}
            <Col sm={3}>
              {/* Card Price */}
              <div>
                <Card style={{ width: "30rem" }}>
                  <Card.Header>
                    {" "}
                    <CurrencyRupeeOutlinedIcon className="logo" />
                    <span className="heading "> Price Details </span>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="listitem">
                        {" "}
                        <span className="headingside">Pay : </span>{" "}
                        <span className="amountside">
                          {" "}
                          {cabprice}
                        </span>
                      </ListGroup.Item>
                      {/* <ListGroup.Item className="listitem">
                        <span className="headingside">Tax : </span>{" "}
                        <span className="amountside">
                          {parseInt(total.tax)}
                        </span>
                      </ListGroup.Item> */}
                    
                      <ListGroup.Item className="listitem">
                        <span className="headingside">Driver Allowance : </span>{" "}
                        <span className="amountside">
                          {parseInt(driver)}
                          
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item className="listitem">
                        {" "}
                        <span className="headingside">Promo Code : </span>{" "}
                        <span className="amountside"> 0</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="listitem">
                        {" "}
                        <span className="headingside">Grand Total : </span>{" "}
                        <span className="amountside">
                          {parseInt(cabprice) +
                            parseInt(driver)}
                        </span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </div>
              <br></br>
              <div>
                <Card style={{ width: "30rem" }}>
                  <Card.Header>
                    <CurrencyRupeeOutlinedIcon className="logo" />
                    <span className="heading ">Extra Charges </span>
                  </Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="listitem">
                    <p style={{
                      fontSize:'12px',
                      fontWeight:'normal'
                    }}>Excludes toll costs, parking, permits and state tax</p>
                    </ListGroup.Item>
                    <ListGroup.Item className="listitem">
                    <p style={{
                      fontSize:'12px',
                      fontWeight:'normal'
                    }}>Night time allowance (11:00 PM - 06:00 AM) - ₹150/night</p>
                    </ListGroup.Item>
                    <ListGroup.Item className="listitem">
                    <p style={{
                      fontSize:'12px',
                      fontWeight:'normal'
                    }}>Extra fare may apply if you don't end trip at {dropff}</p>
                    </ListGroup.Item>
                   
                  </ListGroup>
                </Card>
              </div>
              <br></br>

              {/* confirm Password */}

              <div>
                <Card style={{ width: "30rem" }}>
                  <Card.Header>
                    <CurrencyRupeeOutlinedIcon className="logo" />
                    <span className="heading "> Book Now </span>
                  </Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="listitem">
                      {" "}
                      <span className="headingsideGrand">
                        Grand Total:{" "}
                      </span>{" "}
                      <span className="amountsidegrand">
                      {parseInt(cabprice) +
                            parseInt(driver)}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        variant="primary"
                        disabled={loading}
                        onClick={() => bookNow()}
                      >
                        {loading ? "loading ..." : "Book Now"}
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
             

              {/* side Icons  */}
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
            </Col>
          </Row>
        </Container>
      </Container>
    
    </div>
  );
}