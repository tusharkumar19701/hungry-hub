import React from 'react'

const Discount = ({item: {info : {offerLogo, header, couponCode}}}) => {
  return (
    <div className='flex border items-center gap-2 rounded-xl p-3 min-w-[320px] h-[80px]'>
        <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_56,h_56/" + offerLogo} alt="" />
        <div>
            <h3 className='font-bold'>{header}</h3>
            <p className='font-semibold text-gray-500 text-sm'>{couponCode}</p>
        </div>
    </div>
  )
}

export default Discount;