import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import '../styles/Carousel.css';

const Carousel = ({ country, branch, bench, type, product, lang, selectedSubProduct }) => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [subProducts, setSubProducts] = useState([]);
  const [data, setData] = useState(null); // Add this line to declare 'data' state
  const [swiperKey, setSwiperKey] = useState(Date.now());

  useEffect(() => {
    const fetchImageUrlsAndSubProducts = async () => {
      try {
        const apiEndpoint = `https://arabbank.azurewebsites.net/api/Api/GetDiscoveryContent?country=${country}&branch=${branch}&bench=${bench}&type=${type}&product=${product}&lang=${lang}`;
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error('Failed to fetch image URLs and SubProducts');
        }

        const responseData = await response.json();

        const leaflets = responseData.result.leaflet || [];
        const urls = leaflets.map((leaflet) => leaflet.leafletPage1);
        const subProducts = leaflets.map((leaflet) => leaflet.subProduct || []);

        // Set 'data' state with the entire response data
        setData(responseData);

        setImageUrls(urls);
        setSubProducts(subProducts || []);
        setSwiperKey(Date.now());
      } catch (error) {
        console.error('Error fetching image URLs and SubProducts:', error);
        setImageUrls([]);
        setSubProducts([]);
      }
    };

    fetchImageUrlsAndSubProducts();
  }, [country, branch, bench, type, product, lang]);

  useEffect(() => {
    const activeIndex = subProducts.findIndex((subProduct) => subProduct === selectedSubProduct);

    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(activeIndex);
    }
  }, [selectedSubProduct, subProducts]);

  const handleImageClick = (index) => {
    const selectedSubProduct = subProducts[index];
    const selectedSubProductParam = encodeURIComponent(selectedSubProduct);

    // Check if data is defined before trying to access its properties
    const branchName = data?.result.branchName?.result[0]?.branchName || '';
    const branchCode = data?.result.branchName?.result[0]?.branchNumber || '';
    const productName = data?.result.product || '';

    navigate(`/leaflet1?imageIndex=${index + 1}&country=${country}&branch=${branch}&branchName=${branchName}&branchCode=${branchCode}&bench=${bench}&type=${type}&product=${product}&productName=${productName}&subProduct=${selectedSubProductParam}&lang=${lang}`);
};

  return (
    <div className="swiper-container">
      <Swiper
        key={swiperKey}
        ref={swiperRef}
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
        {imageUrls.map((imageUrl, index) => (
          <SwiperSlide key={index} onClick={() => handleImageClick(index)}>
            <img src={imageUrl} alt={`slide_image_${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slider-controler">
        <div className="swiper-button-next slider-arrow">
          <i className='bx bxs-chevron-right' style={{ color: '#ffffff' }}></i>
        </div>
        <div>
          <p id="slider-title">Tap to Select</p>
        </div>
        <div className="swiper-button-prev slider-arrow">
          <i className='bx bxs-chevron-left' style={{ color: '#ffffff' }}></i>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
