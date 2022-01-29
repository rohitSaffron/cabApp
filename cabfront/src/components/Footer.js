import React ,{useState} from "react";
import "../scss/components/Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Modal, Form, Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const matches = useMediaQuery("(max-width:1190px)");
 

  const [data, setdata]=useState()
  const navigate = useNavigate();

  const Navigate_to_Abou_us = () => {
    navigate("/aboutus");
  };
  const Navigate_to_localSight = () => {
    navigate("/local-sight-seeing");
  };

  const media_links=(value)=>{
  
    if( value == 'facebook' ){
      window.open('https://www.facebook.com/pmlholidays/','_blank');
    }else if(value== 'twitter'){
      window.open('https://twitter.com/PaulMerchants1?fbclid=IwAR1e_xbvCiwKLm9gQt3KGy9x8n7nq02dzE8VipnNuptg3U74_zEvtf43v5w','_blank');
    }else if(value== 'youtube'){
      window.open('https://www.youtube.com/watch?v=vhCIiw6hNdQ','_blank');
    }else if(value== 'instagram'){
      window.open('https://www.instagram.com/paulmerchants/?fbclid=IwAR0TJ_qpppC3z0qUuDPRztsQ4cq7yX2fnP_iq6Yqoo6NWCKInpgU85Jz_hU','_blank');
    }

  }
  return (
   
      
        <>
             <Container fluid className="containerboot">
          <Row   >
            <Col sm={1}>
            </Col>
            <Col sm={3} className="colsmmargin" >
            <div>
              <h3 className="heading">About PML HOLIDAYS</h3>
              <p className="colorwhitepara" >
                PML Holidays India’s leading online travel division of Paul
                Merchants Ltd. The PML Holidays division consists of
                professionals, who ensure that the best options in airline
                ticketing, hotels and Holiday packages, visa management,
                insurance services as well as foreign exchange facilities are
                seamlessly provided to our clients as cost effectively as
                possible.
              </p>
              <div className="footer_social_icons">
              <i onClick={()=>{media_links('facebook')}} class="fab fa-facebook-square"></i> 
               <i onClick={()=>{media_links('twitter')}} class="fab fa-twitter-square"></i>
                <i onClick={()=>{media_links('instagram')}} class="fab fa-instagram-square"></i>
                <i  onClick={()=>{media_links('youtube')}} class="fab fa-youtube-square"></i>
              </div>
            </div>
            </Col>

            <Col sm={2} className="colsmmargin">
            <div className="services">
              <h3 className="heading">OTHER SERVICES</h3>
              <a>
                <i class="fas fa-chevron-right"></i>
                <p className="sight colorwhite" onClick={() => Navigate_to_localSight()}>
                  Local Sightseeing
                </p>
              </a>
              <a
                href="https://pmlholidays.com/restraunt-reservations"
                target="_blank"
                className="aTagFooter"
              >
                <i class="fas fa-chevron-right"></i>
                <p className="colorwhite" >Restaurant Reservations</p>
              </a>
              <a
                href="https://pmlholidays.com/meet-and-greet"
                target="_blank"
                className="aTagFooter"
              >
                <i class="fas fa-chevron-right"></i>
                <p className="colorwhite" >Meet & Greet</p>
              </a>
              <a
                href="https://pmlholidays.com/visa-information"
                target="_blank"
                className="aTagFooter"
              >
                <i class="fas fa-chevron-right"></i>
                <p className="colorwhite" >Visa Assistance</p>
              </a>
              <a
                href="https://pmlholidays.com/airport-transfers"
                target="_blank"
                className="aTagFooter"
              >
                <i class="fas fa-chevron-right"></i>
                <p className="colorwhite" >Airport Transfers</p>
              </a>
              <a
                href="https://pmlholidays.com/travel-insurance"
                target="_blank"
                className="aTagFooter"
              >
                <i class="fas fa-chevron-right"></i>
                <p className="colorwhite" >Travel Insurance</p>
              </a>
            </div>
            </Col>

            <Col sm={2} className="colsmmargin">
            <div className="services">
              <h3 className="heading">COMPANY</h3>
              <a>
                <i class="fas fa-chevron-right"></i>
                <p className="colorwhite" onClick={() => Navigate_to_Abou_us()}>About Us</p>
              </a>
              <a
                href="http://www.paulmerchants.net/paulmerchants/services/"
                target="_blank"
                className="aTagFooter"
              >
                <i class="fas fa-chevron-right"></i>
                <p className="colorwhite" >Services</p>
              </a>
              <a
                href="https://pmlholidays.com/awards"
                target="_blank"
                className="aTagFooter"
              >
                <i class="fas fa-chevron-right"></i>
                <p className="colorwhite" >Awards</p>
              </a>
              <a
                href="https://pmlholidays.com/blog/"
                target="_blank"
                className="aTagFooter"
              >
                <i class="fas fa-chevron-right"></i>
                <p className="colorwhite" >Blog</p>
              </a>
              <a
                href="https://pmlholidays.com/policies?type=terms"
                target="_blank"
                className="aTagFooter"
              >
                <i class="fas fa-chevron-right"></i>
                <p className="colorwhite" >Terms & Conditions</p>
              </a>
              <a
                href="https://pmlholidays.com/policies?type=privacypolicy"
                target="_blank"
                className="aTagFooter"
              >
                <i class="fas fa-chevron-right"></i>
                <p className="colorwhite" >Privacy Policy</p>
              </a>
            </div>
            </Col>


            <Col sm={3} className="colsmmargin">
            <div className="acc_icon">
              <h3 className="heading" >CONTANT US</h3>
              <a className="icon_link_wrapper">
                <i class="fas fa-home"></i>
                <p className="colorwhite" >SCO 829-830, Sector 22 A, Chandigarh – 160022</p>
              </a>
              <a className="icon_link_wrapper">
                <i class="far fa-envelope-open"></i>
                <p className="colorwhite" >packages@paulmerchants.net</p>
              </a>
              <a className="icon_link_wrapper">
                <i class="fas fa-phone-square-alt"></i>
                <p className="colorwhite" >1800 137 1444</p>
              </a>
              <a className="icon_link_wrapper">
                <i class="fas fa-globe-asia"></i>
                <p className="colorwhite" >www.pmlholidays.com</p>
              </a>
            </div>
            </Col>
            <Col sm={1}>
            </Col>
          </Row>

        </Container>
        </>
      
   
  );
};

export default Footer;
