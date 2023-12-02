import { useState, useEffect } from "react";
import axios from "axios";
import { PromoCard } from "./PromoCard";

export const PromotionApprovals = (props) => {
  const [pendingData, setPendingData] = useState([]);

  const getPendingReqData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/promReq/${props.loggedUser.club}`
      );

      setPendingData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPendingReqData();
  }, []);

  const pendingCards = pendingData.map((pendingObj, idx) => {
    const props2 = { ...props, pendingObj, getPendingReqData };

    return <PromoCard key={idx} {...props2} />;
  });

  return (
    <div>
      <h2 className="section-heading">Promotion Approvals</h2>
      {pendingCards.length > 0 ? (
        <div className="pending-cards-container">{pendingCards}</div>
      ) : (
        <p className="no-pending-text">No pending promotion requests</p>
      )}
    </div>
  );
};
