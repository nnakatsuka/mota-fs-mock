import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";
import { SCOUTS } from "../scoutData";

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

const MESSAGE_PREVIEW_LIMIT = 80;

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

function PhotoTile({ emoji, idx }) {
  // バリエーションを持たせるため idx で背景色を変える
  const colors = ["#E0F2F8", "#FEF3D6", "#E8F4D9", "#FDE6F0", "#F0E8FA", "#FFE4DC"];
  return (
    <div style={{
      width: 160, height: 110, borderRadius: 10,
      background: colors[idx % colors.length],
      flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 60,
      boxShadow: "0 2px 8px rgba(10,37,64,0.06)",
      border: `1px solid ${BORDER}`,
    }}>
      {emoji}
    </div>
  );
}

function PerkRow({ icon, label, value, highlight }) {
  return (
    <div style={{
      display: "flex", padding: "12px 0",
      borderBottom: `1px solid ${BORDER}`,
      gap: 10, alignItems: "flex-start",
    }}>
      <div style={{
        width: 56, fontSize: 11, fontWeight: 800,
        color: "#fff", background: highlight ? CTA : PRIMARY_DARK,
        padding: "4px 0", borderRadius: 4, textAlign: "center",
        flexShrink: 0,
      }}>
        {label}
      </div>
      <div style={{
        flex: 1, fontSize: 13, fontWeight: 700,
        color: TEXT, lineHeight: 1.5,
      }}>
        {value}
      </div>
    </div>
  );
}

