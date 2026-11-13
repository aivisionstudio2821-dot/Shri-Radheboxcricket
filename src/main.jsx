import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import "./index.css";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

const ADMIN_KEY = "radheAdminLogged";

const SLOT_OPTIONS = [
  "06:00 AM - 07:00 AM",
  "07:00 AM - 08:00 AM",
  "08:00 AM - 09:00 AM",
  "05:00 PM - 06:00 PM",
  "06:00 PM - 07:00 PM",
  "07:00 PM - 08:00 PM",
  "08:00 PM - 09:00 PM",
  "09:00 PM - 10:00 PM",
];

function formatDate(date) {
  if (!date) return "";
  const d = new Date(`${date}T00:00:00`);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* =========================
   SECRET CRICKET MODE
========================= */

function SecretCricketMode({ onClose }) {
  const [ball, setBall] = useState(1);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("TIME YOUR SWING");
  const [running, setRunning] = useState(false);
  const [ballPosition, setBallPosition] = useState(50);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!running || gameOver) return;

    const interval = setInterval(() => {
      setBallPosition((prev) => (prev >= 92 ? 8 : prev + 4));
    }, 80);

    return () => clearInterval(interval);
  }, [running, gameOver]);

  const startGame = () => {
    setRunning(true);
    setGameOver(false);
    setBall(1);
    setScore(0);
    setMessage("SWING!");
    setBallPosition(10);
  };

  const swing = () => {
    if (!running || gameOver) {
      startGame();
      return;
    }

    const distance = Math.abs(ballPosition - 50);

    let result;
    let runs = 0;

    if (distance <= 2) {
      result = "SIX! 🚀";
      runs = 6;
    } else if (distance <= 10) {
      result = "FOUR! 🔥";
      runs = 4;
    } else if (distance <= 20) {
      result = "ONE RUN";
      runs = 1;
    } else {
      result = "WICKET! 💀";
      runs = 0;
    }

    const newScore = score + runs;

    setScore(newScore);
    setMessage(result);

    if (ball >= 6) {
      setRunning(false);
      setGameOver(true);
      return;
    }

    setBall((prev) => prev + 1);
    setBallPosition(10);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-lime-400/30 bg-[#0a0d0a] p-6 shadow-2xl shadow-lime-500/10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/10 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="mb-8 text-center">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-lime-400">
            Secret Mode
          </div>

          <h2 className="text-4xl font-black uppercase italic text-white">
            Cricket <span className="text-lime-400">Mode</span>
          </h2>

          <p className="mt-2 text-sm text-white/50">
            6 balls. Time your swing. Beat the score.
          </p>
        </div>

        <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">
              Score
            </div>
            <div className="text-3xl font-black text-lime-400">{score}</div>
          </div>

          <div className="text-right">
            <div className="text-xs uppercase tracking-widest text-white/40">
              Ball
            </div>
            <div className="text-2xl font-bold text-white">
              {gameOver ? "6/6" : `${ball}/6`}
            </div>
          </div>
        </div>

        <div className="relative mb-6 h-28 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#172017] to-[#090b09]">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-lime-400/30" />

          <div className="absolute bottom-5 left-0 right-0 h-1 bg-white/10" />

          <div
            className="absolute top-1/2 h-8 w-8 -translate-y-1/2 -translate-x-1/2 rounded-full border-4 border-white bg-red-500 shadow-lg shadow-red-500/40 transition-all"
            style={{ left: `${ballPosition}%` }}
          />

          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime-400/20" />
        </div>

        <div className="mb-6 text-center">
          <div className="text-2xl font-black uppercase italic text-white">
            {message}
          </div>

          <div className="mt-2 text-xs text-white/40">
            Aim for the center zone
          </div>
        </div>

        <button
          onClick={swing}
          className="w-full rounded-2xl bg-lime-400 py-4 text-lg font-black uppercase tracking-widest text-black transition hover:bg-lime-300 active:scale-[0.98]"
        >
          {gameOver ? "PLAY AGAIN" : running ? "SWING" : "START GAME"}
        </button>

        <div className="mt-4 text-center text-xs text-white/30">
          Keyboard: SPACE / ENTER
        </div>
      </div>
    </div>
  );
}

