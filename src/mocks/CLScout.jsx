import { useState } from "react";

// ==========================================================================
// MOTA CL-side F/S Mock — 車買取事業者向け 求職者一覧 / 詳細 / スカウト送信
// ==========================================================================
// 用途: CS受容性検証用。営業現場で車買取事業者に見せて反応を取る前提。
// 範囲: CL側スカウト管理の一部 (求職者一覧 / 詳細プレビュー / スカウト送信モーダル)
// ==========================================================================

const ACCENT = "#E8593C";       // MOTAブランドオレンジ
const ACCENT_DARK = "#C44529";
const PURPLE = "#534AB7";       // AI面談色
const BG = "#F0EFEB";
const BG_CARD = "#FAFAF8";
const BORDER = "#E8E6E1";
const TEXT = "#1a1a1a";
const TEXT_SUB = "#5F5E5A";
const TEXT_MUTE = "#B4B2A9";

// ==========================================================================
// Mock Data — 車買取事業者向け候補者
// ==========================================================================

const JOBSEEKERS = [
  {
    id: 1, name: "山田 拓海", age: 28, area: "千葉県市川市", lastLogin: "本日",
    edu: "高専卒", licenses: ["普通免許", "自動車整備士2級"],
    exp: ["GS店長5年", "整備工場2年"],
    statusBadge: "新着", statusColor: "orange",
    msgOK: true, hasVideo: true, aiDone: false,
    matchScore: 92,
    photo: "🧑‍🔧",
    qa: [
      { q: "車に関するこだわり・好きなポイント", a: "走行性能と整備のしやすさ。趣味で旧車のレストアをしています。" },
      { q: "お客様との交渉で大切にしていること", a: "正直に査定根拠を説明すること。信頼が次の紹介に繋がると思っています。" },
      { q: "結果を出すために意識していること", a: "1日1台、相場確認の習慣化。市場感を肌で持つことを意識しています。" },
    ],
  },
  {
    id: 2, name: "佐藤 健一", age: 32, area: "東京都江戸川区", lastLogin: "1日前",
    edu: "大卒", licenses: ["普通免許"],
    exp: ["中古車販売営業3年", "保険代理店2年"],
    statusBadge: "AI面談済", statusColor: "purple",
    msgOK: true, hasVideo: true, aiDone: true,
    matchScore: 88,
    photo: "👨‍💼",
    qa: [
      { q: "車に関するこだわり・好きなポイント", a: "国産SUV全般。家族で乗れて長く付き合える車が好きです。" },
      { q: "お客様との交渉で大切にしていること", a: "売り急がず、お客様の事情をまず聞くことです。" },
      { q: "結果を出すために意識していること", a: "週次で自分の成約率を数字で振り返る。" },
    ],
  },
  {
    id: 3, name: "鈴木 美咲", age: 26, area: "神奈川県横浜市", lastLogin: "2日前",
    edu: "短大卒", licenses: ["普通免許"],
    exp: ["アパレル販売5年(店長経験)"],
    statusBadge: "保存済", statusColor: "gray",
    msgOK: true, hasVideo: false, aiDone: false,
    matchScore: 71,
    photo: "👩",
    qa: [
      { q: "車に関するこだわり・好きなポイント", a: "コンパクトカー。最近MINIに惹かれています。" },
      { q: "お客様との交渉で大切にしていること", a: "押し売りしない。相手の本音を引き出すこと。" },
      { q: "結果を出すために意識していること", a: "売上目標を分解して、日々の行動目標まで落とすこと。" },
    ],
  },
  {
    id: 4, name: "高橋 龍太", age: 24, area: "埼玉県川口市", lastLogin: "本日",
    edu: "専門卒", licenses: ["普通免許"],
    exp: ["カー用品店2年", "コールセンター1年"],
    statusBadge: "新着", statusColor: "orange",
    msgOK: true, hasVideo: true, aiDone: false,
    matchScore: 84,
    photo: "🧑",
    qa: [
      { q: "車に関するこだわり・好きなポイント", a: "走り屋系。サーキット走行が趣味です。" },
      { q: "お客様との交渉で大切にしていること", a: "車好き同士の話で距離を縮める。" },
      { q: "結果を出すために意識していること", a: "詳しい人ほど警戒される。聞き役に回ること。" },
    ],
  },
  {
    id: 5, name: "田中 翔太", age: 30, area: "東京都足立区", lastLogin: "3日前",
    edu: "高卒", licenses: ["普通免許", "自動車整備士3級"],
    exp: ["ディーラー営業4年", "整備士見習い1年"],
    statusBadge: "スカウト済", statusColor: "blue",
    msgOK: true, hasVideo: true, aiDone: true,
    matchScore: 95,
    photo: "👨",
    qa: [
      { q: "車に関するこだわり・好きなポイント", a: "ディーラーでの経験から幅広く好き。特に輸入車。" },
      { q: "お客様との交渉で大切にしていること", a: "次回のお付き合いを意識した提案。" },
      { q: "結果を出すために意識していること", a: "成約後のフォローこそ重要だと考えています。" },
    ],
  },
  {
    id: 6, name: "渡辺 颯", age: 27, area: "千葉県松戸市", lastLogin: "1日前",
    edu: "高卒", licenses: ["普通免許", "中型免許", "フォークリフト"],
    exp: ["運送業4年", "倉庫管理1年"],
    statusBadge: "新着", statusColor: "orange",
    msgOK: true, hasVideo: false, aiDone: false,
    matchScore: 78,
    photo: "🧑‍🔧",
    qa: [
      { q: "車に関するこだわり・好きなポイント", a: "大型トラック含めて何でも運転できます。" },
      { q: "お客様との交渉で大切にしていること", a: "時間に正確であること。" },
      { q: "結果を出すために意識していること", a: "段取り8割。事前準備で結果が決まる。" },
    ],
  },
  {
    id: 7, name: "伊藤 麻衣", age: 29, area: "東京都江東区", lastLogin: "本日",
    edu: "大卒", licenses: ["普通免許"],
    exp: ["生命保険営業4年(MDRT表彰)"],
    statusBadge: "新着", statusColor: "orange",
    msgOK: true, hasVideo: true, aiDone: false,
    matchScore: 81,
    photo: "👩‍💼",
    qa: [
      { q: "車に関するこだわり・好きなポイント", a: "燃費と維持費。実用性重視タイプです。" },
      { q: "お客様との交渉で大切にしていること", a: "相手の人生設計の中で車を考えること。" },
      { q: "結果を出すために意識していること", a: "紹介をいただける関係性をつくること。" },
    ],
  },
  {
    id: 8, name: "木村 大輔", age: 33, area: "神奈川県川崎市", lastLogin: "5日前",
    edu: "高卒", licenses: ["普通免許", "中型免許", "自動車整備士2級"],
    exp: ["整備工場10年(主任)"],
    statusBadge: "応諾", statusColor: "green",
    msgOK: true, hasVideo: true, aiDone: true,
    matchScore: 89,
    photo: "🧑‍🔧",
    qa: [
      { q: "車に関するこだわり・好きなポイント", a: "整備士目線で見るので、状態の良い車に惹かれます。" },
      { q: "お客様との交渉で大切にしていること", a: "技術的な根拠で説明すること。" },
      { q: "結果を出すために意識していること", a: "現場目線を忘れない。" },
    ],
  },
  {
    id: 9, name: "中村 結菜", age: 25, area: "東京都豊島区", lastLogin: "2日前",
    edu: "大卒", licenses: ["普通免許"],
    exp: ["コールセンターSV2年", "受付事務1年"],
    statusBadge: "新着", statusColor: "orange",
    msgOK: true, hasVideo: false, aiDone: false,
    matchScore: 68,
    photo: "👩",
    qa: [
      { q: "車に関するこだわり・好きなポイント", a: "あまり詳しくないので学びたい気持ちが強いです。" },
      { q: "お客様との交渉で大切にしていること", a: "話を最後まで聞き切ること。" },
      { q: "結果を出すために意識していること", a: "数字を見える化すること。" },
    ],
  },
  {
    id: 10, name: "小林 拓也", age: 31, area: "埼玉県さいたま市", lastLogin: "本日",
    edu: "大卒", licenses: ["普通免許"],
    exp: ["家電量販店営業7年(店長経験)"],
    statusBadge: "新着", statusColor: "orange",
    msgOK: true, hasVideo: true, aiDone: false,
    matchScore: 86,
    photo: "👨",
    qa: [
      { q: "車に関するこだわり・好きなポイント", a: "ハイブリッド車。家計目線で選びがちです。" },
      { q: "お客様との交渉で大切にしていること", a: "家電と同じで、買った後の生活を一緒にイメージすること。" },
      { q: "結果を出すために意識していること", a: "クロージングを焦らない。" },
    ],
  },
];

