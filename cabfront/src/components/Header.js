import React , {useState , useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";




const Header = () => {
  const navigate = useNavigate();
  const [key , setkey] =useState('')
  const [userdata ,setuserData]=useState('')
  const [ refresh , setrefresh] =useState('hiiii')


  

  

 
  const vvvv=localStorage.getItem('userData');
  const ggg =vvvv;
   const jsonnn = JSON.parse(ggg)

   
  
 
   
  return (
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
          <ul className="header__navlist">
        

            <li>
              <Link to="/">Cabs</Link>
            </li>
            {
             jsonnn?.token  ?(
                <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

              ):(
                ''
                
              )

            }
            
            <li>
              <a href="/">About us</a>
            </li>
          </ul>
        </div>

        <div className="header__container">
          {
              jsonnn?.name ==''  ?(
              <ul className="header__navlist">
              <li>
                <a> <Link to="/login">Login</Link></a>
              </li>
              <li>
                <a> <Link to="/signup">SignUp</Link></a>
              </li>
              
   
             
            </ul>

            ):(
              <ul className="header__navlist">
                <li>
                  <a>{jsonnn?.name}</a>
                </li>
                <li>
                <a> <Link to="/changepsd">Change Password</Link></a>
              </li>
                <li>
                <a onClick={()=>{
                  let data={
                    name:''
                  }
                 
                  localStorage.setItem('userData' ,JSON.stringify(data))
                  setuserData(data)
                  setkey('')
                }}> <Link to="/">Log Out</Link></a>
              </li>
              </ul>



            )
          }
          
         

            
         
        </div>
      </div>

      <div className="header__ghost"></div>
    </>
  );
};




export default Header;
