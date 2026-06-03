import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";
import { SCOUTS } from "../scoutData";

const PRIMARY = "#3FB6E8";
const PRIMARY_DARK = "#059CDB";
const PRIMARY_LIGHT = "#A9E0F0";
const SKY_BG = "#E8F3F8";
const ACCENT_YELLOW = "#F7CF29";
const CTA = "#E8593C";
const NAVY = "#0A2540";
const BG = "#F4FAFE";
const BORDER = "#DDE9F0";
const TEXT = "#1a1a1a";
const TEXT_SUB = "#5A6B7C";
const TEXT_MUTE = "#A0AEC0";

const MESSAGE_PREVIEW_LIMIT = 80;

// ==========================================================================
// 求人サンプルデータ（scout_001：サンプル建設・施工管理スタッフ をベース）
// ==========================================================================

const CONDITION_CATCH = "施工管理スタッフ◆未経験OK／月給30万円〜／全国展開／賞与年2回／退職金あり";

const LOCATION_SALARY = { location: "日本全国", salary: "350万〜450万円" };

// ★ 条件キャッチ下のタグ
const CATCH_TAGS = ["未経験OK", "残業少なめ", "賞与年2回"];

const CATCH_COPY = "「私にもできそう」と思える安心感。\nサンプル建設で、新しいキャリアを。";

const BODY_TEXT = `「建設業って、本当に自分にできるのかな」そんな不安を抱える方も多いはず。サンプル建設では、未経験から成長できる充実の研修制度と、安定した働き方が両立できる環境を整えています。

安定も、やりがいも、ライフワークバランスも。サンプル建設で、新しいキャリアを始めませんか？`;

// ★ PRポイント：文字数を絞った短いキャッチに変更
const PR_POINTS = [
  "未経験OK・研修3ヶ月",
  "全国展開・希望勤務地で",
  "年休118日・残業少なめ",
];

// ★ どんな会社？：5段階評価（value=1〜5、1が左寄り・5が右寄り・3が中央）
const COMPANY_CULTURE = [
  { left: "てきぱき・要領よく", right: "じっくり・ゆっくり", value: 2 },
  { left: "チームプレイ重視", right: "個人プレイ重視", value: 1 },
  { left: "上下関係がはっきり", right: "上下関係なくオープン", value: 4 },
  { left: "なごやか・やさしい", right: "競い合い・鍛えあう", value: 2 },
];

const VOICE_FROM_EMPLOYEE = {
  name: "Tさん",
  age: 28, gender: "男性",
  role: "施工管理",
  tenure: "入社2年目",
  comment: "前職は飲食業でしたが、未経験から入社して2年で現場を任せてもらえるようになりました。先輩方が丁寧に教えてくださるので、安心して成長できる環境です。",
};

const JOB_OVERVIEW = `サンプル建設は「建設業のDXを通じて、より働きやすい現場をつくる」をミッションに掲げ、住宅・商業施設・公共インフラまで幅広い領域で施工管理サービスを提供しています。

現在、全国47都道府県に拠点を持ち、未経験から成長できる教育プログラムと、業界平均を上回る休日数・福利厚生で「働きやすさ」を追求しています。

本ポジションでは、現場での施工管理を担当いただきます。経験者の方には、より大規模なプロジェクトのマネジメントもお任せします。`;

const JOB_TASKS = [
  "建設現場での工程管理・品質管理・安全管理",
  "現場作業員とのコミュニケーション・指示出し",
  "図面確認・設計者や発注者との打ち合わせ",
  "施工計画の立案・スケジュール管理",
  "資材発注・在庫管理",
  "完了検査・引き渡し業務",
];

const APPLICATION_INFO = [
  { label: "給与", value: "年収 350万〜450万円（経験、スキル、職務に応じて決定）\n月給 300,000円〜375,000円\n・賞与：年2回（夏・冬）\n・昇給：年1回（4月）" },
  { label: "雇用形態", value: "正社員" },
  { label: "勤務体系", value: "勤務時間 8:00〜17:00（実働8時間）\n休日・休暇：年間118日、完全週休2日制（土・日・祝）、年末年始、GW、夏季休暇、有給休暇 等" },
  { label: "試用期間", value: "あり（3ヶ月）" },
  { label: "福利厚生", value: "社会保険完備、定期健康診断、交通費全額支給、退職金制度、家族手当、住宅手当、引越し補助、資格取得支援、研修制度 等" },
];

