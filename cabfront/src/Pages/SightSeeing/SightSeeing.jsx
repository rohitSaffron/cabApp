import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// css
import './SightSeeing.css'

// component
import DestinationCard from './destination/DestinationCard'
import Footer from '../../components/Footer'

const SightSeeing = (props) => {
  const [sights, setSights] = useState([])
  const location = useParams()

  useEffect(() => {
    const featchData = async () => {
      try {
        const res = await axios.get(
          'http://cabbooking.masterdomain.in/index.php/wp-json/jet-cct/sight_seeing'
        )
        const filteredSights = res.data.filter(
          (item) => `${item.category}`.toLocaleLowerCase() == `${location.location}`.toLocaleLowerCase()
        )
        setSights(filteredSights)
      } catch (err) {
        console.error(err)
      }
    }
    featchData()
  }, [])
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
