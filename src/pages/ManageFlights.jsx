import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axiosSecure from '../hooks/useAxiosSecure'
import { Toaster, toast } from 'react-hot-toast';

const ManageFlights = () => {

    const queryClient = useQueryClient();
    const [selectedFlight, setSelectedFlight] = useState(null);
    const { register, handleSubmit, reset } = useForm();


    const { data: flights = [], isLoading, } = useQuery({
        queryKey: ['flights'],
        queryFn: async () => {
            const res = await axiosSecure.get('/flights');
            return res.data.data.flights;
        }
    });

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this flight?');
        if (!confirmDelete) return;

        try {
           // console.log('Deleting flight:', id);

            const res = await axiosSecure.delete(`/flights/${id}`);
            //console.log('Deleted:', res.data);

            if (res.status === 200 || res.status === 204) {
                queryClient.invalidateQueries(['flights']);
                toast.success('Flight deleted successfully');
            } else {
                toast.error('Failed to delete');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
            console.error('Delete error:', err.response?.data || err.message);
        }
    };

    // Update flight mutation
    const updateFlightMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => {
            const res = await axiosSecure.put(`/flights/${id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Flight updated!');
            setSelectedFlight(null);
            queryClient.invalidateQueries(['flights']);
        }
    });

    const onSubmit = (data) => {
        updateFlightMutation.mutate({ id: selectedFlight._id, updatedData: data });
    };

    if (isLoading) return <p>Loading flights...</p>;

    return (
        <div className='mb-20'>

            <div className='my-20'>
                <h2 className="text-4xl font-bold mb-4 text-center">Manage Flights</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th>#</th>
                            <th>Airline</th>
                            <th>Flight No.</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight, index) => (
                            <tr key={flight._id} className="border-t">
                                <td>{index + 1}</td>
                                <td>{flight.airline}</td>
                                <td>{flight.flight_number}</td>
                                <td>{flight.origin}</td>
                                <td>{flight.destination}</td>
                                <td>{flight.date}</td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => {
                                            setSelectedFlight(flight);
                                            reset(flight); // pre-fill form
                                        }}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(flight._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {selectedFlight && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-2xl shadow-2xl max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Edit Flight</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                            <input {...register("airline")} className="input input-bordered w-full" placeholder="Airline" />
                            <input {...register("flight_number")} className="input input-bordered w-full" placeholder="Flight Number" />
                            <input {...register("origin")} className="input input-bordered w-full" placeholder="Origin" />
                            <input {...register("destination")} className="input input-bordered w-full" placeholder="Destination" />
                            <input {...register("date")} type="date" className="input input-bordered w-full" />
                            <input {...register("time")} className="input input-bordered w-full" placeholder="Time" />
                            <input {...register("price")} type="number" className="input input-bordered w-full" placeholder="Price" />

                            <div className="flex justify-end gap-2 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedFlight(null)}
                                    className="px-3 py-1 bg-gray-400 text-white rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 py-1 bg-green-600 text-white rounded"
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

export default ManageFlights;