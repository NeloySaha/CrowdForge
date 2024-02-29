import { DetailsSection } from "../../components/DetailsSection";
import { AdvisorMiddleSection } from "./components/AdvisorMiddleSection";
import { ClubDetail } from "../../components/ClubDetail";
import { ClubTotalMembers } from "../../components/ClubTotalMembers";

export const AdvisorDashboard = (props) => {
  return (
    <section className="advisor-dash-container">
      <DetailsSection {...props} />
      <AdvisorMiddleSection {...props} />

      <div className="dash-third-section">
        <ClubTotalMembers {...props} />
        <ClubDetail {...props} />
      </div>
    </section>
  );
};

export default AdvisorDashboard;
