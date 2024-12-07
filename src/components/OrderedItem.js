import React from 'react'
import { MdDelete } from "react-icons/md";

function OrderedItem() {
  return (
    <div className='flex flex-col border-b-2 py-2'>
    <span className='flex gap-14  '><p>name</p><span className='flex items-center gap-4'><p>Q</p><MdDelete className=' '/></span></span>
    <span className='text-sm text-gray-500'>category: description...</span>
    <span className='flex justify-between'> <span className='text-green-700'>option</span><span>price</span></span>
  </div>
  )
}

export default OrderedItem