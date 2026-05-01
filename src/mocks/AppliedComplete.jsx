import { useNavigate } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";

const PRIMARY = "#3FB6E8";
const PRIMARY_DARK = "#059CDB";
const CTA = "#E8593C";
const CTA_DARK = "#C44529";
const SUCCESS = "#22C39A";
const NAVY = "#0A2540";
const BG = "#F4FAFE";
const BORDER = "#DDE9F0";
const TEXT = "#0A2540";
const TEXT_SUB = "#5A6B7C";
const TEXT_MUTE = "#A0AEC0";

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

export default function AppliedComplete() {
  const navigate = useNavigate();

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
          }}>F/S MOCK — D-3 応募完了</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            応募ボタン押下後の完了画面<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※企業からの返信を待つ案内
            </span>
          </div>
        </div>

        <Phone>
          {/* ヘッダー */}
          <div style={{
            height: 50, background: "#fff", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "0 16px", flexShrink: 0,
          }}>
            <img src={logoUrl} alt="タップミー / TAPME" style={{ height: 28, objectFit: "contain" }} />
          </div>

          {/* メインコンテンツ */}
          <div style={{
            flex: 1, overflowY: "auto",
            background: "#fff",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "20px 24px",
          }}>
            {/* チェックアイコン */}
            <div style={{
              width: 90, height: 90, borderRadius: "50%",
              background: `linear-gradient(135deg, ${SUCCESS} 0%, #18A682 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 50, fontWeight: 900,
              boxShadow: "0 12px 32px rgba(34,195,154,0.4)",
              marginBottom: 24,
              position: "relative",
            }}>
              ✓
              <div style={{
                position: "absolute", inset: -6,
                borderRadius: "50%",
                border: `2px solid ${SUCCESS}33`,
              }} />
              <div style={{
                position: "absolute", inset: -16,
                borderRadius: "50%",
                border: `1px solid ${SUCCESS}22`,
              }} />
            </div>

            {/* タイトル */}
            <div style={{
              fontSize: 24, fontWeight: 900, color: NAVY,
              marginBottom: 12, letterSpacing: -0.5,
            }}>
              応募完了！
            </div>

            {/* 説明 */}
            <div style={{
              fontSize: 13, color: TEXT_SUB, textAlign: "center",
              lineHeight: 1.7, fontWeight: 600, marginBottom: 32,
            }}>
              企業からのご連絡を<br/>
              お待ちください。
            </div>

            {/* 案内ボックス */}
            <div style={{
              width: "100%",
              background: "#F0F8FF",
              border: `1px solid ${PRIMARY}55`,
              borderRadius: 12, padding: "14px 16px",
              marginBottom: 24,
            }}>
              <div style={{
                fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 6,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span>📩</span>
                <span>このあとの流れ</span>
              </div>
              <div style={{
                fontSize: 11, color: TEXT_SUB, lineHeight: 1.7, fontWeight: 600,
              }}>
                企業からの返信は、<br/>
                <span style={{ color: PRIMARY_DARK, fontWeight: 800 }}>メッセージタブ</span>と
                <span style={{ color: PRIMARY_DARK, fontWeight: 800 }}>登録メールアドレス</span>に届きます。
              </div>
            </div>

            {/* ボタン */}
            <button onClick={() => navigate("/scout-list")} style={{
              width: "100%", height: 50,
              background: CTA, color: "#fff",
              border: `2px solid ${CTA}`, borderRadius: 25,
              fontSize: 14, fontWeight: 800, letterSpacing: 0.5,
              cursor: "pointer", marginBottom: 10,
              boxShadow: "0 6px 18px rgba(232,89,60,0.4)",
              fontFamily: "inherit",
            }}>
              履歴を確認する
            </button>

            <button onClick={() => navigate("/")} style={{
              width: "100%", height: 50,
              background: "#fff", color: TEXT,
              border: `2px solid ${BORDER}`, borderRadius: 25,
              fontSize: 14, fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}>
              ホームに戻る
            </button>
          </div>
        </Phone>
      </div>
    </div>
  );
}
