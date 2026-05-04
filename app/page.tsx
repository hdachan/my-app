"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// ──────────────────────────────────────────────────────────────────────────────
// ✏️  여기에 사진과 음악을 직접 넣으세요!
// ──────────────────────────────────────────────────────────────────────────────

// 사진: public 폴더 기준 경로 (예: "/photos/family1.jpg")
// 또는 import로 불러온 이미지도 가능
const PHOTOS = [
  "/photos/1.jpg",
  "/photos/2.jpg",
  "/photos/3.jpg",
  "/photos/5.jpg",
  "/photos/6.jpg",
  "/photos/7.jpg",
  "/photos/8.jpg",
  "/photos/9.jpg",
  "/photos/10.jpg",
  "/photos/11.jpg",
  "/photos/12.jpg",
];

// 배경음악: public 폴더 기준 경로 (예: "/music/song.mp3")
const MUSIC_SRC = "/music/bgm.mp3";
const MUSIC_TITLE = "하나님의 선물 "; // 플레이어에 표시될 제목

// ──────────────────────────────────────────────────────────────────────────────

// ─── Carnation Splash ─────────────────────────────────────────────────────────
function CarnationSplash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;600;700&family=Noto+Sans+KR:wght@300;400;500&display=swap');
        .splash-wrap {
          position: fixed; inset: 0; z-index: 200;
          background: linear-gradient(135deg, #fff0f5 0%, #fff9f0 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 20px;
          animation: splashFadeOut .8s ease 3.7s forwards;
        }
        .splash-svg { width: 120px; height: 150px; filter: drop-shadow(0 4px 16px rgba(220,100,120,.22)); }
        .splash-title {
          font-family: 'Noto Serif KR', serif;
          font-size: clamp(20px, 5vw, 26px); font-weight: 700;
          color: #c94d6a; letter-spacing: .05em;
          opacity: 0; animation: popIn .5s ease 2.4s forwards; text-align: center;
        }
        .splash-sub {
          font-size: 13px; color: #e8a0b0; letter-spacing: .15em;
          font-family: 'Noto Sans KR', sans-serif;
          opacity: 0; animation: popIn .5s ease 2.8s forwards;
        }
        .c-stem  { stroke-dasharray:130; stroke-dashoffset:130; animation:drawStem .7s ease .3s forwards; }
        .c-leaf  { opacity:0; animation:fadeLeaf .4s ease forwards; }
        .c-leaf-l { animation-delay:.8s; }
        .c-leaf-r { animation-delay:.95s; }
        .c-petal  { opacity:0; transform-origin:100px 155px; animation:bloom .25s ease forwards; }
        @keyframes drawStem  { to { stroke-dashoffset:0; } }
        @keyframes fadeLeaf  { to { opacity:1; } }
        @keyframes bloom     { from{opacity:0;transform:scale(.2);}to{opacity:.92;transform:scale(1);} }
        @keyframes popIn     { from{opacity:0;transform:scale(.8) translateY(8px);}to{opacity:1;transform:scale(1) translateY(0);} }
        @keyframes splashFadeOut { to { opacity:0; pointer-events:none; } }
        @keyframes slideUp   { from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);} }
        @keyframes spinIcon  { to { transform:rotate(360deg); } }
      `}</style>
      <div className="splash-wrap">
        <svg
          className="splash-svg"
          viewBox="0 0 200 260"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 260 Q98 200 100 160"
            stroke="#7cb87a"
            strokeWidth="3.5"
            fill="none"
            className="c-stem"
          />
          <path
            d="M100 215 Q68 195 58 178 Q80 182 100 205"
            fill="#7cb87a"
            className="c-leaf c-leaf-l"
          />
          <path
            d="M100 198 Q132 178 144 162 Q124 170 100 190"
            fill="#7cb87a"
            className="c-leaf c-leaf-r"
          />
          {[
            {
              cx: 100,
              cy: 122,
              rx: 30,
              ry: 23,
              fill: "#ff8fab",
              delay: ".85s",
            },
            { cx: 80, cy: 113, rx: 24, ry: 21, fill: "#ffb3c1", delay: "1.0s" },
            {
              cx: 120,
              cy: 113,
              rx: 24,
              ry: 21,
              fill: "#ffb3c1",
              delay: "1.1s",
            },
            {
              cx: 100,
              cy: 102,
              rx: 28,
              ry: 23,
              fill: "#ff8fab",
              delay: "1.2s",
            },
            { cx: 78, cy: 104, rx: 21, ry: 19, fill: "#ffc8d0", delay: "1.3s" },
            {
              cx: 122,
              cy: 104,
              rx: 21,
              ry: 19,
              fill: "#ffc8d0",
              delay: "1.4s",
            },
            { cx: 100, cy: 92, rx: 26, ry: 21, fill: "#ff8fab", delay: "1.5s" },
            { cx: 82, cy: 90, rx: 19, ry: 17, fill: "#ffb3c1", delay: "1.6s" },
            { cx: 118, cy: 90, rx: 19, ry: 17, fill: "#ffb3c1", delay: "1.7s" },
            { cx: 100, cy: 82, rx: 22, ry: 17, fill: "#ff8fab", delay: "1.8s" },
            { cx: 100, cy: 76, rx: 12, ry: 10, fill: "#ffc8d0", delay: "1.9s" },
            { cx: 100, cy: 72, rx: 7, ry: 6, fill: "#fff0f5", delay: "2.0s" },
          ].map((p, i) => (
            <ellipse
              key={i}
              cx={p.cx}
              cy={p.cy}
              rx={p.rx}
              ry={p.ry}
              fill={p.fill}
              className="c-petal"
              style={{ animationDelay: p.delay }}
            />
          ))}
        </svg>
        <p className="splash-title">어버이날을 축하합니다 🌸</p>
        <p className="splash-sub">사랑하고 감사합니다 ♡</p>
      </div>
    </>
  );
}

// ─── Music Player ─────────────────────────────────────────────────────────────
function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [curTime, setCurTime] = useState("0:00");
  const [durTime, setDurTime] = useState("0:00");
  const [volume, setVolume] = useState(0.8);

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  };

  const tick = useCallback(() => {
    const a = audioRef.current;
    if (!a?.duration) return;
    setProgress((a.currentTime / a.duration) * 100);
    setCurTime(fmt(a.currentTime));
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // MusicPlayer 안 useEffect에 추가
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    a.onloadedmetadata = () => setDurTime(fmt(a.duration));
    a.onended = () => {
      setIsPlaying(false);
      setProgress(0);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    // 자동재생
    a.play()
      .then(() => {
        setIsPlaying(true);
        rafRef.current = requestAnimationFrame(tick);
      })
      .catch(() => {}); // 사용자 제스처 필요 시 무시
  }, []); // 빈 deps

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    } else {
      a.play();
      setIsPlaying(true);
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const seekAudio = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a?.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * a.duration;
  };

  const handleVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "2px solid #ffd6e0",
        borderRadius: 18,
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* top */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#ff8fab,#ffb3c1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            flexShrink: 0,
            animation: isPlaying ? "spinIcon 4s linear infinite" : "none",
          }}
        >
          🎵
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Noto Sans KR',sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#5a2d38",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {MUSIC_TITLE}
          </div>
          <div style={{ fontSize: 11, color: "#e8a0b0" }}>배경음악</div>
        </div>
        <button
          onClick={togglePlay}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#ff8fab,#ffb3c1)",
            border: "none",
            cursor: "pointer",
            fontSize: 14,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>
      {/* progress */}
      <div
        onClick={seekAudio}
        style={{
          height: 6,
          background: "#ffeef2",
          borderRadius: 6,
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "linear-gradient(90deg,#ff8fab,#ffb3c1)",
            borderRadius: 6,
            width: `${progress}%`,
            transition: "width .4s linear",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "'Noto Sans KR',sans-serif",
          fontSize: 10,
          color: "#e8a0b0",
        }}
      >
        <span>{curTime}</span>
        <span>{durTime}</span>
      </div>
      {/* volume */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14 }}>🔈</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVol}
          style={{ flex: 1, accentColor: "#ff8fab" }}
        />
        <span style={{ fontSize: 14 }}>🔊</span>
      </div>

      {/* ✏️ MUSIC_SRC 를 위에서 설정하세요 */}
      <audio ref={audioRef} src={MUSIC_SRC} autoPlay preload="metadata" />
    </div>
  );
}

// ─── Photo Album ──────────────────────────────────────────────────────────────
function PhotoAlbum() {
  const [curIdx, setCurIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (PHOTOS.length < 2) return;
    timerRef.current = setInterval(
      () => setCurIdx((c) => (c + 1) % PHOTOS.length),
      3000,
    );
  }, []);

  useEffect(() => {
    startAuto();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAuto]);

  const goTo = (i: number) => {
    setCurIdx(i);
    startAuto();
  };
  const slideNav = (dir: number) =>
    goTo((curIdx + dir + PHOTOS.length) % PHOTOS.length);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        width: "100%",
      }}
    >
      <div
        style={{
          fontFamily: "'Noto Sans KR',sans-serif",
          fontSize: 10.5,
          fontWeight: 500,
          color: "#e8798a",
          letterSpacing: ".3em",
          textTransform: "uppercase",
        }}
      >
        🎞 우리 가족 사진첩
      </div>

      {/* main frame */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4/3",
          borderRadius: 18,
          overflow: "hidden",
          background: "#ffeef2",
          border: "2px solid #ffd6e0",
        }}
      >
        {PHOTOS.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt={`가족사진 ${i + 1}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: i === curIdx ? 1 : 0,
              transition: "opacity .6s ease",
            }}
          />
        ))}
      </div>

      {/* arrows + dots */}
      {PHOTOS.length > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button onClick={() => slideNav(-1)} style={navBtnStyle}>
            ◀
          </button>
          <div style={{ display: "flex", gap: 6 }}>
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  padding: 0,
                  border: "none",
                  cursor: "pointer",
                  background: i === curIdx ? "#ff8fab" : "#ffd6e0",
                  transform: i === curIdx ? "scale(1.3)" : "scale(1)",
                  transition: "all .25s",
                }}
              />
            ))}
          </div>
          <button onClick={() => slideNav(1)} style={navBtnStyle}>
            ▶
          </button>
        </div>
      )}

      {/* thumbnail strip */}
      {PHOTOS.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            paddingBottom: 2,
          }}
        >
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: 52,
                height: 44,
                borderRadius: 8,
                overflow: "hidden",
                flexShrink: 0,
                cursor: "pointer",
                border:
                  i === curIdx
                    ? "2.5px solid #ff8fab"
                    : "2px solid transparent",
                transition: "border-color .2s",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const navBtnStyle: React.CSSProperties = {
  background: "#fff",
  border: "1.5px solid #ffd6e0",
  borderRadius: "50%",
  width: 30,
  height: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: 14,
};

