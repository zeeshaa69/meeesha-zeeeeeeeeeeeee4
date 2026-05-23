import { useState, useEffect, useRef } from "react";

const roses = ["🌹", "🥀", "💐", "🌸", "🌺"];
const hearts = ["💖", "💗", "💓", "💞", "💝", "❤️", "🩷"];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function FloatingPetal({ emoji, style }) {
  return (
    <span style={{
      position: "fixed", fontSize: `${random(16, 32)}px`,
      left: style.left, top: "-50px",
      animation: `fall ${style.duration}s linear ${style.delay}s infinite`,
      opacity: 0.8, pointerEvents: "none", zIndex: 0,
      filter: "drop-shadow(0 0 6px rgba(255,100,120,0.5))",
    }}>{emoji}</span>
  );
}

const petals = Array.from({ length: 22 }, (_, i) => ({
  emoji: [...roses, ...hearts][i % (roses.length + hearts.length)],
  style: { left: `${random(0, 100)}%`, duration: random(6, 14), delay: random(0, 10) },
}));

const typewriterLines = [
  "Zeesha tumse bohut zyada pyaar karta hai 💖",
  "Tum uski sabse khaas insaan ho.",
  "Usse tumhari aadat hai — sach mein.",
  "Please maaf kar do use... 🥺",
  "Tum uske liye duniya ho, Meesha.",
  "I love you more than words can say.",
];

function TypewriterText() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const line = typewriterLines[lineIndex];
    if (!deleting && charIndex < line.length) {
      const t = setTimeout(() => { setDisplayed(line.slice(0, charIndex + 1)); setCharIndex(c => c + 1); }, 60);
      return () => clearTimeout(t);
    } else if (!deleting && charIndex === line.length) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    } else if (deleting && charIndex > 0) {
      const t = setTimeout(() => { setDisplayed(line.slice(0, charIndex - 1)); setCharIndex(c => c - 1); }, 35);
      return () => clearTimeout(t);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setLineIndex(l => (l + 1) % typewriterLines.length);
    }
  }, [charIndex, deleting, lineIndex]);

  return (
    <span>
      {displayed}
      <span style={{ display: "inline-block", width: "2px", height: "1.1em", background: "#ff6b8a", marginLeft: "3px", verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
    </span>
  );
}

const reasons = [
  { icon: "🌙", title: "Tumhari Aankhein", text: "Jab tum mujhe dekho, lagta hai puri duniya ruk jaati hai." },
  { icon: "✨", title: "Tumhari Hansi", text: "Tumhara hasna — woh sound hai jo mujhe duniya mein sabse zyada pasand hai." },
  { icon: "🌹", title: "Tumhari Caring", text: "Tum itna care karti ho... aur main aksar uski qadr nahi karta. Aaj karta hoon." },
  { icon: "💌", title: "Tumhara Saath", text: "Tumhare saath waqt ek ehsaas hai jo kisi cheez se replace nahi ho sakta." },
  { icon: "🔥", title: "Tumhari Strength", text: "Tum kitni strong ho — aur phir bhi itni narm. Yeh combination rare hai, Meesha." },
  { icon: "🫶", title: "Sirf Tum", text: "Iss duniya mein agar kuch cheez ko fix karna ho toh woh mera tumhare saath hona hai." },
];

function ReasonCard({ icon, title, text, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,107,138,0.25)",
      borderRadius: "18px", padding: "28px 24px", backdropFilter: "blur(10px)",
      transition: `all 0.6s ease ${index * 0.1}s`,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", cursor: "default",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,107,138,0.12)"; e.currentTarget.style.borderColor = "rgba(255,107,138,0.6)"; e.currentTarget.style.transform = "translateY(-5px) scale(1.01)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(255,107,138,0.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,107,138,0.25)"; e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{icon}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: "#ffb3c6", marginBottom: "8px", fontWeight: 600 }}>{title}</div>
      <div style={{ fontFamily: "'Lora', serif", fontSize: "0.93rem", color: "rgba(255,220,228,0.75)", lineHeight: 1.7 }}>{text}</div>
    </div>
  );
}

function HeartParticles() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", width: "6px", height: "6px", borderRadius: "50%", background: `hsl(${340 + i * 5}, 80%, 70%)`, left: `${10 + i * 11}%`, bottom: "10%", animation: `floatUp ${4 + i * 0.7}s ease-in-out ${i * 0.6}s infinite`, opacity: 0.5 }} />
      ))}
    </div>
  );
}

