import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";
import { SCOUTS } from "../scoutData";

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

const MESSAGE_PREVIEW_LIMIT = 100;

const JOB_OVERVIEW = `MOTAは「世界中にもっとフェアトレードを」をミッションに、人生の選択をより公正で公平な機会に変革するプロダクトを提供しております。

現在、業界最大規模の車買取サービスMOTA車買取に加え、不動産サービスの提供を24年12月にローンチ、今後は人材サービス検討も行っていく予定です。

直近3年の売上成長がCAGR205%を超え、事業は急拡大フェーズとなっており、2030年に1000億円規模を作るべく、この第2創業期に中心となって働くメンバーを全領域で募集しています。

本ポジションでは、GM候補として自社プラットフォームの戦略策定と推進を担い、事業の中核を担う役割をお任せします。MOTAは自動車流通のDXを目指しており、プロダクト戦略、UI/UX改善、機能開発（カスタマー・クライアント問わず）を統括し、事業成長に直結するプロダクト責任者として活躍いただきます。`;

const JOB_TASKS = [
  "当社の集客基盤（月間700万人）を活用した新規ビジネスモデル構築、サービスの企画開発、機能ローンチとそれに伴う販売戦略立案等",
  "事業戦略とプロダクト戦略の両方を描き、売上・利益の最大化を推進",
  "市場・社内・顧客ニーズの分析、およびサービス拡充戦略の立案・協業パートナーとの交渉",
  "企画・カスタマーサポートを含む組織マネジメント",
  "事業部・社内・関連会社との会議運営",
  "システム/デザインチーム・マーケティングチームと連携したWebサービス開発",
  "プロジェクトマネジメント",
];

