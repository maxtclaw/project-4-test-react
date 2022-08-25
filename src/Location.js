import { useState } from "react"

export default function Location({ mapState, currentLatitude, setCurrentLatitude, currentLongitude, setCurrentLongitude}) {

    // Controlled Inputs
    const handleCurrentLongitudeChange = (e) => {
        setCurrentLongitude(e.target.value);
    }
    const handleCurrentLatitudeChange = (e) => {
        setCurrentLatitude(e.target.value);
    }


    // Function executed when user submits their current location
    const submitCurrentLocation = (e, currentLongitude, currentLatitude) => {
        e.preventDefault();
        window.L.mapquest.geocoding().geocode(`${currentLatitude},${currentLongitude}`, currentLocationCallback);
    }

    const [geocodingLayer, setGeocodingLayer] = useState({});
    const [geocodingLayerDefined, setGeocodingLayerDefined] = useState(false);

    const currentLocationCallback = (error, response) => {
        if (!geocodingLayerDefined) {
            setGeocodingLayerDefined(true);
            setGeocodingLayer(window.L.mapquest.geocodingLayer({
                geocodingResponse: response
            }).addTo(mapState).on('geocoding_marker_clicked', (e) => {
                console.log(e)
            }));
            console.log('Geocoding, adding new layer', response)
        } else {
            geocodingLayer.setGeocodingResponse(response);
            console.log("Geocoding, reusing layer", response);
        }
    }

    const clearGeocodingLayer = () => {
        mapState.removeLayer(geocodingLayer)
        setGeocodingLayerDefined(false);
    }

    return (
        <div>
            <form onSubmit={(e)=>{submitCurrentLocation(e, currentLongitude, currentLatitude)}}>
                <label htmlFor="currentLongitude">Current Long</label>
                <input type="number" id="currentLongitude" value={currentLongitude} onChange={(e)=>{handleCurrentLongitudeChange(e)}} />
    
                <label htmlFor="currentLatitude">Current Lat</label>
                <input type="number" id="currentLatitude" value={currentLatitude} onChange={(e) => { handleCurrentLatitudeChange(e) }} />
    
                <button>Put Current Location Marker</button>
            </form>
            <button onClick={clearGeocodingLayer}>Clear Current Location Marker</button>
        </div>


    )
}