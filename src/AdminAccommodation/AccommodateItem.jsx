import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationPicker({ setLatitude, setLongitude }) {
  useMapEvents({
    click(e) {
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    },
  });
  return null;
}

function AccommodateItem({ name, image, id, description, latitude, longitude, setAccommodate, accommodate }) {
  const [update, setUpdate] = useState({
    name: "",
    image: "",
    description: "",
    latitude: latitude || "",
    longitude: longitude || ""
  });

  const [showMap, setShowMap] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetchedLocation, setFetchedLocation] = useState("Fetching location...");

  useEffect(() => {
    if (latitude && longitude) {
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        .then(res => res.json())
        .then(data => {
          if (data.address) {
            const { suburb, village, town, city, county, state } = data.address;
            const nearestLocation = suburb || village || town || city || "Unknown Location";
            const countyOrState = county || state || "Unknown County";
            setFetchedLocation(`${nearestLocation}, ${countyOrState}`);
          } else {
            setFetchedLocation("Unknown location");
          }
        })
        .catch(err => console.error("Error fetching location:", err));
    }
  }, [latitude, longitude]);

  function handleChange(e) {
    let { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "react_uploads"); 

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dvjkvk71s/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setUpdate((prev) => ({ ...prev, image: data.secure_url }));
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  }

  function handleUpdate(e) {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("You must be logged in to update accommodations.");
      return;
    }

    fetch(`https://moringa-hostels-backend-ebzd.onrender.com/accommodations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(update)
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error("Failed to update. Unauthorized or invalid request.");
        }
        return resp.json();
      })
      .then((updated) => {
        let updatedAccommodations = accommodate.map(accom =>
          accom.id === id ? { ...accom, ...updated } : accom
        );
        setAccommodate(updatedAccommodations);
        setUpdate({ name: "", image: "", description: "", latitude: "", longitude: "" });
        alert(`${updated.name} has been updated successfully!`);
      })
      .catch(err => console.error("Error updating accommodation:", err));
  }

  function handleDelete() {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("You must be logged in to delete accommodations.");
      return;
    }

    fetch(`https://moringa-hostels-backend-ebzd.onrender.com/accommodations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to delete. Unauthorized or invalid request.");
        }
        return res.json();
      })
      .then(() => {
        let remainder = accommodate.filter(accom => accom.id !== id);
        setAccommodate(remainder);
        alert(`${name} has been deleted successfully! 👋🏽`);
      })
      .catch(err => console.error("Error deleting accommodation:", err));
  }

  return (
    <div id="content">
      <h2 className="mini">Name</h2>
      <p className="cont"><strong>{name}</strong></p>
      <img className="cont" src={image} alt={name} />
      <h3 className="mini">Description</h3>
      <h2 className="cont"><strong>{description}</strong></h2>
      <h3 className="mini">Location</h3>
      <h2 className="cont"><strong>{fetchedLocation}</strong></h2>
      
      <form id="new" onSubmit={handleUpdate}>
        <input className="input" type="text" name="name" placeholder="Name" value={update.name} required onChange={handleChange} /><br />

        {/* Image Upload Input */}
        <input type="file" onChange={handleImageUpload} className="input" accept="image/*" required />
        {uploading && <p>Uploading...</p>}
        {update.image && <img src={update.image} alt="Uploaded Preview" className="w-32 h-32 mt-2" />}

        <input className="input" type="text" name="description" placeholder="Description" value={update.description} required onChange={handleChange} /><br />

        <input
          className="input"
          type="text"
          name="location"
          placeholder="Click to select location"
          readOnly
          value={update.latitude && update.longitude ? `Lat: ${update.latitude}, Lng: ${update.longitude}` : ""}
          onClick={() => setShowMap(!showMap)}
        />

        {showMap && (
          <MapContainer center={[-1.286389, 36.817223]} zoom={6} style={{ height: "300px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationPicker
              setLatitude={(lat) => setUpdate({ ...update, latitude: lat })}
              setLongitude={(lng) => setUpdate({ ...update, longitude: lng })}
            />
            {update.latitude && update.longitude && (
              <Marker position={[update.latitude, update.longitude]} />
            )}
          </MapContainer>
        )}

        <button className="update" type="submit">Update</button>
      </form>
      
      <button className="delete" onClick={handleDelete}>Delete</button><br />
      <Link to={`/roomAdmins`} state={{ accommodation_id: id }}>
        <button className="mini">View rooms</button>
      </Link>

    </div>
  );
}

export default AccommodateItem;
 