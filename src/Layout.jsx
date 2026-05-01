import { NavLink, Outlet, useLocation } from "react-router-dom";
import logoUrl from "./assets/tapme-logo.png";

const PRIMARY = "#3FB6E8";       // TAPME Bright Blue
const PRIMARY_DARK = "#059CDB";  // TAPME Bright Blue #2
const NAVY = "#0A2540";
const BG = "#F4FAFE";
const BORDER = "#DDE9F0";
const TEXT_SUB = "#5A6B7C";

const MOCKS = [
  { path: "/",                   label: "TOP / LP",         sub: "ランディングページ" },
  { path: "/register",           label: "登録 STEP1",         sub: "基本情報" },
  { path: "/register-step2",     label: "登録 STEP2",         sub: "3問Q&A" },
  { path: "/register-step3",     label: "登録 STEP3",         sub: "顔写真" },
  { path: "/register-step4",     label: "登録 STEP4",         sub: "確認画面" },
  { path: "/register-complete",  label: "登録完了",            sub: "ウェルカム" },
  { path: "/scout-list",         label: "D-1 スカウト一覧",     sub: "ログイン後・タブ切替" },
  { path: "/scout-detail",       label: "D-2 スカウト詳細",     sub: "メッセージ・追従ボタン" },
  { path: "/applied-complete",   label: "D-3 応募完了",        sub: "応募後の案内画面" },
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
          padding: "10px 20px",
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          overflowX: "auto",
        }}
      >
        {MOCKS.map((m) => {
          const active = loc.pathname === m.path;
          return (
            <NavLink
              key={m.path}
              to={m.path}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: active ? 700 : 500,
                color: active ? "#fff" : TEXT_SUB,
                background: active ? PRIMARY_DARK : "#fff",
                border: `1px solid ${active ? PRIMARY_DARK : BORDER}`,
                whiteSpace: "nowrap",
                lineHeight: 1.3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>{m.label}</span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 500,
                  opacity: active ? 0.85 : 0.6,
                  marginTop: 1,
                }}
              >
                {m.sub}
              </span>
            </NavLink>
          );
        })}
      </div>

      {/* Mock area */}
      <Outlet />
    </div>
  );
}
