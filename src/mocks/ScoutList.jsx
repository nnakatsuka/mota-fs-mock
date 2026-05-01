import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";
import { SCOUTS } from "../scoutData";

const PRIMARY = "#3FB6E8";
const PRIMARY_DARK = "#059CDB";
const ACCENT_YELLOW = "#F7CF29";
const CTA = "#E8593C";
const SUCCESS = "#22C39A";
const NAVY = "#0A2540";
const BG = "#F4FAFE";
const BORDER = "#DDE9F0";
const TEXT = "#0A2540";
const TEXT_SUB = "#5A6B7C";
const TEXT_MUTE = "#A0AEC0";

const STATUS_LABELS = {
  scout: { label: "スカウト", bg: "#FFE4DC", fg: CTA },
  hold: { label: "保留", bg: "#FEF3D6", fg: "#B5832A" },
  decline: { label: "お断り", bg: "#EEEEEE", fg: TEXT_SUB },
};

const TABS = [
  { id: "all", label: "すべて" },
  { id: "scout", label: "スカウト" },
  { id: "hold", label: "保留" },
  { id: "decline", label: "お断り" },
];

function Phone({ children }) {
  return (
    <div style={{
      width: 390, height: 800, background: "#fff",
      borderRadius: 36, border: "8px solid #1a1a1a",
      overflow: "hidden", display: "flex", flexDirection: "column",
      boxShadow: "0 24px 80px rgba(10,37,64,0.18), 0 0 0 1px rgba(0,0,0,0.05)",
      position: "relative",
      fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
    }}>
      <div style={{
        height: 44, background: "#fff", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        padding: "0 22px", fontSize: 13, fontWeight: 700, color: TEXT, flexShrink: 0,
      }}>
        <span>9:41</span>
        <div style={{ width: 120, height: 28, background: "#1a1a1a", borderRadius: 14 }} />
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="6" width="3" height="6" rx="1" fill="#1a1a1a"/><rect x="4.5" y="4" width="3" height="8" rx="1" fill="#1a1a1a"/><rect x="9" y="2" width="3" height="10" rx="1" fill="#1a1a1a"/><rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1a1a1a"/></svg>
          <svg width="22" height="12" viewBox="0 0 22 12"><rect x="0" y="0" width="20" height="12" rx="2" stroke="#1a1a1a" strokeWidth="1" fill="none"/><rect x="1.5" y="1.5" width="14" height="9" rx="1" fill="#1a1a1a"/><rect x="21" y="3.5" width="1.5" height="5" rx="0.5" fill="#1a1a1a"/></svg>
        </div>
      </div>
      {children}
    </div>
  );
}

