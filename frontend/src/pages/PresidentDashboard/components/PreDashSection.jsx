import { DetailsSection } from "../../../components/DetailsSection";
import { PreMiddleSection } from "./PreMiddleSection";
import { ClubDetail } from "../../../components/ClubDetail";
import { ClubTotalMembers } from "../../../components/ClubTotalMembers";

export const PreDashSection = (props) => {
  return (
    <div className="pre-dash-container">
      <DetailsSection {...props} />
      <PreMiddleSection {...props} />

      <div className="dash-third-section">
        <ClubTotalMembers {...props} />
        <ClubDetail {...props} />
      </div>
    </div>
  );
};
