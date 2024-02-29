import { DetailsSection } from "../../components/DetailsSection";
import { TreasurerMiddleSection } from "./components/TreasurerMiddleSection";
import { ClubDetail } from "../../components/ClubDetail";
import { ClubTotalMembers } from "../../components/ClubTotalMembers";

const TreasurerDashboard = (props) => {
  return (
    <section className="treasurer-dash-container">
      <DetailsSection {...props} />
      <TreasurerMiddleSection {...props} />

      <div className="dash-third-section">
        <ClubTotalMembers {...props} />
        <ClubDetail {...props} />
      </div>
    </section>
  );
};

export default TreasurerDashboard;
