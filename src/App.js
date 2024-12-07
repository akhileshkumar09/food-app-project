
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden  sm:px-20 " style={{backgroundColor:"#c9e9e4"}}>
      <Home/>
    
      <div className='relative '>
         <div className='absolute bottom-0 left-0  w-full h-10 overflow-hidden' style={{backgroundColor:"#076968"}}>
         </div>
      </div>
   
    </div>
  );
}

export default App;