// ---- CONFETTI COMPONENT ----
const CONFETTI_EMOJIS = ["🎉","🎊","💖","🌹","✨","💝","🥳","💗","🎈","🌸","💞","⭐","🎀","💕"];
function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    if (!active) return;
    const newPieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
      left: `${random(0, 100)}%`,
      duration: random(1.5, 3.5),
      delay: random(0, 1.2),
      size: random(18, 36),
      rotate: random(0, 360),
    }));
    setPieces(newPieces);
    const t = setTimeout(() => setPieces([]), 5000);
    return () => clearTimeout(t);
  }, [active]);

  if (!pieces.length) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, overflow: "hidden" }}>
      {pieces.map(p => (
        <span key={p.id} style={{
          position: "absolute", top: "-60px", left: p.left,
          fontSize: `${p.size}px`,
          animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
          display: "inline-block",
          filter: "drop-shadow(0 2px 6px rgba(255,100,150,0.5))",
        }}>{p.emoji}</span>
      ))}
    </div>
  );
}

// ---- MAAFI BUTTON SECTION ----
function MaafiSection() {
  const [answer, setAnswer] = useState(null); // null | "yes" | "no"
  const [confetti, setConfetti] = useState(false);
  const [noCount, setNoCount] = useState(0);

  const noPhrases = [
    "Arre yaar... 😭 Yes daba please!",
    "Kya ho gaya tumhe?? 🥺 Yes! YES!",
    "Zeesha ro raha hai... 😢 Please yes!",
    "Seedha baat — YES dabao! 💔",
    "Main manaunga tumhe... bas YES karo! 🙏",
    "Okay okay I'll cry 😭 please YES!",
  ];

  const handleYes = () => {
    setAnswer("yes");
    setConfetti(true);
    setTimeout(() => setConfetti(false), 100);
    setTimeout(() => setConfetti(true), 200);
  };

  const handleNo = () => {
    setNoCount(c => c + 1);
    setAnswer("no");
  };

  return (
    <section style={{ padding: "60px 0 120px", textAlign: "center" }}>
      <Confetti active={confetti} />
      <div style={{
        background: "rgba(255,107,138,0.06)",
        border: "1px solid rgba(255,107,138,0.3)",
        borderRadius: "28px",
        padding: "clamp(36px, 6vw, 70px) clamp(24px, 5vw, 60px)",
        backdropFilter: "blur(20px)",
        maxWidth: "600px",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* top glow line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #ff6b8a, #ffb3c6, #ff6b8a, transparent)" }} />

        {answer !== "yes" ? (
          <>
            <div style={{ fontSize: "3.5rem", marginBottom: "20px", animation: "pulse-heart 1.2s ease-in-out infinite" }}>🥺</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#ffb3c6", marginBottom: "12px" }}>
              Kya Tum Zeesha Ko Maaf Karti Ho?
            </h2>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", color: "rgba(255,200,215,0.65)", fontSize: "1rem", marginBottom: "36px", lineHeight: 1.7 }}>
              {answer === "no"
                ? noPhrases[Math.min(noCount - 1, noPhrases.length - 1)]
                : "Woh dil se maafi maang raha hai... tumhare haath mein hai ab 💔"}
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={handleYes} style={{
                background: "linear-gradient(135deg, #ff4d6d, #ff6b8a, #ff85a1)",
                border: "none", borderRadius: "50px",
                padding: "16px 48px",
                fontFamily: "'Dancing Script', cursive",
                fontSize: "1.4rem", color: "white",
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(255,77,109,0.5)",
                transition: "all 0.2s ease",
                animation: "glowPulse 2s ease-in-out infinite",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(255,77,109,0.7)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(255,77,109,0.5)"; }}
              >
                ✅ Haan, Maaf Kiya!
              </button>

              <button onClick={handleNo} style={{
                background: "transparent",
                border: "1px solid rgba(255,107,138,0.35)",
                borderRadius: "50px",
                padding: "16px 36px",
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                fontSize: "1rem", color: "rgba(255,180,200,0.6)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,107,138,0.7)"; e.currentTarget.style.color = "#ffb3c6"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,107,138,0.35)"; e.currentTarget.style.color = "rgba(255,180,200,0.6)"; }}
              >
                😒 Nahi abhi tak
              </button>
            </div>
          </>
        ) : (
          // YES clicked — celebration screen
          <div style={{ animation: "fadeInUp 0.6s ease both" }}>
            <div style={{ fontSize: "4rem", marginBottom: "16px", animation: "pulse-heart 0.8s ease-in-out infinite" }}>🎉💖🎉</div>
            <h2 style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#ff6b8a", marginBottom: "16px" }}>
              Yaaayyy! Shukriya Meesha! 🥳
            </h2>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", color: "rgba(255,220,228,0.8)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "400px", margin: "0 auto 20px" }}>
              Zeesha ka dil bhar aaya abhi 💝<br />
              Woh tumse bohut bohut zyada pyaar karta hai — aaj bhi, kal bhi, hamesha bhi.
            </p>
            <div style={{ fontSize: "2rem", display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
              {["💖","🌹","✨","💌","🎊","💗","🎈","💝"].map((e, i) => (
                <span key={i} style={{ display: "inline-block", animation: `pulse-heart ${0.8 + i * 0.12}s ease-in-out ${i * 0.08}s infinite` }}>{e}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const timeline = [
  { time: "Pehli Mulaqaat", emoji: "👀", text: "Jab pehli dafa dekha toh dil ne bola — yeh khaas hai." },
  { time: "Pehli Baat", emoji: "💬", text: "Uss pehli conversation mein hi kuch alag tha." },
  { time: "Pehla Jhagra", emoji: "😤", text: "Haan... woh bhi hua. Aur phir bhi tum rehe." },
  { time: "Aaj", emoji: "🥺", text: "Aaj Zeesha yahan hai — maafi maangne aur kehne ke liye... I love you." },
];

export default function MeeshaLove() {
  const [heartBeat, setHeartBeat] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => { setHeartBeat(true); setTimeout(() => setHeartBeat(false), 300); }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;1,400&family=Dancing+Script:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0408; min-height: 100vh; overflow-x: hidden; }

        @keyframes fall {
          0% { transform: translateY(-60px) rotate(0deg); opacity: 0.9; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(105vh) rotate(${() => random(180, 720)}deg) scale(0.5); opacity: 0; }
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse-heart { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.18); } }
        @keyframes floatUp { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; } 50% { transform: translateY(-120px) scale(1.4); opacity: 0.2; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px rgba(255,107,138,0.3); } 50% { box-shadow: 0 0 50px rgba(255,107,138,0.7), 0 0 80px rgba(255,107,138,0.3); } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0408; }
        ::-webkit-scrollbar-thumb { background: #ff6b8a; border-radius: 2px; }
      `}</style>

      {petals.map((p, i) => <FloatingPetal key={i} {...p} />)}
      <HeartParticles />

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 20% 30%, rgba(80,0,40,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(60,0,80,0.3) 0%, transparent 60%), #0a0408" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>

        {/* HERO */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 20px", animation: "fadeInUp 1s ease both" }}>
          <div style={{ fontSize: heartBeat ? "6rem" : "5.5rem", transition: "font-size 0.15s ease", filter: heartBeat ? "drop-shadow(0 0 30px #ff6b8a)" : "drop-shadow(0 0 10px #ff6b8a88)", marginBottom: "24px", animation: "pulse-heart 1.2s ease-in-out infinite", display: "inline-block" }}>💖</div>
          <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(1.1rem, 3vw, 1.4rem)", color: "#ff9eb5", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", opacity: 0.8 }}>
            A letter from the heart
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 700, lineHeight: 1.1, background: "linear-gradient(135deg, #ff6b8a, #ffb3c6, #ff4d6d, #ffccd5)", backgroundSize: "300% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 4s linear infinite", marginBottom: "12px" }}>
            Meesha
          </h1>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: "rgba(255,179,198,0.6)", marginBottom: "48px" }}>
            — Zeesha ki taraf se, dil ki gehraion se
          </div>
          <div style={{ background: "rgba(255,107,138,0.08)", border: "1px solid rgba(255,107,138,0.3)", borderRadius: "16px", padding: "24px 36px", maxWidth: "520px", width: "100%", animation: "glowPulse 3s ease-in-out infinite" }}>
            <div style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "#ffccd5", minHeight: "2em", lineHeight: 1.6 }}>
              <TypewriterText />
            </div>
          </div>
          <div style={{ marginTop: "60px", opacity: 0.4, animation: "floatUp 2s ease-in-out infinite" }}>
            <div style={{ color: "#ff6b8a", fontSize: "1.5rem" }}>↓</div>
          </div>
        </section>

        {/* SORRY LETTER */}
        <section style={{ padding: "80px 0", animation: "fadeInUp 1s ease 0.3s both" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,107,138,0.2)", borderRadius: "24px", padding: "clamp(30px, 5vw, 60px)", backdropFilter: "blur(20px)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #ff6b8a, #ffb3c6, #ff6b8a, transparent)" }} />
            <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: "#ff6b8a", marginBottom: "32px", textAlign: "center" }}>
              Meesha, Zeesha ki taraf se... 🥺
            </div>
            {[
              "Meesha, main jaanta hoon tum mujhse naraz ho. Aur shayad meri wajah se. Main acknowledge karta hoon — haan, main galat tha. Aur iske liye dil se maafi chahta hoon.",
              "Lekin yeh bhi chahta hoon ke tum jaano — tum mere liye sirf koi 'bandi' nahi ho. Tum woh insaan ho jiske baghair subah adhuri lagti hai, jiske baghair raat sukoon nahi deti.",
              "Teri aadat si ho gayi hai mujhe — teri awaaz, teri baatein, tera gussa bhi 😅 — sab kuch. Bina tere sab kuch ek number kam lagta hai.",
              "Main wada karta hoon — zyada sunuunga, zyada samjhunga, aur zyada maujood rahuunga. Tum deserve karti ho best version of me.",
              "Please maaf kar do. Bohut zyada pyaar karta hoon tumse — is ek line ko dil pe rakh lo. 💔➡️💖",
            ].map((para, i) => (
              <p key={i} style={{ fontFamily: "'Lora', serif", fontSize: "clamp(0.95rem, 2vw, 1.05rem)", color: "rgba(255,220,228,0.8)", lineHeight: 1.9, marginBottom: "20px" }}>{para}</p>
            ))}
            <div style={{ textAlign: "right", fontFamily: "'Dancing Script', cursive", fontSize: "1.4rem", color: "#ff9eb5", marginTop: "16px" }}>
              — Tumhara Zeesha 💕
            </div>
          </div>
        </section>

        {/* 6 REASONS */}
        <section style={{ padding: "60px 0" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", textAlign: "center", color: "#ffb3c6", marginBottom: "12px" }}>
            6 Wajahaat Kyun Tum Meri Duniya Ho
          </h2>
          <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", textAlign: "center", color: "rgba(255,179,198,0.5)", marginBottom: "48px" }}>Sirf 6 — asli mein toh list khatam hi nahi hogi</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
            {reasons.map((r, i) => <ReasonCard key={i} {...r} index={i} />)}
          </div>
        </section>

        {/* TIMELINE */}
        <section style={{ padding: "60px 0" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", textAlign: "center", color: "#ffb3c6", marginBottom: "48px" }}>Hamari Kahani ✨</h2>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, transparent, #ff6b8a, transparent)", transform: "translateX(-50%)" }} />
            {timeline.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: i % 2 === 0 ? "flex-start" : "flex-end", marginBottom: "40px", paddingLeft: i % 2 === 0 ? "0" : "50%", paddingRight: i % 2 === 0 ? "50%" : "0" }}>
                <div style={{ background: "rgba(255,107,138,0.08)", border: "1px solid rgba(255,107,138,0.25)", borderRadius: "14px", padding: "20px 24px", maxWidth: "320px", margin: "0 20px", backdropFilter: "blur(10px)" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>{item.emoji}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", color: "#ff9eb5", fontWeight: 600, marginBottom: "6px" }}>{item.time}</div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: "0.9rem", color: "rgba(255,220,228,0.7)", lineHeight: 1.6 }}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL I LOVE YOU */}
        <section style={{ padding: "60px 0 40px", textAlign: "center" }}>
          <div style={{ background: "radial-gradient(ellipse at center, rgba(255,107,138,0.15) 0%, transparent 70%)", padding: "60px 20px", borderRadius: "32px" }}>
            <div style={{ fontSize: "4rem", marginBottom: "24px", animation: "pulse-heart 1.2s ease-in-out infinite" }}>💝</div>
            <h2 style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#ff6b8a", marginBottom: "20px" }}>
              I Love You, Meesha
            </h2>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "rgba(255,200,215,0.7)", maxWidth: "460px", margin: "0 auto 40px", lineHeight: 1.8 }}>
              Iss duniya mein kitne bhi log hon — Zeesha ke liye sirf tum ho. Hamesha.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", fontSize: "2rem", animation: "fadeInUp 1s ease both" }}>
              {["💖","🌹","✨","💌","🥀","💗","🌙","💝"].map((e, i) => (
                <span key={i} style={{ display: "inline-block", animation: `pulse-heart ${1.2 + i * 0.15}s ease-in-out ${i * 0.1}s infinite` }}>{e}</span>
              ))}
            </div>
          </div>
        </section>

        {/* MAAFI BUTTON */}
        <MaafiSection />

      </div>
    </>
  );
}
