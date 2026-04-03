import { useForm } from "react-hook-form";
import { useEffect } from "react";

const Searching = ({ onSearch = () => {} }) => {
  const { register, watch } = useForm();
  const values = watch();
  useEffect(() => {
    onSearch(values);
  }, [values, onSearch]);

  return (
    <div data-aos="zoom-in">
      <form className="flex bg-[#dfdfdf74] text-white w-full lg:w-3/4 py-4 md:py-8 mt-4 lg:mt-20 rounded-lg lg:justify-between mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 lg:gap-6 md:gap-6 lg:grid-cols-3 md:mx-auto">
          {/* Want */}
          <div className="w-full my-2">
            <label className="font-bold">Want</label>
            <select
              {...register("want")}
              className="w-full bg-slate-800 rounded-md p-2 mt-4"
            >
              <option value="">All</option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
            </select>
          </div>

          {/* Property Type */}
          <div className="w-full my-2">
            <label className="font-bold">Property Type</label>
            <select
              {...register("type")}
              className="w-full bg-slate-800 rounded-md p-2 mt-4"
            >
              <option value="">All</option>
              <option value="Appartment">Appartment</option>
              <option value="House">House</option>
              <option value="Office">Office</option>
            </select>
          </div>

          {/* Location */}
          <div className="w-full my-2">
            <label className="font-bold">Location</label>
            <input
              type="text"
              {...register("location")}
              placeholder="City, Country..."
              className="w-full bg-slate-800 rounded-md p-2 mt-4"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searching;
