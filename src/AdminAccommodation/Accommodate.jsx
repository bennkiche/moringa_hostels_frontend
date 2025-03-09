import React, { useEffect, useState } from "react";
import "../App.css";
import NewAccommodate from "./NewAccommodate";
import AccommodateList from "./AccommodateList";

function Accommodate() { 
    const [accommodate, setAccommodate] = useState([]);
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!token) {
            console.error("No token found. User might not be logged in.");
            return;
        }

        fetch("https://moringa-hostels-backend-ebzd.onrender.com/accommodations", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Unauthorized or failed to fetch accommodations");
            }
            return res.json();
        })
        .then((data) => {
            setAccommodate(Array.isArray(data) ? data.map(acc => ({
                ...acc,
                latitude: acc.latitude || "",  
                longitude: acc.longitude || ""
            })) : []);
        })
        .catch((err) => console.error("Error fetching accommodations:", err));
    }, [token]);

    return (
        <>
            <h1 className="mainH">Accommodations</h1>
            <NewAccommodate accommodate={accommodate} setAccommodate={setAccommodate} />
            <AccommodateList accommodate={accommodate} setAccommodate={setAccommodate} />
        </>
    );
}

export default Accommodate;
