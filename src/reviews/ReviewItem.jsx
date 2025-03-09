import { useState } from "react";

function ReviewItem({ review, setReview }) {
  const token = localStorage.getItem("access_token");
  const userId = JSON.parse(localStorage.getItem("user"))?.id; // Get the logged-in user's ID

  function handleDelete() {
    if (!token) {
      alert("You must be logged in to delete a review.");
      return;
    }

    fetch(`https://moringa-hostels-backend-ebzd.onrender.com/reviews/${review.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized: You don't have permission to delete this review.");
        }
        return res.json();
      })
      .then(() => {
        setReview((prevReviews) => prevReviews.filter((r) => r.id !== review.id));
        alert("The review has been deleted successfully");
      })
      .catch((err) => console.error("Error deleting review:", err));
  }

  // Add 'user' or 'receiver' class based on review's user_id
  const reviewClass = review.user_id === userId ? "user" : "receiver";

  return (
    <div className={`review-container ${reviewClass}`}>
      <div className="review-header">
        <h2 className="review-username">User ID: {review.user_id}</h2>
      </div>

      <p className="review-content">{review.content}</p>

      <div className="review-footer">
        <h3 className="review-rating">⭐ Rating: {review.rating}</h3>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ReviewItem;