import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router';
import logo from '../assets/logo.png';

const Navbar = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/login') // redirect to login page after logout
    }

    //console.log(user.role)
    return (
        <div>
            <div className="navbar bg-base-100 shadow-2xl rounded-2xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/about'>About</NavLink></li>
                            <li><NavLink to='/flights'>Flights</NavLink></li>
                            <li><NavLink to='/my-bookings'>My Booking</NavLink></li>
                            {
                                user &&  user.role == 'ADMIN' && (
                                    <>
                                        <li><NavLink to='/addFlight'>AddFlight</NavLink></li>
                                        <li><NavLink to='/manageFlights'> Manage Flights</NavLink></li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                    <img src={logo} alt="logo" className='w-12'/>
                    <a className="font-semibold text-2xl ml-2">flightNest</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                        <li><NavLink to='/flights'>Flights</NavLink></li>
                        <li><NavLink to='/my-bookings'>My Booking</NavLink></li>
                        {
                            user && user.role == 'ADMIN' && (
                                <>
                                    <li><NavLink to='/addFlight'>AddFlight</NavLink></li>
                                    <li><NavLink to='/manageFlights'> Manage Flights</NavLink></li>
                                    <li><NavLink to='/manageBookings'>Manage Bookings</NavLink></li>
                                </>
                            )
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <>
                            <span className="mr-4">Hello, {user.name || user.email}</span>
                            <button onClick={handleLogout} className="btn btn-outline btn-error">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className="btn btn-primary mr-2"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="btn btn-secondary"
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;