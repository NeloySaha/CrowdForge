import { DetailsSection } from "../../../components/DetailsSection";
import { EventsContainer } from "./EventsContainer";
import { OtherClubs } from "./OtherClubs";

export const MemDashboardSection = (props) => {
  return (
    <div className="mem-dashboard-container">
      <DetailsSection {...props} />
      <EventsContainer {...props} />
      <OtherClubs {...props} />
    </div>
  );
};
