import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const CartData = () => {
  const [data, setData] = useState([]);
  const [sort, sortOptions] = useState([
    {
      display: "Sort",
    },
    {
      display: "Default",
    },

    {
      display: "Name",
    },
    {
      display: "Rating",
    },
  ]);
  const [sortValue, setsort] = useState("");

  useEffect(() => {
    axios
      .get(`https://server-84ol.vercel.app/?sort=${sortValue}`)
      .then((response) => setData(response.data.data || []));
    if (sortValue == "Default") {
      let value = data;
      setData([...value]);
    }
  }, [sortValue]);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Movies</h3>
      <Link to="/search">Search Movies</Link>
      <select
        onChange={(e) => setsort(e.target.value)}
        style={{ marginLeft: "30px" }}
      >
        <option value={sort[0].display}>{sort[0].display}</option>
        <option value={sort[1].display}>{sort[1].display}</option>
        <option value={sort[2].display}>{sort[2].display}</option>
        <option value={sort[3].display}>{sort[3].display}</option>
      </select>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.map((e) => {
          return <ShowSingleCart data={e} />;
        })}
      </div>
    </>
  );
};
export default CartData;

export const ShowSingleCart = ({ data }) => {
  return (
    <>
      <div
        style={{
          backgroundColor:
            data.rating < 2 ? "red" : data.rating < 3 ? "yellow" : "lightgreen",

          border: "solid 1px  white",
          width: "300px",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "revert",
          margin: "20px",
          color: "white",
          fontVariantCaps: "titling-caps",
          fontWeight: "bold",
        }}
      >
        <div style={{ display: "flex", margin: 0 }}>
          <p> Name :</p>
          <p style={{ marginLeft: "20px" }}>{data.name}</p>
        </div>
        <div style={{ display: "flex", margin: 0 }}>
          <p> Rating : </p>
          <p style={{ marginLeft: "20px" }}>{data.rating}</p>
        </div>
        <div style={{ display: "flex", margin: 0 }}>
          <p> Date :</p>
          <p style={{ marginLeft: "20px" }}>{data.releasedDate}</p>
        </div>
      </div>
    </>
  );
};
