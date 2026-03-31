import { useEffect, useRef, useState } from "react";
import { FaUsers, FaHome, FaAward, FaStar } from "react-icons/fa";

const STATS = [
  {
    value: 1200,
    suffix: "+",
    label: "Happy Clients",
    sub: "Families who found their dream home",
    Icon: FaUsers,
  },
  {
    value: 850,
    suffix: "+",
    label: "Properties Sold",
    sub: "Across Bangladesh & beyond",
    Icon: FaHome,
  },
  {
    value: 12,
    suffix: "+",
    label: "Years Experience",
    sub: "A decade of trust & excellence",
    Icon: FaAward,
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    sub: "Clients who recommend us",
    Icon: FaStar,
  },
];

const useCounter = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const StatCard = ({ stat, index, inView }) => {
  const { value, suffix, label, sub, Icon } = stat;
  const count = useCounter(value, 1600 + index * 120, inView);

  return (
    <div className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center overflow-hidden hover:-translate-y-2 hover:bg-white/20 transition-all duration-400 cursor-default">
      <div className="relative z-10 w-14 h-14 mx-auto mb-5 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300 shadow-lg">
        <Icon className="text-2xl text-white drop-shadow" />
      </div>

      {/* Counter */}
      <div className="relative z-10 flex items-end justify-center gap-0.5 mb-2">
        <span className="text-5xl font-black text-white leading-none tabular-nums drop-shadow-lg">
          {count.toLocaleString()}
        </span>
        <span className="text-2xl font-bold text-white/80 mb-1">{suffix}</span>
      </div>

      {/* Label */}
      <p className="relative z-10 text-base font-bold text-white mb-1">
        {label}
      </p>

      {/* Sub */}
      <p className="relative z-10 text-xs text-white/60 leading-relaxed">
        {sub}
      </p>

      {/* Bottom shimmer bar */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-white/50 transition-all duration-500 rounded-b-3xl" />
    </div>
  );
};

const HappyClient = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #F97316 0%, #EF4444 35%, #F59E0B 65%, #F97316 100%)",
      }}
    >
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white/10 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-300/10 blur-3xl pointer-events-none" />

      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow">
            Trusted by Thousands <br className="hidden sm:block" />
            <span className="text-yellow-200">Across Bangladesh</span>
          </h2>
          <p className="mt-3 text-white/70 text-sm max-w-md mx-auto leading-relaxed">
            Over a decade of delivering exceptional real estate experiences —
            the numbers speak for themselves.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HappyClient;
