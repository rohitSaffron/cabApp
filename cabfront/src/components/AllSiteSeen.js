import React, { useEffect, useState } from "react";
import { Box, Skeleton, IconButton, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import pmlAPI from "../api/pmlAPI";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import swal from "sweetalert";
import { nanoid } from "nanoid";
import { Modal ,Button } from 'react-bootstrap';
import {
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";



const gridStyle = {
  textAlign: "center",
  paddingLeft: 2,
  paddingRight: 2,
};
const fromControlstylr = {
  width: {
    xxs: 100,
    xs: 150,
    sm: 200,
    md: 300,
    lg: 400,
    xl: 500,
  },
};



const mainbox = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: "center",
  bgcolor: "background.paper",
  overflow: "hidden",
  borderRadius: "12px",
  boxShadow: 1,
  fontWeight: "bold",
  marginTop: 5,
  width: 900,
};

const boximg = {
  height: 233,
  width: 350,
  maxHeight: { xs: 233, md: 167 },
  maxWidth: { xs: 350, md: 250 },
};

const mainboxtwo = {
  display: "flex",
  flexDirection: "column",
  alignItems: { xs: "center", md: "flex-start" },
  m: 3,
  minWidth: { md: 350 },
};

const icons = {
  width: 100,
  transform: "scale(1.8)",
};

const styles = (theme) => ({
  smallButton: {
    padding: 6,
  },
  largeButton: {
    padding: 24,
  },
  largeIcon: {
    fontSize: "3em",
  },
  input: {
    display: "none",
  },
});

export default function AllSiteSeen() {
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const [refresh, setrefresh] = useState();
  const [show , setshow]=useState(false)
  const [formdata , setformdata]=useState([])

  useEffect(async () => {
    await pmlAPI
      .get("/api/siteseen")
      .then((res) => {
        setdata(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, [refresh]);

  let allstate = [
    {
      abbreviation: "AN",
      name: "Andaman and Nicobar Islands",
    },
    {
      abbreviation: "AP",
      name: "Andhra Pradesh",
    },
    {
      abbreviation: "AR",
      name: "Arunachal Pradesh",
    },
    {
      abbreviation: "AS",
      name: "Assam",
    },
    {
      abbreviation: "BR",
      name: "Bihar",
    },
    {
      abbreviation: "CG",
      name: "Chandigarh",
    },
    {
      abbreviation: "CH",
      name: "Chhattisgarh",
    },
    {
      abbreviation: "DH",
      name: "Dadra and Nagar Haveli",
    },
    {
      abbreviation: "DD",
      name: "Daman and Diu",
    },
    {
      abbreviation: "DL",
      name: "Delhi",
    },
    {
      abbreviation: "GA",
      name: "Goa",
    },
    {
      abbreviation: "GJ",
      name: "Gujarat",
    },
    {
      abbreviation: "HR",
      name: "Haryana",
    },
    {
      abbreviation: "HP",
      name: "Himachal Pradesh",
    },
    {
      abbreviation: "JK",
      name: "Jammu and Kashmir",
    },
    {
      abbreviation: "JH",
      name: "Jharkhand",
    },
    {
      abbreviation: "KA",
      name: "Karnataka",
    },
    {
      abbreviation: "KL",
      name: "Kerala",
    },
    {
      abbreviation: "LD",
      name: "Lakshadweep",
    },
    {
      abbreviation: "MP",
      name: "Madhya Pradesh",
    },
    {
      abbreviation: "MH",
      name: "Maharashtra",
    },
    {
      abbreviation: "MN",
      name: "Manipur",
    },
    {
      abbreviation: "ML",
      name: "Meghalaya",
    },
    {
      abbreviation: "MZ",
      name: "Mizoram",
    },
    {
      abbreviation: "NL",
      name: "Nagaland",
    },
    {
      abbreviation: "OR",
      name: "Odisha",
    },
    {
      abbreviation: "PY",
      name: "Puducherry",
    },
    {
      abbreviation: "PB",
      name: "Punjab",
    },
    {
      abbreviation: "RJ",
      name: "Rajasthan",
    },
    {
      abbreviation: "SK",
      name: "Sikkim",
    },
    {
      abbreviation: "TN",
      name: "Tamil Nadu",
    },
    {
      abbreviation: "TS",
      name: "Telangana",
    },
    {
      abbreviation: "TR",
      name: "Tripura",
    },
    {
      abbreviation: "UP",
      name: "Uttar Pradesh",
    },
    {
      abbreviation: "UK",
      name: "Uttarakhand",
    },
    {
      abbreviation: "WB",
      name: "West Bengal",
    },
  ];

  const onEdit =()=>{
   
    const id = formdata._id;
    let apidata={
      
      stateName:formdata.stateName ,
      stateImglink:formdata.stateImglink ,
      title:formdata.title ,
      price:formdata.price ,
      typePark:formdata.typePark ,
      sightLocation:formdata.sightLocation ,
      featuresImagelink:formdata.featuresImagelink ,
    }

    

    pmlAPI
      .patch(`/api/siteseen/${id}`, apidata)
      .then((res) => {
        console.log(res.data);
        if(res.data.err){
          swal({
            title: "Error",
            text: res.data.massage,
            icon: "error",
          });

        }else{
          swal({
            title: "Success",
            text: res.data.massage,
            icon: "success",
          });
          setrefresh(Math.random());
          setshow(false);
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleClose=()=>{
    setshow(false);
   
  }

  return (
    <>
      <Modal
        show={show}
       onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{
            fontSize:'25px'
          }}>Edit Site Seen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Grid item xs={12} sx={gridStyle}>
              <FormControl sx={fromControlstylr}>
                <InputLabel sx={{ fontSize: 15 }} id="StateName">
                  State
                </InputLabel>
                <Select
                  labelId="StateName"
                  id="StateName"
                  name="statename"
                  value={formdata.stateName}
                  sx={fromControlstylr}
                  InputLabelProps={{
                    style: { fontSize: 15, color: "black" },
                  }}
                  label="State "
                  onChange={(e) => {
                    setformdata({
                      ...formdata,
                      stateName: e.target.value,
                    });
                  }}
                >
                  {allstate?.map((w) => {
                    return (
                      <MenuItem sx={{ fontSize: 13 }} value={w.name}>
                        {w.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={gridStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={formdata.stateImglink}
                id="stateimg"
                name="stateimg"
                label="State Img Url"
                type="url"
                InputLabelProps={{
                  style: { fontSize: 15, color: "black" },
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
                onChange={(e) => {
                  setformdata({
                    ...formdata,
                    stateImglink: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} sx={gridStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                value={formdata.title}
                label="Title"
                name="title"
                InputLabelProps={{
                  style: { fontSize: 15, color: "black" },
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
                onChange={(e) => {
                  setformdata({
                    ...formdata,
                    title: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sx={gridStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={formdata.price}
                id="price"
                label="Price"
                name="price"
                InputLabelProps={{
                  style: { fontSize: 15, color: "black" },
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
                onChange={(e) => {
                  setformdata({
                    ...formdata,
                    price: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sx={gridStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={formdata.typePark}
                id="type"
                label="Type"
                name="type"
                InputLabelProps={{
                  style: { fontSize: 15, color: "black" },
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
                onChange={(e) => {
                  setformdata({
                    ...formdata,
                    typePark: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} sx={gridStyle}>
              <TextField
                margin="normal"
                required
                value={formdata.sightLocation}
                fullWidth
                id="location"
                label="Location"
                name="location"
                InputLabelProps={{
                  style: { fontSize: 15, color: "black" },
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
                onChange={(e) => {
                  setformdata({
                    ...formdata,
                    sightLocation: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sx={gridStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={formdata.featuresImagelink}
                id="featuredimg"
                name="featuredimg"
                label=" Feature Image "
                type="url"
                InputLabelProps={{
                  style: { fontSize: 15, color: "black" },
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
                onChange={(e) => {
                  setformdata({
                    ...formdata,
                    featuresImagelink: e.target.value,
                  });
                }}
              />
            </Grid>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>onEdit()}>Understood</Button>
        </Modal.Footer>
      </Modal>
      {data?.length == 0 ? (
        <></>
      ) : (
        <>
          {data?.map((w) => {
            return (
              <Box sx={mainbox} key={w._id}>
                {loading ? (
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    sx={{
                      height: 233,
                      width: 350,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                      borderRadius: 0,
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    sx={boximg}
                    alt="The house from the offer."
                    src={w.stateImglink}
                  />
                )}

                <Box sx={mainboxtwo}>
                  {loading ? (
                    <>
                      <Skeleton width={700} height={50} />
                      <Skeleton width={700} height={50} />
                      <Skeleton width={700} height={50} />
                    </>
                  ) : (
                    <>
                      <Box component="span">
                        <span>State Name : -</span> <span>{w.stateName}</span>
                      </Box>
                      <Box component="span">
                        <span>Title :- </span> <span>{w.title}</span>
                      </Box>
                      <Box component="span">
                        <span>Site Location :-</span>{" "}
                        <span>{w.sightLocation}</span>
                      </Box>
                      <Box component="span">
                        <span>Type :-</span> <span>{w.typePark}</span>
                      </Box>
                      <Box component="span">
                        <span>Price</span> <span>{w.price}</span>
                      </Box>
                    </>
                  )}
                </Box>

                <Box sx={mainboxtwo}>
                  {loading ? (
                    <>
                      <Skeleton width={700} height={50} />
                      <Skeleton width={700} height={50} />
                      <Skeleton width={700} height={50} />
                    </>
                  ) : (
                    <>
                      <Box component="span">
                        <IconButton onClick={()=>{
                          setshow(true)
                          setformdata(w)
                        }}>
                          <EditIcon sx={icons} fontSize="large" />
                        </IconButton>
                      </Box>

                      <Box component="span">
                        <IconButton
                          onClick={() => {
                            console.log(w._id);
                            swal({
                              title: "Are you sure?",
                              text: "Want To delete SiteSeen",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            }).then((willDelete) => {
                              if (willDelete) {
                                pmlAPI
                                  .delete(`/api/siteseen/${w._id}`)
                                  .then((res) => {
                                    console.log(res.data);
                                    if (res.data.err) {
                                      swal({
                                        title: "Error",
                                        text: res.data.massage,
                                        icon: "error",
                                      });
                                    } else {
                                      swal({
                                        title: "Success",
                                        text: res.data.massage,
                                        icon: "success",
                                      });
                                    }

                                    setrefresh(nanoid());
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              } else {
                                swal("SiteSeen  is safe!");
                              }
                            });
                          }}
                        >
                          <DeleteIcon sx={icons} />
                        </IconButton>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            );
          })}
        </>
      )}
    </>
  );
}