const SCOUT_TEMPLATES = [
  { id: "t1", name: "整備士・整備経験者向け", text: "はじめまして、◯◯買取センターの採用担当です。整備のご経験を拝見し、当社の査定スタッフとしてぜひお話を伺いたくスカウトをお送りしました。技術を活かしながらお客様対応にも携われる環境です。ご検討いただけますと幸いです。" },
  { id: "t2", name: "営業経験者向け", text: "はじめまして、◯◯買取センターの採用担当です。営業でのご経験、特に対面でのお客様対応のご実績を拝見しご連絡いたしました。インセンティブ制度も整っており、これまでのご経験を高く評価できる環境です。" },
  { id: "t3", name: "車好き未経験者向け", text: "はじめまして、◯◯買取センターの採用担当です。プロフィールから車への熱意を強く感じご連絡いたしました。未経験から査定士として育成する研修制度を整えています。お話だけでも一度いかがでしょうか。" },
  { id: "t4", name: "AI面談済み候補者向け（短文）", text: "AI面談を拝見しました。一度直接お話できればと思います。ご都合のよい日時をお知らせください。" },
];

// ==========================================================================
// Building Block Components
// ==========================================================================

function Tag({ children, color = "gray", small }) {
  const palette = {
    orange: { bg: "#FFF3ED", fg: "#C44529", bd: "#FAD4C5" },
    blue:   { bg: "#EEF4FE", fg: "#2A5BD7", bd: "#CFDFFB" },
    green:  { bg: "#EAF7EE", fg: "#1F8043", bd: "#C7E9D2" },
    purple: { bg: "#F0EDFE", fg: "#4A41A8", bd: "#D4CDF7" },
    gray:   { bg: "#F1EFE8", fg: "#5F5E5A", bd: "#E8E6E1" },
    red:    { bg: "#FDECEB", fg: "#B73B3A", bd: "#F6CBC9" },
  }[color];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: small ? "2px 7px" : "3px 9px", borderRadius: 4,
      fontSize: small ? 10 : 11, fontWeight: 600,
      background: palette.bg, color: palette.fg,
      border: `1px solid ${palette.bd}`, lineHeight: 1.4,
      whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function Btn({ children, variant = "primary", small, onClick, full, icon }) {
  const styles = {
    primary: { bg: ACCENT, fg: "#fff", bd: ACCENT, hover: ACCENT_DARK },
    outline: { bg: "#fff", fg: TEXT, bd: "#D3D1C7", hover: "#F7F6F3" },
    ghost:   { bg: "transparent", fg: TEXT_SUB, bd: "transparent", hover: "#F1EFE8" },
    purple:  { bg: PURPLE, fg: "#fff", bd: PURPLE, hover: "#3F389B" },
    danger:  { bg: "#fff", fg: "#C44529", bd: "#F6CBC9", hover: "#FDECEB" },
  }[variant];
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
      padding: small ? "5px 12px" : "8px 18px",
      borderRadius: 6, fontSize: small ? 12 : 13, fontWeight: 600,
      background: styles.bg, color: styles.fg, border: `1px solid ${styles.bd}`,
      cursor: "pointer", whiteSpace: "nowrap",
      width: full ? "100%" : "auto", lineHeight: 1.4,
      transition: "background 0.12s",
    }}
    onMouseEnter={e => e.currentTarget.style.background = styles.hover}
    onMouseLeave={e => e.currentTarget.style.background = styles.bg}>
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      {children}
    </button>
  );
}

