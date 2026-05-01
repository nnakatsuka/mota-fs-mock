import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";
import { SCOUTS } from "../scoutData";

const PRIMARY = "#3FB6E8";
const PRIMARY_DARK = "#059CDB";
const CTA = "#E8593C";
const SUCCESS = "#22C39A";
const NAVY = "#0A2540";
const BG = "#F4FAFE";
const BORDER = "#DDE9F0";
const TEXT = "#0A2540";
const TEXT_SUB = "#5A6B7C";
const TEXT_MUTE = "#A0AEC0";

const APP_STATUS_LABELS = {
  applied: { label: "応募済", bg: "#FFE4DC", fg: CTA },
  hired:   { label: "内定",   bg: "#D6F5EB", fg: SUCCESS },
  rejected:{ label: "不採用", bg: "#FFE0E0", fg: "#C44529" },
};

const TABS = [
  { id: "all", label: "すべて" },
  { id: "applied", label: "応募済" },
  { id: "result", label: "結果" }, // 内定 + 不採用
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

function ApplicationCard({ scout, onTopClick, onMessageClick }) {
  const statusStyle = APP_STATUS_LABELS[scout.appStatus] || APP_STATUS_LABELS.applied;

  return (
    <div style={{
      background: "#fff", borderRadius: 14,
      marginBottom: 10,
      border: `1px solid ${BORDER}`,
      transition: "transform 0.12s, box-shadow 0.12s",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* 上部クリック可能ゾーン → 求人詳細へ */}
      <div onClick={onTopClick} style={{
        padding: "14px 14px 12px", display: "flex", gap: 12,
        cursor: "pointer",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "#FAFCFE"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
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

        <div style={{ flex: 1, minWidth: 0, paddingRight: 70 /* ステータス分 */ }}>
          {/* 職種（青リンク色・大） */}
          <div style={{
            fontSize: 14, fontWeight: 800,
            color: PRIMARY_DARK, marginBottom: 2,
            textDecoration: "underline",
            textDecorationColor: PRIMARY_DARK + "55",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            lineHeight: 1.3,
          }}>
            {scout.jobTitle}
          </div>
          {/* 会社名・場所（グレー・小） */}
          <div style={{
            fontSize: 11, color: TEXT_SUB, fontWeight: 600,
            marginBottom: 8, lineHeight: 1.4,
          }}>
            {scout.company}・{scout.location}
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

      {/* ステータスラベル */}
      <div style={{
        position: "absolute",
        top: 14,
        right: 14,
        fontSize: 10, fontWeight: 800,
        padding: "4px 12px", borderRadius: 4,
        background: statusStyle.bg, color: statusStyle.fg,
      }}>
        {statusStyle.label}
      </div>

      {/* 下段：メッセージのみ（スカウト一覧と違って詳細ボタンは無し） */}
      <div style={{ borderTop: `1px solid ${BORDER}` }}>
        <button onClick={(e) => { e.stopPropagation(); onMessageClick && onMessageClick(); }} style={{
          width: "100%", padding: "10px 0",
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
              width: 7, height: 7, borderRadius: "50%",
              background: CTA, marginLeft: 4,
            }} />
          )}
        </button>
      </div>
    </div>
  );
}

function BottomNav({ activeTab = "applied" }) {
  const items = [
    { id: "search", icon: "🔍", label: "求人検索" },
    { id: "scout", icon: "📩", label: "スカウト" },
    { id: "applied", icon: "📝", label: "応募" },
    { id: "mypage", icon: "👤", label: "マイページ" },
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

export default function AppliedList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? SCOUTS
    : activeTab === "applied"
      ? SCOUTS.filter(s => s.appStatus === "applied")
      : SCOUTS.filter(s => s.appStatus === "hired" || s.appStatus === "rejected");

  const counts = {
    all: SCOUTS.length,
    applied: SCOUTS.filter(s => s.appStatus === "applied").length,
    result: SCOUTS.filter(s => s.appStatus === "hired" || s.appStatus === "rejected").length,
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
          }}>F/S MOCK — D-4 応募一覧</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            ログイン後 / 応募タブ<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※カード上部タップで求人詳細へ遷移
            </span>
          </div>
        </div>

        <Phone>
          {/* ヘッダー */}
          <div style={{
            height: 56, background: "#fff", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 16px", flexShrink: 0,
          }}>
            <img
              src={logoUrl}
              alt="タップミー / TAPME"
              onClick={() => navigate("/")}
              style={{ height: 40, objectFit: "contain", cursor: "pointer" }}
            />
            <span style={{ fontSize: 18, color: TEXT_SUB, cursor: "pointer" }}>☰</span>
          </div>

          {/* タブ */}
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

          {/* リスト */}
          <div style={{ flex: 1, overflowY: "auto", background: BG, padding: "12px 12px" }}>
            {filtered.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "60px 20px",
                color: TEXT_MUTE, fontSize: 12,
              }}>
                該当する応募はありません
              </div>
            ) : (
              filtered.map(s => (
                <ApplicationCard key={s.id} scout={s}
                  onTopClick={() => navigate(`/job-detail/${s.id}`)}
                  onMessageClick={() => alert("メッセージ画面へ（モック）")} />
              ))
            )}
          </div>

          <BottomNav activeTab="applied" />
        </Phone>
      </div>
    </div>
  );
}
