import { Link, useLoaderData } from "react-router-dom";
import Banner from "../Bannar/Bannar";
import LatestVisas from "../LatestVisas/LatestVisas";
import Welcome from "../Welcome/Welcome";
import Contact from "../Contact/Contact";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import FavoritePlace from "../FavoritePlace/FavoritePlace";
import WorldMapSection from "../WorldMapSection/WorldMapSection";
import { Helmet } from "react-helmet-async";
import ReviewSection from "../ReviewSection/ReviewSection";

const Home = () => {
  const { animationValue } = useContext(AuthContext);
  const allVisas = useLoaderData();

  return (
    <div>
      <Helmet>
        <title>VISA NAVIGATOR</title>
      </Helmet>
      <Banner></Banner>
      <Welcome></Welcome>
      <div className="mt-20 mx-5 md:mx-0">
        <motion.h2
          {...animationValue}
          className="text-center text-4xl font-bold"
        >
          Latest Visas
        </motion.h2>
        <motion.p
          {...animationValue}
          className="text-p font-semibold text-center py-5"
        >
          The Our Latest Visas section highlights the newest visa options added
          to the platform. It provides essential details at a glance, like
          country, visa type, <br /> and fees, along with easy navigation for
          further details or exploring all visas.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {allVisas.map((visa, idx) => (
            <LatestVisas key={idx} visa={visa}></LatestVisas>
          ))}
        </div>
        <motion.button {...animationValue} className="mt-10 mx-5 md:mx-0">
          <Link
            to="/allVisas"
            className="bg-black dark:bg-c text-white text-xl font-bold rounded-sm py-3 px-8"
          >
            See all visas
          </Link>
        </motion.button>
      </div>
      <FavoritePlace></FavoritePlace>
      <ReviewSection></ReviewSection>
      <WorldMapSection></WorldMapSection>
      <Contact></Contact>
    </div>
  );
};

export default Home;
