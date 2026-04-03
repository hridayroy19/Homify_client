import Advertise from "../../components/homecomponents/advertisement/Advertise";
import Contact from "../../components/homecomponents/contact/Contact";
import Professionals from "../../components/homecomponents/professionals/Professionals";
import Banner from "../../components/homecomponents/banner/Banner";
import Choose from "../../components/homecomponents/choose/Choose";
import Features from "../../components/homecomponents/features/Features";
import LetesNews from "../../components/homecomponents/letestNews/LetesNews";
import Review from "../../components/homecomponents/review/Review";
import Slider from "../../components/homecomponents/slider/Slider";
import HappyClinet from "../../components/homecomponents/happiClient/HappyClinet";
import WelcomePopup from "../../components/homecomponents/welcomePoUp/WelcomePopup";
import { useState } from "react";

const Home = () => {
  const [searchData, setSearchData] = useState(null);

  return (
    <>
      <WelcomePopup />
      <Banner onSearch={setSearchData}></Banner>
      <Features searchData={searchData}></Features>
      <Professionals></Professionals>
      <LetesNews></LetesNews>
      <Advertise></Advertise>
      <Contact></Contact>
      <Choose></Choose>
      <Slider></Slider>
      <HappyClinet />
      <Review></Review>
    </>
  );
};

export default Home;
