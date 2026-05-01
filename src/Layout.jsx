import { NavLink, Outlet, useLocation } from "react-router-dom";

const ACCENT = "#E8593C";
const NAVY = "#1F3554";
const BG = "#F0EFEB";
const BORDER = "#E8E6E1";
const TEXT = "#1a1a1a";
const TEXT_SUB = "#5F5E5A";

const MOCKS = [
  { path: "/",          label: "TOP / LP",        sub: "ランディングページ" },
  { path: "/cs-flow",   label: "CS画面フロー",      sub: "16画面フロー版" },
  { path: "/jobseeker", label: "求職者スワイプ",     sub: "Hot Pepper Beauty Work型" },
  { path: "/cl",        label: "CL求職者一覧",       sub: "車買取事業者向け" },
];

export default function Layout() {
  const loc = useLocation();
  return (
    <div style={{ minHeight: "100vh", background: BG }}>
      {/* Top utility bar */}
      <div
        style={{
          background: "#1a1a1a",
          color: "#fff",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: ACCENT,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            M
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.1 }}>
              MOTA Work
            </div>
            <div
              style={{
                fontSize: 9,
                opacity: 0.65,
                lineHeight: 1.1,
                marginTop: 2,
              }}
            >
              F/S Mock Collection
            </div>
          </div>
        </div>

        <div
          style={{
            display: "inline-block",
            padding: "3px 10px",
            background: ACCENT,
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

        <div style={{ fontSize: 10, opacity: 0.55 }}>v0.1 / 2026.05</div>
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
                background: active ? NAVY : "#fff",
                border: `1px solid ${active ? NAVY : BORDER}`,
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
                  opacity: active ? 0.8 : 0.6,
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
