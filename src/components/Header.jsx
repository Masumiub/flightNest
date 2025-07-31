import React from 'react';
import { NavLink } from 'react-router';
import headerBanner from '../assets/headerBanner1.png'

const Header = () => {
    return (
        <div>
            <div className='flex flex-col md:flex-row gap-10 pt-10 items-center justify-between'>
                <div className='w-full md:w-1/2'>
                    <h1 className='font-bold text-3xl md:text-5xl lg:text-6xl'>Book your Perfect Flight with Ease</h1>

                    <p className='mt-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non molestiae aliquid consequuntur, modi iure dolorum porro, expedita, nulla placeat doloremque nihil excepturi iste beatae sint.</p>
                    <NavLink to='/login' className='btn btn-primary rounded-full mt-8'>Join Now</NavLink>
                </div>

                <div className='w-full md:w-1/2'>
                    <img src={headerBanner} alt="headerBanner" className='w-full'/>
                </div>

            </div>
        </div>
    );
};

export default Header;