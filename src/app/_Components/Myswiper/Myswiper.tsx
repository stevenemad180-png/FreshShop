"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type MyswiperProps = {
  imglist?: string[];
};

export default function Myswiper({ imglist = [] }: MyswiperProps) {
  if (!imglist.length) return null;

  return (
    <div className="group relative w-full">
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-3">
        <button className="swiper-prev pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur transition opacity-0 group-hover:opacity-100 hover:scale-105">
          <ChevronLeft size={20} />
        </button>

        <button className="swiper-next pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur transition opacity-0 group-hover:opacity-100 hover:scale-105">
          <ChevronRight size={20} />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={imglist.length > 1}
        autoplay={
          imglist.length > 1
            ? {
                delay: 3000,
                disableOnInteraction: false,
              }
            : false
        }
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        pagination={{
          clickable: true,
        }}
        className="rounded-[24px]"
      >
        {imglist.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[300px] w-full overflow-hidden rounded-[24px] sm:h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent" />

              <img
                src={img}
                alt={`slide-${index}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}