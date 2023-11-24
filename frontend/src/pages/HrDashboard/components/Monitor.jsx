import axios from "axios";
import React, { useEffect, useState } from "react";
import { MonitorMemberCard } from "./MonitorMemberCard";

export const Monitor = (props) => {
  const [query, setQuery] = useState("");
  const [monitoredMembers, setMonitoredMembers] = useState([]);

  const filteredMembers = monitoredMembers.filter((obj) => {
    return obj.name.toLowerCase().includes(query.toLowerCase());
  });

  const submitFunc = (e) => {
    e.preventDefault();
  };

  const getMemberData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/hrMonitor/${props.loggedUser.club}`
      );

      setMonitoredMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterCards = filteredMembers.map((obj, idx) => {
    const newProps = {
      ...obj,
      successToast: props.successToast,
      failedToast: props.failedToast,
      getMemberData,
    };
    return <MonitorMemberCard key={obj.email} {...newProps} />;
  });

  useEffect(() => {
    console.log(monitoredMembers);
  }, [monitoredMembers]);

  useEffect(() => {
    getMemberData();
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
      </form>

      <div className="pending-card-container">
        <ul className="category-title-bar">
          <li>Name</li>
          <li>Department</li>
          <li>Phone Number</li>
          <li>Current Rating</li>
          <li>Kick out members</li>
        </ul>
        <div className="monitor-cards">{filterCards}</div>
      </div>
    </div>
  );
};