const PROJECT_EXAMPLES = [
  "ビジネスモデルプランの仕様変更",
  "基幹業務システムのフルリニューアル",
  "複数サービス横断に関わる新規プロダクト開発",
  "（toC/B含む）クライアントマイページの改修",
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

function PerkRow({ label, value, highlight }) {
  return (
    <div style={{
      display: "flex", padding: "12px 0",
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
      <div style={{
        flex: 1, fontSize: 13, fontWeight: 700,
        color: TEXT, lineHeight: 1.5, whiteSpace: "pre-wrap",
      }}>
        {value}
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

export default function ScoutDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const scout = SCOUTS.find(s => s.id === id) || SCOUTS[0];

  const [messageOpen, setMessageOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const fullMessage = `${scout.jobTitle}担当の山田と申します。${scout.message}

タップミーで拝見したプロフィールに大変共感し、ぜひ一度直接お話できればと思いご連絡しました。これまでのご経験や、3問Q&Aに書かれていた仕事への考え方が、当社が大切にしているカルチャーと非常にマッチすると感じております。

業務の詳細や働き方、キャリアパスなどについて、対面・オンラインどちらでもご都合の良い形でお話できれば幸いです。少しでもご興味をお持ちいただけましたら、まずは気軽にカジュアル面談からでも大丈夫ですので、ぜひご返信ください。お待ちしております。`;

  const previewMessage = fullMessage.length > MESSAGE_PREVIEW_LIMIT
    ? fullMessage.slice(0, MESSAGE_PREVIEW_LIMIT) + "..."
    : fullMessage;

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
          }}>F/S MOCK — D-2 スカウト詳細</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            企業からのスカウト詳細画面<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※下部のお断り/保留/応募するは追従固定
            </span>
          </div>
        </div>

        <Phone>
          <div style={{
            height: 56, background: "#fff", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 16px", flexShrink: 0,
          }}>
            <span onClick={() => navigate("/scout-list")} style={{
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
            {hasUnread && (
              <div style={{
                background: CTA, color: "#fff",
                padding: "12px 16px", textAlign: "center",
                fontSize: 14, fontWeight: 800, letterSpacing: 0.5,
              }}>
                <span style={{ marginRight: 6 }}>📩</span>
                スカウトが届きました！！
              </div>
            )}

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

            <div style={{ padding: "16px 16px 0" }}>
              <div style={{
                fontSize: 12, fontWeight: 800, color: CTA, marginBottom: 6,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span>💌</span>
                <span>企業からのメッセージ</span>
              </div>
              <div style={{
                background: "#FFF6F2",
                border: `2px solid ${CTA}`,
                borderRadius: 10, padding: "12px 14px",
              }}>
                <div style={{
                  fontSize: 13, color: TEXT, lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                }}>
                  {messageOpen ? fullMessage : previewMessage}
                </div>
                {fullMessage.length > MESSAGE_PREVIEW_LIMIT && (
                  <div onClick={() => setMessageOpen(!messageOpen)} style={{
                    marginTop: 8, fontSize: 12, fontWeight: 800,
                    color: CTA, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 4,
                    paddingTop: 6, borderTop: `1px dashed ${CTA}55`,
                  }}>
                    <span>{messageOpen ? "閉じる" : "続きを読む"}</span>
                    <span style={{
                      transform: messageOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}>▼</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ padding: "20px 16px 16px" }}>
              <div style={{
                fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 8,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span>📋</span>
                <span>求人情報の詳細</span>
              </div>
              <PerkRow label="年収" value={scout.perks.annualIncome} highlight />
              <PerkRow label="月給" value={scout.perks.monthly} />
              <PerkRow label="休日" value={scout.perks.holidays} />
              <PerkRow label="勤務" value={scout.perks.schedule} />
              <PerkRow label="その他" value={scout.perks.others} />
            </div>

            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="💼">仕事概要</SectionTitle>
              <div style={{
                fontSize: 12, color: TEXT, lineHeight: 1.8,
                whiteSpace: "pre-wrap",
              }}>
                {JOB_OVERVIEW}
              </div>
            </div>

            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="📌">業務内容</SectionTitle>
              <BulletList items={JOB_TASKS} />
            </div>

            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="🚀">プロダクト企画・開発事例</SectionTitle>
              <BulletList items={PROJECT_EXAMPLES} />
            </div>

            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="✅">必須スキル</SectionTitle>
              <BulletList items={REQUIRED_SKILLS} prefix="" />
            </div>

            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="⭐">歓迎スキル</SectionTitle>
              <BulletList items={WELCOME_SKILLS} />
            </div>

            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="👥">求める人物像</SectionTitle>
              <BulletList items={PERSON_PROFILE} />
            </div>

            <div style={{ padding: "8px 16px 16px" }}>
              <SectionTitle icon="📝">応募概要</SectionTitle>
              <InfoTable rows={APPLICATION_INFO} />
            </div>

            <div style={{ padding: "8px 16px 24px" }}>
              <SectionTitle icon="🏢">企業情報</SectionTitle>
              <InfoTable rows={COMPANY_INFO} />
            </div>

            <div style={{ height: 80 }} />
          </div>

          <div style={{
            padding: "10px 12px",
            background: "#fff",
            borderTop: `1px solid ${BORDER}`,
            boxShadow: "0 -4px 16px rgba(10,37,64,0.08)",
            display: "flex", gap: 6, flexShrink: 0,
          }}>
            <button onClick={() => alert("お断りしました（モック）")} style={{
              flex: 0.9, height: 46,
              background: "#fff", color: TEXT_SUB,
              border: `1.5px solid ${BORDER}`, borderRadius: 23,
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              fontFamily: "inherit",
            }}>お断り</button>
            <button onClick={() => alert("保留にしました（モック）")} style={{
              flex: 0.9, height: 46,
              background: "#FEF3D6", color: "#B5832A",
              border: `1.5px solid #E5BD52`, borderRadius: 23,
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              fontFamily: "inherit",
            }}>保留</button>
            <button onClick={() => navigate("/applied-complete")} style={{
              flex: 1.4, height: 46,
              background: CTA, color: "#fff",
              border: `1.5px solid ${CTA}`, borderRadius: 23,
              fontSize: 14, fontWeight: 800, cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 4px 14px rgba(232,89,60,0.4)",
            }}>応募する ›</button>
          </div>
        </Phone>
      </div>
    </div>
  );
}
