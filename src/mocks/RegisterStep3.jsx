import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";
import { loadDraft, saveDraft } from "../registerStorage";

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
const REQUIRED = "#E8593C";

function Btn({ children, secondary, full = true, onClick, disabled, color = "cta" }) {
  const palette = {
    cta: { bg: CTA, fg: "#fff", bd: CTA, hover: CTA_DARK },
    primary: { bg: PRIMARY_DARK, fg: "#fff", bd: PRIMARY_DARK, hover: PRIMARY },
  };
  const styles = secondary
    ? { bg: "#fff", fg: TEXT, bd: BORDER, hover: "#F4FAFE" }
    : palette[color];
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{
      width: full ? "100%" : "auto", height: 48, padding: full ? 0 : "0 24px",
      borderRadius: 24, border: `2px solid ${styles.bd}`,
      background: disabled ? "#E0E6EC" : styles.bg,
      color: disabled ? "#999" : styles.fg,
      fontSize: 14, fontWeight: 800, letterSpacing: 0.5,
      cursor: disabled ? "not-allowed" : "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: secondary || disabled ? "none"
        : color === "cta" ? "0 4px 14px rgba(232,89,60,0.3)"
        : "0 4px 14px rgba(5,156,219,0.3)",
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

function StepIndicator({ current = 3, total = 4 }) {
  const labels = ["基本情報", "Q&A", "写真", "確認"];
  return (
    <div style={{ padding: "12px 16px 16px", background: "#fff", borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: PRIMARY_DARK }}>STEP {current} / {total}</div>
        <div style={{ fontSize: 11, color: TEXT_SUB }}>{labels[current - 1]}</div>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i < current ? PRIMARY : "#E0EAF0",
          }} />
        ))}
      </div>
    </div>
  );
}

// ==========================================================================
// MAIN
// ==========================================================================

