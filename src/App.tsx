import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css'

function App() {
  useEffect(() => {
    console.log('initializing mapbox')
    const map = new mapboxgl.Map({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
    })

    return () => {
      console.log('removing mapbox')
      map.remove()
    }
  }, [])

  return <div id='map' />
}

export default App
