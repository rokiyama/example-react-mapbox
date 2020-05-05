import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css'

function App() {
  useEffect(() => {
    console.log('initializing mapbox')
    const map = new mapboxgl.Map({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [140, 36],
      zoom: 8,
    })

    map.addControl(new MapboxLanguage())

    return () => {
      console.log('removing mapbox')
      map.remove()
    }
  }, [])

  return <div id='map' />
}

export default App
