// ==========================================================================
// Job 求人ダミーデータ
// 一覧画面用。スカウトと同じ6社 + 車買取系を3社追加して計9件。
// ==========================================================================

import { SCOUTS } from "./scoutData";

// scoutData をベースに、求人一覧用に必要な project_holidays などを揃える
const SCOUT_DERIVED = SCOUTS.map(s => ({
  id: s.id,
  company: s.company,
  industry: s.industry,
  jobTitle: s.jobTitle,
  location: s.location,
  // 検索/絞り込みのためのエリア（市区町村レベル）
  area: extractArea(s.location),
  salaryMin: s.salaryMin,
  salaryMax: s.salaryMax,
  monthlySalary: extractMonthly(s.perks?.monthly) || Math.floor(s.salaryMin / 12),
  holidays: s.holidays,
  icon: s.icon,
  iconBg: s.iconBg,
  iconColor: s.iconColor,
  tags: s.tags,
  prPoints: s.prPoints,
}));

// 追加の車買取系3社
const EXTRA_JOBS = [
  {
    id: "job_a01",
    company: "サンプル買取センター",
    industry: "車買取",
    jobTitle: "査定スタッフ",
    location: "千葉県市川市",
    area: "千葉県市川市",
    salaryMin: 336,
    salaryMax: 480,
    monthlySalary: 28,
    holidays: 110,
    icon: "🚗",
    iconBg: "#E0F2F8",
    iconColor: "#1D7AAB",
    tags: ["未経験歓迎", "車好き歓迎"],
    prPoints: [
      "未経験OK・研修あり",
      "車好きにはたまらない環境",
      "頑張った分だけ給与に反映",
    ],
  },
  {
    id: "job_a02",
    company: "ABC自動車販売",
    industry: "自動車販売",
    jobTitle: "店舗営業",
    location: "東京都江戸川区",
    area: "東京都江戸川区",
    salaryMin: 312,
    salaryMax: 420,
    monthlySalary: 26,
    holidays: 105,
    icon: "🚙",
    iconBg: "#FEF3D6",
    iconColor: "#B5832A",
    tags: ["インセンティブ", "週休2日"],
    prPoints: [
      "業績連動インセンティブで高収入",
      "週休2日でしっかり休める",
      "車を扱うやりがいのある仕事",
    ],
  },
  {
    id: "job_a03",
    company: "MOTA整備工場",
    industry: "自動車整備",
    jobTitle: "整備スタッフ",
    location: "神奈川県横浜市",
    area: "神奈川県横浜市",
    salaryMin: 300,
    salaryMax: 420,
    monthlySalary: 25,
    holidays: 115,
    icon: "🔧",
    iconBg: "#E8F4D9",
    iconColor: "#5A8B2D",
    tags: ["資格手当", "正社員"],
    prPoints: [
      "整備士資格手当で給与UP",
      "経験者優遇・スキルを活かせる",
      "正社員登用で安定して働ける",
    ],
  },
];

export const JOBS = [...SCOUT_DERIVED, ...EXTRA_JOBS];

// ==========================================================================
// ヘルパー
// ==========================================================================

function extractArea(loc) {
  // 「東京都港区赤坂」→「東京都港区」だけ取り出す（市区町村絞り込み用）
  if (!loc) return "";
  const m = loc.match(/(.+?[都道府県])(.+?[市区町村郡])/);
  if (m) return m[1] + m[2];
  return loc;
}

function extractMonthly(monthlyStr) {
  // "月給30万、時給2,125円" のような文字列から30を取り出す
  if (!monthlyStr) return null;
  const m = monthlyStr.match(/月給\s*(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

// ==========================================================================
// 並び替えオプション
// ==========================================================================
export const SORT_OPTIONS = [
  { id: "salary_desc",  label: "年収が高い順", icon: "💰" },
  { id: "salary_asc",   label: "年収が低い順", icon: "💴" },
  { id: "holidays_desc",label: "休日が多い順", icon: "📅" },
  { id: "holidays_asc", label: "休日が少ない順", icon: "📆" },
];

// ==========================================================================
// エリアオプション (絞り込み用)
// ==========================================================================
export function getAreaOptions() {
  const areas = new Set();
  JOBS.forEach(j => {
    if (j.area) areas.add(j.area);
  });
  return ["すべてのエリア", ...Array.from(areas).sort()];
}
