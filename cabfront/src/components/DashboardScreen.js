import React ,{useState ,useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'


import DashBoardGraphs from "./DashBoardGraphs";
import DashboardCabs from "./DashboardCabs";
import International from "./International";
import AllCabs from "./AllCabs";
import AllSiteSeen from "./AllSiteSeen";
import AddSiteSeen from "./AddSiteSeen";

const  DashboardScreen = () => {
  const [currentPage , setcurrentPage]=useState('Dashboard')

  const location = useLocation();
  
useEffect(()=>{
  if(location.pathname =='/dashboard/allcabs'){
    setcurrentPage('All Cabs ')

    

  }else if(location.pathname =='/dashboard/reports'){
    setcurrentPage('Report')

  }else if(location.pathname =='/dashboard/cabs'){
    setcurrentPage('Add New Cab')

  }
  else if(location.pathname =='/dashboard/allsiteseen'){
    setcurrentPage(' All SiteSeen Cab')

  }
  else if(location.pathname =='/dashboard/addsiteseen'){
    setcurrentPage('Add SiteSeen')

  }else{
    setcurrentPage('Dashboard')

  }
},[location])
  


  return (<>
  <br></br>
    <div className="dashboard">
        <div style={{
        padding:'0px',
        background: "#001d3d"
        
      }}>
        <div
          className="navbar"
          style={{
            height: "300px",
           
          }}
        >
        
          <div
            className="navbar__info"
            style={{
              position: "relative",
              top: "13px",
            }}
          >
            <div className="navbar__image">
            

              <img
                src="https://cdn4.vectorstock.com/i/1000x1000/07/33/taxi-driver-avatar-character-vector-12750733.jpg"
                alt="user"
              />
            </div>

            <h3 className="h3 h3--2">
              {JSON.parse(localStorage.getItem("userData")).name}
            </h3>
          </div>
         
          <div
            className="navbar__container"
            style={{
              position: "relative",
              top: "0px",
              marginLeft: "30px"
            }}
          >
            <Link to="/dashboard/reports">
              <h3 className="h3 h3--2">Reports</h3>
            </Link>
            <Link to="/dashboard/allcabs">
              <h3 className="h3 h3--2"> All Cabs</h3>
            </Link>
            <Link to="/dashboard/cabs">
              <h3 className="h3 h3--2"> Add Cab</h3>
            </Link>
            <Link to="/dashboard/allsiteseen">
              <h3 className="h3 h3--2"> All SiteSeen Cab</h3>
            </Link>
            <Link to="/dashboard/addsiteseen">
              <h3 className="h3 h3--2"> Add SiteSeen</h3>
            </Link>
          </div>
      
      </div>
      </div>

      <div className="navbar__ghost"></div>

      <div className="data">
        <div className="data__title">
          <h2 className="h2 h2--1">{currentPage}</h2>

          <Routes>
            <Route path="/reports" element={<DashBoardGraphs />} />
            <Route path="/allcabs" element={<AllCabs />} />
            <Route path="/cabs" element={<DashboardCabs />} />
            <Route path="/allsiteseen" element={<AllSiteSeen />} />
            <Route path="/addsiteseen" element={<AddSiteSeen />} />
          </Routes>
        </div>
      </div>
    </div>
    </>
  );
};

export default DashboardScreen;
