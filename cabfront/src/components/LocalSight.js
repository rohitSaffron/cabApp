import React, { useEffect, useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { TextField, Checkbox, Grid } from "@mui/material";
import "./Allcss/localSight.css";
import Footer from "./Footer";
import { useRideValue } from "../context/rideContext";
import indianCitiesDatabase from "indian-cities-database";
import { useParams } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';

// API
import pmlAPI from "../api/pmlAPI";
import swal from "sweetalert";
// React router
import { useNavigate } from "react-router-dom";

// multi select multi
import Select from "react-select";
import { width } from "@mui/system";

const label = { inputProps: { "aria-label": "Checkbox demo" } };


const gridStyle = {
  textAlign: "center",
  paddingLeft: 2,
  paddingRight: 2,
  paddingTop:7
};



export default function LocalSight() {
  const [{ pickup, dropoff, passengers, date }, dispatch] = useRideValue();
  const citess = indianCitiesDatabase.cities;
  const navigate = useNavigate();
  const location = useParams();
  const matches = useMediaQuery('(max-width:1540px)');

  const [data, setdata] = useState({
    name: "",
    email: "",
    phone: "",
    passengers: "",
    date: "",
    PickUplocation:'',
    Package_Name:location.package

  });
  const [loading, setloading] = useState(false);
  const [option, setoption] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [widthsize , setwidthsize]=useState(360)

  useEffect(() => {
    let dataoption = citess?.map((w) => {
      return { label: w.city, value: `${w.city}  ${w.state}` };
    });

    setoption(dataoption);
  }, []);

  const localsightseenBtn = async (event) => {
    event.preventDefault();
    setloading(true);

    if (pickup.place_name) {
      let maindata = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.PickUplocation,
        Package_Name:data.Package_Name,
        passengers: data.passengers,
        date: data.date,
      };

      let vvv = await pmlAPI.post("/api/localsightseen", maindata);

      if (vvv.data.massage) {
        swal({
          title: "Success",
          text: vvv.data.massage,
          icon: "success",
        });
        setloading(false);

        navigate("/");
      } else {
        swal({
          title: "Error",
          text: "Something Went Wronge",
          icon: "error",
        });
        setloading(false);
      }
    } else {
      swal({
        title: "Error",
        text: "Plz Select Location",
        icon: "error",
        dangerMode: true,
      });
      setloading(false);
    }
  };
  const styles = {
    container: (base) => ({
      ...base,
      flex: 1,
     
      width: '900px',
      minWidth: "200px",
      maxWidth:'400px',
      marginLeft:230,
      marginRight:100
     
    }),
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=>{
    if(matches){
      setwidthsize(250)
    }

  },[matches])

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  console.log(location.package);
  return (
    <>
      <br></br>
      <br></br>

      <Container fluid className="localContainer">
        <Row>
          <Col sm className="localColh1"></Col>
          <Col sm className="localColh1">
            <h1 className="titlemain">LOCAL SIGHTSEEING</h1>
          </Col>
          <Col sm className="localColh1"></Col>
        </Row>
      </Container>

      <Container>
        <Form onSubmit={localsightseenBtn}>
          <Row>
            <Col sm></Col>
            <Col sm className="secondTitle">
              <h2 className="titleSecond">LOCAL SIGHTSEEING</h2>
            </Col>
            <Col sm></Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col>
              <p className="localSightParaSecond">
                Give Us A Chance To Make Your Sightseeing Experience Memorable
                By Leaving Your Details Below And We Shall Get In Touch With You
              </p>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <h2 style={{ paddingLeft: " 80px" }}>Package Name :- </h2>
            </Col>
            <Col>
              <h2>{location.package} </h2>
            </Col>
            <Col></Col>
          </Row>

          <br></br>

          <div className="good_box">
            <Grid container spacing={2} sx={gridStyle}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  className="textField"
                  required
                  value={data.name}
                  onChange={(e) => {
                    setdata({
                      ...data,
                      name: e.target.value,
                    });
                  }}
                  sx={{
                    width: {
                      xxs: 100,
                      xs: 150,
                      sm: 200,
                      md: 300,
                      lg: 400,
                      xl: 500,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={gridStyle}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className="textField"
                  type="email"
                  value={data.email}
                  required
                  onChange={(e) => {
                    setdata({
                      ...data,
                      email: e.target.value,
                    });
                  }}
                  sx={{
                    width: {
                      xxs: 100,
                      xs: 150,
                      sm: 200,
                      md: 300,
                      lg: 400,
                      xl: 500,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={gridStyle}>
                <Select
                  styles={styles}
                  aria-labelledby="aria-label"
                  inputId="aria-example-input"
                  defaultValue={{
                    label: "Chandigarh",
                    value: "Chandigarh  Punjab",
                  }}
                  name="aria-live-color"
                  onMenuOpen={onMenuOpen}
                  onMenuClose={onMenuClose}
                  options={option}
                  onChange={(e) => {
                    console.log(e.value);
                  }}
                  
                />
              </Grid>
              <Grid item xs={12} sx={gridStyle}>
                <TextField
                  id="outlined-basic"
                  label="Phone No"
                  variant="outlined"
                  type="tel"
                  className="textField "
                  value={data.phone}
                  required
                  onChange={(e) => {
                    setdata({
                      ...data,
                      phone: e.target.value,
                    });
                  }}
                  sx={{
                    width: {
                      xxs: 100,
                      xs: 150,
                      sm: 200,
                      md: 300,
                      lg: 400,
                      xl: 500,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={gridStyle}>
                <TextField
                  id="outlined-basic"
                  label="No. Of Passanger"
                  variant="outlined"
                  className="textFieldsingle"
                  type="number"
                  value={data.passengers}
                  required
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    setdata({
                      ...data,
                      passengers: e.target.value,
                    });
                  }}
                  sx={{
                    width: {
                      xxs: 100,
                      xs: 150,
                      sm: 200,
                      md: 300,
                      lg: 400,
                      xl: 500,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={gridStyle}>
                {" "}
                <TextField
                  id="outlined-basic"
                  label="Date"
                  variant="outlined"
                  className="text_Field"
                  type="datetime-local"
                  sx={{ width: "330px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  onChange={(e) => {
                    setdata({
                      ...data,
                      date: e.target.value,
                    });
                  }}
                  sx={{
                    width: {
                      xxs: 100,
                      xs: 150,
                      sm: 200,
                      md: 300,
                      lg: 400,
                      xl: 500,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </div>

          <div className="at_end">
            <Row>
              <Col sm={1}>
                {" "}
                <Checkbox {...label} required />
              </Col>
              <Col sm={11}>
                <p>
                  I have read & accept the{" "}
                  <a
                    href="https://pmlholidays.com/policies?type=privacypolicy"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>
                </p>
              </Col>
            </Row>

            <Row>
              <Col sm={1}>
                {" "}
                <Checkbox {...label} required />
              </Col>
              <Col sm={11}>
                <p>
                  Yes, I would like to receive updates about product & services,
                  promotions, special offers, news & events from Paul Merchants
                  Ltd. team via SMS/Email/Tele-Call.
                </p>
              </Col>
            </Row>

            <Row>
              <Col sm></Col>
              <Col sm>
                <Button type="submit" className="submitButton ">
                  {loading ? "Loading ..." : "Submit"}
                </Button>
              </Col>
              <Col sm></Col>
            </Row>
          </div>
        </Form>
      </Container>

      <Footer />
    </>
  );
}
