import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";

const VisaCard = ({ visa }) => {
  const { _id, name, photo, visa_type, fee } = visa;

  return (
    <Zoom>
      <div className="shadow-xl rounded-xl p-5 dark:bg-c transition-transform hover:scale-105 hover:shadow-xl">
        <div className="w-full">
          <img className="w-full h-48 rounded-xl" src={photo} alt="" />
        </div>
        <div>
          <div className="flex items-center justify-between mt-3">
            <h2 className="text-2xl font-bold">{name}</h2>
            <h4 className="text-xl font-semibold">{visa_type}</h4>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="font-semibold">$ {fee}</p>
            <Link
              to={`/visaDetails/${_id}`}
              className="bg-black text-white py-1 px-4 font-bold rounded-sm"
            >
              See Details
            </Link>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

VisaCard.propTypes = {
  visa: PropTypes.object,
};

export default VisaCard;
