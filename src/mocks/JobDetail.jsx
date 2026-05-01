import { useNavigate, useParams } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";
import { SCOUTS } from "../scoutData";

const PRIMARY = "#3FB6E8";
const PRIMARY_DARK = "#059CDB";
const ACCENT_YELLOW = "#F7CF29";
const CTA = "#E8593C";
const SUCCESS = "#22C39A";
const NAVY = "#0A2540";
const BG = "#F4FAFE";
const BORDER = "#DDE9F0";
const TEXT = "#0A2540";
const TEXT_SUB = "#5A6B7C";
const TEXT_MUTE = "#A0AEC0";

// ==========================================================================
// HERP MOTA求人内容（共通利用）
// ==========================================================================
const JOB_OVERVIEW = `MOTAは「世界中にもっとフェアトレードを」をミッションに、人生の選択をより公正で公平な機会に変革するプロダクトを提供しております。

現在、業界最大規模の車買取サービスMOTA車買取に加え、不動産サービスの提供を24年12月にローンチ、今後は人材サービス検討も行っていく予定です。

直近3年の売上成長がCAGR205%を超え、事業は急拡大フェーズとなっており、2030年に1000億円規模を作るべく、この第2創業期に中心となって働くメンバーを全領域で募集しています。

本ポジションでは、自社プラットフォームの戦略策定と推進を担い、事業の中核を担う役割をお任せします。`;

const JOB_TASKS = [
  "当社の集客基盤（月間700万人）を活用した新規ビジネスモデル構築、サービスの企画開発、機能ローンチとそれに伴う販売戦略立案等",
  "事業戦略とプロダクト戦略の両方を描き、売上・利益の最大化を推進",
  "市場・社内・顧客ニーズの分析、およびサービス拡充戦略の立案・協業パートナーとの交渉",
  "企画・カスタマーサポートを含む組織マネジメント",
  "事業部・社内・関連会社との会議運営",
  "システム/デザインチーム・マーケティングチームと連携したWebサービス開発",
  "プロジェクトマネジメント",
];

const REQUIRED_SKILLS = [
  "5名以上のチームマネジメント経験（5年以上）",
  "加えて以下いずれかのご経験をお持ちの方",
  "・インターネットサービスまたはアプリの企画・開発経験（3年以上）",
  "・SIerまたはコンサルティングファームでの業務経験",
  "・プロダクト戦略の策定・推進経験（要件定義・ディレクション・プロジェクト推進を含む）",
];

const WELCOME_SKILLS = [
  "事業に対する当事者意識",
  "プロダクトを通した事業目標の達成貢献（見立てる力、仕立てる力、動かす力）",
  "市場、市況の変化に敏感となり実行できる方",
  "モビリティ業界のプロジェクト参画経験",
  "事業会社でのサービス企画経験",
  "マーケティング・プロモーション実務経験",
  "ディレクターやPdMに類する職種の実務経験",
  "UI/UX設計経験",
];

const PERSON_PROFILE = [
  "個人、チームの組織成長に前向きに取り組める方",
  "数字とビジネスと人をバランスよく見られる方",
  "ビジネス側と開発側の要件を理解し最適な案を妥協せず実現させていく方",
];

const APPLICATION_INFO = [
  { label: "給与", value: "年収 9,054,467円〜15,013,773円（経験、スキル、職務に応じて決定）\n月額固定給与 644,905円〜1,069,357円\n内訳：基本給523,682円〜868,350円 + 固定残業代（30時間/月）121,223円〜201,007円\n・賞与：年2回（2月・8月）\n・昇給：年2回（2月・8月）" },
  { label: "勤務地", value: "MOTA本社 東京都港区赤坂2丁目4-6 赤坂グリーンクロス22F" },
  { label: "雇用形態", value: "正社員" },
  { label: "勤務体系", value: "勤務時間 10:00〜19:00\nフレックスタイム制度あり（コアタイム11:00-16:00）\n休日・休暇：年間122日（2024年実績）、完全週休2日制（土・日・祝日）、年末年始、有給休暇、アニバーサリー休暇、リフレッシュ休暇 等" },
  { label: "試用期間", value: "あり（3ヶ月）" },
  { label: "福利厚生", value: "社会保険完備、定期健康診断、交通費支給（最大4万円/月）、PC支給（Mac/Windows選択可）、リモートワーク制度、フリードリンク、表彰制度、オンライン研修ツール、育児時短制度 等" },
];

const COMPANY_INFO = [
  { label: "企業名", value: "株式会社MOTA" },
  { label: "設立年月", value: "1999年06月" },
  { label: "本社所在地", value: "東京都港区赤坂2丁目4番6号 赤坂グリーンクロス22階" },
  { label: "事業内容", value: "自動車DX事業 / 不動産DX事業" },
  { label: "資本金", value: "141百万円（2026年3月時点）" },
  { label: "従業員数", value: "160名" },
];

// ==========================================================================
// Components
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

