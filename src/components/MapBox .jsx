import { useState, useEffect } from 'react'
import Map, { Marker, Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios'

const MapBox = ({ pointA, pointB }) => {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 14
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [userLocation, setUserLocation] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
          setViewport((prevViewport) => ({
            ...prevViewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }))
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [])

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=pk.eyJ1IjoidGllbmRhdG1hcGJveDAzIiwiYSI6ImNtMHQ1endiejBzN2Yya29oa2hkdjU1MGwifQ.v6skxtaZmxO1_rgFB0iasw`
      )
      const [longitude, latitude] = response.data.features[0].center
      setSearchResult({ latitude, longitude })
      setViewport({ ...viewport, latitude, longitude })
    } catch (error) {
      console.error('Error searching location:', error)
    }
  }

  const [route, setRoute] = useState(null)

  const getDirections = async () => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pointA.lng},${pointA.lat};${pointB.lng},${pointB.lat}?geometries=geojson&access_token=pk.eyJ1IjoidGllbmRhdG1hcGJveDAzIiwiYSI6ImNtMHQ1endiejBzN2Yya29oa2hkdjU1MGwifQ.v6skxtaZmxO1_rgFB0iasw`
      )
      setRoute(response.data.routes[0].geometry)
    } catch (error) {
      console.error('Error fetching directions:', error)
    }
  }

  useEffect(() => {
    getDirections()
  }, [pointA, pointB])

  return (
    <div className='w-full h-full'>
      {/* <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search for a place'
        style={{ marginBottom: '10px', padding: '5px', width: '300px' }}
      />
      <button onClick={handleSearch}>Search</button> */}
      {userLocation ? (
        <Map
          mapboxAccessToken='pk.eyJ1IjoidGllbmRhdG1hcGJveDAzIiwiYSI6ImNtMHQ1endiejBzN2Yya29oa2hkdjU1MGwifQ.v6skxtaZmxO1_rgFB0iasw'
          {...viewport}
          style={{ width: '100%', height: '500px' }}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          onMove={(evt) => setViewport(evt.viewState)}
        >
          {/* Hiển thị Marker tại vị trí hiện tại */}
          {/* <Marker latitude={pointA.lat} longitude={pointA.lng} offsetLeft={-20} offsetTop={-10}></Marker> */}
          {/* <div style={{ backgroundColor: 'red', height: '30px', width: '30px' }}></div> */}
          {searchResult && (
            <Marker latitude={searchResult.latitude} longitude={searchResult.longitude} offsetLeft={-20} offsetTop={-10}>
              <div className='bg-red-600 size-4 rounded-full'></div>
            </Marker>
          )}

          {/* Marker for Point A */}
          <Marker latitude={pointA.lat} longitude={pointA.lng}>
            <div className='bg-red-600 size-4 rounded-full'></div>
          </Marker>

          {/* Marker for Point B */}
          <Marker latitude={pointB.lat} longitude={pointB.lng} offsetLeft={-20} offsetTop={-10}></Marker>

          {/* Render the route as a line on the map */}
          {route && (
            <Source id='route' type='geojson' data={route}>
              <Layer
                id='route'
                type='line'
                layout={{ 'line-join': 'round', 'line-cap': 'round' }}
                paint={{
                  'line-color': '#888',
                  'line-width': 8
                }}
              />
            </Source>
          )}
        </Map>
      ) : (
        <div>Loading current location...</div>
      )}
    </div>
  )
}

export default MapBox
