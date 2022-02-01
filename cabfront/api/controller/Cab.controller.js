const Cab = require("../models/Cab");
const dotenv = require("dotenv").config();
const date = require("date-and-time");
const nodemailer = require("nodemailer");



const cabAdd = (req, res, next) => {
  let cab = new Cab({
    userId: req.body.userId,
    carModel: req.body.carModel,
    luggage: req.body.luggage,
    seats: req.body.seats,
    price: req.body.price,
    region:req.body.region,
    cabImage: req.body.cabImage,
    city:req.body.city
  });

  cab
    .save()
    .then((cab) => {
      res.json({
        massage: "cab added Successfully",
      });
    })
    .catch((error) => {
      res.json({
        massage: "An error Occured !",
        error,
      });
    });
};

const allcabsofuser = (req, res, next) => {
  Cab.find({ $or: [{ userId: req.params.id }] }).then((cab) => {
    res.json({
      cab,
    });
  });
};

const allCab = (req, res, next) => {
  Cab.find({}, function (err, cab) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.json(cab);
    }
  });
};

const editcab = async (req, res, next) => {
  let data = req.body;
  let id = req.params.id;

  const user = await Cab.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  res.send(user);
};

const deleteCab = async (req, res, next) => {
    let id = req.params.id
  try {
    Cab.findByIdAndDelete(id, function (err, docs) {
      if (err) {
       res.json({
         err
       })
      } else {
        res.json({
          massage:'Cab Deleted Successfull'
        })
      }
    });
  } catch (err) {
    res.json({
      err,
    });
  }
};

const internationalquery =async(req,res)=>{

  let useremail = req.body.email;
  let username  =req.body.name;

  const output = `
        <p>Hii ${username}</p>
        <h3>Thanks For query we will contact you as soon as posible </h3>


        <h4> Name : ${req.body.name} </h4>
        <h4> Email : ${req.body.email} </h4>
        <h4> Phone No. : ${req.body.phone}</h4>
        <h4>Location : ${req.body.location} </h4>
        <h4> Date And Time : ${req.body.date} </h4>
        <h4> Luggage : ${req.body.luggage} KG </h4>
        <h2> Passanger </h2>
        <h4> Adults: ${req.body.passengers.adults} </h4>
        <h4> Children: ${req.body.passengers.children} </h4>
        <h4>Infants : ${req.body.passengers.infants} </h4>
        <h2> Your Query :</h2>
        <p>${req.body.textarea} </p>
        
       
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
    to: `${useremail} , ${process.env.superadmin} `,
    subject: "Email Reagarding International Travel",
    text: ` We will Contact you soon `,
    html: output,
   
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({
        error,
        massage:'Something went wrong plz qruery again'
      })
    } else {
      res.json({
        result:true,
        massage: "Thank you We will contact you soon ",
        
      });
    }
  });

 
 
}










module.exports = {
  cabAdd,
  allcabsofuser,
  allCab,
  editcab,
  deleteCab,
  internationalquery
};