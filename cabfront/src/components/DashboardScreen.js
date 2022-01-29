import React ,{useState ,useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'


import DashBoardGraphs from "./DashBoardGraphs";
import DashboardCabs from "./DashboardCabs";
import International from "./International";
import AllCabs from "./AllCabs";

const DashboardScreen = () => {
  const [currentPage , setcurrentPage]=useState('Dashboard')

  const location = useLocation();
  
useEffect(()=>{
  if(location.pathname =='/dashboard/allcabs'){
    setcurrentPage('All Cabs ')

    

  }else if(location.pathname =='/dashboard/reports'){
    setcurrentPage('Report')

  }else if(location.pathname =='/dashboard/cabs'){
    setcurrentPage('Add New Cab')

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
              top: "0px",
            }}
          >
            <div className="navbar__image">
              <img
                src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
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
              marginLeft: "50px"
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
          </Routes>
        </div>
      </div>
    </div>
    </>
  );
};

export default DashboardScreen;
