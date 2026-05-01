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
const ERROR = "#E54B4B";
const NAVY = "#0A2540";
const BG = "#F4FAFE";
const BG_INPUT = "#FAFCFE";
const BORDER = "#DDE9F0";
const TEXT = "#0A2540";
const TEXT_SUB = "#5A6B7C";
const TEXT_MUTE = "#A0AEC0";
const REQUIRED = "#E8593C";

const EMAIL_DOMAINS = ["gmail.com", "yahoo.co.jp", "docomo.ne.jp", "au.com", "ezweb.ne.jp", "softbank.ne.jp", "icloud.com", "outlook.jp", "outlook.com", "hotmail.co.jp"];

const PREFECTURES = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"];

const CITIES = {
  "東京都": ["千代田区","中央区","港区","新宿区","文京区","台東区","墨田区","江東区","品川区","目黒区","大田区","世田谷区","渋谷区","中野区","杉並区","豊島区","北区","荒川区","板橋区","練馬区","足立区","葛飾区","江戸川区","八王子市","立川市","武蔵野市","三鷹市","府中市","町田市"],
  "神奈川県": ["横浜市","川崎市","相模原市","横須賀市","平塚市","鎌倉市","藤沢市","茅ヶ崎市","厚木市","大和市"],
  "千葉県": ["千葉市","市川市","船橋市","松戸市","野田市","柏市","流山市","我孫子市","市原市"],
  "埼玉県": ["さいたま市","川越市","熊谷市","川口市","所沢市","春日部市","草加市","越谷市"],
  "大阪府": ["大阪市","堺市","豊中市","吹田市","高槻市","枚方市","東大阪市"],
  "愛知県": ["名古屋市","豊橋市","岡崎市","豊田市","一宮市"],
  "_default": ["主要都市1","主要都市2","主要都市3"],
};

const EDU_OPTIONS = [
  { id: "junior_hs", label: "中学", icon: "🏫" },
  { id: "high_school", label: "高校", icon: "🎓" },
  { id: "vocational", label: "専門", icon: "🎯" },
  { id: "junior_college", label: "短大", icon: "📚" },
  { id: "kosen", label: "高専", icon: "⚙️" },
  { id: "university", label: "大学", icon: "🎓" },
  { id: "graduate", label: "大学院", icon: "🔬" },
];

const CAR_LICENSES = ["普通自動車免許","中型免許","大型免許","自動車整備士1級","自動車整備士2級","自動車整備士3級","フォークリフト","けん引免許"];

const validate = {
  name: (v) => /^[\u30A0-\u30FF]{2,}$/.test((v || "").replace(/\s/g, "")),
  tel: (v) => {
    const digits = (v || "").replace(/[^0-9]/g, "");
    return digits.length >= 10 && digits.length <= 11;
  },
  email: (v) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v || ""),
  birthday: () => true,
  address: (v) => Boolean(v?.pref && v?.city),
  edu: (v) => Boolean(v),
  hasCarLicense: (v) => v !== null && v !== undefined,
};

const errorMessage = {
  name: "カタカナで2文字以上入力してください",
  tel: "10〜11桁の数字で入力してください",
  email: "正しいメールアドレスを入力してください",
  address: "住所を選択してください",
  edu: "学歴を選択してください",
  hasCarLicense: "資格の有無を選択してください",
};

function Btn({ children, secondary, full = true, onClick, disabled }) {
  const styles = secondary
    ? { bg: "#fff", fg: TEXT, bd: BORDER, hover: "#F4FAFE" }
    : { bg: CTA, fg: "#fff", bd: CTA, hover: CTA_DARK };
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{
      width: full ? "100%" : "auto", height: 48, padding: full ? 0 : "0 24px",
      borderRadius: 24, border: `2px solid ${styles.bd}`,
      background: disabled ? "#E0E6EC" : styles.bg,
      color: disabled ? "#999" : styles.fg,
      fontSize: 14, fontWeight: 800, letterSpacing: 0.5,
      cursor: disabled ? "not-allowed" : "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: secondary || disabled ? "none" : "0 4px 14px rgba(232,89,60,0.3)",
      transition: "all 0.12s", fontFamily: "inherit",
    }}>
      {children}
    </button>
  );
}

