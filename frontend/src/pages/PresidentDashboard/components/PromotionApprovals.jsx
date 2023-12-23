import { useState, useEffect } from "react";
import axios from "axios";
import { PromoCard } from "./PromoCard";
import { SectionLoader } from "../../../components/SectionLoader";

export const PromotionApprovals = (props) => {
  const [pendingData, setPendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPendingReqData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/promReq/${props.loggedUser.club}`
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

    return <PromoCard key={idx} {...props2} />;
  });

  return (
    <div>
      <h2 className="section-heading">Promotion Approvals</h2>
      {!loading ? (
        pendingCards.length > 0 ? (
          <div className="pending-cards-container">{pendingCards}</div>
        ) : (
          <p className="no-pending-text">No pending promotion requests</p>
        )
      ) : (
        <SectionLoader />
      )}
    </div>
  );
};
