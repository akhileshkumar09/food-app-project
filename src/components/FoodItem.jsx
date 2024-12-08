import React, { useState } from 'react'

function FoodItem({name, imgage, description, options}) {
  const [selectedOption, setSelectedOption] = useState("regular");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(`Selected: ${event.target.value}`);
  }

  return (
    <div className='w-32 h-40 bg-white rounded-xl p-1 pl-2 '>
   
    <img className='w-28 h-18 rounded-xl' src='https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600' alt='dish image'/>
    <p className='text-sm'>Name</p>
    <p className='text-xs text-gray-500'>Category: description...</p>
    <span className='flex justify-between'><p className='text-sm'>Price</p>
    <select
        id="size-select"
        value={selectedOption}
        onChange={handleChange}
        className=" bg-green-700 text-xs p-0 rounded-md   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="regular">Regular</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select> 
    </span>
    </div>
  )
}

export default FoodItem