function PhotoBlock({ emoji, hasVideo, size = 120 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 8,
      background: `linear-gradient(135deg, #FFE5DA 0%, #F0EDFE 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.5, position: "relative", flexShrink: 0,
      border: `1px solid ${BORDER}`,
    }}>
      <span>{emoji}</span>
      {hasVideo && (
        <div style={{
          position: "absolute", bottom: 6, right: 6,
          background: "rgba(0,0,0,0.7)", color: "#fff",
          borderRadius: 12, padding: "2px 8px", fontSize: 10, fontWeight: 600,
          display: "flex", alignItems: "center", gap: 3,
        }}>
          <span style={{ fontSize: 8 }}>▶</span>動画
        </div>
      )}
    </div>
  );
}

// ==========================================================================
// Layout: Side Navigation + Top Bar
// ==========================================================================

function SideNav({ active = "scout" }) {
  const items = [
    { id: "dash", label: "ダッシュボード", icon: "📊" },
    { id: "applicants", label: "応募管理", icon: "📥", badge: 12 },
    { id: "jobs", label: "求人管理", icon: "📝" },
    { id: "stores", label: "店舗管理", icon: "🏢" },
    { id: "company", label: "企業情報", icon: "🏛️" },
    { id: "scout", label: "スカウト", icon: "🎯", badge: null },
    { id: "messages", label: "メッセージ", icon: "💬", badge: 3 },
    { id: "settings", label: "設定", icon: "⚙️" },
  ];
  return (
    <div style={{
      width: 200, background: "#FFFFFF", borderRight: `1px solid ${BORDER}`,
      flexShrink: 0, display: "flex", flexDirection: "column",
    }}>
      {/* Logo block */}
      <div style={{
        height: 56, padding: "0 18px", display: "flex", alignItems: "center",
        borderBottom: `1px solid ${BORDER}`, gap: 8,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: ACCENT, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 14, letterSpacing: -0.5,
        }}>M</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: TEXT, lineHeight: 1.1 }}>MOTA</div>
          <div style={{ fontSize: 9, color: TEXT_SUB, lineHeight: 1.1 }}>採用管理</div>
        </div>
      </div>
      {/* Nav items */}
      <div style={{ padding: "12px 8px", flex: 1 }}>
        {items.map(it => (
          <div key={it.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "9px 12px", borderRadius: 6, marginBottom: 2,
            cursor: "pointer", fontSize: 13, fontWeight: active === it.id ? 700 : 500,
            background: active === it.id ? "#FFF3ED" : "transparent",
            color: active === it.id ? ACCENT : TEXT,
            borderLeft: active === it.id ? `3px solid ${ACCENT}` : "3px solid transparent",
            paddingLeft: 9,
          }}>
            <span style={{ fontSize: 15 }}>{it.icon}</span>
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.badge && (
              <span style={{
                background: ACCENT, color: "#fff", fontSize: 10, fontWeight: 700,
                borderRadius: 9, padding: "1px 6px", minWidth: 18, textAlign: "center",
              }}>{it.badge}</span>
            )}
          </div>
        ))}
      </div>
      {/* Plan info */}
      <div style={{
        margin: 12, padding: 12, background: "#F7F6F3", borderRadius: 6,
        border: `1px solid ${BORDER}`,
      }}>
        <div style={{ fontSize: 10, color: TEXT_SUB, marginBottom: 2 }}>現在のプラン</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginBottom: 4 }}>スタンダード</div>
        <div style={{ fontSize: 10, color: TEXT_SUB }}>スカウト残数 247 / 300</div>
        <div style={{
          height: 4, background: "#E8E6E1", borderRadius: 2, marginTop: 6, overflow: "hidden",
        }}>
          <div style={{ width: "82%", height: "100%", background: ACCENT }} />
        </div>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div style={{
      height: 56, background: "#fff", borderBottom: `1px solid ${BORDER}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 13, color: TEXT_SUB }}>株式会社</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>サンプル買取センター</div>
        <Tag color="gray" small>3店舗</Tag>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 16, cursor: "pointer", color: TEXT_SUB }}>🔔</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 15, background: "#534AB7", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700,
          }}>採</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, lineHeight: 1.2 }}>採用 太郎</div>
            <div style={{ fontSize: 10, color: TEXT_SUB, lineHeight: 1.2 }}>本社 / 採用責任者</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// KPI Bar
