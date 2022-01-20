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
          <footer className="footerbox">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  {" "}
                  <div>
                    <h3>About PrimeCab</h3>
                    <p>
                      Search for will uncover many web sites variables onto of
                      passage of lorem ipsum available but the majority the word
                      all predefined humour to met chunk recently with desktop
                    </p>
                    <div className="footer_social_icons">
                      <i class="fab fa-facebook-square"></i>
                      <i class="fab fa-twitter-square"></i>
                      <i class="fab fa-linkedin"></i>
                      <i class="fab fa-pinterest-square"></i>
                      <i class="fab fa-instagram-square"></i>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div>
                    <h3>Explore Links</h3>
                    <a className="icon_link_wrapper">
                      <i class="far fa-folder"></i>
                      <p>Coupons</p>
                    </a>
                    <a className="icon_link_wrapper">
                      <i class="far fa-folder"></i>
                      <p>Sitemap</p>
                    </a>
                    <a className="icon_link_wrapper">
                      <i class="far fa-folder"></i>
                      <p>Cancellation</p>
                    </a>
                    <a className="icon_link_wrapper">
                      <i class="far fa-folder"></i>
                      <p>Terms</p>
                    </a>
                    <a className="icon_link_wrapper">
                      <i class="far fa-folder"></i>
                      <p>Privacy Policy</p>
                    </a>
                    <a className="icon_link_wrapper">
                      <i class="far fa-folder"></i>
                      <p>Contact Us</p>
                    </a>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div>
                    <h3>Recent Tweets</h3>
                    <a className="icon_link_wrapper">
                      <i class="fab fa-twitter"></i>
                      <p>
                        RT <span>@WordPress</span>: Wordpress 5.0 Beta 2{" "}
                        <span>https://t.co/vcsvdcsjkl</span> Nov, 1, 2018
                      </p>
                    </a>
                    <a className="icon_link_wrapper">
                      <i class="fab fa-twitter"></i>
                      <p>
                        Just setting up my twitter, <span>#mytwitt</span> Nov,
                        28, 2017
                      </p>
                    </a>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div>
                    <h3>Account Info</h3>
                    <a className="icon_link_wrapper">
                      <i class="fas fa-home"></i>
                      <p>10A, PrimeCab, San Andreno, United States.</p>
                    </a>
                    <a className="icon_link_wrapper">
                      <i class="far fa-envelope-open"></i>
                      <p>primecab@booking.com</p>
                    </a>
                    <a className="icon_link_wrapper">
                      <i class="fas fa-phone-square-alt"></i>
                      <p>+1-333-444-555</p>
                    </a>
                    <a className="icon_link_wrapper">
                      <i class="fas fa-globe-asia"></i>
                      <p>www.primecab.com</p>
                    </a>
                  </div>
                </div>
              </div>
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

            <div>
              <h3>OTHER SERVICES</h3>
              <a>
                <p>Local Sightseeing</p>
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
          </footer>{" "}
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
