import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import pmlAPI from "../api/pmlAPI";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Modal } from "react-bootstrap";
import date from "date-and-time";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

import "./Allcss/signUp.css"

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [forrefresh, setforrefresh] = useState();
  const [loading, setloading] = useState(false);
  const [localverify, setlocalverify] = useState({
    otp: "",
    time: "",
  });
  const [verify, setverify] = useState();
  const [showerr, setshowerr] = useState(false);
  const [userdata, setuserdata] = useState([]);
  const [valid , setvalid]=useState({
    isemail:false,
    ispassword:false,
    isphone:false,
    btnisdesable:true,
    showpassword:false
  })

  const handleSubmit = async (event) => {
    setloading(true);

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let ValueDta = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      password: data.get("password"),
    };
    setuserdata(ValueDta);

    await pmlAPI
      .post("/api/register", ValueDta)
      .then((res) => {
        if (res.data.result && res.data.Opt) {
          setlocalverify({
            ...localverify,
            otp: res.data.Opt,
            time: res.data.currentDate,
          });
          swal({
            title: "Otp Sent",
            text: res.data.massage,
            icon: "success",
          });
          setShow(true);
        } else {
          setloading(false);

          swal({
            title: "Error",
            text: res.data.massage,
            icon: "error",
            dangerMode: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = async () => {
    swal({
      title: "warning",
      text: "For Any Technical Eror Plz Contact Us",
      icon: "warning",
    });

    setShow(false);
    setloading(false);
  };

  const handleCheckOtp = async () => {
    let id = JSON.parse(localStorage.getItem("userData")).id;

    const now = new Date();
    let currentDatefront = date.format(now, "YYYY/MM/DD HH:mm:ss");

    var t1 = new Date(currentDatefront);
    var t2 = new Date(localverify.time);
    var dif = t1.getTime() - t2.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000 / 60;
    var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
    let convertinnumber = parseInt(Seconds_Between_Dates);

    if (verify == localverify.otp) {
      if (convertinnumber < 2) {
        console.log(localverify);
        console.log({ userdata });
        console.log(typeof convertinnumber);

        let ValueDta = {
          name: userdata.name,
          email: userdata.email,
          phone: userdata.phone,
          password: userdata.password,
          status:'verified'
        };

        await pmlAPI
        .post(`/api/verify/${id}` ,ValueDta )
        .then((res) => {

          console.log(res.data)

          if(res.data.result && res.data.data){
            swal({
              title: "success",
              text: res.data.massage,
              icon: "success",

            });
            setlocalverify([])
            setshowerr(false)
            localStorage.setItem('userData' ,JSON.stringify(res.data.data))

            setShow(false)
            setloading(false)
            navigate('/')

          }else{
            swal({
              title: "Error",
              text: res.data.massage,
              icon: "error",
              dangerMode: true,
            });
          }

        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "Error",
            text: ' Please Check your internet ',
            icon: "error",
            dangerMode: true,
          });
        });
      } else {
        console.log('dsadsfasfsdfasdf')
        swal({
                  title: "error",
                  text: 'Otp Expire ',
                  icon: "error",
    
                });
      }
      
    } else {
      setshowerr(true);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modaltitle">Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalbody">
            {showerr ? (
              <label className="modalbtninvalid"> Invalid Opt </label>
            ) : (
              <label className="modalbtn"> Verify Otp</label>
            )}

            <input
              type="text"
              id="verifyotp"
              name="verifyotp"
              className="modalinput"
              onChange={(e) => {
                setverify(e.target.value);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            <h4>Close</h4>
          </Button>
          <Button variant="primary" onClick={() => handleCheckOtp()}>
            <h4>Verify</h4>
          </Button>
        </Modal.Footer>
      </Modal>

     <div className="fullPart_sin">
       <div  className="firstPart_sin">
       <img src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-437061,resizemode-1,msid-78201700/wealth/spend/planning-a-holiday-in-next-few-months-avail-these-discounts-on-flights-hotels-travel-packages-now.jpg"></img>
       </div>
       <div className="secondPart_sin">
         <div className="jass9_sin">
         <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 0, bgcolor: "#3e4166",  width: "55px", height: "55px" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h3">
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label=" Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                sx={{
                  maxWidth:500
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e)=>{
                  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
                  if(!e.target.value || regex.test(e.target.value) === false){
                    setvalid({
                      ...valid, 
                      isemail:true,
                      btnisdesable:true
                      
                    })
  
                  }else{
                    setvalid({
                      ...valid, 
                      isemail:false,
                      
                      
                    })
                  }
  
                }}
              /><br></br>
                 {
                 valid.isemail ? (
                <>
                <span style={{
                  color:'red',
                  fontSize:'15px'
                  
                }}> Enter Valid email </span> <br></br></>):('')}
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone No."
                name="phone"
                // autoComplete="phone"
                autoFocus
                onChange={(e)=>{
                  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                  if(!re.test(e.target.value)){
                    setvalid({
                      ...valid,
                      isphone:true
                    })
                  }else{
                    setvalid({
                      ...valid,
                      isphone:false
                    })
                  }
                  
                }}
              /><br></br>
              {
               valid.isphone ? (
                 <>
                 <span style={{
                   color:'red',
                   fontSize:'15px'
                   
                 }}> Phone No. is Incorrect formate </span> <br></br></>):('')}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={valid.showpassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                onChange={(e)=>{
                  if(e.target.value.length < 8){
                    setvalid({
                      ...valid,
                      ispassword:true,
                      btnisdesable:true
                    })
                  }else{
                    setvalid({
                      ...valid,
                      ispassword:false,
                      btnisdesable:false
                    })
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end"
                    onClick={()=>{
                      setvalid({
                        ...valid,
                        showpassword:!valid.showpassword
                      })
                    }}>
                      {valid.showpassword ? <VisibilityOffIcon className='iconpassword' />:<VisibilityIcon  className='iconpassword' />}
                    </InputAdornment>
                  ),
                }}
              /><br></br>
              {
               valid.ispassword ? (
                 <>
                 <span style={{
                   color:'red',
                   fontSize:'15px'
                   
                 }}> Password Should be least 8 Character </span> <br></br></>):('')}

              <Button
                id="btn_sin"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1, fontSize: 14, bgcolor: "#3e4166" }}
                disabled={valid.btnisdesable}
              >
                {loading ? "Loading ........" : "Sign Up"}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
         </div>
       </div>
     </div>
    </>
  );
}
