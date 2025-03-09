import React from "react"
import Footer from "./Footer"
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Moringa Hostels</h1>
        <p className="hero-subtitle">Your home away from home.</p>
      </div>

      {/* Information Section */}
      <div className="info-section">
        <h2 className="info-title">Why Choose Us?</h2>
        <p className="info-text">
          Moringa Hostel provides a comfortable and convenient living space for
          students and professionals. Enjoy top-notch facilities, a great
          community, and a safe environment.
        </p>
      </div>

      {/* Image Cards Section */}
      <div className="cards-section">
        {/* Card 1 */}
        <div className="card">
          <img
            src="src/assets/images/Spacious rooms.avif"
            alt="Hostel Room"
            className="card-image"
          />
          <div className="card-content">
            <h3 className="card-title">Spacious Rooms</h3>
            <p className="card-text">
              Enjoy comfortable, well-furnished rooms with modern amenities.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card">
          <img
            src="src/assets/images/Common area.webp"
            alt="Common Area"
            className="card-image"
          />
          <div className="card-content">
            <h3 className="card-title">Relaxing Common Areas</h3>
            <p className="card-text">
              Connect with fellow residents in our cozy and stylish lounges.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card">
          <img
            src="src/assets/images/Dinning images.jpg"
            alt="Dining Area"
            className="card-image"
          />
          <div className="card-content">
            <h3 className="card-title">Quality Dining</h3>
            <p className="card-text">
              Enjoy delicious and nutritious meals prepared with care.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
