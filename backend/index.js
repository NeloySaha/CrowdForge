const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");
const env = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Manually setting connection
function handleDisconnect() {
  db = mysql.createConnection(configuration);

  db.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("Connected to Database");
    }
  });
  db.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();

app.get("/", (req, res) => {
  return res.send("Hello From University Backend");
});

// sending email
app.post("/sendEmail", (req, res) => {
  const { msg, email } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: "neloy.saha456@gmail.com",
    subject: "CrowdForge Status Update",
    text: msg,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send("Couldn't send the email!");
    }

    return res.send("Email sent successfully");
  });
});

// club data
app.get("/clubs", (req, res) => {
  const sql = `SELECT name from club`;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// department data
app.get("/depts", (req, res) => {
  const sql = `Select name from department`;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// login
app.post("/login", (req, res) => {
  const { clubName, email, password } = req.body;
  const sql = `Select * from member where club=? and email=? and password=?`;

  db.query(sql, [clubName, email, password], (err, data) => {
    if (err) return res.send("Error occurred during login");

    if (data.length === 0) return res.status(500).send("User not found!");

    return res.json(data);
  });
});

// Register
app.post("/register", (req, res) => {
  const {
    clubName,
    name,
    email,
    password,
    gender,
    dateOfBirth,
    designation,
    contactNo,
    dept,
  } = req.body;

  const sql = `INSERT INTO incoming_request (name, designation, email, dob, department, gender, club, password, contact_no) VALUES (?,?,?,?,?,?,?,?,?)`;

  db.query(
    sql,
    [
      name,
      designation,
      email,
      dateOfBirth,
      dept,
      gender,
      clubName,
      password,
      contactNo,
    ],
    (err, _) => {
      if (err) return res.send("Sorry! Please try other email");

      return res
        .status(200)
        .send("🎉Your membership request is submitted successfully.");
    }
  );
});

// edit user profile
app.post("/editProfile", (req, res) => {
  const { name, gender, department, contact_no, password, dob, email, club } =
    req.body;
  const sql =
    "UPDATE member SET name = ?, gender=?, department=?,dob=?,contact_no=?,password=? WHERE email = ? AND club = ?";

  db.query(
    sql,
    [name, gender, department, dob, contact_no, password, email, club],
    (err, data) => {
      if (err) return res.send("Sorry! Couldn't Update your Information");

      return res.send("Your information updated successfully🎉");
    }
  );
});

// announcements
app.get("/announcement/:club", (req, res) => {
  const { club } = req.params;
  const sql =
    "SELECT announcement_title,announcement_detail FROM club WHERE name=?";

  db.query(sql, [club], (err, data) => {
    if (err) return res.send(err);

    return res.json(data);
  });
});

//total club members
app.get("/clubMembers/:club", (req, res) => {
  const { club } = req.params;
  const sql = "Select Count(*) as totalCount from member WHERE club=?";

  db.query(sql, [club], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// ////////////
// ////////////
// //GENERAL///
// ////////////
// ////////////

app.post("/completeTask", (req, res) => {
  const { club, event_id, email } = req.body;
  const sql =
    "UPDATE volunteer SET money = 0 WHERE club = ? AND email = ? AND event_id = ?";

  db.query(sql, [club, email, event_id], (err, data) => {
    if (err) return res.send("Couldn't complete the task!");

    return res.send("Successfully completed the task🎉🎉🎉🎉");
  });
});

app.post("/assignedEventTask", (req, res) => {
  const { club, email, event_id } = req.body;

  const sql = "Select * from volunteer where club=? and email=? and event_id=?";

  db.query(sql, [club, email, event_id], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// member upcoming event
app.get("/upcomingEvents/:email", (req, res) => {
  const { email } = req.params;
  const sql = `SELECT e.*
    FROM event e
    LEFT JOIN participate p ON e.event_id = p.event_id AND p.email =?
    LEFT JOIN volunteer v ON e.event_id = v.event_id AND v.email = ?
    WHERE p.event_id IS NULL AND v.event_id IS NULL`;

  db.query(sql, [email, email], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// member participating event button calculation
app.get("/participatingEvents/:email", (req, res) => {
  const { email } = req.params;
  const sql = `SELECT e.*, CASE WHEN v.event_id IS NOT NULL THEN TRUE ELSE FALSE END AS volun FROM participate p LEFT JOIN event e ON e.event_id = p.event_id LEFT JOIN volunteer v ON e.event_id = v.event_id AND v.email = ? WHERE p.email = ?`;

  db.query(sql, [email, email], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// member volunteering event button calculation
app.get("/volunteerEvents/:email", (req, res) => {
  const { email } = req.params;
  const sql =
    "SELECT e.* FROM volunteer v LEFT JOIN event e ON e.event_id=v.event_id WHERE v.email=?";

  db.query(sql, [email], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// other clubs
app.get("/otherClubDetails/:club", (req, res) => {
  const { club } = req.params;
  const sql = `SELECT * FROM club where name !=?`;

  db.query(sql, [club], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// participating Events
app.post("/participate", (req, res) => {
  const { event_id, club, email } = req.body;

  const sql = "INSERT INTO participate (club, email, event_id) VALUES (?,?,?)";

  db.query(sql, [club, email, event_id], (err, data) => {
    if (err) return res.send("Sorry! Please try again");

    return res.send("🎉Participation Confirmed");
  });
});

// volunteering events
app.post("/volunteer", (req, res) => {
  const { event_id, club, email } = req.body;

  const sql = "INSERT INTO volunteer (club, email, event_id) VALUES (?,?,?)";

  db.query(sql, [club, email, event_id], (err, data) => {
    if (err) return res.send("Sorry! Please try again");

    return res.send("🎉Volunteering Confirmed");
  });
});

// ////////////////
// ////////////////
// ///// HR ///////
// ////////////////
// ////////////////

// pending club join request
app.get("/pendingReq/:club", (req, res) => {
  const { club } = req.params;
  const sql =
    "Select * from incoming_request where club=? ORDER by incoming_time DESC";

  db.query(sql, [club], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// member approve
app.post("/hrMemInsert", (req, res) => {
  const {
    name,
    email,
    dob,
    department,
    gender,
    club,
    password,
    contact_no,
    evaluation,
  } = req.body;

  const sql1 =
    "INSERT into member (name,designation,email,dob,department,gender,club,password,contact_no,rating,evaluation) Values (?,'general',?,?,?,?,?,?,?,0,?)";

  const sql2 = "DELETE FROM incoming_request WHERE email = ? and club = ?";

  db.query(
    sql1,
    [
      name,
      email,
      dob,
      department,
      gender,
      club,
      password,
      contact_no,
      evaluation,
    ],
    (err1, data1) => {
      if (err1) {
        return res.send("Couldn't insert");
      }

      db.query(sql2, [email, club], (err2, data2) => {
        if (err2) return res.send("Couldn't remove the pending request");

        return res.send("🎉Member now Approved");
      });
    }
  );
});

// member reject
app.post("/hrRejectReq", (req, res) => {
  const { email, club } = req.body;
  const sql = "DELETE FROM incoming_request WHERE email = ? and club = ?";

  db.query(sql, [email, club], (err, data) => {
    if (err) return res.send("Sorry! Couldn't remove the request");

    return res.send("Request removed.");
  });
});

// monitoring all
app.get("/hrMonitor/:club", (req, res) => {
  const { club } = req.params;
  const sql = "SELECT * FROM member WHERE club=? AND designation='general'";

  db.query(sql, [club], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// monitoring search
app.post("/hrSearch", (req, res) => {
  const { query, club } = req.body;
  const sql = `SELECT * FROM member WHERE designation = 'general' AND club = ? AND name REGEXP ?`;

  db.query(sql, [club, query], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// rating update
app.post("/updateRating", (req, res) => {
  const { email, club, newRating } = req.body;
  const sql = "UPDATE member set rating=? WHERE email = ? AND club = ?";

  db.query(sql, [newRating, email, club], (err, data) => {
    if (err) return res.send("Sorry! Couldn't update rating");

    return res.send("🎉Successfully updated the rating");
  });
});

// members remove
app.post("/removeMembers", (req, res) => {
  const { email, club } = req.body;
  const sql = "DELETE FROM member WHERE email = ? and club = ?";

  db.query(sql, [email, club], (err, data) => {
    if (err) return res.send("Sorry! Couldn't remove the Member");

    return res.send("Member removed.");
  });
});

// total members in club
app.get("/clubMemberCount/:club", (req, res) => {
  const { club } = req.params;
  const sql = "Select Count(*) as totalCount from member WHERE club=? ";

  db.query(sql, [club], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// volunteers per club event
app.get("/eventWiseVol/:club", (req, res) => {
  const { club } = req.params;
  const sql =
    "SELECT COUNT(*) as totalCount,e.name FROM volunteer v JOIN event e ON e.event_id=v.event_id WHERE club=? group by v.event_id";

  db.query(sql, [club], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// promo req
app.post("/hrPromoReq", (req, res) => {
  const { name, email, club, designation, promoted_designation } = req.body;

  const sql =
    "INSERT into promotion_request (name, email,club,designation,promoted_designation) Values (?,?,?,?,?)";

  db.query(
    sql,
    [name, email, club, designation, promoted_designation],
    (err, data) => {
      if (err) return res.json(err);

      return res.json(data);
    }
  );
});
// //////////////
// //////////////
// //PRESIDENT///
// //////////////
// //////////////

app.post("/setAnnouncement", (req, res) => {
  const { title, content, club } = req.body;

  const sql =
    "UPDATE club SET announcement_detail = ?, announcement_title = ? WHERE club.name = ?";

  db.query(sql, [content, title, club], (err, data) => {
    if (err) return res.send("Couldn't Post Announcement");

    return res.send("Announcement Posted");
  });
});

app.post("/createEvent", (req, res) => {
  const { name, cost, date, capacity, venue, club_name, restriction } =
    req.body;
  const sql =
    "INSERT INTO incoming_event ( name, cost, date, capacity, venue, club_name, restriction) VALUES ( ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [name, cost, date, capacity, venue, club_name, restriction],
    (err, data) => {
      if (err) return res.send("Couldn't Post");

      return res.json("Event Posted");
    }
  );
});

app.get("/showEvents/:club", (req, res) => {
  const { club } = req.params;
  const sql = "Select * from event WHERE club_name=?";

  db.query(sql, [club], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/clubEvents/:club", (req, res) => {
  const { club } = req.params;
  const sql = "Select * from event where club_name = ?";

  db.query(sql, [club], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// president all search
app.post("/clubMembers", (req, res) => {
  const { club, email } = req.body;
  const sql =
    "Select * from member WHERE club=? and email!= ? and designation!='advisor' ORDER by rating DESC";

  db.query(sql, [club, email], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});
// president search
app.post("/presidentSearch", (req, res) => {
  const { club, email, query } = req.body;
  const sql = `Select * from member WHERE club=? and email!= ? and designation!='advisor' AND name REGEXP ?`;

  db.query(sql, [club, email, query], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// president promote
app.post("/presidentPromote", (req, res) => {
  const { promoted_designation, email, club } = req.body;

  const sql = "UPDATE member set designation = ? where email=? and club=?";

  db.query(sql, [promoted_designation, email, club], (err, data) => {
    if (err) return res.send("Couldn't update the member");

    return res.send("Member Promoted Successfully!");
  });
});

// president accept
app.get("/promReq/:club", (req, res) => {
  const { club } = req.params;

  const sql =
    "SELECT * FROM promotion_request where club=? ORDER by prom_time DESC";

  db.query(sql, [club], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// president promoteApproval
app.post("/approvePromReq", (req, res) => {
  const { email, promoted_designation, club } = req.body;

  const sql1 = "UPDATE member set designation = ? where email=? and club=?";
  const sql2 = "DELETE FROM promotion_request WHERE email = ? and club = ?";

  db.query(sql1, [promoted_designation, email, club], (err1, data1) => {
    if (err1) return res.send("Couldn't update data");

    db.query(sql2, [email, club], (err2, data2) => {
      if (err2) return res.send("Couldn't delete the data");

      return res.send("Successfully approved the request");
    });
  });
});

// Reject the request
app.post("/rejectPromReq", (req, res) => {
  const { email, club } = req.body;

  const sql = "DELETE FROM promotion_request WHERE email = ? and club = ?";

  db.query(sql, [email, club], (err2, data) => {
    if (err2) return res.send("Couldn't delete the data");

    return res.send("Successfully removed the request");
  });
});

// Advisor
app.get("/eventProposals/:club", (req, res) => {
  const { club } = req.params;
  const sql = "Select * from incoming_event where club_name = ?";

  db.query(sql, [club], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// approve
app.post("/approveEventReq", (req, res) => {
  const {
    name,
    cost,
    date,
    capacity,
    venue,
    club_name,
    restriction,
    event_id,
  } = req.body;

  const sql1 =
    "INSERT into event (name,cost,date,capacity,venue,club_name,restriction) Values (?,?,?,?,?,?,?)";
  const sql2 = "DELETE FROM incoming_event WHERE event_id = ?";

  db.query(
    sql1,
    [name, cost, date, capacity, venue, club_name, restriction],
    (err1, data1) => {
      if (err1) return res.send("Couldn't approve event");

      db.query(sql2, [event_id], (err2, data2) => {
        if (err2) return res.send("Couldn't delete the data");

        return res.send("Successfully approved the event");
      });
    }
  );
});

// reject the incoming event
app.post("/rejectEventReq", (req, res) => {
  const { event_id } = req.body;

  const sql = "DELETE FROM incoming_event WHERE event_id = ?";

  db.query(sql, [event_id], (err, data) => {
    if (err) return res.send("Couldn't delete the data");

    return res.send("Successfully rejected the event");
  });
});

// approve funding
app.post("/updateFund", (req, res) => {
  const { money_received, event_id } = req.body;
  const sql = "UPDATE event set money_received=? WHERE event_id=? ";

  db.query(sql, [money_received, event_id], (err, data) => {
    if (err) return res.send("Sorry! Couldn't add fund");

    return res.send("Successfully funded for the event");
  });
});

// update account balance
app.post("/updateBalance", (req, res) => {
  const { money, club } = req.body;
  const sql1 =
    "UPDATE member SET money = money+? WHERE member.designation='treasurer'  AND member.club = ?";
  const sql2 =
    "UPDATE member SET money = money-? WHERE member.designation='advisor'  AND member.club = ?";

  db.query(sql1, [money, club], (err, data) => {
    if (err) return res.send("Sorry! Couldn't add fund");

    db.query(sql2, [money, club], (err2, data2) => {
      if (err2) return res.send("Couldn't update fund");

      return res.send("Successfully funded for the event");
    });
  });
});

// Treasurer
// only funded club events
app.get("/fundedEvents/:club", (req, res) => {
  const { club } = req.params;
  const sql = "Select * from event WHERE club_name=?";

  db.query(sql, [club], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/volTaskStatus/:eventId", (req, res) => {
  const { eventId } = req.params;
  const sql =
    "SELECT v.*,m.name FROM volunteer v JOIN member m  ON m.email=v.email and m.club=v.club WHERE v.event_id=?";
  db.query(sql, [eventId], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/volTaskAssign", (req, res) => {
  const { event_id, email, club, money, task } = req.body;
  const sql1 =
    "UPDATE volunteer SET task = ?, money = ? WHERE volunteer.club = ? AND volunteer.email = ? AND volunteer.event_id = ?";
  const sql2 =
    "UPDATE member SET money = money-? WHERE member.designation='treasurer'  AND member.club = ?";

  db.query(sql1, [task, money, club, email, event_id], (err1, data1) => {
    if (err1) return res.send("Task couldn't be updated");

    db.query(sql2, [money, club], (err2, data2) => {
      if (err2) return res.send("Balance of treasurer couldn't be updated");

      return res.send("Task Assigned Successfully");
    });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}!`);
});
