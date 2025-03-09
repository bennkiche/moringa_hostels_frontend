import React, { useEffect, useState } from "react"
import "./accommodations.css"
import AccommodationList from "./AccommodationList"
import SearchBar from "../components/SearchBar"


function AccommodationDetails() { 
  const [accommodation, setAccommodation] = useState([])
  const [searchQuery, setSearchQuery] = useState("") 

  useEffect(() => {
    fetch("https://moringa-hostels-backend-ebzd.onrender.com/accommodations")
      .then(res => res.json())
      .then(data => {
        setAccommodation(Array.isArray(data) ? data : [])
      })
      .catch(err => console.log("Error fetching accommodations:", err))
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase())
  }

  const filteredAccommodations = accommodation.filter(a => 
    a.name.toLowerCase().includes(searchQuery)
  )

  return (
    <>
      <h1 className="mainH">Accommodations</h1>

      <SearchBar onSearch={handleSearch} />

      <AccommodationList accommodation={filteredAccommodations} setAccommodation={setAccommodation} />
    </>
  )
}

export default AccommodationDetails
