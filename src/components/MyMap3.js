import { useState, useEffect } from 'react'
import axios from 'axios';
import data from '../data'

/* eslint-diable */

function generateMarkersString(data) {
    return data.map(item => 
      `type:n|size:mid|pos:${item.lng}%20${item.lat}|label:${item.id}`
    ).join('&markers=');
  }


function MyMap3() {

    const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = 'https://naveropenapi.apigw.ntruss.com/map-static/v2/raster';
      const width = 300;
      const height = 300;
      const markers = generateMarkersString(data);
      const apiKey = 'YOUR_API_KEY'; // 네이버 클라우드 플랫폼에서 발급받은 API 키

      const url = `${baseUrl}?w=${width}&h=${height}&markers=${markers}`;

      try {
        const response = await axios.get(url, {
          headers: {
            'X-NCP-APIGW-API-KEY-ID': apiKey,
          },
          responseType: 'arraybuffer', // 이미지 데이터를 이진 배열(buffer)로 받아옵니다.
        });

        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const imageUrl = `data:image/png;base64,${base64Image}`;
        setMapUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching the map image:', error);
      }
    };

    fetchData();
  }, []);


    return (
   <div>
      {mapUrl ? <img src={mapUrl} alt="Naver Map" /> : <p>Loading map...</p>}
    </div>
    )
}


export default MyMap3;