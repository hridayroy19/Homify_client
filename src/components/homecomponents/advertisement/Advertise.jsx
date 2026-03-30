const images = [
  "https://i.ibb.co/NZkjQxT/download-1.jpg",
  "https://i.ibb.co/SNGQdGq/nexus.png",
  "https://i.ibb.co/19TZfJf/2-1.png",
  "https://i.ibb.co/YyY7v8w/1-1.png",
  "https://i.ibb.co/jWMyFDQ/3-1.png",
  "https://i.ibb.co/3dQY8M7/rocket.png",
  "https://i.ibb.co/cxRNBC2/4.png",
  "https://i.ibb.co/hFsQfdf/5.png",
];

const Advertise = () => {
  // Duplicate for seamless infinite loop
  const track = [...images, ...images];

  return (
    <section className="py-14 px-4 bg-white border-y border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Trusted by <span className="text-amber-500">Industry Leaders</span>
        </h2>
        <p className="mt-2 text-gray-600 text-sm max-w-md mx-auto">
          We collaborate with top brands to bring you the best real estate
          experience.
        </p>
      </div>

      <div className="relative overflow-hidden max-w-7xl mx-auto">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
          {track.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-36 h-20 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center px-4 py-3 hover:border-amber-200 hover:bg-amber-50/50 hover:shadow-md transition-all duration-300 group"
            >
              <img
                src={src}
                alt={`partner-${i}`}
                className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Advertise;
