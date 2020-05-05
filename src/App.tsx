import React, { useState } from 'react'
import './App.css'
import ReactMapGL from 'react-map-gl'

function App() {
  const [viewport, setViewport] = useState({
    latitude: 35,
    longitude: 139,
    zoom: 8,
  })

  const mapStyle = 'mapbox://styles/mapbox/streets-v11'

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      width='100vw'
      height='100vh'
      mapStyle={mapStyle}
    />
  )
}

export default App
