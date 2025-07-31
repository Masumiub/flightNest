import React from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axiosSecure from '../hooks/useAxiosSecure';
//import useAxiosSecure from '../hooks/useAxiosSecure'

const AddFlight = () => {
    const { register, handleSubmit, reset } = useForm()
    //const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        try {
            const formattedData = {
                airline: data.airline,
                flight_number: data.flight_number,
                origin: data.origin,
                destination: data.destination,
                date: data.date,
                time: data.time,
                price: parseFloat(data.price),
                seats: data.seats.split(',').map((s) => s.trim()),
            }

            const res = await axiosSecure.post('/flights', formattedData)
            toast.success('Flight added successfully!')
            reset()
        } catch (err) {
            console.error(err)
            toast.error(err.response?.data?.message || 'Failed to add flight')
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10 mb-20">
            <h2 className="text-2xl font-bold mb-4">Add New Flight</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register('airline')} placeholder="Airline" className="w-full input" required />
                <input {...register('flight_number')} placeholder="Flight Number" className="w-full input" required />
                <input {...register('origin')} placeholder="Origin" className="w-full input" required />
                <input {...register('destination')} placeholder="Destination" className="w-full input" required />
                <input type="date" {...register('date')} className="w-full input" required />
                <input type="time" {...register('time')} className="w-full input" required />
                <input type="number" {...register('price')} placeholder="Price" className="w-full input" required />
                <input {...register('seats')} placeholder="Seats (e.g. 1A,1B,1C)" className="w-full input" required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Flight</button>
            </form>
        </div>
    );
};

export default AddFlight;