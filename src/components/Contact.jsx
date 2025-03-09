import React, { useState } from "react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: "",
    })
  }

  const validateForm = () => {
    let valid = true
    let newErrors = { name: "", email: "", message: "" }

    if (formData.name === "") {
      newErrors.name = "Please enter your name"
      valid = false
    }

    if (formData.message === "") {
      newErrors.message = "Please enter a message"
      valid = false
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      valid = false
    }
    setErrors(newErrors)
    return valid
    }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    alert("Message successfully sent")
  }

  return (
    <div className="contact">
      <div className="left">
        <h3 className="heading">Contact Us</h3>
        <p className="text">We are here for you! How can we help?</p>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <div className={`input-group ${errors.name ? "error" : ""}`}>
              <input
                type="text"
                name="name"
                className="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <span className="err-msg">{errors.name}</span>}
            </div>

            <div className={`input-group ${errors.email ? "error" : ""}`}>
              <input
                type="email"
                name="email"
                className="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="err-msg">{errors.email}</span>}
            </div>

            <div className={`input-group ${errors.message ? "error" : ""}`}>
              <textarea
                name="message"
                className="message"
                placeholder="Enter your message..."
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              {errors.message && <span className="err-msg">{errors.message}</span>}
            </div>
          </div>
          <div className="btnn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      <div className="right">
        <div className="illustration">
          <img
            src="https://media.istockphoto.com/id/1210502593/vector/female-customer-service-worker-helping-customers.jpg?s=612x612&w=0&k=20&c=x8ADZK_JAi1qZGHdXarNCFXHne4mAzrGtSG_at8fLzY="
            alt="Customer service illustration"
          />
        </div>

        <div className="contact-info">
          <div className="infoBox">
            <div className="icon">
              <i className="fas fa-location-dot" aria-label="Location"></i>
            </div>
            <div className="text">
              <p>Ngong Ln, Nairobi</p>
            </div>
          </div>
        </div>

        <div className="contact-info">
          <div className="infoBox">
            <div className="icon">
              <i className="fas fa-phone" aria-label="Phone"></i>
            </div>
            <div className="text">
              <a href="tel:+254711082146">+254711082146</a>
            </div>
          </div>
        </div>

        <div className="contact-info">
          <div className="infoBox">
            <div className="icon">
              <i className="fas fa-envelope" aria-label="Email"></i>
            </div>
            <div className="text">
              <a href="mailto:admissions@moringaschool.com">
                admissions@moringaschool.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
