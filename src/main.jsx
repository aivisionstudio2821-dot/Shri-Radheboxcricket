```jsx
import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  CalendarDays,
  Clock,
  MapPin,
  Menu,
  X,
  CheckCircle2,
  Trophy,
  Zap,
  Users,
  LogOut,
  Check,
  Trash2,
  Filter,
} from "lucide-react";
import "./index.css";

/* =========================================
   MAIN WEBSITE
========================================= */

function App() {
  const [menu, setMenu] = useState(false);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const [logoTaps, setLogoTaps] = useState(0);
  const [secretOpen, setSecretOpen] = useState(false);

  const slots = [
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",


  ];

  function handleLogoTap(e) {
    e.preventDefault();

    const next = logoTaps + 1;

    if (next >= 5) {
      setSecretOpen(true);
      setLogoTaps(0);
    } else {
      setLogoTaps(next);
    }
  }

  function bookSlot(e) {
    e.preventDefault();

    if (
      !date ||
      !slot ||
      !name.trim() ||
      !/^[6-9]\d{9}$/.test(mobile)
    ) {
      setMessage("Please enter valid booking details.");
      return;
    }

    const bookings = JSON.parse(
      localStorage.getItem("radheBookings") || "[]"
    );

    const exists = bookings.some(
      (b) =>
        b.date === date &&
        b.slot === slot &&
        b.status !== "Rejected"
    );

    if (exists) {
      setMessage(
        "This slot is already booked. Please select another."
      );
      return;
    }

    const booking = {
      id: Date.now(),
      name: name.trim(),
      mobile,
      date,
      slot,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    bookings.push(booking);

    localStorage.setItem(
      "radheBookings",
      JSON.stringify(bookings)
    );

    setMessage("Booking request submitted!");

    setName("");
    setMobile("");
    setSlot("");
  }

  return (
    <>
      {/* NAVBAR */}

      <nav className="navbar">
        <a
          href="#"
          className="logo"
          onClick={handleLogoTap}
        >
          <span className="logo-icon">R</span>
          RADHE <span>BOX CRICKET</span>
        </a>

        <div className={`nav-links ${menu ? "show" : ""}`}>
          <a href="#home" onClick={() => setMenu(false)}>
            Home
          </a>

          <a href="#about" onClick={() => setMenu(false)}>
            About
          </a>

          <a href="#facilities" onClick={() => setMenu(false)}>
            Facilities
          </a>

          <a href="#booking" onClick={() => setMenu(false)}>
            Booking
          </a>

          <a href="#contact" onClick={() => setMenu(false)}>
            Contact
          </a>
        </div>

        <a href="#booking" className="nav-btn">
          BOOK YOUR SLOT ↗
        </a>

        <button
          className="menu-btn"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </nav>

      {/* HERO */}

      <section className="hero" id="home">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="eyebrow">
            THE GAME STARTS HERE
          </p>

          <h1>
            YOUR GAME.
            <br />
            <span>YOUR GROUND.</span>
          </h1>

          <p className="hero-desc">
            Bring your squad. Own the pitch.
            Experience cricket like never before
            at Radhe Box Cricket.
          </p>

          <div className="hero-actions">
            <a href="#booking" className="primary-btn">
              BOOK A SLOT ↗
            </a>

            <a href="#about" className="outline-btn">
              EXPLORE MORE
            </a>
          </div>

          <div className="hero-bottom">
            <span>
              <MapPin size={16} />
              YOUR LOCAL CRICKET DESTINATION
            </span>

            <span>
              PLAY HARD. PLAY TOGETHER.
            </span>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="stats">
        <div>
          <strong>01</strong>
          <span>YOUR TURF</span>
        </div>

        <div>
          <strong>24/7</strong>
          <span>GAME SPIRIT</span>
        </div>

        <div>
          <strong>100%</strong>
          <span>CRICKET ENERGY</span>
        </div>
      </section>

      {/* ABOUT */}

      <section className="section about" id="about">
        <div className="section-tag">
          01 / ABOUT US
        </div>

        <div className="about-grid">
          <div>
            <h2>
              MORE THAN
              <br />
              JUST A <span>GAME.</span>
            </h2>
          </div>

          <div>
            <p>
              Radhe Box Cricket is where friends
              become teammates, competition gets
              exciting, and every match creates
              a memory. Get your squad together
              and step onto the pitch.
            </p>

            <a href="#booking" className="text-link">
              LET'S PLAY ↗
            </a>
          </div>
        </div>
      </section>

      {/* FACILITIES */}

      <section className="section facilities" id="facilities">
        <div className="section-tag">
          02 / THE EXPERIENCE
        </div>

        <h2>
          MADE FOR THE <span>GAME.</span>
        </h2>

        <div className="facility-grid">
          <div className="facility-card">
            <Trophy />

            <h3>
              COMPETITIVE CRICKET
            </h3>

            <p>
              Bring your best game and
              challenge your friends.
            </p>
          </div>

          <div className="facility-card">
            <Zap />

            <h3>
              NON-STOP ACTION
            </h3>

            <p>
              Enjoy exciting matches
              with your squad.
            </p>
          </div>

          <div className="facility-card">
            <Users />

            <h3>
              TEAM SPIRIT
            </h3>

            <p>
              Make memories, celebrate
              every boundary.
            </p>
          </div>
        </div>
      </section>

      {/* BOOKING */}

      <section className="booking section" id="booking">
        <div className="section-tag">
          03 / RESERVE YOUR GAME
        </div>

        <div className="booking-grid">
          <div>
            <h2>
              YOUR NEXT
              <br />
              <span>MATCH</span>
              <br />
              STARTS HERE.
            </h2>

            <p>
              Choose your date and
              preferred time slot.
            </p>

            <div className="booking-info">
              <p>
                <CalendarDays />
                Easy slot selection
              </p>

              <p>
                <Clock />
                Flexible match timings
              </p>

              <p>
                <CheckCircle2 />
                Pay at venue
              </p>
            </div>
          </div>

          <form
            className="booking-form"
            onSubmit={bookSlot}
          >
            <h3>
              BOOK YOUR SLOT
            </h3>

            <label>
              Your Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name"
              required
            />

            <label>
              Mobile Number
            </label>

            <input
              value={mobile}
              onChange={(e) =>
                setMobile(
                  e.target.value.replace(/\D/g, "")
                )
              }
              placeholder="10-digit mobile number"
              inputMode="numeric"
              maxLength="10"
              required
            />

            <label>
              Select Date
            </label>

            <input
              type="date"
              value={date}
              min={new Date().toLocaleDateString(
                "en-CA"
              )}
              onChange={(e) =>
                setDate(e.target.value)
              }
              required
            />

            <label>
              Select Time Slot
            </label>

            <div className="slots">
              {slots.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={
                    slot === s
                      ? "slot active"
                      : "slot"
                  }
                  onClick={() =>
                    setSlot(s)
                  }
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="demo-note">
              DEMO BOOKING · PAYMENT AT VENUE
            </p>

            <button
              className="primary-btn submit-btn"
              type="submit"
            >
              CONFIRM BOOKING ↗
            </button>

            {message && (
              <p className="message">
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* CONTACT */}

      <section className="contact section" id="contact">
        <div className="section-tag">
          04 / FIND US
        </div>

        <h2>
          READY TO <span>PLAY?</span>
        </h2>

        <p>
          Get your team together.
          The pitch is waiting.
        </p>

        <div className="contact-actions">
          <a
            href="https://www.instagram.com/radhe_box_cricket/"
            target="_blank"
            rel="noreferrer"
            className="outline-btn"
          >
            FOLLOW ON INSTAGRAM
          </a>
        </div>
      </section>

      {/* FOOTER */}

      <footer>
        <a
          href="#"
          className="logo"
          onClick={handleLogoTap}
        >
          <span className="logo-icon">R</span>
          RADHE <span>BOX CRICKET</span>
        </a>

        <p>
          © 2026 RADHE BOX CRICKET.
          ALL RIGHTS RESERVED.
        </p>

        <a href="#home">
          BACK TO TOP ↑
        </a>
      </footer>

      {/* SECRET GAME */}

      {secretOpen && (
        <SecretCricketMode
          onClose={() =>
            setSecretOpen(false)
          }
        />
      )}
    </>
  );
}

/* =========================================
   SECRET CRICKET MODE
========================================= */

function SecretCricketMode({ onClose }) {
  const [balls, setBalls] = useState(0);
  const [runs, setRuns] = useState(0);

  const [result, setResult] = useState(
    "WAIT FOR THE BALL..."
  );

  const [gameOver, setGameOver] =
    useState(false);

  const [ballPos, setBallPos] =
    useState(0);

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setBallPos((prev) => {
        const next = prev + 5;

        if (next >= 100) {
          setResult("❌ MISSED!");

          setBalls((b) => {
            const nextBall = b + 1;

            if (nextBall >= 6) {
              setGameOver(true);
            }

            return nextBall;
          });

          return 0;
        }

        return next;
      });
    }, 70);

    return () =>
      clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    function handleKey(e) {
      if (
        e.code === "Space" ||
        e.code === "Enter"
      ) {
        e.preventDefault();
        swing();
      }
    }

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  });

  function swing() {
    if (
      gameOver ||
      balls >= 6
    ) {
      return;
    }

    const pos = ballPos;

    let score = 0;

    if (
      pos >= 48 &&
      pos <= 58
    ) {
      score = 6;

      setResult(
        "🚀 PERFECT! SIX!"
      );
    } else if (
      pos >= 40 &&
      pos <= 66
    ) {
      score = 4;

      setResult(
        "🔥 GREAT SHOT! FOUR!"
      );
    } else if (
      pos >= 30 &&
      pos <= 75
    ) {
      score = 1;

      setResult(
        "🏃 1 RUN!"
      );
    } else {
      setResult(
        "💥 WICKET!"
      );
    }

    setRuns(
      (r) => r + score
    );

    setBalls((b) => {
      const nextBall = b + 1;

      if (nextBall >= 6) {
        setGameOver(true);
      }

      return nextBall;
    });

    setBallPos(0);
  }

  function replay() {
    setBalls(0);
    setRuns(0);
    setBallPos(0);
    setResult(
      "WAIT FOR THE BALL..."
    );
    setGameOver(false);
  }

  return (
    <div className="secret-overlay">
      <div className="secret-game">

        <button
          className="secret-close"
          onClick={onClose}
        >
          ✕
        </button>

        <p className="secret-tag">
          SHREE RADHE BOX CRICKET
        </p>

        <h2>
          SECRET{" "}
          <span>
            CRICKET MODE
          </span>
        </h2>

        <div className="secret-score">
          <strong>{runs}</strong>

          <span>RUNS</span>

          <p>
            {balls} / 6 BALLS
          </p>
        </div>

        {!gameOver && (
          <div className="pitch">

            <div className="ball-track">
              <div
                className="moving-ball"
                style={{
                  left: `${ballPos}%`,
                }}
              >
                🏏
              </div>
            </div>

            <div className="timing-zone">
              <span>
                PERFECT
              </span>
            </div>

          </div>
        )}

        <p className="secret-result">
          {result}
        </p>

        {!gameOver ? (
          <>
            <button
              className="secret-swing"
              onClick={swing}
            >
              🏏 SWING
            </button>

            <p className="keyboard-hint">
              PRESS <b>SPACE</b> OR{" "}
              <b>ENTER</b>
            </p>
          </>
        ) : (
          <>
            <h3>
              🏆 INNINGS COMPLETE!
            </h3>

            <p>
              FINAL SCORE
            </p>

            <h2>
              {runs} RUNS
            </h2>

            <button
              className="secret-swing"
              onClick={replay}
            >
              PLAY AGAIN ↻
            </button>
          </>
        )}

        <p className="secret-footer">
          ONLY THE CHAMPIONS FIND THIS.
        </p>

      </div>
    </div>
  );
}

/* =========================================
   ADMIN LOGIN
========================================= */

function Admin() {
  const [logged, setLogged] =
    useState(
      sessionStorage.getItem(
        "radheAdminLogged"
      ) === "true"
    );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [refresh, setRefresh] =
    useState(0);

  const bookings = JSON.parse(
    localStorage.getItem(
      "radheBookings"
    ) || "[]"
  );

  function login(e) {
    e.preventDefault();

    const valid =
      (
        email ===
          "owner@radhebox.demo" &&
        password ===
          "radhe123"
      ) ||
      (
        email ===
          "staff@radhebox.demo" &&
        password ===
          "staff123"
      );

    if (!valid) {
      alert(
        "Invalid login details."
      );
      return;
    }

    sessionStorage.setItem(
      "radheAdminLogged",
      "true"
    );

    setLogged(true);
  }

  function logout() {
    sessionStorage.removeItem(
      "radheAdminLogged"
    );

    setLogged(false);
  }

  function updateBooking(
    id,
    status
  ) {
    const updated =
      bookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status,
            }
          : booking
      );

    localStorage.setItem(
      "radheBookings",
      JSON.stringify(updated)
    );

    setRefresh(
      (value) => value + 1
    );
  }

  function deleteBooking(id) {
    const confirmDelete =
      window.confirm(
        "Delete this booking?"
      );

    if (!confirmDelete) return;

    const updated =
      bookings.filter(
        (booking) =>
          booking.id !== id
      );

    localStorage.setItem(
      "radheBookings",
      JSON.stringify(updated)
    );

    setRefresh(
      (value) => value + 1
    );
  }

  const stats = useMemo(() => {
    return {
      total: bookings.length,

      pending: bookings.filter(
        (b) =>
          b.status === "Pending"
      ).length,

      approved: bookings.filter(
        (b) =>
          b.status === "Approved"
      ).length,

      rejected: bookings.filter(
        (b) =>
          b.status === "Rejected"
      ).length,
    };
  }, [bookings, refresh]);

  const filteredBookings =
    filter === "All"
      ? bookings
      : bookings.filter(
          (b) =>
            b.status === filter
        );

  if (!logged) {
    return (
      <div className="admin-page">
        <form
          className="booking-form admin-login"
          onSubmit={login}
        >
          <div className="admin-brand">
            <span className="logo-icon">
              R
            </span>

            <div>
              <strong>
                RADHE
              </strong>

              <small>
                BOX CRICKET
              </small>
            </div>
          </div>

          <p className="section-tag">
            ADMIN ACCESS
          </p>

          <h2>
            OWNER
            <br />
            <span>DASHBOARD</span>
          </h2>

          <label>
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="Enter admin email"
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Enter password"
            required
          />

          <button
            className="primary-btn submit-btn"
            type="submit"
          >
            LOGIN ↗
          </button>

          <p className="demo-note">
            DEMO LOGIN
            <br />
            owner@radhebox.demo
            <br />
            radhe123
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">

      {/* HEADER */}

      <div className="admin-header">
        <div>
          <p className="section-tag">
            RADHE BOX CRICKET
          </p>

          <h2>
            ADMIN{" "}
            <span>
              DASHBOARD
            </span>
          </h2>
        </div>

        <button
          className="outline-btn"
          onClick={logout}
        >
          <LogOut size={16} />
          LOGOUT
        </button>
      </div>

      {/* STATS */}

      <div className="admin-stats">

        <div className="admin-stat">
          <span>
            TOTAL
          </span>

          <strong>
            {stats.total}
          </strong>

          <small>
            ALL BOOKINGS
          </small>
        </div>

        <div className="admin-stat pending">
          <span>
            PENDING
          </span>

          <strong>
            {stats.pending}
          </strong>

          <small>
            NEED ACTION
          </small>
        </div>

        <div className="admin-stat approved">
          <span>
            APPROVED
          </span>

          <strong>
            {stats.approved}
          </strong>

          <small>
            CONFIRMED
          </small>
        </div>

        <div className="admin-stat rejected">
          <span>
            REJECTED
          </span>

          <strong>
            {stats.rejected}
          </strong>

          <small>
            DECLINED
          </small>
        </div>

      </div>

      {/* BOOKINGS */}

      <div className="admin-section">

        <div className="admin-section-head">
          <div>
            <p className="section-tag">
              BOOKING MANAGEMENT
            </p>

            <h3>
              ALL BOOKINGS
            </h3>
          </div>

          <div className="admin-filter">
            <Filter size={15} />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value
                )
              }
            >
              <option value="All">
                All
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>
          </div>
        </div>

        {filteredBookings.length ===
        0 ? (
          <div className="admin-empty">
            <CalendarDays size={35} />

            <h3>
              NO BOOKINGS
            </h3>

            <p>
              There are no bookings
              in this category yet.
            </p>
          </div>
        ) : (
          <div className="admin-bookings">

            {filteredBookings
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.createdAt || 0) -
                  new Date(a.createdAt || 0)
              )
              .map((booking) => (
                <div
                  className="admin-booking"
                  key={booking.id}
                >

                  <div className="booking-main">

                    <div className="booking-avatar">
                      {booking.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h4>
                        {booking.name}
                      </h4>

                      <p>
                        📱 {booking.mobile}
                      </p>
                    </div>

                  </div>

                  <div className="booking-detail">
                    <span>
                      DATE
                    </span>

                    <strong>
                      {booking.date}
                    </strong>
                  </div>

                  <div className="booking-detail">
                    <span>
                      SLOT
                    </span>

                    <strong>
                      {booking.slot}
                    </strong>
                  </div>

                  <div className="booking-detail">
                    <span>
                      STATUS
                    </span>

                    <strong
                      className={`status-${booking.status.toLowerCase()}`}
                    >
                      {booking.status}
                    </strong>
                  </div>

                  <div className="admin-actions">

                    {booking.status ===
                      "Pending" && (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() =>
                            updateBooking(
                              booking.id,
                              "Approved"
                            )
                          }
                        >
                          <Check size={15} />
                          APPROVE
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() =>
                            updateBooking(
                              booking.id,
                              "Rejected"
                            )
                          }
                        >
                          REJECT
                        </button>
                      </>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteBooking(
                          booking.id
                        )
                      }
                      title="Delete booking"
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>

                </div>
              ))}

          </div>
        )}

      </div>

      {/* WARNING */}

      <div className="admin-notice">
        <strong>
          DEMO BOOKING SYSTEM
        </strong>

        <p>
          Bookings are currently stored
          in this browser's local storage.
          For a real multi-device booking
          system, connect Supabase/database
          later.
        </p>
      </div>

    </div>
  );
}

/* =========================================
   ROUTING
========================================= */

const isAdmin =
  window.location.pathname ===
  "/admin";

createRoot(
  document.getElementById("root")
).render(
  isAdmin ? (
    <Admin />
  ) : (
    <App />
  )
);
```