// ==========================================================================

function KPIBar() {
  const kpis = [
    { label: "スカウト残数", value: "247", unit: "/ 300通", color: ACCENT, sub: "今月分" },
    { label: "新着候補者", value: "38", unit: "人", color: "#2A5BD7", sub: "過去7日" },
    { label: "応諾率", value: "24", unit: "%", color: "#1F8043", sub: "直近30日" },
    { label: "未対応スカウト", value: "12", unit: "件", color: "#C44529", sub: "要対応" },
    { label: "AI面談済", value: "8", unit: "件", color: PURPLE, sub: "未確認 3件" },
  ];
  return (
    <div style={{
      display: "flex", gap: 12, padding: "16px 24px", background: BG, flexShrink: 0,
    }}>
      {kpis.map(k => (
        <div key={k.label} style={{
          flex: 1, background: "#fff", borderRadius: 8, padding: "12px 14px",
          border: `1px solid ${BORDER}`,
        }}>
          <div style={{ fontSize: 11, color: TEXT_SUB, marginBottom: 4 }}>{k.label}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 2 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: k.color, letterSpacing: -0.5 }}>{k.value}</span>
            <span style={{ fontSize: 11, color: TEXT_SUB, fontWeight: 600 }}>{k.unit}</span>
          </div>
          <div style={{ fontSize: 10, color: TEXT_MUTE }}>{k.sub}</div>
        </div>
      ))}
    </div>
  );
}

// ==========================================================================
// Filter Panel
// ==========================================================================

function FilterPanel() {
  const [openBlock, setOpenBlock] = useState({ basic: true, license: true, exp: true, status: true });
  const toggle = (k) => setOpenBlock(o => ({ ...o, [k]: !o[k] }));

  const Section = ({ id, title, children }) => (
    <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "10px 0" }}>
      <div onClick={() => toggle(id)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        cursor: "pointer", marginBottom: openBlock[id] ? 8 : 0,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>{title}</div>
        <span style={{ fontSize: 10, color: TEXT_SUB }}>{openBlock[id] ? "▾" : "▸"}</span>
      </div>
      {openBlock[id] && children}
    </div>
  );

  const Cb = ({ label, count, checked }) => (
    <label style={{
      display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
      padding: "3px 0", fontSize: 11, color: TEXT,
    }}>
      <input type="checkbox" defaultChecked={checked} style={{ accentColor: ACCENT }} />
      <span style={{ flex: 1 }}>{label}</span>
      {count !== undefined && (
        <span style={{ fontSize: 10, color: TEXT_MUTE }}>({count})</span>
      )}
    </label>
  );

  return (
    <div style={{
      width: 220, background: "#fff", borderRight: `1px solid ${BORDER}`,
      padding: "16px 14px", flexShrink: 0, overflowY: "auto",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 8,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>絞り込み</div>
        <span style={{ fontSize: 10, color: ACCENT, cursor: "pointer", fontWeight: 600 }}>クリア</span>
      </div>

      {/* 保存条件 */}
      <div style={{
        background: "#F7F6F3", borderRadius: 6, padding: "8px 10px", marginBottom: 8,
        fontSize: 11, color: TEXT_SUB,
      }}>
        <div style={{ fontWeight: 700, color: TEXT, marginBottom: 4, fontSize: 11 }}>保存済み条件</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <Tag small color="orange">整備士経験</Tag>
          <Tag small color="orange">営業経験者</Tag>
        </div>
      </div>

      <Section id="basic" title="基本">
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: TEXT_SUB, marginBottom: 3 }}>年齢</div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <input style={inputS} placeholder="20" defaultValue="20" />
            <span style={{ fontSize: 10, color: TEXT_SUB }}>〜</span>
            <input style={inputS} placeholder="40" defaultValue="35" />
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: TEXT_SUB, marginBottom: 3 }}>エリア</div>
          <Cb label="東京都" count={12} checked />
          <Cb label="神奈川県" count={6} checked />
          <Cb label="千葉県" count={4} />
          <Cb label="埼玉県" count={3} />
        </div>
        <div>
          <div style={{ fontSize: 10, color: TEXT_SUB, marginBottom: 3 }}>学歴</div>
          <Cb label="大卒以上" count={14} />
          <Cb label="専門・短大卒" count={8} />
          <Cb label="高卒" count={16} />
        </div>
      </Section>

      <Section id="license" title="免許・資格">
        <Cb label="普通免許" count={38} checked />
        <Cb label="自動車整備士2級" count={6} />
        <Cb label="自動車整備士3級" count={4} />
        <Cb label="中型免許" count={9} />
        <Cb label="大型免許" count={2} />
        <Cb label="フォークリフト" count={5} />
      </Section>

      <Section id="exp" title="経験">
        <Cb label="自動車関連業界経験" count={11} checked />
        <Cb label="営業経験" count={18} />
        <Cb label="接客経験" count={22} />
        <Cb label="店長・SV経験" count={7} />
        <Cb label="未経験OK" count={15} />
      </Section>

      <Section id="status" title="状態・反応">
        <Cb label="動画あり" count={26} checked />
        <Cb label="メッセージ受信可" count={32} checked />
        <Cb label="AI面談済み" count={8} />
        <Cb label="未スカウト" count={28} />
      </Section>

      <div style={{ marginTop: 14 }}>
        <Btn variant="primary" full>この条件で検索</Btn>
        <div style={{ height: 6 }} />
        <Btn variant="outline" full small>条件を保存</Btn>
      </div>
    </div>
  );
}

