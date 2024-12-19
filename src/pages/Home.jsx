import React, { useEffect, useState } from 'react'

import MenuItems from '../components/MenuItems';
import {useNavigate} from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import OrderedItem from '../components/OrderedItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, logout } from '../redux/userSlice';
import { userOrders } from '../redux/orderSlice';



function Home() {
  const [isUser, setIsUser]= useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user, status} = useSelector((state) => state.user);
  const {orders} = useSelector((state) => state.orders)

  const handleClickOnUser = () => {
    setShowDetail(!showDetail)
  }

  const navigateToLogin = () => {
    navigate('/login')
  }


  useEffect(() => {
    // Check if there's a token in localStorage
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      dispatch(fetchUser(savedToken)); // Dispatch action to fetch user info from the token
     
    }
  }, [dispatch]);

  useEffect(() => {
    if(status === "succeeded" && user){
      setIsUser(true)
    } else{
      setIsUser(false)
    }
  }, [user, status, isUser]);

  useEffect(() => {
    if (user && user?.email) {
      dispatch(userOrders(user.email)).then(() => {
       
      });
    }
  }, [dispatch, user]);

  const handleLogout = () =>{
    dispatch(logout());
    setIsUser(false)
  }

  return (
    <div className='relative bg-yellow-400 h-screen  sm:px-10 p-2 w-full '>

     <div className='w-full relative min-h-full rounded-xl px-10 md:px-12 pt-2 overflow-hidden ' style={{backgroundColor: "#f0f1ec"}}>

       {/*menu bar  */}
            <div className={` ${showDetail ? "pr-28" : ""}`}>
          <MenuItems/>
          </div>
          
            {(!isUser) &&
            (
              <button onClick={navigateToLogin} className='absolute top-2 right-2  font-bold text-green-700 pointer'>Login</button>
            )}

            {/* user */}
            {  isUser && !showDetail &&   
            <span className='absolute top-2 right-1 ' onClick={handleClickOnUser}><FaRegUserCircle  className='sm:text-4xl text-3xl'/> </span>
            }
            {/* user Detail */}
            {showDetail &&
            <div className=' absolute top-0 right-0 bg-white w-full sm:w-40 h-full z-20 overflow-y-auto scrollbar-none' >
            
            <div className="space-y-1 p-2 pt-1 pb-24">
              <button className="block w-6 h-6 text-black" onClick={handleClickOnUser}>X</button>
              <span className="block w-8 h-8 bg-green-700 rounded-sm"></span>
              <p className='pb-4'>{user.name}</p>
              <button className='text-red-600' onClick={handleLogout}>Log out</button>
              <hr className='w-full'/>

              <p>Order Detail</p>

              { orders.map((item) => (
        <div key={item._id} >
        <OrderedItem item={item}/>
      </div>
      ))}
              
            </div>
            </div>
            }

            </div>
    </div>
  )
}

export default Home
