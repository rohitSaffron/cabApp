import React, { useEffect, useState } from "react";
import { Router, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { Grid, Skeleton, Container  } from "@mui/material";
import "./destination.css";
import pmlAPI from "../../api/pmlAPI";

const gridcontainer = {
  height: 800,
};

const Destination = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  const navigatePage = (value) => {
    console.log(value);
     navigate(`/sights/${value}`);
  };

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
  }, []);

  return (
    <>
      {data?.length == 0 ? (
        <>
          {" "}
          <Container fixed>
            <Grid container spacing={2}>
              <Grid item xs={4}>
               
              </Grid>
              <Grid item xs={4}>
                <h1> Data No Found</h1>
               
               </Grid>
               <Grid item xs={4}>
               
               </Grid>
             
            </Grid>
          </Container>{" "}
        </>
      ) : (
        <>
          {" "}
          {loading ? (
            <>
              <br></br>
              <br></br>
              <Container>
                <Grid container spacing={5} sx={gridcontainer}>
                  <Grid item xs={4}>
                    <Skeleton variant="rectangular" width={310} height={318} />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton variant="rectangular" width={310} height={318} />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton variant="rectangular" width={310} height={318} />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton variant="rectangular" width={310} height={318} />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton variant="rectangular" width={310} height={318} />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton variant="rectangular" width={310} height={318} />
                  </Grid>
                </Grid>
              </Container>
            </>
          ) : (
            <div className="destination">
              <header className="destination__header">
                <h1>sightseeing</h1>
              </header>
              <div className="destination__container">
                <section className="popular-destinations">
                  <h1>Popular Destinations In India</h1>

                  <div className="destination__grid">
                    {
                      data?.map((w)=>{
                        return(
                          <div
                          onClick={() => navigatePage(w.stateName)}
                          className="item item1"
                          style={{
                            backgroundImage: `url(${w.stateImglink} )`
                          }}
                        >
                          <span>{w.stateName}</span>
                        </div>
                        )
                      })
                    }
                  </div>
                </section>
              </div>
            </div>
          )}
        </>
      )}

      <Footer />
    </>
  );
};

export default Destination;
