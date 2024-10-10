import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import _ from 'lodash'

import 'mapbox-gl/dist/mapbox-gl.css'
const token = 'pk.eyJ1IjoidGllbmRhdG1hcGJveDAzIiwiYSI6ImNtMHQ1endiejBzN2Yya29oa2hkdjU1MGwifQ.v6skxtaZmxO1_rgFB0iasw'

const Map = ({ actionCordinate, dataBusRoute, setDataBusRoute }) => {
  const mapContainerRef = useRef()
  const mapRef = useRef()

  const [coordinates, setCoordinates] = useState()

  useEffect(() => {
    mapboxgl.accessToken = token

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [106.70074730595508, 10.774605151541294],
      zoom: 13
    })

    // Add geolocate control to the map.
    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      })
    )

    const marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([106.70074730595508, 10.774605151541294])
      .addTo(mapRef.current)

    function onDragEnd() {
      const lngLat = marker.getLngLat()
      setCoordinates([lngLat.lng, lngLat.lat])
    }

    marker.on('dragend', onDragEnd)

    return () => {
      mapRef.current.remove()
    }
  }, [])

  useEffect(() => {
    const _dataBusROute = _.cloneDeep(dataBusRoute)
    _dataBusROute[actionCordinate] = coordinates
    setDataBusRoute(_dataBusROute)
  }, [coordinates])

  return <div id='map' ref={mapContainerRef} style={{ height: '50vh', width: '100%' }}></div>
}

export default Map
