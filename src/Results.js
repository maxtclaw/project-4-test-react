import { useState } from "react"

export default function Results({ mapState, searchInput, currentLatitude, currentLongitude, destination, setDestination }) {
    
    // State to show all search results
    const [searchResultsArray, setSearchResultsArray] = useState([]);

    // Search radius controlled input
    const [searchRadius, setSearchRadius] = useState(10000)
    const handleSearchRadiusChange = (e) => {
        setSearchRadius(e.target.value);
    }

    // Triggers from button to make API call
    const getResults = (e) => {
        e.preventDefault()
        searchArea();
    }

    const searchArea = () => {
        let options = {
            circle: `${currentLongitude},${currentLatitude},${searchRadius}`,
            q: searchInput,
            sort: 'relevance'
        };
        
        window.L.mapquest.search().place(options, searchResultsCallback);
    }

    const [searchResultsLayer, setSearchResultsLayer] = useState({});
    const [searchResultsLayerDefined, setSearchResultsLayerDefined] = useState(false);
    const searchResultsCallback = (error, response) => {
        if (!searchResultsLayerDefined) {
            setSearchResultsLayerDefined(true);
            setSearchResultsLayer(window.L.mapquest.searchLayer({
                searchResponse: response
            }).addTo(mapState).on('search_marker_clicked', (e) => {
                console.log(e)
                setDestination(e)
            }));
            
            console.log('Results, adding new layer', response)
        } else {
            searchResultsLayer.setSearchResponse(response);
            console.log("Results, reusing layer", response);
        }
        
        setSearchResultsArray(response.results)
    }

    const clearSearchResultsLayer = () => {
        mapState.removeLayer(searchResultsLayer);
        setSearchResultsLayerDefined(false);
    }



    return (
        <div style={{ padding: '5px', border: '1px solid red' }}>
            <form onSubmit={(e) => {getResults(e)}}>
                <label htmlFor="searchRadius">Set search radius</label>
                <input type="number" id="searchRadius" value={searchRadius} onChange={(e) => { handleSearchRadiusChange(e) }} />
                <button>Get search results</button>
            </form>

            <button onClick={clearSearchResultsLayer}>Clear Search Results Markers</button>

            <h2>Click an item to select the destination</h2>
            <h3>{destination.displayString}</h3>
            <ol>
                {
                    searchResultsArray.map((searchResult) => {
                        return (
                            <li key={searchResult.id} onClick={() => {
                                console.log(searchResult)
                                setDestination(searchResult)
                            }} style={{border: '1px solid red'}}>
                                <p>{searchResult.name}</p>
                                <p>{searchResult.displayString}</p>
                            </li>
                        )
                    })
                }
            </ol>
        </div>
        
    )
}