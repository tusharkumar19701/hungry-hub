import React, { useContext, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import MenuCardOpt from './MenuCardOpt';

const MenuCard2 = ({card,resData}) => {
    const [isOpen,setIsOpen] = useState(true);
    function handleButton() {
        setIsOpen(prev => !prev);
    }

    const {title,itemCards} = card;
    return (
    <>
        <div className='mt-7'>
            <div className='flex justify-between'>
            <h1 className='font-bold text-base'>{title} <span>({itemCards.length })</span></h1>
            {isOpen ? <IoIosArrowUp className='text-2xl' onClick={handleButton} /> : <IoIosArrowDown className='text-2xl' onClick={handleButton} />}
            
            </div>
            <div className='m-5'>
            {
                isOpen && 
                <div>
                    {itemCards.map(({card: {info}},i) => (
                        <div key={i}>
                            <MenuCardOpt resData={resData} key={i} info={info} />
                        </div>
                    ))}
                </div>
            }      
            </div>
        </div>
        
      </>
      )
}

export default MenuCard2;