const inputS = {
  flex: 1, height: 26, padding: "0 6px", borderRadius: 4,
  border: `1px solid ${BORDER}`, fontSize: 11, color: TEXT,
  background: "#fff", minWidth: 0,
};

// ==========================================================================
// Toolbar (View toggle, Sort, Search)
// ==========================================================================

function Toolbar({ view, setView, totalCount }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 20px", background: "#fff", borderBottom: `1px solid ${BORDER}`,
      flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>
          求職者一覧
        </div>
        <div style={{ fontSize: 12, color: TEXT_SUB }}>
          {totalCount}件 (絞り込み後)
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* 検索ボックス */}
        <div style={{
          height: 32, width: 220, padding: "0 10px",
          borderRadius: 6, border: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", gap: 6,
          background: "#FAFAF8", fontSize: 12, color: TEXT_MUTE,
        }}>
          <span>🔍</span>
          <span>キーワード検索</span>
        </div>

        {/* ソート */}
        <select style={{
          height: 32, padding: "0 10px", borderRadius: 6,
          border: `1px solid ${BORDER}`, fontSize: 12, color: TEXT,
          background: "#fff", cursor: "pointer",
        }}>
          <option>マッチ度順</option>
          <option>新着順</option>
          <option>応答可能性順</option>
          <option>最終ログイン順</option>
        </select>

        {/* 表示形式トグル */}
        <div style={{
          display: "flex", background: "#F1EFE8", borderRadius: 6, padding: 2,
        }}>
          <div onClick={() => setView("card")} style={{
            padding: "5px 12px", borderRadius: 4, fontSize: 12, fontWeight: 600,
            cursor: "pointer",
            background: view === "card" ? "#fff" : "transparent",
            color: view === "card" ? TEXT : TEXT_SUB,
            boxShadow: view === "card" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
          }}>⊞ カード</div>
          <div onClick={() => setView("list")} style={{
            padding: "5px 12px", borderRadius: 4, fontSize: 12, fontWeight: 600,
            cursor: "pointer",
            background: view === "list" ? "#fff" : "transparent",
            color: view === "list" ? TEXT : TEXT_SUB,
            boxShadow: view === "list" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
          }}>☰ リスト</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// Card View — メインの一覧表示
// ==========================================================================

