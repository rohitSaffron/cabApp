import React ,{useEffect} from "react";
import "./Allcss/aboutus.css";
import { Container, Row, Col ,Card,Button } from "react-bootstrap";
import Img from "../imges/sideimg.png";
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Footer from "./Footer";


export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
    <div className="about">
      <Container fluid className="aboutus_cotainer">
        <Row>
          <Col sm={4}></Col>
          <Col sm={4} className="pmlheading_col">
            {" "}
            <h1 className="pmlheading">ABOUT PML HOLIDAYS</h1>
          </Col>
          <Col sm={4}></Col>
        </Row>
        <br></br>

        <Row className="RowAbourtUs">
          <Col sm={5}></Col>
          <Col sm={2} className="AboutUsCol">
            {" "}
            <h2 className="AboutUs">ABOUT US</h2>
          </Col>
          <Col sm={5}></Col>
        </Row>
      </Container>

      <Container fluid className="main_container">
        <Row className="RowMainContent">
          <Col sm={2}></Col>
          <Col sm={4}>
            <br></br>
            <br></br>
            <div className="wwa">
              <h2 className="secondaryTitle">WHO WE ARE?</h2>
              <br></br>
              <p>
                PML Holidays India’s leading online travel division of Paul
                Merchants Ltd. The PML Holidays division consists of
                professionals, who ensure that the best options in airline
                ticketing, hotels and Holiday packages, visa management,
                insurance services as well as foreign exchange facilities are
                seamlessly provided to our clients as cost effectively as
                possible.
              </p>
            </div>
            <br></br>
            <br></br>
            <div className="wwd">
              <h2 className="secondaryTitle">WHAT WE DO?</h2>
              <Row>
                <Col sm={6} className="ulcol">
                  <br></br>
                  <ul>
                    <li className="li_list">Flights</li>
                    <li className="li_list">Hotels</li>
                    <li className="li_list">Holiday Packages</li>
                    <li className="li_list">Bus & Car</li>
                    <li className="li_list">Visa</li>
                  </ul>
                </Col>
                <Col sm={6}>
                  <br></br>
                  <ul>
                    <li className="li_list">Forex</li>
                    <li className="li_list">Travel Insurance</li>
                    <li className="li_list">Cruises</li>
                    <li className="li_list">Customized Packages</li>
                    <li className="li_list">MICE</li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
          <Col sm={4}>
            <img src={Img} className="AboutUs_sideImg"></img>
          </Col>
          <Col sm={2}></Col>
        </Row>

        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <h2 className="secondaryTitle">OUR VISION</h2>
            <p>
              PML Holidays has been geared to help every Indian citizen to
              realize his dream of touring and PML Holidays has at its disposal
              Holiday Packages tailored for the needs of people from all walks
              of society as per their tastes, status and pocket. PML Holidays
              has a massive backing of associations with major Global Travel
              players in almost every country, making it possible to offer best
              competitive prices around.
            </p>
          </Col>
          <Col sm={2}></Col>
        </Row>
        <br></br>
        <br></br>
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <h2 className="secondaryTitle">OUR MISSION</h2>
            <p>
              PML Holidays is Working With its motto of providing “Service Up To
              The Utmost Satisfaction Of The Customer”, PML Holidays has been
              able to reach out to the hearts of millions of people. PML
              Holidays has grown and prospered by making its customers its
              friends and partners in the prosperity.
            </p>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>

      <Container fluid className="ServiceContainer">
        <Row className="RowAbourtUs">
          <Col sm={4}></Col>
          <Col sm={4} className="AboutUsCol about_us">
            {" "}
            <h2 className="AboutUs our_Service">OUR SERVICES</h2>
          </Col>
          <Col sm={4}></Col>
        </Row>
        <Row>
          <Col sm={4}></Col>
          <Col sm={4} className="AboutUsCol">
            {" "}
            <h2 className="wearebest ">WE ARE THE BEST</h2>
          </Col>
          <Col sm={4}></Col>
        </Row>

        <Container>
          <Row>
            <Col sm={4}>
              <Card style={{ width: "30rem" , height:'340px' , borderRadius:'10px' }}>
               
                <Card.Body>
                  <Card.Title className="cardtitle"><FlightIcon className="svgicons" /></Card.Title>
                  <Card.Header  className="cardheader" >FlIGHTS</Card.Header>
                  <Card.Text className="card_para">
                  We offers you the best deal on Flights as well as best connections in anywhere in the world.
                  </Card.Text>
                 
                </Card.Body>
              </Card>
            </Col>

            <Col sm={4}>
            <Card style={{ width: "30rem" , height:'340px' , borderRadius:'10px' }}>
               
               <Card.Body>
                 <Card.Title className="cardtitle"><HotelIcon className="svgicons" /></Card.Title>
                 <Card.Header  className="cardheader" >Hotels</Card.Header>
                 <Card.Text className="card_para">
                 We bring you thousands of options for hotel accommodation globally. Get the best offers right here .
                 </Card.Text>
                
               </Card.Body>
             </Card>
            </Col>

            <Col sm={4}>
            <Card style={{ width: "30rem" , height:'340px' , borderRadius:'10px' }}>
               
                <Card.Body>
                  <Card.Title className="cardtitle"><BusinessCenterIcon className="svgicons" /></Card.Title>
                  <Card.Header  className="cardheader" >Holiday Packages</Card.Header>
                  <Card.Text className="card_para">
                  Get the best value for your money when you buy PML Holidays packages.
                  </Card.Text>
                 
                </Card.Body>
              </Card>
            </Col>

            
          </Row>
        </Container>
        <Container>
          <Row>
            <Col sm={4}>
              <Card style={{ width: "30rem" , height:'340px' , borderRadius:'10px' }}>
               
                <Card.Body>
                  <Card.Title className="cardtitle"><AirportShuttleIcon className="svgicons" /></Card.Title>
                  <Card.Header  className="cardheader" >Bus & Car</Card.Header>
                  <Card.Text className="card_para">
                  Bitten by the road-trip bug ? Convenient point-to-point bus bookings are now just a few clicks away.
                  </Card.Text>
                 
                </Card.Body>
              </Card>
            </Col>

            <Col sm={4}>
            <Card style={{ width: "30rem" , height:'340px' , borderRadius:'10px' }}>
               
               <Card.Body>
                 <Card.Title className="cardtitle"><CreditScoreIcon className="svgicons" /></Card.Title>
                 <Card.Header  className="cardheader" >Visa</Card.Header>
                 <Card.Text className="card_para">
                 We offers VISA services for all over world .
                 </Card.Text>
                
               </Card.Body>
             </Card>
            </Col>

            <Col sm={4}>
            <Card style={{ width: "30rem" , height:'340px' , borderRadius:'10px' }}>
               
                <Card.Body>
                  <Card.Title className="cardtitle"><BeenhereIcon className="svgicons" /></Card.Title>
                  <Card.Header  className="cardheader" >Forex</Card.Header>
                  <Card.Text className="card_para">
                  We offer host of forex services for completing your travel needs during an overseas stay.
                  </Card.Text>
                 
                </Card.Body>
              </Card>
            </Col>

            
          </Row>
        </Container>
      </Container>

      <Footer />
    </div>
  );
}
