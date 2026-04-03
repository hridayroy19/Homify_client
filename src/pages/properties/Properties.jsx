import { useEffect, useState } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import useAxiosPublic from "../../hooks/axiosPublic/useAxiosPublic";
import Property from "../../sharedcomponents/Property";
import Searching from "../../sharedcomponents/Searching";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/home/allcheckout");
        const data = response.data;
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  const handleSearch = (data) => {
    const { want, type, location } = data;

    const filtered = properties.filter((property) => {
      const matchStatus = want
        ? property.property_status?.toLowerCase() === want.toLowerCase()
        : true;

      const matchType = type
        ? property.property_details?.type?.toLowerCase() === type.toLowerCase()
        : true;

      const matchLocation = location
        ? property.location?.toLowerCase().includes(location.toLowerCase())
        : true;

      return matchStatus && matchType && matchLocation;
    });

    setFilteredProperties(filtered);
    setCurrentPage(1);
  };

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredProperties.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredProperties.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prepage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const nextpage = () => {
    if (currentPage !== npage) setCurrentPage(currentPage + 1);
  };
  const changeCpage = (number) => setCurrentPage(number);

  return (
    <>
      <section
        className="bg-gray-100 md:h-[500px] h-[350px] relative grid items-end"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 700px",
          backgroundPosition: "center",
          backgroundImage: "url(https://i.ibb.co/8PmVZMt/banner-bg.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

        <div className="bg-white opacity-25 w-full h-full absolute"></div>
        <div className=" relative h-full">
          <div className=" w-[90%] pt-24 md:w-[80%] z-20 lg:w-[890px] xl:w-[1200px] mx-auto ">
            <h1 className="md:text-4xl text-center text-2xl lg:text-5xl font-bold">
              Property Grid View <br />
              <span className="items-center flex justify-center gap-1 text-sm lg:text-xl mt-7">
                <IoHome /> Home . PROPERTY GRID VIEW
              </span>
            </h1>
            <div className="">
              {/* Searching with onSearch prop */}
              <Searching onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full py-10 px-5">
        <div className="grid relative w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto bg-slate-100 gap-5">
          {records?.map((property) => (
            <Property key={property._id} properties={property} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ul className="inline-flex gap-5 items-center -space-x-px">
            <li>
              <button
                onClick={prepage}
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-2 ml-0 text-sm font-medium rounded-l-lg border border-gray-300 bg-white hover:bg-amber-100 transition-colors ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <MdOutlineNavigateBefore className="mr-1" /> Prev
              </button>
            </li>

            {/* Page Numbers */}
            {numbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => changeCpage(number)}
                  className={`px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-amber-300 hover:text-white transition-colors ${
                    currentPage === number
                      ? "bg-amber-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}

            {/* Next Button */}
            <li>
              <button
                onClick={nextpage}
                disabled={currentPage === npage}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-r-lg border border-gray-300 bg-white hover:bg-amber-100 transition-colors ${
                  currentPage === npage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next <MdOutlineNavigateNext className="ml-1" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Properties;
