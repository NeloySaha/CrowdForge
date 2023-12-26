import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { MonitorMemberCard } from "./MonitorMemberCard";
import { SectionLoader } from "../../../components/SectionLoader";

export const Monitor = (props) => {
  const [query, setQuery] = useState("");
  const [monitoredMembers, setMonitoredMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const submitFunc = (e) => {
    e.preventDefault();
  };

  const debounceSearch = (cb, delay) => {
    let timeout;

    return (...funcCalls) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...funcCalls);
      }, delay);
    };
  };

  const updateSearchResults = debounceSearch(
    (query) => getSearchData(query),
    500
  );

  const results = useCallback((query) => updateSearchResults(query), []);

  const getAllData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/hrMonitor/${props.loggedUser.club}`
      );

      setMonitoredMembers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setQuery("");
      setLoading(false);
    }
  };

  const getSearchData = async (currentQuery) => {
    try {
      setLoading(true);
      if (currentQuery === "") {
        getAllData();
        return;
      }
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/hrSearch`, {
        query: currentQuery,
        club: props.loggedUser.club,
      });

      setMonitoredMembers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
            onChange={(e) => {
              setQuery(e.target.value);
              results(e.target.value);
            }}
          />
        </div>

        <button
          className="search-show-all-btn"
          type="button"
          onClick={getAllData}
        >
          Show All
        </button>
      </form>

      {!loading ? (
        <div className="pending-card-container">
          <ul className="category-title-bar">
            <li>Name</li>
            <li>Department</li>
            <li>Phone Number</li>
            <li>Current Rating</li>
          </ul>
          <div className="monitor-cards">{filterCards}</div>
        </div>
      ) : (
        <SectionLoader />
      )}
    </div>
  );
};
