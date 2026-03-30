import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaLinkedinIn, FaArrowRight } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { BiLogoGmail } from "react-icons/bi";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/axiosPublic/useAxiosPublic";
import { Link } from "react-router-dom";

const Professionals = () => {
  const [personInfos, setPersonInfos] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/users/all/agent").then((res) => {
      setPersonInfos(res.data.slice(0, 4));
    });
  }, [axiosPublic]);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-amber-50/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Meet the Realty
            <span className="text-amber-500">Professionals</span>
          </h2>
          <p className="mt-3 text-gray-600 text-sm max-w-md mx-auto">
            Our experienced agents are here to guide you through every step of
            your real estate journey.
          </p>
        </div>

        {/* ── Agent Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {personInfos.map((person) => (
            <AgentCard key={person._id} person={person} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/allagent"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-500 hover:border-amber-500 hover:text-white text-amber-600 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            See All Agents
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const AgentCard = ({ person }) => (
  <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col">
    {/* Image + social overlay */}
    <div className="relative h-56 overflow-hidden flex-shrink-0">
      <img
        src={person.photoURL}
        alt={person.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Social icons — slide up on hover */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-3 pb-4">
        {[
          {
            href: "https://twitter.com",
            Icon: FaTwitter,
            color: "bg-sky-500 hover:bg-sky-600",
          },
          {
            href: "https://facebook.com",
            Icon: FaFacebook,
            color: "bg-blue-600 hover:bg-blue-700",
          },
          {
            href: "https://linkedin.com",
            Icon: FaLinkedinIn,
            color: "bg-blue-500 hover:bg-blue-600",
          },
        ].map(({ href, Icon, color }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={`w-8 h-8 rounded-full ${color} text-white flex items-center justify-center text-sm shadow-md transition-colors duration-200`}
          >
            <Icon />
          </a>
        ))}
      </div>

      {/* Listing badge */}
      <div className="absolute top-3 right-3">
        <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-500 text-white px-2.5 py-1 rounded-lg shadow">
          {person?.personalInfo?.listing} Listings
        </span>
      </div>
    </div>

    {/* Body */}
    <div className="flex flex-col flex-1 p-5">
      <Link to={`/agentProfiles/${person._id}`}>
        <h2 className="font-bold text-gray-800  hover:text-amber-600 transition-colors text-2xl leading-snug">
          {person?.name}
        </h2>
      </Link>
      <p className="text-xs text-amber-500 font-semibold uppercase tracking-wide mt-0.5 mb-4 capitalize">
        {person?.role}
      </p>

      <div className="border-t border-dashed border-gray-100 mb-4" />

      <div className="flex flex-col gap-2 mt-auto">
        <a
          href={`tel:${person?.phone}`}
          className="flex items-center gap-2 text-md text-gray-500 hover:text-amber-600 transition-colors"
        >
          <span className="w-6 h-6 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
            <MdCall className="text-amber-500 text-lg" />
          </span>
          {person?.phone}
        </a>
        <a
          href={`mailto:${person?.email}`}
          className="flex items-center gap-2 text-md text-gray-500 hover:text-amber-600 transition-colors truncate"
        >
          <span className="w-6 h-6 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
            <BiLogoGmail className="text-amber-500 text-lg" />
          </span>
          <span className="truncate">{person?.email}</span>
        </a>
      </div>
    </div>
  </div>
);

export default Professionals;
