import React from "react"
import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="overlay"></div>
      <div className="content">
        <h1>Moringa Hostels</h1>
        <p>Your comfort is our priority. Book a room today!</p>
        <div className="button-container">
          <Link to="/login">
            <button className="btn login-btn">Log In</button>
          </Link>
          <Link to="/signup">
            <button className="btn signup-btn">Sign Up</button>
          </Link>
          <Link to="/home">
            <button className="btn view-btn">View Homepage</button>
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy 2025 Moringa Hostel. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
