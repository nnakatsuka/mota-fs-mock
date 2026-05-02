import { useNavigate } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";
import { loadDraft } from "../registerStorage";

const PRIMARY = "#3FB6E8";
const PRIMARY_DARK = "#059CDB";
const ACCENT_YELLOW = "#F7CF29";
const CTA = "#E8593C";
const CTA_DARK = "#C44529";
const SUCCESS = "#22C39A";
const NAVY = "#0A2540";
const BG = "#F4FAFE";
const BORDER = "#DDE9F0";
const TEXT = "#0A2540";
const TEXT_SUB = "#5A6B7C";
const TEXT_MUTE = "#A0AEC0";
const DANGER = "#C44529";

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

function MenuItem({ icon, label, danger, onClick }) {
  return (
    <div onClick={onClick} style={{
      padding: "16px 16px",
      display: "flex", alignItems: "center", gap: 14,
      background: "#fff",
      borderBottom: `1px solid ${BORDER}`,
      cursor: "pointer",
      transition: "background 0.12s",
    }}
    onMouseEnter={e => e.currentTarget.style.background = "#FAFCFE"}
    onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
      <span style={{
        fontSize: 18,
        color: danger ? DANGER : TEXT_SUB,
        flexShrink: 0,
      }}>{icon}</span>
      <span style={{
        flex: 1, fontSize: 14, fontWeight: 700,
        color: danger ? DANGER : TEXT,
      }}>{label}</span>
      <span style={{
        fontSize: 14, color: TEXT_MUTE,
      }}>›</span>
    </div>
  );
}

function BottomNav({ activeTab = "mypage" }) {
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

export default function MyPage() {
  const navigate = useNavigate();
  const draft = loadDraft();
  const userName = draft.step1?.name || "山田 タロウ";
  const photo = draft.step3?.photo;
  const address = draft.step1?.address;
  const birthday = draft.step1?.birthday;

  // 年齢計算
  const age = birthday
    ? 2026 - birthday[0]
    : 25;
  const location = address?.pref ? address.pref : "東京都";

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
          }}>F/S MOCK — C-2 マイページ</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            ログイン後 / マイページタブ<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※プロフィール・利用規約・ログアウト・退会
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
              style={{ height: 38, objectFit: "contain", cursor: "pointer" }}
            />
            <span style={{ fontSize: 18, color: TEXT_SUB, cursor: "pointer" }}>☰</span>
          </div>

          {/* スクロール領域 */}
          <div style={{ flex: 1, overflowY: "auto", background: BG }}>
            {/* プロフィールカード */}
            <div style={{
              padding: "16px 16px 12px",
              background: "#fff",
              borderBottom: `1px solid ${BORDER}`,
            }}>
              <div style={{
                background: "#fff",
                border: `1px solid ${BORDER}`,
                borderRadius: 14,
                padding: "14px 14px",
                display: "flex", alignItems: "center", gap: 14,
                boxShadow: "0 2px 8px rgba(10,37,64,0.04)",
              }}>
                {/* アバター */}
                <div style={{
                  width: 56, height: 56, borderRadius: 28,
                  background: photo ? "#000" : `linear-gradient(135deg, ${CTA} 0%, ${CTA_DARK} 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, fontWeight: 900, color: "#fff",
                  flexShrink: 0, overflow: "hidden",
                }}>
                  {photo ? (
                    <img src={photo} alt={userName}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span>{(userName?.[0] || "山")}</span>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 15, fontWeight: 800, color: NAVY,
                    marginBottom: 2, lineHeight: 1.3,
                  }}>
                    {userName}
                  </div>
                  <div style={{
                    fontSize: 11, color: TEXT_SUB, fontWeight: 600,
                  }}>
                    {location} ・ {age}歳
                  </div>
                </div>
                <span style={{
                  fontSize: 14, color: TEXT_MUTE,
                }}>›</span>
              </div>
            </div>

            {/* メニュー */}
            <div style={{ marginTop: 12, background: "#fff" }}>
              <MenuItem
                icon="👤"
                label="プロフィール編集"
                onClick={() => navigate("/profile-edit")}
              />
              <MenuItem
                icon="📄"
                label="利用規約"
                onClick={() => navigate("/terms")}
              />
              <MenuItem
                icon="🚪"
                label="ログアウト"
                onClick={() => alert("ログアウトしました（モック）")}
              />
              <MenuItem
                icon="⚠️"
                label="退会"
                danger
                onClick={() => navigate("/withdraw")}
              />
            </div>

            {/* スペーサー */}
            <div style={{ height: 40 }} />
          </div>

          <BottomNav activeTab="mypage" />
        </Phone>
      </div>
    </div>
  );
}
