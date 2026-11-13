import React,{useEffect,useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import {CalendarDays,Check,Clock,Instagram,MapPin,Phone,Shield,Star,Users,X,ArrowRight,Settings,IndianRupee} from "lucide-react";
import "./index.css";

const KEY="radhe-demo-v1";
const defaultData={
 bookings:[
  {id:"RB-1001",date:"2026-11-14",slot:"07:00 PM - 08:00 PM",name:"Aarav Patel",mobile:"9876543210",price:1200,status:"approved"},
  {id:"RB-1002",date:"2026-11-15",slot:"08:00 PM - 09:00 PM",name:"Dev Shah",mobile:"9988776655",price:1400,status:"pending"}
 ],
 blocked:["2026-11-18"], price:1200, slots:["06:00 AM - 07:00 AM","07:00 AM - 08:00 AM","05:00 PM - 06:00 PM","06:00 PM - 07:00 PM","07:00 PM - 08:00 PM","08:00 PM - 09:00 PM","09:00 PM - 10:00 PM"]
};
function load(){try{return JSON.parse(localStorage.getItem(KEY))||defaultData}catch{return defaultData}}
function save(d){localStorage.setItem(KEY,JSON.stringify(d))}
const img="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1800&q=85";

function App(){
 const [data,setData]=useState(load); const [page,setPage]=useState(location.pathname);
 useEffect(()=>{save(data)},[data]);
 useEffect(()=>{const f=()=>setPage(location.pathname); addEventListener("popstate",f);return()=>removeEventListener("popstate",f)},[]);
 const go=p=>{history.pushState({},'',p);setPage(p)};
 if(page.startsWith("/admin")) return <Admin data={data} setData={setData} go={go}/>;
 if(page.startsWith("/book")) return <Booking data={data} setData={setData} go={go}/>;
 return <Home go={go}/>;
}

function Header({go}){
 return <header className="fixed top-0 z-50 w-full bg-black/75 backdrop-blur-xl border-b border-white/10">
  <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
   <button onClick={()=>go("/")} className="font-black tracking-tight text-lg">RADHE <span className="green">BOX CRICKET</span></button>
   <nav className="hidden md:flex gap-7 text-sm font-bold text-gray-300">
    <a href="#about">About</a><a href="#facilities">Facilities</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a>
   </nav>
   <button onClick={()=>go("/book")} className="btn text-sm">BOOK NOW</button>
  </div>
 </header>
}

function Home({go}){
 return <div>
  <Header go={go}/>
  <section className="min-h-[88vh] relative flex items-end overflow-hidden">
   <img src={img} className="absolute inset-0 w-full h-full object-cover opacity-55" />
   <div className="absolute inset-0 bg-gradient-to-t from-[#050705] via-black/45 to-black/20"/>
   <div className="relative max-w-7xl mx-auto w-full px-5 pb-20 pt-36">
    <div className="inline-flex items-center gap-2 border border-[#b7ff00]/40 bg-black/50 rounded-full px-4 py-2 text-xs font-black green">AHMEDABAD • BOX CRICKET</div>
    <h1 className="text-6xl sm:text-8xl lg:text-[9rem] leading-[.82] font-black tracking-[-.07em] mt-6 max-w-5xl">YOUR GAME.<br/><span className="green">YOUR GROUND.</span></h1>
    <p className="muted max-w-xl mt-7 text-base sm:text-lg">Premium turf. Fast-paced games. Your next match starts here.</p>
    <button onClick={()=>go("/book")} className="btn mt-7 flex items-center gap-2">BOOK YOUR SLOT <ArrowRight size={18}/></button>
   </div>
  </section>
  <section id="about" className="max-w-7xl mx-auto px-5 py-24 grid md:grid-cols-2 gap-12">
   <div><p className="green font-black text-sm">01 / ABOUT</p><h2 className="text-4xl sm:text-6xl font-black mt-3">Built for the<br/>competitive ones.</h2></div>
   <p className="muted text-lg leading-8">Radhe Box Cricket is a modern box-cricket turf in Ahmedabad designed for friends, teams, corporate games and serious practice sessions. Book a slot, show up, and play.</p>
  </section>
  <section id="facilities" className="max-w-7xl mx-auto px-5 pb-24">
   <p className="green font-black text-sm">02 / FACILITIES</p><h2 className="text-4xl sm:text-6xl font-black mt-3 mb-10">Everything you need.</h2>
   <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{["Premium Turf","Floodlights","Changing Area","Parking"].map((x,i)=><div className="card rounded-2xl p-6 min-h-40" key={x}><div className="green font-black text-2xl">0{i+1}</div><h3 className="font-black text-xl mt-10">{x}</h3></div>)}</div>
  </section>
  <section id="gallery" className="max-w-7xl mx-auto px-5 pb-24">
   <p className="green font-black text-sm">03 / GALLERY</p><h2 className="text-4xl sm:text-6xl font-black mt-3 mb-8">Game time.</h2>
   <div className="grid md:grid-cols-3 gap-4"><img src={img} className="rounded-2xl h-72 w-full object-cover md:col-span-2"/><img src={img+"&sat=-20"} className="rounded-2xl h-72 w-full object-cover"/></div>
  </section>
  <section className="bg-[#b7ff00] text-black py-20"><div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-7"><div><p className="font-black text-sm">READY?</p><h2 className="text-5xl sm:text-7xl font-black tracking-tight">LOCK YOUR SLOT.</h2></div><button onClick={()=>go("/book")} className="bg-black text-[#b7ff00] rounded-full px-7 py-4 font-black">BOOK NOW →</button></div></section>
  <section id="contact" className="max-w-7xl mx-auto px-5 py-20"><p className="green font-black text-sm">04 / CONTACT</p><h2 className="text-4xl sm:text-6xl font-black mt-3 mb-8">Come play.</h2><div className="grid sm:grid-cols-3 gap-4">
   <div className="card rounded-2xl p-6"><MapPin className="green"/><p className="font-bold mt-4">Ahmedabad, Gujarat</p><p className="muted text-sm">Exact venue details can be added later.</p></div>
   <div className="card rounded-2xl p-6"><Phone className="green"/><p className="font-bold mt-4">Booking Desk</p><p className="muted text-sm">Demo contact — update before launch.</p></div>
   <a href="https://www.instagram.com/radhe_box_cricker/" target="_blank" className="card rounded-2xl p-6"><Instagram className="green"/><p className="font-bold mt-4">@radhe_box_cricker</p><p className="muted text-sm">Follow on Instagram →</p></a>
  </div></section>
  <footer className="border-t border-white/10 py-8 text-center text-sm muted">© 2026 Radhe Box Cricket • <span className="green">DEMO WEBSITE</span></footer>
 </div>
}

function Booking({data,setData,go}){
 const [date,setDate]=useState(new Date().toISOString().slice(0,10)); const [slot,setSlot]=useState(""); const [name,setName]=useState(""); const [mobile,setMobile]=useState(""); const [msg,setMsg]=useState("");
 const blocked=data.blocked.includes(date);
 const taken=s=>data.bookings.some(b=>b.date===date&&b.slot===s&&b.status!=="rejected");
 const submit=e=>{e.preventDefault();setMsg("");
  if(blocked)return setMsg("This date is blocked. Please choose another date.");
  if(!slot||!name||!/^[6-9]\d{9}$/.test(mobile))return setMsg("Please enter a valid name, mobile and slot.");
  if(taken(slot))return setMsg("That slot is already booked. Please choose another.");
  const b={id:"RB-"+Date.now().toString().slice(-6),date,slot,name,mobile,price:data.price,status:"pending"};
  setData({...data,bookings:[...data.bookings,b]});setMsg(`Booking ${b.id} confirmed as PENDING. Pay at Venue. Please arrive 10 minutes early.`);setSlot("");
 };
 return <div className="min-h-screen bg-[#050705]"><Header go={go}/><main className="max-w-5xl mx-auto px-5 pt-32 pb-20">
  <button onClick={()=>go("/")} className="muted text-sm mb-6">← Back to website</button><div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
   <div><p className="green font-black text-sm">BOOKING</p><h1 className="text-5xl sm:text-7xl font-black tracking-tight mt-2">Pick your<br/><span className="green">game time.</span></h1><p className="muted mt-6">Demo booking system • Pay at Venue • ₹{data.price.toLocaleString("en-IN")} / slot</p></div>
   <form onSubmit={submit} className="card rounded-3xl p-6 sm:p-8 space-y-5">
    <label className="block"><span className="text-sm font-bold">Date</span><input className="input mt-2" type="date" min={new Date().toISOString().slice(0,10)} value={date} onChange={e=>{setDate(e.target.value);setSlot("")}}/></label>
    {blocked?<div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">This date is blocked by admin.</div>:<div><span className="text-sm font-bold">Available slots</span><div className="grid sm:grid-cols-2 gap-2 mt-2">{data.slots.map(s=><button type="button" disabled={taken(s)} onClick={()=>setSlot(s)} key={s} className={`p-3 rounded-xl border text-sm font-bold ${taken(s)?"opacity-30 cursor-not-allowed border-white/10":"border-white/10 hover:border-[#b7ff00]"} ${slot===s?"bg-[#b7ff00] text-black border-[#b7ff00]":""}`}>{s}{taken(s)&&<small className="block">Booked</small>}</button>)}</div></div>}
    <label className="block"><span className="text-sm font-bold">Customer name</span><input className="input mt-2" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></label>
    <label className="block"><span className="text-sm font-bold">Mobile number</span><input className="input mt-2" value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="10-digit mobile"/></label>
    <div className="rounded-xl bg-white/5 p-4 flex justify-between"><span>Payment</span><b className="green">Pay at Venue</b></div>
    {msg&&<div className="rounded-xl border border-[#b7ff00]/30 bg-[#b7ff00]/10 p-4 text-sm">{msg}</div>}
    <button className="btn w-full">CONFIRM BOOKING</button>
   </form>
  </div></main></div>
}

function Admin({data,setData,go}){
 const [authed,setAuthed]=useState(sessionStorage.getItem("rb_admin")==="1"); const [role,setRole]=useState(sessionStorage.getItem("rb_role")||"Owner");
 const [login,setLogin]=useState({email:"",pass:""}); const [tab,setTab]=useState("Dashboard");
 if(!authed)return <div className="min-h-screen flex items-center justify-center p-5 bg-[#050705]"><div className="card rounded-3xl p-8 w-full max-w-md"><Shield className="green mb-6"/><h1 className="text-4xl font-black">Admin login.</h1><p className="muted text-sm mt-2">Demo credentials • Owner: owner@radhebox.demo / radhe123 • Staff: staff@radhebox.demo / staff123</p><input className="input mt-6" placeholder="Email" value={login.email} onChange={e=>setLogin({...login,email:e.target.value})}/><input className="input mt-3" type="password" placeholder="Password" value={login.pass} onChange={e=>setLogin({...login,pass:e.target.value})}/><button className="btn w-full mt-4" onClick={()=>{const ok=(login.email==="owner@radhebox.demo"&&login.pass==="radhe123")||(login.email==="staff@radhebox.demo"&&login.pass==="staff123");if(ok){const r=login.email.startsWith("owner")?"Owner":"Staff";sessionStorage.setItem("rb_admin","1");sessionStorage.setItem("rb_role",r);setRole(r);setAuthed(true)}else alert("Invalid demo credentials")}}>LOGIN</button><button onClick={()=>go("/")} className="w-full mt-4 text-sm muted">← Public website</button></div>;
 const today=new Date().toISOString().slice(0,10); const revenue=data.bookings.filter(b=>b.status==="approved").reduce((a,b)=>a+b.price,0);
 const updateBooking=(id,status)=>setData({...data,bookings:data.bookings.map(b=>b.id===id?{...b,status}:b)});
 const addSlot=()=>{const s=prompt("Enter slot, e.g. 10:00 PM - 11:00 PM");if(s&&!data.slots.includes(s))setData({...data,slots:[...data.slots,s]})};
 return <div className="min-h-screen bg-[#050705]"><header className="border-b border-white/10 sticky top-0 bg-black/90 backdrop-blur z-20"><div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center"><b>RADHE <span className="green">ADMIN</span></b><div className="flex items-center gap-3 text-sm"><span className="muted">{role}</span><button className="border border-white/10 rounded-full px-3 py-2" onClick={()=>{sessionStorage.clear();setAuthed(false)}}>Logout</button></div></div></header>
  <main className="max-w-7xl mx-auto p-5 py-8"><div className="flex flex-wrap gap-2 mb-8">{["Dashboard","Bookings","Slots","Settings"].map(x=><button key={x} onClick={()=>setTab(x)} className={`px-4 py-2 rounded-full text-sm font-bold ${tab===x?"bg-[#b7ff00] text-black":"bg-white/5"}`}>{x}</button>)}</div>
   {tab==="Dashboard"&&<><h1 className="text-4xl sm:text-6xl font-black">Command centre.</h1><p className="muted mt-2">Demo data • local persistence • Supabase-ready architecture</p><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">{[["Today's bookings",data.bookings.filter(b=>b.date===today).length],["Pending",data.bookings.filter(b=>b.status==="pending").length],["Approved revenue","₹"+revenue.toLocaleString("en-IN")],["Blocked dates",data.blocked.length]].map(([a,b])=><div className="card rounded-2xl p-5" key={a}><p className="muted text-sm">{a}</p><p className="text-3xl font-black mt-3">{b}</p></div>)}</div></>}
   {tab==="Bookings"&&<div><h2 className="text-3xl font-black mb-5">Bookings</h2><div className="space-y-3">{data.bookings.map(b=><div className="card rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4" key={b.id}><div><b>{b.id} • {b.name}</b><p className="muted text-sm mt-1">{b.date} • {b.slot} • {b.mobile} • ₹{b.price}</p></div><div className="flex items-center gap-2"><span className={`text-xs px-3 py-1 rounded-full ${b.status==="approved"?"bg-[#b7ff00] text-black":b.status==="rejected"?"bg-red-500/20 text-red-300":"bg-yellow-500/20 text-yellow-300"}`}>{b.status}</span>{b.status==="pending"&&<><button onClick={()=>updateBooking(b.id,"approved")} className="bg-[#b7ff00] text-black p-2 rounded-full"><Check size={16}/></button><button onClick={()=>updateBooking(b.id,"rejected")} className="bg-red-500/20 text-red-300 p-2 rounded-full"><X size={16}/></button></>}</div></div>)}</div></div>}
   {tab==="Slots"&&<div><div className="flex justify-between items-center"><h2 className="text-3xl font-black">Slot management</h2><button className="btn text-sm" onClick={addSlot}>+ Add slot</button></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">{data.slots.map(s=><div className="card rounded-xl p-4 flex justify-between" key={s}><span>{s}</span><button onClick={()=>setData({...data,slots:data.slots.filter(x=>x!==s)})}><X size={17} className="text-red-300"/></button></div>)}</div></div>}
   {tab==="Settings"&&<SettingsPanel data={data} setData={setData} role={role}/>}
  </main>
 </div>
}
function SettingsPanel({data,setData,role}){
 const [price,setPrice]=useState(data.price); const [date,setDate]=useState("");
 return <div><h2 className="text-3xl font-black">Settings</h2><div className="grid md:grid-cols-2 gap-5 mt-6">
  <div className="card rounded-2xl p-6"><p className="font-black">Pricing</p><div className="flex gap-2 mt-4"><input className="input" type="number" value={price} onChange={e=>setPrice(+e.target.value)}/><button className="btn" disabled={role!=="Owner"} onClick={()=>setData({...data,price})}>Save</button></div>{role!=="Owner"&&<p className="text-xs muted mt-2">Owner only.</p>}</div>
  <div className="card rounded-2xl p-6"><p className="font-black">Blocked dates</p><div className="flex gap-2 mt-4"><input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)}/><button className="btn" onClick={()=>date&&!data.blocked.includes(date)&&setData({...data,blocked:[...data.blocked,date]})}>Block</button></div><div className="mt-4 space-y-2">{data.blocked.map(d=><div className="flex justify-between bg-white/5 p-3 rounded-xl" key={d}><span>{d}</span><button onClick={()=>setData({...data,blocked:data.blocked.filter(x=>x!==d)})}><X size={16}/></button></div>)}</div></div>
 </div>
 <div className="card rounded-2xl p-6 mt-5"><p className="font-black">Demo controls</p><p className="muted text-sm mt-1">Reset all local demo data on this browser.</p><button className="mt-4 border border-red-500/40 text-red-300 rounded-full px-4 py-2 text-sm" onClick={()=>{if(confirm("Reset demo data?")){setData(defaultData);localStorage.setItem(KEY,JSON.stringify(defaultData))}}}>Reset demo data</button></div>
 </div>
}
createRoot(document.getElementById("root")).render(<App/>);