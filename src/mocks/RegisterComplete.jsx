import { useNavigate } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";
import { loadDraft, clearDraft } from "../registerStorage";

const PRIMARY = "#3FB6E8";
const PRIMARY_DARK = "#059CDB";
const PRIMARY_LIGHT = "#A9E0F0";
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

function Btn({ children, secondary, full = true, onClick, color = "cta" }) {
  const palette = {
    cta: { bg: CTA, fg: "#fff", bd: CTA, hover: CTA_DARK },
    primary: { bg: PRIMARY_DARK, fg: "#fff", bd: PRIMARY_DARK, hover: PRIMARY },
  };
  const styles = secondary
    ? { bg: "#fff", fg: TEXT, bd: BORDER, hover: "#F4FAFE" }
    : palette[color];
  return (
    <button onClick={onClick} style={{
      width: full ? "100%" : "auto", height: 52, padding: full ? 0 : "0 24px",
      borderRadius: 26, border: `2px solid ${styles.bd}`,
      background: styles.bg, color: styles.fg,
      fontSize: 15, fontWeight: 800, letterSpacing: 0.5, cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: secondary ? "none"
        : color === "cta" ? "0 6px 18px rgba(232,89,60,0.4)"
        : "0 6px 18px rgba(5,156,219,0.4)",
      transition: "all 0.12s", fontFamily: "inherit",
    }}>{children}</button>
  );
}

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

export default function RegisterComplete() {
  const navigate = useNavigate();
  const draft = loadDraft();
  const userName = draft.step1?.name || "";
  const photo = draft.step3?.photo;

  const handleStart = () => {
    // モック上はスカウト一覧 (jobseeker mock) へ遷移
    navigate("/jobseeker");
  };

  const handleNewRegister = () => {
    // 確認用：もう一度登録フローを試したいときに draft をクリア
    clearDraft();
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
          }}>F/S MOCK — 登録完了</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            ようこそタップミーへ！<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※スカウト一覧へ進む導入画面
            </span>
          </div>
        </div>

        <Phone>
          <div style={{
            flex: 1, overflowY: "auto",
            background: `linear-gradient(180deg, #E8F6FD 0%, #FFFFFF 60%)`,
            display: "flex", flexDirection: "column",
          }}>
            {/* ロゴ */}
            <div style={{
              padding: "32px 0 16px", textAlign: "center",
            }}>
              <img src={logoUrl} alt="タップミー / TAPME"
                style={{ height: 40, objectFit: "contain" }} />
            </div>

            {/* ✓ 完了アイコン */}
            <div style={{
              display: "flex", justifyContent: "center", marginTop: 16, marginBottom: 24,
            }}>
              <div style={{
                width: 100, height: 100, borderRadius: "50%",
                background: `linear-gradient(135deg, ${SUCCESS} 0%, #18A682 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 56, fontWeight: 900,
                boxShadow: "0 12px 32px rgba(34,195,154,0.4)",
                position: "relative",
              }}>
                ✓
                {/* 装飾の光 */}
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
            </div>

            {/* ウェルカムメッセージ */}
            <div style={{ textAlign: "center", padding: "0 24px", marginBottom: 12 }}>
              <div style={{
                fontSize: 22, fontWeight: 900, color: NAVY,
                letterSpacing: -0.5, marginBottom: 8,
              }}>
                ようこそ、<br/>
                <span style={{ color: PRIMARY_DARK }}>タップミー</span>へ！
              </div>
              <div style={{
                fontSize: 13, color: TEXT_SUB, lineHeight: 1.7, fontWeight: 600,
              }}>
                {userName && <>{userName} さん<br /></>}
                プロフィール登録、お疲れさまでした 🎉
              </div>
            </div>

            {/* 写真（あれば） */}
            {photo && (
              <div style={{
                display: "flex", justifyContent: "center",
                marginTop: 16, marginBottom: 8,
              }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  overflow: "hidden",
                  border: `3px solid #fff`,
                  boxShadow: "0 4px 16px rgba(10,37,64,0.15)",
                  background: "#000",
                }}>
                  <img src={photo} alt={userName}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            )}

            {/* 次に何をするか */}
            <div style={{ padding: "24px 18px 0" }}>
              <div style={{
                background: "#fff", borderRadius: 14,
                padding: "18px 18px",
                border: `1px solid ${BORDER}`,
                boxShadow: "0 4px 16px rgba(10,37,64,0.06)",
              }}>
                <div style={{
                  fontSize: 13, fontWeight: 800, color: NAVY,
                  textAlign: "center", marginBottom: 14,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                  <span style={{ fontSize: 14 }}>📩</span>
                  <span>このあとの流れ</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    {
                      n: "1",
                      t: "企業からスカウト",
                      d: "あなたのプロフィールを見た企業からスカウトメッセージが届きます。",
                    },
                    {
                      n: "2",
                      t: "気になる企業に返信",
                      d: "ピンと来た企業のスカウトに返信して面接に進めます。",
                    },
                    {
                      n: "3",
                      t: "正社員として入社",
                      d: "面接を経て、正社員としての一歩を踏み出しましょう。",
                    },
                  ].map(s => (
                    <div key={s.n} style={{
                      display: "flex", gap: 10, alignItems: "flex-start",
                    }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: 12,
                        background: PRIMARY, color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 900, flexShrink: 0, marginTop: 1,
                      }}>{s.n}</div>
                      <div>
                        <div style={{
                          fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 2,
                        }}>{s.t}</div>
                        <div style={{
                          fontSize: 10, color: TEXT_SUB, lineHeight: 1.6,
                        }}>{s.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* スカウト率UP訴求 */}
            <div style={{ padding: "16px 18px 24px" }}>
              <div style={{
                background: `linear-gradient(135deg, ${ACCENT_YELLOW}33 0%, ${ACCENT_YELLOW}11 100%)`,
                border: `1px solid ${ACCENT_YELLOW}77`,
                borderRadius: 10, padding: "10px 14px",
                fontSize: 11, fontWeight: 700, color: NAVY, lineHeight: 1.6,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ fontSize: 16 }}>💡</span>
                <span>
                  プロフィールを充実させるとスカウト率がさらにUP！<br/>
                  マイページからいつでも編集できます。
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{
            padding: "12px 16px 14px", background: "#fff",
            borderTop: `1px solid ${BORDER}`,
            flexShrink: 0,
          }}>
            <Btn onClick={handleStart}>
              スカウトを見る ›
            </Btn>
            <div style={{
              textAlign: "center", marginTop: 8,
              fontSize: 11, color: TEXT_SUB, fontWeight: 600, cursor: "pointer",
            }} onClick={handleNewRegister}>
              プロフィールを編集する
            </div>
          </div>
        </Phone>
      </div>
    </div>
  );
}
