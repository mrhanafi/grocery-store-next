import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const CartItemList = ({cartItemList,onDeleteItem}) => {

    
  return (
    <div>
        <div className='h-[500px] overflow-auto'>
            {cartItemList.map((cart,index) => (
                <div className='flex justify-between items-center p-2 mb-3'>
                    <div className='flex gap-6 items-center'>
                        <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image} width={90} height={90} alt={cart.name}  unoptimized={true}
                        className='border p-2'
                        />
                        <div>
                            <h2 className='font-bold'>{cart.name}</h2>
                            <h2>Quantity {cart.quantity}</h2>
                            <h2 className='text-lg font-bold'>Price {cart.amount}</h2>
                        </div>
                    </div>
                        <TrashIcon onClick={() => onDeleteItem(cart.id)} 
                          className='cursor-pointer'  
                            />
                </div>
            ))}
        </div>
        {/* <div className='absolute w-[90%] bottom-6 flex flex-col'>
            <h2 className='text-lg font-bold flex justify-between'>Subtotal <span>RM {subtotal}</span></h2>
            <Button>Checkout</Button>
        </div> */}
    </div>
  )
}

export default CartItemList