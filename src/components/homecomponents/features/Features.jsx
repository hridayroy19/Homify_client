import { FaExternalLinkAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/axiosPublic/useAxiosPublic";
import Property from "../../../sharedcomponents/Property";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../utils/provider/AuthProvider";

const Features = () => {
  const { searchInfo } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchInfo) {
          const response = await axiosPublic.get(
            `/home/checkout?want=${searchInfo?.want}&type=${searchInfo?.type}&location=${searchInfo?.location}`
          );
          setProperties(response.data);
        } else {
          const response = await axiosPublic.get("/home/features");
          setProperties(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [axiosPublic, searchInfo]);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">

          <div>
           
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              Explore Our{" "}
              <span className="text-amber-500">Newest Listings</span>
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-lg leading-relaxed">
              Discover a curated collection of the finest properties recently
              added to our listings.
            </p>
          </div>

          {/* Right: explore button */}
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 flex-shrink-0 px-5 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-500 hover:border-amber-500 hover:text-white text-amber-600 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md self-start sm:self-auto"
          >
            More Explore
            <FaExternalLinkAlt className="text-xs" />
          </Link>
        </div>

        {/* ── Property Grid ── */}
        {properties?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Property key={property._id} properties={property} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4">
              <FaExternalLinkAlt className="text-amber-300 text-xl" />
            </div>
            <h3 className="text-base font-semibold text-gray-700 mb-1">No properties found</h3>
            <p className="text-sm text-gray-400 max-w-xs">
              Try adjusting your search filters or browse all available listings.
            </p>
            <Link
              to="/properties"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
            >
              Browse All Properties
              <FaExternalLinkAlt className="text-xs" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;