import { NavLink, Outlet, useLocation } from "react-router-dom";
import logoUrl from "./assets/tapme-logo.png";

const PRIMARY = "#3FB6E8";       // TAPME Bright Blue
const PRIMARY_DARK = "#059CDB";  // TAPME Bright Blue #2
const NAVY = "#0A2540";
const BG = "#F4FAFE";
const BORDER = "#DDE9F0";
const TEXT_SUB = "#5A6B7C";

const MOCKS = [
  { path: "/",                   label: "A. TOP / LP",          sub: "CSホーム（未登録閲覧可）" },
  { path: "/register",           label: "B-1 登録 STEP1",        sub: "基本情報" },
  { path: "/register-step2",     label: "B-2 登録 STEP2",        sub: "3問Q&A" },
  { path: "/register-step3",     label: "B-3 登録 STEP3",        sub: "顔写真" },
  { path: "/register-step4",     label: "B-4 登録 STEP4",        sub: "確認画面" },
  { path: "/register-complete",  label: "B-5 登録完了",           sub: "ウェルカム" },
  { path: "/login-required",     label: "C-1 ログイン要求",        sub: "未登録ユーザー向け" },
  { path: "/mypage",             label: "C-2 マイページ",          sub: "プロフィール・設定" },
  { path: "/profile-edit",       label: "C-3 プロフィール編集",    sub: "アコーディオンで編集" },
  { path: "/terms",              label: "C-4 利用規約",           sub: "規約全文" },
  { path: "/withdraw",           label: "C-5 退会確認",           sub: "退会前の最終確認" },
  { path: "/scout-list",         label: "D-1 スカウト一覧",       sub: "ログイン後・タブ切替" },
  { path: "/scout-detail",       label: "D-2 スカウト詳細",       sub: "メッセージ・追従ボタン" },
  { path: "/applied-complete",   label: "D-3 応募完了",          sub: "応募後の案内画面" },
  { path: "/applied-list",       label: "D-4 応募一覧",          sub: "応募タブ" },
  { path: "/job-list",           label: "E-1 求人一覧",          sub: "検索・並び替え・絞り込み" },
  { path: "/job-detail",         label: "E-2 求人詳細",          sub: "PRポイント・社員の声" },
];

export default function Layout() {
  const loc = useLocation();
  return (
    <div style={{ minHeight: "100vh", background: BG }}>
      {/* Top utility bar */}
      <div
        style={{
          background: NAVY,
          color: "#fff",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <img
          src={logoUrl}
          alt="タップミー / TAPME"
          style={{
            height: 26,
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
            opacity: 0.95,
          }}
        />

        <div
          style={{
            display: "inline-block",
            padding: "3px 10px",
            background: PRIMARY,
            color: "#fff",
            borderRadius: 4,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          F/S MOCK
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ fontSize: 10, opacity: 0.55 }}>v0.2 / 2026.05</div>
      </div>

      {/* Mock switcher tabs */}
      <div
        style={{
          background: "#fff",
          borderBottom: `1px solid ${BORDER}`,
          padding: "8px 16px",
          display: "flex",
          gap: 6,
          overflowX: "auto",
          scrollbarWidth: "thin",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {MOCKS.map((m) => {
          const active = loc.pathname === m.path;
          return (
            <NavLink
              key={m.path}
              to={m.path}
              title={m.sub}
              style={{
                padding: "6px 12px",
                borderRadius: 14,
                fontSize: 11,
                fontWeight: active ? 700 : 600,
                color: active ? "#fff" : TEXT_SUB,
                background: active ? PRIMARY_DARK : "#fff",
                border: `1px solid ${active ? PRIMARY_DARK : BORDER}`,
                whiteSpace: "nowrap",
                lineHeight: 1.4,
                flexShrink: 0,
                textDecoration: "none",
              }}
            >
              {m.label}
            </NavLink>
          );
        })}
      </div>

      {/* Mock area */}
      <Outlet />
    </div>
  );
}
