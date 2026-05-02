import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SCOUTS } from "../scoutData";

// ==========================================================================
// Theme
// ==========================================================================
const PRIMARY = "#E8593C";
const PRIMARY_DARK = "#C44529";
const PRIMARY_LIGHT = "#FCEFEA";
const BG = "#F0EFEB";
const BG_CARD = "#FFFFFF";
const BORDER = "#E8E6E1";
const TEXT = "#1a1a1a";
const TEXT_SUB = "#5F5E5A";
const TEXT_MUTE = "#B4B2A9";
const STATUS_APPLIED_BG = "#E0EBF7";
const STATUS_APPLIED_FG = "#3565AB";
const STATUS_HIRED_BG = "#E0F2E6";
const STATUS_HIRED_FG = "#1D7A4D";
const STATUS_REJECTED_BG = "#F1EFE8";
const STATUS_REJECTED_FG = "#8C8A82";

// ==========================================================================
// Helpers
// ==========================================================================
function statusLabel(appStatus) {
  if (appStatus === "applied") return { text: "応募済", bg: STATUS_APPLIED_BG, fg: STATUS_APPLIED_FG };
  if (appStatus === "hired") return { text: "内定", bg: STATUS_HIRED_BG, fg: STATUS_HIRED_FG };
  if (appStatus === "rejected") return { text: "不採用", bg: STATUS_REJECTED_BG, fg: STATUS_REJECTED_FG };
  return { text: "-", bg: STATUS_REJECTED_BG, fg: STATUS_REJECTED_FG };
}

function sourceLabel(source) {
  if (source === "scout") {
    return {
      text: "スカウト",
      icon: "📩",
      bg: PRIMARY_LIGHT,
      fg: PRIMARY_DARK,
      border: "#F2C5B6",
    };
  }
  return {
    text: "自己応募",
    icon: "✋",
    bg: "#F1EFE8",
    fg: TEXT_SUB,
    border: "#E8E6E1",
  };
}

// ==========================================================================
// Service Logo (タップミー TAPME)
// ==========================================================================
function ServiceLogo() {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
      <span style={{ fontSize: 18, fontWeight: 800, color: PRIMARY, letterSpacing: 0.5 }}>
        タッ<span style={{ fontSize: 22, color: PRIMARY_DARK }}>プ</span>ミー
      </span>
      <span style={{ fontSize: 11, fontWeight: 600, color: TEXT_SUB, letterSpacing: 1 }}>
        TAPME
      </span>
    </div>
  );
}

