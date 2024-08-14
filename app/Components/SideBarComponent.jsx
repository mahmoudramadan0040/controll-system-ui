
"use client"
import {Button} from "@nextui-org/react";
import { useState } from 'react';
import {faRectangleXmark ,faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux'
import {setSidebarStatus} from "../Redux/slices/SharedSlice";
const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch =useDispatch();
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    return (
        
        <div className={`${isOpen ? 'basis-1/6':''}`}>   
            <aside className={` w-64 fixed top-16 right-0 h-full bg-gray-800 text-white  z-50 overflow-y-auto transition-transform duration-600 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center h-full p-4 ">
                    <h2 className="text-center mt-8 text-2xl">Mangement Students</h2>
                    <Button size="sm" radius="none" variant="bordered" className="w-full mt-12 p-4 text-xl" onClick={()=>dispatch(setSidebarStatus(0))}>
                        Import Students 
                    </Button>  
                    <Button size="sm" radius="none" variant="bordered" className="w-full mt-4 p-4 text-xl" onClick={()=>dispatch(setSidebarStatus(1))}>
                        All Students
                    </Button>  
                </div>
                <button className="fixed top-0 mt-1 mb-4 left-2 text-gray-400 hover:text-white" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faRectangleXmark} className='text-3xl' />
                </button>
            </aside>
        <FontAwesomeIcon icon={faBars} className='text-3xl fixed right-4 top-9 mt-8 text-gray-400 hover:text-white  font-bold py-2 px-4 rounded' onClick={toggleSidebar} />
      </div>
    );
  };
  
  
  

export default SideBar;