function PhotoTile({ emoji, idx }) {
  const colors = ["#E0F2F8", "#FEF3D6", "#E8F4D9", "#FDE6F0", "#F0E8FA", "#FFE4DC"];
  return (
    <div style={{
      width: 160, height: 110, borderRadius: 10,
      background: colors[idx % colors.length],
      flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 60,
      boxShadow: "0 2px 8px rgba(10,37,64,0.06)",
      border: `1px solid ${BORDER}`,
    }}>
      {emoji}
    </div>
  );
}

function PerkRow({ label, value, sub, highlight }) {
  return (
    <div style={{
      display: "flex", padding: "10px 0",
      borderBottom: `1px solid ${BORDER}`,
      gap: 10, alignItems: "flex-start",
    }}>
      <div style={{
        width: 56, fontSize: 11, fontWeight: 800,
        color: "#fff", background: highlight ? CTA : PRIMARY_DARK,
        padding: "4px 0", borderRadius: 4, textAlign: "center",
        flexShrink: 0,
      }}>
        {label}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 14, fontWeight: 800,
          color: TEXT, lineHeight: 1.4, whiteSpace: "pre-wrap",
        }}>
          {value}
        </div>
        {sub && (
          <div style={{
            fontSize: 11, color: TEXT_SUB, marginTop: 2,
            fontWeight: 600, lineHeight: 1.5, whiteSpace: "pre-wrap",
          }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ icon, children }) {
  return (
    <div style={{
      fontSize: 14, fontWeight: 800, color: NAVY,
      marginBottom: 10, marginTop: 4,
      display: "flex", alignItems: "center", gap: 6,
      paddingBottom: 6, borderBottom: `2px solid ${PRIMARY}`,
    }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function BulletList({ items, prefix = "・" }) {
  return (
    <ul style={{
      listStyle: "none", padding: 0, margin: 0,
      fontSize: 12, color: TEXT, lineHeight: 1.8,
    }}>
      {items.map((it, i) => (
        <li key={i} style={{ paddingLeft: 0, marginBottom: 4, display: "flex", gap: 6 }}>
          <span style={{ color: PRIMARY_DARK, flexShrink: 0 }}>{prefix}</span>
          <span style={{ flex: 1 }}>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoTable({ rows }) {
  return (
    <div style={{
      border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden",
    }}>
      {rows.map((r, i) => (
        <div key={r.label} style={{
          display: "flex",
          borderBottom: i === rows.length - 1 ? "none" : `1px solid ${BORDER}`,
        }}>
          <div style={{
            width: 80, padding: "10px 8px",
            background: "#F4FAFE",
            fontSize: 11, fontWeight: 800, color: TEXT_SUB,
            flexShrink: 0,
          }}>
            {r.label}
          </div>
          <div style={{
            flex: 1, padding: "10px 12px",
            fontSize: 12, color: TEXT,
            lineHeight: 1.7, whiteSpace: "pre-wrap",
          }}>
            {r.value}
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================================================
// MAIN
// ==========================================================================

export default function JobDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const scout = SCOUTS.find(s => s.id === id) || SCOUTS[0];

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
          }}>F/S MOCK — D-5 求人詳細</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            応募一覧・スカウト詳細から遷移する求人ページ<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※下部の応募するは追従固定
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
            <span onClick={() => navigate(-1)} style={{
              fontSize: 22, color: TEXT_SUB, cursor: "pointer",
            }}>‹</span>
            <img
              src={logoUrl}
              alt="タップミー / TAPME"
              onClick={() => navigate("/")}
              style={{ height: 40, objectFit: "contain", cursor: "pointer" }}
            />
            <span style={{ fontSize: 18, color: TEXT_SUB, cursor: "pointer" }}>☰</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
            {/* 企業ヘッダー */}
            <div style={{
              padding: "16px 16px 12px",
              borderBottom: `1px solid ${BORDER}`,
              background: "#fff",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 10,
                  background: scout.iconBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: scout.iconColor,
                  flexShrink: 0,
                  border: `2px solid ${BORDER}`,
                }}>
                  ロゴ
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: TEXT_SUB, marginBottom: 2 }}>
                    {scout.industry}
                  </div>
                  <div style={{
                    fontSize: 14, fontWeight: 800, color: NAVY,
                    lineHeight: 1.4, marginBottom: 4,
                  }}>
                    {scout.jobTitle}
                  </div>
                  <div style={{
                    fontSize: 11, color: PRIMARY_DARK, fontWeight: 700,
                    textDecoration: "underline",
                    textDecorationColor: PRIMARY_DARK + "44",
                  }}>
                    {scout.company} ・ {scout.location}
                  </div>
                </div>
              </div>

              {/* タグ群 */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {scout.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, fontWeight: 700,
                    padding: "3px 9px", borderRadius: 12,
                    background: "#E8F6FD", color: PRIMARY_DARK,
                    border: `1px solid ${PRIMARY}33`,
                  }}>
                    # {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 写真6枚 横スクロール */}
            <div style={{ padding: "14px 0", borderBottom: `1px solid ${BORDER}` }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: TEXT_SUB,
                padding: "0 16px", marginBottom: 8,
              }}>
                職場の様子
              </div>
              <div style={{
                display: "flex", gap: 8, overflowX: "auto",
                padding: "0 16px",
                scrollbarWidth: "thin",
              }}>
                {scout.photos.map((emoji, i) => (
                  <PhotoTile key={i} emoji={emoji} idx={i} />
                ))}
              </div>
            </div>

            {/* PRポイント3つ */}
            <div style={{ padding: "16px 16px 16px" }}>
              <SectionTitle icon="✨">この求人のPRポイント</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {scout.prPoints.map((pt, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 10, alignItems: "flex-start",
                    background: `linear-gradient(135deg, ${ACCENT_YELLOW}22 0%, ${ACCENT_YELLOW}08 100%)`,
                    border: `1px solid ${ACCENT_YELLOW}77`,
                    borderRadius: 10, padding: "12px 14px",
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 14,
                      background: ACCENT_YELLOW, color: NAVY,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 900, flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    <div style={{
                      flex: 1, fontSize: 13, fontWeight: 700, color: NAVY,
                      lineHeight: 1.5, paddingTop: 4,
                    }}>
                      {pt}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 入社した人の声 */}
            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="🗣">入社した人の声</SectionTitle>
              <div style={{
                background: "#F4FAFE",
                borderRadius: 12, padding: "14px 14px",
                border: `1px solid ${BORDER}`,
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: 8, right: 14,
                  fontSize: 36, fontWeight: 900, color: "#E8F6FD",
                  lineHeight: 1, fontFamily: "Georgia, serif",
                }}>"</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 20,
                    background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, color: "#fff", flexShrink: 0,
                  }}>
                    👤
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, lineHeight: 1.3 }}>
                      {scout.voiceFromEmployee.name}
                    </div>
                    <div style={{ fontSize: 10, color: TEXT_SUB, marginTop: 2 }}>
                      {scout.voiceFromEmployee.role}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: 12, color: TEXT, lineHeight: 1.8,
                  paddingLeft: 4,
                }}>
                  {scout.voiceFromEmployee.content}
                </div>
              </div>
            </div>

            {/* 求人情報の詳細 (3行コンパクト) */}
            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="📋">求人情報の詳細</SectionTitle>
              <PerkRow
                label="年収"
                value={scout.perks.annualIncome}
                sub={scout.perks.monthly}
                highlight
              />
              <PerkRow
                label="休日"
                value={scout.perks.holidays}
                sub={scout.perks.schedule}
              />
              <PerkRow
                label="そのほか"
                value={scout.perks.others}
              />
            </div>

            {/* 仕事概要 */}
            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="💼">仕事内容</SectionTitle>
              <div style={{
                fontSize: 12, color: TEXT, lineHeight: 1.8,
                whiteSpace: "pre-wrap",
              }}>
                {JOB_OVERVIEW}
              </div>
            </div>

            {/* 業務内容 */}
            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="📌">業務内容</SectionTitle>
              <BulletList items={JOB_TASKS} />
            </div>

            {/* 必須スキル */}
            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="✅">求めている人材（必須）</SectionTitle>
              <BulletList items={REQUIRED_SKILLS} prefix="" />
            </div>

            {/* 歓迎スキル */}
            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="⭐">歓迎スキル</SectionTitle>
              <BulletList items={WELCOME_SKILLS} />
            </div>

            {/* 求める人物像 */}
            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="👥">求める人物像</SectionTitle>
              <BulletList items={PERSON_PROFILE} />
            </div>

            {/* 応募概要 */}
            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="📝">応募概要</SectionTitle>
              <InfoTable rows={APPLICATION_INFO} />
            </div>

            {/* 企業情報 */}
            <div style={{ padding: "8px 16px 24px" }}>
              <SectionTitle icon="🏢">企業情報</SectionTitle>
              <InfoTable rows={COMPANY_INFO} />
            </div>

            {/* 下部スペーサー */}
            <div style={{ height: 80 }} />
          </div>

          {/* 追従固定ボタン: 応募するのみ */}
          <div style={{
            padding: "10px 14px",
            background: "#fff",
            borderTop: `1px solid ${BORDER}`,
            boxShadow: "0 -4px 16px rgba(10,37,64,0.08)",
            flexShrink: 0,
          }}>
            <button onClick={() => navigate("/applied-complete")} style={{
              width: "100%", height: 50,
              background: CTA, color: "#fff",
              border: `2px solid ${CTA}`, borderRadius: 25,
              fontSize: 15, fontWeight: 800, letterSpacing: 0.5,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 6px 18px rgba(232,89,60,0.4)",
            }}>応募する ›</button>
          </div>
        </Phone>
      </div>
    </div>
  );
}
