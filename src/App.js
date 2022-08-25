import React from 'react'
import './App.css';
import { useState, useEffect } from 'react'
import Map from './Map';
// import Buttons from './Buttons';

import Location from './Location';
import SearchItems from './SearchItems';
import Results from './Results';
import Directions from './Directions';

function App() {

  // Create and mount the map state
  const [mapState, setMapState] = useState({});
  useEffect(() => {
    // Mapquest/API Key
    window.L.mapquest.key = 'SbABP9Vr89Ox8a38s29QPLUQm51xa784';

    setMapState(window.L.mapquest.map('map', {
      center: [40, -80],
      layers: window.L.mapquest.tileLayer('map'),
      zoom: 12
    }));
  }, [])

  // States for current position
  const [currentLatitude, setCurrentLatitude] = useState(43.6532)
  const [currentLongitude, setCurrentLongitude] = useState(-79.3832)

  // State for search input
  const [searchInput, setSearchInput] = useState('coffee')

  // State for destination
  const [destination, setDestination] = useState({})

  return (
    <div className="App">


      <h1>React Test Version</h1>
      <Map />

      <Location
        mapState = {mapState}
        currentLatitude={currentLatitude}
        setCurrentLatitude={setCurrentLatitude}
        currentLongitude={currentLongitude}
        setCurrentLongitude={setCurrentLongitude}
      />

      <SearchItems searchInput={searchInput} setSearchInput={setSearchInput} />

      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '10px'}}>
        <Results mapState={mapState} searchInput={searchInput} currentLatitude={currentLatitude} currentLongitude={currentLongitude} destination={destination} setDestination={setDestination} />

        <Directions mapState={mapState} currentLatitude={currentLatitude} currentLongitude={currentLongitude} destination={destination} />

      </div>

      




      {/* <Buttons map={mapState}></Buttons> */}
      {/* <div id="map" style={{ width: '100%', height: '530px' }}></div> */}

      

    </div>
  );
}

export default App;