export default function ScoutDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const scout = SCOUTS.find(s => s.id === id) || SCOUTS[0];

  const [messageOpen, setMessageOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true); // 初回赤バナー表示用

  const fullMessage = scout.message;
  const previewMessage = fullMessage.length > MESSAGE_PREVIEW_LIMIT
    ? fullMessage.slice(0, MESSAGE_PREVIEW_LIMIT) + "..."
    : fullMessage;

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
          }}>F/S MOCK — D-2 スカウト詳細</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            企業からのスカウト詳細画面<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※下部のお断り/保留/応募するは追従固定
            </span>
          </div>
        </div>

        <Phone>
          {/* ヘッダー */}
          <div style={{
            height: 50, background: "#fff", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 16px", flexShrink: 0,
          }}>
            <span onClick={() => navigate("/scout-list")} style={{
              fontSize: 18, color: TEXT_SUB, cursor: "pointer",
            }}>‹</span>
            <img src={logoUrl} alt="タップミー / TAPME" style={{ height: 28, objectFit: "contain" }} />
            <span style={{ fontSize: 18, color: TEXT_SUB, cursor: "pointer" }}>☰</span>
          </div>

          {/* スクロール領域 */}
          <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
            {/* スカウト届きました赤バナー */}
            {hasUnread && (
              <div style={{
                background: CTA, color: "#fff",
                padding: "12px 16px", textAlign: "center",
                fontSize: 14, fontWeight: 800, letterSpacing: 0.5,
                position: "relative",
              }}>
                <span style={{ marginRight: 6 }}>📩</span>
                スカウトが届きました！！
              </div>
            )}

            {/* 企業情報 */}
            <div style={{
              padding: "16px 16px 12px",
              borderBottom: `1px solid ${BORDER}`,
              background: "#fff",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 10,
                  background: scout.iconBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32, flexShrink: 0,
                  border: `2px solid ${BORDER}`,
                }}>
                  {scout.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: TEXT_SUB, marginBottom: 2,
                  }}>
                    {scout.industry}
                  </div>
                  <div style={{
                    fontSize: 14, fontWeight: 800, color: NAVY,
                    lineHeight: 1.4, marginBottom: 4,
                  }}>
                    {scout.jobTitle}
                  </div>
                  <div style={{
                    fontSize: 11, color: PRIMARY_DARK, fontWeight: 700,
                    textDecoration: "underline",
                    textDecorationColor: PRIMARY_DARK + "44",
                  }}>
                    {scout.company} ・ {scout.location}
                  </div>
                </div>
              </div>

              {/* タグ群 */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {scout.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, fontWeight: 700,
                    padding: "3px 9px", borderRadius: 12,
                    background: "#E8F6FD", color: PRIMARY_DARK,
                    border: `1px solid ${PRIMARY}33`,
                  }}>
                    # {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 写真6枚 横スクロール */}
            <div style={{ padding: "14px 0", borderBottom: `1px solid ${BORDER}` }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: TEXT_SUB,
                padding: "0 16px", marginBottom: 8,
              }}>
                職場の様子
              </div>
              <div style={{
                display: "flex", gap: 8, overflowX: "auto",
                padding: "0 16px",
                scrollbarWidth: "thin",
              }}>
                {scout.photos.map((emoji, i) => (
                  <PhotoTile key={i} emoji={emoji} idx={i} />
                ))}
              </div>
            </div>

            {/* スカウトメッセージ赤枠 */}
            <div style={{ padding: "16px 16px 0" }}>
              <div style={{
                fontSize: 12, fontWeight: 800, color: CTA, marginBottom: 6,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span>💌</span>
                <span>企業からのメッセージ</span>
              </div>
              <div style={{
                background: "#FFF6F2",
                border: `2px solid ${CTA}`,
                borderRadius: 10, padding: "12px 14px",
                position: "relative",
              }}>
                <div style={{
                  fontSize: 13, color: TEXT, lineHeight: 1.7,
                }}>
                  {messageOpen ? fullMessage : previewMessage}
                </div>
                {fullMessage.length > MESSAGE_PREVIEW_LIMIT && (
                  <div onClick={() => setMessageOpen(!messageOpen)} style={{
                    marginTop: 6, fontSize: 11, fontWeight: 700,
                    color: CTA, cursor: "pointer", display: "flex", alignItems: "center", gap: 2,
                  }}>
                    <span>{messageOpen ? "閉じる" : "続きを読む"}</span>
                    <span style={{
                      transform: messageOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}>▼</span>
                  </div>
                )}
              </div>
            </div>

            {/* 求人情報詳細 */}
            <div style={{ padding: "20px 16px 16px" }}>
              <div style={{
                fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 8,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span>📋</span>
                <span>求人情報の詳細</span>
              </div>
              <PerkRow label="年収" value={scout.perks.annualIncome} highlight />
              <PerkRow label="月給" value={scout.perks.monthly} />
              <PerkRow label="休日" value={scout.perks.holidays} />
              <PerkRow label="勤務" value={scout.perks.schedule} />
              <PerkRow label="その他" value={scout.perks.others} />
            </div>

            {/* 詳細はこちら導線 */}
            <div style={{
              padding: "0 16px 16px",
              textAlign: "center",
            }}>
              <div style={{
                padding: "10px 14px",
                background: "#F4FAFE",
                border: `1px solid ${BORDER}`,
                borderRadius: 10,
                fontSize: 12, fontWeight: 700, color: PRIMARY_DARK,
                cursor: "pointer",
              }}>
                求人情報の詳細はこちら →
              </div>
            </div>

            {/* 下部スペーサー（追従ボタン分） */}
            <div style={{ height: 80 }} />
          </div>

          {/* 追従固定ボタン */}
          <div style={{
            padding: "10px 12px",
            background: "#fff",
            borderTop: `1px solid ${BORDER}`,
            boxShadow: "0 -4px 16px rgba(10,37,64,0.08)",
            display: "flex", gap: 6, flexShrink: 0,
          }}>
            <button onClick={() => alert("お断りしました（モック）")} style={{
              flex: 0.9, height: 46,
              background: "#fff", color: TEXT_SUB,
              border: `1.5px solid ${BORDER}`, borderRadius: 23,
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              fontFamily: "inherit",
            }}>お断り</button>
            <button onClick={() => alert("保留にしました（モック）")} style={{
              flex: 0.9, height: 46,
              background: "#FEF3D6", color: "#B5832A",
              border: `1.5px solid #E5BD52`, borderRadius: 23,
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              fontFamily: "inherit",
            }}>保留</button>
            <button onClick={() => navigate("/applied-complete")} style={{
              flex: 1.4, height: 46,
              background: CTA, color: "#fff",
              border: `1.5px solid ${CTA}`, borderRadius: 23,
              fontSize: 14, fontWeight: 800, cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 4px 14px rgba(232,89,60,0.4)",
            }}>応募する ›</button>
          </div>
        </Phone>
      </div>
    </div>
  );
}
