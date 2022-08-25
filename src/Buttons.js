import { useState } from "react";

export default function Buttons({map}) {



    // window.L.mapquest.key = 'SbABP9Vr89Ox8a38s29QPLUQm51xa784'
    function directionsCallback(error, response) {

        var directionsLayer = window.L.mapquest.directionsLayer({
            directionsResponse: response
        }).addTo(map);

        console.log(response)
    }


    const [selectedLocation, setSelectedLocation] = useState('')
    const getCurrentLocation = function () {
        window.L.mapquest.geocoding().geocode('43.6532,-79.3832'); // moves the map onto the location
    }


    const getDirections = function () {
        var directions = window.L.mapquest.directions();
        directions.route({
            start: '43.6532,-79.3832',
            end: selectedLocation // the desgination for the searching
        }, directionsCallback);
    }



    const searchArea = function () {
        var options = {
            circle: '-79.3832,43.6532,500',
            q: 'coffee',
            sort: 'relevance'
        };

        window.L.mapquest.search().place(options, searchCallback);
    }

    const [results, setResults] = useState([])
    function searchCallback(error, result) {
        console.log(result);
        setResults(result.results)
    }


    return (
        <div>
            <button onClick={() => { getCurrentLocation() }}>
                get current
            </button>

            <button onClick={()=>{getDirections()}}>
                get direcitons
            </button>

            <button onClick={() => { searchArea() }}>
                search loc
            </button>

            <p>
                currently selected:
                <span className="selectedLocation"></span>
            </p>

            <ul>
                {
                    results.map((result, index) => {
                        return (
                            <li key={index} onClick={() => {
                                console.log(result.displayString)
                                setSelectedLocation(result.displayString)
                            }}>
                                {result.displayString}
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    )
}