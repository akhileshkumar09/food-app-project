import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/userSlice';
import {useNavigate} from 'react-router-dom'

function Signup() {
    const [formData, setFormData] = useState({name:'', email:'', password:'', confirmPassword:'', img : null})
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { status } = useSelector((state) => state.user);


    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === 'img') {
        setFormData({ ...formData, img: files[0] });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
    
        if(formData.password !== formData.confirmPassword){
            alert('Password do not match');
            return;
        }
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        if (formData.img) {
          data.append('img', formData.img);
        }

        try {
          // Dispatch the thunk and wait for it to resolve
          await dispatch(signupUser(data)).unwrap();
          // Navigate to home page on successful signup
          navigate('/');
      } catch (error) {
          // Handle specific error: user already exists
          if (error.message === 'User already exists') {
              alert('User already exists. Redirecting to login page...');
              navigate('/login');
          } else {
              alert(error.message || 'Signup failed. Please try again.');
          }
      }
       
    }

  return (
    <div className=" w-50  flex  justify-center items-center h-screen">
         <form onSubmit={handleSubmit} className=" flex flex-col gap-4 mt-2 sm:w-72">
      <input type="text" name='name' value={formData.name} onChange={handleChange} className="px-2 p-1 rounded" placeholder="Name" required />
       <input type="text" name='email' value={formData.email} onChange={handleChange} className="px-2 p-1 rounded" placeholder="Email" required />
       <input type="password" name='password' value={formData.password} onChange={handleChange} className="px-2 p-1 rounded" placeholder="Password" required />
       <input type="password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} className="px-2 p-1 rounded" placeholder="Confirm Password" required />
       {/* <input type="file" 
        accept="image/*" 
        onChange={handleChange} 
        className="px-2 p-1 rounded"
      /> */}
       <button type="sumbit" className="hover:opacity-70 transition-opacity duration-300 p-1 rounded text-white font-bold" style={{backgroundColor: "#076968"}}  disabled={status === 'loading'}>
       {status === 'loading' ? 'Registering...' : 'Register'}
       </button>
      </form>
      {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
    </div>
  )
}

export default Signup