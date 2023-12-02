import axios from "axios";
import { useEffect, useState } from "react";

export const Announcements = ({ loggedUser }) => {
  const [announcement, setAnnouncment] = useState("");

  const getAnnouncementData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/announcement/${loggedUser.club}`
      );

      setAnnouncment(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAnnouncementData();
  }, []);

  return (
    <div>
      <h2 className="section-heading">Announcements</h2>
      {announcement === null ? (
        <p className="announcement-text">No announcements yet</p>
      ) : (
        <div className="ann-card">
          <h1 className="ann-heading">{announcement.announcement_title}</h1>
          <p className="ann-detail">{announcement.announcement_detail}</p>
        </div>
      )}
    </div>
  );
};
