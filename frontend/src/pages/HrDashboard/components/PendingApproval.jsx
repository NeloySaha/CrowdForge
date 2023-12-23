import axios from "axios";
import React, { useEffect, useState } from "react";
import { PendingCard } from "./PendingCard";
import { SectionLoader } from "../../../components/SectionLoader";

export const PendingApproval = (props) => {
  const [pendingData, setPendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPendingReqData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/pendingReq/${props.loggedUser.club}`
      );

      setPendingData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPendingReqData();
  }, []);

  const pendingCards = pendingData.map((pendingObj, idx) => {
    const props2 = { ...props, pendingObj, getPendingReqData };

    return <PendingCard key={idx} {...props2} />;
  });

  return (
    <div>
      <h2 className="section-heading">Incoming Join Requests</h2>
      {!loading ? (
        pendingCards.length > 0 ? (
          <div className="pending-cards-container">{pendingCards}</div>
        ) : (
          <p className="no-pending-text">No pending requests</p>
        )
      ) : (
        <SectionLoader />
      )}
    </div>
  );
};
