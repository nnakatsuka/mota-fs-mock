import { useNavigate } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";

const PRIMARY = "#3FB6E8";
const PRIMARY_DARK = "#059CDB";
const CTA = "#E8593C";
const NAVY = "#0A2540";
const BG = "#F4FAFE";
const BORDER = "#DDE9F0";
const TEXT = "#0A2540";
const TEXT_SUB = "#5A6B7C";
const TEXT_MUTE = "#A0AEC0";
const DANGER = "#C44529";
const DANGER_DARK = "#A6391E";

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

export default function Withdraw() {
  const navigate = useNavigate();

  const handleWithdraw = () => {
    alert("退会処理を実行しました（モック）");
    navigate("/");
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
          }}>F/S MOCK — C-5 退会確認</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            マイページ / 退会<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※退会前の最終確認画面
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
            <span onClick={() => navigate("/mypage")} style={{
              fontSize: 22, color: TEXT_SUB, cursor: "pointer",
            }}>‹</span>
            <img
              src={logoUrl}
              alt="タップミー / TAPME"
              onClick={() => navigate("/")}
              style={{ height: 38, objectFit: "contain", cursor: "pointer" }}
            />
            <span style={{ fontSize: 18, color: TEXT_SUB, cursor: "pointer" }}>☰</span>
          </div>

          {/* メインコンテンツ */}
          <div style={{
            flex: 1, overflowY: "auto",
            background: "#fff",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "20px 24px",
          }}>
            {/* 警告アイコン */}
            <div style={{
              width: 90, height: 90, borderRadius: "50%",
              background: "#FFF1F0",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 24,
              border: `2px solid ${DANGER}33`,
            }}>
              <span style={{ fontSize: 48 }}>⚠️</span>
            </div>

            {/* タイトル */}
            <div style={{
              fontSize: 22, fontWeight: 900, color: DANGER,
              marginBottom: 16, letterSpacing: -0.5,
              textAlign: "center",
            }}>
              本当に退会しますか？
            </div>

            {/* 説明 */}
            <div style={{
              fontSize: 12, color: TEXT_SUB, textAlign: "center",
              lineHeight: 1.8, fontWeight: 600, marginBottom: 24,
            }}>
              退会するとアカウント情報、<br/>
              応募履歴、スカウト履歴が<br/>
              <span style={{ color: DANGER, fontWeight: 800 }}>すべて削除されます。</span>
            </div>

            {/* 注意事項 */}
            <div style={{
              width: "100%",
              background: "#FFF8F7",
              border: `1px solid ${DANGER}33`,
              borderRadius: 10, padding: "14px 14px",
              marginBottom: 28,
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 6,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span>⚠</span><span>ご注意ください</span>
              </div>
              <div style={{
                fontSize: 11, color: TEXT_SUB, lineHeight: 1.7, fontWeight: 600,
              }}>
                ・データは復元できません<br/>
                ・進行中の応募は自動で取り消されます<br/>
                ・同じメールアドレスでの再登録は可能です
              </div>
            </div>

            {/* 退会ボタン (赤) */}
            <button onClick={handleWithdraw} style={{
              width: "100%", height: 50,
              background: DANGER, color: "#fff",
              border: `2px solid ${DANGER}`, borderRadius: 25,
              fontSize: 14, fontWeight: 800, letterSpacing: 0.5,
              cursor: "pointer", marginBottom: 10,
              boxShadow: "0 6px 18px rgba(196,69,41,0.4)",
              fontFamily: "inherit",
            }}>
              退会する
            </button>

            {/* キャンセルボタン */}
            <button onClick={() => navigate("/mypage")} style={{
              width: "100%", height: 50,
              background: "#fff", color: DANGER,
              border: `2px solid ${DANGER}33`, borderRadius: 25,
              fontSize: 14, fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}>
              キャンセル
            </button>
          </div>
        </Phone>
      </div>
    </div>
  );
}