// ==========================================================================
// Scout Card
// ==========================================================================
function ScoutCard({ scout, onClick }) {
  const status = statusLabel(scout.appStatus);
  const src = sourceLabel(scout.source);

  return (
    <div
      onClick={onClick}
      style={{
        background: BG_CARD,
        borderRadius: 12,
        border: `1px solid ${BORDER}`,
        marginBottom: 12,
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.15s",
      }}
    >
      {/* 上部 source ラベル */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 12px 0 12px",
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "3px 10px",
          background: src.bg,
          color: src.fg,
          border: `1px solid ${src.border}`,
          borderRadius: 12,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 0.3,
        }}>
          <span style={{ fontSize: 11 }}>{src.icon}</span>
          <span>{src.text}</span>
        </div>
        {scout.isNew && (
          <div style={{
            marginLeft: 8,
            padding: "2px 8px",
            background: PRIMARY,
            color: "#fff",
            borderRadius: 10,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}>
            NEW
          </div>
        )}
      </div>

      {/* 本体 */}
      <div style={{ padding: "10px 14px 14px 14px", display: "flex", gap: 12 }}>
        {/* ロゴ枠 */}
        <div style={{
          width: 56, height: 56, borderRadius: 8,
          background: scout.iconBg,
          color: scout.iconColor,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, flexShrink: 0,
        }}>
          {scout.icon}
        </div>

        {/* 情報 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* 会社名（上・大）+ ステータスバッジ */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <div style={{
              fontSize: 15, fontWeight: 700, color: "#3565AB",
              lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {scout.company}
            </div>
            <div style={{
              flexShrink: 0,
              padding: "3px 10px",
              background: status.bg, color: status.fg,
              borderRadius: 12, fontSize: 10, fontWeight: 700,
              whiteSpace: "nowrap",
            }}>
              {status.text}
            </div>
          </div>

          {/* 職種（下・小） */}
          <div style={{
            fontSize: 13, color: TEXT_SUB, marginTop: 2,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {scout.jobTitle}・{scout.location}
          </div>

          {/* 年収・休日バッジ */}
          <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "3px 8px", background: PRIMARY_LIGHT,
              borderRadius: 4, fontSize: 11,
            }}>
              <span style={{
                background: PRIMARY, color: "#fff",
                padding: "1px 5px", borderRadius: 3,
                fontSize: 10, fontWeight: 700,
              }}>年収</span>
              <span style={{ fontWeight: 700, color: TEXT }}>
                {scout.salaryMin}〜{scout.salaryMax}万
              </span>
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "3px 8px", background: "#EAF4EE",
              borderRadius: 4, fontSize: 11,
            }}>
              <span style={{
                background: "#1D9E75", color: "#fff",
                padding: "1px 5px", borderRadius: 3,
                fontSize: 10, fontWeight: 700,
              }}>休日</span>
              <span style={{ fontWeight: 700, color: TEXT }}>
                {scout.holidays}日
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// Bottom Nav
// ==========================================================================
function BottomNav({ activeTab }) {
  const tabs = [
    { id: "search", label: "求人検索", icon: "🔍" },
    { id: "scout", label: "スカウト", icon: "📩" },
    { id: "applied", label: "応募", icon: "📋" },
    { id: "fav", label: "気になる", icon: "♡" },
    { id: "msg", label: "メッセージ", icon: "💬" },
  ];
  return (
    <div style={{
      height: 56, background: "#fff",
      display: "flex", borderTop: `1px solid ${BORDER}`,
      flexShrink: 0,
    }}>
      {tabs.map(t => {
        const active = t.id === activeTab;
        return (
          <div key={t.id} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 2,
            cursor: "pointer",
            color: active ? PRIMARY : TEXT_MUTE,
          }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ==========================================================================
// Phone frame
// ==========================================================================
function Phone({ children }) {
  return (
    <div style={{
      width: 375, minHeight: 720, maxHeight: 780,
      background: BG,
      borderRadius: 36, border: "6px solid #1a1a1a",
      overflow: "hidden", display: "flex", flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)",
      position: "relative",
      fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
    }}>
      {/* Status bar */}
      <div style={{
        height: 44, background: "#fff", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", fontSize: 12, fontWeight: 600, color: TEXT,
        flexShrink: 0,
      }}>
        <span>9:41</span>
        <div style={{ width: 120, height: 28, background: "#1a1a1a", borderRadius: 14 }} />
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <svg width="16" height="12" viewBox="0 0 16 12">
            <rect x="0" y="6" width="3" height="6" rx="1" fill="#1a1a1a"/>
            <rect x="4.5" y="4" width="3" height="8" rx="1" fill="#1a1a1a"/>
            <rect x="9" y="2" width="3" height="10" rx="1" fill="#1a1a1a"/>
            <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1a1a1a" opacity="0.3"/>
          </svg>
          <svg width="22" height="12" viewBox="0 0 22 12">
            <rect x="0" y="0" width="20" height="12" rx="2" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
            <rect x="1.5" y="1.5" width="14" height="9" rx="1" fill="#1a1a1a"/>
            <rect x="21" y="3.5" width="1.5" height="5" rx="0.5" fill="#1a1a1a"/>
          </svg>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

// ==========================================================================
// Main: ScoutList
// ==========================================================================
export default function ScoutList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // 各タブのカウント
  const counts = {
    all: SCOUTS.length,
    applied: SCOUTS.filter(s => s.appStatus === "applied").length,
    result: SCOUTS.filter(s => s.appStatus === "hired" || s.appStatus === "rejected").length,
  };

  // 表示用フィルタリング
  const filtered = activeTab === "all"
    ? SCOUTS
    : activeTab === "applied"
      ? SCOUTS.filter(s => s.appStatus === "applied")
      : SCOUTS.filter(s => s.appStatus === "hired" || s.appStatus === "rejected");

  const tabs = [
    { id: "all", label: "すべて", count: counts.all },
    { id: "applied", label: "応募済", count: counts.applied },
    { id: "result", label: "結果", count: counts.result },
  ];

  // タップ時の遷移先分岐
  const handleCardClick = (scout) => {
    if (scout.source === "scout") {
      navigate(`/scout-detail/${scout.id}`);
    } else {
      navigate(`/job-detail`);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: BG, padding: "20px 0",
      display: "flex", justifyContent: "center", alignItems: "flex-start",
    }}>
      <Phone>
        {/* Header: タップミー TAPME ロゴ */}
        <div style={{
          height: 52, background: "#fff",
          borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 16px", flexShrink: 0,
        }}>
          <ServiceLogo />
          <div style={{
            width: 28, height: 28, display: "flex",
            flexDirection: "column", justifyContent: "center", gap: 4,
            cursor: "pointer",
          }}>
            <div style={{ height: 2, background: TEXT, borderRadius: 1 }} />
            <div style={{ height: 2, background: TEXT, borderRadius: 1 }} />
            <div style={{ height: 2, background: TEXT, borderRadius: 1 }} />
          </div>
        </div>

        {/* Tabs: すべて / 応募済 / 結果 */}
        <div style={{
          display: "flex", background: "#fff",
          borderBottom: `1px solid ${BORDER}`,
          flexShrink: 0,
        }}>
          {tabs.map(t => {
            const active = t.id === activeTab;
            return (
              <div
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  flex: 1, padding: "12px 0", textAlign: "center",
                  fontSize: 13, fontWeight: active ? 800 : 600,
                  color: active ? PRIMARY_DARK : TEXT_SUB,
                  borderBottom: `3px solid ${active ? PRIMARY : "transparent"}`,
                  cursor: "pointer", whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                }}
              >
                <span>{t.label}</span>
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  background: active ? PRIMARY : "#E0E6EC",
                  color: active ? "#fff" : TEXT_SUB,
                  padding: "1px 6px", borderRadius: 8, minWidth: 16, textAlign: "center",
                }}>
                  {t.count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Card list */}
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
              <ScoutCard key={s.id} scout={s} onClick={() => handleCardClick(s)} />
            ))
          )}
        </div>

        <BottomNav activeTab="scout" />
      </Phone>
    </div>
  );
}
