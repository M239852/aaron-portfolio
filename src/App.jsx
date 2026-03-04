import { useState, useEffect, useRef } from "react";

// ─── SVG Icon primitive ───────────────────────────────────────────────────────
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);
const IC = {
  copy:     "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2M8 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2zM12 11v6M9 14h6",
  check:    "M20 6 9 17l-5-5",
  github:   ["M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"],
  linkedin: ["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z","M2 9h4v12H2z","M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  arrow:    "M7 17 17 7M7 7h10v10",
  chevron:  "m6 9 6 6 6-6",
  badge:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  database: ["M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4z","M2 6c0 2.21 4.48 4 10 4s10-1.79 10-4","M2 12c0 2.21 4.48 4 10 4s10-1.79 10-4"],
  layers:   ["M12 2 2 7l10 5 10-5-10-5z","M2 17l10 5 10-5","M2 12l10 5 10-5"],
  cloud:    "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z",
  chart:    ["M18 20V10","M12 20V4","M6 20v-6"],
  terminal: ["M4 17l6-6-6-6","M12 19h8"],
  cpu:      ["M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 0 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 0-2-2V9m0 0h18"],
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { id:1, index:"01", title:"FoodPal", tags:["Python","FastAPI","Streamlit","Yelp API","NLP"], year:"2025",
    description:"AI-powered restaurant recommendation chatbot for DFW. NLP extraction layer parses natural language queries into structured filters; a weighted scoring algorithm (40% rating, 30% price, 20% distance) ranks 300+ live Yelp restaurants with conversational follow-up support.",
    metric:"300+ restaurants", color:"#F97D7D" },
  { id:2, index:"02", title:"Project JANUS", tags:["Unity","C#","VR","UX Research"], year:"2025",
    description:"Capstone VR assessment tool built in Unity, in collaboration with UNT's Psychology department. Room-based triggers — turning off a stove, closing a garage door — measure implicit memory retention to detect early signs of cognitive deterioration.",
    metric:"CS × Psychology", color:"#C77DF9" },
  { id:3, index:"03", title:"ETL Crypto Pipeline", tags:["Python","Pandas","PostgreSQL","Airflow"], year:"2025",
    description:"Python ETL pipeline extracting live cryptocurrency data from CoinGecko API. Pandas transformation layer flattens nested JSON, standardizes schemas, and appends UTC timestamps — loaded into PostgreSQL with Airflow-scheduled refreshes.",
    metric:"Live pipeline", color:"#7DF9B0" },
  { id:4, index:"04", title:"SimCity Urban Sim", tags:["C++","OOP","CSV Parsing","Simulation"], year:"2024",
    description:"Grid-based city simulation modeling Residential, Commercial, and Industrial zone expansion using adjacency-based population rules. Stepwise logic with halting conditions and modular architecture.",
    metric:"Zone sim engine", color:"#7DDBF9" },
  { id:5, index:"05", title:"Retail DB System", tags:["Docker","Azure SQL","SQL","Data Modeling"], year:"2023",
    description:"Containerized retail database on Azure SQL Edge. Designed relational schemas and data-modeling diagrams, implemented advanced SQL for aggregation and joins, deployed via Docker for scalability.",
    metric:"Containerized DB", color:"#F9D97D" },
];

const SKILLS = [
  { icon:"database", label:"Big Data & ETL",  tools:"Pandas, PostgreSQL, SQL, ETL Design" },
  { icon:"layers",   label:"Languages",        tools:"C++, Python, SQL, JavaScript, HTML/CSS" },
  { icon:"cloud",    label:"Cloud Platforms",  tools:"AWS, Microsoft Azure, Google Cloud" },
  { icon:"chart",    label:"Analytics & BI",   tools:"Databricks, PowerBI, Azure Data Studio" },
  { icon:"terminal", label:"Tools & DevOps",   tools:"Docker, GitHub, Airflow, Visual Studio" },
  { icon:"cpu",      label:"Core CS",          tools:"Algorithms, Systems Programming, ML, AI" },
];

const CERTS = [
  { org:"Amazon",    name:"Cloud Technical Essentials" },
  { org:"Google",    name:"Cloud Fundamentals: Core Infrastructure" },
  { org:"Meta",      name:"Introduction to Back-End Development" },
  { org:"Microsoft", name:"Azure Data Fundamentals" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCursor() {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  useEffect(() => {
    const fn = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return pos;
}

// ─── Cursor Glow ──────────────────────────────────────────────────────────────
function CursorGlow() {
  const { x, y } = useCursor();
  return (
    <div style={{
      position: "fixed", pointerEvents: "none", zIndex: 0,
      width: 600, height: 600, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(125,249,176,0.045) 0%, transparent 65%)",
      transform: "translate(-50%,-50%)",
      left: x, top: y,
      transition: "left 0.12s ease-out, top 0.12s ease-out",
    }} />
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      display:"flex", justifyContent:"space-between", alignItems:"center",
      padding:"18px 56px",
      background: scrolled ? "rgba(6,6,8,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      transition: "background 0.5s, border-color 0.5s",
      animation: "slideDown 0.8s cubic-bezier(0.22,1,0.36,1) both",
    }}>
      {/* Logo mark */}
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#7DF9B0,#7DDBF9)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontFamily:"monospace", fontSize:11, fontWeight:700, color:"#08080A", letterSpacing:0 }}>AN</span>
        </div>
      </div>
      <div style={{ display:"flex", gap:36, alignItems:"center" }}>
        {["Work","Expertise","Contact"].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ fontFamily:"monospace", fontSize:10, letterSpacing:"0.22em", color:"rgba(255,255,255,0.35)", textTransform:"uppercase", textDecoration:"none", transition:"color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color="#F2F0EB")}
            onMouseLeave={(e) => (e.target.style.color="rgba(255,255,255,0.35)")}
          >{l}</a>
        ))}
        <a href="mailto:aaron.nguyen703@gmail.com"
          style={{ fontFamily:"monospace", fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", textDecoration:"none", padding:"8px 18px", borderRadius:999, border:"1px solid rgba(125,249,176,0.35)", color:"#7DF9B0", transition:"all 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background="rgba(125,249,176,0.1)"; e.currentTarget.style.borderColor="rgba(125,249,176,0.7)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(125,249,176,0.35)"; }}
        >Hire me</a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 80);
    const stop = setTimeout(() => clearInterval(t), 2200);
    return () => { clearInterval(t); clearTimeout(stop); };
  }, []);

  const chars = "AARON".split("");

  return (
    <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"96px 56px 56px", position:"relative", overflow:"hidden", background:"#06060A" }}>

      {/* Fine dot grid */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize:"32px 32px", opacity:0.25 }} />

      {/* Gradient orbs */}
      <div style={{ position:"absolute", width:800, height:800, borderRadius:"50%", background:"radial-gradient(circle, rgba(125,249,176,0.07) 0%, transparent 65%)", top:"10%", right:"-15%", pointerEvents:"none", filter:"blur(10px)" }} />
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(125,219,249,0.05) 0%, transparent 65%)", bottom:"5%", left:"-10%", pointerEvents:"none", filter:"blur(10px)" }} />

      {/* Ghost year watermark */}
      <div style={{ position:"absolute", right:"-0.05em", bottom:"-0.15em", fontFamily:"Georgia, serif", fontSize:"clamp(12rem, 28vw, 22rem)", fontWeight:700, color:"transparent", WebkitTextStroke:"1px rgba(255,255,255,0.04)", lineHeight:1, pointerEvents:"none", userSelect:"none", letterSpacing:"-0.04em" }}>2026</div>

      <div style={{ position:"relative", zIndex:1, maxWidth:1000 }}>
        {/* Status pill */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:44, padding:"8px 16px", borderRadius:999, border:"1px solid rgba(125,249,176,0.2)", background:"rgba(125,249,176,0.05)", animation:"fadeUp 0.7s 0.05s both" }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"#7DF9B0", boxShadow:"0 0 8px #7DF9B0", display:"inline-block", animation:"pulse 2s ease-in-out infinite" }} />
          <span style={{ fontFamily:"monospace", fontSize:10, letterSpacing:"0.22em", color:"rgba(255,255,255,0.5)", textTransform:"uppercase" }}>Graduating May 2026 · Open to opportunities</span>
        </div>

        {/* Glitch name */}
        <div style={{ marginBottom:8, animation:"fadeUp 0.7s 0.18s both", overflow:"hidden" }}>
          <div style={{ display:"flex", gap:"0.04em" }}>
            {chars.map((c, i) => (
              <span key={i} style={{
                fontFamily:"Georgia, 'Times New Roman', serif",
                fontSize:"clamp(4rem, 11vw, 10rem)",
                lineHeight:1,
                letterSpacing:"-0.03em",
                color:"#F2F0EB",
                display:"inline-block",
                animation:`charDrop 0.6s ${0.25 + i * 0.06}s both cubic-bezier(0.22,1,0.36,1)`,
              }}>{c}</span>
            ))}
          </div>
          <div style={{ display:"flex", gap:"0.04em", marginTop:"0.02em" }}>
            {"NGUYEN".split("").map((c, i) => (
              <span key={i} style={{
                fontFamily:"Georgia, 'Times New Roman', serif",
                fontSize:"clamp(4rem, 11vw, 10rem)",
                lineHeight:1,
                letterSpacing:"-0.03em",
                color:"rgba(242,240,235,0.18)",
                display:"inline-block",
                animation:`charDrop 0.6s ${0.55 + i * 0.055}s both cubic-bezier(0.22,1,0.36,1)`,
              }}>{c}</span>
            ))}
          </div>
        </div>

        {/* Divider line */}
        <div style={{ height:1, width:"100%", maxWidth:640, background:"linear-gradient(90deg, rgba(125,249,176,0.4), rgba(125,219,249,0.2), transparent)", marginBottom:28, animation:"expandX 1s 0.9s both" }} />

        <p style={{ fontFamily:"Georgia, serif", fontStyle:"italic", fontSize:"clamp(1rem, 2vw, 1.2rem)", color:"rgba(255,255,255,0.42)", maxWidth:560, lineHeight:1.8, marginBottom:52, animation:"fadeUp 0.7s 0.85s both" }}>
          Computer Science student at UNT building real data systems — ETL pipelines, cloud infrastructure, and database architecture that scale.
        </p>

        {/* Tag pills */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:10, animation:"fadeUp 0.7s 1s both" }}>
          {["Python · C++","Cloud (AWS / Azure / GCP)","ETL Pipelines","Data Modeling","VR / Unity"].map((tag, i) => (
            <span key={tag} style={{ fontFamily:"monospace", fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", padding:"8px 16px", borderRadius:999, border:"1px solid rgba(255,255,255,0.09)", color:"rgba(255,255,255,0.3)", transition:"all 0.25s", cursor:"default" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(125,249,176,0.3)"; e.currentTarget.style.color="rgba(125,249,176,0.8)"; e.currentTarget.style.background="rgba(125,249,176,0.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(255,255,255,0.09)"; e.currentTarget.style.color="rgba(255,255,255,0.3)"; e.currentTarget.style.background="transparent"; }}
            >{tag}</span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:36, left:56, display:"flex", alignItems:"center", gap:12, animation:"fadeUp 0.7s 1.2s both" }}>
        <div style={{ width:40, height:1, background:"rgba(255,255,255,0.15)" }} />
        <span style={{ fontFamily:"monospace", fontSize:9, letterSpacing:"0.2em", color:"rgba(255,255,255,0.18)", textTransform:"uppercase" }}>Scroll</span>
      </div>
    </section>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ label, number }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ position:"relative", marginBottom:56, opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.7s both" : "none" }}>
      {/* Ghost number */}
      <div style={{ position:"absolute", top:"50%", left:-12, transform:"translateY(-50%)", fontFamily:"Georgia, serif", fontSize:"clamp(5rem, 12vw, 9rem)", fontWeight:700, color:"transparent", WebkitTextStroke:"1px rgba(255,255,255,0.04)", lineHeight:1, pointerEvents:"none", userSelect:"none", letterSpacing:"-0.04em" }}>{number}</div>
      <div style={{ position:"relative", display:"flex", alignItems:"center", gap:16, paddingLeft:4 }}>
        <span style={{ fontFamily:"monospace", fontSize:10, letterSpacing:"0.28em", textTransform:"uppercase", color:"#7DF9B0", opacity:0.7 }}>{number}</span>
        <div style={{ width:32, height:1, background:"rgba(125,249,176,0.3)" }} />
        <span style={{ fontFamily:"Georgia, serif", fontSize:"clamp(1.6rem, 3.5vw, 2.2rem)", color:"#F2F0EB", letterSpacing:"-0.02em" }}>{label}</span>
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useReveal();

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:"relative", borderRadius:20, overflow:"hidden",
        background: hovered ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.02)",
        border:`1px solid ${hovered ? project.color + "45" : "rgba(255,255,255,0.07)"}`,
        minHeight:310, display:"flex", flexDirection:"column",
        cursor:"default",
        transition:"border-color 0.4s, transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s, box-shadow 0.4s",
        transform: hovered ? "translateY(-6px) rotate(-0.4deg)" : "translateY(0) rotate(0deg)",
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px ${project.color}20` : "0 4px 20px rgba(0,0,0,0.2)",
        opacity: visible ? 1 : 0,
        animation: visible ? `fadeUp 0.7s ${delay}s both` : "none",
      }}>

      {/* Color bleed top */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${project.color}, ${project.color}44, transparent)`, opacity: hovered ? 1 : 0, transition:"opacity 0.4s" }} />

      {/* Glow blob behind card on hover */}
      <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", background:`radial-gradient(circle, ${project.color}18 0%, transparent 70%)`, top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", opacity: hovered ? 1 : 0, transition:"opacity 0.4s", filter:"blur(20px)" }} />

      <div style={{ padding:"28px 28px 24px", display:"flex", flexDirection:"column", flex:1, position:"relative" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <span style={{ fontFamily:"monospace", fontSize:10, color:"rgba(255,255,255,0.18)", letterSpacing:"0.15em" }}>{project.index}</span>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontFamily:"monospace", fontSize:10, color:"rgba(255,255,255,0.18)" }}>{project.year}</span>
            <span style={{ color:`${project.color}`, opacity: hovered ? 1 : 0, transition:"opacity 0.2s, transform 0.2s", transform: hovered ? "translate(0,0)" : "translate(-4px, 4px)", display:"flex" }}>
              <Icon d={IC.arrow} size={13} />
            </span>
          </div>
        </div>

        <h3 style={{ fontFamily:"Georgia, serif", fontSize:"1.35rem", color:"#F2F0EB", letterSpacing:"-0.01em", marginBottom:14, lineHeight:1.2 }}>{project.title}</h3>

        <div style={{ flex:1, minHeight:88 }}>
          {hovered
            ? <p style={{ fontSize:"0.83rem", color:"rgba(255,255,255,0.48)", lineHeight:1.82, animation:"fadeIn 0.2s both" }}>{project.description}</p>
            : <div style={{ animation:"fadeIn 0.2s both" }}>
                <span style={{ fontFamily:"monospace", fontSize:"1.25rem", fontWeight:700, color:project.color, display:"block", lineHeight:1.2 }}>{project.metric}</span>
                <div style={{ marginTop:8, height:2, width:40, background:`linear-gradient(90deg, ${project.color}60, transparent)`, borderRadius:999 }} />
              </div>
          }
        </div>

        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:22 }}>
          {project.tags.map((t) => (
            <span key={t} style={{ fontFamily:"monospace", fontSize:9, padding:"4px 10px", borderRadius:999, background:`${project.color}10`, color:project.color, border:`1px solid ${project.color}25`, letterSpacing:"0.08em" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Work ─────────────────────────────────────────────────────────────────────
function Work() {
  return (
    <section id="work" style={{ padding:"120px 56px", background:"#06060A", position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:1160, margin:"0 auto" }}>
        <SectionHeader label="Engineering Projects" number="01" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:18 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Expertise ────────────────────────────────────────────────────────────────
function Expertise() {
  const [ref, visible] = useReveal();
  return (
    <section id="expertise" style={{ padding:"120px 56px", background:"#09090D", position:"relative" }}>
      {/* Subtle section divider */}
      <div style={{ position:"absolute", top:0, left:56, right:56, height:1, background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
      <div style={{ maxWidth:1160, margin:"0 auto" }}>
        <SectionHeader label="Expertise" number="02" />

        <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:14 }}>
          {SKILLS.map(({ icon, label, tools }, i) => (
            <div key={label}
              style={{ padding:"22px", borderRadius:16, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"flex-start", gap:14, transition:"border-color 0.25s, background 0.25s, transform 0.25s", opacity: visible ? 1 : 0, animation: visible ? `fadeUp 0.65s ${i * 0.07}s both` : "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(125,249,176,0.22)"; e.currentTarget.style.background="rgba(125,249,176,0.03)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"; e.currentTarget.style.background="rgba(255,255,255,0.02)"; e.currentTarget.style.transform="translateY(0)"; }}
            >
              <div style={{ padding:10, borderRadius:12, background:"rgba(125,249,176,0.07)", flexShrink:0, color:"#7DF9B0" }}>
                <Icon d={IC[icon]} size={15} />
              </div>
              <div>
                <p style={{ color:"#F2F0EB", fontSize:"0.87rem", fontWeight:600, marginBottom:5 }}>{label}</p>
                <p style={{ fontFamily:"monospace", fontSize:10, color:"rgba(255,255,255,0.28)", lineHeight:1.75 }}>{tools}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ marginTop:44, opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.65s 0.48s both" : "none" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
            <span style={{ color:"#7DF9B0", opacity:0.7, display:"flex" }}><Icon d={IC.badge} size={12} /></span>
            <span style={{ fontFamily:"monospace", fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)" }}>Certifications</span>
            <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.05)" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(210px, 1fr))", gap:12 }}>
            {CERTS.map(({ org, name }) => (
              <div key={org}
                style={{ padding:"16px 18px", borderRadius:14, background:"rgba(125,249,176,0.025)", border:"1px solid rgba(125,249,176,0.09)", display:"flex", flexDirection:"column", gap:6, transition:"border-color 0.2s, background 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(125,249,176,0.22)"; e.currentTarget.style.background="rgba(125,249,176,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(125,249,176,0.09)"; e.currentTarget.style.background="rgba(125,249,176,0.025)"; }}
              >
                <span style={{ fontFamily:"monospace", fontSize:9, color:"#7DF9B0", letterSpacing:"0.18em", textTransform:"uppercase", opacity:0.8 }}>{org}</span>
                <span style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.45)", lineHeight:1.5 }}>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ marginTop:14, padding:"22px 28px", borderRadius:16, background:"linear-gradient(135deg, rgba(125,249,176,0.04), rgba(125,219,249,0.02))", border:"1px solid rgba(125,249,176,0.1)", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:14, opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.65s 0.62s both" : "none" }}>
          <div>
            <p style={{ color:"#F2F0EB", fontSize:"0.9rem", fontWeight:600 }}>B.S. Computer Science</p>
            <p style={{ fontFamily:"monospace", fontSize:10, color:"rgba(255,255,255,0.28)", marginTop:5, letterSpacing:"0.05em" }}>University of North Texas · Expected May 2026</p>
          </div>
          <span style={{ fontFamily:"monospace", fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", padding:"8px 16px", borderRadius:999, background:"rgba(125,249,176,0.07)", color:"#7DF9B0", border:"1px solid rgba(125,249,176,0.18)" }}>UNT ✦ Denton, TX</span>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [copied, setCopied] = useState(false);
  const [ref, visible] = useReveal();
  const email = "aaron.nguyen703@gmail.com";
  const copyEmail = () => { navigator.clipboard.writeText(email).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2500); };

  return (
    <section id="contact" style={{ padding:"120px 56px 80px", background:"#06060A", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:56, right:56, height:1, background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
      {/* Big ghost text */}
      <div style={{ position:"absolute", bottom:"-0.1em", right:"-0.04em", fontFamily:"Georgia, serif", fontSize:"clamp(10rem, 24vw, 20rem)", fontWeight:700, color:"transparent", WebkitTextStroke:"1px rgba(255,255,255,0.03)", lineHeight:1, pointerEvents:"none", userSelect:"none", letterSpacing:"-0.04em" }}>hello</div>

      <div ref={ref} style={{ maxWidth:1160, margin:"0 auto", position:"relative", zIndex:1 }}>
        <SectionHeader label="Get in Touch" number="03" />

        <h2 style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:"clamp(2.8rem, 7vw, 6rem)", color:"#F2F0EB", letterSpacing:"-0.025em", lineHeight:1.04, marginBottom:20, opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.7s 0.05s both" : "none" }}>
          Let's build<br />
          <span style={{ WebkitTextStroke:"1px rgba(242,240,235,0.25)", color:"transparent" }}>something real.</span>
        </h2>

        <p style={{ fontFamily:"Georgia, serif", fontStyle:"italic", fontSize:"1.05rem", color:"rgba(255,255,255,0.32)", maxWidth:400, lineHeight:1.8, marginBottom:52, opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.7s 0.15s both" : "none" }}>
          Open to internships, co-ops, and new grad roles in data engineering, cloud, and backend development.
        </p>

        <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:80, opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.7s 0.25s both" : "none" }}>
          <button onClick={copyEmail}
            style={{ display:"flex", alignItems:"center", gap:10, padding:"13px 26px", borderRadius:999, fontFamily:"monospace", fontSize:12, cursor:"pointer", transition:"all 0.3s", background: copied ? "rgba(125,249,176,0.12)" : "rgba(255,255,255,0.05)", border: copied ? "1px solid rgba(125,249,176,0.4)" : "1px solid rgba(255,255,255,0.1)", color: copied ? "#7DF9B0" : "rgba(255,255,255,0.5)", letterSpacing:"0.05em" }}>
            <Icon d={copied ? IC.check : IC.copy} size={13} />
            {copied ? "Copied!" : email}
          </button>
          {[
            { icon:"github",   label:"GitHub",   href:"https://github.com/M239852" },
            { icon:"linkedin", label:"LinkedIn", href:"https://linkedin.com/in/aaronnguyencs" },
          ].map(({ icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", gap:8, padding:"13px 22px", borderRadius:999, fontFamily:"monospace", fontSize:12, textDecoration:"none", transition:"all 0.2s", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.35)", letterSpacing:"0.05em" }}
              onMouseEnter={(e) => { e.currentTarget.style.color="#F2F0EB"; e.currentTarget.style.borderColor="rgba(255,255,255,0.22)"; e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color="rgba(255,255,255,0.35)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.background="transparent"; }}>
              <Icon d={IC[icon]} size={13} />
              {label}
            </a>
          ))}
        </div>

        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:12, paddingTop:28, borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ fontFamily:"monospace", fontSize:10, color:"rgba(255,255,255,0.18)", letterSpacing:"0.1em" }}>© 2025 Aaron Nguyen</span>
          <span style={{ fontFamily:"monospace", fontSize:10, color:"rgba(255,255,255,0.12)", letterSpacing:"0.1em" }}>CS @ UNT · Denton, TX</span>
        </div>
      </div>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background:"#06060A", minHeight:"100vh" }}>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:rgba(125,249,176,0.2); color:#F2F0EB; }
        button { outline:none; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes slideDown {
          from { opacity:0; transform:translateY(-32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes charDrop {
          from { opacity:0; transform:translateY(60px) skewY(4deg); }
          to   { opacity:1; transform:translateY(0) skewY(0deg); }
        }
        @keyframes expandX {
          from { transform:scaleX(0); transform-origin:left; opacity:0; }
          to   { transform:scaleX(1); transform-origin:left; opacity:1; }
        }
        @keyframes pulse {
          0%,100% { opacity:1; box-shadow:0 0 6px #7DF9B0; }
          50%      { opacity:0.5; box-shadow:0 0 14px #7DF9B0; }
        }

        @media (max-width:640px) {
          section { padding-left:20px !important; padding-right:20px !important; padding-top:80px !important; padding-bottom:80px !important; }
          nav { padding-left:20px !important; padding-right:20px !important; }
          nav a[href^="mailto"] { display:none; }
        }
      `}</style>
      <CursorGlow />
      <Nav />
      <Hero />
      <Work />
      <Expertise />
      <Contact />
    </div>
  );
}
