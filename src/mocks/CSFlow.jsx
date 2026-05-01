import { useState } from "react";

// ==========================================================================
// MOTA CS Mock — 初期版 / 求職者側Webアプリ
// 画面フロー図に準拠 (https://nnakatsuka.github.io/mota-mock-h/)
// ==========================================================================

const ACCENT = "#E8593C";
const ACCENT_DARK = "#C44529";
const PURPLE = "#534AB7";
const BG = "#F0EFEB";
const BG_CARD = "#FAFAF8";
const BORDER = "#E8E6E1";
const TEXT = "#1a1a1a";
const TEXT_SUB = "#5F5E5A";
const TEXT_MUTE = "#B4B2A9";

// ==========================================================================
// Phases & Screens
// ==========================================================================

const PHASES = {
  "ログイン前": ["CSホーム", "求人一覧", "求人詳細"],
  "会員登録":   ["基本情報", "設問Q&A", "敬語変換確認", "PHOTO", "登録完了"],
  "メイン":     ["スカウト一覧", "スカウト詳細", "応募保留・お断り", "応募一覧"],
  "マイページ": ["マイページ", "アカウント編集", "利用規約", "退会"],
};

// ==========================================================================
// Phone frame
// ==========================================================================

function Phone({ children }) {
  return (
    <div style={{
      width: 375, minHeight: 720, maxHeight: 780,
      background: BG_CARD,
      borderRadius: 36, border: "6px solid #1a1a1a",
      overflow: "hidden", display: "flex", flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)",
      position: "relative",
      fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
    }}>
      <div style={{
        height: 44, background: "#fff", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", fontSize: 12, fontWeight: 600, color: TEXT,
        flexShrink: 0,
      }}>
        <span>9:41</span>
        <div style={{ width: 120, height: 28, background: "#1a1a1a", borderRadius: 14 }} />
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="6" width="3" height="6" rx="1" fill="#1a1a1a"/><rect x="4.5" y="4" width="3" height="8" rx="1" fill="#1a1a1a"/><rect x="9" y="2" width="3" height="10" rx="1" fill="#1a1a1a"/><rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1a1a1a" opacity="0.3"/></svg>
          <svg width="22" height="12" viewBox="0 0 22 12"><rect x="0" y="0" width="20" height="12" rx="2" stroke="#1a1a1a" strokeWidth="1" fill="none"/><rect x="1.5" y="1.5" width="14" height="9" rx="1" fill="#1a1a1a"/><rect x="21" y="3.5" width="1.5" height="5" rx="0.5" fill="#1a1a1a"/></svg>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

// ==========================================================================
// Reusable building blocks
// ==========================================================================

function Btn({ children, onClick, outline, small, full = true, color = "primary" }) {
  const colors = {
    primary: { bg: ACCENT, fg: "#fff", bd: ACCENT },
    danger:  { bg: "#fff", fg: "#C44529", bd: "#F6CBC9" },
  }[color];
  const styles = outline
    ? { bg: "#fff", fg: TEXT, bd: "#D3D1C7" }
    : colors;
  return (
    <button onClick={onClick} style={{
      width: full ? "100%" : "auto",
      height: small ? 36 : 46,
      padding: full ? 0 : "0 18px",
      borderRadius: 8, border: `1.5px solid ${styles.bd}`,
      background: styles.bg, color: styles.fg,
      fontSize: small ? 13 : 15, fontWeight: 700,
      cursor: "pointer", letterSpacing: 0.5,
    }}>{children}</button>
  );
}

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
      padding: small ? "2px 7px" : "4px 10px", borderRadius: 4,
      fontSize: small ? 10 : 11, fontWeight: 600,
      background: palette.bg, color: palette.fg,
      border: `1px solid ${palette.bd}`, lineHeight: 1.4,
      whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function Header({ title, onBack, right }) {
  return (
    <div style={{
      height: 50, background: "#fff", borderBottom: `1px solid ${BORDER}`,
      display: "flex", alignItems: "center", padding: "0 16px",
      flexShrink: 0,
    }}>
      {onBack ? (
        <span onClick={onBack} style={{ fontSize: 22, color: TEXT, cursor: "pointer", marginRight: 8 }}>‹</span>
      ) : null}
      <div style={{ flex: 1, fontSize: 15, fontWeight: 700, color: TEXT, textAlign: onBack ? "left" : "center" }}>
        {title}
      </div>
      {right || <div style={{ width: 24 }} />}
    </div>
  );
}

function ProgressBar({ step, total }) {
  return (
    <div style={{ padding: "12px 20px 0" }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontSize: 11, color: TEXT_SUB, marginBottom: 6,
      }}>
        <span>STEP {step} / {total}</span>
        <span style={{ color: ACCENT, fontWeight: 700 }}>{Math.round(step / total * 100)}%</span>
      </div>
      <div style={{ height: 4, background: "#E8E6E1", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${step / total * 100}%`, height: "100%", background: ACCENT, transition: "width 0.3s" }} />
      </div>
    </div>
  );
}

// ==========================================================================
// Bottom Nav (4タブ: 求人 / スカウト / 応募 / マイページ)
// ==========================================================================

function BottomNav({ active, onNavigate, loggedIn }) {
  const tabs = [
    { id: "求人一覧", label: "求人", icon: "💼" },
    { id: "スカウト一覧", label: "スカウト", icon: "📩", needsLogin: true },
    { id: "応募一覧", label: "応募", icon: "📋", needsLogin: true },
    { id: "マイページ", label: "マイページ", icon: "👤", needsLogin: true },
  ];
  return (
    <div style={{
      height: 56, background: "#fff", display: "flex",
      borderTop: `1px solid ${BORDER}`, flexShrink: 0,
    }}>
      {tabs.map(t => {
        const disabled = t.needsLogin && !loggedIn;
        const isActive = active === t.id;
        return (
          <div key={t.id} onClick={() => !disabled && onNavigate(t.id)} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 2,
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.4 : 1,
          }}>
            <span style={{ fontSize: 18, filter: isActive ? "none" : "grayscale(40%)" }}>{t.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: 600,
              color: isActive ? ACCENT : TEXT_SUB,
            }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ==========================================================================
// 1. CSホーム (未登録でも閲覧可)
// ==========================================================================

function ScreenCSHome({ onNavigate, loggedIn, setLoggedIn }) {
  return (
    <>
      {/* Top bar with login state */}
      <div style={{
        height: 50, background: "#fff", borderBottom: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 6,
            background: ACCENT, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 13,
          }}>M</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: TEXT }}>MOTA Work</div>
        </div>
        {!loggedIn && (
          <span onClick={() => setLoggedIn(true)} style={{
            fontSize: 11, color: ACCENT, fontWeight: 700, cursor: "pointer",
          }}>ログイン</span>
        )}
      </div>

      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Hero */}
        <div style={{
          background: `linear-gradient(135deg, #FFE5DA 0%, #F0EDFE 100%)`,
          padding: "32px 24px",
        }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: TEXT, lineHeight: 1.4, marginBottom: 8 }}>
            写真と動画で、<br />
            "あなたらしい"<br />
            仕事に出会おう。
          </div>
          <div style={{ fontSize: 12, color: TEXT_SUB, lineHeight: 1.7, marginBottom: 18 }}>
            履歴書なし。3問のQ&Aと写真だけで、<br />
            企業からスカウトが届く新しい仕事探し。
          </div>
          <div onClick={() => onNavigate("求人一覧")}>
            <Btn>求人を探してみる</Btn>
          </div>
          {!loggedIn && (
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <span onClick={() => onNavigate("基本情報")} style={{
                fontSize: 12, color: ACCENT, fontWeight: 600, cursor: "pointer",
                textDecoration: "underline",
              }}>新規会員登録はこちら</span>
            </div>
          )}
        </div>

        {/* Pickup */}
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 10 }}>
            ピックアップ求人
          </div>
          {[
            { co: "サンプル買取センター", role: "査定スタッフ", area: "千葉県", salary: "月給28万〜" },
            { co: "ABC自動車販売", role: "店舗営業", area: "東京都", salary: "月給26万〜" },
            { co: "MOTA整備工場", role: "整備スタッフ", area: "神奈川県", salary: "月給25万〜" },
          ].map((j, i) => (
            <div key={i} onClick={() => onNavigate("求人詳細")} style={{
              background: "#fff", border: `1px solid ${BORDER}`,
              borderRadius: 10, padding: 14, marginBottom: 10, cursor: "pointer",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{j.role}</div>
              <div style={{ fontSize: 11, color: TEXT_SUB, marginBottom: 6 }}>{j.co} ・ {j.area}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT }}>{j.salary}</div>
            </div>
          ))}
        </div>

        {/* Why MOTA */}
        <div style={{ padding: "12px 16px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 10 }}>
            MOTA Workの特徴
          </div>
          {[
            { icon: "📸", title: "写真と動画でアピール", desc: "履歴書では伝わらない人柄を見てもらえる" },
            { icon: "💬", title: "ため口でOKのQ&A", desc: "AIが自動で敬語に変換してくれます" },
            { icon: "📩", title: "企業からスカウトが届く", desc: "応募する手間なく、合う仕事に出会える" },
          ].map((f, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, padding: "10px 0",
              borderBottom: i === 2 ? "none" : `1px solid ${BORDER}`,
            }}>
              <div style={{ fontSize: 24 }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{f.title}</div>
                <div style={{ fontSize: 11, color: TEXT_SUB }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="求人一覧" onNavigate={onNavigate} loggedIn={loggedIn} />
    </>
  );
}

// ==========================================================================
// 2. 求人一覧
// ==========================================================================

function ScreenJobList({ onNavigate, loggedIn }) {
  const jobs = [
    { title: "査定スタッフ", co: "サンプル買取センター", loc: "千葉県市川市", salary: "月給28万〜", tags: ["未経験OK", "車好き歓迎"] },
    { title: "店舗営業", co: "ABC自動車販売", loc: "東京都江戸川区", salary: "月給26万〜", tags: ["インセンティブ", "週休2日"] },
    { title: "整備スタッフ", co: "MOTA整備工場", loc: "神奈川県横浜市", salary: "月給25万〜", tags: ["資格手当", "正社員"] },
    { title: "買取査定士", co: "クルマ買取王", loc: "埼玉県川口市", salary: "月給30万〜", tags: ["経験者優遇"] },
    { title: "営業アシスタント", co: "オートカーズ東京", loc: "東京都足立区", salary: "月給22万〜", tags: ["未経験OK", "残業少"] },
  ];
  return (
    <>
      <Header title="求人一覧" />
      <div style={{
        padding: "10px 16px", background: "#fff", borderBottom: `1px solid ${BORDER}`,
        flexShrink: 0,
      }}>
        <div style={{
          height: 36, borderRadius: 8, background: "#F7F6F3", display: "flex",
          alignItems: "center", padding: "0 12px", fontSize: 12, color: TEXT_MUTE, gap: 8,
        }}>
          <span>🔍</span>
          <span>職種・エリア・キーワードで検索</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: "12px 16px", overflow: "auto", background: BG }}>
        <div style={{ fontSize: 11, color: TEXT_SUB, marginBottom: 8 }}>{jobs.length}件の求人</div>
        {jobs.map((j, i) => (
          <div key={i} onClick={() => onNavigate("求人詳細")} style={{
            background: "#fff", borderRadius: 10, padding: 14, marginBottom: 10,
            border: `1px solid ${BORDER}`, cursor: "pointer",
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{j.title}</div>
            <div style={{ fontSize: 11, color: TEXT_SUB, marginBottom: 6 }}>{j.co} ・ {j.loc}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: ACCENT, marginBottom: 8 }}>{j.salary}</div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {j.tags.map(t => <Tag key={t} small color="blue">{t}</Tag>)}
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="求人一覧" onNavigate={onNavigate} loggedIn={loggedIn} />
    </>
  );
}

// ==========================================================================
// 3. 求人詳細
// ==========================================================================

function ScreenJobDetail({ onNavigate, loggedIn }) {
  return (
    <>
      <Header title="求人詳細" onBack={() => onNavigate("求人一覧")} />
      <div style={{ flex: 1, overflow: "auto", background: BG }}>
        {/* Hero */}
        <div style={{ background: "#fff", padding: "20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 8,
              background: "#F1EFE8", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 22,
            }}>🚗</div>
            <div>
              <div style={{ fontSize: 11, color: TEXT_SUB }}>サンプル買取センター</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>査定スタッフ</div>
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: ACCENT, marginBottom: 8 }}>
            月給 28万円〜
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <Tag color="blue">未経験OK</Tag>
            <Tag color="blue">車好き歓迎</Tag>
            <Tag color="green">資格手当</Tag>
          </div>
        </div>

        {/* 詳細 */}
        <div style={{ padding: "16px", background: BG }}>
          <Section title="📍 勤務地">
            千葉県市川市 / 本社 (JR市川駅徒歩5分)
          </Section>
          <Section title="💼 仕事内容">
            車の査定業務をお任せします。お客様のお車の状態を確認し、買取金額を算出。経験のない方でも研修制度があるので安心してスタートできます。
          </Section>
          <Section title="🎁 福利厚生">
            社会保険完備 / 交通費支給 / 資格取得支援 / インセンティブ制度
          </Section>
          <Section title="✅ 求める人物像">
            車に興味のある方 / お客様と接することが好きな方 / 普通自動車免許をお持ちの方
          </Section>
        </div>
      </div>
      {/* Footer CTA: 応募へ */}
      <div style={{
        padding: "12px 16px", background: "#fff", borderTop: `1px solid ${BORDER}`,
        flexShrink: 0,
      }}>
        {loggedIn ? (
          <Btn>応募する</Btn>
        ) : (
          <>
            <Btn onClick={() => onNavigate("基本情報")}>応募する（会員登録へ）</Btn>
            <div style={{ fontSize: 10, color: TEXT_SUB, textAlign: "center", marginTop: 6 }}>
              応募には会員登録が必要です
            </div>
          </>
        )}
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 10, padding: "12px 14px",
      marginBottom: 10, border: `1px solid ${BORDER}`,
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 12, color: TEXT_SUB, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

// ==========================================================================
// 4. 基本情報 (登録 STEP 1/4)
// ==========================================================================

function ScreenBasicInfo({ onNavigate }) {
  return (
    <>
      <Header title="プロフィール登録" onBack={() => onNavigate("CSホーム")} />
      <ProgressBar step={1} total={4} />
      <div style={{ flex: 1, overflow: "auto", padding: "16px 20px" }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: TEXT, marginBottom: 4 }}>基本情報</div>
        <div style={{ fontSize: 11, color: TEXT_SUB, marginBottom: 16, lineHeight: 1.6 }}>
          履歴書代わりになる情報です。<br />
          途中で保存もできます。
        </div>

        {[
          { l: "氏名", p: "山田 太郎", req: true },
          { l: "メールアドレス", p: "yamada@example.com", req: true },
          { l: "生年月日", p: "1995/04/01", req: true },
          { l: "住所（市区町村まで）", p: "東京都渋谷区", req: true },
          { l: "最終学歴", p: "○○大学 経済学部", req: true },
          { l: "保有資格", p: "普通自動車免許 / 整備士2級...", req: false },
        ].map((f, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
              {f.l} {f.req && <Tag color="red" small>必須</Tag>}
            </div>
            <div style={{
              height: 36, borderRadius: 6, background: "#fff",
              border: `1px solid ${BORDER}`, padding: "0 12px",
              display: "flex", alignItems: "center", fontSize: 12, color: TEXT_MUTE,
            }}>{f.p}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 20px", background: "#fff", borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn outline small full={false}>下書き保存</Btn>
          <div style={{ flex: 1 }} onClick={() => onNavigate("設問Q&A")}>
            <Btn>次へ進む</Btn>
          </div>
        </div>
      </div>
    </>
  );
}

// ==========================================================================
// 5. 設問Q&A (登録 STEP 2/4)
// ==========================================================================

function ScreenQA({ onNavigate }) {
  const questions = [
    "これまでの仕事で一番やりがいを感じた経験を教えてください",
    "新しい職場で大切にしたいことは何ですか？",
    "あなたの強みを一言で表すと？",
  ];
  return (
    <>
      <Header title="プロフィール登録" onBack={() => onNavigate("基本情報")} />
      <ProgressBar step={2} total={4} />
      <div style={{ flex: 1, overflow: "auto", padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>設問Q&A</span>
          <Tag color="green" small>ため口OK</Tag>
        </div>
        <div style={{ fontSize: 11, color: TEXT_SUB, marginBottom: 16, lineHeight: 1.6 }}>
          自然な言葉で答えてください。<br />
          あとでAIが自動で敬語に変換します。
        </div>

        {questions.map((q, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: 10, padding: 14, marginBottom: 12,
            border: `1px solid ${BORDER}`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT, marginBottom: 6 }}>
              Q{i + 1}.
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 10, lineHeight: 1.5 }}>
              {q}
            </div>
            <div style={{
              minHeight: 70, padding: 10, borderRadius: 6,
              background: "#FAFAF8", border: `1px dashed ${BORDER}`,
              fontSize: 11, color: TEXT_MUTE, lineHeight: 1.6,
            }}>
              {i === 0 && "前のバイトで店長やってて、新人教えるのが意外に楽しかった..."}
              {i === 1 && "やっぱ人間関係かな〜。一緒に働く人を大事にしたい..."}
              {i === 2 && "粘り強さ。簡単に諦めない方だと思う！"}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 20px", background: "#fff", borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn outline small full={false}>下書き保存</Btn>
          <div style={{ flex: 1 }} onClick={() => onNavigate("敬語変換確認")}>
            <Btn>次へ進む</Btn>
          </div>
        </div>
      </div>
    </>
  );
}

// ==========================================================================
// 6. 敬語変換確認 (登録 STEP 3/4)
// ==========================================================================

function ScreenKeigoReview({ onNavigate }) {
  const items = [
    { before: "前のバイトで店長やってて、新人教えるのが意外に楽しかった", after: "以前のアルバイトで店長を務めており、新人教育に取り組む中で、思いがけずやりがいを感じることができました。" },
    { before: "やっぱ人間関係かな〜。一緒に働く人を大事にしたい", after: "やはり人間関係を重視しております。共に働く方々を大切にしたいと考えています。" },
    { before: "粘り強さ。簡単に諦めない方だと思う！", after: "粘り強さです。物事を簡単に諦めない性格だと自負しております。" },
  ];
  return (
    <>
      <Header title="プロフィール登録" onBack={() => onNavigate("設問Q&A")} />
      <ProgressBar step={3} total={4} />
      <div style={{ flex: 1, overflow: "auto", padding: "16px 20px" }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: TEXT, marginBottom: 4 }}>AI敬語変換</div>
        <div style={{ fontSize: 11, color: TEXT_SUB, marginBottom: 16, lineHeight: 1.6 }}>
          AIが敬語に変換しました。<br />
          内容を確認・修正してください。
        </div>

        {items.map((it, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: 10, padding: 14, marginBottom: 12,
            border: `1px solid ${BORDER}`,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: TEXT_SUB, marginBottom: 4 }}>
              元の回答 (Q{i + 1})
            </div>
            <div style={{
              fontSize: 11, color: TEXT_MUTE, marginBottom: 10,
              padding: "6px 10px", background: "#F7F6F3", borderRadius: 4,
            }}>{it.before}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
              <Tag color="purple" small>AI変換後</Tag>
              <span style={{ fontSize: 10, color: TEXT_SUB }}>修正可</span>
            </div>
            <div style={{
              fontSize: 12, color: TEXT, lineHeight: 1.6,
              padding: 10, background: "#F0EDFE", borderRadius: 6,
            }}>{it.after}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 20px", background: "#fff", borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div onClick={() => onNavigate("PHOTO")}>
          <Btn>次へ進む</Btn>
        </div>
      </div>
    </>
  );
}

// ==========================================================================
// 7. PHOTO (登録 STEP 4/4)
// ==========================================================================

function ScreenPhoto({ onNavigate }) {
  return (
    <>
      <Header title="プロフィール登録" onBack={() => onNavigate("敬語変換確認")} />
      <ProgressBar step={4} total={4} />
      <div style={{ flex: 1, overflow: "auto", padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>プロフィール写真</span>
          <Tag color="red" small>必須</Tag>
        </div>
        <div style={{ fontSize: 11, color: TEXT_SUB, marginBottom: 16, lineHeight: 1.6 }}>
          顔がはっきりわかる写真を1枚アップロードしてください。
        </div>

        {/* Upload area */}
        <div style={{
          height: 220, borderRadius: 10,
          background: `linear-gradient(135deg, #FFE5DA 0%, #F0EDFE 100%)`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          border: `2px dashed ${ACCENT}`,
          marginBottom: 16, gap: 8,
        }}>
          <div style={{ fontSize: 40 }}>📷</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>タップして撮影/アップロード</div>
          <div style={{ fontSize: 10, color: TEXT_SUB }}>JPG / PNG / 5MB以下</div>
        </div>

        {/* Guide */}
        <div style={{
          background: "#fff", borderRadius: 10, padding: 14,
          border: `1px solid ${BORDER}`,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginBottom: 8 }}>📸 撮影ガイド</div>
          {[
            { ok: true, t: "明るい場所で撮影" },
            { ok: true, t: "顔がはっきり写るように" },
            { ok: true, t: "笑顔だとなお良し" },
            { ok: false, t: "サングラス・マスクは避ける" },
            { ok: false, t: "他人が写っている写真はNG" },
          ].map((g, i) => (
            <div key={i} style={{
              display: "flex", gap: 8, padding: "5px 0",
              fontSize: 11, color: TEXT_SUB,
            }}>
              <span style={{ color: g.ok ? "#1F8043" : "#C44529", fontWeight: 700 }}>
                {g.ok ? "✓" : "✗"}
              </span>
              <span>{g.t}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 20px", background: "#fff", borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div onClick={() => onNavigate("登録完了")}>
          <Btn>登録を完了する</Btn>
        </div>
      </div>
    </>
  );
}

// ==========================================================================
// 8. 登録完了
// ==========================================================================

function ScreenComplete({ onNavigate, setLoggedIn }) {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "40px 24px",
      background: `linear-gradient(180deg, #FFE5DA 0%, ${BG_CARD} 60%)`,
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: 40, background: ACCENT,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 36, color: "#fff", marginBottom: 24,
        boxShadow: "0 8px 24px rgba(232,89,60,0.3)",
      }}>✓</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: TEXT, marginBottom: 8 }}>
        登録完了！
      </div>
      <div style={{ fontSize: 13, color: TEXT_SUB, textAlign: "center", lineHeight: 1.7, marginBottom: 32 }}>
        プロフィール登録が完了しました。<br />
        企業からのスカウトを待ちましょう。<br />
        気になる求人にも応募できます。
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
        <div onClick={() => { setLoggedIn(true); onNavigate("スカウト一覧"); }}>
          <Btn>スカウトを確認する</Btn>
        </div>
        <div onClick={() => { setLoggedIn(true); onNavigate("求人一覧"); }}>
          <Btn outline>求人を探す</Btn>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 9. スカウト一覧 (t_apply ステータス=スカウト)
// ==========================================================================

function ScreenScoutList({ onNavigate, loggedIn }) {
  const scouts = [
    { co: "サンプル買取センター", role: "査定スタッフ", msg: "整備のご経験を拝見しスカウトしました。ぜひ一度お話を...", date: "本日", unread: true },
    { co: "ABC自動車販売", role: "店舗営業", msg: "営業のご経験を活かせる環境です。お話できればと...", date: "1日前", unread: true },
    { co: "MOTA整備工場", role: "整備スタッフ", msg: "資格と経験を高く評価しスカウトをお送りしました。", date: "3日前", unread: false },
    { co: "クルマ買取王", role: "買取査定士", msg: "AI面談を拝見しました。一度直接お話できればと...", date: "5日前", unread: false },
  ];
  const unread = scouts.filter(s => s.unread).length;
  return (
    <>
      <Header title="スカウト" right={
        unread > 0 ? <Tag color="orange" small>未読 {unread}</Tag> : null
      } />
      <div style={{ flex: 1, overflow: "auto", background: BG }}>
        {scouts.map((s, i) => (
          <div key={i} onClick={() => onNavigate("スカウト詳細")} style={{
            background: "#fff", padding: "14px 16px",
            borderBottom: `1px solid ${BORDER}`, cursor: "pointer",
            display: "flex", gap: 10,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 8,
              background: "#F1EFE8", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0,
            }}>🚗</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: 2,
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>{s.co}</span>
                <span style={{ fontSize: 10, color: TEXT_MUTE }}>{s.date}</span>
              </div>
              <div style={{ fontSize: 11, color: TEXT_SUB, marginBottom: 4 }}>{s.role}</div>
              <div style={{
                fontSize: 11, color: TEXT, lineHeight: 1.5,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>{s.msg}</div>
            </div>
            {s.unread && (
              <div style={{
                width: 8, height: 8, borderRadius: 4, background: ACCENT,
                marginTop: 6, flexShrink: 0,
              }} />
            )}
          </div>
        ))}
      </div>
      <BottomNav active="スカウト一覧" onNavigate={onNavigate} loggedIn={loggedIn} />
    </>
  );
}

// ==========================================================================
// 10. スカウト詳細
// ==========================================================================

function ScreenScoutDetail({ onNavigate, loggedIn }) {
  return (
    <>
      <Header title="スカウト詳細" onBack={() => onNavigate("スカウト一覧")} />
      <div style={{ flex: 1, overflow: "auto", background: BG }}>
        {/* Company header */}
        <div style={{ background: "#fff", padding: "20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 8,
              background: "#F1EFE8", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 24,
            }}>🚗</div>
            <div>
              <div style={{ fontSize: 11, color: TEXT_SUB }}>サンプル買取センター</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>査定スタッフ</div>
            </div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: ACCENT }}>
            月給 28万円〜
          </div>
        </div>

        {/* Scout message */}
        <div style={{ padding: 16 }}>
          <Section title="📩 スカウトメッセージ">
            <div style={{ marginBottom: 8 }}>
              山田 拓海 様<br /><br />
              はじめまして、サンプル買取センターの採用担当です。
              整備のご経験を拝見し、当社の査定スタッフとしてぜひお話を伺いたくスカウトをお送りしました。
              技術を活かしながらお客様対応にも携われる環境です。
              ご検討いただけますと幸いです。
            </div>
          </Section>
          <Section title="💼 求人内容">
            車の査定業務 / 千葉県市川市 / 月給28万〜 / 未経験OK / 資格手当
          </Section>
        </div>
      </div>
      {/* CTA: 応募保留・お断り */}
      <div style={{
        padding: "12px 16px", background: "#fff", borderTop: `1px solid ${BORDER}`,
        flexShrink: 0, display: "flex", gap: 8,
      }}>
        <div style={{ flex: 1 }} onClick={() => onNavigate("応募保留・お断り")}>
          <Btn outline>保留・お断り</Btn>
        </div>
        <div style={{ flex: 1.6 }}>
          <Btn>応募する</Btn>
        </div>
      </div>
    </>
  );
}

// ==========================================================================
// 11. 応募保留・お断り
// ==========================================================================

function ScreenDecline({ onNavigate }) {
  const [mode, setMode] = useState("hold"); // "hold" or "decline"
  const reasons = mode === "hold"
    ? ["他の求人も見たい", "もう少し検討したい", "条件を再確認したい", "その他"]
    : ["希望条件と合わない", "別の求人で進めている", "今は転職を考えていない", "勤務地が合わない", "その他"];
  return (
    <>
      <Header title="保留・お断り" onBack={() => onNavigate("スカウト詳細")} />
      <div style={{ flex: 1, overflow: "auto", padding: "16px 20px" }}>
        {/* Mode toggle */}
        <div style={{
          display: "flex", background: "#F1EFE8", borderRadius: 8, padding: 3,
          marginBottom: 16,
        }}>
          {[
            { id: "hold", label: "保留する", desc: "後で検討" },
            { id: "decline", label: "お断りする", desc: "応募しない" },
          ].map(m => (
            <div key={m.id} onClick={() => setMode(m.id)} style={{
              flex: 1, padding: "8px 4px", borderRadius: 6, textAlign: "center",
              cursor: "pointer",
              background: mode === m.id ? "#fff" : "transparent",
              boxShadow: mode === m.id ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
            }}>
              <div style={{
                fontSize: 13, fontWeight: 700,
                color: mode === m.id ? (m.id === "decline" ? "#C44529" : ACCENT) : TEXT_SUB,
              }}>{m.label}</div>
              <div style={{ fontSize: 10, color: TEXT_SUB, marginTop: 2 }}>{m.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginBottom: 8 }}>
          理由を教えてください {mode === "decline" && <Tag small color="gray">任意</Tag>}
        </div>
        {reasons.map((r, i) => (
          <div key={i} style={{
            background: "#fff", border: `1px solid ${BORDER}`,
            borderRadius: 8, padding: "12px 14px", marginBottom: 6,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            cursor: "pointer", fontSize: 13, color: TEXT,
          }}>
            <span>{r}</span>
            <span style={{
              width: 16, height: 16, borderRadius: 8,
              border: `1.5px solid ${i === 0 ? ACCENT : "#D3D1C7"}`,
              background: i === 0 ? ACCENT : "#fff",
            }} />
          </div>
        ))}

        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, marginBottom: 6 }}>
            企業へのコメント（任意）
          </div>
          <div style={{
            minHeight: 70, padding: 10, borderRadius: 6,
            background: "#fff", border: `1px solid ${BORDER}`,
            fontSize: 11, color: TEXT_MUTE, lineHeight: 1.6,
          }}>
            {mode === "hold"
              ? "ご連絡ありがとうございます。少しお時間をいただきたく..."
              : "ご縁があれば、また機会があればお願いいたします..."}
          </div>
        </div>
      </div>
      <div style={{ padding: "12px 20px", background: "#fff", borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div onClick={() => onNavigate("スカウト一覧")}>
          <Btn color={mode === "decline" ? "danger" : "primary"} outline={mode === "decline"}>
            {mode === "hold" ? "保留して通知する" : "お断りを送信する"}
          </Btn>
        </div>
      </div>
    </>
  );
}

// ==========================================================================
// 12. 応募一覧 (t_apply ステータス != スカウト)
// ==========================================================================

function ScreenApplyList({ onNavigate, loggedIn }) {
  const [tab, setTab] = useState("all");
  const items = [
    { co: "ABC自動車販売", role: "店舗営業", status: "選考中", date: "2日前", from: "応募", color: "blue" },
    { co: "MOTA整備工場", role: "整備スタッフ", status: "書類確認", date: "5日前", from: "応募", color: "orange" },
    { co: "サンプル買取センター", role: "査定スタッフ", status: "応募済み", date: "1週間前", from: "スカウト→応募", color: "purple" },
    { co: "オートカーズ東京", role: "営業アシスタント", status: "保留中", date: "3日前", from: "スカウト→保留", color: "gray" },
    { co: "クルマ買取王", role: "買取査定士", status: "お断り", date: "2週間前", from: "スカウト→お断り", color: "red" },
  ];
  const tabs = [
    { id: "all", label: "すべて", n: items.length },
    { id: "active", label: "選考中", n: 2 },
    { id: "hold", label: "保留", n: 1 },
    { id: "closed", label: "終了", n: 2 },
  ];
  return (
    <>
      <Header title="応募一覧" />
      <div style={{
        display: "flex", background: "#fff", borderBottom: `1px solid ${BORDER}`,
        padding: "0 8px", flexShrink: 0,
      }}>
        {tabs.map(t => (
          <div key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "10px 12px", fontSize: 12, fontWeight: 700,
            color: tab === t.id ? ACCENT : TEXT_SUB, cursor: "pointer",
            borderBottom: tab === t.id ? `2px solid ${ACCENT}` : "2px solid transparent",
          }}>
            {t.label} <span style={{ fontSize: 10, fontWeight: 600 }}>({t.n})</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflow: "auto", background: BG, padding: "12px 16px" }}>
        {items.map((it, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: 10, padding: 14,
            marginBottom: 8, border: `1px solid ${BORDER}`, cursor: "pointer",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 6,
            }}>
              <Tag color={it.color}>{it.status}</Tag>
              <span style={{ fontSize: 10, color: TEXT_MUTE }}>{it.date}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{it.role}</div>
            <div style={{ fontSize: 11, color: TEXT_SUB, marginBottom: 6 }}>{it.co}</div>
            <div style={{ fontSize: 10, color: TEXT_MUTE }}>経路: {it.from}</div>
          </div>
        ))}
      </div>
      <BottomNav active="応募一覧" onNavigate={onNavigate} loggedIn={loggedIn} />
    </>
  );
}

// ==========================================================================
// 13. マイページ
// ==========================================================================

function ScreenMyPage({ onNavigate, loggedIn }) {
  const items = [
    { id: "アカウント編集", label: "アカウント編集", desc: "プロフィール・写真・Q&A", icon: "✏️" },
    { id: "利用規約", label: "利用規約", desc: "プライバシーポリシー含む", icon: "📄" },
    { id: "退会", label: "退会", desc: "アカウントを削除します", icon: "👋", danger: true },
  ];
  return (
    <>
      <Header title="マイページ" />
      <div style={{ flex: 1, overflow: "auto", background: BG }}>
        {/* Profile summary */}
        <div style={{ background: "#fff", padding: "20px 16px", display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{
            width: 64, height: 64, borderRadius: 32,
            background: `linear-gradient(135deg, #FFE5DA 0%, #F0EDFE 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 30, border: `1px solid ${BORDER}`,
          }}>🧑</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 2 }}>山田 拓海</div>
            <div style={{ fontSize: 11, color: TEXT_SUB, marginBottom: 6 }}>千葉県市川市 / 28歳</div>
            <div style={{ display: "flex", gap: 4 }}>
              <Tag color="green" small>プロフィール完成</Tag>
              <Tag color="orange" small>動画あり</Tag>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", background: "#fff", borderTop: `1px solid ${BORDER}`,
          padding: "14px 0", marginBottom: 8,
        }}>
          {[
            { l: "受信スカウト", v: "12", c: ACCENT },
            { l: "応募中", v: "3", c: "#2A5BD7" },
            { l: "保存求人", v: "8", c: "#1F8043" },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center",
              borderRight: i === 2 ? "none" : `1px solid ${BORDER}`,
            }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 10, color: TEXT_SUB, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div style={{ background: "#fff" }}>
          {items.map((it, i) => (
            <div key={it.id} onClick={() => onNavigate(it.id)} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 16px",
              borderBottom: i === items.length - 1 ? "none" : `1px solid ${BORDER}`,
              cursor: "pointer",
            }}>
              <span style={{ fontSize: 18 }}>{it.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 14, fontWeight: 600,
                  color: it.danger ? "#C44529" : TEXT,
                }}>{it.label}</div>
                <div style={{ fontSize: 11, color: TEXT_SUB }}>{it.desc}</div>
              </div>
              <span style={{ fontSize: 14, color: "#D3D1C7" }}>›</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div style={{ padding: "16px" }}>
          <Btn outline>ログアウト</Btn>
        </div>

        <div style={{ textAlign: "center", padding: "12px 0 20px", fontSize: 10, color: TEXT_MUTE }}>
          MOTA Work v0.1.0
        </div>
      </div>
      <BottomNav active="マイページ" onNavigate={onNavigate} loggedIn={loggedIn} />
    </>
  );
}

// ==========================================================================
// 14. アカウント編集
// ==========================================================================

function ScreenAccountEdit({ onNavigate }) {
  const sections = [
    { id: "basic", title: "基本情報", desc: "氏名・メアド・住所など", icon: "👤" },
    { id: "qa", title: "Q&A回答", desc: "3問の回答を編集", icon: "💬" },
    { id: "photo", title: "プロフィール写真", desc: "写真の差し替え", icon: "📷" },
    { id: "video", title: "自己紹介動画", desc: "動画の追加・差し替え", icon: "🎥" },
    { id: "notif", title: "通知設定", desc: "メール・プッシュ通知", icon: "🔔" },
    { id: "pw", title: "パスワード変更", desc: "", icon: "🔒" },
  ];
  return (
    <>
      <Header title="アカウント編集" onBack={() => onNavigate("マイページ")} />
      <div style={{ flex: 1, overflow: "auto", background: BG }}>
        <div style={{ background: "#fff", marginTop: 8 }}>
          {sections.map((s, i) => (
            <div key={s.id} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 16px",
              borderBottom: i === sections.length - 1 ? "none" : `1px solid ${BORDER}`,
              cursor: "pointer",
            }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{s.title}</div>
                {s.desc && <div style={{ fontSize: 11, color: TEXT_SUB }}>{s.desc}</div>}
              </div>
              <span style={{ fontSize: 14, color: "#D3D1C7" }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ==========================================================================
// 15. 利用規約
// ==========================================================================

function ScreenTerms({ onNavigate }) {
  return (
    <>
      <Header title="利用規約" onBack={() => onNavigate("マイページ")} />
      <div style={{ flex: 1, overflow: "auto", padding: "20px 24px", background: "#fff" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginBottom: 6 }}>
          MOTA Work 利用規約
        </div>
        <div style={{ fontSize: 10, color: TEXT_SUB, marginBottom: 20 }}>
          最終更新日: 2026年5月1日
        </div>

        {[
          { t: "第1条 (適用)", b: "本規約は、MOTA株式会社（以下「当社」）が提供する求職者向けサービス「MOTA Work」（以下「本サービス」）の利用条件を定めるものです。" },
          { t: "第2条 (登録)", b: "本サービスの利用を希望する方は、当社の定める方法により登録を申請するものとします。当社が登録を承認した時点で、利用契約が成立します。" },
          { t: "第3条 (個人情報)", b: "当社は、利用者の個人情報を当社のプライバシーポリシーに従い適切に取り扱います。提供されたプロフィール情報は、企業へのスカウト機能のために利用されます。" },
          { t: "第4条 (禁止事項)", b: "利用者は、虚偽の情報の登録、他者へのなりすまし、当社サービスの運営を妨害する行為などを行ってはなりません。" },
          { t: "第5条 (退会)", b: "利用者は、当社所定の手続きによりいつでも退会することができます。退会後はアカウント情報は削除されます。" },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 4 }}>{s.t}</div>
            <div style={{ fontSize: 11, color: TEXT_SUB, lineHeight: 1.7 }}>{s.b}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ==========================================================================
// 16. 退会
// ==========================================================================

function ScreenWithdraw({ onNavigate }) {
  return (
    <>
      <Header title="退会" onBack={() => onNavigate("マイページ")} />
      <div style={{ flex: 1, overflow: "auto", padding: "20px 20px", background: BG }}>
        <div style={{
          background: "#FFF3ED", border: `1px solid #FAD4C5`,
          borderRadius: 8, padding: 14, marginBottom: 16,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#C44529", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
            ⚠️ 退会前にご確認ください
          </div>
          <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.7 }}>
            ・登録情報・プロフィール写真・Q&A回答はすべて削除されます<br />
            ・進行中のスカウト・応募はキャンセル扱いとなります<br />
            ・同じメールアドレスでの再登録は30日後から可能です
          </div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginBottom: 8 }}>
          退会理由を教えてください（任意）
        </div>
        {["希望の仕事が見つからなかった", "他のサービスを使うことにした", "転職活動を終えた", "サービスが使いにくかった", "その他"].map((r, i) => (
          <div key={i} style={{
            background: "#fff", border: `1px solid ${BORDER}`,
            borderRadius: 8, padding: "12px 14px", marginBottom: 6,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            cursor: "pointer", fontSize: 13, color: TEXT,
          }}>
            <span>{r}</span>
            <span style={{
              width: 16, height: 16, borderRadius: 8,
              border: `1.5px solid #D3D1C7`, background: "#fff",
            }} />
          </div>
        ))}
      </div>
      <div style={{
        padding: "12px 20px", background: "#fff", borderTop: `1px solid ${BORDER}`,
        flexShrink: 0, display: "flex", gap: 8,
      }}>
        <div style={{ flex: 1 }} onClick={() => onNavigate("マイページ")}>
          <Btn outline>キャンセル</Btn>
        </div>
        <div style={{ flex: 1 }}>
          <Btn color="danger" outline>退会する</Btn>
        </div>
      </div>
    </>
  );
}

// ==========================================================================
// MAIN APP
// ==========================================================================

const SCREEN_MAP = {
  "CSホーム":          ScreenCSHome,
  "求人一覧":          ScreenJobList,
  "求人詳細":          ScreenJobDetail,
  "基本情報":          ScreenBasicInfo,
  "設問Q&A":           ScreenQA,
  "敬語変換確認":      ScreenKeigoReview,
  "PHOTO":             ScreenPhoto,
  "登録完了":          ScreenComplete,
  "スカウト一覧":      ScreenScoutList,
  "スカウト詳細":      ScreenScoutDetail,
  "応募保留・お断り":  ScreenDecline,
  "応募一覧":          ScreenApplyList,
  "マイページ":        ScreenMyPage,
  "アカウント編集":    ScreenAccountEdit,
  "利用規約":          ScreenTerms,
  "退会":              ScreenWithdraw,
};

export default function CSFlow() {
  const [current, setCurrent] = useState("CSホーム");
  const [phase, setPhase] = useState("ログイン前");
  const [loggedIn, setLoggedIn] = useState(false);
  const ScreenComponent = SCREEN_MAP[current];

  const navigate = (s) => {
    setCurrent(s);
    for (const [p, screens] of Object.entries(PHASES)) {
      if (screens.includes(s)) { setPhase(p); break; }
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: BG,
      fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
    }}>
      {/* Phase tabs */}
      <div style={{
        display: "flex", gap: 8, padding: "16px 16px 8px",
        flexWrap: "wrap", justifyContent: "center",
      }}>
        {Object.entries(PHASES).map(([p, screens]) => (
          <button key={p} onClick={() => { setPhase(p); setCurrent(screens[0]); }} style={{
            padding: "6px 16px", borderRadius: 20, border: "none",
            background: phase === p ? ACCENT : "#fff",
            color: phase === p ? "#fff" : TEXT_SUB,
            fontSize: 13, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}>{p}</button>
        ))}
      </div>

      {/* Screen tabs */}
      <div style={{
        display: "flex", gap: 4, padding: "4px 16px 12px",
        overflowX: "auto", justifyContent: "center", flexWrap: "wrap",
      }}>
        {PHASES[phase].map(s => (
          <button key={s} onClick={() => setCurrent(s)} style={{
            padding: "5px 11px", borderRadius: 6, border: "none",
            background: current === s ? "#1a1a1a" : "transparent",
            color: current === s ? "#fff" : TEXT_SUB,
            fontSize: 11, fontWeight: current === s ? 700 : 500,
            cursor: "pointer", whiteSpace: "nowrap",
          }}>{s}</button>
        ))}
      </div>

      {/* Login state toggle */}
      <div style={{
        textAlign: "center", paddingBottom: 12, fontSize: 11, color: TEXT_SUB,
      }}>
        ログイン状態:
        <span onClick={() => setLoggedIn(!loggedIn)} style={{
          marginLeft: 8, padding: "3px 10px", borderRadius: 12,
          background: loggedIn ? "#EAF7EE" : "#F1EFE8",
          color: loggedIn ? "#1F8043" : TEXT_SUB,
          fontWeight: 700, cursor: "pointer", border: `1px solid ${loggedIn ? "#C7E9D2" : "#E8E6E1"}`,
        }}>
          {loggedIn ? "✓ ログイン中" : "未ログイン"}
        </span>
      </div>

      {/* Phone */}
      <div style={{ display: "flex", justifyContent: "center", paddingBottom: 32 }}>
        <Phone>
          <ScreenComponent
            onNavigate={navigate}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </Phone>
      </div>
    </div>
  );
}
