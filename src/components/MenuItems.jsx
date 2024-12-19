
import React, { useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector, useDispatch } from 'react-redux';
import FoodItem from './FoodItem';
import { CiSearch } from "react-icons/ci";
import { fetchItems } from '../redux/foodItemsSlice';

function MenuItems() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all'); // State to track active category
  // const [showCloseButton, setShowCloseButton] = useState(false)

  const dispatch = useDispatch();
  const { drinks, starters, mains, status } = useSelector((state) => state.items);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems()); // Dispatch the async thunk
    }
  }, [dispatch,status]);

  const handleMenuItemClick = (category) => {
    setActiveCategory(category); // Update active category
    if (window.innerWidth < 1024) {
      setMenuOpen(false); // Close the menu on small screens
    }
    
  };

  // Determine the items to display based on the active category
  const getFilteredItems = () => {
    switch (activeCategory) {
      case 'mains':
        console.log(mains)
        return mains;
      case 'starters':
        console.log(starters)
        return starters;
      case 'drinks':
        console.log(drinks)
        return drinks;
      default:
        return [...mains, ...starters, ...drinks]; // Combine all categories for 'all'
    }
  };

  const filteredItems = getFilteredItems();

  
  //  useEffect(()=>{
  //   if(window.innerWidth < 640){
  //     setShowCloseButton(true)
  //   }
  //  },[menuOpen])
  

  return (
    <div>
      {/* Search bar */}
      <div className="w-full flex justify-end pr-4 relative z-1">
        <input
          type="text"
          placeholder="Search a dish"
          className="p-1 text-xl rounded-xl sm:w-auto w-3/4"
        />
        <CiSearch className="absolute text-xl md:text-2xl top-2 right-6" />
      </div>

      {/* Mobile menu toggle */}
      <div className="lg:hidden">
        <button
          className="absolute top-2 left-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <RxHamburgerMenu className="text-2xl" />
        </button>
      </div>

      {/* Menu items */}
      <div className={`grid lg:pl-32 ${menuOpen ? 'pl-32' : 'pl-2'}`}>
        <div
          className={`lg:flex lg:flex-col lg:space-y-0 h-full lg:bg-blue-800 ${
            menuOpen ? 'block' : 'hidden'
          } absolute top-10 left-0 right-0 z-10 sm:w-48 w-full`}
          style={{ backgroundColor: '#f0f1ec' }}
        >
    {/* {   (showCloseButton) &&
       <button className='text-2xl absolute top-4 right-4 px-2  text-white rounded' style={{backgroundColor:"#076968"}} onClick={() => setMenuOpen(!menuOpen)}>X</button>} */}
        <ul className="flex flex-col lg:mt-16 text-center lg:text-left mx-3">
            {[
              { label: 'ALL MENU', category: 'all', count: mains.length + starters.length + drinks.length },
              { label: 'Mains', category: 'mains', count: mains.length },
              { label: 'Starter', category: 'starters', count: starters.length },
              { label: 'Drink', category: 'drinks', count: drinks.length },
            ].map(({ label, category, count }) => (
              <li
                key={category}
                className="w-32 h-15 bg-white mt-2 rounded-xl"
                onClick={() => handleMenuItemClick(category)}
              >
                <button
                  className={`w-full block py-2 px-2 rounded-xl text-left ${
                    activeCategory === category ? 'bg-yellow-400' : 'hover:bg-yellow-400'
                  }`}
                >
                  <div className="">{label}</div>
                  <div className="text-sm text-gray-500">{count} items</div>
                </button>
              </li>
            ))}
          </ul>
        
            
        </div>

        {/* Items container */}
        <div
          style={{ backgroundColor: '#f0f1ec' }}
          className="p-2 pb-24 m-auto lg:ml-26 lg:mr-20 w-full rounded-xl overflow-auto h-screen scrollbar-none bg-gray-200 grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
        >
          {filteredItems.map((item) => (
            <div key={item._id}>
              <FoodItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuItems;
