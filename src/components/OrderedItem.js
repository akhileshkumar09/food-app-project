import React from 'react'
import { MdDelete } from "react-icons/md";
import { deleteOrder } from '../redux/orderSlice';
import { useDispatch } from 'react-redux';

function OrderedItem({item}) {
 const dispatch = useDispatch()

  const handleDeleteOrder = (id) =>{
      dispatch(deleteOrder(id))
  }

  return (
    <div className='flex flex-col border-b-2 py-2'>
    <span className='flex justify-between'><span>{item.itemName}</span><span className='flex items-center gap-4'><p>{item.quantity}</p><MdDelete className='text-red-600 ' onClick={()=>handleDeleteOrder(item._id)}/></span></span>
    <span className='text-sm text-gray-500'>{item.category}: {item.description}</span>
    <span className='flex justify-between'> <span className='text-black' style={{color:"#076968"}}>{item.option}</span><span>{item.price}</span></span>
  </div>
  )
}

export default OrderedItem