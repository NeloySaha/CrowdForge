import axios from "axios";
import { useEffect, useState } from "react";
import { MonitorMemberCard } from "./MonitorMemberCard";

export const Monitor = (props) => {
  const [query, setQuery] = useState("");
  const [monitoredMembers, setMonitoredMembers] = useState([]);

  const submitFunc = (e) => {
    e.preventDefault();
    getSearchData();
  };

  const getAllData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/hrMonitor/${props.loggedUser.club}`
      );

      setMonitoredMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSearchData = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/hrSearch`, {
        query,
        club: props.loggedUser.club,
      });

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
      getMemberData: getAllData,
      getMemData: props.getMemData,
      getVolunData: props.getVolunData,
    };
    return <MonitorMemberCard key={obj.email} {...newProps} />;
  });

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <h2 className="section-heading">Monitor Club Members</h2>
      <form className="hr-monitor-form" onSubmit={submitFunc}>
        <div className="search-container">
          <input
            className="search-box"
            type="search"
            placeholder="Search members"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-btn" type="submit">
            Search
          </button>
        </div>

        <button
          className="search-show-all-btn"
          type="button"
          onClick={getAllData}
        >
          Show All
        </button>
      </form>

      <div className="pending-card-container">
        <ul className="category-title-bar">
          <li>Name</li>
          <li>Department</li>
          <li>Phone Number</li>
          <li>Current Rating</li>
        </ul>
        <div className="monitor-cards">{filterCards}</div>
      </div>
    </div>
  );
};
