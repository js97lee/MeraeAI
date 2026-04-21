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
  const assetBase = `${import.meta.env.BASE_URL}assets/`;
  const [popupOpen, setPopupOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const heroLine1 = "커뮤니티 참여를 시작하게 만들고";
  const heroLine2 = "계속 이어지게 하는 AI 에이전트";
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
            <p className="kicker">v1.0 · 베타 참여 오픈 · FTRI / 2026</p>
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
              미래AI는 디스코드 기반 커뮤니티에서 신규 온보딩, 참여 유도, 협업 연결,
              운영 리마인드를 자동화해 사람이 머무르고 움직이는 흐름을 설계합니다.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#final" onClick={openPopup}>
                무료로 입양하세요
              </a>
              <a className="btn btn-ghost" href="#demo">
                온보딩을 시작해요
              </a>
            </div>
          </div>
          <div className="hero-art">
            <img src={`${assetBase}mirae-lab-hero.jpg`} alt="Mirae Lab" />
          </div>
        </div>
      </header>

      <section id="philosophy" className="section dark">
        <div className="container">
          <p className="kicker">FTRI · DESIGN PRINCIPLE</p>
          <h2>말 많은 AI는, 오히려 협업에 방해가 됩니다.</h2>
          <p className="lede">
            미래생각연구소는 선택적 개입 원칙을 지킵니다. 필요한 순간에만 개입해,
            본질에만 몰입할 수 있도록.
          </p>
        </div>
      </section>

      <section id="master" className="section">
        <div className="container">
          <p className="kicker">MASTER AGENT</p>
          <h2>흐름을 설계하는 총괄 수석 조교, 미래AI.</h2>
          <p className="lede">
            미래AI는 답변을 생성하는 것이 아니라, 지금 개입할지 침묵할지를 판단하는
            오케스트레이터입니다. 대화 밀도와 감정 긴장도를 읽고,
            필요한 순간에만 하위 에이전트를 호출합니다.
          </p>
        </div>
      </section>

      <section id="agents" className="section">
        <div className="container">
          <p className="kicker">SPECIALIST T.A.</p>
          <h2>각자의 영역에서 당신의 성장을 조력합니다.</h2>
          <p className="lede">
            미래AI의 지휘 아래, 네 마리의 전문 조교 고양이가 온보딩부터 코딩·기록·컨텍스트 정렬까지
            서로 다른 영역에서 당신을 지원합니다.
          </p>
          <div className="cards">
            <article className="card">
              <img src={`${assetBase}agent-mangul.png`} alt="밍글AI" />
              <h3>밍글AI</h3>
              <p>낯선 시작을 기분 좋은 연결로. 신규 참여자 적응과 정서적 완충을 담당합니다.</p>
            </article>
            <article className="card">
              <img src={`${assetBase}agent-sync.png`} alt="싱크AI" />
              <h3>싱크AI</h3>
              <p>흩어진 논의를 정렬된 맥락으로 동기화하고, 공유인지를 만듭니다.</p>
            </article>
            <article className="card">
              <img src={`${assetBase}agent-ellen.png`} alt="코드AI" />
              <h3>코드AI</h3>
              <p>추상적 아이디어를 실행 과제로 전환하고, 기술적 결과물로 구현합니다.</p>
            </article>
            <article className="card">
              <img src={`${assetBase}agent-bisher.png`} alt="비셔AI" />
              <h3>비셔AI</h3>
              <p>조용히 관찰하고 정확하게 기록해 결정·약속·합의사항을 구조화합니다.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="how" className="section dark">
        <div className="container">
          <p className="kicker">ONBOARDING PROTOCOL</p>
          <h2>3분 안에, 당신의 첫 조교단을 배정받습니다.</h2>
          <p className="lede">
            커뮤니티 연결 → 조교단 배정 → 선택적 개입 시작의 3단계로 온보딩이 진행됩니다.
          </p>
        </div>
      </section>

      <section id="demo" className="section">
        <div className="container demo">
          <div>
            <p className="kicker">LIVE DEMO</p>
            <h2>침묵의 무게를 느껴보세요.</h2>
            <p className="lede">실제 커뮤니티에서 미래AI가 응답하고, 보류하고, 침묵하는 흐름을 확인해보세요.</p>
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

      <section id="faq" className="section dark">
        <div className="container">
          <p className="kicker">FAQ</p>
          <h2>자주 묻는 질문</h2>
          <p className="lede">
            미래AI는 일반 챗봇과 달리 "답변" 이전에 "개입 여부"를 판단합니다.
            팀의 리듬을 설계하는 오케스트레이터라는 점이 핵심 차이입니다.
          </p>
        </div>
      </section>

      <section id="final" className="section final">
        <div className="container">
          <h2>첫 번째 조교단과 지금 만나세요.</h2>
          <p className="lede" style={{ color: "#d3e7ff" }}>
            베타 참여 시 5마리 조교단 전체 · 커뮤니티 데이터 암호화 · 맞춤 커스텀 슬롯을 무료로 이용할 수 있습니다.
          </p>
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
