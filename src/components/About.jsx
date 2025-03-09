import React from "react"
import { Link } from "react-router-dom"
import Footer from "./Footer"

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center py-16 px-6">
   
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
 
        <div className="w-full h-96 lg:h-full">
          <img
            src="src/assets/images/New Moringa.webp"
            alt="Moringa Hostels"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400">
            About Moringa Hostels
          </h1>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Welcome to <strong className="text-white">Moringa Hostels</strong>, a place where <span className="text-blue-300">comfort meets convenience</span>.
            Our hostel is designed to provide students and professionals with a secure, 
            affordable, and vibrant living environment.
          </p>
          <p className="text-gray-400 mb-6">
            Experience a home away from home with top-tier facilities, fast Wi-Fi, and a welcoming community.
          </p>
          
          <Link
            to="/contacts"
            className="bg-blue-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      <div className="mt-16 w-full">
        <Footer />
      </div>
    </div>
  )
}

export default About