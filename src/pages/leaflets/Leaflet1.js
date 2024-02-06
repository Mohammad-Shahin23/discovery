import React from 'react'
import LeafletCard from '../../components/LeafletCard'
import PinchZoomComponent from '../../components/PinchZoomComponent'

import '../../styles/leaflet/Leaflet1.css'

function Leaflet1() {
  return (
    <div className='pageContainer'>
      <LeafletCard />
      

      <PinchZoomComponent />
      
    </div>
  )
}

export default Leaflet1
