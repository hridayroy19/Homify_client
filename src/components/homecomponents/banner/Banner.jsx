import Searching from "../../../sharedcomponents/Searching";
import bgimage from "./bg.jpg";

const Banner = ({ onSearch }) => {
  return (
    <div className="relative w-full h-[500px] lg:h-[620px] overflow-hidden">
      {/* Background image */}
      <img
        src={bgimage}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.55]"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

      {/* Content — fully centered */}
      <div className="relative z-10 px-4 flex flex-col items-center justify-center h-full text-center text-white ">
        <h1
          className="text-2xl mt-7 sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl"
          data-aos="fade-down"
        >
          Find a Place Where You Can{" "}
          <span className="text-amber-400">Be Yourself</span>
        </h1>

        {/* Subtext */}
        <p
          className="mt-4  text-sm sm:text-base lg:text-lg text-gray-200 max-w-xl leading-relaxed"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          Keep searching until you find a place that truly feels like home. Your
          perfect space is waiting for you.
        </p>

        {/* Search */}
        <div className="w-full max-w-4xl">
          <Searching  onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