**Admin URL:**
`/admin`

Example:
`https://YOUR-VERCEL-DOMAIN.vercel.app/admin`

**Login:**

- Email: `owner@radhebox.demo`
- Password: `radhe123`

### CSS bhi add karna hai

`src/index.css` ke **bilkul end** mein ye paste kar:

```css
/* =========================================
   ADMIN DASHBOARD
========================================= */

.admin-page {
  min-height: 100vh;
  padding: 45px 6%;
  background: #070907;
  color: #fff;
}

.admin-page h2 span,
.admin-page h3 span {
  color: #b8f528;
}

.admin-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 35px;
}

.admin-brand strong {
  display: block;
  font-size: 18px;
  letter-spacing: 2px;
}

.admin-brand small {
  color: #899080;
  font-size: 9px;
  letter-spacing: 2px;
}

.admin-login {
  max-width: 470px;
  margin: 8vh auto;
}

.admin-login h2 {
  font-size: 42px;
  margin: 12px 0 30px;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 35px;
}

.admin-header h2 {
  margin: 5px 0;
  font-size: 42px;
}

.admin-header .outline-btn,
.admin-actions button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
}

.admin-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 45px;
}

.admin-stat {
  background: #10140f;
  border: 1px solid #222a20;
  border-radius: 14px;
  padding: 24px;
}

.admin-stat span {
  display: block;
  color: #8f9788;
  font-size: 10px;
  letter-spacing: 2px;
  font-weight: 800;
}

.admin-stat strong {
  display: block;
  color: #b8f528;
  font-size: 48px;
  margin: 5px 0;
}

.admin-stat small {
  color: #656d60;
  font-size: 9px;
  letter-spacing: 1px;
}

.admin-stat.pending strong {
  color: #e7b85b;
}

.admin-stat.approved strong {
  color: #7dff9a;
}

.admin-stat.rejected strong {
  color: #ff7070;
}

.admin-section {
  background: #0b0e0b;
  border: 1px solid #20261e;
  border-radius: 18px;
  padding: 28px;
}

.admin-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
}

.admin-section-head h3 {
  margin: 5px 0 0;
  font-size: 24px;
}

.admin-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #30382d;
  padding: 8px 12px;
  border-radius: 8px;
}

.admin-filter select {
  background: transparent;
  border: 0;
  color: #fff;
  outline: none;
}

.admin-filter option {
  background: #10140f;
  color: #fff;
}

.admin-bookings {
  display: grid;
  gap: 12px;
}

.admin-booking {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr auto;
  align-items: center;
  gap: 18px;
  padding: 18px;
  background: #111610;
  border: 1px solid #252d22;
  border-radius: 12px;
}

.booking-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.booking-avatar {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #b8f528;
  color: #080a07;
  font-weight: 900;
}

.booking-main h4 {
  margin: 0 0 5px;
  font-size: 15px;
}

.booking-main p {
  margin: 0;
  color: #858d80;
  font-size: 11px;
}

.booking-detail span {
  display: block;
  color: #626b5d;
  font-size: 8px;
  letter-spacing: 1.5px;
  margin-bottom: 5px;
}

.booking-detail strong {
  font-size: 12px;
}

.status-pending {
  color: #e7b85b;
}

.status-approved {
  color: #7dff9a;
}

.status-rejected {
  color: #ff7070;
}

.admin-actions {
  display: flex;
  gap: 7px;
}

.admin-actions button {
  min-height: 34px;
  border: 0;
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 9px;
  font-weight: 900;
  cursor: pointer;
}

.approve-btn {
  background: #b8f528;
  color: #070907;
}

.reject-btn {
  background: #3a241f;
  color: #ff8c7d;
}

.delete-btn {
  background: #20241e;
  color: #aaa;
}

.admin-empty {
  text-align: center;
  padding: 65px 20px;
  color: #70786c;
}

.admin-empty svg {
  color: #b8f528;
  margin-bottom: 10px;
}

.admin-empty h3 {
  color: #fff;
  margin: 5px;
}

.admin-empty p {
  font-size: 12px;
}

.admin-notice {
  margin-top: 20px;
  padding: 16px 18px;
  border-left: 3px solid #e7b85b;
  background: #12120d;
}

.admin-notice strong {
  color: #e7b85b;
  font-size: 11px;
  letter-spacing: 1px;
}

.admin-notice p {
  color: #858d80;
  font-size: 11px;
  line-height: 1.6;
  margin-bottom: 0;
}

/* =========================================
   SECRET CRICKET MODE
========================================= */

.secret-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: radial-gradient(
    circle,
    #1b2b13,
    #050705 75%
  );
  display: grid;
  place-items: center;
  padding: 18px;
}

.secret-game {
  width: 100%;
  max-width: 430px;
  position: relative;
  text-align: center;
  padding: 35px 22px;
  background: #10160e;
  border: 1px solid #b8f528;
  box-shadow: 0 0 45px #b8f52830;
  border-radius: 18px;
  color: white;
}

.secret-close {
  position: absolute;
  right: 15px;
  top: 12px;
  background: transparent;
  border: 0;
  color: white;
  font-size: 23px;
  cursor: pointer;
}

.secret-tag,
.secret-footer {
  color: #b8f528;
  font-size: 10px;
  letter-spacing: 3px;
  font-weight: 900;
}

.secret-game h2 {
  font-size: 34px;
  margin: 22px 0;
}

.secret-game h2 span {
  color: #b8f528;
}

.secret-score {
  background: #1b2517;
  padding: 18px;
  border-radius: 12px;
}

.secret-score strong {
  display: block;
  font-size: 65px;
  color: #b8f528;
}

.secret-score span,
.secret-score p {
  font-size: 11px;
  letter-spacing: 2px;
  color: #b8bdae;
}

.pitch {
  position: relative;
  height: 90px;
  margin: 20px 0;
  overflow: hidden;
}

.ball-track {
  position: absolute;
  left: 5%;
  right: 5%;
  top: 42px;
  height: 4px;
  background: #343b31;
  border-radius: 10px;
}

.moving-ball {
  position: absolute;
  top: -25px;
  transform: translateX(-50%);
  font-size: 38px;
  transition: left 0.05s linear;
}

.timing-zone {
  position: absolute;
  left: 48%;
  width: 10%;
  height: 65px;
  top: 10px;
  border: 2px solid #b8f528;
  border-radius: 8px;
  background: #b8f52818;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.timing-zone span {
  font-size: 7px;
  color: #b8f528;
  font-weight: 900;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.secret-result {
  min-height: 28px;
  color: #b8f528;
  font-weight: 900;
}

.secret-swing {
  width: 100%;
  padding: 17px;
  background: #b8f528;
  color: #090b09;
  border: 0;
  border-radius: 8px;
  font-weight: 900;
  letter-spacing: 1px;
  margin-top: 12px;
  cursor: pointer;
}

.keyboard-hint {
  font-size: 10px;
  color: #929989;
  letter-spacing: 1px;
  margin-top: 12px;
}

.secret-footer {
  color: #929989;
  margin-top: 25px;
}

/* =========================================
   MOBILE ADMIN
========================================= */

@media (max-width: 800px) {
  .admin-page {
    padding: 28px 16px;
  }

  .admin-header {
    align-items: flex-start;
  }

  .admin-header h2 {
    font-size: 30px;
  }

  .admin-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .admin-stat {
    padding: 18px;
  }

  .admin-stat strong {
    font-size: 38px;
  }

  .admin-section {
    padding: 18px 12px;
  }

  .admin-section-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .admin-booking {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .booking-main {
    grid-column: 1 / -1;
  }

  .admin-actions {
    grid-column: 1 / -1;
  }

  .admin-actions button {
    flex: 1;
  }
}

@media (max-width: 500px) {
  .admin-stats {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .admin-stat {
    padding: 14px;
  }

  .admin-stat strong {
    font-size: 32px;
  }

  .admin-booking {
    grid-template-columns: 1fr;
  }

  .booking-detail {
    padding-top: 5px;
    border-top: 1px solid #222a20;
  }

  .admin-actions {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
  }

  .admin-header .outline-btn {
    padding: 10px;
    font-size: 9px;
  }

  .admin-login h2 {
    font-size: 34px;
  }

  .secret-game {
    padding: 30px 17px;
  }

  .secret-game h2 {
    font-size: 27px;
  }
}

