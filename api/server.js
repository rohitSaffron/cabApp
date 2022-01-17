const express = require('express')
const mongoose=require('mongoose')
const dotenv = require('dotenv').config();
const otpGenerator = require('otp-generator')
const bodyParser= require('body-parser')
const morgan = require('morgan')
const PORT = process.env.port;
const User =require('./models/User')
var cors = require('cors');
const nodemailer = require('nodemailer');


const AuthRoute = require('./routes/auth')
const cabRoute =require('./routes/cab')


const admingmail=process.env.adminEmail
const adminpassword=process.env.password

mongoose.connect(process.env.mongodb, {useNewUrlParser:true, useUnifiedTopology:true})
const db= mongoose.connection


db.on('error' , (err)=>{
    console.log(err)
})

db.once('open', ()=>{
    console.log('Database is running ')
})
const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api' , AuthRoute)
app.use('/api', cabRoute)

app.get('/', (req, res)=>{
    User.find({},function(err , users){
        if(err){
            console.log(err)
            res.json(err)
        }else{
            console.log(users)
            res.json(users)
        }
    })
})

app.post('/send', async (req, res) => {
  
    

 await   User.findOne({$or:[{_id:req.body.cabid}]})
    .then(cab=>{

      User.findOne({$or:[{_id:req.body.userid}]})
      .then(user=>{
       
        const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
          <li>Name: ${req.body.data.name}</li>
          <li>email: ${req.body.data.email}</li>
          <li>Phone: ${user.phone}</li>
          <li>Pickup location: ${req.body.data.pickUp}</li>
            <li>dropoff location: ${req.body.data.dropoff}</li>
              <li>Date: ${req.body.data.date}</li>
                <li>adults: ${req.body.data.passengers.adults}</li>
                 <li>childern: ${req.body.data.passengers.childern}</li>
                  <li>infants: ${req.body.data.passengers.infants}</li
          
        </ul>
        <h3>Message</h3>
        <h1>Thank you </h1>
      `;
    
      
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.adminEmail,
            pass: process.env.password
          }
        });
        
        var mailOptions = {
          from:  process.env.adminEmail ,
          to: `${req.body.useremail} , ${cab.email}`,
          subject: 'Sending Email using Node.js',
          text: 'That was easy!',
          html: output
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            res.send(error)
          } else {
            
            res.json({
              massage:'booking successfull'
            })
          }
        });
  

      }).catch(error=>{
        res.json({
          error
        })
      })
        

        
  
      }).catch(error=>{
        res.json({
          error
        })
      })
    })
   






app.listen(PORT, () =>

console.log(`app is running at   ${PORT}`)
  
);











