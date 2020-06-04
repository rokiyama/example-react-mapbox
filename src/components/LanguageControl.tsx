import { useContext, useEffect } from 'react'
import { _MapContext as MapContext } from 'react-map-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'

export function LanguageControl() {
  const context = useContext(MapContext)
  useEffect(() => {
    const lang = new MapboxLanguage()
    context.map?.addControl(lang)
    return () => {
      context.map?.removeControl(lang)
    }
  }, [context.map])
  return null
}
