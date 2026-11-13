import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
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
import { createClient } from "@supabase/supabase-js";
import "./index.css";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://pqskcjtqjfnarjoutaxa.supabase.co";

const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_fr_NvH33T_g7PBwywLsy2A_SD9-e0WW";

const supabase = createClient(supabaseUrl, supabaseKey);
const ADMIN_KEY = "radheAdminLogged";

const LOCATION_URL =
  "https://www.google.com/search?rlz=1C1YTUH_enIN1016IN1016&sca_esv=9c0ea2fc79e91fa8&cs=0&output=search&kgmid=/g/11yrzb6nk5&q=Radhe+farm&shem=dlvs1,epsd1,esd2e,ltae,rimspwouoe,sdpie&shndl=30&source=sh/x/loc/uni/m1/1&kgs=f8e38dec6d960644&utm_source=dlvs1,epsd1,esd2e,ltae,rimspwouoe,sdpie,sh/x/loc/uni/m1/1";

const PHONE = "7046706848";
const OWNER = "Ankit";

const QR_URL = `https://quickchart.io/qr?text=${encodeURIComponent(
  LOCATION_URL
)}&size=300&margin=2`;

/* =========================
   SLOT SYSTEM
========================= */

const formatHour = (hour) => {
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${String(displayHour).padStart(2, "0")}:00 ${suffix}`;
};

const SLOT_OPTIONS = Array.from({ length: 18 }, (_, index) => {
  const start = index + 6;
  const end = start + 1;

  return {
    value: `${formatHour(start)} - ${formatHour(end === 24 ? 0 : end)}`,
    price: start < 17 ? 800 : 1100,
    type: start < 17 ? "DAY" : "NIGHT",
  };
});

function formatDate(date) {
  if (!date) return "";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* =========================
   SECRET CRICKET GAME
========================= */

function SecretCricketMode({ onClose }) {
  const [ball, setBall] = useState(1);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("TIME YOUR SWING");
  const [running, setRunning] = useState(false);
  const [position, setPosition] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!running || gameOver) return;

    const timer = setInterval(() => {
      setPosition((prev) => (prev >= 92 ? 8 : prev + 4));
    }, 80);

    return () => clearInterval(timer);
  }, [running, gameOver]);

  const startGame = () => {
    setBall(1);
    setScore(0);
    setPosition(10);
    setMessage("SWING!");
    setRunning(true);
    setGameOver(false);
  };

  const swing = () => {
    if (!running || gameOver) {
      startGame();
      return;
    }

    const distance = Math.abs(position - 50);

    let runs = 0;
    let result = "WICKET! 💀";

    if (distance <= 2) {
      runs = 6;
      result = "SIX! 🚀";
    } else if (distance <= 10) {
      runs = 4;
      result = "FOUR! 🔥";
    } else if (distance <= 20) {
      runs = 1;
      result = "ONE RUN";
    }

    setScore((prev) => prev + runs);
    setMessage(result);

    if (ball >= 6) {
      setRunning(false);
      setGameOver(true);
    } else {
      setBall((prev) => prev + 1);
      setPosition(10);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (
        (e.code === "Space" || e.code === "Enter") &&
        running &&
        !gameOver
      ) {
        e.preventDefault();
        swing();
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [running, gameOver, position, ball]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4">
      <div className="relative w-full max-w-xl rounded-3xl border border-orange-500/30 bg-[#100c09] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/10 p-2 text-white/60 hover:bg-white/10"
        >
          <X size={20} />
        </button>

        <div className="mb-8 text-center">
          <div className="text-xs font-bold uppercase tracking-[0.35em] text-orange-400">
            Secret Mode
          </div>

          <h2 className="mt-2 text-4xl font-black uppercase italic">
            Cricket <span className="text-orange-500">Mode</span>
          </h2>
        </div>

        <div className="mb-5 flex justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">
              Score
            </div>

            <div className="text-3xl font-black text-orange-500">
              {score}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs uppercase tracking-widest text-white/40">
              Ball
            </div>

            <div className="text-2xl font-black">{ball}/6</div>
          </div>
        </div>

        <div className="relative mb-6 h-28 overflow-hidden rounded-2xl border border-white/10 bg-[#21150d]">
          <div className="absolute left-1/2 top-0 h-full w-px bg-orange-500/30" />

          <div
            className="absolute top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-red-500 shadow-lg"
            style={{ left: `${position}%` }}
          />
        </div>

        <div className="mb-6 text-center text-2xl font-black uppercase italic">
          {message}
        </div>

        <button
          onClick={swing}
          className="w-full rounded-2xl bg-orange-500 py-4 font-black tracking-widest text-black hover:bg-orange-400"
        >
          {gameOver ? "PLAY AGAIN" : running ? "SWING" : "START GAME"}
        </button>

        <div className="mt-4 text-center text-xs text-white/30">
          SPACE / ENTER
        </div>
      </div>
    </div>
  );
}

/* =========================
   MAIN APP
========================= */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoTaps, setLogoTaps] = useState(0);
  const [showGame, setShowGame] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    slot: "",
    players: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  const selectedSlot = useMemo(
    () => SLOT_OPTIONS.find((slot) => slot.value === form.slot),
    [form.slot]
  );

  useEffect(() => {
    if (logoTaps >= 5) {
      setShowGame(true);
      setLogoTaps(0);
    }
  }, [logoTaps]);

  useEffect(() => {
    if (!form.date) {
      setBookedSlots([]);
      return;
    }

    loadBookedSlots(form.date);

    const interval = setInterval(() => {
      loadBookedSlots(form.date);
    }, 15000);

    return () => clearInterval(interval);
  }, [form.date]);

  const loadBookedSlots = async (date) => {
    if (!date || !supabase) {
      setBookedSlots([]);
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("slot")
      .eq("date", date)
      .in("status", ["Approved", "Blocked"]);

    if (error) {
      console.error(error);
      setBookedSlots([]);
      return;
    }

    setBookedSlots((data || []).map((booking) => booking.slot));
  };

  const updateForm = (key, value) => {
    setMessage("");

    if (key === "date") {
      setForm((prev) => ({
        ...prev,
        date: value,
        slot: "",
      }));
      loadBookedSlots(value);
      return;
    }

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!supabase) {
      setMessage("Booking system is not connected.");
      return;
    }

    if (!form.name || !form.phone || !form.date || !form.slot) {
      setMessage("Please fill all required details.");
      return;
    }

    if (form.phone.replace(/\D/g, "").length < 10) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const { data: existing, error: checkError } = await supabase
        .from("bookings")
        .select("id")
        .eq("date", form.date)
        .eq("slot", form.slot)
        .neq("status", "Rejected");

      if (checkError) throw checkError;

      if (existing?.length) {
        setMessage("This slot is already booked. Choose another slot.");
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

      if (error) throw error;

      const whatsappMessage = `Hi Radhe Box Cricket 👋\n\nI want to book a slot.\n\nName: ${form.name}
Phone: ${form.phone}
Date: ${formatDate(form.date)}
Slot: ${form.slot}
Players: ${form.players || "Not specified"}
Price: ₹${selectedSlot?.price}
\nPlease confirm my booking. 🏏`;

      window.open(
        `https://wa.me/918160885601?text=${encodeURIComponent(whatsappMessage)}`,
        "_blank"
      );

      setMessage(
        `Booking request submitted! ₹${selectedSlot?.price} ${selectedSlot?.type?.toLowerCase()} slot selected. WhatsApp opened for confirmation.`
      );

      setForm({
        name: "",
        phone: "",
        date: "",
        slot: "",
        players: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const facilities = [
    {
      icon: Trophy,
      title: "Premium Turf",
      text: "Professional box cricket turf for competitive gameplay.",
    },
    {
      icon: Zap,
      title: "Power Lighting",
      text: "Bright lighting for evening and night matches.",
    },
    {
      icon: Users,
      title: "Team Ready",
      text: "Perfect for friends, teams, tournaments and practice.",
    },
    {
      icon: ShieldCheck,
      title: "Safe & Clean",
      text: "Clean and maintained playing environment.",
    },
  ];

  const localFaqs = [
    { question: "Where is Shree Radhe Box Cricket located?", answer: "Shree Radhe Box Cricket is at Radhe Farm in the Vasna area of Ahmedabad, Gujarat." },
    { question: "How can I book box cricket in Vasna?", answer: "Choose a date, select an available one-hour slot, enter your details and submit the booking request. WhatsApp opens automatically for confirmation." },
    { question: "How much does box cricket cost?", answer: "Day slots are ₹800 and night slots are ₹1100, subject to current availability." },
    { question: "Is night box cricket available in Ahmedabad?", answer: "Yes. Evening and night slots are available. Check the booking form for current availability." }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#080706] text-white">
      {/* NAVBAR */}

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#080706]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5 sm:py-4 lg:px-8">
          <button
            onClick={() => setLogoTaps((prev) => prev + 1)}
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-black sm:h-10 sm:w-10">
              <Trophy size={20} />
            </div>

            <div className="text-left">
              <div className="text-[11px] font-black tracking-[0.12em] sm:text-sm sm:tracking-[0.15em]">
                RADHE
              </div>

              <div className="text-[7px] font-bold tracking-[0.22em] text-orange-400 sm:text-[10px] sm:tracking-[0.3em]">
                BOX CRICKET
              </div>
            </div>
          </button>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-5 lg:flex">
            {["home", "about", "facilities", "booking", "contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-sm capitalize text-white/60 transition hover:text-white"
                >
                  {item}
                </a>
              )
            )}

            <a
              href="/score"
              className="rounded-xl border border-orange-500/30 px-4 py-3 text-sm font-black text-orange-300 transition hover:bg-orange-500/10"
            >
              🏏 LIVE SCORE
            </a>

            <a
              href="#booking"
              className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-black text-black transition hover:bg-orange-400"
            >
              BOOK NOW
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#0b0908] px-4 py-4 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {["home", "about", "facilities", "booking", "contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-bold capitalize text-white/70 transition hover:bg-white/5 hover:text-white"
                  >
                    {item}
                  </a>
                )
              )}

              <a
                href="/score"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-xl border border-orange-500/30 px-4 py-3 text-center text-sm font-black text-orange-300"
              >
                🏏 LIVE SCORE
              </a>

              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-black text-black"
              >
                BOOK NOW
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(249,115,22,0.15),transparent_35%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-5 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-orange-400 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
              <Sparkles size={13} />
              Radhe Farm • Ahmedabad
            </div>

            <h1 className="text-[3.5rem] font-black uppercase leading-[0.88] tracking-tight sm:text-7xl lg:text-8xl">
              PLAY HARD.
              <br />
              PLAY <span className="text-orange-500">RADHE.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/55 sm:mt-7 sm:text-lg sm:leading-8">
              Premium box cricket at Radhe Farm. Book your one-hour slot and
              bring your team to the game.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <a
                href="#booking"
                className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-xl bg-orange-500 px-7 py-4 text-sm font-black text-black hover:bg-orange-400"
              >
                BOOK YOUR SLOT
                <ArrowRight size={18} />
              </a>

              <a
                href={LOCATION_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/10 px-7 py-4 text-sm font-bold hover:bg-white/5"
              >
                <MapPin size={18} />
                GET DIRECTIONS
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[24px] border border-white/10 bg-[#110d09] p-5 shadow-2xl sm:rounded-[32px] sm:p-8">
              <div className="mb-8 flex items-center justify-between sm:mb-12">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 sm:text-xs sm:tracking-[0.3em]">
                    RADHE FARM
                  </div>

                  <div className="mt-1 text-xl font-black uppercase italic sm:text-2xl">
                    GAME ON
                  </div>
                </div>

                <Trophy className="text-orange-500" size={32} />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Stat value="18" label="Daily Slots" />
                <Stat value="1 HR" label="Each Slot" />
                <Stat value="₹800" label="Day" />
                <Stat value="₹1100" label="Night" />
              </div>

              <div className="mt-3 rounded-2xl border border-orange-500/10 bg-orange-500/5 p-4 sm:mt-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-orange-500" />
                  <span className="text-xs font-bold sm:text-sm">
                    BOOKINGS OPEN NOW
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}

      <section id="about" className="border-t border-white/5 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-xs sm:tracking-[0.3em]">
                ABOUT THE VENUE
              </div>

              <h2 className="text-[2.5rem] font-black uppercase leading-[0.95] sm:text-5xl">
                MORE THAN
                <br />
                JUST A <span className="text-orange-500">GAME.</span>
              </h2>
            </div>

            <div className="text-white/55">
              <p className="text-base leading-7 sm:text-lg sm:leading-8">
                Radhe Box Cricket at Radhe Farm is made for teams, friends,
                tournaments and anyone who loves cricket.
              </p>

              <p className="mt-4 leading-7 sm:mt-5">
                Pick your slot, bring your squad and let the game begin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES */}

      <section
        id="facilities"
        className="border-t border-white/5 bg-white/[0.015] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="mb-10 sm:mb-12">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-xs sm:tracking-[0.3em]">
              THE EXPERIENCE
            </div>

            <h2 className="text-[2.5rem] font-black uppercase leading-[0.95] sm:text-5xl">
              BUILT FOR <span className="text-orange-500">PLAY.</span>
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {facilities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-[#0c0907] p-5 transition hover:border-orange-500/30 sm:rounded-3xl sm:p-7"
                >
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-black sm:mb-8 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg font-black uppercase sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/45">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOCAL SEO */}
      <section id="box-cricket-vasna" className="border-t border-white/5 bg-[#0b0907] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-xs">BOX CRICKET IN VASNA</div>
              <h2 className="text-[2.5rem] font-black uppercase leading-[0.95] sm:text-5xl">SHREE RADHE BOX CRICKET<br /><span className="text-orange-500">VASNA, AHMEDABAD.</span></h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">Looking for box cricket in Vasna, Ahmedabad? Shree Radhe Box Cricket at Radhe Farm is a local venue for friends, teams, practice sessions and competitive matches. Choose a one-hour slot, bring your squad and book your game online.</p>
              <p className="mt-4 max-w-2xl leading-7 text-white/40">The venue is a cricket destination for players around Vasna and nearby Ahmedabad areas. Check the booking section for current slot availability and pricing.</p>
              <div className="mt-7 flex flex-wrap gap-2">{["Box Cricket Vasna","Box Cricket Ahmedabad","Cricket Turf Ahmedabad","Box Cricket Booking"].map(tag=><span key={tag} className="rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-2 text-xs font-bold text-orange-300">{tag}</span>)}</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#100d0a] p-5 sm:p-7">
              <div className="text-xs font-black uppercase tracking-[0.25em] text-orange-400">QUICK INFO</div>
              <div className="mt-6 space-y-4">{[["Venue","Shree Radhe Box Cricket"],["Area","Vasna, Ahmedabad, Gujarat"],["Location","Radhe Farm"],["Format","One-hour box cricket slots"],["Day Price","₹800"],["Night Price","₹1100"]].map(([label,value])=><div key={label} className="flex items-start justify-between gap-4 border-b border-white/5 pb-4"><span className="text-sm text-white/35">{label}</span><span className="text-right text-sm font-bold">{value}</span></div>)}</div>
              <a href="#booking" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-4 text-sm font-black text-black hover:bg-orange-400">CHECK AVAILABLE SLOTS <ArrowRight size={17} /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-white/5 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-5 lg:px-8">
          <div className="mb-10 text-center sm:mb-12"><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-xs">FREQUENTLY ASKED QUESTIONS</div><h2 className="text-[2.5rem] font-black uppercase leading-[0.95] sm:text-5xl">BOX CRICKET <span className="text-orange-500">FAQ.</span></h2></div>
          <div className="space-y-3">{localFaqs.map(item=><details key={item.question} className="group rounded-2xl border border-white/10 bg-[#0c0907] p-5"><summary className="cursor-pointer list-none pr-6 text-sm font-black sm:text-base">{item.question}</summary><p className="mt-3 text-sm leading-7 text-white/45">{item.answer}</p></details>)}</div>
        </div>
      </section>

      {/* BOOKING */}

      <section id="booking" className="border-t border-white/5 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <div>
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-xs sm:tracking-[0.3em]">
                RESERVE YOUR TURF
              </div>

              <h2 className="text-[2.5rem] font-black uppercase leading-[0.95] sm:text-5xl">
                BOOK
                <br />
                YOUR <span className="text-orange-500">GAME.</span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/45 sm:mt-6 sm:text-base">
                Choose a date and one-hour slot. Day slots are ₹800 and
                evening/night slots are ₹1100.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8">
                <PriceCard
                  title="DAY"
                  price="₹800"
                  time="06 AM – 05 PM"
                />

                <PriceCard
                  title="NIGHT"
                  price="₹1100"
                  time="05 PM – 12 AM"
                />
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:mt-5 sm:p-5">
                <div className="flex items-center gap-3">
                  <Clock3 className="shrink-0 text-orange-500" size={20} />

                  <div>
                    <div className="text-sm font-bold sm:text-base">
                      18 one-hour slots
                    </div>

                    <div className="text-xs text-white/40 sm:text-sm">
                      06:00 AM to 12:00 AM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={submitBooking}
              className="rounded-2xl border border-white/10 bg-[#0c0907] p-4 sm:rounded-3xl sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <Input
                  label="Name *"
                  value={form.name}
                  onChange={(value) => updateForm("name", value)}
                  placeholder="Your name"
                />

                <Input
                  label="Phone *"
                  value={form.phone}
                  onChange={(value) => updateForm("phone", value)}
                  placeholder="10-digit number"
                  type="tel"
                />

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-white/40 sm:text-xs">
                    Date *
                  </label>

                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => updateForm("date", e.target.value)}
                    className="box-border w-full min-w-0 rounded-xl border border-white/10 bg-[#11100e] px-3 py-3.5 text-sm text-white outline-none focus:border-orange-500 sm:px-4 sm:py-4"
                  />
                </div>

                <Input
                  label="Players"
                  value={form.players}
                  onChange={(value) => updateForm("players", value)}
                  placeholder="e.g. 10"
                  type="number"
                />

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-white/40 sm:text-xs">
                    Select Slot *
                  </label>

                  <div className="relative">
                    <select
                      value={form.slot}
                      onChange={(e) => updateForm("slot", e.target.value)}
                      className="box-border w-full min-w-0 appearance-none rounded-xl border border-white/10 bg-[#11100e] px-3 py-3.5 pr-10 text-sm text-white outline-none focus:border-orange-500 sm:px-4 sm:py-4"
                    >
                      <option value="" className="bg-[#11100e] text-white">
                        Select your slot
                      </option>

                      {SLOT_OPTIONS.map((slot) => {
                        const isBooked = bookedSlots.includes(slot.value);

                        return (
                          <option
                            key={slot.value}
                            value={slot.value}
                            disabled={isBooked}
                            className="bg-[#11100e] text-white"
                          >
                            {slot.value} — ₹{slot.price}
                            {isBooked ? " • BOOKED" : ""}
                          </option>
                        );
                      })}
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 sm:right-4"
                    />
                  </div>
                </div>
              </div>

              {selectedSlot && (
                <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4 sm:mt-5 sm:p-5">
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
                      Selected Slot
                    </div>

                    <div className="mt-1 truncate text-sm font-bold sm:text-base">
                      {selectedSlot.value}
                    </div>

                    <div className="mt-1 text-[10px] text-white/40 sm:text-xs">
                      {selectedSlot.type === "DAY"
                        ? "Day Booking"
                        : "Night Booking"}
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="text-[9px] uppercase tracking-widest text-white/30">
                      PRICE
                    </div>

                    <div className="text-2xl font-black text-orange-500 sm:text-3xl">
                      ₹{selectedSlot.price}
                    </div>
                  </div>
                </div>
              )}

              {message && (
                <div className="mt-4 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 text-sm text-orange-300 sm:mt-5">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-4 flex min-h-[52px] w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 text-sm font-black text-black hover:bg-orange-400 disabled:opacity-50 sm:mt-6"
              >
                {loading ? (
                  "SUBMITTING..."
                ) : (
                  <>
                    REQUEST BOOKING
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* LOCATION / CONTACT */}

      <section
        id="contact"
        className="border-t border-white/5 bg-[#0b0907] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="mb-10 sm:mb-12">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-xs sm:tracking-[0.3em]">
              FIND US
            </div>

            <h2 className="text-[2.5rem] font-black uppercase leading-[0.95] sm:text-5xl">
              COME PLAY <span className="text-orange-500">WITH US.</span>
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">
              <a
                href={`tel:${PHONE}`}
                className="rounded-2xl border border-white/10 bg-[#100d0a] p-5 transition hover:border-orange-500/40 sm:rounded-3xl sm:p-7"
              >
                <Phone className="mb-5 text-orange-500" size={24} />

                <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                  OWNER / CALL
                </div>

                <div className="mt-2 text-lg font-black sm:text-xl">
                  {OWNER}
                </div>

                <div className="mt-1 text-sm text-orange-400">
                  {PHONE}
                </div>
              </a>

              <a
                href={LOCATION_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-[#100d0a] p-5 transition hover:border-orange-500/40 sm:rounded-3xl sm:p-7"
              >
                <MapPin className="mb-5 text-orange-500" size={24} />

                <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                  LOCATION
                </div>

                <div className="mt-2 text-lg font-black sm:text-xl">
                  Radhe Farm
                </div>

                <div className="mt-1 text-sm text-orange-400">
                  Open in Google Maps →
                </div>
              </a>

              <a
                href="https://instagram.com/radhe_box_cricket"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-[#100d0a] p-5 transition hover:border-orange-500/40 sm:col-span-2 sm:rounded-3xl sm:p-7"
              >
                <Sparkles className="mb-5 text-orange-500" size={24} />

                <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                  INSTAGRAM
                </div>

                <div className="mt-2 text-lg font-black sm:text-xl">
                  @radhe_box_cricket
                </div>
              </a>
            </div>

            {/* QR */}

            <div className="rounded-2xl border border-orange-500/20 bg-[#100d0a] p-5 text-center sm:rounded-3xl sm:p-7">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-xs">
                SCAN FOR LOCATION
              </div>

              <div className="mx-auto mt-5 flex w-fit rounded-2xl bg-white p-2.5 sm:p-3">
                <img
                  src={QR_URL}
                  alt="Radhe Farm Google Maps QR Code"
                  className="h-48 w-48 sm:h-52 sm:w-52"
                />
              </div>

              <div className="mt-5 font-black">RADHE FARM</div>

              <a
                href={LOCATION_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-black text-black hover:bg-orange-400"
              >
                <MapPin size={16} />
                GET DIRECTIONS
              </a>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:localFaqs.map(item=>({"@type":"Question",name:item.question,acceptedAnswer:{"@type":"Answer",text:item.answer}}))})}</script>

      {/* FOOTER */}

      <footer className="border-t border-white/5 py-7">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-xs text-white/30 sm:px-5 sm:text-sm lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            © {new Date().getFullYear()} Radhe Box Cricket • Radhe Farm
          </div>

          <div>
            Owner: {OWNER} • {PHONE}
          </div>

          <a href="/admin" className="hover:text-orange-400">
            Admin
          </a>
        </div>
      </footer>

      {showGame && (
        <SecretCricketMode onClose={() => setShowGame(false)} />
      )}
    </div>
  );
}

/* =========================
   INPUT
========================= */

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-white/40 sm:text-xs">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="box-border w-full min-w-0 rounded-xl border border-white/10 bg-[#11100e] px-3 py-3.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-orange-500 sm:px-4 sm:py-4"
      />
    </div>
  );
}

/* =========================
   PRICE CARD
========================= */

function PriceCard({ title, price, time }) {
  return (
    <div className="min-w-0 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4">
      <div className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
        {title}
      </div>

      <div className="mt-1 text-2xl font-black">{price}</div>

      <div className="mt-1 text-[10px] text-white/40 sm:text-xs">
        {time}
      </div>
    </div>
  );
}

/* =========================
   STAT
========================= */

function Stat({ value, label }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <div className="text-2xl font-black text-orange-500 sm:text-3xl">
        {value}
      </div>

      <div className="mt-1 text-[9px] uppercase tracking-widest text-white/35 sm:text-xs">
        {label}
      </div>
    </div>
  );
}

/* =========================
   ADMIN
========================= */

function Admin() {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem(ADMIN_KEY) === "true"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blockDate, setBlockDate] = useState("");
  const [blockSlot, setBlockSlot] = useState("");
  const [blockLoading, setBlockLoading] = useState(false);

  const loadBookings = async () => {
    if (!supabase) {
      setError("Supabase is not connected.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (err) {
      console.error(err);
      setError("Could not load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) loadBookings();
  }, [loggedIn]);

  const login = (e) => {
    e.preventDefault();
    setLoginError("");

    const owner =
      email === "owner@radhebox.demo" &&
      password === "radhe123";

    const staff =
      email === "staff@radhebox.demo" &&
      password === "staff123";

    if (!owner && !staff) {
      setLoginError("Invalid login details.");
      return;
    }

    sessionStorage.setItem(ADMIN_KEY, "true");
    setLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    setLoggedIn(false);
  };

  const blockSlotManually = async () => {
    if (!supabase) return;

    if (!blockDate || !blockSlot) {
      setError("Select a date and slot to block.");
      return;
    }

    setBlockLoading(true);
    setError("");

    try {
      const { data: existing, error: checkError } = await supabase
        .from("bookings")
        .select("id, status")
        .eq("date", blockDate)
        .eq("slot", blockSlot)
        .in("status", ["Pending", "Approved", "Blocked"]);

      if (checkError) throw checkError;

      if (existing && existing.length > 0) {
        setError("This date + slot already has a booking or block.");
        return;
      }

      const { error: insertError } = await supabase
        .from("bookings")
        .insert([
          {
            name: "Manual Block",
            phone: "-",
            date: blockDate,
            slot: blockSlot,
            players: null,
            status: "Blocked",
          },
        ]);

      if (insertError) throw insertError;

      setBlockDate("");
      setBlockSlot("");
      await loadBookings();
    } catch (err) {
      console.error(err);
      setError("Could not block this slot.");
    } finally {
      setBlockLoading(false);
    }
  };

  const unblockSlot = async (id) => {
    if (!supabase) return;

    if (!window.confirm("Unblock this slot?")) return;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id)
      .eq("status", "Blocked");

    if (error) {
      setError("Could not unblock slot.");
      return;
    }

    await loadBookings();
  };

  const deleteBooking = async (id) => {
    if (!supabase) return;

    if (!window.confirm("Delete this booking?")) return;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      setError("Could not delete booking.");
      return;
    }

    loadBookings();
  };

  const filtered =
    filter === "All"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    blocked: bookings.filter((b) => b.status === "Blocked").length,
    approved: bookings.filter((b) => b.status === "Approved").length,
    rejected: bookings.filter((b) => b.status === "Rejected").length,
  };

  if (!loggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080706] px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0c0907] p-6 sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-black">
              <ShieldCheck size={28} />
            </div>

            <div className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
              RADHE BOX CRICKET
            </div>

            <h1 className="mt-2 text-3xl font-black uppercase">
              Admin Panel
            </h1>
          </div>

          <form onSubmit={login} className="space-y-5">
            <Input
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="owner@radhebox.demo"
              type="email"
            />

            <Input
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="Password"
              type="password"
            />

            {loginError && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 py-4 font-black text-black hover:bg-orange-400"
            >
              LOGIN
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs text-white/35">
            <div>owner@radhebox.demo</div>
            <div>radhe123</div>

            <br />

            <div>staff@radhebox.demo</div>
            <div>staff123</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080706] text-white">
      <header className="border-b border-white/10 bg-[#0c0907]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-5 sm:py-5 lg:px-8">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-xs sm:tracking-[0.3em]">
              RADHE BOX CRICKET
            </div>

            <h1 className="mt-1 text-xl font-black uppercase sm:text-2xl">
              Booking Dashboard
            </h1>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              onClick={loadBookings}
              className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold sm:px-4 sm:py-3 sm:text-sm"
            >
              Refresh
            </button>

            <button
              onClick={logout}
              className="rounded-xl bg-orange-500 px-3 py-2 text-xs font-black text-black sm:px-4 sm:py-3 sm:text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-5 sm:py-8 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <AdminStat title="Total" value={stats.total} />
          <AdminStat title="Pending Requests" value={stats.pending} />
          <AdminStat title="Blocked Slots" value={stats.blocked} />
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-red-300">
            {error}
          </div>
        )}

        <section className="mt-8 rounded-3xl border border-orange-500/20 bg-[#0c0907] p-5 sm:p-6">
          <div className="mb-5">
            <div className="text-xs font-black uppercase tracking-[0.25em] text-orange-400">
              MANUAL SLOT CONTROL
            </div>
            <h2 className="mt-2 text-2xl font-black uppercase">
              Block a Slot 🔒
            </h2>
            <p className="mt-1 text-sm text-white/40">
              Offline booking, maintenance, owner reservation — block any slot yourself.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_1.3fr_auto]">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={blockDate}
              onChange={(e) => setBlockDate(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-orange-500/50"
            />

            <select
              value={blockSlot}
              onChange={(e) => setBlockSlot(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0c0907] px-4 py-3 text-white outline-none focus:border-orange-500/50"
            >
              <option value="">Select slot</option>
              {SLOT_OPTIONS.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.value} — ₹{slot.price}
                </option>
              ))}
            </select>

            <button
              onClick={blockSlotManually}
              disabled={blockLoading}
              className="rounded-xl bg-orange-500 px-5 py-3 font-black text-black transition hover:bg-orange-400 disabled:opacity-50"
            >
              {blockLoading ? "BLOCKING..." : "BLOCK SLOT 🔒"}
            </button>
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-2">
          {["All", "Pending", "Blocked"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-xl px-4 py-3 text-sm font-bold ${
                filter === item
                  ? "bg-orange-500 text-black"
                  : "border border-white/10 text-white/60"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0c0907]">
          {loading ? (
            <div className="p-10 text-center text-white/40">
              Loading bookings...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-white/40">
              No bookings found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left">
                <thead className="border-b border-white/10">
                  <tr>
                    {[
                      "Customer",
                      "Phone",
                      "Date",
                      "Slot",
                      "Players",
                      "Status",
                      "Actions",
                    ].map((head) => (
                      <th
                        key={head}
                        className="px-5 py-4 text-xs uppercase tracking-widest text-white/30"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-white/5"
                    >
                      <td className="px-5 py-5 font-bold">
                        {booking.name}
                      </td>

                      <td className="px-5 py-5 text-white/60">
                        {booking.phone}
                      </td>

                      <td className="px-5 py-5">
                        {formatDate(booking.date)}
                      </td>

                      <td className="px-5 py-5 text-white/60">
                        {booking.slot}
                      </td>

                      <td className="px-5 py-5">
                        {booking.players || "-"}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            booking.status === "Blocked"
                              ? "bg-orange-500/10 text-orange-400"
                              : booking.status === "Pending"
                              ? "bg-yellow-400/10 text-yellow-300"
                              : "bg-white/5 text-white/40"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex gap-2">
                          {booking.status === "Pending" && (
                            <button
                              onClick={async () => {
                                const confirmed = window.confirm(
                                  `Block ${booking.slot} on ${formatDate(booking.date)}?`
                                );
                                if (!confirmed) return;

                                const { error } = await supabase
                                  .from("bookings")
                                  .update({ status: "Blocked" })
                                  .eq("id", booking.id);

                                if (error) {
                                  setError("Could not block booking slot.");
                                  return;
                                }

                                await loadBookings();
                              }}
                              className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-black text-black"
                            >
                              BLOCK SLOT 🔒
                            </button>
                          )}

                          {booking.status === "Blocked" && (
                            <button
                              onClick={() => unblockSlot(booking.id)}
                              className="rounded-lg border border-lime-400/20 px-3 py-2 text-xs font-bold text-lime-300"
                            >
                              UNBLOCK
                            </button>
                          )}

                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/50"
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

        <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-sm leading-6 text-white/35">
          <strong className="text-white/60">How it works:</strong> Customer requests stay Pending. You decide when to block the slot.
          Blocked slots disappear from the public booking dropdown. Unblock/Delete makes the slot available again.
        </div>
      </main>
    </div>
  );
}

function AdminStat({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0907] p-5 sm:p-6">
      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 sm:text-xs">
        {title}
      </div>

      <div className="mt-2 text-3xl font-black text-orange-500 sm:text-4xl">
        {value}
      </div>
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
