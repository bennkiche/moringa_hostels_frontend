import React, { useEffect, useState } from "react"
import ReviewList from "./ReviewList"
import NewReview from "./NewReviews"

function MyReviews() {
    const [reviews, setReviews] = useState([])  
    const token = localStorage.getItem("access_token")

    useEffect(() => {
        if (!token) {
            console.error("No token found. User might not be logged in.")
            return
        }

        fetch("https://moringa-hostels-backend-ebzd.onrender.com/my-reviews", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            if (res.status === 401) { 
                console.error("Unauthorized! Token might be expired.")
                localStorage.removeItem("access_token") 
                return
            }
            if (!res.ok) {
                throw new Error("Failed to fetch reviews.")
            }
            return res.json()
        })
        .then((data) => {
            if (data) {
                console.log("Fetched user reviews:", data)
                setReviews(Array.isArray(data) ? data : [])
            }
        })
        .catch((err) => console.error("Error fetching user reviews:", err))
    }, [token])

    return (
        <>
            <div>
                <h1>My Reviews</h1>

                {token && <NewReview review={reviews} setReview={setReviews} token={token} />}

                <ReviewList reviews={reviews} setReviews={setReviews} />
            </div>
        </>
    )
}

export default MyReviews
