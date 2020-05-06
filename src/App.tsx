import React from 'react'
import DeckGL from '@deck.gl/react'
import { LineLayer } from '@deck.gl/layers'
import MapGL from 'react-map-gl'
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LanguageControl } from './components/language-control'

// Initial viewport settings
const initialViewState = {
  longitude: 139.7,
  latitude: 35.8,
  zoom: 10,
  pitch: 0,
  bearing: 0,
}

// Data to be used by the LineLayer
const data = [
  {
    sourcePosition: [139.71669, 35.789],
    targetPosition: [139.71669, 35.781],
  },
]

function App() {
  const layers = [new LineLayer({ id: 'line-layer', data })]
  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
      width='100%'
      height='100%'
      effects={[]}
    >
      <MapGL
        width='100%'
        height='100%'
        mapStyle='mapbox://styles/mapbox/streets-v10'
      >
        <LanguageControl />
      </MapGL>
    </DeckGL>
  )
}

export default App
