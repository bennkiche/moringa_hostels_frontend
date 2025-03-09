import React from "react"
function SearchBar({onSearch}){
    function handleChange(e){
       onSearch(e.target.value)
    }
    return(
        <div className="search">
            <h2>What accommodation are you looking for ?</h2>
             <label className="searchL" htmlFor="search" >Search: </label>
                <input id="search" 
                type="text" 
                placeholder="Search..." 
                onChange={handleChange}
                />
        </div>
    )
}

export default SearchBar
