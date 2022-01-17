import React , {useState, useEffect} from "react";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import LuggageIcon from "@mui/icons-material/Luggage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import pmlAPI from "../api/pmlAPI";
import swal from 'sweetalert';

const CabCard = ({
  carModel,
  seats,
  luggage,
  price,
  cabImage,
  dashboardDisplay,
  distance,
  cabId,
}) => {
  const [total , settotel]=useState(123)
  
  

  useEffect(() => {
    var totalssss= (price * distance) / 1000;
    
    settotel(totalssss)
  
  }, [])

const booknowbtn =async()=>{

  let user=JSON.parse(localStorage.getItem('userData'))

  let traveldetails=JSON.parse(localStorage.getItem('travelDetail'))

  console.log(user)
  console.log(traveldetails)


  let senddata={
    data:{
        name:user?.name,
        email:user?.email,
        pickUp:traveldetails.pickup.place_name,
        dropoff:traveldetails.dropoff.place_name,
        date:"2022-01-13T10:50:00.000Z",
        passengers:{
            adults:traveldetails.passengers.adults,
            childern:traveldetails.passengers.children,
            infants:traveldetails.passengers.infants
        }
},

     useremail:user.email,
     cabid:cabId,
     userid:user.id

        
}

await pmlAPI.post('/send',  senddata)
.then(res=>{
  console.log(res.data)
    if(res.data){
      swal({
        title: "success",
        text: res.data.massage,
        icon: "success",
        
      })
    }else{
      swal({
        title: "Error",
        text: 'somithing went wrong',
        icon: "error",
        dangerMode: true,
      })
    }
  
}).catch(err=>{
  console.log(err)
  swal({
    title: "Error",
    text: 'plz check internet',
    icon: "error",
    dangerMode: true,
  })
})





}


  return (
    <div className="cab-card" key={cabId}>
      <div className="cab-card__image">
        <img src={cabImage} alt="car 1" />
      </div>

      <div className="cab-card__details">
        <h2 className="h2--2">{carModel}</h2>
        <div className="service">
          <div className="service__unit">
            <h3 className="h3 h3--1">1 Unit</h3>
          </div>
          <div className="service__seats">
            <h3 className="h3 h3--1">
              <AirlineSeatReclineNormalIcon /> {seats} Seats
            </h3>
          </div>
          <div className="service__luggage">
            <h3 className="h3 h3--1">
              <LuggageIcon /> {luggage} Luggage bag
            </h3>
          </div>
        </div>
        {!dashboardDisplay && (
          <>
            <div className="tags">
              <div className="tags__safety">
                <h3 className="h3">Safety Standards & Restriction</h3>
              </div>
              <div className="tags__payment">
                <h3 className="h3">Partial Payment</h3>
              </div>
            </div>

            <div className="checkmarks">
              <p className="p p--1">
                <CheckCircleIcon />
                Free cancellation
              </p>
              <p className="p p--1">
                <CheckCircleIcon />
                25 / 7 customer helpline
              </p>
            </div>
          </>
        )}
      </div>

      <div className="cab-card__price">
        {dashboardDisplay && <h2 className="h2--2">₹ {price} per hour</h2>}
        {!dashboardDisplay && <h2 className="h2--2">₹ {total.toFixed(0)}</h2>}
        {!dashboardDisplay && (
          <>
            <button className="btn btn--1" onClick={()=>{
              booknowbtn()
            }}>Book Now</button>
            <p className="p p--1">All prices include fees & tip</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CabCard;