function RequiredBadge() {
  return (
    <span style={{
      display: "inline-block", padding: "1px 6px",
      background: REQUIRED, color: "#fff",
      borderRadius: 3, fontSize: 9, fontWeight: 800,
      letterSpacing: 0.5, marginRight: 6, lineHeight: 1.4,
    }}>必須</span>
  );
}

function CheckBadge() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 16, height: 16, borderRadius: "50%",
      background: SUCCESS, color: "#fff",
      fontSize: 10, fontWeight: 900,
      marginLeft: 6, lineHeight: 1,
      boxShadow: "0 1px 3px rgba(34,195,154,0.4)",
    }}>✓</span>
  );
}

function FieldLabel({ required, children, hint, isValid }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, display: "flex", alignItems: "center" }}>
        {required && <RequiredBadge />}
        {children}
        {isValid && <CheckBadge />}
      </div>
      {hint && <div style={{ fontSize: 10, color: TEXT_SUB, marginTop: 2 }}>{hint}</div>}
    </div>
  );
}

function ErrorText({ children }) {
  if (!children) return null;
  return (
    <div style={{
      fontSize: 11, color: ERROR, marginTop: 4, fontWeight: 600,
      display: "flex", alignItems: "center", gap: 4,
    }}>
      <span>⚠</span><span>{children}</span>
    </div>
  );
}

function Field({ children }) {
  return <div style={{ marginBottom: 18 }}>{children}</div>;
}

function inputStyle(focused, hasError) {
  const borderColor = hasError ? ERROR : focused ? PRIMARY : BORDER;
  return {
    width: "100%", height: 44, padding: "0 12px",
    border: `1.5px solid ${borderColor}`,
    borderRadius: 8, background: BG_INPUT,
    fontSize: 14, color: TEXT, outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    boxShadow: focused
      ? `0 0 0 3px ${hasError ? "rgba(229,75,75,0.12)" : "rgba(63,182,232,0.12)"}`
      : "none",
    boxSizing: "border-box", fontFamily: "inherit",
  };
}

function KanaInput({ value, onChange, onBlur, hasError }) {
  const [focused, setFocused] = useState(false);
  return (
    <input type="text" name="user_name_kana" autoComplete="off" placeholder="ヤマダタロウ"
      value={value || ""}
      onChange={e => {
        let v = e.target.value;
        v = v.replace(/[\u3041-\u3096]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60));
        v = v.replace(/[^\u30A0-\u30FF\s]/g, "");
        onChange(v);
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => { setFocused(false); onBlur && onBlur(); }}
      style={inputStyle(focused, hasError)} />
  );
}

function TelInput({ value, onChange, onBlur, hasError }) {
  const [focused, setFocused] = useState(false);
  return (
    <input type="tel" name="user_tel" inputMode="tel" autoComplete="tel" placeholder="09012345678"
      value={value || ""}
      onChange={e => onChange(e.target.value.replace(/[^0-9-]/g, ""))}
      onFocus={() => setFocused(true)}
      onBlur={() => { setFocused(false); onBlur && onBlur(); }}
      style={inputStyle(focused, hasError)} />
  );
}

