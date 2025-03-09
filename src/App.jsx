import AccommodationDetails from './UserAccommodation/AccommodationDetails'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Authentication from './authentications/Authentication'
import Accommodate from './AdminAccommodation/Accommodate'
import LandingPage from './components/LandingPage'
import SignupForm from './authentications/Signup'
import BookingList from "./bookings/BookingList"
import BookingForm from "./bookings/BookingForm"
import LoginForm from './authentications/Login'
import MyReviews from './reviews/MyReviews'
import RoomUser from './UserRooms/RoomUser'
import Contact from './components/Contact'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import Reviews from './reviews/Reviews'
import About from "./components/About"
import Home from "./components/Home" 
import Room from './AdminRoom/Room'
import Mpesa from './mpesa/Mpesa'
import "./index.css"
import './App.css'

function App() {
  return (
     <Router>
      <Navbar />
      <Routes>
        <Route path="/accommodationUsers" element={<AccommodationDetails />} />
        <Route path="/roomUsers/:accommodation_id" element={<RoomUser />} />
        <Route path='/accommodationAdmin' element={<Accommodate />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/Userbookings" element={<BookingList />} />
        <Route path="/book-room" element={<BookingForm />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path='/roomUsers' element={<RoomUser />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/roomAdmins' element={<Room />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/mpesa" element={<Mpesa />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  )
}


export default App;
