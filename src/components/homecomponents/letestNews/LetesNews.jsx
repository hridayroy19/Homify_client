import { FaArrowRight, FaCommentDots } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/axiosPublic/useAxiosPublic";

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/home/latestNews");
        setLatestNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Latest News & <span className="text-amber-500">Articles</span>
          </h2>
          <p className="mt-3 text-gray-600 text-sm max-w-md mx-auto">
            Stay informed with the latest trends, tips, and insights from the
            real estate world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((news, index) => (
            <NewsCard key={news.id} news={news} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsCard = ({ news, featured }) => (
  <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col">
    {/* Image */}
    <div className="relative h-52 overflow-hidden flex-shrink-0">
      <img
        src={news?.img1}
        alt={news?.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {featured && (
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-500 text-white px-2.5 py-1 rounded-lg shadow">
            Featured
          </span>
        </div>
      )}
    </div>

    {/* Body */}
    <div className="flex flex-col flex-1 p-5">
      {/* Meta row */}
      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
        <span className="flex items-center gap-1.5">
          <MdDateRange className="text-amber-400 text-lg" />
          {news?.date}
        </span>
        <span className="flex items-center gap-1.5">
          <FaCommentDots className="text-amber-400 text-lg" />
          {news?.comment?.length ?? 0}{" "}
          {news?.comment?.length === 1 ? "Comment" : "Comments"}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 leading-snug mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors duration-200">
        {news?.title}
      </h3>

      <div className="border-t border-dashed border-gray-100 mb-4 mt-auto" />

      {/* Read more */}
      <Link
        to={`blog/${news?._id}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors group/link"
      >
        Read More
        <FaArrowRight className="text-xs group-hover/link:translate-x-0.5 transition-transform duration-200" />
      </Link>
    </div>
  </div>
);

export default LatestNews;
