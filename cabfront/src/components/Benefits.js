import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";

const Benefits = () => {
  return (
    <section className="benefits">
      <div className="benefits__container mt-med">
        <h2 className="h2 h2--2">
          Cab booking benefit with <span>PML Holidays</span>
        </h2>
      </div>
      <div className="benefits__container">
        <div className="card">
          <div className="card__logo">
            <AttachMoneyRoundedIcon />
          </div>
          <div className="card__description">
            <h3 className="h3 h3--1">Get Flat 10% Off</h3>
            <p className="p p--1">
              Enjoy Flat 10% Off on One Way & Round Trip Cab Booking use :
              EMTCAB10
            </p>
          </div>
          <ChevronRightIcon />
        </div>
        <div className="card">
          <div className="card__logo">
            <TrendingUpRoundedIcon />
          </div>
          <div className="card__description">
            <h3 className="h3 h3--1">Travel Advisory</h3>
            <p className="p p--1">
              You should know latest COVID-19 travel guidelines before booking
              your Cab
            </p>
          </div>
          <ChevronRightIcon />
        </div>
        <div className="card">
          <div className="card__logo">
            <ReceiptRoundedIcon />
          </div>
          <div className="card__description">
            <h3 className="h3 h3--1">Partial Payment</h3>
            <p className="p p--1">
              Book cab on paying 15% as initial amount and rest to driver on
              pick up.
            </p>
          </div>
          <ChevronRightIcon />
        </div>
      </div>
    </section>
  );
};

export default Benefits;
