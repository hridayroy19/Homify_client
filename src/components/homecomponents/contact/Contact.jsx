import { MdCall, MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ── Card ── */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 py-12 sm:px-14 sm:py-14">
          {/* Decorative amber glow blobs */}
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-amber-400 opacity-10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-amber-500 opacity-10 blur-3xl pointer-events-none" />

          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                Need help? Talk to <br className="hidden sm:block" />
                our <span className="text-amber-400">Expert Team.</span>
              </h2>

              <p className="mt-3 text-gray-300 text-sm max-w-sm leading-relaxed">
                Talk to our specialists or browse through more properties. We
                are here to guide you every step of the way.
              </p>
            </div>

            {/* ── Right Buttons ── */}
            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <Link to="/contact">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5 group">
                  Contact Us
                  <MdArrowForward className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </Link>

              <a
                href="tel:9208505256"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 flex-shrink-0">
                  <MdCall className="text-amber-400 text-sm" />
                </span>
                01738211936
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;