import React, { useState } from 'react'

function FoodItem({name, imgage, description, options}) {
  const [selectedOption, setSelectedOption] = useState("regular");
  const [showPoppup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1)

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    
    console.log(`Selected: ${event.target.value}`);
  }

  const handleDecrease = () => {
    if(quantity > 1){
      setQuantity(quantity-1)
    }
  }

  const handleIncrease = () => {
    if(quantity <= 10){
      setQuantity(quantity+1)
    }
  }

  return (<>
    {showPoppup && 
    <div className='fixed sm:w-72 w-full h-72 m-8 sm:m-4 sm:h-72 bg-white rounded-xl p-1 px-4 z-20  shadow-lg'>
    <botton className="bg-green-700 text-white rounded px-2 cursor-pointer" onClick={()=>setShowPopup(!showPoppup)}>X</botton>
    <img className='w-full h-40 rounded-xl' src='https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600' alt='dish image'/>
    <p className='text-sm'>Name</p>
    <p className='text-xs text-gray-500'>Category: description...</p>
    <span className='flex justify-between'><p>option</p><p className='text-sm'>Price</p>
    <span className='flex  items-center gap-2'>
      <button className='bg-green-700 w-4 h-4 font-bold text-white rounded text-xl flex items-center justify-center' onClick={handleDecrease}>-</button><span>{quantity}</span><button onClick={handleIncrease} className='bg-green-700 w-4 h-4 font-bold text-white rounded text-xl flex items-center justify-center'>+</button>
    </span>
    </span>
    
    <button className='bg-green-700 text-white sm:ml-24 ml-28 rounded p-1 px-2 m sm:mt-1'>Confirm</button>

    </div>}

    <div className='w-32 h-40 bg-white rounded-xl p-1 pl-2 ' >
   
    <img onClick={()=> setShowPopup(!showPoppup)} className='cursor-pointer w-28 h-18 rounded-xl' src='https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600' alt='dish image'/>
    <p className='text-sm'>Name</p>
    <p className='text-xs text-gray-500'>Category: description...</p>
    <span className='flex justify-between'><p className='text-sm'>Price</p>
    <select
        id="size-select"
        value={selectedOption}
        onChange={handleChange}
        className="cursor-pointer bg-green-700 text-xs p-0 rounded-md   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="regular">Regular</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select> 
    </span>
    </div>
    </>)
}

export default FoodItem