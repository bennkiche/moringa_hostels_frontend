import ReviewItem from "./ReviewItem"

function ReviewList({ reviews, setReview }) {
    const token = localStorage.getItem("access_token")

    const handleDelete = (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return

        fetch(`https://moringa-hostels-backend-ebzd.onrender.com/${reviewId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            if (!res.ok) throw new Error("Failed to delete review")
            return res.json()
        })
        .then(() => {
            alert("Review deleted successfully!")
            setReview(reviews.filter((review) => review.id !== reviewId))
        })
        .catch((err) => {
            alert("Error deleting review. Please try again.")
            console.error("Error deleting review:", err)
        })
    }

    return (
        <div id="container">
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <ReviewItem 
                        key={review.id || `review-${index}`} 
                        review={review} 
                        setReview={setReview} 
                        onDelete={handleDelete} 
                    />
                ))
            ) : (
                <p>No reviews available.</p>
            )}
        </div>
    )
}

export default ReviewList
