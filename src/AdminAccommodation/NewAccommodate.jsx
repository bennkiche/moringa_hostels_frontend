import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./AdminForm.css"

function LocationPicker({ setLatitude, setLongitude }) {
    useMapEvents({
        click(e) {
            setLatitude(e.latlng.lat);
            setLongitude(e.latlng.lng);
        },
    });
    return null;
}

function NewAccommodate({ accommodate, setAccommodate }) {
    const [NewAccommodate, setNewAccommodate] = useState({
        name: "",
        image: "",
        description: "",
        latitude: "",
        longitude: "",
    });

    const [showMap, setShowMap] = useState(false);
    const [uploading, setUploading] = useState(false);

    function handleChange(e) {
        let { name, value } = e.target;
        setNewAccommodate({ ...NewAccommodate, [name]: value });
    }

    async function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "react_uploads"); // Set in Cloudinary settings

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dvjkvk71s/image/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setNewAccommodate((prev) => ({ ...prev, image: data.secure_url }));
        } catch (error) {
            console.error("Image upload failed:", error);
        } finally {
            setUploading(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("access_token");

        fetch("https://moringa-hostels-backend-ebzd.onrender.com/accommodations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(NewAccommodate),
        })
            .then((resp) => resp.json())
            .then((newAccommodation) => {
                setAccommodate([...accommodate, newAccommodation]);
                setNewAccommodate({ name: "", image: "", description: "", latitude: "", longitude: "" });
                alert(`${newAccommodation.name} created successfully!`);
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="admin-form-container">
            <h2 className="admin-form-title">Add New Accommodation</h2>
            <form id="new-accommodation" onSubmit={handleSubmit} className="admin-form">
                <input className="admin-input" type="text" name="name" placeholder="Accommodation Name" value={NewAccommodate.name} required onChange={handleChange} />

                <input type="file" onChange={handleImageUpload} className="admin-input" accept="image/*" required />
                {uploading && <p className="uploading-text">Uploading...</p>}
                {NewAccommodate.image && <img src={NewAccommodate.image} alt="Uploaded Preview" className="preview-image" />}

                <input className="admin-input" type="text" name="description" placeholder="Description" value={NewAccommodate.description} required onChange={handleChange} />

                <input
                    className="admin-input"
                    type="text"
                    name="location"
                    placeholder="Click to select location"
                    readOnly
                    value={NewAccommodate.latitude && NewAccommodate.longitude ? `Lat: ${NewAccommodate.latitude}, Lng: ${NewAccommodate.longitude}` : ""}
                    onClick={() => setShowMap(!showMap)}
                />

                {showMap && (
                    <MapContainer
                        center={[1.2921, 37.8219]}
                        zoom={6.5}
                        style={{ height: "300px", width: "100%" }}
                        maxBounds={[[4.62, 33.5], [-4.72, 41.9]]}
                        maxBoundsViscosity={1.0}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationPicker
                            setLatitude={(lat) => setNewAccommodate((prev) => ({ ...prev, latitude: lat }))}
                            setLongitude={(lng) => setNewAccommodate((prev) => ({ ...prev, longitude: lng }))}
                        />
                        {NewAccommodate.latitude && NewAccommodate.longitude && <Marker position={[NewAccommodate.latitude, NewAccommodate.longitude]} />}
                    </MapContainer>
                )}

                <button className="admin-submit-btn" type="submit">Add Accommodation</button>
            </form>
        </div>
    );
}

export default NewAccommodate
