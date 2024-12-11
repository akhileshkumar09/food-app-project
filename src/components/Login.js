
import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

function Login() {
    const [form, setForm] = useState({email : '', password : ''})
    const [invalidLogin, setInvalidLogin] = useState(false)
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;


        setForm((prevData)=>({
          ...prevData,
          [name]:value
        }))
    }

    // const isRegistered = useSelector((state)=> state.auth.isAuthenticated)

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(loginUser(form));
        // if(isRegistered){
        //   setInvalidLogin(false)
        //   navigate('/user')
        // } else {
        //   setInvalidLogin(true);
        //   alert('Invalid email or password');
        // }
        
      };

  return (
    <div className=" w-50  flex  justify-center items-center h-screen " style={{}}>
     { !invalidLogin && (<form onSubmit={handleSubmit} className=" flex flex-col gap-6 mt-6 sm:w-72">
       <input name="email" value={form.email} onChange={handleChange} type="text" className="px-2 p-1 rounded" placeholder="Email" />
       <input name="password" value={form.password} onChange={handleChange} type="password" className="px-2 p-1 rounded" placeholder="Password" />
       <button type="sumbit" className="hover:opacity-70 transition-opacity duration-300 p-1 rounded text-white font-bold" style={{backgroundColor: "#076968"}}>Login</button>
      </form>)}

      {/* Show "Register" button only if login is invalid */}
      {invalidLogin && (
        <div>
        <p>Don't have account</p>
        <button className="btn btn-primary" onClick={() => navigate('/register')}>
          Register
        </button>
        </div>
      )}

    </div>
  );
}

export default Login;