const COMPANY_INFO = [
  { label: "企業名", value: "サンプル建設株式会社" },
  { label: "設立年月", value: "1985年04月" },
  { label: "本社所在地", value: "東京都港区赤坂2丁目4番6号 赤坂グリーンクロス22階" },
  { label: "事業内容", value: "建設業（住宅・商業施設・公共インフラ）/ 施工管理サービス" },
  { label: "資本金", value: "5億円" },
  { label: "従業員数", value: "1,200名" },
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

function SectionTitle({ icon, children }) {
  return (
    <div style={{
      fontSize: 15, fontWeight: 800, color: TEXT,
      marginBottom: 12,
      display: "flex", alignItems: "center", gap: 6,
      paddingBottom: 8, borderBottom: `2px solid ${PRIMARY}`,
    }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span>{children}</span>
    </div>
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
            background: SKY_BG,
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

function BulletList({ items }) {
  return (
    <ul style={{
      listStyle: "none", padding: 0, margin: 0,
      fontSize: 12.5, color: TEXT, lineHeight: 1.8,
    }}>
      {items.map((it, i) => (
        <li key={i} style={{ marginBottom: 6, display: "flex", gap: 6 }}>
          <span style={{ color: PRIMARY_DARK, flexShrink: 0 }}>・</span>
          <span style={{ flex: 1 }}>{it}</span>
        </li>
      ))}
    </ul>
  );
}

// ★ ラベル付き値（勤務地 / 年収 など）
function LabelValue({ label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{
        padding: "4px 10px",
        background: "#fff",
        color: PRIMARY_DARK,
        fontSize: 12, fontWeight: 800,
        borderRadius: 6,
        border: `1px solid ${PRIMARY_LIGHT}`,
        flexShrink: 0,
      }}>{label}</span>
      <span style={{
        fontSize: 16, fontWeight: 900, color: TEXT, lineHeight: 1.3,
      }}>{value}</span>
    </div>
  );
}

// ★ 5段階カルチャースケール（●で左寄り/右寄りを表現）
function CultureScale({ left, right, value }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontSize: 11, fontWeight: 800, color: TEXT_SUB, marginBottom: 7,
      }}>
        <span>{left}</span>
        <span>{right}</span>
      </div>
      <div style={{
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5px", height: 18,
      }}>
        {/* トラック線 */}
        <div style={{
          position: "absolute", left: 9, right: 9, top: "50%",
          height: 2, background: BORDER, transform: "translateY(-50%)",
        }} />
        {[1, 2, 3, 4, 5].map((n) => {
          const active = n === value;
          return (
            <div key={n} style={{
              position: "relative", zIndex: 1,
              width: active ? 18 : 9, height: active ? 18 : 9,
              borderRadius: "50%",
              background: active ? PRIMARY_DARK : "#fff",
              border: active ? `2px solid ${PRIMARY_DARK}` : `2px solid ${BORDER}`,
              boxShadow: active ? `0 2px 6px ${PRIMARY}77` : "none",
              transition: "all 0.15s",
            }} />
          );
        })}
      </div>
    </div>
  );
}

// ==========================================================================
// MAIN
// ==========================================================================

