import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container as MapDiv, NaverMap, Marker, Polyline, useNavermaps } from 'react-naver-maps';
import data from '../data';
import wrkrData from '../wrkrData';


function ReactNaverWrkrMap() {
    const navermaps = useNavermaps();

    const defaultLat = data[0].lat
    const defaultLng = data[0].lng
    const [bngLng, setBngLng] = useState(0);
    const [bngLat, setBngLat] = useState(0);
    const [cnt, setCnt] = useState(0);

    const [newData, setNewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const markers = data.map((location, index) => {
        const adjustedLng = parseFloat(location.lng) + (index * bngLng);
        const adjustedLat = parseFloat(location.lat) + (index * bngLat);
        const markerCnt = cnt + index;

        return {
            position: new navermaps.LatLng(adjustedLat, adjustedLng),
            content: `${index}`
        };
    });

    useEffect(() => {
        const fetchGeocodeData = async () => {
            try {
                // Create an array of promises
                const requests = wrkrData.map(worker =>
                    axios.get(`/map-geocode/v2/geocode?query=${encodeURIComponent(worker.adress)}`, {
                        headers: {
                            'X-NCP-APIGW-API-KEY-ID': '0wu9upiroj',
                            'X-NCP-APIGW-API-KEY': 'UzQWkOCuDT1tbgThIHremXadR1ZJU7HHyoi4eLiv'
                        }
                    })
                );

                // Wait for all requests to complete
                const responses = await Promise.all(requests);

                // Extract data from responses
                // const results = responses.map(response => response.data);

                                // Transform data to the desired format
                const transformedData = wrkrData.map((worker, index) => {
                    const response = responses[index].data;
                    if (response.status === 'OK' && response.addresses.length > 0) {
                        const { x, y } = response.addresses[0];
                        return {
                            name: worker.wrkerName,
                            lng: x,
                            lat: y
                        };
                    }
                    return {
                        name: worker.wrkerName,
                        lng: null,
                        lat: null
                    };
                });


                // Set data state with the results
                setNewData(transformedData);
                console.log(transformedData)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGeocodeData();
    }, []);

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

export default ReactNaverWrkrMap;