// ─── Banner ───────────────────────────────────────────────────────────────────
function Banner() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;600;700&family=Noto+Sans+KR:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        .banner-root {
          width:100%; max-width:900px;
          background:#fff; border-radius:24px;
          border:2px solid #ffd6e0;
          box-shadow:0 8px 40px rgba(220,100,120,.08);
          overflow:hidden; font-family:'Noto Serif KR',serif;
          animation:slideUp .7s ease both;
        }
        .banner-header {
          background:linear-gradient(135deg,#ff8fab 0%,#ffb3c1 50%,#ffc8d0 100%);
          padding:22px 28px 20px;
          display:flex; align-items:center; gap:14px; flex-wrap:wrap;
        }
        .header-title {
          font-family:'Noto Serif KR',serif;
          font-size:clamp(20px,4vw,30px); font-weight:700;
          color:#fff; letter-spacing:.03em;
          text-shadow:0 2px 8px rgba(180,60,80,.2);
        }
        .header-sub {
          font-size:clamp(10px,2vw,12px); color:rgba(255,255,255,.85);
          letter-spacing:.15em; margin-top:4px;
          font-family:'Noto Sans KR',sans-serif;
        }
        .header-badge {
          margin-left:auto;
          background:rgba(255,255,255,.25); border:1.5px solid rgba(255,255,255,.5);
          border-radius:100px; padding:6px 14px;
          font-size:clamp(10px,2vw,11.5px); color:#fff; letter-spacing:.1em;
          white-space:nowrap; font-family:'Noto Sans KR',sans-serif;
        }

        .banner-body { display:flex; }
        .album-col {
          flex:0 0 280px; background:#fff9f5;
          border-right:1.5px solid #ffd6e0;
          padding:22px 20px;
          display:flex; flex-direction:column; gap:14px;
        }
        .content-col {
          flex:1; min-width:0;
          padding:24px 28px;
          display:flex; flex-direction:column; gap:18px;
        }

        @media (max-width:640px) {
          .banner-root   { border-radius:18px; }
          .banner-header { padding:16px 18px 14px; gap:10px; }
          .header-badge  { margin-left:0; width:100%; text-align:center; }
          .banner-body   { flex-direction:column; }
          .album-col     { flex:none; width:100%; border-right:none; border-bottom:1.5px solid #ffd6e0; padding:18px 16px; }
          .content-col   { padding:18px 16px; }
        }

        .scripture-card { background:#fff9f5; border:1.5px solid #ffd6e0; border-radius:16px; padding:16px 18px; }
        .scripture-ref  { font-family:'Noto Sans KR',sans-serif; font-size:10px; color:#e8798a; letter-spacing:.3em; margin-bottom:10px; }
        .scripture-quote { font-size:clamp(13px,2.5vw,14px); font-weight:400; color:#6b3a45; line-height:2; letter-spacing:.04em; }

        .msg-box   { background:linear-gradient(135deg,#fff0f5,#fff9f0); border:1.5px solid #ffd6e0; border-radius:16px; padding:16px 18px; flex:1; }
        .msg-label { font-family:'Noto Sans KR',sans-serif; font-size:10px; color:#e8798a; letter-spacing:.3em; margin-bottom:8px; }
        .msg-text  { font-size:clamp(13px,2.5vw,15px); font-weight:400; color:#5a2d38; line-height:2; letter-spacing:.04em; }

        .banner-footer {
          background:#fff9f5; border-top:1.5px solid #ffd6e0;
          padding:12px 28px;
          display:flex; align-items:center; justify-content:space-between;
          flex-wrap:wrap; gap:6px;
        }
        .footer-flowers { font-size:clamp(14px,3vw,18px); letter-spacing:4px; }
        .footer-msg { font-family:'Noto Sans KR',sans-serif; font-size:clamp(10px,2vw,11px); color:#e8a0b0; letter-spacing:.12em; }
      `}</style>

      <div className="banner-root">
        <div className="banner-header">
          <span style={{ fontSize: 28 }}>🌸💕🌸</span>
          <div>
            <h1 className="header-title">어버이날을 축하합니다</h1>
            <p className="header-sub">PARENTS&apos; DAY · 2025년 5월 8일</p>
          </div>
          <div className="header-badge">💝 사랑과 감사를 담아</div>
        </div>

        <div className="banner-body">
          <div className="album-col">
            <PhotoAlbum />
          </div>
          <div className="content-col">
            <div className="scripture-card">
              <div className="scripture-ref">
                ✦ &nbsp;에베소서 6 : 2–3&nbsp; ✦
              </div>
              <blockquote className="scripture-quote">
                &ldquo;네 아버지와 어머니를 공경하라
                <br />
                이것은 약속 있는 첫째 계명이니
                <br />
                이로써 네가 잘되고 땅에서 장수하리라&rdquo;
              </blockquote>
            </div>

            <div className="msg-box">
              <div className="msg-label">💌 마음을 전합니다</div>
              <p className="msg-text">
                항상 저를 위해 헌신해 주신
                <br />
                부모님께{" "}
                <span style={{ color: "#c94d6a", fontWeight: 600 }}>
                  감사합니다
                </span>
                .<br />
                언제나 건강하시고{" "}
                <span style={{ color: "#c94d6a", fontWeight: 600 }}>
                  행복하세요
                </span>
                .<br />
                사랑해요 💕
              </p>
            </div>

            <MusicPlayer />
          </div>
        </div>

        <div className="banner-footer">
          <span className="footer-flowers">🌸🌷🌸🌷🌸</span>
          <span className="footer-msg">항상 건강하시고 행복하세요 💕</span>
          <span className="footer-flowers">🌸🌷🌸🌷🌸</span>
        </div>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const [showBanner, setShowBanner] = useState(false);

  return (
    <div
      style={{
        background: "#fff9f5",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      {!showBanner && <CarnationSplash onDone={() => setShowBanner(true)} />}
      {showBanner && <Banner />}
    </div>
  );
}
