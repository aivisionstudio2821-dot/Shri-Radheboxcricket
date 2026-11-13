
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  CalendarDays, Clock, MapPin, Menu, X,
  CheckCircle2, Trophy, Zap, Users
} from "lucide-react";
import "./index.css";

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
    "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM",
    "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM", "6:00 PM",
    "7:00 PM", "8:00 PM", "9:00 PM",
    "10:00 PM"
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

    if (!date || !slot || !name.trim() ||
        !/^[6-9]\d{9}$/.test(mobile)) {
      setMessage("Please enter valid booking details.");
      return;
    }

    const bookings = JSON.parse(
      localStorage.getItem("radheBookings") || "[]"
    );

    const exists = bookings.some(
      b => b.date === date &&
      b.slot === slot &&
      b.status !== "Rejected"
    );

    if (exists) {
      setMessage("This slot is already booked. Select another.");
      return;
    }

    bookings.push({
      id: Date.now(),
      name,
      mobile,
      date,
      slot,
      status: "Pending",
      createdAt: new Date().toISOString()
    });

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
      <nav className="navbar">
        <a href="#" className="logo" onClick={handleLogoTap}>
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
            <input value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name" required />

            <label>Mobile Number</label>
            <input value={mobile}
              onChange={e => setMobile(e.target.value)}
              placeholder="10-digit mobile number"
              inputMode="numeric" maxLength="10" required />

            <label>Select Date</label>
            <input type="date" value={date}
              min={new Date().toLocaleDateString("en-CA")}
              onChange={e => setDate(e.target.value)} required />

            <label>Select Time Slot</label>
            <div className="slots">
              {slots.map(s => (
                <button type="button" key={s}
                  className={slot === s ? "slot active" : "slot"}
                  onClick={() => setSlot(s)}>
                  {s}
                </button>
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
            FOLLOW ON INSTAGRAM
          </a>
        </div>
      </section>

      <footer>
        <a href="#" className="logo" onClick={handleLogoTap}>
          <span className="logo-icon">R</span>
          RADHE <span>BOX CRICKET</span>
        </a>
        <p>© 2026 RADHE BOX CRICKET. ALL RIGHTS RESERVED.</p>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>

      {secretOpen && (
        <SecretCricketMode
          onClose={() => setSecretOpen(false)}
        />
      )}
    </>
  );
}

function SecretCricketMode({ onClose }) {
  const [balls, setBalls] = useState(0);
  const [runs, setRuns] = useState(0);
  const [result, setResult] = useState("READY TO BAT?");
  const [gameOver, setGameOver] = useState(false);

  function swing() {
    if (gameOver) return;

    const outcomes = [0, 1, 2, 4, 6, "WICKET"];
    const hit = outcomes[Math.floor(Math.random() * outcomes.length)];

    if (hit === "WICKET") {
      setResult("💥 BOWLED! WICKET!");
    } else {
      setRuns(prev => prev + hit);
      setResult(
        hit === 6 ? "🚀 SIX! OUT OF THE PARK!" :
        hit === 4 ? "🔥 FOUR! WHAT A SHOT!" :
        hit === 0 ? "DOT BALL!" : `${hit} RUN!`
      );
    }

    const nextBalls = balls + 1;
    setBalls(nextBalls);

    if (nextBalls === 6) setGameOver(true);
  }

  function replay() {
    setBalls(0);
    setRuns(0);
    setResult("READY TO BAT?");
    setGameOver(false);
  }

  return (
    <div className="secret-overlay">
      <div className="secret-game">
        <button className="secret-close" onClick={onClose}>✕</button>

        <p className="secret-tag">SHREE RADHE BOX CRICKET</p>
        <h2>SECRET <span>CRICKET MODE</span></h2>

        <div className="secret-score">
          <strong>{runs}</strong>
          <span>RUNS</span>
          <p>{balls} / 6 BALLS</p>
        </div>

        <div className="secret-ball">🏏</div>
        <p className="secret-result">{result}</p>

        {!gameOver ? (
          <button className="secret-swing" onClick={swing}>
            SWING THE BAT ⚡
          </button>
        ) : (
          <>
            <h3>INNINGS COMPLETE!</h3>
            <p>Your score: {runs} runs</p>
            <button className="secret-swing" onClick={replay}>
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

function Admin() {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refresh, setRefresh] = useState(0);

  const bookings = JSON.parse(
    localStorage.getItem("radheBookings") || "[]"
  );

  function updateBooking(id, status) {
    const updated = bookings.map(b =>
      b.id === id ? { ...b, status } : b
    );

    localStorage.setItem(
      "radheBookings",
      JSON.stringify(updated)
    );

    setRefresh(refresh + 1);
  }

  if (!logged) {
    return (
      <div className="admin-page">
        <form className="booking-form admin-login"
          onSubmit={e => {
            e.preventDefault();

            if (
              (email === "owner@radhebox.demo" && password === "radhe123") ||
              (email === "staff@radhebox.demo" && password === "staff123")
            ) setLogged(true);
            else alert("Invalid demo login");
          }}>
          <h2>RADHE ADMIN</h2>
          <label>Email</label>
          <input value={email}
            onChange={e => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password}
            onChange={e => setPassword(e.target.value)} />
          <button className="primary-btn submit-btn">LOGIN ↗</button>
          <p className="demo-note">
            DEMO: owner@radhebox.demo / radhe123
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>RADHE <span>ADMIN</span></h2>
        <button className="outline-btn"
          onClick={() => setLogged(false)}>LOGOUT</button>
      </div>

      <h3>BOOKING MANAGEMENT</h3>
      <p>Total bookings: {bookings.length}</p>

      {bookings.length === 0 && <p>No bookings yet.</p>}

      {bookings.map(b => (
        <div className="admin-booking" key={b.id}>
          <strong>{b.name}</strong>
          <p>{b.mobile} · {b.date} · {b.slot}</p>
          <p>Status: {b.status}</p>
          {b.status === "Pending" && (
            <>
              <button onClick={() => updateBooking(b.id, "Approved")}>
                Approve
              </button>
              <button onClick={() => updateBooking(b.id, "Rejected")}>
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

const isAdmin = window.location.pathname === "/admin";

createRoot(document.getElementById("root")).render(
  isAdmin ? <Admin /> : <App />
);
