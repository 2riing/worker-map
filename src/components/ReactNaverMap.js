import { useRef, useEffect, useState} from 'react'
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps'
import data from '../data'

/* eslint-diable */
function ReactNaverMap() {

  const navermaps = useNavermaps()
  const defaultLng = data[0].lng
  const defaultLat = data[0].lat

  const [bngLng, setBngLng] = useState(0)
  const [bngLat, setBngLat] = useState(1)
  const [cnt, setCnt] = useState(0)

  return (
    <MapDiv
      style={{
        width: '100%',
        height: '1300px',
      }}
    >
      <NaverMap
        defaultCenter={new navermaps.LatLng(defaultLat, defaultLng)}
        defaultZoom={15}
      >
        {data.map((location, index) => (

    
          <Marker
            key={index}
            position={new navermaps.LatLng(location.lat, location.lng)}
            title='name'
            size='small'
            type='n'
            icon={{
              content:
                `<button class="markerBox">${location.name}</button>`,
            }}
          />
        ))}
      </NaverMap>
    </MapDiv>
  )
}


export default ReactNaverMap;