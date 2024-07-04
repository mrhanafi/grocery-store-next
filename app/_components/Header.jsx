'use client'
import { Button } from '@/components/ui/button'
import { CircleUserRound, LayoutGrid, Search, ShoppingBag, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UpdateCartContext } from '../_context/UpdateCartContext'

const Header = () => {

    const [categoryList,setCategoryList] = useState([]);
    const isLogin = sessionStorage.getItem('jwt') ? true : false;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const jwt = sessionStorage.getItem('jwt');
    
    const {updateCart,setUpdateCart} = useContext(UpdateCartContext);

    const [totalCartItem, setTotalCartItem] = useState(0);
    const router = useRouter();
    useEffect(()=> {
        getCategoryList();
    },[]);

    useEffect(()=>{
        getCartItems()
    },[updateCart])

    const getCategoryList = () => {
        GlobalApi.getCategory().then(resp=> {
            console.log(resp.data.data);
            setCategoryList(resp.data.data);
        })
    }

    // Used to get total cart item
    const getCartItems = async () => {
        const cartItemList = await GlobalApi.getCartItems(user.id,jwt);
        // console.log(cartItemList);
        setTotalCartItem(cartItemList?.length);
    }

    const onSignOut = () => {
        sessionStorage.clear();
        router.push('/sign-in')
    }
  return (
    <div className='p-5 shadow-sm flex justify-between'>
        <div className='flex items-center gap-8'>
            <div>
                <Image src={'/logo.png'} 
                width={150}
                height={100}
                alt='logo'
                />
            </div>
        

            
                <DropdownMenu>
                <DropdownMenuTrigger>
                    <h2 className='hidden md:flex gap-2 items-center
                        border rounded-full p-2 px-10 bg-slate-200
                        cursor-pointer'>
                            <LayoutGrid className='h-5 w-5' /> Category
                    </h2>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {categoryList.map((category,index) => (
                        <Link href={'/products-category/'+category?.attributes?.name}  key={index}>
                            <DropdownMenuItem className='flex gap-2 items-center cursor-pointer'>
                                <Image className='' src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+category?.attributes?.icon?.data?.attributes?.url}  alt='icon' width={25} height={25} unoptimized={true}/>
                                <h2 className='text-md'>{category?.attributes?.name}</h2>
                            </DropdownMenuItem>
                        
                        </Link>

                    ))}
                </DropdownMenuContent>
                </DropdownMenu>

                
            
            
            <div className='md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
                <Search />
                <input type="text" placeholder='Search' className='outline-none' />
            </div>
        </div>
        <div className='flex gap-5 items-center'>
            <h2 className='flex gap-2 items-center text-lg'>
                <ShoppingBasket className='h-7 w-7'/>
                <span className='bg-primary text-white px-2 rounded-full'>{totalCartItem}</span>
            </h2>
            {!isLogin ?
                <Link href={'/sign-in'}>
                    <Button>Login</Button>
                </Link>
                : 
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <CircleUserRound className='h-10 w-10 bg-green-100 text-primary p-2 rounded-full cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>My Order</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSignOut()}>Log Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            }
        </div>
    </div>
  )
}

export default Header