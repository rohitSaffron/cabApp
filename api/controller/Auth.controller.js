const User = require("../models/User");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const date = require("date-and-time");

const register = (req, res, next) => {
  let useremaillcheck = req.body.email;
  let userphonecheck = req.body.phone;
  const now = new Date();
  let currentDate = date.format(now, "YYYY/MM/DD HH:mm:ss");

  var Opt = Math.random();
  Opt = Opt * 1000000;
  Opt = parseInt(Opt);

  const output = `
        <p>Here Is your Otp</p>
        <h3>Otp is valid for 2 Minutes</h3>


        <h4>Otp: ${Opt}</h4>
        <h4>Valid For: 2 Minutes</h4>
        <h4>Sending Time: ${currentDate} </h4>
        
        <h3>Message</h3>
        <h1>Thank you </h1>
      `;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.adminEmail,
      pass: process.env.password,
    },
  });

  var mailOptions = {
    from: process.env.adminEmail,
    to: `${useremaillcheck} `,
    subject: "Your Otp is her",
    text: "Use this opt for SignUp!",
    html: output,
  };

  User.findOne({ $or: [{ email: useremaillcheck }] }).then((user) => {
    if (user) {
      res.json({
        massage: "email already exited",
      });
    } else {
      User.findOne({ $or: [{ phone: userphonecheck }] }).then((user) => {
        if (user) {
          res.json({
            massage: "Phone already exited",
          });
        } else {
          if (useremaillcheck) {
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                res.send(error);
              } else {
                res.json({
                  result: true,
                  massage: `check your email: ${useremaillcheck}`,
                  currentDate,
                  Opt,
                });
              }
            });
          } else {
            res.json({
              result: false,
              massage: "We unable to get your email plz signup again",
            });
          }
        }
      });
    }
  });
};

const login = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ $or: [{ email: email }] }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          User.findOne({ $or: [{ email: email }] }).then((user) => {
            if (user.role == "admin") {
              let token = jwt.sign({ name: user.name }, "verySecretvalue", {
                expiresIn: "3h",
              });
              var data = {
                name: user.name,
                id: user.id,
                email: user.email,
                token: token,
              };

              res.json({
                data: data,
              });
            } else {
              var data = {
                name: user.name,
                id: user.id,
                email: user.email,
              };

              res.json({
                data: data,
              });
            }
          });
        } else {
          res.json({
            massage: "password do not match",
          });
        }
      });
    } else {
      res.json({
        massage: "No user Found",
      });
    }
  });
};

const verifyOtp = async (req, res) => {
  let id = req.params.id;
  let useremaillcheck = req.body.email;

 

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.adminEmail,
      pass: process.env.password,
    },
  });

  var mailOptions = {
    from: process.env.adminEmail,
    to: `${useremaillcheck} `,
    subject: "Your Otp is her",
    text: `<h1> Thanks for Joining Us `,
   
  };
  if(req.body){

    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        res.json({
          error: err,
        });
      }
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role || "user",
        status: req.body.status || "pending",
        password: hashedPass,
      });
      user
        .save()
        .then((user) => {
          let data = {
            name: user.name,
            id: user.id,
            email: user.email,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.send(error);
            } else {
              res.json({
                result:true,
                data,
                massage: "user added Successfully",
                
              });
            }
          });
        })
        .catch((error) => {
          res.json({
            massage: "An error Occured !",
          });
        });
    });

  }else{
    res.json({
      massage:' SomeThing Went wrong '
    })
  }



};

const deleteuser = async (req, res, next) => {
  let id = req.params.id;
  try {
    User.findByIdAndDelete(id, function (err, docs) {
      if (err) {
        res.json({
          err,
        });
      } else {
        res.json({
          massage: "For Any Technical Eror Plz Contact Us",
        });
      }
    });
  } catch (err) {
    res.json({
      err,
    });
  }
};

const forgotpassword = async (req, res) => {
  var id = req.params.id;
  var passwordrr = req.body.oldpsd;
  var passwordnew = req.body.newpsd;
  User.findById(id, function (err, docs) {
    if (err) {
      res.json({
        err,
        massage: "there is error plz log in again or refresh page ",
      });
    } else {
      bcrypt.compare(passwordrr, docs.password, function (err, result) {
        if (err) {
          res.json({
            err,
            massage: "there is error plz log in again or refresh page",
          });
        } else {
          if (result) {
            bcrypt.hash(passwordnew, 10, async function (err, hashedPass) {
              const user = await User.findByIdAndUpdate(
                { _id: id },
                { password: hashedPass },
                {
                  new: true,
                }
              );
              res.json({
                result,
                massage: "Password Change succsesfully",
              });
            });
          } else {
            res.json({
              result,
              massage: "Old Password in incorect",
            });
          }
        }
      });
    }
  });
};

module.exports = {    
  register,
  login,
  verifyOtp,
  deleteuser,
  forgotpassword,
};
