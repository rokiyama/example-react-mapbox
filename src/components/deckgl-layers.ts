import { ScatterplotLayer, Layer } from 'deck.gl'

export function renderLayers({
  data,
}: {
  data: Array<{ position: [number, number] }>
}): Layer<any>[] {
  console.log('renderLayers')
  return [
    new ScatterplotLayer({
      id: 'my',
      getPosition: (d) => d.position,
      getColor: (d) => [0, 128, 255],
      getRadius: (d) => 5,
      opacity: 0.5,
      pickable: true,
      radiusMinPixels: 2,
      radiusMaxPixels: 30,
      data,
    }),
  ]
}
