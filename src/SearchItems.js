export default function SearchItems({searchInput, setSearchInput}) {
    
    const handleSearchInputChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    return (
        <form onSubmit={(e)=>{e.preventDefault()}}>
            <label htmlFor="searchInput">Search Query</label>
            <input type="text" id="searchInput" value={searchInput} onChange={(e) => { handleSearchInputChange(e) }} />
        </form>
    )
}