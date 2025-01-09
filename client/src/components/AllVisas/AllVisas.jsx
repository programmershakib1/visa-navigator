import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import VisaCard from "../VisaCard/VisaCard";

const AllVisas = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("visa_type") || "All";
  const sort = searchParams.get("sort") || "";
  const search = searchParams.get("search") || "";

  const [filteredVisas, setFilteredVisas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (filter !== "All") queryParams.append("visa_type", filter);
    if (search) queryParams.append("search", search);
    if (sort) queryParams.append("sort", sort);

    fetch(`https://assignment-10-b10-server.vercel.app/visas?${queryParams}`)
      .then((res) => res.json())
      .then((data) => {
        setFilteredVisas(data);
        setLoading(false);
      });
  }, [filter, search, sort]);

  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    setSearchParams({ visa_type: selectedType, search, sort });
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchParams({ visa_type: filter, search: searchValue, sort });
  };

  const handleSortChange = (event) => {
    const sortOrder = event.target.value;
    setSearchParams({
      visa_type: filter,
      search,
      sort: sortOrder === "none" ? "" : sortOrder,
    });
  };

  return (
    <div className="mx-5 md:mx-0 mt-10">
      <Helmet>
        <title>All Visas - Visa Navigator</title>
      </Helmet>
      <div className="flex flex-col gap-5 md:flex-row justify-between items-center">
        <div className="w-full block md:hidden">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type country name"
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-4 pr-8 py-2 rounded-l-full shadow-md dark:bg-c"
            />
            <i className="fa-solid fa-magnifying-glass bg-white px-4 py-1 text-2xl rounded-r-full"></i>
          </div>
        </div>
        <div className="w-full font-bold flex items-center gap-2">
          <span>Filter</span>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="w-full pl-2 py-2 rounded-sm shadow-md dark:bg-c"
          >
            <option value="All">All</option>
            <option value="Tourist visa">Tourist Visa</option>
            <option value="Student visa">Student Visa</option>
            <option value="Official visa">Official Visa</option>
            <option value="Business visa">Business Visa</option>
            <option value="Other visa">Other Visa</option>
          </select>
        </div>
        <div className="w-full hidden md:block">
          <div className="w-full flex items-center gap-2">
            <input
              type="text"
              placeholder="Type country name"
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-4 pr-8 py-2 rounded-l-full shadow-md dark:bg-c"
            />
            <i className="fa-solid fa-magnifying-glass bg-white dark:bg-c px-4 py-1 text-2xl rounded-r-full"></i>
          </div>
        </div>
        <div className="w-full font-bold flex items-center gap-2">
          <span>Sort</span>
          <select
            value={sort || "none"}
            onChange={handleSortChange}
            className="w-full pl-2 pr-8 py-2 rounded-sm shadow-md dark:bg-c"
          >
            <option value="none">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-10 md:mt-5">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {filteredVisas.map((visa, idx) => (
            <VisaCard key={idx} visa={visa}></VisaCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVisas;
