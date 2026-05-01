import { useState, useEffect } from "react";
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
const BG_INPUT = "#FAFCFE";
const BG_LOCKED = "#EEF2F5";
const BORDER = "#DDE9F0";
const TEXT = "#0A2540";
const TEXT_SUB = "#5A6B7C";
const TEXT_MUTE = "#A0AEC0";

const QUESTIONS = [
  { id: "q1", label: "Q1.", title: "これまでの仕事で、一番やりがいを感じた経験を教えてください",
    placeholder: "例：前のバイトで店長やってて、新人教えるのが意外と楽しかった。" },
  { id: "q2", label: "Q2.", title: "仕事で大事にしていることは何ですか?",
    placeholder: "例：チームの空気感かな。みんなで楽しくやるのが好き。" },
  { id: "q3", label: "Q3.", title: "あなたの強みを一言で表すと?",
    placeholder: "例：粘り強さ。簡単に諦めない方だと思う。" },
];

const MAX_LENGTH = 140;

function mockAIConvert(text) {
  if (!text || text.length < 1) return "";
  let out = text.trim();
  const replacements = [
    [/だった/g, "でした"], [/だよ/g, "です"], [/だね/g, "です"], [/だ\b/g, "です"],
    [/かな/g, ""], [/思う/g, "思います"], [/思った/g, "思いました"],
    [/やってて/g, "務めており"], [/やってる/g, "取り組んでおります"], [/やった/g, "取り組みました"],
    [/楽しかった/g, "やりがいを感じることができました"], [/楽しい/g, "やりがいがあります"],
    [/教える/g, "指導する"], [/がんばる/g, "尽力する"], [/がんばった/g, "尽力しました"],
    [/好き/g, "大切にしています"], [/と思う/g, "と考えております"],
    [/できる/g, "できます"], [/する/g, "いたします"],
    [/はず/g, "と考えております"], [/みんな/g, "皆様"], [/俺|僕|私/g, "私"],
    [/嬉しい/g, "光栄に思います"], [/嬉しかった/g, "光栄に存じました"],
    [/けど/g, "ですが"], [/しかし/g, "ですが"],
    [/ちょっと/g, "少し"], [/めっちゃ/g, "非常に"], [/すごく/g, "非常に"], [/とても/g, "非常に"],
    [/簡単に/g, "容易に"], [/諦めない/g, "諦めずに取り組む"],
  ];
  replacements.forEach(([pattern, rep]) => { out = out.replace(pattern, rep); });
  if (out && !out.match(/[。．！？\.\!?]$/)) out += "。";
  return out;
}

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

function CheckBadge() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 16, height: 16, borderRadius: "50%",
      background: SUCCESS, color: "#fff", fontSize: 10, fontWeight: 900,
      marginLeft: 6, lineHeight: 1, boxShadow: "0 1px 3px rgba(34,195,154,0.4)",
    }}>✓</span>
  );
}

function QACard({ q, state, onChange }) {
  const { raw, ai, phase } = state;
  const [focusedRaw, setFocusedRaw] = useState(false);
  const [focusedAI, setFocusedAI] = useState(false);
  const charCount = raw.length;
  const hasInput = charCount >= 1;
  const isOver = charCount > MAX_LENGTH;
  const isLocked = phase === "locked";

  return (
    <div style={{
      marginBottom: 16, padding: 14,
      background: isLocked ? "#F4F7FA" : "#fff",
      border: `1px solid ${isLocked ? "#D5DEE5" : BORDER}`,
      borderRadius: 14, transition: "background 0.2s, border-color 0.2s",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
        <span style={{
          fontSize: 11, fontWeight: 800, color: PRIMARY_DARK,
          background: "#E8F6FD", padding: "2px 8px", borderRadius: 4,
          flexShrink: 0, fontFamily: "Georgia, serif",
        }}>{q.label}</span>
        <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: NAVY, lineHeight: 1.5, paddingTop: 1 }}>
          {q.title}{isLocked && <CheckBadge />}
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: TEXT_SUB, marginBottom: 4,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span>あなたの言葉で</span>
          <span style={{
            fontSize: 9, fontWeight: 700,
            background: ACCENT_YELLOW, color: NAVY,
            padding: "1px 6px", borderRadius: 3,
          }}>ため口OK</span>
        </div>
        <textarea placeholder={q.placeholder} value={raw} readOnly={isLocked}
          onChange={e => onChange({ ...state, raw: e.target.value })}
          onFocus={() => setFocusedRaw(true)} onBlur={() => setFocusedRaw(false)}
          maxLength={MAX_LENGTH + 20}
          style={{
            width: "100%", minHeight: 70, padding: 10,
            border: `1.5px solid ${focusedRaw && !isLocked ? PRIMARY : "#EFF2F5"}`,
            borderRadius: 8,
            background: isLocked ? BG_LOCKED : BG_INPUT,
            color: isLocked ? TEXT_SUB : TEXT,
            fontSize: 13, outline: "none", resize: "vertical", lineHeight: 1.6,
            boxSizing: "border-box", fontFamily: "inherit", transition: "all 0.15s",
            boxShadow: focusedRaw && !isLocked ? `0 0 0 3px rgba(63,182,232,0.12)` : "none",
            cursor: isLocked ? "not-allowed" : "text",
          }} />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
          <div style={{
            fontSize: 11, fontWeight: 700,
            color: isOver ? "#E54B4B" : charCount > MAX_LENGTH * 0.85 ? "#E89E29" : TEXT_MUTE,
          }}>{charCount} / {MAX_LENGTH}</div>
        </div>
      </div>

      {!isLocked && phase === "input" && (
        <Btn color="cta" disabled={!hasInput || isOver}
          onClick={() => onChange({ ...state, ai: mockAIConvert(raw), phase: "ai" })}>
          ✨ AI敬語変換する
        </Btn>
      )}

      {(phase === "ai" || isLocked) && (
        <div style={{
          background: isLocked ? "#EAF1F6" : "#F0F8FF",
          borderRadius: 10, padding: "10px 12px",
          border: `1px dashed ${isLocked ? "#B8C5D0" : PRIMARY_DARK + "55"}`,
          marginTop: 10,
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 6,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12 }}>✨</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: isLocked ? TEXT_SUB : PRIMARY_DARK }}>
                AI敬語変換
              </span>
            </div>
            <span style={{
              fontSize: 9, fontWeight: 600, color: TEXT_SUB,
              background: "#fff", padding: "2px 6px", borderRadius: 3,
              border: `1px solid ${BORDER}`,
            }}>{isLocked ? "✓ 確定済み" : "必要に応じて修正できます"}</span>
          </div>
          <textarea value={ai} readOnly={isLocked}
            onChange={e => onChange({ ...state, ai: e.target.value })}
            onFocus={() => setFocusedAI(true)} onBlur={() => setFocusedAI(false)}
            style={{
              width: "100%", minHeight: 70, padding: 10,
              border: `1.5px solid ${focusedAI && !isLocked ? PRIMARY : "transparent"}`,
              borderRadius: 8,
              background: isLocked ? BG_LOCKED : "#fff",
              color: isLocked ? TEXT_SUB : TEXT,
              fontSize: 13, outline: "none", resize: "vertical", lineHeight: 1.7,
              boxSizing: "border-box", fontFamily: "inherit", transition: "all 0.15s",
              boxShadow: focusedAI && !isLocked ? `0 0 0 3px rgba(63,182,232,0.12)` : "none",
              cursor: isLocked ? "not-allowed" : "text",
            }} />
          {!isLocked && (
            <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
              <div style={{ flex: 0.7 }}>
                <Btn secondary onClick={() => onChange({ ...state, phase: "input" })}>戻る</Btn>
              </div>
              <div style={{ flex: 1 }}>
                <Btn color="primary" disabled={!ai.trim()}
                  onClick={() => onChange({ ...state, phase: "locked" })}>
                  確定する ›
                </Btn>
              </div>
            </div>
          )}
          {isLocked && (
            <div style={{ marginTop: 10 }}>
              <Btn secondary onClick={() => onChange({ ...state, phase: "ai" })}>
                ↩ 差し戻す（編集する）
              </Btn>
            </div>
          )}
        </div>
      )}
    </div>
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

function StepIndicator({ current = 2, total = 4 }) {
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

export default function RegisterStep2() {
  const navigate = useNavigate();
  const draft = loadDraft();
  const [states, setStates] = useState(
    draft.step2 || {
      q1: { raw: "", ai: "", phase: "input" },
      q2: { raw: "", ai: "", phase: "input" },
      q3: { raw: "", ai: "", phase: "input" },
    }
  );

  useEffect(() => {
    saveDraft({ step2: states });
  }, [states]);

  const setQuestionState = (id, newState) => {
    setStates(prev => ({ ...prev, [id]: newState }));
  };

  const isComplete = QUESTIONS.every(q => states[q.id].phase === "locked");
  const lockedCount = QUESTIONS.filter(q => states[q.id].phase === "locked").length;

  const handleNext = () => {
    if (!isComplete) return;
    navigate("/register-step3");
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
          }}>F/S MOCK — 会員登録 STEP 2</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            プロフィール登録 / 3問Q&A<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※ため口で入力 → AI敬語変換 → 確定の3ステップ
            </span>
          </div>
        </div>
        <Phone>
          <div style={{
            height: 50, background: "#fff", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 16px", flexShrink: 0,
          }}>
            <span onClick={() => navigate("/register")} style={{ fontSize: 18, color: TEXT_SUB, cursor: "pointer" }}>‹</span>
            <img src={logoUrl} alt="タップミー / TAPME" style={{ height: 28, objectFit: "contain" }} />
            <span onClick={() => navigate("/")} style={{ fontSize: 11, color: TEXT_SUB, fontWeight: 600, cursor: "pointer" }}>✕ 閉じる</span>
          </div>
          <StepIndicator current={2} total={4} />
          <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
            <div style={{ padding: "20px 18px 24px" }}>
              <div style={{ marginBottom: 18 }}>
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", marginBottom: 6,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: NAVY }}>3問Q&A</div>
                    <span style={{
                      fontSize: 10, fontWeight: 800,
                      background: ACCENT_YELLOW, color: NAVY,
                      padding: "2px 8px", borderRadius: 4,
                    }}>ため口OK</span>
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: lockedCount === 3 ? SUCCESS : TEXT_SUB,
                  }}>{lockedCount} / 3 確定</div>
                </div>
                <div style={{ fontSize: 11, color: TEXT_SUB, lineHeight: 1.6 }}>
                  自然な言葉で答えてください。<br/>
                  AIが敬語に変換します。
                </div>
              </div>

              <div style={{
                background: "linear-gradient(135deg, #E8F6FD 0%, #F0F8FF 100%)",
                borderRadius: 10, padding: "10px 14px", marginBottom: 16,
                border: `1px solid ${PRIMARY_DARK}22`,
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  fontSize: 11, fontWeight: 700, color: NAVY, flexWrap: "wrap",
                }}>
                  <span style={{ fontSize: 12 }}>✏️</span><span>ため口で入力</span>
                  <span style={{ color: TEXT_MUTE }}>→</span>
                  <span style={{ fontSize: 12 }}>✨</span><span>AI敬語変換</span>
                  <span style={{ color: TEXT_MUTE }}>→</span>
                  <span style={{ fontSize: 12 }}>✓</span><span>確定</span>
                </div>
              </div>

              {QUESTIONS.map(q => (
                <QACard key={q.id} q={q} state={states[q.id]}
                  onChange={(newState) => setQuestionState(q.id, newState)} />
              ))}

              <div style={{ fontSize: 10, color: TEXT_MUTE, textAlign: "center", lineHeight: 1.6, marginTop: 8 }}>
                各設問は1〜140文字で入力してください。
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
              <Btn disabled={!isComplete} onClick={handleNext}>
                {isComplete ? "次へ進む ›" : `あと${3 - lockedCount}問 確定が必要`}
              </Btn>
            </div>
          </div>
        </Phone>
      </div>
    </div>
  );
}
