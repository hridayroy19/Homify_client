import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BannerSection({ property }) {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (property) {
      setImages(property?.property_details?.thumImage ?? []);
    }
  }, [property]);

  const onAutoplayTimeLeft = (_s, time, progress) => {
    if (progressCircle.current)
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    if (progressContent.current)
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className="relative w-full overflow-hidden shadow-xl border border-gray-100">
      <Swiper
        spaceBetween={0}
        centeredSlides
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="h-[320px] sm:h-[420px] lg:h-[520px]"
      >
        {images?.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <img
                src={img}
                alt={`Property view ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </SwiperSlide>
        ))}

        {/* ── Autoplay progress pill ── */}
        <div
          slot="container-end"
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full"
        >
          {/* SVG ring */}
          <svg
            className="w-5 h-5 -rotate-90"
            viewBox="0 0 48 48"
            ref={progressCircle}
            style={{
              "--progress": 0,
              strokeDasharray: "125.6",
              strokeDashoffset: "calc(125.6px * var(--progress))",
            }}
          >
            {/* Track */}
            <circle
              cx="24" cy="24" r="20"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="4"
            />
            {/* Progress arc */}
            <circle
              cx="24" cy="24" r="20"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                strokeDasharray: "125.6px",
                strokeDashoffset: "calc(125.6px * var(--progress))",
                transition: "stroke-dashoffset 0.1s linear",
              }}
            />
          </svg>
          <span ref={progressContent} className="tabular-nums w-4 text-center" />
        </div>
      </Swiper>

      {/* Swiper overrides */}
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #F59E0B !important;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(6px);
          width: 36px !important;
          height: 36px !important;
          border-radius: 50%;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 13px !important;
          font-weight: 900;
        }
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.6) !important;
        }
        .swiper-pagination-bullet-active {
          background: #F59E0B !important;
          width: 20px !important;
          border-radius: 4px !important;
        }
      `}</style>
    </div>
  );
}