function ScoutCard({ scout, onClick, onDetailClick, onMessageClick }) {
  const statusStyle = STATUS_LABELS[scout.status];

  return (
    <div onClick={onClick} style={{
      background: "#fff", borderRadius: 14,
      marginBottom: 10,
      border: `1px solid ${BORDER}`,
      cursor: "pointer",
      transition: "transform 0.12s, box-shadow 0.12s",
      position: "relative",
      overflow: "hidden",
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(10,37,64,0.1)"}
    onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
      {scout.isNew && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          background: CTA, color: "#fff",
          fontSize: 9, fontWeight: 900, letterSpacing: 1,
          padding: "3px 10px",
          borderBottomLeftRadius: 8,
          boxShadow: "0 2px 6px rgba(232,89,60,0.3)",
        }}>NEW</div>
      )}

      <div style={{ padding: "14px 14px 12px", display: "flex", gap: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 8,
          background: scout.iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, color: scout.iconColor,
          flexShrink: 0,
          border: `1px solid ${BORDER}`,
        }}>
          ロゴ
        </div>

        <div style={{ flex: 1, minWidth: 0, paddingRight: 30 }}>
          <div style={{
            fontSize: 14, fontWeight: 800,
            color: PRIMARY_DARK, marginBottom: 2,
            textDecoration: "underline",
            textDecorationColor: PRIMARY_DARK + "55",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            lineHeight: 1.3,
          }}>
            {scout.company}
          </div>
          <div style={{
            fontSize: 11, color: TEXT_SUB, fontWeight: 600,
            marginBottom: 8, lineHeight: 1.4,
          }}>
            {scout.jobTitle}・{scout.location}
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <div style={{
              fontSize: 10, fontWeight: 700,
              padding: "3px 8px", borderRadius: 3,
              background: "#FFF3F0", color: CTA,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <span style={{
                fontSize: 8, padding: "0 4px",
                background: CTA, color: "#fff", borderRadius: 2,
              }}>年収</span>
              {scout.salaryMin}〜{scout.salaryMax}万
            </div>
            <div style={{
              fontSize: 10, fontWeight: 700,
              padding: "3px 8px", borderRadius: 3,
              background: "#E8F6FD", color: PRIMARY_DARK,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <span style={{
                fontSize: 8, padding: "0 4px",
                background: PRIMARY_DARK, color: "#fff", borderRadius: 2,
              }}>休日</span>
              {scout.holidays}日
            </div>
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute",
        top: scout.isNew ? 28 : 14,
        right: 14,
        fontSize: 10, fontWeight: 800,
        padding: "4px 12px", borderRadius: 4,
        background: statusStyle.bg, color: statusStyle.fg,
      }}>
        {statusStyle.label}
      </div>

      <div style={{
        display: "flex",
        borderTop: `1px solid ${BORDER}`,
      }}>
        <button onClick={(e) => { e.stopPropagation(); onDetailClick && onDetailClick(); }} style={{
          flex: 1, padding: "10px 0",
          background: "#fff", color: TEXT,
          border: "none",
          borderRight: `1px solid ${BORDER}`,
          fontSize: 11, fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
        }}>
          <span style={{ fontSize: 12 }}>📋</span>
          <span style={{ color: PRIMARY_DARK }}>スカウト詳細</span>
        </button>
        <button onClick={(e) => { e.stopPropagation(); onMessageClick && onMessageClick(); }} style={{
          flex: 1, padding: "10px 0",
          background: "#fff", color: TEXT,
          border: "none",
          fontSize: 11, fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
          position: "relative",
        }}>
          <span style={{ fontSize: 12 }}>💬</span>
          <span style={{ color: PRIMARY_DARK }}>メッセージ</span>
          {scout.isNew && (
            <span style={{
              position: "absolute", top: 8, right: 18,
              width: 7, height: 7, borderRadius: "50%",
              background: CTA,
            }} />
          )}
        </button>
      </div>
    </div>
  );
}

function BottomNav({ activeTab = "scout" }) {
  const items = [
    { id: "search", icon: "🔍", label: "求人検索" },
    { id: "scout", icon: "📩", label: "スカウト" },
    { id: "applied", icon: "📝", label: "応募" },
    { id: "fav", icon: "❤️", label: "気になる" },
    { id: "msg", icon: "💬", label: "メッセージ" },
  ];
  return (
    <div style={{
      borderTop: `1px solid ${BORDER}`,
      background: "#fff", padding: "6px 0 4px",
      display: "flex", justifyContent: "space-around",
      flexShrink: 0,
    }}>
      {items.map(it => {
        const active = it.id === activeTab;
        return (
          <div key={it.id} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            cursor: "pointer", padding: "4px 8px",
          }}>
            <span style={{ fontSize: 18, opacity: active ? 1 : 0.5 }}>{it.icon}</span>
            <span style={{
              fontSize: 9, fontWeight: 700,
              color: active ? PRIMARY_DARK : TEXT_MUTE,
              marginTop: 2,
            }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function ScoutList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? SCOUTS
    : SCOUTS.filter(s => s.status === activeTab);

  const counts = {
    all: SCOUTS.length,
    scout: SCOUTS.filter(s => s.status === "scout").length,
    hold: SCOUTS.filter(s => s.status === "hold").length,
    decline: SCOUTS.filter(s => s.status === "decline").length,
  };

  return (
    <div style={{
      minHeight: "100vh", background: BG, padding: "20px 0 40px",
      fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
      display: "flex", justifyContent: "center",
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ textAlign: "center", maxWidth: 600, padding: "0 20px" }}>
          <div style={{
            display: "inline-block", padding: "4px 12px",
            background: NAVY, color: "#fff", fontSize: 10,
            fontWeight: 700, borderRadius: 4, letterSpacing: 1, marginBottom: 8,
          }}>F/S MOCK — D-1 スカウト一覧</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            ログイン後 / メインアプリ<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※スカウトを受信した状態のリスト
            </span>
          </div>
        </div>

        <Phone>
          <div style={{
            height: 50, background: "#fff", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 16px", flexShrink: 0,
          }}>
            <img src={logoUrl} alt="タップミー / TAPME" style={{ height: 28, objectFit: "contain" }} />
            <span style={{ fontSize: 18, color: TEXT_SUB, cursor: "pointer" }}>☰</span>
          </div>

          <div style={{
            display: "flex", padding: "0 8px", background: "#fff",
            borderBottom: `1px solid ${BORDER}`, flexShrink: 0,
            overflowX: "auto",
          }}>
            {TABS.map(t => {
              const active = t.id === activeTab;
              const count = counts[t.id];
              return (
                <div key={t.id} onClick={() => setActiveTab(t.id)} style={{
                  flex: 1, padding: "12px 8px", textAlign: "center",
                  fontSize: 12, fontWeight: active ? 800 : 600,
                  color: active ? PRIMARY_DARK : TEXT_SUB,
                  borderBottom: `3px solid ${active ? PRIMARY : "transparent"}`,
                  cursor: "pointer", whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                }}>
                  <span>{t.label}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    background: active ? PRIMARY : "#E0E6EC",
                    color: active ? "#fff" : TEXT_SUB,
                    padding: "1px 6px", borderRadius: 8, minWidth: 16, textAlign: "center",
                  }}>{count}</span>
                </div>
              );
            })}
          </div>

          <div style={{ flex: 1, overflowY: "auto", background: BG, padding: "12px 12px" }}>
            {filtered.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "60px 20px",
                color: TEXT_MUTE, fontSize: 12,
              }}>
                該当するスカウトはありません
              </div>
            ) : (
              filtered.map(s => (
                <ScoutCard key={s.id} scout={s}
                  onClick={() => navigate(`/scout-detail/${s.id}`)}
                  onDetailClick={() => navigate(`/scout-detail/${s.id}`)}
                  onMessageClick={() => alert("メッセージ画面へ（モック）")} />
              ))
            )}
          </div>

          <BottomNav activeTab="scout" />
        </Phone>
      </div>
    </div>
  );
}
