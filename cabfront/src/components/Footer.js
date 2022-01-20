import React from "react";
import "../scss/components/Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const Footer = () => {
  const matches = useMediaQuery("(max-width:1190px)");
  console.log(matches);
  return (
    <>
      {matches ? (
        <>
           <footer className="footer">
            <div>
              <h3>About PML HOLIDAYS</h3>
              <p>PML Holidays India’s leading online travel division of Paul 
                Merchants Ltd. The PML Holidays division consists of professionals, 
                who ensure that the best options in airline ticketing, 
                hotels and Holiday packages, visa management, insurance services 
                as well as foreign exchange facilities are seamlessly provided 
                to our clients as cost effectively as possible.
              </p>
              <div className="footer_social_icons">
                <i class="fab fa-facebook-square"></i>
                <i class="fab fa-twitter-square"></i>
                <i class="fab fa-linkedin"></i>
                <i class="fab fa-pinterest-square"></i>
                <i class="fab fa-instagram-square"></i>
              </div>
            </div>

            <div className="services">
              <h3>OTHER SERVICES</h3>
              <a>
                <p className="sight"><a href="https://pmlholidays.com/local-sight-seeing" target={"_blank"}>Local Sightseeing</a></p>
              </a>
              <a>
                <p>Restaurant Reservations</p>
              </a>
              <a>
                <p>Meet & Greet</p>
              </a>
              <a>
                <p>Visa Assistance</p>
              </a>
              <a>
                <p>Airport Transfers</p>
              </a>
              <a>
                <p>Travel Insurance</p>
              </a>
            </div>
            <div>
              <h3>COMPANY</h3>
              <a>
                <p>About Us</p>
              </a>
              <a>
                <p>Services</p>
              </a>
              <a>
                <p>Awards</p>
              </a>
              <a>
                <p>Blog</p>
              </a>
              <a>
                <p>Terms & Conditions</p>
              </a>
              <a>
                <p>Privacy Policy</p>
              </a>
            </div>
            <div className="acc_icon">
              <h3>CONTANT US</h3>
              <a className="icon_link_wrapper">
                <i class="fas fa-home"></i>
                <p>SCO 829-830, Sector 22 A, Chandigarh – 160022</p>
              </a>
              <a className="icon_link_wrapper">
                <i class="far fa-envelope-open"></i>
                <p>packages@paulmerchants.net</p>
              </a>
              <a className="icon_link_wrapper">
                <i class="fas fa-phone-square-alt"></i>
                <p>1800 137 1444</p>
              </a>
              <a className="icon_link_wrapper">
                <i class="fas fa-globe-asia"></i>
                <p>www.pmlholidays.com</p>
              </a>
            </div>
          </footer>
        </>
      ) : (
        <>
          <footer className="footer">
            <div>
              <h3>About PML HOLIDAYS</h3>
              <p>PML Holidays India’s leading online travel division of Paul 
                Merchants Ltd. The PML Holidays division consists of professionals, 
                who ensure that the best options in airline ticketing, 
                hotels and Holiday packages, visa management, insurance services 
                as well as foreign exchange facilities are seamlessly provided 
                to our clients as cost effectively as possible.
              </p>
              <div className="footer_social_icons">
                <i class="fab fa-facebook-square"></i>
                <i class="fab fa-twitter-square"></i>
                <i class="fab fa-linkedin"></i>
                <i class="fab fa-pinterest-square"></i>
                <i class="fab fa-instagram-square"></i>
              </div>
            </div>

            <div className="services">
              <h3>OTHER SERVICES</h3>
              <a>
                <p className="sight"><a href="https://pmlholidays.com/local-sight-seeing" target={"_blank"}>Local Sightseeing</a></p>
              </a>
              <a>
                <p>Restaurant Reservations</p>
              </a>
              <a>
                <p>Meet & Greet</p>
              </a>
              <a>
                <p>Visa Assistance</p>
              </a>
              <a>
                <p>Airport Transfers</p>
              </a>
              <a>
                <p>Travel Insurance</p>
              </a>
            </div>
            <div>
              <h3>COMPANY</h3>
              <a>
                <p>About Us</p>
              </a>
              <a>
                <p>Services</p>
              </a>
              <a>
                <p>Awards</p>
              </a>
              <a>
                <p>Blog</p>
              </a>
              <a>
                <p>Terms & Conditions</p>
              </a>
              <a>
                <p>Privacy Policy</p>
              </a>
            </div>
            <div className="acc_icon">
              <h3>CONTANT US</h3>
              <a className="icon_link_wrapper">
                <i class="fas fa-home"></i>
                <p>SCO 829-830, Sector 22 A, Chandigarh – 160022</p>
              </a>
              <a className="icon_link_wrapper">
                <i class="far fa-envelope-open"></i>
                <p>packages@paulmerchants.net</p>
              </a>
              <a className="icon_link_wrapper">
                <i class="fas fa-phone-square-alt"></i>
                <p>1800 137 1444</p>
              </a>
              <a className="icon_link_wrapper">
                <i class="fas fa-globe-asia"></i>
                <p>www.pmlholidays.com</p>
              </a>
            </div>
          </footer>
        </>
      )}
    </>
  );
};

export default Footer;

{
  /* <div className="footer__divider">
<div className="left"></div>
<div className="right"></div>
</div>
<div className="footer__info">
<div className="footer__info-column">
  <h3 className="h3 h3--2">Our products</h3>
  <p className="p p--2"></p>
</div>
</div>
<div className="footer__copyright">
<p className="p p--2">Copyright &copy; 2021 PML HOLIDAYS</p>
</div> */
}
