import { useState, useEffect } from 'react'
import axios from 'axios';
import data from '../data'

/* eslint-diable */

function generateMarkersString(data) {
    return data.map(item => 
      `type:n|size:mid|color:blue|pos:${item.lng}%20${item.lat}|label:${item.name}`
    ).join('&markers=');
  }


function MyMap4() {

    const [mapUrl, setMapUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        const baseUrl = '/map-static/v2/raster-cors?w=1000&h=1000&center=126.7724471,37.5262978&level=13&X-NCP-APIGW-API-KEY-ID=0wu9upiroj';
        const width = 300;
        const height = 300;
        const markers = generateMarkersString(data);
        const apiKeyId = '0wu9upiroj'; // 네이버 클라우드 플랫폼에서 발급받은 API 키
        const apiKey = 'UzQWkOCuDT1tbgThIHremXadR1ZJU7HHyoi4eLiv'; // 네이버 클라우드 플랫폼에서 발급받은 API 키

        const url = `${baseUrl}&markers=${markers}`;
        setMapUrl(url);
        };

        fetchData();
    }, []);

    return (
        <div>
            <img src={mapUrl} />
        </div>
    )
}


export default MyMap4;