export default function RegisterStep3() {
  const navigate = useNavigate();
  const draft = loadDraft();
  const [photo, setPhoto] = useState(draft.step3?.photo || null); // dataURL
  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    saveDraft({ step3: { photo } });
  }, [photo]);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setPhoto(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleNext = () => {
    if (!photo) return;
    navigate("/register-step4");
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
          }}>F/S MOCK — 会員登録 STEP 3</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            プロフィール登録 / 顔写真<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※カメラ起動 or 写真アルバムからアップロード
            </span>
          </div>
        </div>

        <Phone>
          <div style={{
            height: 50, background: "#fff", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 16px", flexShrink: 0,
          }}>
            <span onClick={() => navigate("/register-step2")} style={{ fontSize: 18, color: TEXT_SUB, cursor: "pointer" }}>‹</span>
            <img src={logoUrl} alt="タップミー / TAPME" style={{ height: 28, objectFit: "contain" }} />
            <span onClick={() => navigate("/")} style={{ fontSize: 11, color: TEXT_SUB, fontWeight: 600, cursor: "pointer" }}>✕ 閉じる</span>
          </div>

          <StepIndicator current={3} total={4} />

          <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
            <div style={{ padding: "20px 18px 24px" }}>
              {/* セクションタイトル */}
              <div style={{ marginBottom: 18 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
                }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: NAVY }}>顔写真</div>
                  <span style={{
                    fontSize: 9, fontWeight: 800, background: REQUIRED,
                    color: "#fff", padding: "2px 6px", borderRadius: 3,
                  }}>必須</span>
                </div>
                <div style={{ fontSize: 11, color: TEXT_SUB, lineHeight: 1.6 }}>
                  プロフィール写真は必須です。<br/>
                  <span style={{
                    background: ACCENT_YELLOW, color: NAVY, fontWeight: 800,
                    padding: "1px 6px", borderRadius: 3,
                  }}>写真ありはスカウト率3倍UP</span>
                </div>
              </div>

              {/* 写真エリア */}
              <div style={{
                background: "#FAFCFE", borderRadius: 14,
                padding: 20, marginBottom: 16,
                border: `2px dashed ${photo ? PRIMARY : "#D0D9E0"}`,
                display: "flex", flexDirection: "column", alignItems: "center",
              }}>
                {photo ? (
                  <>
                    <div style={{
                      width: 200, height: 240, borderRadius: 12,
                      overflow: "hidden", marginBottom: 12,
                      boxShadow: "0 4px 20px rgba(10,37,64,0.15)",
                      background: "#000",
                    }}>
                      <img src={photo} alt="あなたの顔写真"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{
                      fontSize: 11, color: SUCCESS, fontWeight: 700,
                      marginBottom: 12, display: "flex", alignItems: "center", gap: 4,
                    }}>
                      <span style={{
                        display: "inline-flex", width: 16, height: 16, borderRadius: "50%",
                        background: SUCCESS, color: "#fff",
                        alignItems: "center", justifyContent: "center",
                        fontSize: 10, fontWeight: 900,
                      }}>✓</span>
                      <span>写真がアップロードされました</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, width: "100%" }}>
                      <div style={{ flex: 1 }}>
                        <Btn secondary onClick={handleCameraClick}>📷 撮り直す</Btn>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Btn secondary onClick={() => setPhoto(null)}>✕ 削除</Btn>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* ガイド枠 */}
                    <div style={{
                      width: 200, height: 240, borderRadius: 12,
                      background: "#fff", marginBottom: 16,
                      border: `2px solid ${PRIMARY}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative",
                      boxShadow: "0 4px 16px rgba(63,182,232,0.2)",
                    }}>
                      {/* 顔シルエット */}
                      <svg width="100" height="120" viewBox="0 0 100 120" style={{ opacity: 0.25 }}>
                        <circle cx="50" cy="40" r="22" fill={PRIMARY_DARK} />
                        <ellipse cx="50" cy="100" rx="32" ry="28" fill={PRIMARY_DARK} />
                      </svg>
                      <div style={{
                        position: "absolute", bottom: 12, left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: 10, fontWeight: 700, color: PRIMARY_DARK,
                        background: "#E8F6FD", padding: "3px 10px", borderRadius: 12,
                        whiteSpace: "nowrap",
                      }}>
                        この枠に顔を合わせて
                      </div>
                    </div>

                    {/* 撮影 / アップロードボタン */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                      <Btn color="cta" onClick={handleCameraClick}>
                        📷 カメラで撮影する
                      </Btn>
                      <Btn secondary onClick={handleFileClick}>
                        🖼 アルバムから選ぶ
                      </Btn>
                    </div>
                  </>
                )}

                {/* 隠しinput */}
                <input ref={cameraInputRef} type="file" accept="image/*"
                  capture="user"
                  onChange={e => handleFile(e.target.files[0])}
                  style={{ display: "none" }} />
                <input ref={fileInputRef} type="file" accept="image/*"
                  onChange={e => handleFile(e.target.files[0])}
                  style={{ display: "none" }} />
              </div>

              {/* 撮影のポイント */}
              <div style={{
                background: "#F4FAFE", border: `1px solid ${BORDER}`,
                borderRadius: 10, padding: "14px 14px", marginBottom: 18,
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 8,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span>📸</span><span>撮影のポイント</span>
                </div>
                <div style={{ fontSize: 11, color: TEXT_SUB, lineHeight: 1.8 }}>
                  <div>・ 顔がはっきり見える正面写真</div>
                  <div>・ 背景はなるべく明るい壁</div>
                  <div>・ マイナンバーカードの写真のように</div>
                  <div>・ <span style={{ color: REQUIRED, fontWeight: 700 }}>帽子・サングラスはNG</span></div>
                </div>
              </div>

              <div style={{
                fontSize: 10, color: TEXT_MUTE, textAlign: "center",
                lineHeight: 1.6, marginTop: 8,
              }}>
                写真は安全に保管され、<br/>
                スカウトしてくれた企業のみ閲覧できます。
              </div>
            </div>
          </div>

          <div style={{
            padding: "12px 16px", background: "#fff",
            borderTop: `1px solid ${BORDER}`,
            display: "flex", gap: 8, flexShrink: 0,
          }}>
            <div style={{ flex: 0.7 }}>
              <Btn secondary>下書き保存</Btn>
            </div>
            <div style={{ flex: 1 }}>
              <Btn disabled={!photo} onClick={handleNext}>
                {photo ? "次へ進む ›" : "写真を登録してください"}
              </Btn>
            </div>
          </div>
        </Phone>
      </div>
    </div>
  );
}
