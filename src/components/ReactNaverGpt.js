import React, { useState } from 'react';
import { Container as MapDiv, NaverMap, Marker, Polyline, useNavermaps } from 'react-naver-maps';
import data from '../data';


function ReactNaverGpt() {
  const navermaps = useNavermaps();
  
  const defaultLat = data[0].lat
  const defaultLng = data[0].lng
  const [bngLng, setBngLng] = useState(0);
  const [bngLat, setBngLat] = useState(0);
  const [cnt, setCnt] = useState(0);

  const markers = data.map((location, index) => {
    const adjustedLng = parseFloat(location.lng) + (index * bngLng);
    const adjustedLat = parseFloat(location.lat) + (index * bngLat);
    const markerCnt = cnt + index;

    return {
      position: new navermaps.LatLng(adjustedLat, adjustedLng),
      content: `${index}`
    };
  });

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
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.content}
            icon={{
              content: `<button class="markerBox">${marker.content}</button>`,
            }}
            strokeColor="#5347AA"
          />
        ))}

        {markers.map((marker, index) => {
          if (index === markers.length - 1) return null; // 마지막 마커는 다음 마커가 없으므로 패스
          const nextMarker = markers[index + 1];
          return (
            <Polyline
              key={`line-${index}`}
              path={[marker.position, nextMarker.position]}
              strokeColor="#5347AA"
              strokeOpacity={0.8}
              strokeWeight={2}
            />
          );
        })}
      </NaverMap>
    </MapDiv>
  );
}

export default ReactNaverGpt;