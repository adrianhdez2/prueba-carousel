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
            color: "red"
        },
        {
            id: 2,
            color: "slate",
        },
        {
            id: 4,
            color: "blue",
        },
        {
            id: 6,
            color: "orange",
        },
        {
            id: 8,
            color: "sky",
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
        let color = colors.filter(color => color.id === activeindex);
        if (color.length > 0) {
            setColorActive(color[0].color);
        }
    }, [activeindex])

    const handleSlideChange = (swiper) => {
        setActiveindex(swiper.activeIndex);
    };

    return (
        <div id='app' className={`z-10 relative h-dvh flex items-center justify-center bg-${colorActive}-900 transition-colors`}>
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