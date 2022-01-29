const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const otpGenerator = require("otp-generator");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT;
const User = require("./models/User");
var cors = require("cors");
const nodemailer = require("nodemailer");

const AuthRoute = require("./routes/auth");
const cabRoute = require("./routes/cab");
const sideRoute=require('./routes/sideseen')

const admingmail = process.env.adminEmail;
const adminpassword = process.env.password;

mongoose.connect(process.env.mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database is running ");
});
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", AuthRoute);
app.use("/api", cabRoute);
app.use("/api", sideRoute);

app.get("/", (req, res) => {
  User.find({}, function (err, users) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log(users);
      res.json(users);
    }
  });
});

app.post("/send", async (req, res) => {
  await User.findOne({ $or: [{ _id: req.body.cabid }] })
    .then(async (cab) => {
      await User.findOne({ $or: [{ _id: req.body.userid }] })
        .then((user) => {
          const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
          <li>Name: ${req.body.data.name}</li>
          <li>email: ${req.body.data.email || req.body.useremail}</li>
          <li>Phone: ${req.body.data.phone || user.phone}</li>
          <li>Pickup location: ${req.body.data.pickUp}</li>
          <li>Pickup location Details: ${
            req.body.data.pickupDetailAdress || req.body.data.pickUp
          }</li>
          <li>dropoff location: ${req.body.data.dropoff}</li>
          <li>dropoff location Details: ${
            req.body.data.dropoffDetailAdress || req.body.data.dropoff
          }</li>
          <li>Date: ${req.body.data.date}</li>
          <li>adults: ${req.body.data.passengers.adults}</li>
          <li>childern: ${req.body.data.passengers.childern}</li>
          <li>infants: ${req.body.data.passengers.infants}</li>
          <li>Totel Payment : ${req.body.data.total}  </li>
          
        </ul>
        <h3>Message</h3>
        <h1>Thank you </h1>
      `;

          var transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
              user: process.env.adminEmail,
              pass: process.env.password,
            },
          });

          var mailOptions = {
            from: process.env.adminEmail,
            to: `${req.body.data.email || req.body.useremail} , ${cab.email}`,
            subject: " Cab related Query  ",
            text: "Thanks for contact us!",
            html: output,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.send(error);
            } else {
              res.json({
                massage: "booking successfull",
              });
            }
          });
        })
        .catch((error) => {
          res.json({
            nouser: true,
            error,
            massage: "Plz Log In then Book Cab",
          });
        });
    })
    .catch((error) => {
      res.json({
        error,
        massage: "canot able to find cab data",
      });
    });
});

app.post("/api/localsightseen", async (req, res) => {
  const output = `
  <p>You have a new request</p>
  <h3> Hii ${req.body.name}</h3>
  <ul>  
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    <li>Pickup location: ${req.body.location}</li>
    
        <li>Date: ${req.body.date}</li>
          <li>Passengers: ${req.body.passengers}</li>
           
    
  </ul>
  <h3>Our Team will reach you On ${req.body.phone} As Soon As Possible </h3>
  <h1>Thank you </h1>
`;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.adminEmail,
      pass: process.env.password,
    },
  });

  var mailOptions = {
    from: process.env.adminEmail,
    to: `${req.body.email} , ${process.env.superadmin}`,
    subject: " Cab Realted Query ",
    text: "Thanks for contact us!",
    html: output,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send(error);
    } else {
      res.json({
        massage: "booking successfull",
      });
    }
  });
});

app.post("/forgotpassword", async (req, res) => {
  let useremaillcheck = req.body.email;

  const now = new Date();

  var Opt = Math.random();
  Opt = Opt * 1000000;
  Opt = parseInt(Opt);

  const output = `
       <h3>Hello </h3>
        <p>Your One-Time-Password (OTP)  is ${Opt} and is valid for 2 minutes. Do not share your OTP with anyone.  </p>

        <h3>Regards</h3>
        <h1>Team PML Holidays </h1>
      `;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.adminEmail,
      pass: process.env.password,
    },
  });

  var mailOptions = {
    from: process.env.adminEmail,
    to: `${useremaillcheck} `,
    subject: "Your Otp is here",
    text: "Use this opt for Change Your Password!",
    html: output,
  };

  await User.findOne({ $or: [{ email: useremaillcheck }] }).then((user) => {
    if (user) {
      let id = user._id;

      if (useremaillcheck) {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.send(error);
          } else {
            res.json({
              result: true,
              massage: `check your email: ${useremaillcheck}`,
              Opt,
              id,
              user,
            });
          }
        });
      } else {
        res.json({
          result: false,
          massage: "We unable to get your email plz signup again",
        });
      }
    } else {
      res.json({
        massage: "Email Does Not Exit on Our Database Plz Register",
      });
    }
  });
});

app.listen(PORT, () => console.log(`app is running at   ${PORT}`));
