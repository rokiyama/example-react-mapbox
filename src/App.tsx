import React, { useState, useEffect, useRef } from 'react'
import DeckGL from '@deck.gl/react'
import { LineLayer, GeoJsonLayer } from '@deck.gl/layers'
import MapGL, { NavigationControl } from 'react-map-gl'
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LanguageControl } from './components/language-control'
import { MapController, MapView, Layer } from 'deck.gl'

// import { NavigationControl } from 'mapbox-gl'

import geodata from './N03-19_13_190101.json'
import { renderLayers } from './components/deckgl-layers'

// Initial viewport settings
const initialViewState = {
  width: window.innerWidth,
  height: window.innerHeight,
  longitude: 139.7,
  latitude: 35.8,
  zoom: 10,
  pitch: 100,
  bearing: 100,
}

// Data to be used by the LineLayer
const data = [
  {
    sourcePosition: [139.71669, 35.789],
    targetPosition: [139.71669, 35.781],
  },
]

const COUNTRIES =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson'

function App() {
  const [viewport, setViewport] = useState(initialViewState)

  useEffect(() => {
    const changeViewport = () => {
      setViewport({
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', changeViewport)
    return () => {
      window.removeEventListener('resize', changeViewport)
    }
  }, [viewport])

  const [mydata, setMydata] = useState([])
  useEffect(() => {
    setMydata(
      (geodata as any).features.map((f: any): {
        position: [number, number]
      } => ({
        position: f.geometry.coordinates[0][0] as [number, number],
      })),
    )
  }, [])

  const [layers, setLayers] = useState<Array<Layer<any>>>([])
  useEffect(() => {
    setLayers([
      new LineLayer({ id: 'line-layer', data }),
      new GeoJsonLayer({
        id: 'base-map',
        data: geodata as any,
        stroked: true,
        filled: true,
        lineWidthMinPixels: 2,
        opacity: 0.4,
        // getLineDashArray: [3, 3],
        extruded: true,
        getElevation: 100,
        getLineColor: [60, 60, 60],
        getFillColor: [200, 200, 200],
      }),
      ...renderLayers({ data: mydata }),
    ])
  }, [mydata])

  return (
    <MapGL
      {...viewport}
      mapStyle='mapbox://styles/mapbox/streets-v10'
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <LanguageControl />
      <div className='mapboxgl-ctrl-top-right'>
        <NavigationControl />
      </div>
      <DeckGL
        viewState={viewport}
        layers={layers}
        width='100%'
        height='100%'
        effects={[]}
      ></DeckGL>
    </MapGL>
  )
}

export default App
