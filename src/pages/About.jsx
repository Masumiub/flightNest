import React from 'react'
import { FaSearch, FaMoneyCheckAlt, FaClipboardList, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'

const About = () => {
  return (
    <div className="mx-auto px-4 mb-20">
      {/* Header */}
      <h1 className="text-5xl font-bold text-center mb-6 mt-20">About US</h1>

      {/* Description */}
      <p className=" text-center max-w-3xl mx-auto mb-12 ">
        Our Flight Booking App is designed to make your air travel planning simple and seamless. Whether you're flying for work, vacation, or emergencies, we help you find the best options and book instantly with confidence.
      </p>

      {/* Features */}
      <h2 className="text-2xl font-semibold mb-4 mt-20">Key Features</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Feature 1 */}
        <div className=" shadow-md rounded-2xl p-6  text-center">
          <FaSearch className="text-4xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
          <p className="">
            Easily search flights based on destination, date, and airline preferences using our powerful engine.
          </p>
        </div>

        {/* Feature 2 */}
        <div className=" shadow-md rounded-2xl p-6  text-center">
          <FaClipboardList className="text-4xl text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Manage Bookings</h3>
          <p className="">
            View, edit, or cancel your bookings anytime. Stay informed with live flight updates and notifications.
          </p>
        </div>

        {/* Feature 3 */}
        <div className=" shadow-md rounded-2xl p-6  text-center">
          <FaMoneyCheckAlt className="text-4xl text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
          <p className="">
            Make hassle-free payments with our Stripe integration. Your data and transactions are fully protected.
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Email Card */}
        <div className=" shadow-md rounded-2xl p-6  text-center">
          <FaEnvelope className="text-4xl text-red-500 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-1">Email</h3>
          <p className=" mb-1">support@flightbookingapp.com</p>
          <p className=" text-sm">We're here to assist with any booking or travel inquiries you may have.</p>
        </div>

        {/* Phone Card */}
        <div className=" shadow-md rounded-2xl p-6  text-center">
          <FaPhoneAlt className="text-4xl text-green-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-1">Phone</h3>
          <p className=" mb-1">+880-1234-567890</p>
          <p className=" text-sm">Call us for urgent queries, 24/7 travel support, and ticketing help.</p>
        </div>

        {/* Address Card */}
        <div className=" shadow-md rounded-2xl p-6  text-center">
          <FaMapMarkerAlt className="text-4xl text-blue-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-1">Location</h3>
          <p className=" mb-1">Dhanmondi, Dhaka, Bangladesh</p>
          <p className=" text-sm">Visit our local office for group bookings or personalized travel plans.</p>
        </div>
      </div>
    </div>
  )
}

export default About
