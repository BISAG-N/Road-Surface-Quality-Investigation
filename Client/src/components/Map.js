import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const MapMarker = ({ lat, lng }) => (
  <div style={{ color: 'red', fontSize: '24px' }}>📍</div>
);

const Map = () => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleMapClick = (event) => {
    const { lat, lng } = event;
    setCoordinates({ lat, lng });
  };

  const defaultCenter = { lat: 37.965694, lng: -104.791559 };
  const defaultZoom = 20;
  const defaultMapTypeId = 'satellite';

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDnKsBLFKjI9aI5_Z8-wS5brMD99ycaKLE' }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        options={map => ({ mapTypeId: map.MapTypeId.SATELLITE })}
        onClick={handleMapClick}
      >
        {coordinates.lat && coordinates.lng && (
          <MapMarker {...coordinates} />
        )}
      </GoogleMapReact>
      {coordinates.lat && coordinates.lng && (
        <div >
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>
        </div>
      )}
    </div>
  );
};

export default Map;