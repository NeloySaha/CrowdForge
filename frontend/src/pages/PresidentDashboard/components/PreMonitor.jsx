import { useState, useEffect } from "react";
import axios from "axios";
import { PreMonitorCard } from "./PreMonitorCard";

export const PreMonitor = (props) => {
  const [query, setQuery] = useState("");
  const [monitoredMembers, setMonitoredMembers] = useState([]);

  const submitFunc = (e) => {
    e.preventDefault();
    getSearchData();
  };

  const getAllData = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/clubMembers`,
        {
          club: props.loggedUser.club,
          email: props.loggedUser.email,
        }
      );

      setMonitoredMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSearchData = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/presidentSearch`,
        {
          query,
          club: props.loggedUser.club,
          email: props.loggedUser.email,
        }
      );

      setMonitoredMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterCards = monitoredMembers.map((obj, idx) => {
    const newProps = {
      ...obj,
      successToast: props.successToast,
      failedToast: props.failedToast,
      getAllData,
    };
    return <PreMonitorCard key={obj.email} {...newProps} />;
  });

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <h2 className="section-heading">Monitor Club Members</h2>
      <form className="hr-monitor-form" onSubmit={submitFunc}>
        <input
          className="search-box"
          type="search"
          placeholder="Search members"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={getAllData}>
          Show All
        </button>
      </form>

      <div className="pending-card-container">
        <ul className="category-title-bar">
          <li>Name</li>
          <li>Designation</li>
          <li>Phone Number</li>
          <li>Current Rating</li>
        </ul>
        <div className="monitor-cards">{filterCards}</div>
      </div>
    </div>
  );
};
