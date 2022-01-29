import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import "./Allcss/header.css";
import { Drawer, ListItem, Divider, List, ListItemText } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useRideValue } from "../context/rideContext";

const Header = () => {
  const [{ pickup, dropoff, date, passengers, distance }, dispatch] =
    useRideValue();
  const navigate = useNavigate();
  const [key, setkey] = useState("");
  const [userdata, setuserData] = useState({
    name: "",
  });
  const [refresh, setrefresh] = useState("hiiii");
  const matches = useMediaQuery("(max-width:1100px)");
  const [drawerOpen, setdrawer] = useState(false);
  const [deviceType, setDeviceType] = useState("");

  const vvvv = localStorage.getItem("userData");
  const ggg = vvvv;
  const jsonnn = JSON.parse(ggg);

  useEffect(() => {
    let data = {
      name: "",
    };
    if (jsonnn?.name) {
      setuserData(jsonnn);
    } else {
      console.log("noooo");
      localStorage.setItem("userData", JSON.stringify(data));
      setuserData(data);
    }
  }, []);

  useEffect(() => {
    let hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
      const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
      } else if ("orientation" in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
    if (hasTouchScreen) {
      setDeviceType("Mobile");
    } else {
      setDeviceType("Desktop");
    }
  }, []);


useEffect(()=>{
  console.log(deviceType)
},[deviceType])

  const setDrawerOpen = (isDrawerOpen) => {
    setdrawer({
      drawerOpen: isDrawerOpen,
    });
  };

  const toggleDrawer = () => {
    setdrawer(!drawerOpen);
  };

  return (
    <>
      {matches ? (
        <>
          <div className="header">
            <div className="header__container">
              <img
                src="/assets/logo.png"
                alt=""
                className="header__logo"
                onClick={() => navigate("/")}
              />
            </div>

            <div className="header__container inside">
              <ul className="header__navlist">
                <li>
                  <Link to="#">
                    <MenuIcon
                      className="svg_icons"
                      onClick={() => {
                        toggleDrawer();
                      }}
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Drawer anchor="right" openSecondary={true} open={drawerOpen}>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
              component="nav"
              aria-label="mailbox folders"
            >
              <ListItem className="minusdiv">
                <HighlightOffIcon
                  className="svg_iconsminus"
                  onClick={() => {
                    toggleDrawer();
                  }}
                />
              </ListItem>
              <ListItem>
                <h3>{userdata?.name || jsonnn?.name}</h3>
              </ListItem>
              <Divider />
              <ListItem button divider>
                <Link
                  to="/"
                  onClick={() => {
                    toggleDrawer();
                  }}
                >
                  <h4 className="heaing">Cabs</h4>
                </Link>
              </ListItem>
              <ListItem button divider>
                <Link
                  to="/activities"
                  onClick={() => {
                    toggleDrawer();
                  }}
                >
                  <h4 className="heaing">Activities</h4>
                </Link>
              </ListItem>
              <ListItem button>
                <ListItemText
                  sx={{ fontSize: 70 }}
                  primary="About"
                  onClick={() => {
                    toggleDrawer();
                  }}
                />
              </ListItem>
              <Divider light />
              {userdata?.token || jsonnn?.token ? (
                <ListItem button>
                  <Link
                    to="/dashboard"
                    onClick={() => {
                      toggleDrawer();
                    }}
                  >
                    <h4 className="heaing">Dashboard</h4>
                  </Link>
                </ListItem>
              ) : (
                ""
              )}

              {userdata?.name == "" && jsonnn?.name == "" ? (
                <>
                  <Divider light />
                  <ListItem button>
                    <a>
                      {" "}
                      <Link
                        to="/login"
                        onClick={() => {
                          toggleDrawer();
                        }}
                      >
                        <h4 className="heaing">Login</h4>
                      </Link>
                    </a>
                  </ListItem>
                  <Divider light />
                  <ListItem button>
                    <a>
                      {" "}
                      <Link
                        to="/signup"
                        onClick={() => {
                          toggleDrawer();
                        }}
                      >
                        <h4 className="heaing">SignUp</h4>
                      </Link>
                    </a>
                  </ListItem>
                  <Divider light />
                </>
              ) : (
                <>
                  <Divider light />
                  <ListItem button>
                    <a>
                      {" "}
                      <Link
                        to="/changepsd"
                        onClick={() => {
                          toggleDrawer();
                        }}
                      >
                        <h4 className="heaing">Change Password</h4>
                      </Link>
                    </a>
                  </ListItem>
                  <Divider light />
                  <ListItem button>
                    <a
                      onClick={() => {
                        let data = {
                          name: "",
                        };

                        localStorage.setItem("userData", JSON.stringify(data));
                        setuserData(data);
                        setkey("");
                      }}
                    >
                      {" "}
                      <Link
                        to="/"
                        onClick={() => {
                          toggleDrawer();
                        }}
                      >
                        <h4 className="heaing">Log Out</h4>
                      </Link>
                    </a>
                  </ListItem>
                  <Divider light />
                </>
              )}
            </List>
          </Drawer>
        </>
      ) : (
        <>
          <div className="header">
            <div className="header__container">
              <img
                src="/assets/logo.png"
                alt=""
                className="header__logo"
                onClick={() => navigate("/")}
              />
            </div>

            <div className="header__container">
              <ul className="header__navlist ul_version">
                <li>
                  <Link to="/">Cabs</Link>
                </li>
                {userdata?.token || jsonnn?.token ? (
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                ) : (
                  ""
                )}
                 <li>
                  <Link to="/activities">Activities</Link>
                </li>
              
                <li>
                  <Link to="/aboutus">About us</Link>
                </li>
               </ul>
            </div>

            <div className="header__container">
              {userdata?.name == "" && jsonnn?.name == "" ? (
                <ul className="header__navlist">
                  <li>
                    <a>
                      {" "}
                      <Link to="/login">Login</Link>
                    </a>
                  </li>
                  <li>
                    <a>
                      {" "}
                      <Link to="/signup">SignUp</Link>
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="header__navlist">
                  <li>
                    <a
                      style={{
                        color: "white",
                      }}
                    >
                      {" "}
                      Hi, {userdata?.name || jsonnn?.name}
                    </a>
                  </li>
                  <li>
                    <a>
                      {" "}
                      <Link to="/changepsd">Change Password</Link>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        let data = {
                          name: "",
                        };

                        localStorage.setItem("userData", JSON.stringify(data));
                        setuserData(data);
                        setkey("");
                      }}
                    >
                      {" "}
                      <Link to="/">Log Out</Link>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>{" "}
        </>
      )}

      <div className="header__ghost"></div>
    </>
  );
};

export default Header;
