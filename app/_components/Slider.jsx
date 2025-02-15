import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from 'next/image'

const Slider = ({sliderList}) => {
  return (
    <div>
      <Carousel>
        <CarouselContent>
            {sliderList.map((slider,index) => (

            <CarouselItem key={index}>
                <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+slider?.attributes?.image?.data[0]?.attributes?.url}
                width={1000}
                height={400}
                alt='slider'
                className='w-full h-[200px] md:h-[400px] object-cover rounded-xl'
                unoptimized={true}
                />
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
    </div>
  )
}

export default Slider
