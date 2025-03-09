import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function AccommodationItem({ id, name, image, description, latitude, longitude, locationName }) { 
  const [fetchedLocation, setFetchedLocation] = useState(locationName || "Fetching location...")

  useEffect(() => {
    if (!locationName && latitude && longitude) {
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        .then(res => res.json())
        .then(data => {
          if (data.address) {
            const { suburb, village, town, city, county, state } = data.address
            const nearestLocation = suburb || village || town || city || "Unknown Location"
            const countyOrState = county || state || "Unknown County"

            setFetchedLocation(`${nearestLocation}, ${countyOrState}`)
          } else {
            setFetchedLocation("Unknown location")
          }
        })
        .catch(error => console.error("Error fetching location:", error))
    }
  }, [latitude, longitude, locationName])

  return (
    <div className="hostel-card">
      <img className="hostel-image" src={image} alt={name} />
      <div className="hostel-info">
        <h2 className="hostel-name">{name}</h2>
        <p className="hostel-description">{description}</p>
        <h3 className="hostel-location">Location: {fetchedLocation}</h3>
        <div className="hostel-buttons">
         
          <Link to={`/roomUsers/${id}`}>
            <button className="roomView-btn">View Rooms</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AccommodationItem
