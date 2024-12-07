import React, { useState } from 'react'
import MenuItems from '../components/MenuItems';

import { FaRegUserCircle } from "react-icons/fa";



function Home() {
  const [user, setUser]= useState(true);
  const [showDetail, setShowDetail] = useState(false);

  const handleClickOnUser = () => {
    setShowDetail(!showDetail)
  }



  return (
    <div className='relative bg-yellow-400 h-screen  sm:px-10 p-2 w-full '>

     <div className='w-full relative min-h-full rounded-xl px-10 md:px-12 pt-2 overflow-hidden ' style={{backgroundColor: "#f0f1ec"}}>

    

    

     

       {/*menu bar  */}
      <div className={` ${showDetail ? "pr-28" : ""}`}>
     <MenuItems/>
     </div>
     

       {/* user */}
       {  (user && !showDetail) &&    
      <span className='absolute top-2 right-1 ' onClick={handleClickOnUser}><FaRegUserCircle  className='sm:text-4xl text-3xl'/></span>
      }
      {/* user Detail */}
      {showDetail &&
      <div className=' absolute top-0 right-0 bg-white w-full sm:w-40 h-full z-0 overflow-y-auto' onClick={handleClickOnUser}>
     
      </div>
      }

      </div>

     
   
    
   
    </div>
  )
}

export default Home

// foodItems div classes grid justify-items-center gap-2 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2