import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import pmlAPI from "../../api/pmlAPI";

// css
import './SightSeeing.css'

// component
import DestinationCard from './destination/DestinationCard'
import Footer from '../../components/Footer'

const SightSeeing = (props) => {
  const [sights, setSights] = useState([])
  const [data, setdata] = useState([]);
  const location = useParams()



  useEffect(async () => {
    try{
      let res = await pmlAPI.get("/api/siteseen")

   

      const fillter = res?.data?.filter((w)=>{
        return w.stateName ==location.location
      })
      console.log(fillter)
      setSights(fillter)
    }
    catch(err){
      console.log(err)

    }
   
      
  }, []);
  return (
    <>
      <header className='sightseeing__header'>
        <h1>sightseeing</h1>
      </header>
      <div className='sightseeing'>
        <div className='sightseeing__container'>
          {sights.length > 0 ? (
            sights.map((item) => <DestinationCard {...item} />)
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SightSeeing
