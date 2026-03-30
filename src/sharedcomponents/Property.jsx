import { FaArrowRight, FaRegHeart } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";
import { MdBed, MdBathtub } from "react-icons/md";
import { BiArea } from "react-icons/bi";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../utils/provider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/axiosPublic/useAxiosPublic";

const SHARE_URL = "https://homifyestate-8556d.web.app/";

const Property = ({ properties }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [shareOpen, setShareOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const title =
    properties?.title?.length > 28
      ? properties.title.slice(0, 28) + "…"
      : properties?.title;

  const details = properties?.property_details ?? {};

  const handleWishlist = () => {
    const payload = {
      email: user?.email,
      image: properties.property_image,
      name: properties.title,
      price: details?.price,
      propety: properties._id,
      author: properties?.author?.contact,
    };
    axiosPublic.post("/wish-lists", payload).then((res) => {
      if (res.data) {
        setWishlisted(true);
        toast.success("Added to wishlist!");
      }
    });
  };

  return (
    <>
      {/* ── Card ── */}
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
        {/* ── Image ── */}
        <div className="relative h-52 overflow-hidden flex-shrink-0">
          <img
            src={properties?.property_image}
            alt={properties?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top-left badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="px-2.5 py-1 rounded-lg bg-gray-900/80 text-white text-[11px] font-bold uppercase tracking-wide backdrop-blur-sm">
              {properties?.property_status}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wide">
              Featured
            </span>
          </div>

          {/* Top-right actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            {/* Share */}
            <button
              onClick={() => setShareOpen(true)}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-amber-500 transition-colors shadow-sm"
            >
              <IoMdShare className="text-base" />
            </button>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className={`w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors shadow-sm ${
                wishlisted
                  ? "bg-red-500 text-white"
                  : "bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
              }`}
            >
              <FaRegHeart className="text-sm" />
            </button>
          </div>

          {/* Price badge — bottom right of image */}
          <div className="absolute bottom-3 right-3">
            <span className="px-3 py-1.5 rounded-xl bg-amber-500 text-white text-sm font-bold shadow-md">
              ${details?.price?.toLocaleString?.() ?? details?.price}
            </span>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-1 leading-snug">
            {title}
          </h2>

          {/* Location */}
          <p className="flex items-center gap-1 text-md text-gray-600 mb-3">
            <IoLocationSharp className="text-amber-500 flex-shrink-0" />
            {properties?.location}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
              <MdBed className="text-amber-400 text-xl" />
              {details?.bed_rooms} Beds
            </span>
            <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
              <MdBathtub className="text-amber-400 text-xl" />
              {details?.baths} Baths
            </span>
            <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
              <BiArea className="text-amber-400 text-xl" />
              {details?.size} sqft
            </span>
          </div>

          <div className="border-t border-dashed border-gray-100 mb-3" />

          <div className="flex items-center justify-between mt-auto">
            <NavLink
              to={`/properties/${properties._id}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors group/link"
            >
              More Details
              <FaArrowRight className="text-xs group-hover/link:translate-x-0.5 transition-transform duration-200" />
            </NavLink>

            {/* Stars */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${i < 4 ? "text-amber-400" : "text-gray-200"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>

      {shareOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setShareOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-gray-800 text-center mb-1">
              Share this Property
            </h3>
            <p className="text-xs text-gray-400 text-center mb-5">
              Share with your friends and family
            </p>

            <div className="flex justify-center gap-3 flex-wrap">
              {[
                { Btn: FacebookShareButton, Icon: FacebookIcon },
                { Btn: TwitterShareButton, Icon: TwitterIcon },
                { Btn: LinkedinShareButton, Icon: LinkedinIcon },
                { Btn: WhatsappShareButton, Icon: WhatsappIcon },
                { Btn: EmailShareButton, Icon: EmailIcon },
                { Btn: TelegramShareButton, Icon: TelegramIcon },
              ].map(({ Btn, Icon }, i) => (
                <Btn key={i} url={SHARE_URL} hashtag="#HomifyEstate">
                  <Icon className="rounded-full w-11 h-11 hover:opacity-80 transition-opacity" />
                </Btn>
              ))}
            </div>

            <button
              onClick={() => setShareOpen(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Property;