function CardView({ jobseekers, onOpenDetail, onOpenScout }) {
  return (
    <div style={{
      flex: 1, padding: "16px 20px", background: BG, overflowY: "auto",
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 14,
      }}>
        {jobseekers.map(p => (
          <div key={p.id} style={{
            background: "#fff", borderRadius: 10,
            border: `1px solid ${BORDER}`, overflow: "hidden",
            display: "flex", flexDirection: "column",
            transition: "box-shadow 0.15s, transform 0.15s",
            cursor: "pointer",
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
          onClick={() => onOpenDetail(p)}>
            {/* Photo / video area */}
            <div style={{
              height: 160, background: `linear-gradient(135deg, #FFE5DA 0%, #F0EDFE 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 56, position: "relative",
            }}>
              <span>{p.photo}</span>
              {/* Status badge */}
              <div style={{ position: "absolute", top: 10, left: 10 }}>
                <Tag color={p.statusColor}>{p.statusBadge}</Tag>
              </div>
              {/* Match score */}
              <div style={{
                position: "absolute", top: 10, right: 10,
                background: "rgba(26,26,26,0.85)", color: "#fff",
                borderRadius: 14, padding: "3px 10px",
                fontSize: 11, fontWeight: 700,
              }}>マッチ {p.matchScore}%</div>
              {/* Video badge */}
              {p.hasVideo && (
                <div style={{
                  position: "absolute", bottom: 10, right: 10,
                  background: "rgba(0,0,0,0.7)", color: "#fff",
                  borderRadius: 14, padding: "3px 10px",
                  fontSize: 10, fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  <span style={{ fontSize: 9 }}>▶</span>動画あり
                </div>
              )}
              {p.aiDone && (
                <div style={{
                  position: "absolute", bottom: 10, left: 10,
                  background: PURPLE, color: "#fff",
                  borderRadius: 14, padding: "3px 10px",
                  fontSize: 10, fontWeight: 700,
                }}>AI面談済</div>
              )}
            </div>

            {/* Body */}
            <div style={{ padding: 14, flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>{p.name}</span>
                <span style={{ fontSize: 12, color: TEXT_SUB }}>({p.age})</span>
              </div>
              <div style={{ fontSize: 11, color: TEXT_SUB, marginBottom: 8 }}>
                📍 {p.area} ・ {p.edu}
              </div>

              {/* License tags */}
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
                {p.licenses.slice(0, 3).map(l => (
                  <Tag key={l} small color={l.includes("整備") ? "blue" : "gray"}>{l}</Tag>
                ))}
              </div>

              {/* Q&A teaser */}
              <div style={{
                background: "#F7F6F3", borderRadius: 6, padding: "8px 10px",
                marginBottom: 10, flex: 1,
              }}>
                <div style={{ fontSize: 9, color: TEXT_SUB, fontWeight: 700, marginBottom: 3 }}>
                  Q. {p.qa[0].q}
                </div>
                <div style={{
                  fontSize: 11, color: TEXT, lineHeight: 1.5,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {p.qa[0].a}
                </div>
              </div>

              {/* Footer */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                fontSize: 10, color: TEXT_SUB, marginBottom: 10,
              }}>
                <span>最終ログイン {p.lastLogin}</span>
                {p.msgOK && <span style={{ color: "#1F8043", fontWeight: 600 }}>✓ メッセージ受信可</span>}
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ flex: 1 }} onClick={(e) => { e.stopPropagation(); onOpenScout(p); }}>
                  <Btn variant="primary" full small icon="📨">スカウト</Btn>
                </div>
                <Btn variant="outline" small icon="⭐">保存</Btn>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================================================
// List View — テーブル表示
// ==========================================================================

function ListView({ jobseekers, onOpenDetail, onOpenScout }) {
  return (
    <div style={{ flex: 1, background: BG, overflowY: "auto" }}>
      <div style={{ background: "#fff", margin: "16px 20px", borderRadius: 8, border: `1px solid ${BORDER}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#F7F6F3", borderBottom: `1px solid ${BORDER}` }}>
              {["", "候補者", "年齢", "エリア", "免許・資格", "職歴", "ステータス", "マッチ度", "最終ログイン", "アクション"].map((h, i) => (
                <th key={i} style={{
                  padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 700,
                  color: TEXT_SUB, whiteSpace: "nowrap",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobseekers.map((p, i) => (
              <tr key={p.id} style={{
                borderBottom: i === jobseekers.length - 1 ? "none" : `1px solid ${BORDER}`,
                cursor: "pointer", transition: "background 0.1s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#FAFAF8"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              onClick={() => onOpenDetail(p)}>
                <td style={tdS}>
                  <input type="checkbox" style={{ accentColor: ACCENT }} onClick={e => e.stopPropagation()} />
                </td>
                <td style={tdS}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 18,
                      background: `linear-gradient(135deg, #FFE5DA 0%, #F0EDFE 100%)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, flexShrink: 0,
                    }}>{p.photo}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: TEXT }}>{p.name}</div>
                      <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                        {p.hasVideo && <Tag small color="orange">動画</Tag>}
                        {p.aiDone && <Tag small color="purple">AI済</Tag>}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={tdS}>{p.age}</td>
                <td style={tdS}>{p.area}</td>
                <td style={tdS}>
                  <div style={{ display: "flex", gap: 3, flexWrap: "wrap", maxWidth: 180 }}>
                    {p.licenses.map(l => (
                      <Tag key={l} small color={l.includes("整備") ? "blue" : "gray"}>{l}</Tag>
                    ))}
                  </div>
                </td>
                <td style={{ ...tdS, fontSize: 11, color: TEXT_SUB, maxWidth: 160 }}>
                  {p.exp.join(" / ")}
                </td>
                <td style={tdS}>
                  <Tag color={p.statusColor}>{p.statusBadge}</Tag>
                </td>
                <td style={tdS}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{
                      width: 40, height: 5, background: "#E8E6E1", borderRadius: 2.5,
                      overflow: "hidden",
                    }}>
                      <div style={{
                        width: `${p.matchScore}%`, height: "100%",
                        background: p.matchScore >= 85 ? "#1F8043" : p.matchScore >= 75 ? ACCENT : TEXT_MUTE,
                      }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>{p.matchScore}%</span>
                  </div>
                </td>
                <td style={{ ...tdS, fontSize: 11, color: TEXT_SUB }}>{p.lastLogin}</td>
                <td style={tdS}>
                  <div style={{ display: "flex", gap: 4 }} onClick={e => e.stopPropagation()}>
                    <div onClick={() => onOpenScout(p)}>
                      <Btn variant="primary" small>スカウト</Btn>
                    </div>
                    <Btn variant="outline" small>⭐</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const tdS = { padding: "10px 12px", verticalAlign: "middle" };

// ==========================================================================
// Detail Drawer — 候補者詳細プレビュー (右からスライド)
// ==========================================================================

function DetailDrawer({ person, onClose, onOpenScout }) {
  if (!person) return null;
  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)",
        zIndex: 10, animation: "fadeIn 0.15s",
      }} />
      {/* Drawer */}
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: 480,
        background: "#fff", zIndex: 11,
        boxShadow: "-12px 0 32px rgba(0,0,0,0.12)",
        display: "flex", flexDirection: "column",
        animation: "slideIn 0.2s",
      }}>
        {/* Header */}
        <div style={{
          height: 52, padding: "0 20px", borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>候補者詳細</div>
          <span onClick={onClose} style={{
            cursor: "pointer", fontSize: 18, color: TEXT_SUB, padding: 4,
          }}>✕</span>
        </div>

        {/* Body scrollable */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {/* Top: photo + basics */}
          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <PhotoBlock emoji={person.photo} hasVideo={person.hasVideo} size={120} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: TEXT }}>{person.name}</span>
                <span style={{ fontSize: 14, color: TEXT_SUB }}>({person.age})</span>
              </div>
              <div style={{ fontSize: 12, color: TEXT_SUB, marginBottom: 8 }}>
                📍 {person.area}<br/>
                🎓 {person.edu}
              </div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
                <Tag color={person.statusColor}>{person.statusBadge}</Tag>
                {person.aiDone && <Tag color="purple">AI面談済</Tag>}
                {person.msgOK && <Tag color="green" small>受信可</Tag>}
              </div>
              <div style={{ fontSize: 11, color: TEXT_MUTE }}>
                最終ログイン {person.lastLogin}
              </div>
            </div>
          </div>

          {/* Match score block */}
          <div style={{
            background: "linear-gradient(135deg, #FFF3ED 0%, #FFE5DA 100%)",
            borderRadius: 8, padding: "12px 16px", marginBottom: 16,
            border: `1px solid #FAD4C5`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>求人マッチ度</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: ACCENT, letterSpacing: -0.5 }}>{person.matchScore}%</span>
            </div>
            <div style={{ height: 6, background: "#fff", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${person.matchScore}%`, height: "100%", background: ACCENT }} />
            </div>
            <div style={{ fontSize: 10, color: TEXT_SUB, marginTop: 6 }}>
              「査定スタッフ・店舗営業」求人との適合度
            </div>
          </div>

          {/* AI面談動画 (該当者のみ) */}
          {person.aiDone && (
            <div style={{ marginBottom: 16 }}>
              <SectionTitle>🎥 AI面談動画</SectionTitle>
              <div style={{
                height: 180, background: "#1a1a1a", borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", marginBottom: 8,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 28, background: "rgba(255,255,255,0.9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, color: TEXT, cursor: "pointer",
                }}>▶</div>
                <div style={{
                  position: "absolute", bottom: 10, left: 10, color: "#fff",
                  fontSize: 11, fontWeight: 600,
                }}>5問 / 約3分</div>
              </div>
              <div style={{
                background: "#F0EDFE", borderRadius: 6, padding: "10px 12px",
                fontSize: 11, color: TEXT, lineHeight: 1.6,
              }}>
                <div style={{ fontWeight: 700, color: PURPLE, marginBottom: 4 }}>AI要約</div>
                顧客との対話経験が豊富で、傾聴を重視する姿勢が伝わる。整備士資格を活かした技術的説明にも自信があり、査定スタッフとしての適性が高い。
              </div>
            </div>
          )}

          {/* 経歴 */}
          <div style={{ marginBottom: 16 }}>
            <SectionTitle>💼 職歴</SectionTitle>
            {person.exp.map((e, i) => (
              <div key={i} style={{
                padding: "8px 12px", background: "#F7F6F3", borderRadius: 6,
                marginBottom: 4, fontSize: 12, color: TEXT,
              }}>{e}</div>
            ))}
          </div>

          {/* 資格 */}
          <div style={{ marginBottom: 16 }}>
            <SectionTitle>📜 免許・資格</SectionTitle>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {person.licenses.map(l => (
                <Tag key={l} color={l.includes("整備") ? "blue" : "gray"}>{l}</Tag>
              ))}
            </div>
          </div>

          {/* Q&A */}
          <div style={{ marginBottom: 16 }}>
            <SectionTitle>💬 Q&A 全回答</SectionTitle>
            {person.qa.map((q, i) => (
              <div key={i} style={{
                marginBottom: 10, padding: "10px 12px",
                background: "#FAFAF8", borderRadius: 6,
                border: `1px solid ${BORDER}`,
              }}>
                <div style={{ fontSize: 10, color: ACCENT, fontWeight: 700, marginBottom: 4 }}>
                  Q{i + 1}. {q.q}
                </div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{q.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div style={{
          padding: "12px 20px", borderTop: `1px solid ${BORDER}`, background: "#FAFAF8",
          display: "flex", gap: 8, flexShrink: 0,
        }}>
          <Btn variant="outline" small>⭐ 保存</Btn>
          <Btn variant="ghost" small>👁 非表示</Btn>
          <div style={{ flex: 1 }} />
          <div onClick={() => onOpenScout(person)}>
            <Btn variant="primary" icon="📨">スカウトを送る</Btn>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: 12, fontWeight: 700, color: TEXT, marginBottom: 8,
      paddingBottom: 4, borderBottom: `1px solid ${BORDER}`,
    }}>{children}</div>
  );
}

// ==========================================================================
// Scout Modal — スカウト送信モーダル
// ==========================================================================

function ScoutModal({ person, onClose }) {
  const [tplId, setTplId] = useState("t1");
  const [text, setText] = useState(SCOUT_TEMPLATES[0].text);
  const tpl = SCOUT_TEMPLATES.find(t => t.id === tplId);

  const onPickTpl = (id) => {
    setTplId(id);
    setText(SCOUT_TEMPLATES.find(t => t.id === id).text);
  };

  if (!person) return null;
  return (
    <>
      <div onClick={onClose} style={{
        position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)",
        zIndex: 20,
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", width: 580, maxHeight: "90vh",
        background: "#fff", borderRadius: 12, zIndex: 21,
        boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px", borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>スカウトを送信</div>
            <div style={{ fontSize: 11, color: TEXT_SUB, marginTop: 2 }}>
              送信先: {person.name}さん ({person.age}) ・ {person.area}
            </div>
          </div>
          <span onClick={onClose} style={{
            cursor: "pointer", fontSize: 18, color: TEXT_SUB, padding: 4,
          }}>✕</span>
        </div>

        {/* Body */}
        <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
          {/* Job select */}
          <div style={{ marginBottom: 14 }}>
            <Label>紐づける求人</Label>
            <select style={{
              width: "100%", height: 36, padding: "0 10px",
              borderRadius: 6, border: `1px solid ${BORDER}`,
              fontSize: 13, color: TEXT, background: "#fff",
            }}>
              <option>査定スタッフ・店舗営業 (本社) — 月給28万〜</option>
              <option>査定スタッフ (千葉店) — 月給26万〜</option>
              <option>整備スタッフ (本社) — 月給25万〜</option>
            </select>
          </div>

          {/* Template chips */}
          <div style={{ marginBottom: 14 }}>
            <Label>テンプレート</Label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {SCOUT_TEMPLATES.map(t => (
                <div key={t.id} onClick={() => onPickTpl(t.id)} style={{
                  padding: "6px 12px", borderRadius: 16,
                  fontSize: 11, fontWeight: 600, cursor: "pointer",
                  background: tplId === t.id ? ACCENT : "#fff",
                  color: tplId === t.id ? "#fff" : TEXT_SUB,
                  border: `1px solid ${tplId === t.id ? ACCENT : BORDER}`,
                }}>{t.name}</div>
              ))}
            </div>
          </div>

          {/* Message body */}
          <div style={{ marginBottom: 14 }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 4,
            }}>
              <Label>メッセージ本文</Label>
              <span style={{ fontSize: 10, color: TEXT_MUTE }}>
                {text.length} / 150 文字
              </span>
            </div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              style={{
                width: "100%", height: 140, padding: 12, borderRadius: 6,
                border: `1px solid ${BORDER}`, fontSize: 13, color: TEXT,
                fontFamily: "inherit", lineHeight: 1.6, resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Settings */}
          <div style={{
            background: "#F7F6F3", borderRadius: 6, padding: "10px 12px",
            fontSize: 11, color: TEXT_SUB,
          }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", marginBottom: 4 }}>
              <input type="checkbox" defaultChecked style={{ accentColor: ACCENT }} />
              <span>このテンプレートを保存して再利用する</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <input type="checkbox" style={{ accentColor: ACCENT }} />
              <span>類似候補者にも自動でスカウト送信する (ベータ)</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 20px", borderTop: `1px solid ${BORDER}`, background: "#FAFAF8",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontSize: 11, color: TEXT_SUB }}>
            送信後は<strong style={{ color: TEXT }}>残数 246通</strong>になります
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="ghost" small>下書き保存</Btn>
            <Btn variant="outline" small>キャンセル</Btn>
            <Btn variant="primary" icon="📨">スカウト送信</Btn>
          </div>
        </div>
      </div>
    </>
  );
}

function Label({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, marginBottom: 6 }}>
      {children}
    </div>
  );
}

// ==========================================================================
// Main App
// ==========================================================================

export default function CLScout() {
  const [view, setView] = useState("card"); // "card" | "list"
  const [detailPerson, setDetailPerson] = useState(null);
  const [scoutPerson, setScoutPerson] = useState(null);

  const openDetail = (p) => setDetailPerson(p);
  const closeDetail = () => setDetailPerson(null);
  const openScout = (p) => { setScoutPerson(p); setDetailPerson(null); };
  const closeScout = () => setScoutPerson(null);

  return (
    <div style={{
      minHeight: "100vh", background: BG,
      fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
      color: TEXT,
    }}>
      {/* Banner */}
      <div style={{
        background: "#1a1a1a", color: "#fff",
        padding: "8px 24px", fontSize: 11, display: "flex",
        alignItems: "center", gap: 12,
      }}>
        <span style={{
          background: ACCENT, padding: "2px 8px", borderRadius: 3,
          fontWeight: 700, fontSize: 10,
        }}>F/S MOCK</span>
        <span style={{ opacity: 0.85 }}>
          車買取事業者向け CSヒアリング用 / 求職者一覧 + 詳細プレビュー + スカウト送信モーダル
        </span>
        <div style={{ flex: 1 }} />
        <span style={{ opacity: 0.6, fontSize: 10 }}>
          v0.1 — 2026.05
        </span>
      </div>

      {/* Browser frame */}
      <div style={{
        margin: 16, borderRadius: 10, overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)", background: "#fff",
        border: `1px solid ${BORDER}`,
      }}>
        {/* Browser top bar */}
        <div style={{
          height: 34, background: "#E8E6E1", borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", padding: "0 14px", gap: 8,
        }}>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#FF5F57" }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#FEBC2E" }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#28C840" }} />
          </div>
          <div style={{
            flex: 1, height: 22, background: "#fff", borderRadius: 4,
            display: "flex", alignItems: "center", padding: "0 10px",
            fontSize: 11, color: TEXT_SUB, marginLeft: 8,
          }}>
            🔒 cl.mota.inc/scout/search
          </div>
        </div>

        {/* Main app area */}
        <div style={{ display: "flex", height: "calc(100vh - 110px)", minHeight: 700, position: "relative" }}>
          <SideNav active="scout" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <TopBar />
            <KPIBar />
            <Toolbar view={view} setView={setView} totalCount={JOBSEEKERS.length} />
            <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
              <FilterPanel />
              {view === "card"
                ? <CardView jobseekers={JOBSEEKERS} onOpenDetail={openDetail} onOpenScout={openScout} />
                : <ListView jobseekers={JOBSEEKERS} onOpenDetail={openDetail} onOpenScout={openScout} />
              }
            </div>
          </div>

          {/* Overlays */}
          {detailPerson && (
            <DetailDrawer person={detailPerson} onClose={closeDetail} onOpenScout={openScout} />
          )}
          {scoutPerson && (
            <ScoutModal person={scoutPerson} onClose={closeScout} />
          )}
        </div>
      </div>
    </div>
  );
}
