'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import ProductItemDetail from './ProductItemDetail'

const ProductItem = ({product}) => {
    // console.log(product)
  return (
    <div className='p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg
    hover:scale-110 hover:shadow-md transition-all ease-in-out cursor-pointer'>
        <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.attributes?.images?.data[0]?.attributes.url}
        width={500}
        height={500}
        alt={product?.attributes?.name}
        unoptimized={true}
        className='h-[200px] w-[200px] object-contain'
        />
            <h2 className='font-bold text-lg'>{product.attributes.name}</h2>
        <div className='flex gap-3'>
            {product.attributes.sellingPrice && <h2 className='font-bold text-lg'>RM {product.attributes.sellingPrice}</h2>}
            <h2 className={`font-bold text-lg ${product.attributes.sellingPrice && 'line-through text-gray-500'}`}>RM {product.attributes.mrp}</h2>
        </div>
        
        <Dialog>
            <DialogTrigger>
                <div className='border p-3 border-primary rounded-lg text-primary hover:text-white hover:bg-primary'>Add to cart</div>
                {/* <Button variant="outline"
                className="text-primary hover:text-white hover:bg-primary"
                >Add to cart</Button> */}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogDescription>
                    <ProductItemDetail product={product}/>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default ProductItem