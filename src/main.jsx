import React, { useEffect, useState } from "react";
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

const BOOKING_KEY = "radheBookings";
const ADMIN_KEY = "radheAdminLogged";

function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(BOOKING_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveBookings(bookings) {
  localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings));
}

function SecretCricketMode({ onClose }) {
  const [ball, setBall] = useState(0);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);
  const [score, setScore] = useState(0);
  const [balls, setBalls] = useState([]);
  const [playing, setPlaying] = useState(true);
  const [message, setMessage] = useState("TIME YOUR SHOT!");
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setPosition((prev) => {
        let next = prev + direction * 2.2;

        if (next >= 100) {
          next = 100;
          setDirection(-1);
        }

        if (next <= 0) {
          next = 0;
          setDirection(1);
        }

        return next;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [playing, direction]);

  const swing = () => {
    if (!playing) return;

    let runs = 0;

    if (position >= 48 && position <= 58) {
      runs = 6;
    } else if (position >= 40 && position <= 66) {
      runs = 4;
    } else if (position >= 30 && position <= 75) {
      runs = 1;
    }

    const newBalls = [
      ...balls,
      {
        ball: ball + 1,
        runs,
      },
    ];

    setBalls(newBalls);
    setScore((prev) => prev + runs);

    if (runs === 6) {
      setMessage("SIX! 🔥");
      setResult("+6");
    } else if (runs === 4) {
      setMessage("FOUR! ⚡");
      setResult("+4");
    } else if (runs === 1) {
      setMessage("ONE RUN");
      setResult("+1");
    } else {
      setMessage("BOWLED! 😵");
      setResult("W");
    }

    if (ball >= 5) {
      setPlaying(false);
    } else {
      setBall((prev) => prev + 1);
      setPosition(0);
      setDirection(1);
    }
  };

  const replay = () => {
    setBall(0);
    setPosition(0);
    setDirection(1);
    setScore(0);
    setBalls([]);
    setPlaying(true);
    setMessage("TIME YOUR SHOT!");
    setResult("");
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
        swing();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  });

  return (
    <div className="secret-overlay">
      <div className="secret-game">
        <button className="secret-close" onClick={onClose}>
          <X size={22} />
        </button>

        <div className="secret-tag">RADHE SECRET MODE</div>

        <h2>CRICKET CHALLENGE</h2>

        <div className="secret-score">
          <span>SCORE</span>
          <strong>{score}</strong>
        </div>

        <div className="secret-result">
          <span>{message}</span>
          {result && <strong>{result}</strong>}
        </div>

        <div className="pitch">
          <div className="ball-track">
            <div
              className="moving-ball"
              style={{ left: `${position}%` }}
            />
            <div
              className="timing-zone"
              style={{
                left: "48%",
                width: "10%",
              }}
            />
          </div>
        </div>

        <button
          className="secret-swing"
          onClick={swing}
          disabled={!playing}
        >
          {playing ? "SWING" : "INNINGS OVER"}
        </button>

        <div className="keyboard-hint">
          Press <b>SPACE</b> or <b>ENTER</b> to swing
        </div>

        <div className="secret-footer">
          Ball {Math.min(ball + 1, 6)} / 6
        </div>

        {!playing && (
          <button className="approve-btn" onClick={replay}>
            PLAY AGAIN
          </button>
        )}
      </div>
    </div>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [logoTaps, setLogoTaps] = useState(0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    slot: "",
    players: "",
  });

  const [bookingMessage, setBookingMessage] = useState("");

  const handleLogoTap = (event) => {
    event.preventDefault();

    const next = logoTaps + 1;
    setLogoTaps(next);

    if (next >= 5) {
      setShowSecret(true);
      setLogoTaps(0);
    }

    setTimeout(() => {
      setLogoTaps(0);
    }, 1800);
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleBooking = (event) => {
    event.preventDefault();

    if (!form.name || !form.phone || !form.date || !form.slot) {
      setBookingMessage("Please fill all required details.");
      return;
    }

    const bookings = getBookings();

    const duplicate = bookings.some(
      (booking) =>
        booking.date === form.date &&
        booking.slot === form.slot &&
        booking.status !== "Rejected"
    );

    if (duplicate) {
      setBookingMessage(
        "This slot is already booked. Please select another slot."
      );
      return;
    }

    const newBooking = {
      id: Date.now(),
      ...form,
      players: form.players || "Not specified",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    saveBookings([...bookings, newBooking]);

    setForm({
      name: "",
      phone: "",
      date: "",
      slot: "",
      players: "",
    });

    setBookingMessage(
      "Booking request submitted! We will confirm your slot shortly."
    );
  };

  return (
    <>
      <header className="navbar">
        <a href="#home" className="logo" onClick={handleLogoTap}>
          <span className="logo-icon">R</span>
          RADHE <span>BOX CRICKET</span>
        </a>

        <button
          className="menu-btn"
          onClick={() => setMenu(!menu)}
          aria-label="Menu"
        >
          {menu ? <X size={25} /> : <Menu size={25} />}
        </button>

        <nav className={`nav-links ${menu ? "show" : ""}`}>
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
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="hero-tag">
              <Zap size={16} />
              PREMIUM BOX CRICKET
            </div>

            <h1>
              PLAY HARD.
              <br />
              <span>PLAY RADHE.</span>
            </h1>

            <p>
              Ahmedabad's spot for fast-paced box cricket, competitive
              matches and unforgettable games.
            </p>

            <div className="hero-buttons">
              <a href="#booking" className="primary-btn">
                BOOK YOUR SLOT
                <CalendarDays size={18} />
              </a>

              <a href="#facilities" className="secondary-btn">
                EXPLORE GROUND
              </a>
            </div>
          </div>
        </section>

        <section className="stats">
          <div>
            <strong>6+</strong>
            <span>Players / Side</span>
          </div>
          <div>
            <strong>365</strong>
            <span>Days Open</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Cricket Energy</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Booking Requests</span>
          </div>
        </section>

        <section className="about section" id="about">
          <div className="section-label">01 — ABOUT</div>

          <div className="section-grid">
            <div>
              <h2>
                MORE THAN
                <br />
                JUST A GAME.
              </h2>
            </div>

            <div>
              <p className="large-text">
                Radhe Box Cricket is built for players who love the thrill of
                the game. Fast pitches, competitive matches and a ground
                designed for your squad.
              </p>

              <p>
                Bring your friends, build your team and book your preferred
                time slot. Whether it is a weekend match or a serious
                tournament, Radhe is ready.
              </p>
            </div>
          </div>
        </section>

        <section className="facilities section" id="facilities">
          <div className="section-label">02 — FACILITIES</div>

          <div className="section-heading">
            <h2>BUILT FOR THE GAME.</h2>
          </div>

          <div className="facility-grid">
            <div className="facility-card">
              <Trophy size={32} />
              <h3>BOX CRICKET</h3>
              <p>
                Fast-paced enclosed cricket setup for competitive matches.
              </p>
            </div>

            <div className="facility-card">
              <Zap size={32} />
              <h3>HIGH ENERGY</h3>
              <p>
                Perfect environment for your squad, tournaments and practice.
              </p>
            </div>

            <div className="facility-card">
              <Users size={32} />
              <h3>TEAM PLAY</h3>
              <p>
                Bring your friends and create your own match-day experience.
              </p>
            </div>

            <div className="facility-card">
              <Clock size={32} />
              <h3>FLEXIBLE SLOTS</h3>
              <p>
                Choose a convenient date and time and send your booking
                request.
              </p>
            </div>
          </div>
        </section>

        <section className="booking section" id="booking">
          <div className="section-label">03 — BOOKING</div>

          <div className="section-grid">
            <div>
              <h2>
                YOUR NEXT
                <br />
                MATCH STARTS
                <br />
                HERE.
              </h2>

              <p>
                Fill in your details and send a booking request. Our team can
                confirm the availability of your selected slot.
              </p>
            </div>

            <form className="booking-form" onSubmit={handleBooking}>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={form.name}
                onChange={handleChange}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={handleChange}
              />

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />

              <select
                name="slot"
                value={form.slot}
                onChange={handleChange}
              >
                <option value="">Select Slot *</option>
                <option value="06:00 AM - 07:00 AM">
                  06:00 AM - 07:00 AM
                </option>
                <option value="07:00 AM - 08:00 AM">
                  07:00 AM - 08:00 AM
                </option>
                <option value="08:00 AM - 09:00 AM">
                  08:00 AM - 09:00 AM
                </option>
                <option value="05:00 PM - 06:00 PM">
                  05:00 PM - 06:00 PM
                </option>
                <option value="06:00 PM - 07:00 PM">
                  06:00 PM - 07:00 PM
                </option>
                <option value="07:00 PM - 08:00 PM">
                  07:00 PM - 08:00 PM
                </option>
                <option value="08:00 PM - 09:00 PM">
                  08:00 PM - 09:00 PM
                </option>
                <option value="09:00 PM - 10:00 PM">
                  09:00 PM - 10:00 PM
                </option>
              </select>

              <input
                type="number"
                name="players"
                placeholder="Number of Players"
                min="1"
                max="30"
                value={form.players}
                onChange={handleChange}
              />

              <button type="submit" className="primary-btn form-btn">
                SEND BOOKING REQUEST
                <CheckCircle2 size={18} />
              </button>

              {bookingMessage && (
                <div className="booking-message">
                  {bookingMessage}
                </div>
              )}
            </form>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="section-label">04 — CONTACT</div>

          <div className="contact-grid">
            <div>
              <h2>LET'S PLAY.</h2>
              <p>
                Ready to book your match? Get in touch with the Radhe team.
              </p>
            </div>

            <div className="contact-info">
              <div>
                <MapPin size={22} />
                <span>Ahmedabad, Gujarat</span>
              </div>

              <div>
                <Clock size={22} />
                <span>Open daily</span>
              </div>

              <a
                href="https://www.instagram.com/radhe_box_cricket/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram @radhe_box_cricket
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="logo">
          <span className="logo-icon">R</span>
          RADHE <span>BOX CRICKET</span>
        </div>

        <p>© {new Date().getFullYear()} Radhe Box Cricket. All rights reserved.</p>
      </footer>

      {showSecret && (
        <SecretCricketMode onClose={() => setShowSecret(false)} />
      )}
    </>
  );
}

function Admin() {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem(ADMIN_KEY) === "true"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [filter, setFilter] = useState("All");

  const bookings = getBookings().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    approved: bookings.filter((b) => b.status === "Approved").length,
    rejected: bookings.filter((b) => b.status === "Rejected").length,
  };

  const filteredBookings =
    filter === "All"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  const login = (event) => {
    event.preventDefault();

    const valid =
      (email === "owner@radhebox.demo" && password === "radhe123") ||
      (email === "staff@radhebox.demo" && password === "staff123");

    if (!valid) {
      alert("Invalid email or password.");
      return;
    }

    sessionStorage.setItem(ADMIN_KEY, "true");
    setLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    setLoggedIn(false);
  };

  const updateStatus = (id, status) => {
    const updated = getBookings().map((booking) =>
      booking.id === id ? { ...booking, status } : booking
    );

    saveBookings(updated);
    setRefresh((value) => value + 1);
  };

  const deleteBooking = (id) => {
    if (!window.confirm("Delete this booking?")) return;

    const updated = getBookings().filter((booking) => booking.id !== id);

    saveBookings(updated);
    setRefresh((value) => value + 1);
  };

  if (!loggedIn) {
    return (
      <div className="admin-page">
        <div className="admin-login">
          <div className="admin-brand">
            <span className="logo-icon">R</span>
            RADHE ADMIN
          </div>

          <h1>Admin Login</h1>
          <p>Manage your box cricket booking requests.</p>

          <form onSubmit={login}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button className="primary-btn" type="submit">
              LOGIN
            </button>
          </form>

          <small>
            Demo: owner@radhebox.demo / radhe123
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <div className="admin-brand">
            <span className="logo-icon">R</span>
            RADHE ADMIN
          </div>
          <p>Booking Management Dashboard</p>
        </div>

        <button className="secondary-btn" onClick={logout}>
          <LogOut size={17} />
          Logout
        </button>
      </header>

      <main className="admin-content">
        <div className="admin-stats">
          <div className="admin-stat">
            <span>Total</span>
            <strong>{stats.total}</strong>
          </div>

          <div className="admin-stat">
            <span>Pending</span>
            <strong>{stats.pending}</strong>
          </div>

          <div className="admin-stat">
            <span>Approved</span>
            <strong>{stats.approved}</strong>
          </div>

          <div className="admin-stat">
            <span>Rejected</span>
            <strong>{stats.rejected}</strong>
          </div>
        </div>

        <section className="admin-section">
          <div className="admin-section-head">
            <div>
              <h2>Booking Requests</h2>
              <p>Review and manage customer bookings.</p>
            </div>

            <div className="admin-filter">
              <Filter size={16} />

              {["All", "Pending", "Approved", "Rejected"].map((item) => (
                <button
                  key={item}
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="admin-empty">
              <CalendarDays size={35} />
              <h3>No bookings found</h3>
              <p>New booking requests will appear here.</p>
            </div>
          ) : (
            <div className="booking-list">
              {filteredBookings.map((booking) => (
                <div className="admin-booking" key={booking.id}>
                  <div className="booking-avatar">
                    {booking.name?.charAt(0)?.toUpperCase() || "R"}
                  </div>

                  <div className="booking-main">
                    <div className="booking-detail">
                      <h3>{booking.name}</h3>

                      <span
                        className={`booking-status ${booking.status.toLowerCase()}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="booking-meta">
                      <span>
                        <CalendarDays size={15} />
                        {booking.date}
                      </span>

                      <span>
                        <Clock size={15} />
                        {booking.slot}
                      </span>

                      <span>
                        <Users size={15} />
                        {booking.players} players
                      </span>

                      <span>{booking.phone}</span>
                    </div>
                  </div>

                  <div className="admin-actions">
                    {booking.status !== "Approved" && (
                      <button
                        className="approve-btn"
                        onClick={() =>
                          updateStatus(booking.id, "Approved")
                        }
                        title="Approve"
                      >
                        <Check size={17} />
                      </button>
                    )}

                    {booking.status !== "Rejected" && (
                      <button
                        className="reject-btn"
                        onClick={() =>
                          updateStatus(booking.id, "Rejected")
                        }
                        title="Reject"
                      >
                        <X size={17} />
                      </button>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => deleteBooking(booking.id)}
                      title="Delete"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="admin-notice">
          <strong>Demo booking system:</strong> bookings are currently stored
          in this browser's localStorage. A real shared admin system will
          require a backend/database such as Supabase.
        </div>
      </main>
    </div>
  );
}

const isAdmin = window.location.pathname === "/admin";

createRoot(document.getElementById("root")).render(
  isAdmin ? <Admin /> : <App />
);
