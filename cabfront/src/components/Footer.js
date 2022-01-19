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
              <h3>About PrimeCab</h3>
              <p>
                Search for will uncover many web sites variables onto of passage
                of lorem ipsum available but the majority the word all
                predefined humour to met chunk recently with desktop
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
                  Just setting up my twitter, <span>#mytwitt</span> Nov, 28,
                  2017
                </p>
              </a>
            </div>
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
