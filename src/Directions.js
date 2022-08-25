import { useState } from "react"

export default function Directions({ mapState, currentLatitude, currentLongitude, destination }) {
    
    // State to show the movement directions
    // const [routeObject, setRouteObject] = useState({})
    const [routeArray, setRouteArray] = useState([])

    const getDirections = () => {
        window.L.mapquest.directions().route({
            start: `${currentLatitude},${currentLongitude}`,
            end: destination.displayString
        }, getDirectionsCallback)
    }
    
    const [directionsLayer, setDirectionsLayer] = useState({})
    const [directionsLayerDefined, setDirectionsLayerDefined] = useState(false);

    const getDirectionsCallback = (error, response) => {
        if (!directionsLayerDefined) {
            setDirectionsLayerDefined(true);
            setDirectionsLayer(window.L.mapquest.directionsLayer({
                directionsResponse: response
            }).addTo(mapState));
            console.log('Directions, adding new layer', response)
        } else {
            directionsLayer.setDirectionsResponse(response);
            console.log("Directions, reusing layer", response);
        }

        // setRouteObject(response);
        setRouteArray(response.route.legs[0].maneuvers)
    }

    const clearDirectionsLayer = () => {
        mapState.removeLayer(directionsLayer);
        setDirectionsLayerDefined(false);
    }

    return (
        <div style={{ padding: '5px', border: '1px solid blue' }}>
            <button onClick={getDirections}>Get My Directions</button>
            <button onClick={() => { clearDirectionsLayer() }}>Clear Directions Layer</button>

            <h2>Directions to {destination.name}</h2>
            <h3>{destination.displayString}</h3>
            <p>Remember to click the Get My Directions button when you select a new destination</p>
            <ol>
                {
                    routeArray.map((leg, index) => {
                        return (
                            <li key={`route-leg-${index}`} style={{ border: '1px solid blue' }}>
                                <p>{leg.narrative}</p>
                                <p>{leg.distance} km</p>
                            </li>
                        )
                    })
                }
            </ol>
        </div>
    )
}