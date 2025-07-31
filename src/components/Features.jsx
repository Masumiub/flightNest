import React from 'react';
import { FaPlaneDeparture, FaClock, FaShieldAlt } from 'react-icons/fa';


const Features = () => {
    const features = [
        {
            id: 1,
            icon: <FaPlaneDeparture className="text-lg text-blue-500 mb-3" />,
            title: 'Real-Time Flight Booking',
            description: 'Book your flight tickets instantly with real-time seat availability and schedule tracking.'
        },
        {
            id: 2,
            icon: <FaClock className="text-lg text-blue-500 mb-3" />,
            title: 'Seat Reservation Lock',
            description: 'Get a 2-minute window to review and confirm your booking with our seat hold system.'
        },
        {
            id: 3,
            icon: <FaShieldAlt className="text-lg text-blue-500 mb-3" />,
            title: 'Secure and Verified Access',
            description: 'All bookings are protected and accessible only through secure, authenticated routes.'
        },
    ];


    return (
        <section className="py-12 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map(({ id, icon, title, description }) => (
                    <div key={id} className="bg-base-100 shadow-md p-6 rounded-xl hover:shadow-lg transition-all">
                        {icon}
                        <h3 className="text-xl font-semibold mb-2">{title}</h3>
                        <p className="text-sm">{description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;