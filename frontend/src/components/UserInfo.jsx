import React from "react";

export const UserInfo = ({ loggedUser }) => {
  const {
    name,
    gender,
    club,
    contact_no,
    designation,
    dob,
    email,
    department,
    rating,
  } = loggedUser;

  const formattedDate = new Date(dob).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="detail-container">
      <ul className="info-container">
        <li>
          <p className="category">Name:</p>
          <p className="detail-val">{name}</p>
        </li>

        <li>
          <p className="category">Email:</p>
          <p className="detail-val">{email}</p>
        </li>

        <li>
          <p className="category">Date of Birth:</p>
          <p className="detail-val">{formattedDate}</p>
        </li>

        <li>
          <p className="category">Gender:</p>
          <p className="detail-val upper">{gender}</p>
        </li>

        <li>
          <p className="category">Department:</p>
          <p className="detail-val">{department}</p>
        </li>

        <li>
          <p className="category">Designation:</p>
          <p className="detail-val upper">{designation}</p>
        </li>

        <li>
          <p className="category">Phone Number:</p>
          <p className="detail-val">{contact_no}</p>
        </li>

        <li>
          <p className="category">Club:</p>
          <p className="detail-val">{club}</p>
        </li>
      </ul>
    </div>
  );
};
