
import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";


function Login() {
    const [form, setForm] = useState({email : '', password : ''})
    const [invalidLogin, setInvalidLogin] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;


        setForm((prevData)=>({
          ...prevData,
          [name]:value
        }))
    }

    // const { status, error } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(
          loginUser( form )
        );
    
        if (loginUser.fulfilled.match(resultAction)) {
          // Redirect to home on successful login
          navigate('/');
        } else {
          alert("Invalid credential")
          setInvalidLogin(!invalidLogin)
        }
        
      };

  return (
    <div className=" w-50  flex  justify-center items-center h-screen " style={{}}>
     { !invalidLogin && (<form onSubmit={handleSubmit} className=" flex flex-col gap-6 mt-6 sm:w-72">
       <input name="email" value={form.email} onChange={handleChange} type="text" className="px-2 p-1 rounded" placeholder="Email" required/>
       <input name="password" value={form.password} onChange={handleChange} type="password" className="px-2 p-1 rounded" placeholder="Password" required/>
       <button type="sumbit" className="hover:opacity-70 transition-opacity duration-300 p-1 rounded text-white font-bold" style={{backgroundColor: "#076968"}}>Login</button>
       <p>Don't have account</p>
        <button className="text-blue-500 flex " onClick={() => navigate('/signup')}>
          Register <GrLinkNext className="mt-1 ml-2" />
        </button>
      </form>)}

      {/* Show "Register" button only if login is invalid */}
      {invalidLogin && (
        <div>
        <p>Don't have account</p>
        <button className="text-blue-500 flex " onClick={() => navigate('/signup')}>
          Register <GrLinkNext className="mt-1 ml-2" />
        </button>
        </div>
      )}

    </div>
  );
}

export default Login;
