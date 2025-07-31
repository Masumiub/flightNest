import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import axiosSecureBooking from '../hooks/useAxiosBooking';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../hooks/useAxiosSecure';
import Loading from '../components/Loading';

const MyBookings = () => {

    const { user } = useAuth();
   // console.log('Logged in user ID:', user?.id);

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/user/${user.id}`);
            return res.data.data;
        },
        enabled: !!user?.id
    });

    const mybookings = bookings.filter((booking) => booking.userId === user?.id);
   // console.log('Filtered bookings:', mybookings);
    //688a0172ae673e7e2f92349d


    if (isLoading) return <Loading></Loading>;

    if (!bookings.length) {
        return <p className='my-40 text-center text-2xl'>You have no bookings yet.</p>;
    }

    return (
        <div className="mb-20 min-h-screen">
            <h2 className="text-5xl font-bold mb-4 text-center my-20">My Bookings</h2>
            <table className="w-full mt-20">
                <thead>
                    <tr className="bg-base-300">
                        <th className=" px-4 py-2">Airline</th>
                        <th className=" px-4 py-2">Flight Number</th>
                        <th className=" px-4 py-2">Destination</th>
                        <th className=" px-4 py-2">Date</th>
                        <th className=" px-4 py-2">Time</th>
                        <th className=" px-4 py-2">Seats Booked</th>
                        <th className=" px-4 py-2">Total Price</th>
                        <th className=" px-4 py-2">Booking Status</th>
                        <th className=" px-4 py-2">Payment Status</th>

                    </tr>
                </thead>
                <tbody>
                    {
                    mybookings.map(booking => (
                        <tr key={booking._id} className="text-center">
                            <td className=" px-4 py-2">{booking.flightId?.airline || 'N/A'}</td>
                            <td className=" px-4 py-2">{booking.flightId?.flight_number || 'N/A'}</td>
                            <td className=" px-4 py-2">{booking.flightId?.destination || 'N/A'}</td>
                            <td className=" px-4 py-2">
                                {booking.flightId?.date
                                    ? new Date(booking.flightId.date).toLocaleDateString()
                                    : 'N/A'}
                            </td>
                            <td className=" px-4 py-2">{booking.flightId?.time || 'N/A'}</td>
                            <td className=" px-4 py-2">
                                {booking.seatsBooked?.map(seat => seat.seatNumber).join(', ') || 'N/A'}
                            </td>
                            <td className=" px-4 py-2">${booking.totalPrice || 0}</td>
                            <td className=" px-4 py-2">{booking.bookingStatus || 'N/A'}</td>
                            <td className=" px-4 py-2">{booking.paymentStatus || 'N/A'}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyBookings;