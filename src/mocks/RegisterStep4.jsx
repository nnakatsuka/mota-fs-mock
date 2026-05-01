import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";
import { loadDraft, clearDraft } from "../registerStorage";

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

const EDU_LABELS = {
  junior_hs: "中学校", high_school: "高校", vocational: "専門学校",
  junior_college: "短期大学", kosen: "高等専門学校",
  university: "大学", graduate: "大学院",
};

const QUESTION_TITLES = {
  q1: "これまでの仕事で、一番やりがいを感じた経験を教えてください",
  q2: "仕事で大事にしていることは何ですか?",
  q3: "あなたの強みを一言で表すと?",
};

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

function StepIndicator({ current = 4, total = 4 }) {
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

// アコーディオンセクション
function Section({ icon, title, defaultOpen = true, onEdit, editLabel = "修正する", children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12,
      marginBottom: 12, overflow: "hidden",
    }}>
      <div onClick={() => setOpen(!open)} style={{
        padding: "14px 16px", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: open ? "#FAFCFE" : "#fff",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>{icon}</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span onClick={(e) => { e.stopPropagation(); onEdit && onEdit(); }} style={{
            fontSize: 11, fontWeight: 700, color: PRIMARY_DARK,
            background: "#E8F6FD", padding: "4px 10px", borderRadius: 12,
            cursor: "pointer", border: `1px solid ${PRIMARY}55`,
          }}>
            ✏ {editLabel}
          </span>
          <span style={{
            fontSize: 12, color: TEXT_SUB,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}>▼</span>
        </div>
      </div>
      {open && (
        <div style={{
          padding: "12px 16px 16px",
          borderTop: `1px solid ${BORDER}`,
          background: "#fff",
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{
      display: "flex", padding: "8px 0",
      borderBottom: `1px dashed ${BORDER}`,
      fontSize: 12, lineHeight: 1.6,
    }}>
      <div style={{ width: 90, color: TEXT_SUB, fontWeight: 700, flexShrink: 0 }}>
        {label}
      </div>
      <div style={{ flex: 1, color: value ? TEXT : TEXT_MUTE, fontWeight: 600 }}>
        {value || "（未入力）"}
      </div>
    </div>
  );
}

export default function RegisterStep4() {
  const navigate = useNavigate();
  const draft = loadDraft();
  const s1 = draft.step1 || {};
  const s2 = draft.step2 || {};
  const s3 = draft.step3 || {};

  const handleSubmit = () => {
    // 確認OK → 完了画面へ
    navigate("/register-complete");
  };

  // 表示用のデータ整形
  const birthdayDisplay = s1.birthday
    ? `${s1.birthday[0]}年${s1.birthday[1]}月${s1.birthday[2]}日`
    : "";
  const addressDisplay = s1.address?.pref
    ? `${s1.address.pref} ${s1.address.city || ""}`
    : "";
  const eduDisplay = EDU_LABELS[s1.edu] || "";
  const carDisplay = s1.hasCarLicense === true
    ? (s1.carLicenses && s1.carLicenses.length > 0
        ? s1.carLicenses.join(" / ")
        : "あり（資格未選択）")
    : s1.hasCarLicense === false ? "なし" : "";

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
          }}>F/S MOCK — 会員登録 STEP 4</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            プロフィール登録 / 確認画面<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※修正したい箇所は「修正する」で前のSTEPに戻れる
            </span>
          </div>
        </div>

        <Phone>
          <div style={{
            height: 50, background: "#fff", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 16px", flexShrink: 0,
          }}>
            <span onClick={() => navigate("/register-step3")} style={{ fontSize: 18, color: TEXT_SUB, cursor: "pointer" }}>‹</span>
            <img src={logoUrl} alt="タップミー / TAPME" style={{ height: 28, objectFit: "contain" }} />
            <span onClick={() => navigate("/")} style={{ fontSize: 11, color: TEXT_SUB, fontWeight: 600, cursor: "pointer" }}>✕ 閉じる</span>
          </div>

          <StepIndicator current={4} total={4} />

          <div style={{ flex: 1, overflowY: "auto", background: BG }}>
            <div style={{ padding: "20px 16px 24px" }}>
              {/* セクションタイトル */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 4 }}>
                  入力内容の確認
                </div>
                <div style={{ fontSize: 11, color: TEXT_SUB, lineHeight: 1.6 }}>
                  以下の内容で登録します。<br/>
                  修正したい場合は各セクションの「修正する」をタップしてください。
                </div>
              </div>

              {/* セクション1: 基本情報 */}
              <Section icon="📋" title="基本情報"
                onEdit={() => navigate("/register")}>
                <Row label="氏名（カナ）" value={s1.name} />
                <Row label="電話番号" value={s1.tel} />
                <Row label="メール" value={s1.email} />
                <Row label="生年月日" value={birthdayDisplay} />
                <Row label="住所" value={addressDisplay} />
                <Row label="最終学歴" value={eduDisplay} />
                <Row label="自動車関連資格" value={carDisplay} />
                {s1.otherLicense && <Row label="その他資格" value={s1.otherLicense} />}
              </Section>

              {/* セクション2: 3問Q&A */}
              <Section icon="💬" title="3問Q&A"
                onEdit={() => navigate("/register-step2")}>
                {["q1", "q2", "q3"].map(qid => (
                  <div key={qid} style={{
                    padding: "10px 0",
                    borderBottom: `1px dashed ${BORDER}`,
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: PRIMARY_DARK, marginBottom: 4 }}>
                      {qid.toUpperCase()}. {QUESTION_TITLES[qid]}
                    </div>
                    <div style={{
                      fontSize: 12, color: TEXT, lineHeight: 1.7,
                      padding: "8px 10px", background: "#F0F8FF",
                      borderRadius: 6, marginTop: 4,
                    }}>
                      {s2[qid]?.ai || (<span style={{ color: TEXT_MUTE }}>（未入力）</span>)}
                    </div>
                  </div>
                ))}
              </Section>

              {/* セクション3: 顔写真 */}
              <Section icon="📷" title="顔写真"
                onEdit={() => navigate("/register-step3")}>
                {s3.photo ? (
                  <div style={{
                    display: "flex", justifyContent: "center", padding: "8px 0",
                  }}>
                    <div style={{
                      width: 140, height: 170, borderRadius: 10,
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(10,37,64,0.15)",
                      background: "#000",
                    }}>
                      <img src={s3.photo} alt="顔写真"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </div>
                ) : (
                  <div style={{
                    color: TEXT_MUTE, textAlign: "center",
                    fontSize: 12, padding: "12px 0",
                  }}>
                    （未登録）
                  </div>
                )}
              </Section>

              {/* 注意事項 */}
              <div style={{
                background: "#FFFCF0",
                border: `1px solid ${ACCENT_YELLOW}99`,
                borderRadius: 10, padding: "12px 14px",
                marginTop: 16,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, lineHeight: 1.7 }}>
                  ご登録いただいた情報は、<br/>
                  企業へのスカウト判断材料として使用されます。
                </div>
              </div>

              <div style={{
                fontSize: 10, color: TEXT_MUTE, textAlign: "center",
                lineHeight: 1.6, marginTop: 16,
              }}>
                登録ボタンを押すと、<br/>
                <span style={{ fontWeight: 700 }}>利用規約・プライバシーポリシー</span>に同意したものとみなされます。
              </div>
            </div>
          </div>

          <div style={{
            padding: "12px 16px", background: "#fff",
            borderTop: `1px solid ${BORDER}`,
            display: "flex", gap: 8, flexShrink: 0,
          }}>
            <div style={{ flex: 0.7 }}>
              <Btn secondary onClick={() => navigate("/register-step3")}>戻る</Btn>
            </div>
            <div style={{ flex: 1.3 }}>
              <Btn onClick={handleSubmit}>この内容で登録する ›</Btn>
            </div>
          </div>
        </Phone>
      </div>
    </div>
  );
}
