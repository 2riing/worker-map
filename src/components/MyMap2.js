import { useRef, useEffect } from 'react'
import data from '../data'

/* eslint-diable */
function MyMap2() {

    const mapRef = useRef(null);
    const lng = 126.7684753 // 경도(x)
    const lat = 37.5311679 // 위도(y)    
    
    useEffect(() => {
      const { naver } = window;

      if (mapRef.current && naver) {
        const location = new naver.maps.LatLng(lat, lng);
        const map = new naver.maps.Map(mapRef.current, {
          center: location,
          zoom: 13, // 지도 확대 정도
        });

        data.forEach((item) => {
            const markerPosition = new naver.maps.LatLng(item.lat, item.lng);
            new naver.maps.Marker({
                position: markerPosition,
                map,
                label: item.name, // 마커에 마우스를 올렸을 때 표시할 제목
            });
        });
      }
    }, []);

    return (
      <div>
        <div ref={mapRef} style={{ width: "500px", height: "500px" }}></div>
      </div>
    )
}


export default MyMap2;