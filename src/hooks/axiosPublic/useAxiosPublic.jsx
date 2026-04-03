import axios from "axios";


const axiosPublic = axios.create({ baseURL: "https://homifyserver.vercel.app" });
// const axiosPublic = axios.create({ baseURL: "https://homifyserver.vercel.app" });

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
