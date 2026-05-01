import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";
import { JOBS, SORT_OPTIONS, getAreaOptions } from "../jobsData";

const PRIMARY = "#3FB6E8";
const PRIMARY_DARK = "#059CDB";
const ACCENT_YELLOW = "#F7CF29";
const CTA = "#E8593C";
const SUCCESS = "#22C39A";
const NAVY = "#0A2540";
const BG = "#F4FAFE";
const BG_INPUT = "#FAFCFE";
const BORDER = "#DDE9F0";
const TEXT = "#0A2540";
const TEXT_SUB = "#5A6B7C";
const TEXT_MUTE = "#A0AEC0";

// ==========================================================================
// Phone
// ==========================================================================

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

// ==========================================================================
// 求人カード
// ==========================================================================
function JobCard({ job, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: "#fff", borderRadius: 14,
      marginBottom: 10,
      border: `1px solid ${BORDER}`,
      cursor: "pointer",
      transition: "transform 0.12s, box-shadow 0.12s",
      overflow: "hidden",
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(10,37,64,0.1)"}
    onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
      <div style={{ padding: "14px 14px 12px", display: "flex", gap: 12 }}>
        {/* サムネ画像 (絵文字でダミー) */}
        <div style={{
          width: 56, height: 56, borderRadius: 10,
          background: job.iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 30, flexShrink: 0,
          border: `1px solid ${BORDER}`,
        }}>
          {job.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* 職種（青リンク色・大） */}
          <div style={{
            fontSize: 14, fontWeight: 800,
            color: PRIMARY_DARK, marginBottom: 2,
            textDecoration: "underline",
            textDecorationColor: PRIMARY_DARK + "55",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            lineHeight: 1.3,
          }}>
            {job.jobTitle}
          </div>
          {/* 会社名・場所（グレー・小） */}
          <div style={{
            fontSize: 11, color: TEXT_SUB, fontWeight: 600,
            marginBottom: 8, lineHeight: 1.4,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {job.company}・{job.location}
          </div>

          {/* 年収・休日 */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <div style={{
              fontSize: 11, fontWeight: 800,
              padding: "3px 10px", borderRadius: 4,
              background: "#FFF3F0", color: CTA,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <span style={{
                fontSize: 9, padding: "0 4px",
                background: CTA, color: "#fff", borderRadius: 2,
              }}>年収</span>
              {job.salaryMin}〜{job.salaryMax}万
            </div>
            <div style={{
              fontSize: 11, fontWeight: 800,
              padding: "3px 10px", borderRadius: 4,
              background: "#E8F6FD", color: PRIMARY_DARK,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <span style={{
                fontSize: 9, padding: "0 4px",
                background: PRIMARY_DARK, color: "#fff", borderRadius: 2,
              }}>休日</span>
              {job.holidays}日
            </div>
          </div>

          {/* タグ群 */}
          {job.tags && job.tags.length > 0 && (
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
              {job.tags.slice(0, 3).map(tag => (
                <span key={tag} style={{
                  fontSize: 9, fontWeight: 700,
                  padding: "2px 7px", borderRadius: 8,
                  background: "#F4FAFE", color: TEXT_SUB,
                  border: `1px solid ${BORDER}`,
                }}>
                  # {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// ボトムシート (汎用)
// ==========================================================================
function BottomSheet({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <>
      {/* オーバーレイ */}
      <div onClick={onClose} style={{
        position: "absolute", inset: 0,
        background: "rgba(10,37,64,0.5)", zIndex: 100,
      }} />
      {/* シート */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "#fff", borderRadius: "16px 16px 0 0",
        zIndex: 101, paddingBottom: 8,
        boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
      }}>
        {/* ハンドル */}
        <div style={{
          width: 36, height: 4, borderRadius: 2,
          background: "#D3D9DD", margin: "8px auto 12px",
        }} />
        {/* ヘッダー */}
        <div style={{
          padding: "0 16px 12px",
          borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span onClick={onClose} style={{ fontSize: 13, color: TEXT_SUB, cursor: "pointer" }}>
            キャンセル
          </span>
          <span style={{ fontSize: 14, fontWeight: 800, color: TEXT }}>{title}</span>
          <span style={{ width: 50 }} />
        </div>
        <div style={{ maxHeight: 360, overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </>
  );
}

function SheetItem({ label, sub, active, onClick, icon }) {
  return (
    <div onClick={onClick} style={{
      padding: "12px 18px",
      display: "flex", alignItems: "center", gap: 10,
      background: active ? "#E8F6FD" : "#fff",
      borderLeft: active ? `3px solid ${PRIMARY}` : "3px solid transparent",
      cursor: "pointer",
      borderBottom: `1px solid ${BORDER}`,
    }}>
      {icon && <span style={{ fontSize: 16 }}>{icon}</span>}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 13, fontWeight: active ? 800 : 600,
          color: active ? PRIMARY_DARK : TEXT,
        }}>{label}</div>
        {sub && (
          <div style={{ fontSize: 10, color: TEXT_SUB, marginTop: 2 }}>{sub}</div>
        )}
      </div>
      {active && <span style={{ color: PRIMARY_DARK, fontSize: 14, fontWeight: 900 }}>✓</span>}
    </div>
  );
}

// ==========================================================================
// 下部ナビ
// ==========================================================================
function BottomNav({ activeTab = "search" }) {
  const items = [
    { id: "search", icon: "🔍", label: "求人検索" },
    { id: "scout", icon: "📩", label: "スカウト" },
    { id: "applied", icon: "📝", label: "応募" },
    { id: "mypage", icon: "👤", label: "マイページ" },
  ];
  return (
    <div style={{
      borderTop: `1px solid ${BORDER}`,
      background: "#fff", padding: "6px 0 4px",
      display: "flex", justifyContent: "space-around",
      flexShrink: 0,
    }}>
      {items.map(it => {
        const active = it.id === activeTab;
        return (
          <div key={it.id} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            cursor: "pointer", padding: "4px 8px",
          }}>
            <span style={{ fontSize: 18, opacity: active ? 1 : 0.5 }}>{it.icon}</span>
            <span style={{
              fontSize: 9, fontWeight: 700,
              color: active ? PRIMARY_DARK : TEXT_MUTE,
              marginTop: 2,
            }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ==========================================================================
// MAIN
// ==========================================================================

export default function JobList() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [sortId, setSortId] = useState("salary_desc");
  const [areaFilter, setAreaFilter] = useState("すべてのエリア");
  const [sortOpen, setSortOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [keywordFocused, setKeywordFocused] = useState(false);

  const areaOptions = useMemo(() => getAreaOptions(), []);
  const currentSort = SORT_OPTIONS.find(o => o.id === sortId);

  // フィルタ + ソート
  const filtered = useMemo(() => {
    let result = [...JOBS];

    // キーワード検索
    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      result = result.filter(j =>
        j.jobTitle.toLowerCase().includes(kw) ||
        j.company.toLowerCase().includes(kw) ||
        j.industry.toLowerCase().includes(kw) ||
        j.location.toLowerCase().includes(kw)
      );
    }

    // エリア絞り込み
    if (areaFilter !== "すべてのエリア") {
      result = result.filter(j => j.area === areaFilter);
    }

    // 並び替え
    switch (sortId) {
      case "salary_desc":   result.sort((a, b) => b.salaryMax - a.salaryMax); break;
      case "salary_asc":    result.sort((a, b) => a.salaryMin - b.salaryMin); break;
      case "holidays_desc": result.sort((a, b) => b.holidays - a.holidays); break;
      case "holidays_asc":  result.sort((a, b) => a.holidays - b.holidays); break;
    }

    return result;
  }, [keyword, sortId, areaFilter]);

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
          }}>F/S MOCK — E-1 求人一覧</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            ログイン後 / 求人検索タブ<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※並び替え・エリア絞り込み・キーワード検索
            </span>
          </div>
        </div>

        <Phone>
          {/* ヘッダー */}
          <div style={{
            height: 56, background: "#fff", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 16px", flexShrink: 0,
          }}>
            <img
              src={logoUrl}
              alt="タップミー / TAPME"
              onClick={() => navigate("/")}
              style={{ height: 40, objectFit: "contain", cursor: "pointer" }}
            />
            <span style={{ fontSize: 18, color: TEXT_SUB, cursor: "pointer" }}>☰</span>
          </div>

          {/* タイトル */}
          <div style={{
            padding: "10px 16px 8px", background: "#fff",
            borderBottom: `1px solid ${BORDER}`, flexShrink: 0,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: NAVY }}>
              求人一覧
            </div>
          </div>

          {/* スクロール領域 */}
          <div style={{ flex: 1, overflowY: "auto", background: BG, position: "relative" }}>
            {/* 検索バー */}
            <div style={{ padding: "12px 12px 8px", background: BG }}>
              <div style={{
                position: "relative",
                background: "#fff",
                borderRadius: 22,
                border: `1.5px solid ${keywordFocused ? PRIMARY : BORDER}`,
                boxShadow: keywordFocused ? `0 0 0 3px rgba(63,182,232,0.12)` : "none",
                transition: "all 0.15s",
              }}>
                <span style={{
                  position: "absolute", left: 14, top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 14, color: TEXT_MUTE,
                }}>🔍</span>
                <input
                  type="text"
                  placeholder="職種・エリア・キーワードで検索"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  onFocus={() => setKeywordFocused(true)}
                  onBlur={() => setKeywordFocused(false)}
                  style={{
                    width: "100%", height: 40,
                    padding: "0 14px 0 38px",
                    border: "none", borderRadius: 22,
                    background: "transparent",
                    fontSize: 13, color: TEXT,
                    outline: "none", fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {/* 並び替え + エリア絞り込み */}
            <div style={{
              display: "flex", gap: 8, padding: "0 12px 12px",
            }}>
              <button onClick={() => setSortOpen(true)} style={{
                flex: 1, height: 36,
                background: "#fff", color: TEXT,
                border: `1.5px solid ${BORDER}`, borderRadius: 18,
                fontSize: 11, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                fontFamily: "inherit",
              }}>
                <span>↕</span>
                <span style={{ color: PRIMARY_DARK }}>{currentSort.label}</span>
              </button>
              <button onClick={() => setAreaOpen(true)} style={{
                flex: 1, height: 36,
                background: areaFilter !== "すべてのエリア" ? "#E8F6FD" : "#fff",
                color: TEXT,
                border: `1.5px solid ${areaFilter !== "すべてのエリア" ? PRIMARY : BORDER}`,
                borderRadius: 18,
                fontSize: 11, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                fontFamily: "inherit",
              }}>
                <span>📍</span>
                <span style={{
                  color: areaFilter !== "すべてのエリア" ? PRIMARY_DARK : TEXT,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  maxWidth: 120,
                }}>
                  {areaFilter}
                </span>
              </button>
            </div>

            {/* 件数 */}
            <div style={{
              padding: "4px 16px 8px",
              fontSize: 12, fontWeight: 700, color: TEXT_SUB,
            }}>
              {filtered.length}件の求人
            </div>

            {/* 求人リスト */}
            <div style={{ padding: "0 12px 16px" }}>
              {filtered.length === 0 ? (
                <div style={{
                  textAlign: "center", padding: "60px 20px",
                  color: TEXT_MUTE, fontSize: 12,
                }}>
                  該当する求人はありません<br/>
                  検索条件を変更してみてください
                </div>
              ) : (
                filtered.map(j => (
                  <JobCard key={j.id} job={j}
                    onClick={() => navigate(`/job-detail/${j.id}`)} />
                ))
              )}
            </div>

            {/* ボトムシート: 並び替え */}
            <BottomSheet
              open={sortOpen}
              title="並び替え"
              onClose={() => setSortOpen(false)}>
              {SORT_OPTIONS.map(o => (
                <SheetItem
                  key={o.id}
                  icon={o.icon}
                  label={o.label}
                  active={sortId === o.id}
                  onClick={() => { setSortId(o.id); setSortOpen(false); }}
                />
              ))}
            </BottomSheet>

            {/* ボトムシート: エリア絞り込み */}
            <BottomSheet
              open={areaOpen}
              title="エリアで絞り込む"
              onClose={() => setAreaOpen(false)}>
              {areaOptions.map(a => (
                <SheetItem
                  key={a}
                  icon={a === "すべてのエリア" ? "🌐" : "📍"}
                  label={a}
                  active={areaFilter === a}
                  onClick={() => { setAreaFilter(a); setAreaOpen(false); }}
                />
              ))}
            </BottomSheet>
          </div>

          <BottomNav activeTab="search" />
        </Phone>
      </div>
    </div>
  );
}
