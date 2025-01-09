import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Zoom } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyVisaApplications = () => {
  const { user } = useContext(AuthContext);
  const [appliedVisa, setAppliedVisa] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const searchParam = searchValue.trim();
    fetch(
      `https://assignment-10-b10-server.vercel.app/appliedVisas/${user?.email}?search=${searchParam}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAppliedVisa(data);
        setFilteredVisas(data);
        setLoading(false);
      });
  }, [user, searchValue]);

  const handleCancel = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-b10-server.vercel.app/appliedVisas/${_id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Canceled!",
                icon: "success",
              });
            }
            const remainingVisa = appliedVisa.filter(
              (visa) => visa._id !== _id
            );
            setAppliedVisa(remainingVisa);
            setFilteredVisas(remainingVisa);
          });
      }
    });
  };

  const handleSearch = () => {
    const trimmedValue = searchValue.trim();
    setSearchValue(trimmedValue);
  };

  return (
    <div className="mx-5 md:mx-0 mt-10">
      <Helmet>
        <title>My Visa Applications - Visa Navigator</title>
      </Helmet>
      <div className="text-center flex gap-2 justify-center mx-5">
        <input
          type="text"
          placeholder="Type country name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 rounded-l-full shadow-md dark:bg-c"
        />
        <i
          onClick={handleSearch}
          className="fa-solid fa-magnifying-glass bg-white dark:bg-c px-4 py-1 text-2xl rounded-r-full"
        ></i>
      </div>
      {!appliedVisa.length && !loading && (
        <div className="text-center my-20">
          <div>
            <h2 className="font-semibold mb-3">
              No visas were found for your application, To add a visa, click on
              the All <br /> Visas button and see the next steps.
            </h2>
            <Link to="/allVisas">
              <button className="bg-black text-white dark:bg-c py-2 px-4 font-bold rounded-sm">
                All Visas
              </button>
            </Link>
          </div>
        </div>
      )}
      {loading ? (
        <div className="text-center mt-5">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        ""
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {filteredVisas.map((visa, idx) => (
          <div key={idx}>
            <Zoom>
              <div className="shadow-xl rounded-xl p-5 dark:bg-c transition-transform hover:scale-105 hover:shadow-xl">
                <div>
                  <img
                    className="w-full h-48 rounded-xl"
                    src={visa?.photo}
                    alt=""
                  />
                </div>
                <div>
                  <div className="flex justify-between gap-3 md:gap-0 md:items-center mt-5">
                    <h2 className="text-2xl font-black">{visa?.name}</h2>
                    <h4 className="text-xl font-semibold">{visa?.visa_type}</h4>
                  </div>
                  <div className="flex justify-between gap-2 md:gap-0 md:items-center my-2">
                    <p>Processing time : {visa?.processing_time}</p>
                    <p>$ {visa?.fee}</p>
                  </div>
                  <div className="flex justify-between gap-2 md:gap-0 md:items-center">
                    <p>Validity : {visa?.validity}</p>
                    <p>Method : {visa?.application_method}</p>
                  </div>
                  <div>
                    <p className="mt-2">
                      Applied date : {visa?.applied_date}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0 justify-between mt-3">
                    <div className="flex gap-1 font-bold">
                      <h2>{visa?.first_name}</h2>
                      <h2>{visa?.last_name}</h2>
                    </div>
                    <div>
                      <h5 className="font-semibold">{visa?.email}</h5>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCancel(visa?._id)}
                    className="bg-black text-white dark:bg-white dark:text-black py-1 px-4 font-bold mt-5 rounded-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Zoom>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVisaApplications;
