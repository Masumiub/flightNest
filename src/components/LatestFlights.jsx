import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IoAirplane } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { RiPriceTag3Line } from "react-icons/ri";
import imgflight from '../assets/flight.jpg'
import { NavLink } from 'react-router';
import Loading from './Loading';


const fetchFlights = async (filters) => {
    const res = await axios.get('https://flight-server-six.vercel.app/api/flights/search', {
        params: filters,
    })
    return res.data.data.flights
}


const LatestFlights = () => {
    const [filters, setFilters] = useState({
        origin: '',
        destination: '',
        date: '',
        minPrice: '',
        maxPrice: '',
        airline: '',
        flight_number: '',
    })

    const { data: flights = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['flights', filters],
        queryFn: () => fetchFlights(filters),
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSearch = (e) => {
        e.preventDefault()
        refetch()
    }

    if (isLoading) return <Loading></Loading>
    if (isError) return <p className="text-center mt-10 text-red-500">Failed to load flights!</p>

    return (
        <div className='mb-20'>
            <div className='my-20'>
                <h1 className='text-5xl font-bold text-center'>Latest Flights</h1>
            </div>

            <div className='my-10 bg-base-200 shadow-2xl  mx-auto rounded-2xl'>
                <h1 className='text-xl font-semibold text-center'>Search Flights</h1>
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 ">
                    <input type="text" name="origin" placeholder="Origin" className="input input-bordered w-full" onChange={handleChange} />
                    <input type="text" name="destination" placeholder="Destination" className="input input-bordered w-full" onChange={handleChange} />
                    <input type="date" name="date" className="input input-bordered w-full" onChange={handleChange} />
                    <input type="text" name="airline" placeholder="Airline" className="input input-bordered w-full" onChange={handleChange} />
                    <input type="number" name="minPrice" placeholder="Min Price" className="input input-bordered w-full" onChange={handleChange} />
                    <input type="number" name="maxPrice" placeholder="Max Price" className="input input-bordered w-full" onChange={handleChange} />
                    <input type="text" name="flight_number" placeholder="Flight Number" className="input input-bordered w-full" onChange={handleChange} />
                    <button type="submit" className="btn btn-primary col-span-full">Search</button>
                </form>
            </div>


            <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {flights.slice(0,6).map(flight => (
                    <div key={flight._id} className="border-base-300 rounded-xl p-4 shadow hover:shadow-lg transition">

                        <img src={imgflight} alt="imgflight" className='w-full rounded-2xl' />

                        <h2 className="text-xl font-bold mb-1">{flight.airline} - {flight.flight_number}</h2>

                        <div className='flex gap-1 items-center mt-4'>
                            <IoAirplane />
                            <p><strong>From:</strong> {flight.origin} - <strong>To:</strong> {flight.destination}</p>
                        </div>

                        <hr className='mt-2 border-base-300' />

                        <div className='flex gap-1 items-center mt-2'>
                            <MdOutlineDateRange />
                            <p><strong>Date:</strong> {flight.date}</p>
                        </div>

                        <div className='flex gap-1 items-center mt-2'>
                            <IoMdTime />
                            <p><strong>Time:</strong> {flight.time}</p>
                        </div>

                        <hr className='mt-2 border-base-300' />

                        <div className='flex gap-1 items-center mt-2'>
                            <RiPriceTag3Line />
                            <p><strong>Price:</strong> ${flight.price}</p>
                        </div>

                        <div className='my-5'>
                            <NavLink to={`/flightDetails/${flight._id}`} className='btn btn-primary'>View Details</NavLink>
                        </div>

                    </div>
                ))}
            </div>

            <div className='text-center'>
                <NavLink to='/flights' className='btn btn-primary mt-6 btn-lg'>Show All</NavLink>
            </div>
        </div>
    );
};

export default LatestFlights;