import React from 'react';
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth';
import axiosSecureBooking from '../hooks/useAxiosBooking';

import { useLocation, useNavigate } from 'react-router';



const Booking = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { flightId, allSeats } = location.state || {}

    const [selectedSeats, setSelectedSeats] = useState([])

    const handleSeatSelect = (seatId) => {
        setSelectedSeats((prev) =>
            prev.includes(seatId)
                ? prev.filter((id) => id !== seatId)
                : [...prev, seatId]
        )
    }

    const handleBooking = async () => {
        if (!selectedSeats.length) {
            toast.error('Please select at least one seat.');
            return;
        }

        try {
            const res = await axiosSecureBooking.post('/api/bookings', {
                flightId,
                seatIds: selectedSeats,
            });

            if (res.data?.ok) {
                toast.success(res.data.data?.message || 'Seats booked!');

            } else {
                toast.error(res.data?.message || 'Booking failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('Booking error. Try again.');
        }
    };


    const handleConfirmBooking = async () => {
        if (!selectedSeats.length) {
            toast.error('Please select at least one seat to confirm.');
            return;
        }

        const seatNumbers = selectedSeats
            .map(seatId => {
                const seat = allSeats.find(s => s._id === seatId);
                return seat ? seat.seatNumber : null;
            })
            .filter(Boolean);

        if (!flightId || !seatNumbers.length) {
            toast.error('Invalid flight or seat data for confirmation.');
            return;
        }

        console.log('Confirm booking request payload:', {
            flightId,
            seatIds: selectedSeats,
        });

        try {
            const res = await axiosSecureBooking.post('/api/bookings/confirm', {
                flightId,
                seatIds: selectedSeats,
            });

            if (res.data?.ok) {
                toast.success(res.data.data?.message || 'Booking confirmed successfully.');
                navigate('/my-bookings')
            } else {
                toast.error(res.data?.message || 'Booking confirmation failed.');
            }
        } catch (err) {
            console.error('Confirm booking error:', err);
            toast.error('Booking confirmation error. Try again.');
        }
    };


    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Select Your Seats</h2>

            <div className="grid grid-cols-4 gap-3 mb-6">
                {allSeats?.map((seat) => (
                    <button
                        key={seat._id}
                        disabled={seat.isBooked}
                        onClick={() => handleSeatSelect(seat._id)}
                        className={`p-3 rounded border ${seat.isBooked
                            ? 'bg-gray-300 cursor-not-allowed'
                            : selectedSeats.includes(seat._id)
                                ? 'bg-green-500 text-white'
                                : 'bg-white hover:bg-blue-100'
                            }`}
                    >
                        {seat.seatNumber}
                    </button>
                ))}
            </div>

            <button
                onClick={handleBooking}
                className="btn btn-primary"
            >
                Book Seats
            </button>

            <button onClick={handleConfirmBooking} className="btn btn-success ml-4">
                Confirm Booking
            </button>
        </div>
    )
}


export default Booking;