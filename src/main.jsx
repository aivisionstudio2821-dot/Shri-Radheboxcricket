import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  CalendarDays, Clock, MapPin, Phone,
  Menu, X, CheckCircle2, Trophy, Zap, Users
} from "lucide-react";
import "./index.css";

function App() {
  const [menu, setMenu] = useState(false);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const slots = [
    "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM",
    "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM", "6:00 PM",
    "7:00 PM", "8:00 PM", "9:00 PM",
    "10:00 PM"
  ];

  function bookSlot(e) {
    e.preventDefault();

    if (!date || !slot || !name.trim() || !/^[6-9]\d{9}$/.test(mobile)) {
      setMessage("Please enter valid booking details.");
      return;
    }

    const bookings = JSON.parse(localStorage.getItem("radheBookings") || "[]");

    const exists = bookings.some(
      b => b.date === date && b.slot === slot && b.status !== "Rejected"
    );

    if (exists) {
      setMessage("This slot is already booked. Please select another.");
      return;
    }

    const booking = {
      id: Date.now(),
      name,
      mobile,
      date,
      slot,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    bookings.push(booking);
    localStorage.setItem("radheBookings", JSON.stringify(bookings));

    setMessage("Booking request submitted! Please confirm with the venue.");
    setName("");
    setMobile("");
    setSlot("");
  }

  return (
    <>
      <nav className="navbar">
        <a href="#" className="logo">
          <span className="logo-icon">R</span>
          RADHE <span>BOX CRICKET</span>
        </a>

        <div className={`nav-links ${menu ? "show" : ""}`}>
          <a href="#home" onClick={() => setMenu(false)}>Home</a>
          <a href="#about" onClick={() => setMenu(false)}>About</a>
          <a href="#facilities" onClick={() => setMenu(false)}>Facilities</a>
          <a href="#booking" onClick={() => setMenu(false)}>Booking</a>
          <a href="#contact" onClick={() => setMenu(false)}>Contact</a>
        </div>

        <a href="#booking" className="nav-btn">BOOK YOUR SLOT ↗</a>
        <button className="menu-btn" onClick={() => setMenu(!menu)}>
          {menu ? <X /> : <Menu />}
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="eyebrow">THE GAME STARTS HERE</p>
          <h1>YOUR GAME.<br /><span>YOUR GROUND.</span></h1>
          <p className="hero-desc">
            Bring your squad. Own the pitch. Experience cricket
            like never before at Radhe Box Cricket.
          </p>
          <div className="hero-actions">
            <a href="#booking" className="primary-btn">BOOK A SLOT ↗</a>
            <a href="#about" className="outline-btn">EXPLORE MORE</a>
          </div>
          <div className="hero-bottom">
            <span><MapPin size={16} /> YOUR LOCAL CRICKET DESTINATION</span>
            <span>PLAY HARD. PLAY TOGETHER.</span>
          </div>
        </div>
      </section>

      <section className="stats">
        <div><strong>01</strong><span>YOUR TURF</span></div>
        <div><strong>24/7</strong><span>GAME SPIRIT</span></div>
        <div><strong>100%</strong><span>CRICKET ENERGY</span></div>
      </section>

      <section className="section about" id="about">
        <div className="section-tag">01 / ABOUT US</div>
        <div className="about-grid">
          <div>
            <h2>MORE THAN<br />JUST A <span>GAME.</span></h2>
          </div>
          <div>
            <p>
              Radhe Box Cricket is where friends become teammates,
              competition gets exciting, and every match creates
              a memory. Get your squad together and step onto the pitch.
            </p>
            <a href="#booking" className="text-link">LET'S PLAY ↗</a>
          </div>
        </div>
      </section>

      <section className="section facilities" id="facilities">
        <div className="section-tag">02 / THE EXPERIENCE</div>
        <h2>MADE FOR THE <span>GAME.</span></h2>
        <div className="facility-grid">
          <div className="facility-card">
            <Trophy />
            <h3>COMPETITIVE CRICKET</h3>
            <p>Bring your best game and challenge your friends.</p>
          </div>
          <div className="facility-card">
            <Zap />
            <h3>NON-STOP ACTION</h3>
            <p>Enjoy exciting matches with your squad.</p>
          </div>
          <div className="facility-card">
            <Users />
            <h3>TEAM SPIRIT</h3>
            <p>Make memories, celebrate every boundary.</p>
          </div>
        </div>
      </section>

      <section className="booking section" id="booking">
        <div className="section-tag">03 / RESERVE YOUR GAME</div>
        <div className="booking-grid">
          <div>
            <h2>YOUR NEXT<br /><span>MATCH</span><br />STARTS HERE.</h2>
            <p>Choose your date and preferred time slot.</p>
            <div className="booking-info">
              <p><CalendarDays /> Easy slot selection</p>
              <p><Clock /> Flexible match timings</p>
              <p><CheckCircle2 /> Pay at venue</p>
            </div>
          </div>

          <form className="booking-form" onSubmit={bookSlot}>
            <h3>BOOK YOUR SLOT</h3>
            <label>Your Name</label>
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="Enter your name" required />

            <label>Mobile Number</label>
            <input value={mobile} onChange={e => setMobile(e.target.value)}
              placeholder="10-digit mobile number" inputMode="numeric"
              maxLength="10" required />

            <label>Select Date</label>
            <input type="date" value={date}
              min={new Date().toLocaleDateString("en-CA")}
              onChange={e => setDate(e.target.value)} required />

            <label>Select Time Slot</label>
            <div className="slots">
              {slots.map(s => (
                <button type="button" key={s}
                  className={slot === s ? "slot active" : "slot"}
                  onClick={() => setSlot(s)}>{s}</button>
              ))}
            </div>

            <p className="demo-note">DEMO BOOKING · PAYMENT AT VENUE</p>
            <button className="primary-btn submit-btn" type="submit">
              CONFIRM BOOKING ↗
            </button>

            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="section-tag">04 / FIND US</div>
        <h2>READY TO <span>PLAY?</span></h2>
        <p>Get your team together. The pitch is waiting.</p>
        <div className="contact-actions">
          <a href="https://www.instagram.com/radhe_box_cricket/"
            target="_blank" rel="noreferrer" className="outline-btn">
          <svg width="18" height="18" viewBox="0 0 24 24"
  fill="none" stroke="currentColor" strokeWidth="2"
  strokeLinecap="round" strokeLinejoin="round">
  <rect x="3" y="3" width="18" height="18" rx="5" />
  <circle cx="12" cy="12" r="4" />
  <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
</svg>
FOLLOW ON INSTAGRAM
          </a>
        </div>
      </section>

      <footer>
        <a href="#" className="logo">
          <span className="logo-icon">R</span>
          RADHE <span>BOX CRICKET</span>
        </a>
        <p>© 2026 RADHE BOX CRICKET. ALL RIGHTS RESERVED.</p>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </>
  );
}

function Admin() {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refresh, setRefresh] = useState(0);

  const bookings = JSON.parse(localStorage.getItem("radheBookings") || "[]");

  function updateBooking(id, status) {
    const updated = bookings.map(b => b.id === id ? {...b, status} : b);
    localStorage.setItem("radheBookings", JSON.stringify(updated));
    setRefresh(refresh + 1);
  }

  if (!logged) {
    return (
      <div className="admin-page">
        <form className="booking-form admin-login" onSubmit={e => {
          e.preventDefault();
          if (
            (email === "owner@radhebox.demo" && password === "radhe123") ||
            (email === "staff@radhebox.demo" && password === "staff123")
          ) setLogged(true);
          else alert("Invalid demo login");
        }}>
          <h2>RADHE ADMIN</h2>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password}
            onChange={e => setPassword(e.target.value)} />
          <button className="primary-btn submit-btn">LOGIN ↗</button>
          <p className="demo-note">DEMO: owner@radhebox.demo / radhe123</p>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>RADHE <span>ADMIN</span></h2>
        <button className="outline-btn" onClick={() => setLogged(false)}>LOGOUT</button>
      </div>
      <h3>BOOKING MANAGEMENT</h3>
      <p>Total bookings: {bookings.length}</p>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map(b => (
        <div className="admin-booking" key={b.id}>
          <strong>{b.name}</strong>
          <p>{b.mobile} · {b.date} · {b.slot}</p>
          <p>Status: {b.status}</p>
          {b.status === "Pending" && <>
            <button onClick={() => updateBooking(b.id, "Approved")}>Approve</button>
            <button onClick={() => updateBooking(b.id, "Rejected")}>Reject</button>
          </>}
        </div>
      ))}
    </div>
  );
}

const isAdmin = window.location.pathname === "/admin";
createRoot(document.getElementById("root")).render(
  isAdmin ? <Admin /> : <App />
);
