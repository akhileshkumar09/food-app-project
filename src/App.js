
import './App.css';
import Login from './components/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="relative min-h-screen overflow-hidden  sm:px-20 " style={{backgroundColor:"#c9e9e4"}}>
    <Routes>
    <Route path='/' element = { <Home/>}/>
    <Route path='/login' element = { <Login/>}/>
    </Routes>
    
      <div className='relative '>
         <div className='absolute bottom-0 left-0  w-full h-10 overflow-hidden' style={{backgroundColor:"#076968"}}>
         </div>
      </div>
   
    </div>
    </Router>
  );
}

export default App;
