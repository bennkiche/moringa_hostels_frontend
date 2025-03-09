import React, { useEffect, useState } from "react"
import "./reviews.css"
import ReviewList from "./ReviewList"

function Reviews() {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch("https://moringa-hostels-backend-ebzd.onrender.com/reviews") 
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch reviews")
                }
                return res.json()
            })
            .then((data) => {
                setReviews(Array.isArray(data) ? data : [])
            })
            .catch((err) => console.error("Error fetching reviews:", err))
    }, [])

    return (
        <>
            <div>
            <h1 className="reviewsH">All Reviews</h1>
                <ReviewList reviews={reviews} setReview={setReviews} />
            </div>
        </>
    )
}

export default Reviews
