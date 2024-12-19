import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { placeOrder } from '../redux/orderSlice';
import { fetchUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';


function FoodItem({item}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [showPoppup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1)
  const [isHovered, setIsHovered] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: "", email : ""})
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const {status, error} = useSelector((state) => state.orders)
  const {user} = useSelector((state) => state.user)

    useEffect(() => {
    // Check if there's a token in localStorage
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      dispatch(fetchUser(savedToken)); // Dispatch action to fetch user info from the token
     
    }
  }, [dispatch]);

   useEffect(() => {
      if( user && (!currentUser || currentUser.email !== user.email)){
        setCurrentUser({name: user.name, email:user.email})
       
      }
    }, [user, currentUser]);

  const handleChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option); 
    setSelectedPrice(item.options[0][option.toLowerCase()]); 
    
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

  useEffect(()=>{
    
   
   if(item.category === 'Drink'){
    setSelectedOption('Regular')
     const option = "regular"  //selectedOption.toLowerCase()
    setSelectedPrice(item.options[0][option])
    
    
   } else{
    setSelectedOption('Half')
    const option = "half" //selectedOption.toLowerCase()
    setSelectedPrice(item.options[0][option])
   }
  //  console.log(item.options[0][option])
  },[item])

  
  const confirmOrder = async() => {
    setShowPopup(false)
     if(!currentUser.email){
      navigate('/login')
     }else{
       const order = {userName:currentUser.name, userEmail: currentUser.email, itemName: item.name, category: item.category, quantity: quantity, price:selectedPrice, option:selectedOption}
       
               try {
                 // Dispatch the thunk and wait for it to resolve
                 await dispatch(placeOrder(order));
                 // Navigate to home page on successful signup
                 
                
             } catch (error) {
                 // Handle specific error: user already exists
                 if (error.message === 'order failed') {
                     alert('sorry! order failed try again');
                     
                 } 
             }
             
     }
    
  }
 

  const slicedText = item.description.split(' ').slice(0,5).join(' ') + (item.description.split(' ').length > 5 ? '...' : '');
// 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600'
  return (<>
    {showPoppup && 
    <div className='fixed sm:w-72 w-full h-84 sm:h-min bottom-32 right-1 sm:right-32 md:right-72 lg:right-96 sm:m-4 top-10 bg-white rounded-xl p-1 px-4 z-20  shadow-lg'>
    <botton className="bg-green-700 text-white rounded px-2 cursor-pointer" onClick={()=>setShowPopup(!showPoppup)}>X</botton>
    <img className='w-full h-40 rounded-xl' src='https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600' alt='dish'/>
    <p className='text-sm'>{item.name}</p>
    <p className='text-xs text-gray-500'>{item.category}: {item.description}</p>
    <span className='flex justify-between'><p>{selectedOption}</p><p className='text-sm'>{quantity * selectedPrice}</p>
    <span className='flex  items-center gap-2'>
      <button className='bg-green-700 w-4 h-4 font-bold text-white rounded text-xl flex items-center justify-center' onClick={handleDecrease}>-</button><span>{quantity}</span><button onClick={handleIncrease} className='bg-green-700 w-4 h-4 font-bold text-white rounded text-xl flex items-center justify-center'>+</button>
    </span>
    </span>
    
    <button className='bg-green-700 text-white sm:ml-24 ml-28 rounded p-1 px-2 m sm:mt-1' onClick={confirmOrder}>Confirm</button>

    </div>}

    <div className='w-32 h-40 bg-white rounded-xl p-1 pl-2 ' >
   
    <img onClick={()=> setShowPopup(!showPoppup)} className='cursor-pointer w-28 h-18 rounded-xl' src='https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600' alt='dish ' />
    <p className='text-sm'>{item.name}</p>
    <div  className="relative w-full" onMouseEnter={() => setIsHovered(true)}  onMouseLeave={() => setIsHovered(false)}>
    <p className={`text-xs transition-all ${isHovered ? 'text-ellipsis overflow-visible text-black' : 'truncate text-gray-500'}`} title={isHovered ? item.category : ''}>{item.category}:   {isHovered ? item.description : slicedText}</p>
    </div>
    <span className='flex justify-between '><p className='text-sm'>{selectedPrice}</p>
    <select
        id="size-select"
        value={selectedOption}
        onChange={(e) => {handleChange(e)}}
        className="cursor-pointer bg-green-700 text-xs p-0 rounded-md   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >

    
      { item.category === 'Drink' ?
       (<> <option value="regular">Regular</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option> </>)
        :
         (<><option value="half">Half</option>
        <option value="full">Full</option></>)
      }

      </select> 
    </span>
    </div>
    </>)
}

export default FoodItem