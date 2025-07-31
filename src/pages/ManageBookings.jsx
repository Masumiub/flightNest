import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axiosSecure from '../hooks/useAxiosSecure';
import { toast, Toaster } from 'react-hot-toast';


const ManageBookings = () => {
    const queryClient = useQueryClient();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    // Fetch all bookings
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings');
            return res.data.data;
        }
    });

    // Delete booking
    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this booking?');
        if (!confirm) return;

        try {
            await axiosSecure.delete(`/bookings/${id}`);
            toast.success('Booking deleted');
            queryClient.invalidateQueries(['bookings']);
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete booking');
        }
    };


    const updateMutation = useMutation({
        mutationFn: async ({ id, newSeatNumbers }) => {
            const res = await axiosSecure.patch(`/bookings/${id}`, { newSeatNumbers });
            return res.data;
        },
        onSuccess: () => {
            toast.success('Booking updated!');
            setSelectedBooking(null);
            queryClient.invalidateQueries(['bookings']);
        },
        onError: () => toast.error('Failed to update booking')
    });


    const onSubmit = (data) => {
        const newSeatNumbers = data.seats.split(',').map(seat => seat.trim());
        updateMutation.mutate({ id: selectedBooking._id, newSeatNumbers });
    };

    if (isLoading) return <p>Loading bookings...</p>;

    return (
        <div className="mb-20">


            <div className='my-20'>
                <h2 className="text-4xl font-bold mb-4 text-center">Manage Bookings</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full ">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Flight</th>
                            <th>User ID</th>
                            <th>Seats</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Booked On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, idx) => (
                            <tr key={booking._id} className="border-t">
                                <td>{idx + 1}</td>
                                <td>
                                    {booking.flightId?.airline} ({booking.flightId?.flight_number})<br />
                                    {booking.flightId?.origin} → {booking.flightId?.destination}
                                </td>
                                <td>{booking.userId}</td>
                                <td>{booking.seatsBooked.map(s => s.seatNumber).join(', ')}</td>
                                <td>${booking.totalPrice}</td>
                                <td>{booking.bookingStatus}</td>
                                <td>{booking.paymentStatus}</td>
                                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                <td className="space-x-2">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                        onClick={() => {
                                            setSelectedBooking(booking);
                                            reset({ seats: booking.seatsBooked.map(s => s.seatNumber).join(', ') });
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(booking._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-base-200 p-6 rounded-2xl shadow-2xl max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Edit Booking</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <label className="block">
                                New Seat Numbers (comma-separated):
                                <input
                                    {...register("seats")}
                                    className="input input-bordered w-full mt-1"
                                />
                            </label>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="bg-gray-400 text-white px-3 py-1 rounded"
                                    onClick={() => setSelectedBooking(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

};

export default ManageBookings;