import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import FoodItem from './FoodItem';
import { CiSearch } from "react-icons/ci";

function MenuItems() {
    const [menuOpen, setMenuOpen] = useState(false)
  
    const handleMenuItemClick = () => {
      if (window.innerWidth < 1024) {
        setMenuOpen(false); // Close the menu on small screens
      }
    };


  return (
    <div> 
      {/* search bar */}
      <div className='w-full flex justify-end pr-4 relative z-1'>
        <input type='text' placeholder='Search a dish' className='p-1 text-xl rounded-xl sm:w-auto w-3/4'/>
        <CiSearch className='absolute text-xl md:text-2xl  top-2  right-6' />   
      </div>
    
      
    <div className='lg:hidden'>
      <button className='absolute top-2 left-2 '
       onClick={() => setMenuOpen(!menuOpen)}
       aria-label="Toggle Menu">
      <RxHamburgerMenu className='text-2xl ' />
      </button>
      </div>


      <div className={`grid  lg:pl-32 ${menuOpen ? "pl-32" : "pl-2"}`}>
             {/* Menu Items */}
             <div
          className={` lg:flex lg:flex-col lg:space-y-0  h-full lg:bg-blue-800 ${
            menuOpen ? "block" : "hidden"
          } absolute top-10 left-0 right-0 bg-blue-600 sm:w-48 w-full `}
          style={{backgroundColor: "#f0f1ec"}}
        >
          <ul className="flex flex-col lg:mt-16 text-center lg:text-left  mx-3 ">
            <li className='w-35 h-15 bg-white mt-2 rounded-xl'>
              <a
                href="#home"
                className="block py-4 px-6 hover:bg-yellow-400 rounded-xl "
                onClick={handleMenuItemClick}
              >
                ALL MENU
              </a>
            </li>
            <li className='w-35 h-15 bg-white mt-2 rounded-xl'>
              <a
                href="#about"
                className="block py-4 px-6 hover:bg-yellow-400 rounded-xl"
                onClick={handleMenuItemClick}
              >
                Main Course
              </a>
            </li>
            <li className='w-35 h-15 bg-white mt-2 rounded-xl'>
              <a
                href="#services"
                className="block py-4 px-6 hover:bg-yellow-400 rounded-xl"
                onClick={handleMenuItemClick}
              >
                Starter
              </a>
            </li>
            <li className='w-50 h-15 bg-white  mt-2 rounded-xl'>
              <a
                href="#contact"
                className="block py-4 px-6 hover:bg-yellow-400 rounded-xl"
                onClick={handleMenuItemClick}
              >
                Drink
              </a>
            </li>
          </ul>
        </div>

     

      {/* items container */}
      <div style={{backgroundColor: "#f0f1ec"}} className=' p-2 pb-24 m-auto lg:ml-26 lg:mr-20 w-full rounded-xl overflow-auto h-screen scrollbar-none bg-gray-200 grid justify-items-center  grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-2 '>
        <FoodItem/>
        <FoodItem/>
        <FoodItem/>
        <FoodItem/>
        <FoodItem/>
        <FoodItem/>
        <FoodItem/>
      </div>
      </div>

    </div>
  )
}

export default MenuItems