/* =========================
   MAIN WEBSITE
========================= */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoTaps, setLogoTaps] = useState(0);
  const [showCricketMode, setShowCricketMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    slot: "",
    players: "",
  });

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");

  useEffect(() => {
    if (logoTaps >= 5) {
      setShowCricketMode(true);
      setLogoTaps(0);
    }
  }, [logoTaps]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        showCricketMode &&
        (event.code === "Space" || event.code === "Enter")
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showCricketMode]);

  const handleLogoTap = () => {
    setLogoTaps((prev) => prev + 1);
  };

  const updateForm = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    setBookingMessage("");
  };

  const submitBooking = async (event) => {
    event.preventDefault();

    setBookingMessage("");

    if (!supabase) {
      setBookingMessage(
        "Booking system is not connected yet. Please try again shortly."
      );
      return;
    }

    if (!form.name || !form.phone || !form.date || !form.slot) {
      setBookingMessage("Please fill all required details.");
      return;
    }

    if (form.phone.replace(/\D/g, "").length < 10) {
      setBookingMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    setBookingLoading(true);

    try {
      const { data: existingBookings, error: checkError } = await supabase
        .from("bookings")
        .select("id, date, slot, status")
        .eq("date", form.date)
        .eq("slot", form.slot)
        .neq("status", "Rejected");

      if (checkError) {
        throw checkError;
      }

      if (existingBookings && existingBookings.length > 0) {
        setBookingMessage(
          "This slot is already booked. Please choose another slot."
        );
        return;
      }

      const { error } = await supabase.from("bookings").insert([
        {
          name: form.name.trim(),
          phone: form.phone.trim(),
          date: form.date,
          slot: form.slot,
          players: form.players ? Number(form.players) : null,
          status: "Pending",
        },
      ]);

      if (error) {
        throw error;
      }

      setForm({
        name: "",
        phone: "",
        date: "",
        slot: "",
        players: "",
      });

      setBookingMessage(
        "Booking request submitted successfully! We will confirm your slot shortly."
      );
    } catch (error) {
      console.error("Booking error:", error);
      setBookingMessage(
        "Something went wrong while submitting your booking. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const facilities = [
    {
      icon: Trophy,
      title: "Premium Turf",
      text: "Professional box cricket turf built for competitive gameplay.",
    },
    {
      icon: Zap,
      title: "Power Lighting",
      text: "Bright floodlights for smooth evening and night matches.",
    },
    {
      icon: Users,
      title: "Team Ready",
      text: "Perfect setup for friends, teams, tournaments and practice.",
    },
    {
      icon: ShieldCheck,
      title: "Safe & Clean",
      text: "Well-maintained playing area with a clean environment.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050605] text-white">
      {/* NAVBAR */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#050605]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button
            onClick={handleLogoTap}
            className="group flex items-center gap-3 text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-black shadow-lg shadow-lime-400/20">
              <Trophy size={22} strokeWidth={2.5} />
            </div>

            <div>
              <div className="text-sm font-black tracking-[0.15em]">
                RADHE
              </div>
              <div className="text-[10px] font-bold tracking-[0.3em] text-lime-400">
                BOX CRICKET
              </div>
            </div>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#home" className="text-sm text-white/60 hover:text-white">
              Home
            </a>
            <a
              href="#about"
              className="text-sm text-white/60 hover:text-white"
            >
              About
            </a>
            <a
              href="#facilities"
              className="text-sm text-white/60 hover:text-white"
            >
              Facilities
            </a>
            <a
              href="#booking"
              className="text-sm text-white/60 hover:text-white"
            >
              Booking
            </a>
            <a
              href="#contact"
              className="text-sm text-white/60 hover:text-white"
            >
              Contact
            </a>

            <a
              href="#booking"
              className="rounded-xl bg-lime-400 px-5 py-3 text-sm font-black text-black transition hover:bg-lime-300"
            >
              BOOK NOW
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-white/10 p-2 md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#070907] px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#home" onClick={() => setMenuOpen(false)}>
                Home
              </a>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
              <a href="#facilities" onClick={() => setMenuOpen(false)}>
                Facilities
              </a>
              <a href="#booking" onClick={() => setMenuOpen(false)}>
                Booking
              </a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden pt-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(163,230,53,0.13),transparent_35%),radial-gradient(circle_at_20%_70%,rgba(163,230,53,0.06),transparent_30%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
              <Sparkles size={14} />
              Ahmedabad's Box Cricket
            </div>

            <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl lg:text-8xl">
              PLAY HARD.
              <br />
              PLAY <span className="text-lime-400">RADHE.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/55">
              Your next match starts here. Premium box cricket turf, powerful
              lighting and an atmosphere made for the game.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#booking"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-lime-400 px-7 py-4 font-black text-black transition hover:bg-lime-300"
              >
                BOOK YOUR SLOT
                <ArrowRight
                  size={19}
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <a
                href="#facilities"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 font-bold text-white transition hover:bg-white/[0.07]"
              >
                EXPLORE FACILITIES
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-[40px] bg-lime-400/5 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#141914] to-[#080908] p-8 shadow-2xl">
              <div className="mb-12 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">
                    RADHE
                  </div>
                  <div className="mt-1 text-2xl font-black uppercase italic">
                    GAME ON
                  </div>
                </div>

                <Trophy className="text-lime-400" size={38} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ["6+", "Players"],
                  ["365", "Days"],
                  ["100%", "Energy"],
                  ["24/7", "Game Mode"],
                ].map(([number, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="text-3xl font-black text-lime-400">
                      {number}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-white/35">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-lime-400/10 bg-lime-400/5 p-5">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-lime-400" />
                  <span className="text-sm font-bold">
                    BOOKINGS OPEN NOW
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-lime-400">
                ABOUT THE VENUE
              </div>

              <h2 className="text-4xl font-black uppercase sm:text-5xl">
                MORE THAN
                <br />
                JUST A <span className="text-lime-400">GAME.</span>
              </h2>
            </div>

            <div className="text-white/55">
              <p className="text-lg leading-8">
                Radhe Box Cricket is built for people who love the game. Whether
                you're here for a serious match, a weekend battle with friends,
                or just some practice, we've created a space where every ball
                feels exciting.
              </p>

              <p className="mt-5 leading-7">
                Come with your team. Pick your slot. Step onto the turf and
                let the game begin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section
        id="facilities"
        className="border-t border-white/5 bg-white/[0.015] py-24"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-lime-400">
              THE EXPERIENCE
            </div>

            <h2 className="text-4xl font-black uppercase sm:text-5xl">
              BUILT FOR <span className="text-lime-400">PLAY.</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-white/10 bg-[#080a08] p-7 transition hover:-translate-y-1 hover:border-lime-400/30"
                >
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-400 transition group-hover:bg-lime-400 group-hover:text-black">
                    <Icon size={23} />
                  </div>

                  <h3 className="text-xl font-black uppercase">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/45">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-lime-400">
                RESERVE YOUR TURF
              </div>

              <h2 className="text-4xl font-black uppercase sm:text-5xl">
                BOOK
                <br />
                YOUR <span className="text-lime-400">GAME.</span>
              </h2>

              <p className="mt-6 max-w-md leading-7 text-white/45">
                Pick your preferred date and time. Submit your request and our
                team will confirm your booking.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-lime-400/10 p-3 text-lime-400">
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <div className="font-bold">Flexible Slots</div>
                    <div className="text-sm text-white/40">
                      Morning & evening games
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-lime-400/10 p-3 text-lime-400">
                    <Clock3 size={20} />
                  </div>
                  <div>
                    <div className="font-bold">1 Hour Slots</div>
                    <div className="text-sm text-white/40">
                      Simple and easy booking
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={submitBooking}
              className="rounded-3xl border border-white/10 bg-[#090b09] p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
                    Name *
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
                    Phone *
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    placeholder="10-digit number"
                    inputMode="numeric"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => updateForm("date", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition focus:border-lime-400/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
                    Players
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={form.players}
                    onChange={(e) => updateForm("players", e.target.value)}
                    placeholder="e.g. 10"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
                    Select Slot *
                  </label>

                  <div className="relative">
                    <select
                      value={form.slot}
                      onChange={(e) => updateForm("slot", e.target.value)}
                      className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition focus:border-lime-400/50"
                    >
                      <option value="" className="bg-[#090b09]">
                        Select your slot
                      </option>

                      {SLOT_OPTIONS.map((slot) => (
                        <option
                          key={slot}
                          value={slot}
                          className="bg-[#090b09]"
                        >
                          {slot}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                    />
                  </div>
                </div>
              </div>

              {bookingMessage && (
                <div
                  className={`mt-5 rounded-xl border p-4 text-sm ${
                    bookingMessage.includes("successfully")
                      ? "border-lime-400/20 bg-lime-400/5 text-lime-300"
                      : "border-red-400/20 bg-red-400/5 text-red-300"
                  }`}
                >
                  {bookingMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={bookingLoading}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-lime-400 px-6 py-4 font-black text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {bookingLoading ? (
                  "SUBMITTING..."
                ) : (
                  <>
                    REQUEST BOOKING
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs text-white/25">
                Your booking request will be reviewed by the Radhe Box Cricket
                team.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="border-t border-white/5 bg-white/[0.015] py-20"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-[#090b09] p-7">
              <MapPin className="mb-5 text-lime-400" />
              <div className="text-xs font-bold uppercase tracking-widest text-white/30">
                LOCATION
              </div>
              <div className="mt-2 font-bold">Ahmedabad, Gujarat</div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#090b09] p-7">
              <Clock3 className="mb-5 text-lime-400" />
              <div className="text-xs font-bold uppercase tracking-widest text-white/30">
                OPEN
              </div>
              <div className="mt-2 font-bold">Daily</div>
            </div>

            <a
              href="https://instagram.com/radhe_box_cricket"
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl border border-white/10 bg-[#090b09] p-7 transition hover:border-lime-400/30"
            >
              <Sparkles className="mb-5 text-lime-400" />
              <div className="text-xs font-bold uppercase tracking-widest text-white/30">
                INSTAGRAM
              </div>
              <div className="mt-2 font-bold">@radhe_box_cricket</div>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-white/30 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            © {new Date().getFullYear()} Radhe Box Cricket. All rights
            reserved.
          </div>

          <a
            href="/admin"
            className="transition hover:text-lime-400"
          >
            Admin
          </a>
        </div>
      </footer>

      {showCricketMode && (
        <SecretCricketMode onClose={() => setShowCricketMode(false)} />
      )}
    </div>
  );
}

/* =========================
   ADMIN PANEL
========================= */

function Admin() {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem(ADMIN_KEY) === "true"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginError, setLoginError] = useState("");

  const loadBookings = async () => {
    if (!supabase) {
      setError("Supabase is not connected.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: fetchError } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setBookings(data || []);
    } catch (err) {
      console.error("Admin fetch error:", err);
      setError("Could not load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      loadBookings();
    }
  }, [loggedIn]);

  const login = (event) => {
    event.preventDefault();
    setLoginError("");

    const validOwner =
      email === "owner@radhebox.demo" && password === "radhe123";

    const validStaff =
      email === "staff@radhebox.demo" && password === "staff123";

    if (!validOwner && !validStaff) {
      setLoginError("Invalid demo credentials.");
      return;
    }

    sessionStorage.setItem(ADMIN_KEY, "true");
    setLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    setLoggedIn(false);
  };

  const updateStatus = async (id, status) => {
    if (!supabase) return;

    const { error: updateError } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      console.error(updateError);
      setError("Could not update booking.");
      return;
    }

    await loadBookings();
  };

  const deleteBooking = async (id) => {
    if (!supabase) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmed) return;

    const { error: deleteError } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error(deleteError);
      setError("Could not delete booking.");
      return;
    }

    await loadBookings();
  };

  const filteredBookings =
    filter === "All"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  const total = bookings.length;
  const pending = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;
  const approved = bookings.filter(
    (booking) => booking.status === "Approved"
  ).length;
  const rejected = bookings.filter(
    (booking) => booking.status === "Rejected"
  ).length;

  if (!loggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050605] px-5 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#090b09] p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400 text-black">
              <ShieldCheck size={28} />
            </div>

            <div className="text-xs font-bold uppercase tracking-[0.3em] text-lime-400">
              RADHE BOX CRICKET
            </div>

            <h1 className="mt-2 text-3xl font-black uppercase">
              Admin Panel
            </h1>
          </div>

          <form onSubmit={login} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
                Email
              </label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="owner@radhebox.demo"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none focus:border-lime-400/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
                Password
              </label>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none focus:border-lime-400/50"
              />
            </div>

            {loginError && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-lime-400 px-6 py-4 font-black text-black transition hover:bg-lime-300"
            >
              LOGIN
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs text-white/35">
            <div className="font-bold text-white/50">Demo login</div>
            <div className="mt-2">owner@radhebox.demo</div>
            <div>radhe123</div>
            <div className="mt-2">staff@radhebox.demo</div>
            <div>staff123</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050605] text-white">
      <header className="border-b border-white/10 bg-[#070907]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-lime-400">
              RADHE BOX CRICKET
            </div>

            <h1 className="mt-1 text-2xl font-black uppercase">
              Booking Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadBookings}
              className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/5"
            >
              Refresh
            </button>

            <button
              onClick={logout}
              className="rounded-xl bg-lime-400 px-4 py-3 text-sm font-black text-black transition hover:bg-lime-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Total", total],
            ["Pending", pending],
            ["Approved", approved],
            ["Rejected", rejected],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-[#090b09] p-6"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-white/30">
                {label}
              </div>

              <div className="mt-2 text-4xl font-black text-lime-400">
                {value}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {["All", "Pending", "Approved", "Rejected"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                filter === item
                  ? "bg-lime-400 text-black"
                  : "border border-white/10 bg-white/[0.02] text-white/60 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#090b09]">
          {loading ? (
            <div className="p-10 text-center text-white/40">
              Loading bookings...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-10 text-center">
              <CalendarDays className="mx-auto mb-4 text-white/20" size={40} />
              <div className="font-bold text-white/50">
                No bookings found
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="border-b border-white/10 bg-white/[0.02]">
                  <tr>
                    <th className="px-5 py-4 text-xs uppercase tracking-widest text-white/30">
                      Customer
                    </th>
                    <th className="px-5 py-4 text-xs uppercase tracking-widest text-white/30">
                      Phone
                    </th>
                    <th className="px-5 py-4 text-xs uppercase tracking-widest text-white/30">
                      Date
                    </th>
                    <th className="px-5 py-4 text-xs uppercase tracking-widest text-white/30">
                      Slot
                    </th>
                    <th className="px-5 py-4 text-xs uppercase tracking-widest text-white/30">
                      Players
                    </th>
                    <th className="px-5 py-4 text-xs uppercase tracking-widest text-white/30">
                      Status
                    </th>
                    <th className="px-5 py-4 text-xs uppercase tracking-widest text-white/30">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="px-5 py-5">
                        <div className="font-bold">{booking.name}</div>
                        <div className="mt-1 text-xs text-white/30">
                          {booking.created_at
                            ? new Date(booking.created_at).toLocaleString(
                                "en-IN"
                              )
                            : ""}
                        </div>
                      </td>

                      <td className="px-5 py-5 text-white/60">
                        {booking.phone}
                      </td>

                      <td className="px-5 py-5 font-bold">
                        {formatDate(booking.date)}
                      </td>

                      <td className="px-5 py-5 text-white/60">
                        {booking.slot}
                      </td>

                      <td className="px-5 py-5 text-white/60">
                        {booking.players ?? "Not specified"}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            booking.status === "Approved"
                              ? "bg-lime-400/10 text-lime-400"
                              : booking.status === "Rejected"
                              ? "bg-red-400/10 text-red-400"
                              : "bg-yellow-400/10 text-yellow-300"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex flex-wrap gap-2">
                          {booking.status !== "Approved" && (
                            <button
                              onClick={() =>
                                updateStatus(booking.id, "Approved")
                              }
                              className="inline-flex items-center gap-1 rounded-lg bg-lime-400 px-3 py-2 text-xs font-black text-black transition hover:bg-lime-300"
                            >
                              <Check size={14} />
                              Approve
                            </button>
                          )}

                          {booking.status !== "Rejected" && (
                            <button
                              onClick={() =>
                                updateStatus(booking.id, "Rejected")
                              }
                              className="rounded-lg border border-red-400/20 px-3 py-2 text-xs font-bold text-red-300 transition hover:bg-red-400/10"
                            >
                              Reject
                            </button>
                          )}

                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-white/40 transition hover:bg-white/5 hover:text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.03] p-5 text-sm leading-6 text-white/40">
          <strong className="text-yellow-300">Note:</strong> Booking data is
          now stored in Supabase, so the public booking form and admin panel
          can share the same booking database across devices.
        </div>
      </main>
    </div>
  );
}

/* =========================
   ROUTING
========================= */

const isAdmin = window.location.pathname === "/admin";

createRoot(document.getElementById("root")).render(
  isAdmin ? <Admin /> : <App />
);
