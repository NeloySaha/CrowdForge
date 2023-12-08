import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";

export const FundModal = ({
  loggedUser,
  successToast,
  failedToast,
  fundModalOn,
  setFundModalOn,
  event_id,
  cost,
  money_received,
  getEventData,
  setLoggedUser,
}) => {
  const [curAmount, setCurAmount] = useState(0);

  const confirmTransaction = async () => {
    try {
      if (+curAmount > loggedUser.money) {
        failedToast("Not enough money");
        throw new Error("Not enough money");
      }

      if (+curAmount > cost - money_received) {
        failedToast("Cost Limit exceeded");
        throw new Error("Cost Limit exceeded");
      }

      const res1 = await axios.post(
        `${import.meta.env.VITE_API_URL}/updateFund`,
        {
          money_received: money_received + +curAmount,
          event_id,
        }
      );

      const res2 = await axios.post(
        `${import.meta.env.VITE_API_URL}/updateBalance`,
        {
          money: +curAmount,
          club: loggedUser.club,
        }
      );

      const res3 = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        clubName: loggedUser.club,
        email: loggedUser.email,
        password: loggedUser.password,
      });

      if (res1.status === 200) {
        setLoggedUser(res3.data[0]);
        successToast(res2.data);
      }
    } catch (err) {
      failedToast(err.response.data);
      console.log(err);
    } finally {
      setFundModalOn(false);
      getEventData();
    }
  };

  return (
    <div className="modal">
      <button className="modal-exit-btn" onClick={() => setFundModalOn(false)}>
        <IoClose size="1.8rem" color="#eb3656" />
      </button>
      <form
        className="modal-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(event_id);
          confirmTransaction();
        }}
      >
        <div className="modal-form--category">
          <p>
            Amount: <span>*</span>
          </p>
          <input
            min="0"
            type="number"
            name="amount"
            placeholder="Enter Funding Amount"
            value={curAmount}
            onChange={(e) => setCurAmount(e.target.value)}
          />
        </div>

        <div className="modal-btn-container">
          <button className="eventbtn volbtn">Confirm</button>
          <button
            type="button"
            className="eventbtn parbtn"
            onClick={() => setFundModalOn(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};