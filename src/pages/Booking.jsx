import React, { useEffect, useRef } from 'react';
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
    const [reservationStartTime, setReservationStartTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(120);
    const timerRef = useRef(null);



    // const handleSeatSelect = (seatId) => {
    //     setSelectedSeats((prev) =>
    //         prev.includes(seatId)
    //             ? prev.filter((id) => id !== seatId)
    //             : [...prev, seatId]
    //     )
    // }

    const handleSeatSelect = (seatId) => {
        const updated = selectedSeats.includes(seatId)
            ? selectedSeats.filter((id) => id !== seatId)
            : [...selectedSeats, seatId];

        setSelectedSeats(updated);


        if (!reservationStartTime && updated.length > 0) {
            const now = Date.now();
            setReservationStartTime(now);
            setTimeLeft(120);
        }


        if (updated.length === 0) {
            setReservationStartTime(null);
            setTimeLeft(120);
        }
    };


    useEffect(() => {
        if (!reservationStartTime) return;

        timerRef.current = setInterval(() => {
            const elapsed = Math.floor((Date.now() - reservationStartTime) / 1000);
            const remaining = 120 - elapsed;
            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(timerRef.current);
                setSelectedSeats([]);
                setReservationStartTime(null);
                toast.error("⛔ Time's up! Please reselect a seat.");
            }
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [reservationStartTime]);

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

        // console.log('Confirm booking request payload:', {
        //     flightId,
        //     seatIds: selectedSeats,
        // });

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
        <div className="p-4 h-screen">
            <h2 className="text-4xl font-semibold mb-4 text-center my-20">Select Your Seats</h2>

            <div className='w-full md:max-w-4xl mx-auto flex flex-col md:flex-row gap-10 bg-base-300 px-10 rounded-2xl shadow-2xl'>
                <div className='w-full md:w-1/2'>
                    <div className="grid grid-cols-4 gap-3 my-10 ">
                        {allSeats?.map((seat) => (
                            <button
                                key={seat._id}
                                disabled={seat.isBooked}
                                onClick={() => handleSeatSelect(seat._id)}
                                className={`p-3 rounded border ${seat.isBooked
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : selectedSeats.includes(seat._id)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-base-100 hover:bg-blue-100'
                                    }`}
                            >
                                {seat.seatNumber}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='w-full md:w-1/2'>
                    {reservationStartTime && (
                        <div className="text-center text-2xl font-semibold text-red-600 my-10  bg-base-200 py-4 rounded-2xl shadow">
                            ⏳ Time left to confirm: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                        </div>
                    )}
                </div>
            </div>


            <div className='text-center mt-10'>
                <button
                    onClick={handleBooking}
                    className="btn btn-primary"
                >
                    Book Seats
                </button>

                <button onClick={handleConfirmBooking} className="btn btn-success ml-4">
                    Pay & Confirm Booking
                </button>
            </div>

        </div>
    )
}


export default Booking;