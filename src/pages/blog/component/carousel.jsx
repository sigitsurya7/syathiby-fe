import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { API_URL, get } from '../../../middleware/services/api';

const CarouselComponent = () => {
  const [banner, setBanner] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('v1/banner');
        setBanner(response.slice(0, 5));
      } catch (error) {
        console.error('Error Fetching Data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banner.length;
      setActiveIndex(nextIndex);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [activeIndex, banner.length]);

  return (
    <div className="container flex flex-col px-4 mx-auto space-y-6 lg:h-[32rem] py-8 lg:py-16 lg:flex-row lg:items-center">
      <div className="flex flex-col items-center w-full lg:flex-row lg:w-1/2">
        <div className="flex justify-center order-2 mt-6 lg:mt-0 lg:space-y-3 lg:flex-col">
          {banner.map((_, index) => (
            <Indicator
              key={index}
              onClick={() => setActiveIndex(index)}
              isSelected={index === activeIndex}
            />
          ))}
        </div>

        <div className="max-w-sm sm:mx-12 lg:mx-12 lg:order-2">
          <Carousel
            autoPlay
            infiniteLoop
            interval={3000}
            swipeable
            emulateTouch
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            selectedItem={activeIndex}
            onChange={setActiveIndex}
          >
            {banner.map((bannerData) => (
              <div key={bannerData.id}>
                <h1 className="text-3xl font-semibold tracking-wide text-gray-800 text-left dark:text-white lg:text-4xl">
                  {bannerData.title}
                </h1>
                <p className="mt-4 text-gray-600 text-left dark:text-gray-300">{bannerData.caption}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
        <Carousel
          autoPlay
          infiniteLoop
          interval={3000}
          swipeable
          emulateTouch
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          showIndicators={false}
          selectedItem={activeIndex}
          onChange={setActiveIndex}
        >
          {banner.map((bannerData) => (
            <div key={bannerData.id}>
                <img
                  key={bannerData.id}
                  className="object-cover w-full h-full max-w-2xl rounded-md"
                  src={`${API_URL}/upload/Banner/${bannerData.image}`}
                  alt={bannerData.link}
                />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

const Indicator = ({ onClick, isSelected }) => (
  <button
    className={`w-3 h-3 mx-2 rounded-full lg:mx-0 focus:outline-none ${
      isSelected ? 'bg-blue-500' : 'bg-gray-300'
    }`}
    onClick={onClick}
  ></button>
);

export default CarouselComponent;