export default function ScoutDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const scout = SCOUTS.find(s => s.id === id) || SCOUTS[0];

  const [messageOpen, setMessageOpen] = useState(false);
  const [mainPhotoIdx, setMainPhotoIdx] = useState(0);

  const fullMessage = `${scout.jobTitle}担当の山田と申します。${scout.message}

タップミーで拝見したプロフィールに大変共感し、ぜひ一度直接お話できればと思いご連絡しました。これまでのご経験や、3問Q&Aに書かれていた仕事への考え方が、当社が大切にしているカルチャーと非常にマッチすると感じております。

業務の詳細や働き方、キャリアパスなどについて、対面・オンラインどちらでもご都合の良い形でお話できれば幸いです。少しでもご興味をお持ちいただけましたら、まずは気軽にカジュアル面談からでも大丈夫ですので、ぜひご返信ください。お待ちしております。`;

  const previewMessage = fullMessage.length > MESSAGE_PREVIEW_LIMIT
    ? fullMessage.slice(0, MESSAGE_PREVIEW_LIMIT) + "..."
    : fullMessage;

  // 写真パレット（メイン+サムネ用、emoji & 背景色）
  const photoColors = ["#E0F2F8", "#FEF3D6", "#E8F4D9", "#FDE6F0", "#F0E8FA", "#FFE4DC"];
  const photos = scout.photos || ["🏗", "🏢", "👷‍♂️", "📐", "🚧", "🔧"];

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
          {/* ヘッダー */}
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
            {/* スカウト通知バナー */}
            <div style={{
              background: CTA, color: "#fff",
              padding: "12px 16px", textAlign: "center",
              fontSize: 14, fontWeight: 800, letterSpacing: 0.5,
            }}>
              <span style={{ marginRight: 6 }}>📩</span>
              スカウトが届きました！！
            </div>

            {/* ★ 💌 企業からのメッセージ（最上部・条件キャッチより上に配置） */}
            <div style={{ padding: "16px 16px 8px" }}>
              <div style={{
                fontSize: 13, fontWeight: 800, color: CTA, marginBottom: 8,
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

            {/* 1. 条件キャッチ + タグ */}
            <div style={{
              padding: "16px 16px 12px",
              background: SKY_BG,
            }}>
              <div style={{
                fontSize: 14, fontWeight: 800, color: TEXT,
                lineHeight: 1.6, letterSpacing: 0,
              }}>
                {CONDITION_CATCH}
              </div>
              {/* ★ タグ */}
              <div style={{
                display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12,
              }}>
                {CATCH_TAGS.map((t) => (
                  <span key={t} style={{
                    display: "inline-flex", alignItems: "center", gap: 2,
                    padding: "5px 12px",
                    background: "#fff",
                    border: `1.5px solid ${PRIMARY_LIGHT}`,
                    borderRadius: 999,
                    fontSize: 12, fontWeight: 700, color: PRIMARY_DARK,
                  }}>
                    <span style={{ color: PRIMARY, fontWeight: 800 }}>#</span>{t}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. 勤務地 / 年収（ラベル付き） */}
            <div style={{
              padding: "12px 16px 16px",
              background: SKY_BG,
              borderBottom: `1px solid ${BORDER}`,
              display: "flex", flexWrap: "wrap", alignItems: "center",
              gap: "10px 18px",
            }}>
              <LabelValue label="勤務地" value={LOCATION_SALARY.location} />
              <LabelValue label="年収" value={LOCATION_SALARY.salary} />
            </div>

            {/* 3. キャッチコピー */}
            <div style={{ padding: "24px 16px 16px" }}>
              <div style={{
                fontSize: 20, fontWeight: 900, color: TEXT,
                lineHeight: 1.5, letterSpacing: -0.5,
                whiteSpace: "pre-wrap",
              }}>
                {CATCH_COPY}
              </div>
            </div>

            {/* 4. 本文 */}
            <div style={{ padding: "8px 16px 24px" }}>
              <div style={{
                fontSize: 13, color: TEXT, lineHeight: 1.9,
                whiteSpace: "pre-wrap", fontWeight: 500,
              }}>
                {BODY_TEXT.split("\n\n").map((paragraph, idx) => {
                  const isHeading = paragraph.startsWith("◇");
                  return (
                    <div key={idx} style={{
                      marginBottom: 14,
                      ...(isHeading ? { fontWeight: 800, color: PRIMARY_DARK, fontSize: 14 } : {}),
                    }}>
                      {paragraph}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. 写真：メイン + サムネ6枚 */}
            <div style={{ padding: "8px 16px 24px" }}>
              {/* メイン写真 */}
              <div style={{
                width: "100%", height: 220,
                borderRadius: 12,
                background: photoColors[mainPhotoIdx % photoColors.length],
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 120,
                marginBottom: 10,
                border: `1px solid ${BORDER}`,
                boxShadow: "0 4px 12px rgba(10,37,64,0.08)",
              }}>
                {photos[mainPhotoIdx]}
              </div>
              {/* サムネ6枚 */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6,
              }}>
                {photos.slice(0, 6).map((emoji, i) => (
                  <div key={i} onClick={() => setMainPhotoIdx(i)} style={{
                    aspectRatio: "1 / 1",
                    borderRadius: 6,
                    background: photoColors[i % photoColors.length],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24,
                    cursor: "pointer",
                    border: i === mainPhotoIdx ? `2.5px solid ${PRIMARY_DARK}` : `1px solid ${BORDER}`,
                    transition: "all 0.15s",
                  }}>
                    {emoji}
                  </div>
                ))}
              </div>
            </div>

            {/* 6. PRポイント（文字数を絞った短いキャッチ） */}
            <div style={{ padding: "16px 16px 24px", background: "#fff" }}>
              <SectionTitle icon="✨">この求人のPRポイント</SectionTitle>
              {PR_POINTS.map((point, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12,
                  marginBottom: 12, alignItems: "center",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 6,
                    background: PRIMARY, color: "#fff",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: 1 }}>POINT</div>
                    <div style={{ fontSize: 16, fontWeight: 900, lineHeight: 1 }}>{i + 1}</div>
                  </div>
                  <div style={{
                    flex: 1, fontSize: 14, fontWeight: 800, color: TEXT,
                    lineHeight: 1.5,
                  }}>
                    {point}
                  </div>
                </div>
              ))}
            </div>

            {/* 7. ★ どんな会社？（5段階カルチャースケール） */}
            <div style={{ padding: "16px 16px 24px", background: "#fff" }}>
              <SectionTitle icon="🧭">どんな会社？</SectionTitle>
              <div style={{
                border: `1px solid ${BORDER}`, borderRadius: 12,
                padding: "18px 16px 12px", background: SKY_BG,
              }}>
                {COMPANY_CULTURE.map((c, i) => (
                  <CultureScale key={i} left={c.left} right={c.right} value={c.value} />
                ))}
                <div style={{
                  fontSize: 10.5, color: TEXT_MUTE, textAlign: "center",
                  marginTop: 2,
                }}>
                  ●の位置が企業のカルチャー傾向を示しています
                </div>
              </div>
            </div>

            {/* 8. 入社した人の声 */}
            <div style={{ padding: "16px 16px 24px", background: SKY_BG }}>
              <SectionTitle icon="🗣">入社した人の声</SectionTitle>
              <div style={{
                background: "#fff",
                borderRadius: 12, padding: "16px 14px",
                border: `1px solid ${BORDER}`,
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 12, marginBottom: 12,
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 24,
                    background: PRIMARY_LIGHT,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                  }}>
                    👨
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: TEXT, marginBottom: 2 }}>
                      {VOICE_FROM_EMPLOYEE.name}（{VOICE_FROM_EMPLOYEE.age}歳・{VOICE_FROM_EMPLOYEE.gender}）
                    </div>
                    <div style={{ fontSize: 11, color: TEXT_SUB, fontWeight: 600 }}>
                      {VOICE_FROM_EMPLOYEE.role}・{VOICE_FROM_EMPLOYEE.tenure}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: 12.5, color: TEXT, lineHeight: 1.8,
                }}>
                  {VOICE_FROM_EMPLOYEE.comment}
                </div>
              </div>
            </div>

            {/* 9. 求人情報の詳細 */}
            <div style={{ padding: "24px 16px 8px" }}>
              <div style={{
                fontSize: 16, fontWeight: 900, color: TEXT,
                marginBottom: 16,
                paddingBottom: 8,
                borderBottom: `3px solid ${PRIMARY}`,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span>📋</span>
                <span>求人情報の詳細</span>
              </div>

              {/* 9-1 仕事概要 */}
              <div style={{ marginBottom: 24 }}>
                <SectionTitle icon="💼">仕事概要</SectionTitle>
                <div style={{
                  fontSize: 12.5, color: TEXT, lineHeight: 1.9,
                  whiteSpace: "pre-wrap", fontWeight: 500,
                }}>
                  {JOB_OVERVIEW}
                </div>
              </div>

              {/* 9-2 業務内容 */}
              <div style={{ marginBottom: 24 }}>
                <SectionTitle icon="📌">業務内容</SectionTitle>
                <BulletList items={JOB_TASKS} />
              </div>

              {/* 9-3 応募概要（地図なし） */}
              <div style={{ marginBottom: 24 }}>
                <SectionTitle icon="📝">応募概要</SectionTitle>
                <InfoTable rows={APPLICATION_INFO} />
              </div>

              {/* 9-4 勤務地（地図なし・住所のみ） */}
              <div style={{ marginBottom: 24 }}>
                <SectionTitle icon="📍">勤務地</SectionTitle>
                <div style={{
                  fontSize: 13, color: TEXT, lineHeight: 1.7, fontWeight: 600,
                  padding: "12px 14px",
                  background: SKY_BG,
                  borderRadius: 8,
                  border: `1px solid ${BORDER}`,
                }}>
                  本社：東京都港区赤坂2丁目4-6 赤坂グリーンクロス22F<br/>
                  ※全国の現場へ配属（希望勤務地相談可）
                </div>
              </div>
            </div>

            {/* 10. 会社情報（最下部） */}
            <div style={{ padding: "8px 16px 24px" }}>
              <SectionTitle icon="🏢">会社情報</SectionTitle>
              <InfoTable rows={COMPANY_INFO} />
            </div>

            <div style={{ height: 80 }} />
          </div>

          {/* 下部固定ボタン */}
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
