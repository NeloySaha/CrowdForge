import { DetailsSection } from "../../../components/DetailsSection";
import { HrMiddleSection } from "./HrMiddleSection";
import { ClubDetail } from "../../../components/ClubDetail";
import { ClubTotalMembers } from "../../../components/ClubTotalMembers";

export const HrDashContainer = (props) => {
  return (
    <div className="hr-dashboard-container">
      <DetailsSection {...props} />
      <HrMiddleSection {...props} />

      <div className="dash-third-section">
        <ClubTotalMembers {...props} />
        <ClubDetail {...props} />
      </div>
    </div>
  );
};
