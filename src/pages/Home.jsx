import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUserCircle } from "react-icons/fa";
import FoodItem from '../components/FoodItem';
import { CiSearch } from "react-icons/ci";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  console.log(menuOpen)
  const handleMenuItemClick = () => {
    if (window.innerWidth < 1024) {
      setMenuOpen(false); // Close the menu on small screens
    }
  };


  return (
    <div className='relative bg-yellow-400 h-screen  sm:px-10 p-2 w-full '>

     <div className='w-full relative min-h-full rounded-xl px-10 md:px-12 pt-2 overflow-hidden ' style={{backgroundColor: "#f0f1ec"}}>

     {/*menu bar  */}
     
      
      <div className='lg:hidden'>
      <button className='absolute top-2 left-2 '
       onClick={() => setMenuOpen(!menuOpen)}
       aria-label="Toggle Menu">
      <RxHamburgerMenu className='text-2xl ' />
      </button>
      </div>

 

      

      <span className='absolute top-2 right-1 '><FaRegUserCircle  className='sm:text-4xl text-3xl'/></span>

      {/* search bar */}
      <div className='w-full flex justify-end pr-4 relative z-10'>
        <input type='text' placeholder='Search a dish' className='p-1 text-xl rounded-xl sm:w-auto w-3/4'/>
        <CiSearch className='absolute text-xl md:text-2xl  top-2 sm:right-3 right-4' />   
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
                className="block py-4 px-6 hover:bg-blue-700 "
                onClick={handleMenuItemClick}
              >
                ALL MENU
              </a>
            </li>
            <li className='w-35 h-15 bg-white mt-2 rounded-xl'>
              <a
                href="#about"
                className="block py-4 px-6 hover:bg-blue-700"
                onClick={handleMenuItemClick}
              >
                Main Course
              </a>
            </li>
            <li className='w-35 h-15 bg-white mt-2 rounded-xl'>
              <a
                href="#services"
                className="block py-4 px-6 hover:bg-blue-700"
                onClick={handleMenuItemClick}
              >
                Starter
              </a>
            </li>
            <li className='w-50 h-15 bg-white  mt-2 rounded-xl'>
              <a
                href="#contact"
                className="block py-4 px-6 hover:bg-blue-700"
                onClick={handleMenuItemClick}
              >
                Drink
              </a>
            </li>
          </ul>
        </div>

     

      {/* items container */}
      <div style={{backgroundColor: "#f0f1ec"}} className=' p-2  m-auto lg:ml-26 lg:mr-20 w-full rounded-xl overflow-auto h-screen scrollbar-none bg-gray-200 grid justify-items-center  grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-2 '>
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
   
    
   
    </div>
  )
}

export default Home

// foodItems div classes grid justify-items-center gap-2 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2