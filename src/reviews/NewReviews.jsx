import { useState } from "react"

function NewReview({ review, setReview, token, userId }) {
    const [newReview, setNewReview] = useState({
        rating: 0,
        content: ""
    })

        function handleChange(e) {
            const { name, value } = e.target
        
            setNewReview({
                ...newReview,
                [name]: name === "rating" 
                    ? Math.min(5, Math.max(1, parseInt(value) || 1))
                    : value
            })
        }

    function handleSubmit(e) {
        e.preventDefault()

        if (!token) {
            alert("You must be logged in to add a review!")
            return
        }

        fetch("https://moringa-hostels-backend-ebzd.onrender.com/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: userId,
                ...newReview
            })
        })
        .then(resp => {
            if (!resp.ok) throw new Error("Unauthorized - Invalid token")
            return resp.json()
        })
        .then(newReviewData => {
            setReview([...review, newReviewData])
            setNewReview({ rating: 0, content: "" }) 
            alert("Review added successfully!")
        })
        .catch(error => console.error("Error:", error))
    }

    return (
        <div className="new-review">
            <form id="new" onSubmit={handleSubmit}>
                <h1 classname="reviewH">New Reviews</h1>
                <div className="form-group">
                    <label className="form-label">Rating:</label><br />
                    <input
                        className="form-input"
                        type="number"
                        name="rating"
                        placeholder="1-5"
                        value={newReview.rating}
                        min="1"
                        max="5"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Review:</label><br />
                    <textarea
                        className="form-textarea"
                        name="content"
                        placeholder="Write your review here..."
                        value={newReview.content}
                        required
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="submit-button">Add Review</button>
            </form>

        </div>
    )
}

export default NewReview
