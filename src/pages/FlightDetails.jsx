import React from 'react';
import { IoMdTime } from 'react-icons/io';
import { IoAirplane } from 'react-icons/io5';
import { MdOutlineDateRange } from 'react-icons/md';
import { RiPriceTag3Line } from 'react-icons/ri';
import { NavLink, useLoaderData } from 'react-router';
import imgflight from '../assets/flight.jpg'
import Features from '../components/Features';


const FlightDetails = () => {
    const flight = useLoaderData();


    //console.log(flight.data.flight);

    const allSeats = flight.data.seats;
    const flightId = flight.data.flight._id;

    //console.log(allSeats)

    return (
        <div className='mb-20 h-[70vh]'>

            <div className='my-20'>
                <h1 className='text-5xl font-bold text-center'>Flight Details</h1>
            </div>

            <div className='flex flex-col md:flex-row gap-10 items-center'>

                <div className='w-full md:w-2/3'>
                    <h2 className="text-xl font-bold mb-1">{flight.data.flight.airline} - {flight.data.flight.flight_number}</h2>

                    <div className='flex gap-1 items-center mt-4'>
                        <IoAirplane />
                        <p><strong>From:</strong> {flight.data.flight.origin} - <strong>To:</strong> {flight.data.flight.destination}</p>
                    </div>

                    <hr className='mt-2 border-base-300' />

                    <div className='flex gap-1 items-center mt-2'>
                        <MdOutlineDateRange />
                        <p><strong>Date:</strong> {flight.data.flight.date}</p>
                    </div>

                    <div className='flex gap-1 items-center mt-2'>
                        <IoMdTime />
                        <p><strong>Time:</strong> {flight.data.flight.time}</p>
                    </div>

                    <hr className='mt-2 border-base-300' />

                    <div className='flex gap-1 items-center mt-2'>
                        <RiPriceTag3Line />
                        <p><strong>Price:</strong> ${flight.data.flight.price}</p>
                    </div>

                    <div className='mt-2'>
                        <p className='font-semibold'>Seats</p>
                        
                        {
                            allSeats.map((seat)=>
                                <li key={seat._id}>{seat.seatNumber} | {seat.isBooked === false ? 'Empty' : 'Booked'}</li>
                            )
                        }
                        
                    </div>
                </div>

                <div className='w-full md:w-1/3'>
                    <img src={imgflight} alt="imgflight" className='w-full rounded-2xl' />
                </div>

            </div>

            <div className='mt-10'>
                <NavLink className='btn btn-primary' to={`/booking/${flightId}`} state={{ flightId, allSeats }}>Book Flight</NavLink>
            </div>

            <Features></Features>
        </div>
    );
};

export default FlightDetails;