import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/axiosPublic/useAxiosPublic";
import Star from "../../Star/Star";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const axiospublic = useAxiosPublic();

  useEffect(() => {
    axiospublic.get("/home/reviews").then((res) => {
      setReviews(res.data);
    });
  }, [axiospublic]);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-amber-50/60 to-white">
      {/* ── Section Header ── */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          What Our Clients <span className="text-amber-500">Say</span>
        </h2>
        <p className="mt-3 text-gray-400 text-sm max-w-md mx-auto">
          Real experiences from real people who found their perfect home with
          us.
        </p>
      </div>

      {/* ── Swiper ── */}
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={24}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={700}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          className="!pb-12"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review?._id} className="h-auto">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper nav button overrides */}
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #F59E0B !important;
          background: white;
          width: 40px !important;
          height: 40px !important;
          border-radius: 50%;
          box-shadow: 0 2px 12px rgba(0,0,0,0.12);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 14px !important;
          font-weight: 900;
        }
        .swiper-pagination-bullet { background: #D1D5DB !important; }
        .swiper-pagination-bullet-active { background: #F59E0B !important; width: 20px !important; border-radius: 4px !important; }
      `}</style>
    </section>
  );
};

/* ── Review Card ─────────────────────────────────────────────── */
const ReviewCard = ({ review }) => (
  <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full min-h-[280px]">
    {/* Amber accent top bar */}
    <div className="absolute top-0 left-6 right-6 h-[3px] bg-gradient-to-r from-amber-400 to-amber-300 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Quote icon */}
    <div className="flex items-start justify-between mb-4">
      <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
        <FaQuoteLeft className="text-amber-400 text-sm" />
      </div>
      {/* Star rating top-right */}
      <div className="flex-shrink-0">
        <Star stars={review?.rating} />
      </div>
    </div>

    {/* Comment */}
    <p className="text-gray-800 text-md leading-relaxed flex-1 line-clamp-4">
      {review?.comment}
    </p>

    {/* Divider */}
    <div className="my-4 border-t border-dashed border-gray-100" />

    {/* User info */}
    <div className="flex items-center gap-3">
      <div className="relative flex-shrink-0">
        <img
          src={review?.image}
          alt={review?.name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-100"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback avatar */}
        <div
          className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white font-bold text-base items-center justify-center ring-2 ring-amber-100 hidden"
          style={{ display: "none" }}
        >
          {(review?.name || "U")[0].toUpperCase()}
        </div>
        {/* Online dot */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {review?.name}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">{review?.date}</p>
      </div>

      {/* Verified badge */}
      <div className="ml-auto flex-shrink-0">
        <span className="text-[10px] font-semibold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
          Verified
        </span>
      </div>
    </div>
  </div>
);

export default Review;
