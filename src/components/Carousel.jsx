import React, { useEffect, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'photoswipe/style.css';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './styles.css';


function Carousel() {
    const colors = [
        {
            id: 0,
            color: "bg-blue-900"
        },
        {
            id: 2,
            color: "bg-slate-900",
        },
        {
            id: 4,
            color: "bg-orange-900",
        },
        {
            id: 6,
            color: "bg-sky-900",
        },
        {
            id: 8,
            color: "bg-red-900",
        },
    ]

    const [activeindex, setActiveindex] = useState(0);
    const [colorActive, setColorActive] = useState('red')

    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            gallery: '#gallery',
            children: 'a',
            pswpModule: () => import('photoswipe')
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, [])

    useEffect(() => {
        let color = colors.filter(color => color.id <= activeindex);
        let colorString = color[color.length - 1].color;


        setColorActive(colorString);
    }, [activeindex])

    const handleSlideChange = (swiper) => {
        setActiveindex(swiper.activeIndex);
    };

    return (
        <div id='app' className={`relative h-dvh flex items-center justify-center ${colorActive} transition-colors`}>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className=" w-1/2 pt-12 pb-12"
                id='gallery'
                onSlideChange={handleSlideChange}
            >
                {
                    Array.from({ length: 10 }).map((_, i) => (
                        <SwiperSlide key={i}>
                            {
                                activeindex === i ?
                                    <a href={`https://swiperjs.com/demos/images/nature-${i + 1}.jpg`}
                                        data-pswp-width="800"
                                        data-pswp-height="800"
                                        rel='noreferrer'
                                        target="_blank"
                                    >
                                        <img src={`https://swiperjs.com/demos/images/nature-${i + 1}.jpg`} className='block w-full' />
                                    </a>
                                    :
                                    <img src={`https://swiperjs.com/demos/images/nature-${i + 1}.jpg`} className='block w-full' />
                            }
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Carousel;