import { FaSolarPanel, FaTv } from "react-icons/fa";
import { FaWalkieTalkie } from "react-icons/fa6";
import { PiElevatorBold, PiSwimmingPool } from "react-icons/pi";
import { LuCamera, LuFlame, LuCar, LuTreePine } from "react-icons/lu";
import { MdBathtub } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";
import LatestNews from "../../components/homecomponents/letestNews/LetesNews";
import Contact from "../../components/homecomponents/contact/Contact";

/* ── Data ─────────────────────────────────────────────────────── */
const FEATURES = [
  {
    Icon: IoMdCheckmark,
    title: "Largest Community",
    desc: "Join thousands of verified buyers, sellers, and investors in our trusted real estate network.",
  },
  {
    Icon: IoMdCheckmark,
    title: "24 Hours Service",
    desc: "Our support team is available around the clock to help you with any query or concern.",
  },
  {
    Icon: IoMdCheckmark,
    title: "Lifetime Support",
    desc: "We stand with you beyond the deal — offering guidance and support for as long as you need.",
  },
];

const AMENITIES_ROW1 = [
  { label: "CC Camera", Icon: LuCamera },
  { label: "Solar Panel", Icon: FaSolarPanel },
  { label: "Walk-in Closet", Icon: FaWalkieTalkie },
  { label: "Elevator", Icon: PiElevatorBold },
  { label: "Swimming Pool", Icon: PiSwimmingPool },
  { label: "Smart TV", Icon: FaTv },
];

const AMENITIES_ROW2 = [
  { label: "Jacuzzi", Icon: MdBathtub },
  { label: "Garden", Icon: LuTreePine },
  { label: "Fireplace", Icon: LuFlame },
  { label: "Garage", Icon: LuCar },
];

const TESTIMONIALS = [
  {
    name: "Douglas Lyphe",
    role: "Operations Manager",
    avatar:
      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    rating: 5,
    text: "I had a fantastic experience using HomifyEstate. The user-friendly interface, robust search, and seamless communication made selling my property a breeze. Highly recommended!",
  },
  {
    name: "Sarah Mitchell",
    role: "Property Investor",
    avatar:
      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    rating: 5,
    text: "HomifyEstate helped me find the perfect investment property in record time. The platform is intuitive, secure, and the support team is outstanding.",
  },
  {
    name: "James Karimi",
    role: "First-time Buyer",
    avatar:
      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    rating: 4,
    text: "As a first-time buyer, I was nervous — but HomifyEstate made the whole process smooth and transparent. I found my dream home within two weeks!",
  },
];

const About = () => {
  return (
    <>
      <section
        className="relative h-72 sm:h-96 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url(https://i.ibb.co/8PmVZMt/banner-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            About <span className="text-amber-400">Us</span>
          </h1>
          <p className="mt-3 text-gray-200 text-lg max-w-md mx-auto">
            Your trusted partner in navigating the dynamic world of real estate.
          </p>
        </div>
      </section>

      <div className="bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col gap-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://i.ibb.co/NLq9Lth/modern-residential-district-with-green-roof-balcony-generated-by-ai.jpg"
                alt="HomifyEstate"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-amber-100">
                <p className="text-xs text-gray-400 font-medium">
                  Trusted since
                </p>
                <p className="text-xl font-extrabold text-amber-500">2012</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-2">
                About <span className="text-amber-500">HomifyEstate</span>
              </h2>
              <div className="w-12 h-1 bg-amber-400 rounded-full mb-5" />
              <p className="text-gray-700 font-medium mb-4 leading-relaxed">
                Welcome to Homify Estate — Your Trusted Partner in Real Estate
                Management!
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                At Homify Estate, we pride ourselves on being more than just a
                real estate management platform; we are your dedicated partner
                in navigating the dynamic world of real estate. Whether you are a
                property buyer, seller, investor, or tenant, our mission is to
                simplify and elevate your real estate experience.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                With over a decade of experience, we have helped thousands of
                families find their perfect home, and we are committed to
                continuing that journey with integrity, transparency, and
                excellence.
              </p>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { val: "1.2K+", lbl: "Happy Clients" },
                  { val: "850+", lbl: "Properties Sold" },
                  { val: "12+", lbl: "Years Active" },
                ].map(({ val, lbl }) => (
                  <div
                    key={lbl}
                    className="text-center bg-amber-50 border border-amber-100 rounded-xl py-3"
                  >
                    <p className="text-xl font-extrabold text-amber-500">
                      {val}
                    </p>
                    <p className="text-[13px] text-gray-600 font-medium mt-0.5">
                      {lbl}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                What Makes Us <span className="text-amber-500">Different</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {FEATURES.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors duration-200">
                    <Icon className="text-green-500 text-xl group-hover:text-white transition-colors duration-200" />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                Discover Your Ideal Home{" "}
                <span className="text-amber-500">by Amenities</span>
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {AMENITIES_ROW1.map(({ label, Icon }) => (
                <button
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-amber-500 hover:text-white text-gray-600 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Icon className="text-sm flex-shrink-0" />
                  {label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {AMENITIES_ROW2.map(({ label, Icon }) => (
                <button
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-amber-500 hover:text-white text-gray-600 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Icon className="text-sm flex-shrink-0" />
                  {label}
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5"
              >
                Browse Properties
              </Link>
            </div>
          </div>

          {/* ── Testimonials ── */}
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                Feedback from{" "}
                <span className="text-amber-500">Satisfied Customers</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map(({ name, role, avatar, rating, text }) => (
                <div
                  key={name}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-gray-200"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">
                    {text}
                  </p>

                  <div className="border-t border-dashed border-gray-100 pt-4 flex items-center gap-3">
                    <img
                      src={avatar}
                      alt={name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-100"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {name}
                      </p>
                      <p className="text-xs text-amber-500">{role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Contact />
      <LatestNews />
    </>
  );
};

export default About;
