import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../styles/Carousel.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation } from 'swiper/modules';

import slide_image_1 from '../assets/images/img3.jpeg';
import slide_image_2 from '../assets/images/img3.jpeg';
import slide_image_3 from '../assets/images/img3.jpeg';
import slide_image_4 from '../assets/images/img3.jpeg';
import slide_image_5 from '../assets/images/img3.jpeg';
import slide_image_6 from '../assets/images/img3.jpeg';
import slide_image_7 from '../assets/images/img3.jpeg';

const Carousel = () => {
  return (
    <div className="swiper-container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        spaceBetween={0}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <img src={slide_image_1} alt="slide_image_1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_2} alt="slide_image_2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_3} alt="slide_image_3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_4} alt="slide_image_4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_5} alt="slide_image_5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_6} alt="slide_image_6" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_7} alt="slide_image_7" />
        </SwiperSlide>

        <div className="slider-controler">
            <div className="swiper-button-next slider-arrow">
              <i className='bx bxs-chevron-right' style={{ color: '#ffffff' }} ></i>
            </div>
            <div className="center-content">
              <p className="slider-title">Tap to Select</p>
            </div>
            <div className="swiper-button-prev slider-arrow">
              <i className='bx bxs-chevron-left' style={{ color: '#ffffff' }} ></i>
            </div>
          </div>


      </Swiper>
    </div>
  );
};

export default Carousel;
