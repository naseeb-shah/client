import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShowSingleCart } from "./cart";
export const Search = () => {
  const [data, setData] = useState([]);
  const [search, searchValue] = useState("");
  const searchHandle = () => {
    axios
      .get(`http://localhost:3005/search?search=${search}`)
      .then((response) => setData(response.data.data || []));
  };

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Movies</h3>
      <Link to="/"> Movies Home</Link>
      <div>
        <label style={{ marginRight: "20px" }}>Search</label>
        <input
          type="text"
          onChange={(e) => searchValue(e.target.value)}
        ></input>
        <button
          disable={searchValue.length < 2 ? true : false}
          onClick={() => searchHandle()}
        >
          Search
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.map((e) => {
          return <ShowSingleCart data={e} />;
        })}
      </div>
    </>
  );
};
export default Search;
