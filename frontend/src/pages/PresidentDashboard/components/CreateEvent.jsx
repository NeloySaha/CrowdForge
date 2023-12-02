import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const CreateEvent = ({ loggedUser, successToast, failedToast }) => {
  const { club } = loggedUser;
  const [postDisabled, setPostDisabled] = useState(true);
  const [resetDisabled, setResetDisabled] = useState(true);
  const [inputData, setInputData] = useState({
    name: "",
    cost: "",
    date: "",
    capacity: "",
    venue: "",
    club_name: club,
    money_received: 0,
    restriction: 0,
  });

  const handleEventData = (e) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createEvent = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/createEvent`,
        {
          ...inputData,
          capacity: +inputData.capacity,
          cost: +inputData.cost,
          restriction: +inputData.restriction,
        }
      );

      successToast(res.data);
    } catch (err) {
      console.log(err);
      // failedToast(err.response.data);
    } finally {
      setInputData({
        name: "",
        cost: "",
        date: "",
        capacity: "",
        venue: "",
        club_name: club,
        money_received: 0,
        restriction: 0,
      });
    }
  };

  useEffect(() => {
    const anyFilled = Object.keys(inputData).some((dataKey) => {
      if (
        dataKey !== "money_received" &&
        dataKey !== "restriction" &&
        dataKey !== "club_name"
      ) {
        return inputData[dataKey].length !== 0;
      } else {
        return false;
      }
    });

    const allFilled = Object.keys(inputData).every((dataKey) => {
      if (
        dataKey !== "money_received" &&
        dataKey !== "restriction" &&
        dataKey !== "club_name"
      ) {
        return inputData[dataKey].length !== 0;
      } else {
        return true;
      }
    });

    allFilled ? setPostDisabled(false) : setPostDisabled(true);
    anyFilled ? setResetDisabled(false) : setResetDisabled(true);
  }, [inputData]);

  return (
    <div className="create-event-section">
      <h1 className="section-heading">Create Event</h1>
      <form
        className="announce-form"
        onSubmit={(e) => {
          e.preventDefault();
          createEvent();
        }}
      >
        <div className="announce-form--category">
          <p>Name:</p>
          <input
            type="text"
            name="name"
            placeholder="Enter Event Name"
            value={inputData.name}
            onChange={handleEventData}
            required
          />
        </div>

        <div className="announce-form--category">
          <p>Venue:</p>
          <input
            type="text"
            name="venue"
            placeholder="Enter Event Location"
            value={inputData.venue}
            onChange={handleEventData}
            required
          />
        </div>

        <div className="form-para-categories">
          <div className="announce-form--category">
            <p>
              Choose Restriction:<span>*</span>
            </p>
            <select
              name="restriction"
              onChange={handleEventData}
              value={inputData.restriction}
            >
              <option key={0} value={0}>
                Not Restricted
              </option>

              <option key={1} value={1}>
                Restricted
              </option>
            </select>
          </div>

          <div className="announce-form--category">
            <p>Event Date:</p>
            <input
              type="date"
              name="date"
              placeholder="Enter event date"
              value={inputData.date}
              onChange={handleEventData}
              required
            />
          </div>
        </div>

        <div className="form-para-categories">
          <div className="announce-form--category">
            <p>Cost:</p>
            <input
              type="number"
              min="0"
              name="cost"
              placeholder="Enter Event Cost"
              value={inputData.cost}
              onChange={handleEventData}
              required
            />
          </div>

          <div className="announce-form--category">
            <p>Capacity:</p>
            <input
              type="number"
              min="0"
              name="capacity"
              placeholder="Enter event capacity"
              value={inputData.capacity}
              onChange={handleEventData}
              required
            />
          </div>
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
            onClick={() => {
              setInputData({
                name: "",
                cost: "",
                date: "",
                capacity: "",
                venue: "",
                club_name: club,
                money_received: 0,
                restriction: 0,
              });
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};
