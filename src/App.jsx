import React, { useEffect, useMemo, useState } from "react";

const botReplies = [
  "좋은 질문이에요. 다른 분들 생각은 어떠세요?",
  "조금 더 구체적으로 이야기해 주실 수 있을까요?",
  "같은 주제로 SyncAI가 맥락을 정리해볼게요.",
  "지금 흐름이 좋아요. 팀 논의를 먼저 들어볼게요.",
];

const initialMessages = [
  { id: 1, from: "me", name: "나", text: "안녕하세요, 오늘 처음 참여했어요." },
  { id: 2, from: "mingle", name: "밍글AI", text: "반가워요. 관심 주제부터 가볍게 나눠볼까요?" },
  { id: 3, from: "sync", name: "싱크AI", text: "지난 대화 핵심 3가지를 먼저 정리해둘게요." },
];

export default function App() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const heroLine1 = "전략적 침묵으로";
  const heroLine2 = "완성하는 협업";
  const heroTitle = `${heroLine1}${heroLine2}`;
  const [typedTitle, setTypedTitle] = useState("");

  const reply = useMemo(
    () => botReplies[Math.floor(Math.random() * botReplies.length)],
    [messages.length]
  );

  useEffect(() => {
    document.body.style.overflow = popupOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [popupOpen]);

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let timeoutId;

    const tick = () => {
      if (!isDeleting && index < heroTitle.length) {
        index += 1;
      } else if (isDeleting && index > 0) {
        index -= 1;
      }

      setTypedTitle(heroTitle.slice(0, index));

      if (!isDeleting && index === heroTitle.length) {
        isDeleting = true;
        timeoutId = setTimeout(tick, 1200);
        return;
      }

      if (isDeleting && index === 0) {
        isDeleting = false;
        timeoutId = setTimeout(tick, 400);
        return;
      }

      timeoutId = setTimeout(tick, isDeleting ? 60 : 110);
    };

    timeoutId = setTimeout(tick, 350);

    return () => clearTimeout(timeoutId);
  }, [heroTitle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = chatInput.trim();
    if (!value) return;
    const newId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: newId, from: "me", name: "나", text: value },
      { id: newId + 1, from: "mirae", name: "미래AI", text: reply },
    ]);
    setChatInput("");
  };

  const openPopup = (e) => {
    e.preventDefault();
    setPopupOpen(true);
  };

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top">
            <span className="brand-mark">M</span>
            <span className="brand-text">미래생각연구소 FTRI</span>
          </a>
          <div className="nav-links">
            <a href="#philosophy">철학</a>
            <a href="#agents">에이전트</a>
            <a href="#demo">데모</a>
            <a href="#final">신청</a>
          </div>
          <a className="btn btn-primary nav-btn" href="#final" onClick={openPopup}>
            베타 참여
          </a>
        </div>
      </nav>

      <header id="top" className="hero section">
        <div className="container hero-grid">
          <div>
            <p className="kicker">FTRI / BLUE SYSTEM</p>
            <h1>
              <span className="title-line">
                {typedTitle.slice(0, heroLine1.length) || "\u00A0"}
              </span>
              <span className="title-line">
                {typedTitle.slice(heroLine1.length) || "\u00A0"}
                <span className="typing-cursor" aria-hidden="true" />
              </span>
            </h1>
            <p className="lede">
              미래AI는 필요한 순간에만 개입하는 멀티 에이전트 오케스트레이터입니다.
              이제 전체 톤은 네이비와 라이트 블루로 통일했습니다.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#final" onClick={openPopup}>
                무료로 시작하기
              </a>
              <a className="btn btn-ghost" href="#demo">
                데모 보기
              </a>
            </div>
          </div>
          <div className="hero-art">
            <img src="/assets/mirae-lab-hero.jpg" alt="Mirae Lab" />
          </div>
        </div>
      </header>

      <section id="philosophy" className="section dark">
        <div className="container">
          <p className="kicker">DESIGN PRINCIPLE</p>
          <h2>말 많은 AI보다, 필요한 순간의 정확한 개입</h2>
          <p className="lede">
            선택적 개입, 자율성 존중, 맥락 유지라는 세 가지 원칙으로 협업 리듬을 지킵니다.
          </p>
        </div>
      </section>

      <section id="agents" className="section">
        <div className="container">
          <p className="kicker">SPECIALIST AGENTS</p>
          <div className="cards">
            <article className="card">
              <img src="/assets/agent-mangul.png" alt="밍글AI" />
              <h3>밍글AI</h3>
              <p>온보딩과 정서적 완충</p>
            </article>
            <article className="card">
              <img src="/assets/agent-sync.png" alt="싱크AI" />
              <h3>싱크AI</h3>
              <p>쟁점 정렬과 문맥 요약</p>
            </article>
            <article className="card">
              <img src="/assets/agent-ellen.png" alt="코드AI" />
              <h3>코드AI</h3>
              <p>아이디어를 실행 가능한 빌드로 전환</p>
            </article>
          </div>
        </div>
      </section>

      <section id="demo" className="section">
        <div className="container demo">
          <div>
            <p className="kicker">LIVE DEMO</p>
            <h2>실시간 대화 데모</h2>
            <p className="lede">질문을 입력하면 미래AI가 개입 여부를 판단해 응답합니다.</p>
          </div>
          <div className="chat">
            <div className="chat-body">
              {messages.map((msg) => (
                <div key={msg.id} className={`msg ${msg.from === "me" ? "me" : ""}`}>
                  <span className="name">{msg.name}</span>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <form className="chat-input" onSubmit={handleSubmit}>
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="메시지를 입력하세요"
              />
              <button type="submit" className="btn btn-primary">
                전송
              </button>
            </form>
          </div>
        </div>
      </section>

      <section id="final" className="section final">
        <div className="container">
          <h2>첫 번째 조교단과 지금 만나세요.</h2>
          <a className="btn btn-light" href="#" onClick={openPopup}>
            베타 신청하기
          </a>
        </div>
      </section>

      {popupOpen && (
        <div className="popup" onClick={() => setPopupOpen(false)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <h3>곧 오픈됩니다</h3>
            <p>온보딩 창구를 준비 중입니다. 조금만 기다려 주세요.</p>
            <button className="btn btn-primary" onClick={() => setPopupOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
