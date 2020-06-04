import React, { useState, useEffect } from 'react'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers'
import MapGL, { NavigationControl } from 'react-map-gl'
import { LanguageControl } from './LanguageControl'

// import { NavigationControl } from 'mapbox-gl'

import cities from '../data/N03-19_13_190101.json'
import infectedNumbers from '../data/N03-19_13_190101.json'

import { FeatureCollection, Feature } from 'geojson'

// Initial viewport settings
const initialViewState = {
  width: window.innerWidth,
  height: window.innerHeight,
  longitude: 139.7,
  latitude: 35.8,
  zoom: 9,
  pitch: 64,
  bearing: 0,
}

const days = (infectedNumbers as FeatureCollection).features.reduce(
  (acc, cur) => {
    if (typeof cur.properties?.公表日 !== 'number') return acc
    acc.add(cur.properties.公表日)
    return acc
  },
  new Set<number>(),
)

console.log(days)
console.log(Array.from(days).map((d) => new Date(d)))

const data = (cities as FeatureCollection).features

const layers = [
  new GeoJsonLayer<Feature>({
    id: 'geodata',
    data,
    stroked: false,
    filled: true,
    lineWidthMinPixels: 2,
    opacity: 0.4,
    // getLineDashArray: [3, 3],
    extruded: true,
    // wireframe: true,
    elevationScale: 0.0001,
    getElevation: (f) => {
      if (typeof f.properties?.N03_007 !== 'string') {
        return 0
      }
      // ;(infectedNumbers as FeatureCollection).features.find((f) => {
      //   if (typeof f.properties.自治体コード !== 'number') {
      //     return null
      //   }
      // })
      return Math.pow(parseInt(f.properties.N03_007), 2)
    },
    // getLineColor: (f) => [255, 0, 0],
    getFillColor: (f) => [200, 200, 120],
    // getRadius: (f) => {
    //   // console.log(f)
    //   const n = f.properties && f.properties['件数']
    //   if (typeof n === 'number') return n * 10
    //   return 0
    // },
  }),
]

export function Map() {
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
