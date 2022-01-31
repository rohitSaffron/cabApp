import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "../scss/components/international.css";
import shimla from "../imges/shimla.jpg";
import kashmir from "../imges/kasmir.jpg";
import delhi from "../imges/delhi.jpg";
import dehra from "../imges/dehra.webp";
import kerla from "../imges/kerla.jpg";
import goa from "../imges/goa.jpg";
import punjab from "../imges/punjab.jpeg";
import pune from "../imges/pune.png";
import agra from "../imges/agra.jpeg";
import kashi from "../imges/kasi.jpg";
import {
  Modal,
  Form,
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

const International = () => {
  const navigate = useNavigate();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const navigationlink = (value) => {
    navigate(`/sights/${value}`);
  };

  let data = [
    {
      link: shimla,
      heading: "Shimla",
      para: "Shimla city gets its name from Shyamala Mata, a fearless incarnation of the goddess Kali.",
    },
    {
      link: pune,
      heading: "Pune",
      para: "Pune is a sprawling city in the western Indian state of Maharashtra.",
    },
    {
      link: punjab,
      heading: "Punjab",
      para: " Punjab, famously referred to as The land of five rivers, is situated in the north western part of India.",
    },
    {
      link: goa,
      heading: "Goa",
      para: "Goa is a famous tourist spot for Indians because of its dazzling nightlife that never ends.",
    },
    {
      link: kerla,
      heading: "Kerala",
      para: "The Portuguese were the first Europeans to establish a stronghold in Kerala.",
    },
    {
      link: dehra,
      heading: "Dehradun",
      para: "Dehradun is the capital of the Indian state of Uttarakhand, near the Himalayan foothills.",
    },
    {
      link: delhi,
      heading: "Delhi",
      para: "The Garden of Five senses, the Lodi Gardens, the Buddha Jayanti Park and Nehru Park",
    },
    {
      link: kashmir,
      heading: "Kashmir",
      para: "The word Kashmir was derived from the ancient Sanskrit language and was referred to as káśmīra.",
    },
    {
      link: agra,
      heading: "Agra",
      para: "The city is famous for being the capital of the Mughal emperors from 1526 to 1658.",
    },
    {
      link: kashi,
      heading: "Kashi",
      para: "The Kashi is the most important places of worship in the Hindu religion.",
    },
  ];



  return (
    <>
      <Container>
        <Row>
          <Col>
            <main className="main">
              <Row>
                <Col sm={4}></Col>
                <Col sm={4}>
                  {" "}
                  <h2 className="h2 h2--2  mt-big this_one">Local Packages</h2>
                </Col>
                <Col sm={4}></Col>
              </Row>
              <div className="container">
                <Carousel
                  responsive={responsive}
                  autoPlay={true}
                  swipeable={true}
                  infinite={true}
                >
                  <div className="card cardheight">
                    <div className="card-image">
                      <img
                        src={shimla}
                        loading="lazy"
                        className="responsive"
                        alt="Images"
                       
                      ></img>
                    </div>
                    <div className="card-inner">
                      <h3 className="text text-title">Shimla</h3>
                      <p className="paragraph truncate">
                        Shimla city gets its name from Shyamala Mata, a fearless
                        incarnation of the goddess Kali.
                      </p>
                    </div>
                    <div className="buttondiv">
                      <button
                        className="book_btn"
                        onClick={() => navigationlink('Shimla')}
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>

                  <div className="card cardheight ">
                    <div className="card-image">
                      <img
                        src={kashmir}
                        loading="lazy"
                        className="responsive"
                        alt="Images"
                      ></img>
                    </div>
                    <div className="card-inner">
                      <h3 className="text text-title">Kashmir</h3>
                      <p className="paragraph truncate">
                        The word Kashmir was derived from the ancient Sanskrit
                        language and was referred to as káśmīra.
                      </p>
                    </div>
                    <div className="buttondiv">
                      <button
                        className="book_btn"
                        onClick={() => navigationlink('Kashmir')}
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>

                  <div className="card cardheight">
                    <div className="card-image">
                      <img
                        src={delhi}
                        loading="lazy"
                        className="responsive"
                        alt="Images"
                      ></img>
                    </div>
                    <div className="card-inner">
                      <h3 className="text text-title">Delhi</h3>
                      <p className="paragraph truncate">
                        The Garden of Five senses, the Lodi Gardens, the Buddha
                        Jayanti Park and Nehru Park
                      </p>
                    </div>
                    <div className="buttondiv">
                      <button
                        className="book_btn"
                        onClick={() => navigationlink('Delhi')}
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                  <div className="card cardheight">
                    <div className="card-image">
                      <img
                        src={dehra}
                        loading="lazy"
                        className="responsive"
                        alt="Images"
                      ></img>
                    </div>
                    <div className="card-inner">
                      <h3 className="text text-title">Dehradun</h3>
                      <p className="paragraph truncate">
                        Dehradun is the capital of the Indian state of
                        Uttarakhand, near the Himalayan foothills.
                      </p>
                    </div>
                    <div className="buttondiv">
                      <button
                        className="book_btn"
                        onClick={() => navigationlink('Rajasthan')}
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                  <div className="card cardheight">
                    <div className="card-image">
                      <img
                        src={kerla}
                        loading="lazy"
                        className="responsive"
                        alt="Images"
                      ></img>
                    </div>
                    <div className="card-inner">
                      <h3 className="text text-title">Kerala</h3>
                      <p className="paragraph truncate">
                        The Portuguese were the first Europeans to establish a
                        stronghold in Kerala.
                      </p>
                    </div>
                    <div className="buttondiv">
                      <button
                        className="book_btn"
                        onClick={() => navigationlink('Kerala')}
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                  <div className="card cardheight">
                    <div className="card-image">
                      <img
                        src={goa}
                        loading="lazy"
                        className="responsive"
                        alt="Images"
                      ></img>
                    </div>
                    <div className="card-inner">
                      <h3 className="text text-title">Goa</h3>
                      <p className="paragraph truncate">
                        Goa is a famous tourist spot for Indians because of its
                        dazzling nightlife that never ends.
                      </p>
                    </div>
                    <div className="buttondiv">
                      <button
                        className="book_btn"
                        onClick={() => navigationlink('Goa')}
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                  <div className="card cardheight">
                    <div className="card-image">
                      <img
                        src={punjab}
                        loading="lazy"
                        className="responsive"
                        alt="Images"
                      ></img>
                    </div>
                    <div className="card-inner">
                      <h3 className="text text-title">Punjab</h3>
                      <p className="paragraph truncate">
                        Punjab, famously referred to as 'The land of five
                        rivers', is situated in the north western part of India.
                      </p>
                    </div>
                    <div className="buttondiv">
                      <button
                        className="book_btn"
                        onClick={() => navigationlink('Amritsar')}
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                  <div className="card cardheight">
                    <div className="card-image">
                      <img
                        src={pune}
                        loading="lazy"
                        className="responsive"
                        alt="Images"
                      ></img>
                    </div>
                    <div className="card-inner">
                      <h3 className="text text-title">Pune</h3>
                      <p className="paragraph truncate">
                        Pune is a sprawling city in the western Indian state of
                        Maharashtra.
                      </p>
                    </div>
                    <div className="buttondiv">
                      <button
                        className="book_btn"
                        onClick={() => navigationlink('Pune')}
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                  <div className="card cardheight">
                    <div className="card-image">
                      <img
                        src={agra}
                        loading="lazy"
                        className="responsive"
                        alt="Images"
                      ></img>
                    </div>
                    <div className="card-inner">
                      <h3 className="text text-title">Agra</h3>
                      <p className="paragraph truncate">
                        The city is famous for being the capital of the Mughal
                        emperors from 1526 to 1658.
                      </p>
                    </div>
                    <div className="Buttondiv">
                      <button
                        className="book_btn"
                        onClick={() => navigationlink('Agra')}
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                  <div className="card cardheight">
                    <div className="card-image">
                      <img
                        src={kashi}
                        loading="lazy"
                        className="responsive"
                        alt="Images"
                      ></img>
                    </div>
                    <div className="card-inner">
                      <h3 className="text text-title">Kashi</h3>
                      <p className="paragraph truncate">
                        The Kashi is the most important places of worship in the
                        Hindu religion.
                      </p>
                    </div>
                    <div className="Buttondiv">
                      <button
                        className="book_btn"
                        onClick={() => navigationlink('Kashi')}
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                </Carousel>
              </div>
            </main>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default International;
