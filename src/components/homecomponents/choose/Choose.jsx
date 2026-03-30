import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/axiosPublic/useAxiosPublic";

const Choose = () => {
  const [chooses, setChooses] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/home/choose").then((res) => {
      setChooses(res.data);
    });
  }, [axiosPublic]);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            6 Reasons to Choose{" "}
            <span className="text-amber-500">HomifyEstate</span>
          </h2>
          <p className="mt-4 text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed">
            Our real estate platform captivates with seamless navigation,
            stunning listings, and user-friendly features — elevating your
            property search experience effortlessly.
          </p>
    
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chooses.map((choose, index) => (
            <ChooseCard key={choose.id} choose={choose} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ChooseCard = ({ choose, index }) => {
  const accents = [
    "from-amber-400 to-orange-400",
    "from-sky-400 to-blue-500",
    "from-emerald-400 to-teal-500",
    "from-violet-400 to-purple-500",
    "from-rose-400 to-pink-500",
    "from-amber-400 to-yellow-400",
  ];
  const gradient = accents[index % accents.length];

  return (
    <div className="group relative bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden text-center">

      {/* Subtle background blob on hover */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />

      {/* Top accent bar */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-gradient-to-r ${gradient} rounded-b-full opacity-0 group-hover:opacity-100 transition-all duration-300`} />

      {/* Icon wrapper */}
      <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${gradient} p-[2px] shadow-md`}>
        <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center">
          <img
            src={choose.image}
            alt={choose.title}
            className="w-8 h-8 object-contain"
          />
        </div>
      </div>

      {/* Step number */}
      <span className={`inline-block text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
        0{index + 1}
      </span>

      {/* Title */}
      <h2 className="text-base font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
        {choose.title}
      </h2>

      {/* Detail */}
      <p className="text-gray-700 text-sm leading-relaxed">
        {choose.details}
      </p>
    </div>
  );
};

export default Choose;