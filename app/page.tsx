"use client";

import { useState } from "react";

type Personality = "purist" | "explorer" | "architect" | "celebrant";

const COLORS = ["#F0856A","#FFD97D","#A8C5A0","#8B5A2B","#F4A9A8","#4A7C59","#3D5A80","#C0532A"];

const personalities: Record<Personality, { name: string; coffee: string; tagline: string; description: string; image: string; color: string; emoji: string }> = {
  purist:    { name: "The Purist",    coffee: "Large dark roast, black",          tagline: "Uncomplicated. Uncompromising. Unchanged.", description: "You found your coffee a long time ago and you haven't looked back. Baristas respect you for it. You're not boring — you're certain. In a world of endless options, knowing exactly what you want is a superpower.", image: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=800&q=80", color: "#8B5A2B", emoji: "☕" },
  explorer:  { name: "The Explorer",  coffee: "Seasonal special, whatever's new", tagline: "Every visit is a new discovery.",            description: "You're the first to try the new seasonal. Baristas notice you. You probably already know what's on the menu before you walk in — and you're always the one telling friends what to order. Discovery isn't just how you drink coffee. It's how you live.", image: "https://images.unsplash.com/photo-1643427517196-7822b972517f?w=800&q=80", color: "#4A7C59", emoji: "🧭" },
  architect: { name: "The Architect", coffee: "Signature custom build",           tagline: "Your order is a masterpiece.",               description: "Oat milk, two shots, no foam, 140 degrees. You didn't stumble onto your order — you engineered it. Every detail matters to you, not because you're fussy, but because you know what excellence feels like and you refuse to settle for less.", image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800&q=80", color: "#3D5A80", emoji: "🏗️" },
  celebrant: { name: "The Celebrant", coffee: "Caramel mocha with whip",          tagline: "Every cup is an occasion.",                  description: "For you, coffee isn't just a drink — it's an event. An excuse to gather, to treat yourself, to mark the moment. You bring the energy that turns a Tuesday morning into something worth remembering. Life's too short for boring coffee.", image: "https://images.unsplash.com/photo-1579888071069-c107a6f79d82?w=800&q=80", color: "#C0532A", emoji: "🎉" },
};

const questions = [
  {
    question: "Your perfect Saturday morning looks like...",
    subtitle: "Go with your gut — no wrong answers",
    answers: [
      { emoji: "🏔️", text: "Early hike before anyone else is awake",          personality: "explorer"  as Personality },
      { emoji: "📚", text: "Slowly reading with nowhere to be",                personality: "purist"    as Personality },
      { emoji: "🥞", text: "Big brunch with the whole crew",                   personality: "celebrant" as Personality },
      { emoji: "☕", text: "Making the perfect breakfast, every detail right", personality: "architect" as Personality },
    ],
  },
  {
    question: "When you travel, you tend to...",
    subtitle: "Think about your last trip",
    answers: [
      { emoji: "🗺️", text: "Wing it — best things happen when unplanned",          personality: "explorer"  as Personality },
      { emoji: "🏠", text: "Stick to places you know and love",                    personality: "purist"    as Personality },
      { emoji: "🍽️", text: "Plan around the food and restaurants",                personality: "celebrant" as Personality },
      { emoji: "🎧", text: "Research everything beforehand, have a spreadsheet",   personality: "architect" as Personality },
    ],
  },
  {
    question: "Your ideal work environment is...",
    subtitle: "Where do you do your best work?",
    answers: [
      { emoji: "🔥", text: "Fast-paced, high energy, always something new",     personality: "explorer"  as Personality },
      { emoji: "🤫", text: "Quiet, focused, deep work with no interruptions",   personality: "purist"    as Personality },
      { emoji: "🤝", text: "Collaborative — love bouncing ideas with others",   personality: "celebrant" as Personality },
      { emoji: "🏗️", text: "Structured, with clear processes and high standards", personality: "architect" as Personality },
    ],
  },
  {
    question: "At a dinner party you're the one who...",
    subtitle: "Be honest",
    answers: [
      { emoji: "🌶️", text: "Orders the weirdest thing on the menu",            personality: "explorer"  as Personality },
      { emoji: "💬", text: "Always orders the same reliable favourite",         personality: "purist"    as Personality },
      { emoji: "🎂", text: "Suggests dessert before anyone else does",          personality: "celebrant" as Personality },
      { emoji: "🍷", text: "Asks the waiter about the wine pairing in detail",  personality: "architect" as Personality },
    ],
  },
  {
    question: "Your relationship with mornings is...",
    subtitle: "Morning person or not, no judgement",
    answers: [
      { emoji: "🌅", text: "Up early — first light is your favourite part of the day", personality: "explorer"  as Personality },
      { emoji: "☕", text: "Same ritual every morning, exactly how you like it",        personality: "purist"    as Personality },
      { emoji: "😴", text: "Mornings are slow — that's what weekends are for",         personality: "celebrant" as Personality },
      { emoji: "⚡", text: "Already have the day planned before your first sip",       personality: "architect" as Personality },
    ],
  },
];

function ConfettiStripe() {
  return (
    <div style={{ display: "flex", height: "6px" }}>
      {COLORS.map((c, i) => (
        <div key={i} style={{ flex: 1, background: c }} />
      ))}
    </div>
  );
}

export default function Quiz() {
  const [screen, setScreen] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [scores, setScores] = useState<Record<Personality, number>>({ purist: 0, explorer: 0, architect: 0, celebrant: 0 });
  const [fading, setFading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<{ personality: Personality }[]>([]);

  function handleAnswer(i: number) {
    setSelected(i);
    const p = questions[currentQ].answers[i].personality;
    const ns = { ...scores, [p]: scores[p] + 1 };
    const newHistory = [...history, { personality: p }];
    setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        if (currentQ < questions.length - 1) {
          setScores(ns);
          setHistory(newHistory);
          setCurrentQ(currentQ + 1);
          setSelected(null);
        } else {
          setScores(ns);
          setHistory(newHistory);
          setScreen("result");
        }
        setFading(false);
      }, 200);
    }, 300);
  }

  function handleBack() {
    if (currentQ === 0) return;
    const prev = history[history.length - 1];
    const ns = { ...scores, [prev.personality]: scores[prev.personality] - 1 };
    setFading(true);
    setTimeout(() => {
      setScores(ns);
      setHistory(history.slice(0, -1));
      setCurrentQ(currentQ - 1);
      setSelected(null);
      setFading(false);
    }, 200);
  }

  function handleShare(personalityName: string) {
    const text = `I just found out I'm ${personalityName} at Basecamp Coffee! What's your coffee personality? Take the quiz →`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function getWinner(): Personality {
    return (Object.entries(scores) as [Personality, number][]).sort((a, b) => b[1] - a[1])[0][0];
  }

  function getPercentages() {
    const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
    return (Object.entries(scores) as [Personality, number][])
      .map(([key, val]) => ({ key: key as Personality, pct: Math.round((val / total) * 100) }))
      .sort((a, b) => b.pct - a.pct);
  }

  function restart() {
    setScreen("intro");
    setCurrentQ(0);
    setSelected(null);
    setScores({ purist: 0, explorer: 0, architect: 0, celebrant: 0 });
  }

  const bg = { background: "#FDF6EC", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "system-ui, sans-serif" } as React.CSSProperties;
  const card = { background: "white", borderRadius: "28px", maxWidth: "560px", width: "100%", boxShadow: "0 4px 40px rgba(139,90,43,0.1)", border: "1.5px solid #EAD9B8", overflow: "hidden", opacity: fading ? 0 : 1, transition: "opacity 0.2s ease" } as React.CSSProperties;

  if (screen === "intro") {
    return (
      <div style={bg}>
        <div style={card}>
          <ConfettiStripe />
          <div style={{ padding: "48px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>☕</div>
            <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#B8956A", marginBottom: "12px" }}>Basecamp Coffee</div>
            <h1 style={{ fontSize: "30px", fontWeight: 900, color: "#3D2B1A", marginBottom: "12px", lineHeight: 1.2 }}>{"What's Your Coffee Personality?"}</h1>
            <p style={{ fontSize: "16px", color: "#8B6A4A", marginBottom: "32px", lineHeight: 1.6 }}>{"5 quick questions. We'll tell you exactly who you are — and what you should be drinking."}</p>
            <button
              onClick={() => setScreen("quiz")}
              style={{ background: "#8B5A2B", color: "white", border: "none", borderRadius: "100px", padding: "16px 36px", fontSize: "16px", fontWeight: 700, cursor: "pointer", width: "100%" }}
            >
              Find my coffee personality →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "result") {
    const winner = getWinner();
    const p = personalities[winner];
    const pcts = getPercentages();
    return (
      <div style={bg}>
        <div style={card}>
          <ConfettiStripe />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
          <div style={{ padding: "40px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#B8956A", marginBottom: "8px" }}>Your coffee personality</div>
            <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#3D2B1A", marginBottom: "8px" }}>{p.emoji} {p.name}</h1>
            <p style={{ fontSize: "16px", color: "#8B6A4A", fontStyle: "italic", marginBottom: "16px" }}>&ldquo;{p.tagline}&rdquo;</p>
            <p style={{ fontSize: "15px", color: "#5C3D2A", lineHeight: 1.7, marginBottom: "20px" }}>{p.description}</p>
            <div style={{ background: "#FFF8EE", border: "1.5px solid #EAD9B8", borderRadius: "14px", padding: "16px 20px", marginBottom: "28px" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#B8956A", marginBottom: "6px" }}>Your drink</div>
              <div style={{ fontSize: "17px", fontWeight: 700, color: "#3D2B1A" }}>{p.coffee}</div>
            </div>
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#B8956A", marginBottom: "12px" }}>Your breakdown</div>
              {pcts.map(({ key, pct }) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <div style={{ fontSize: "13px", color: "#8B6A4A", width: "110px", flexShrink: 0 }}>{personalities[key].name}</div>
                  <div style={{ flex: 1, height: "8px", background: "#EAD9B8", borderRadius: "8px", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: personalities[key].color, borderRadius: "8px" }} />
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#3D2B1A", width: "36px", textAlign: "right" }}>{pct}%</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleShare(p.name)}
              style={{ background: "#8B5A2B", color: "white", border: "none", borderRadius: "100px", padding: "14px 28px", fontSize: "15px", fontWeight: 700, cursor: "pointer", width: "100%", marginBottom: "10px" }}
            >
              {copied ? "✓ Copied to clipboard!" : "Share my result 🔗"}
            </button>
            <button
              onClick={restart}
              style={{ background: "white", color: "#8B5A2B", border: "2px solid #EAD9B8", borderRadius: "100px", padding: "14px 28px", fontSize: "15px", fontWeight: 700, cursor: "pointer", width: "100%" }}
            >
              Take it again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  const progress = (currentQ / questions.length) * 100;

  return (
    <div style={bg}>
      <div style={card}>
        <ConfettiStripe />
        <div style={{ padding: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {currentQ > 0 && (
                <button onClick={handleBack} style={{ background: "none", border: "none", color: "#B8956A", fontSize: "14px", fontWeight: 700, cursor: "pointer", padding: 0 }}>← Back</button>
              )}
              <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#B8956A" }}>Question {currentQ + 1} of {questions.length}</div>
            </div>
            <div style={{ fontSize: "12px", color: "#C8A882" }}>{Math.round(progress)}% done</div>
          </div>
          <div style={{ height: "4px", background: "#EAD9B8", borderRadius: "4px", marginBottom: "28px" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "#8B5A2B", borderRadius: "4px", transition: "width 0.3s ease" }} />
          </div>
          <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#3D2B1A", marginBottom: "6px", lineHeight: 1.3 }}>{q.question}</h2>
          <p style={{ fontSize: "14px", color: "#B8956A", fontStyle: "italic", marginBottom: "24px" }}>{q.subtitle}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {q.answers.map((a, i) => (
              <button
                key={i}
                onClick={() => selected === null && handleAnswer(i)}
                style={{
                  border: `2px solid ${selected === i ? "#8B5A2B" : "#EAD9B8"}`,
                  borderRadius: "100px",
                  padding: "14px 20px",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: selected === i ? "white" : "#5C3D2A",
                  background: selected === i ? "#8B5A2B" : "white",
                  cursor: selected === null ? "pointer" : "default",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: "20px" }}>{a.emoji}</span>
                {a.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
