import axios from "axios";
import { useState, useEffect } from "react";

export const CreateAnnouncement = ({
  loggedUser,
  successToast,
  failedToast,
}) => {
  const [postDisabled, setPostDisabled] = useState(true);
  const [resetDisabled, setResetDisabled] = useState(true);
  const [annInfo, setAnnInfo] = useState({
    title: "",
    content: "",
  });

  const handleAnnInfo = (e) => {
    setAnnInfo((prevAnnInfo) => ({
      ...prevAnnInfo,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (annInfo.title.length !== 0 || annInfo.content.length !== 0) {
      setResetDisabled(false);
      if (annInfo.title.length !== 0 && annInfo.content.length !== 0) {
        setPostDisabled(false);
      }
    } else {
      setPostDisabled(true);
      setResetDisabled(true);
    }
  }, [annInfo]);

  const createAnnouncement = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/setAnnouncement`,
        {
          ...annInfo,
          club: loggedUser.club,
        }
      );

      successToast(res.data);
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    } finally {
      setAnnInfo({
        title: "",
        content: "",
      });
    }
  };

  return (
    <div>
      <h1 className="section-heading">Create Announcement</h1>
      <form
        className="announce-form"
        onSubmit={(e) => {
          e.preventDefault();
          createAnnouncement();
        }}
      >
        <div className="announce-form--category">
          <p>Set Title:</p>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            value={annInfo.title}
            onChange={handleAnnInfo}
            required
          />
        </div>

        <div className="announce-form--category">
          <p>Set Content:</p>
          <textarea
            name="content"
            placeholder="Start writing here"
            value={annInfo.content}
            onChange={handleAnnInfo}
            required
          />
        </div>

        <div className="announce-btn-container">
          <button
            disabled={postDisabled}
            className={postDisabled ? "post-disabled-btn" : "post-btn"}
          >
            Post
          </button>
          <button
            type="button"
            disabled={resetDisabled}
            className={resetDisabled ? "reset-disabled-btn" : "reset-btn"}
            onClick={() => setAnnInfo({ title: "", content: "" })}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};