function EmailInput({ value, onChange, onBlur, hasError }) {
  const [focused, setFocused] = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);
  const v = value || "";
  const atIndex = v.indexOf("@");
  const localPart = atIndex >= 0 ? v.substring(0, atIndex) : v;
  const domainPart = atIndex >= 0 ? v.substring(atIndex + 1) : "";
  const filteredDomains = atIndex >= 0
    ? EMAIL_DOMAINS.filter(d => d.startsWith(domainPart) && d !== domainPart).slice(0, 5)
    : [];
  const shouldShow = focused && atIndex >= 0 && localPart.length > 0 && filteredDomains.length > 0;
  const pickDomain = (domain) => { onChange(`${localPart}@${domain}`); setShowSuggest(false); };

  return (
    <div style={{ position: "relative" }}>
      <input type="email" name="user_email" inputMode="email" autoComplete="email" placeholder="example@gmail.com"
        value={v} onChange={e => onChange(e.target.value)}
        onFocus={() => { setFocused(true); setShowSuggest(true); }}
        onBlur={() => {
          setFocused(false);
          setTimeout(() => setShowSuggest(false), 150);
          onBlur && onBlur();
        }}
        style={inputStyle(focused, hasError)} />
      {shouldShow && showSuggest && (
        <div style={{
          position: "absolute", top: 48, left: 0, right: 0,
          background: "#fff", borderRadius: 8, border: `1px solid ${BORDER}`,
          boxShadow: "0 8px 24px rgba(10,37,64,0.12)", zIndex: 10, overflow: "hidden",
        }}>
          {filteredDomains.map((d, i) => (
            <div key={d} onMouseDown={() => pickDomain(d)} style={{
              padding: "10px 12px", cursor: "pointer", fontSize: 13, color: TEXT,
              borderBottom: i === filteredDomains.length - 1 ? "none" : `1px solid ${BORDER}`,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ color: TEXT_MUTE, fontSize: 12 }}>{localPart}@</span>
              <span style={{ fontWeight: 700 }}>{d}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BirthdayPicker({ value, onChange }) {
  const currentYear = 2026;
  const years = Array.from({ length: 60 }, (_, i) => currentYear - 18 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const [year, month, day] = value || [currentYear - 25, 1, 1];

  const selectStyle = {
    flex: 1, height: 44, padding: "0 8px",
    border: `1.5px solid ${BORDER}`, borderRadius: 8,
    background: BG_INPUT, fontSize: 14, color: TEXT,
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%235A6B7C' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
    paddingRight: 26, fontFamily: "inherit",
  };

  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <select value={year} onChange={e => onChange([+e.target.value, month, day])} style={selectStyle}>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
      <span style={{ fontSize: 12, color: TEXT_SUB }}>年</span>
      <select value={month} onChange={e => onChange([year, +e.target.value, day])} style={{...selectStyle, flex: 0.7}}>
        {months.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
      <span style={{ fontSize: 12, color: TEXT_SUB }}>月</span>
      <select value={day} onChange={e => onChange([year, month, +e.target.value])} style={{...selectStyle, flex: 0.7}}>
        {days.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <span style={{ fontSize: 12, color: TEXT_SUB }}>日</span>
    </div>
  );
}

function AddressPicker({ value, onChange, hasError }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("pref");
  const [tempPref, setTempPref] = useState(value?.pref || "");
  const [tempCity, setTempCity] = useState(value?.city || "");
  const cities = tempPref ? (CITIES[tempPref] || CITIES._default) : [];
  const display = value?.pref ? `${value.pref} ${value.city || ""}` : "";

  const confirm = () => {
    onChange({ pref: tempPref, city: tempCity });
    setOpen(false); setTab("pref");
  };

  return (
    <>
      <div onClick={() => { setOpen(true); setTempPref(value?.pref || ""); setTempCity(value?.city || ""); }}
        style={{
          ...inputStyle(false, hasError), display: "flex", alignItems: "center",
          cursor: "pointer", color: display ? TEXT : TEXT_MUTE,
          justifyContent: "space-between",
        }}>
        <span>{display || "都道府県・市区町村を選択"}</span>
        <span style={{ color: TEXT_SUB, fontSize: 14 }}>›</span>
      </div>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{
            position: "fixed", inset: 0, background: "rgba(10,37,64,0.5)", zIndex: 100,
          }} />
          <div style={{
            position: "fixed", bottom: 0, left: "50%",
            transform: "translateX(-50%)", width: "100%", maxWidth: 390,
            background: "#fff", borderRadius: "16px 16px 0 0",
            zIndex: 101, paddingBottom: 8,
            boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
          }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: "#D3D9DD", margin: "8px auto 12px" }} />
            <div style={{
              display: "flex", justifyContent: "space-between",
              padding: "0 16px 12px", alignItems: "center",
              borderBottom: `1px solid ${BORDER}`,
            }}>
              <span onClick={() => setOpen(false)} style={{ fontSize: 13, color: TEXT_SUB, cursor: "pointer" }}>キャンセル</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>住所を選択</span>
              <span onClick={tempPref && tempCity ? confirm : undefined} style={{
                fontSize: 13, fontWeight: 700,
                color: tempPref && tempCity ? PRIMARY_DARK : TEXT_MUTE,
                cursor: tempPref && tempCity ? "pointer" : "not-allowed",
              }}>完了</span>
            </div>
            <div style={{ display: "flex", padding: "8px 16px 0" }}>
              {[{ id: "pref", label: "都道府県", v: tempPref },
                { id: "city", label: "市区町村", v: tempCity, disabled: !tempPref }].map(t => (
                <div key={t.id} onClick={() => !t.disabled && setTab(t.id)} style={{
                  flex: 1, padding: "8px 0", textAlign: "center",
                  fontSize: 12, fontWeight: tab === t.id ? 700 : 500,
                  color: t.disabled ? TEXT_MUTE : tab === t.id ? PRIMARY_DARK : TEXT_SUB,
                  borderBottom: `2px solid ${tab === t.id ? PRIMARY : "transparent"}`,
                  cursor: t.disabled ? "not-allowed" : "pointer",
                }}>
                  <div>{t.label}</div>
                  {t.v && <div style={{ fontSize: 10, marginTop: 2 }}>{t.v}</div>}
                </div>
              ))}
            </div>
            <div style={{ height: 240, overflowY: "auto", padding: "8px 0", background: "#FAFCFE" }}>
              {tab === "pref" ? (
                PREFECTURES.map(p => (
                  <div key={p} onClick={() => { setTempPref(p); setTempCity(""); setTab("city"); }} style={{
                    padding: "11px 20px", fontSize: 14,
                    fontWeight: tempPref === p ? 700 : 500,
                    color: tempPref === p ? PRIMARY_DARK : TEXT,
                    background: tempPref === p ? "#E8F6FD" : "transparent",
                    cursor: "pointer",
                    borderLeft: tempPref === p ? `3px solid ${PRIMARY}` : "3px solid transparent",
                  }}>{p}</div>
                ))
              ) : (
                cities.map(c => (
                  <div key={c} onClick={() => setTempCity(c)} style={{
                    padding: "11px 20px", fontSize: 14,
                    fontWeight: tempCity === c ? 700 : 500,
                    color: tempCity === c ? PRIMARY_DARK : TEXT,
                    background: tempCity === c ? "#E8F6FD" : "transparent",
                    cursor: "pointer",
                    borderLeft: tempCity === c ? `3px solid ${PRIMARY}` : "3px solid transparent",
                  }}>{c}</div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function EduPicker({ value, onChange }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
      {EDU_OPTIONS.map(o => {
        const active = value === o.id;
        return (
          <button key={o.id} onClick={() => onChange(o.id)} style={{
            padding: "10px 6px",
            border: `1.5px solid ${active ? PRIMARY : BORDER}`,
            borderRadius: 8,
            background: active ? "#E8F6FD" : "#fff",
            color: active ? PRIMARY_DARK : TEXT,
            fontSize: 13, fontWeight: active ? 700 : 600,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
            transition: "all 0.12s", fontFamily: "inherit",
          }}>
            <span style={{ fontSize: 14 }}>{o.icon}</span>
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function CarLicensePicker({ hasCarLicense, onToggleHas, selectedLicenses, onChangeSelected }) {
  const toggleLicense = (lic) => {
    if (selectedLicenses.includes(lic)) onChangeSelected(selectedLicenses.filter(l => l !== lic));
    else onChangeSelected([...selectedLicenses, lic]);
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {[{ v: true, label: "あり", icon: "✓" }, { v: false, label: "なし", icon: "—" }].map(opt => {
          const active = hasCarLicense === opt.v;
          return (
            <button key={String(opt.v)} onClick={() => onToggleHas(opt.v)} style={{
              flex: 1, padding: "11px 0",
              border: `1.5px solid ${active ? PRIMARY : BORDER}`,
              borderRadius: 8,
              background: active ? "#E8F6FD" : "#fff",
              color: active ? PRIMARY_DARK : TEXT,
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              fontFamily: "inherit",
            }}>
              <span>{opt.icon}</span><span>{opt.label}</span>
            </button>
          );
        })}
      </div>
      {hasCarLicense === true && (
        <div style={{ padding: 12, background: "#F4FAFE", borderRadius: 8, border: `1px solid ${BORDER}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: TEXT_SUB, marginBottom: 8 }}>
            お持ちの資格を選択（複数可）
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {CAR_LICENSES.map(lic => {
              const active = selectedLicenses.includes(lic);
              return (
                <button key={lic} onClick={() => toggleLicense(lic)} style={{
                  padding: "6px 12px", borderRadius: 16,
                  border: `1.5px solid ${active ? PRIMARY : BORDER}`,
                  background: active ? PRIMARY : "#fff",
                  color: active ? "#fff" : TEXT,
                  fontSize: 11, fontWeight: 600, cursor: "pointer",
                  fontFamily: "inherit",
                }}>
                  {active && "✓ "}{lic}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function OtherLicenseInput({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea placeholder="例：宅建士、簿記2級、TOEIC700点 など"
      value={value || ""} onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{ ...inputStyle(focused, false), height: 70, padding: 12, resize: "vertical", lineHeight: 1.5 }} />
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

function StepIndicator({ current = 1, total = 4 }) {
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

export default function Register() {
  const navigate = useNavigate();
  const draft = loadDraft();
  const s1 = draft.step1 || {};

  const [name, setName] = useState(s1.name || "");
  const [tel, setTel] = useState(s1.tel || "");
  const [email, setEmail] = useState(s1.email || "");
  const [birthday, setBirthday] = useState(s1.birthday || [2001, 4, 1]);
  const [address, setAddress] = useState(s1.address || { pref: "", city: "" });
  const [edu, setEdu] = useState(s1.edu || "");
  const [hasCarLicense, setHasCarLicense] = useState(
    s1.hasCarLicense !== undefined ? s1.hasCarLicense : null
  );
  const [carLicenses, setCarLicenses] = useState(s1.carLicenses || []);
  const [otherLicense, setOtherLicense] = useState(s1.otherLicense || "");

  const [touched, setTouched] = useState({});
  const markTouched = (key) => setTouched(prev => ({ ...prev, [key]: true }));

  // 自動保存
  useEffect(() => {
    saveDraft({
      step1: { name, tel, email, birthday, address, edu, hasCarLicense, carLicenses, otherLicense }
    });
  }, [name, tel, email, birthday, address, edu, hasCarLicense, carLicenses, otherLicense]);

  const valid = {
    name: validate.name(name),
    tel: validate.tel(tel),
    email: validate.email(email),
    birthday: validate.birthday(),
    address: validate.address(address),
    edu: validate.edu(edu),
    hasCarLicense: validate.hasCarLicense(hasCarLicense),
  };

  const showError = (key) => touched[key] && !valid[key];
  const isComplete = Object.values(valid).every(Boolean);

  const handleNext = () => {
    if (!isComplete) return;
    navigate("/register-step2");
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
          }}>F/S MOCK — 会員登録 STEP 1</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            プロフィール登録 / 基本情報<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※TOPの会員登録CTAから遷移する画面
            </span>
          </div>
        </div>
        <Phone>
          <div style={{
            height: 50, background: "#fff", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 16px", flexShrink: 0,
          }}>
            <span onClick={() => navigate("/")} style={{ fontSize: 18, color: TEXT_SUB, cursor: "pointer" }}>‹</span>
            <img src={logoUrl} alt="タップミー / TAPME" style={{ height: 28, objectFit: "contain" }} />
            <span onClick={() => navigate("/")} style={{ fontSize: 11, color: TEXT_SUB, fontWeight: 600, cursor: "pointer" }}>✕ 閉じる</span>
          </div>
          <StepIndicator current={1} total={4} />
          <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
            <div style={{ padding: "20px 18px 24px" }}>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 4 }}>
                  基本情報を入力
                </div>
                <div style={{ fontSize: 11, color: TEXT_SUB, lineHeight: 1.6 }}>
                  プロフィールの基本となる情報です。<br/>
                  途中で保存もできます。
                </div>
              </div>

              <Field>
                <FieldLabel required hint="全角カタカナでご入力ください" isValid={valid.name}>
                  氏名（カタカナ）
                </FieldLabel>
                <KanaInput value={name} onChange={setName}
                  onBlur={() => markTouched("name")}
                  hasError={showError("name")} />
                {showError("name") && <ErrorText>{errorMessage.name}</ErrorText>}
              </Field>

              <Field>
                <FieldLabel required hint="ハイフンなし数字でも入力可" isValid={valid.tel}>
                  電話番号
                </FieldLabel>
                <TelInput value={tel} onChange={setTel}
                  onBlur={() => markTouched("tel")}
                  hasError={showError("tel")} />
                {showError("tel") && <ErrorText>{errorMessage.tel}</ErrorText>}
              </Field>

              <Field>
                <FieldLabel required isValid={valid.email}>
                  メールアドレス
                </FieldLabel>
                <EmailInput value={email} onChange={setEmail}
                  onBlur={() => markTouched("email")}
                  hasError={showError("email")} />
                {showError("email") && <ErrorText>{errorMessage.email}</ErrorText>}
              </Field>

              <Field>
                <FieldLabel required isValid={valid.birthday}>生年月日</FieldLabel>
                <BirthdayPicker value={birthday} onChange={setBirthday} />
              </Field>

              <Field>
                <FieldLabel required hint="市区町村まで（番地は不要）" isValid={valid.address}>
                  住所
                </FieldLabel>
                <AddressPicker
                  value={address}
                  onChange={(v) => { setAddress(v); markTouched("address"); }}
                  hasError={showError("address")} />
                {showError("address") && <ErrorText>{errorMessage.address}</ErrorText>}
              </Field>

              <Field>
                <FieldLabel required isValid={valid.edu}>最終学歴</FieldLabel>
                <EduPicker
                  value={edu}
                  onChange={(v) => { setEdu(v); markTouched("edu"); }} />
                {showError("edu") && <ErrorText>{errorMessage.edu}</ErrorText>}
              </Field>

              <div style={{
                background: "#FFFCF0", border: `1px solid ${ACCENT_YELLOW}55`,
                borderRadius: 10, padding: "14px 14px", marginBottom: 18,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 14 }}>📈</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>保有資格</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, background: ACCENT_YELLOW,
                    color: NAVY, padding: "2px 6px", borderRadius: 3,
                  }}>スカウト率UP</span>
                </div>
                <div style={{ fontSize: 11, color: TEXT_SUB, marginBottom: 12, lineHeight: 1.6 }}>
                  資格を入れるとスカウト率が上がります。<br/>
                  自動車関連の資格は特に評価されやすいです。
                </div>
                <Field>
                  <FieldLabel required isValid={valid.hasCarLicense}>
                    自動車関連の資格
                  </FieldLabel>
                  <CarLicensePicker
                    hasCarLicense={hasCarLicense}
                    onToggleHas={(v) => {
                      setHasCarLicense(v);
                      markTouched("hasCarLicense");
                      if (!v) setCarLicenses([]);
                    }}
                    selectedLicenses={carLicenses}
                    onChangeSelected={setCarLicenses}
                  />
                  {showError("hasCarLicense") && <ErrorText>{errorMessage.hasCarLicense}</ErrorText>}
                </Field>
                <div style={{ marginBottom: 0 }}>
                  <FieldLabel hint="その他の資格があれば自由に">その他の資格</FieldLabel>
                  <OtherLicenseInput value={otherLicense} onChange={setOtherLicense} />
                </div>
              </div>
              <div style={{ fontSize: 10, color: TEXT_MUTE, textAlign: "center", lineHeight: 1.6, marginTop: 8 }}>
                登録情報は厳重に管理されます。<br/>
                利用規約・プライバシーポリシーに同意の上ご登録ください。
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
                {isComplete ? "次へ進む ›" : "必須項目を入力"}
              </Btn>
            </div>
          </div>
        </Phone>
      </div>
    </div>
  );
}
