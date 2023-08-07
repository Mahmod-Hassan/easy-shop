// Import Swiper styles
"use client";
import mainSlider from "@/data/mainSlider";
import "swiper/css/bundle";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleHeroSlider from "./SingleHeroSlider";

const HeroSlider = () => {
  return (
    <div className="main-slider">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        navigation
        loop
        autoplay
        effect="fade"
        spaceBetween={50}
        slidesPerView={1}
      >
        {mainSlider.map((slider) => (
          <SwiperSlide key={slider.id}>
            <SingleHeroSlider slider={slider}></SingleHeroSlider>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default HeroSlider;
