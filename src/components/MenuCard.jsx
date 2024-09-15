import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import MenuCard2 from './MenuCard2';
import { FaStar } from 'react-icons/fa';
import MenuCard1 from './MenuCard1';

const MenuCard = ({card,resData}) => {
    const [isOpen,setIsOpen] = useState(true);

    function handleAddToCart() {
    }
    function handleButton() {
        setIsOpen(prev => !prev);
    }
    if(card?.itemCards) {
        const {title,itemCards} = card;
        return (
        <>
            <div className='mt-7'>
                <div className='flex justify-between'>
                <h1 className='font-bold text-xl'>{title} <span>({itemCards.length })</span></h1>
                {isOpen ? <IoIosArrowUp className='text-2xl' onClick={handleButton} /> : <IoIosArrowDown className='text-2xl' onClick={handleButton} />}
                
                </div>
                <div className='m-5'>
                {
                    isOpen && 
                    <div className='my-5'>
                        {itemCards.map(({card: {info}},i) => (
                            <MenuCard1 info={info} key={i} resData={resData} />
                        ))}
                    </div>
                }      
                </div>
            </div>
            <hr className='my-5 border-[7px] border-slate-100' />
          </>
          )
    } else {
        const {title,categories} = card;
        return (
            <div>
                <h1 className='font-bold text-xl'>{title}</h1>
                <div>
                    {categories.map((card,i) => (
                        <MenuCard2 card={card} key={i} resData={resData} />
                    ))}
                </div>
            </div>
            
        )
    }

}

export default MenuCard;