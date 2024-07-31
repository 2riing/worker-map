import React from 'react';
import { Container as MapDiv, NaverMap, Marker, Polyline, Polygon, useNavermaps } from 'react-naver-maps';
import geoData from '../geoData';

// 색상 매핑 설정
const workerColors = {
    "A": { stroke: '#FF0000', fill: '#FFCCCC', marker: '#FF0000' },
    "B": { stroke: '#FFFF00', fill: '#FFFF00', marker: '#FFFF00' },
    "C": { stroke: '#00FF00', fill: '#00FF00', marker: '#00FF00' },
    "D": { stroke: '#006400', fill: '#006400', marker: '#006400' },
    "E": { stroke: '#4682B4', fill: '#4682B4', marker: '#4682B4' },
    "F": { stroke: '#000080', fill: '#000080', marker: '#000080' },
    "G": { stroke: '#FF1493', fill: '#FF1493', marker: '#FF1493' },
    "H": { stroke: '#A9A9A9', fill: '#A9A9A9', marker: '#A9A9A9' },
    "I": { stroke: '#000000', fill: '#000000', marker: '#000000' },
    "J": { stroke: '#DB7093', fill: '#DB7093', marker: '#DB7093' },
    "K": { stroke: '#556B2F', fill: '#556B2F', marker: '#556B2F' },
    "L": { stroke: '#8B4513', fill: '#8B4513', marker: '#8B4513' },
};

function ReactNaverWrkrMap() {
    const navermaps = useNavermaps();

    // Organize geoData by worker names
    const workers = geoData.reduce((acc, item) => {
        if (!acc[item.name]) {
            acc[item.name] = [];
        }
        acc[item.name].push([parseFloat(item.lat), parseFloat(item.lng)]);
        return acc;
    }, {});

    const defaultLat = geoData.length > 0 ? geoData[0].lat : 37.5233580;
    const defaultLng = geoData.length > 0 ? geoData[0].lng : 126.7905588;

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
                {/* Draw Polygons and Markers for Each Worker */}
                {Object.entries(workers).map(([workerName, coordinates]) => {
                    const { stroke, fill, marker } = workerColors[workerName] || { stroke: '#000000', fill: '#CCCCCC', marker: '#000000' };
                    
                    return (
                        <React.Fragment key={workerName}>
                            {/* Draw Polygon */}
                            <Polygon
                                path={coordinates.map(([lat, lng]) => new navermaps.LatLng(lat, lng))}
                                strokeColor={stroke}
                                strokeOpacity={0.8}
                                strokeWeight={3}
                                fillColor={fill}
                                fillOpacity={0.5}
                            />
                            {/* Draw Markers */}
                            {coordinates.map(([lat, lng], idx) => (
                                <Marker
                                    key={`marker-${workerName}-${idx}`}
                                    position={new navermaps.LatLng(lat, lng)}
                                    title={`Worker: ${workerName}, Location: ${idx + 1}`}
                                    icon={{
                                        content: `<button class="markerBox" style="background-color: ${marker}; color: white;">${idx + 1}</button>`,
                                    }}
                                />
                            ))}
                            {/* Draw Polylines */}
                            {coordinates.map((coord, coordIndex) => {
                                if (coordIndex === coordinates.length - 1) return null; // Skip the last coordinate for polyline
                                const nextCoord = coordinates[coordIndex + 1];
                                return (
                                    <Polyline
                                        key={`line-${workerName}-${coordIndex}`}
                                        path={[
                                            new navermaps.LatLng(coord[0], coord[1]),
                                            new navermaps.LatLng(nextCoord[0], nextCoord[1])
                                        ]}
                                        strokeColor={stroke}
                                        strokeOpacity={0.8}
                                        strokeWeight={2}
                                    />
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </NaverMap>
        </MapDiv>
    );
}

export default ReactNaverWrkrMap;