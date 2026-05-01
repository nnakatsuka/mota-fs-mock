import { useState } from "react";

// ==========================================================================
// MOTA Work — TOP (LP) ページ
// マイナビエージェントLP (https://mynavi-agent.jp/lp/013.html) の構成をベース
// 除外: 企業ロゴ / 転職事例
// ==========================================================================

const ACCENT = "#E8593C";
const ACCENT_DARK = "#C44529";
const ACCENT_LIGHT = "#FFF3ED";
const NAVY = "#1F3554";       // タイトル等の濃色
const BG = "#F0EFEB";
const BG_CARD = "#FAFAF8";
const BORDER = "#E8E6E1";
const TEXT = "#1a1a1a";
const TEXT_SUB = "#5F5E5A";
const TEXT_MUTE = "#B4B2A9";

// ==========================================================================
// Reusable
// ==========================================================================

function Btn({ children, large, secondary, full = true, onClick, sub }) {
  const styles = secondary
    ? { bg: "#fff", fg: ACCENT, bd: ACCENT, hover: "#FFF8F4" }
    : { bg: ACCENT, fg: "#fff", bd: ACCENT, hover: ACCENT_DARK };
  return (
    <button onClick={onClick} style={{
      width: full ? "100%" : "auto",
      height: large ? 56 : 46,
      padding: full ? 0 : "0 28px",
      borderRadius: large ? 28 : 8,
      border: `2px solid ${styles.bd}`,
      background: styles.bg, color: styles.fg,
      fontSize: large ? 16 : 14, fontWeight: 800, letterSpacing: 0.5,
      cursor: "pointer", display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center",
      boxShadow: secondary ? "none" : "0 4px 12px rgba(232,89,60,0.25)",
      transition: "background 0.12s, transform 0.1s",
    }}
    onMouseEnter={e => e.currentTarget.style.background = styles.hover}
    onMouseLeave={e => e.currentTarget.style.background = styles.bg}>
      <span>{children}</span>
      {sub && (
        <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.85, marginTop: 1 }}>
          {sub}
        </span>
      )}
    </button>
  );
}

function SectionTitle({ kicker, children, dark }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 24 }}>
      {kicker && (
        <div style={{
          fontSize: 11, fontWeight: 800, color: ACCENT, letterSpacing: 2,
          marginBottom: 6,
        }}>{kicker}</div>
      )}
      <div style={{
        fontSize: 22, fontWeight: 800, color: dark ? "#fff" : NAVY,
        lineHeight: 1.45, letterSpacing: 0.5,
      }}>{children}</div>
      <div style={{
        width: 32, height: 3, background: ACCENT,
        margin: "12px auto 0", borderRadius: 2,
      }} />
    </div>
  );
}

// ==========================================================================
// Phone frame
// ==========================================================================

function Phone({ children }) {
  return (
    <div style={{
      width: 390, height: 800,
      background: "#fff",
      borderRadius: 36, border: "8px solid #1a1a1a",
      overflow: "hidden", display: "flex", flexDirection: "column",
      boxShadow: "0 24px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.05)",
      position: "relative",
      fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
    }}>
      {/* Status bar */}
      <div style={{
        height: 44, background: "#fff", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        padding: "0 22px", fontSize: 13, fontWeight: 700, color: TEXT,
        flexShrink: 0,
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
// 1. Header (固定)
// ==========================================================================

function LPHeader({ onLogin }) {
  return (
    <div style={{
      height: 50, background: "#fff", borderBottom: `1px solid ${BORDER}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 16px", flexShrink: 0,
      position: "sticky", top: 0, zIndex: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: ACCENT, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 14,
        }}>M</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: NAVY, lineHeight: 1.1 }}>MOTA Work</div>
          <div style={{ fontSize: 9, color: TEXT_SUB, lineHeight: 1.1, marginTop: 1 }}>
            写真と動画で出会う、新しい仕事探し
          </div>
        </div>
      </div>
      <div onClick={onLogin} style={{
        fontSize: 11, color: NAVY, fontWeight: 700, cursor: "pointer",
        padding: "6px 12px", border: `1px solid ${BORDER}`, borderRadius: 6,
      }}>ログイン</div>
    </div>
  );
}

// ==========================================================================
// 2. ファーストビュー (Hero)
// ==========================================================================

function HeroSection({ onRegister }) {
  return (
    <div style={{
      background: `linear-gradient(160deg, #FFE5DA 0%, #FFF3ED 50%, #F0EDFE 100%)`,
      padding: "32px 24px 28px",
      position: "relative", overflow: "hidden",
    }}>
      {/* 装飾ドット */}
      <div style={{
        position: "absolute", top: -20, right: -20, width: 120, height: 120,
        borderRadius: 60, background: "rgba(232,89,60,0.08)",
      }} />
      <div style={{
        position: "absolute", bottom: -30, left: -30, width: 100, height: 100,
        borderRadius: 50, background: "rgba(83,74,183,0.08)",
      }} />

      {/* キャッチタグ */}
      <div style={{
        display: "inline-block", padding: "4px 12px",
        background: "#fff", borderRadius: 20, fontSize: 10, fontWeight: 800,
        color: ACCENT, letterSpacing: 1, marginBottom: 16,
        border: `1px solid ${ACCENT}`,
      }}>
        ノンデスクワーカー専用 採用プラットフォーム
      </div>

      {/* メインキャッチ */}
      <div style={{
        fontSize: 26, fontWeight: 900, color: NAVY,
        lineHeight: 1.4, letterSpacing: -0.5, marginBottom: 12,
        position: "relative", zIndex: 1,
      }}>
        履歴書、<span style={{ color: ACCENT }}>無し</span>。<br/>
        設問<span style={{
          color: ACCENT, fontSize: 36,
        }}>3問</span>で簡単応募。<br/>
        企業から<span style={{
          background: `linear-gradient(transparent 60%, #FFE5DA 60%)`,
        }}>スカウトが来る。</span>
      </div>

      {/* サブコピー */}
      <div style={{
        fontSize: 12, color: TEXT_SUB, lineHeight: 1.7, marginBottom: 24,
        position: "relative", zIndex: 1,
      }}>
        職務経歴書も志望動機もいらない。<br/>
        Q&A 3問とプロフィール写真だけで、あなたに合う仕事が見つかります。
      </div>

      {/* CTA */}
      <div onClick={onRegister} style={{ position: "relative", zIndex: 1 }}>
        <Btn large sub="所要時間 約30秒">
          無料で会員登録する ›
        </Btn>
      </div>

      {/* 補足 */}
      <div style={{
        textAlign: "center", marginTop: 12, fontSize: 10, color: TEXT_SUB,
        position: "relative", zIndex: 1,
      }}>
        ✓ 完全無料 ✓ 履歴書不要 ✓ 1分で登録完了
      </div>
    </div>
  );
}

// ==========================================================================
// 3. 数字で見るMOTA
// ==========================================================================

function NumbersSection() {
  const stats = [
    { v: "12", u: "万人", l: "登録求職者数", note: "20〜30代を中心に" },
    { v: "8,500", u: "件", l: "掲載求人数", note: "幅広い職種" },
    { v: "2.4", u: "日", l: "平均スカウト\n受信日数", note: "登録から最初のスカウトまで" },
    { v: "78", u: "%", l: "スカウト応諾率", note: "AI面談動画ありの場合" },
  ];
  return (
    <div style={{ background: "#fff", padding: "36px 20px" }}>
      <SectionTitle kicker="NUMBERS">
        数字で見る MOTA Work
      </SectionTitle>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: BG_CARD, borderRadius: 12, padding: "16px 12px",
            textAlign: "center", border: `1px solid ${BORDER}`,
          }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 2 }}>
              <span style={{
                fontSize: 30, fontWeight: 900, color: ACCENT,
                letterSpacing: -1, lineHeight: 1,
              }}>{s.v}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: ACCENT }}>{s.u}</span>
            </div>
            <div style={{
              fontSize: 11, fontWeight: 700, color: NAVY,
              marginTop: 6, lineHeight: 1.4, whiteSpace: "pre-line",
            }}>{s.l}</div>
            <div style={{ fontSize: 9, color: TEXT_SUB, marginTop: 3 }}>{s.note}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 9, color: TEXT_MUTE, textAlign: "center", marginTop: 12 }}>
        ※2026年4月時点 / 自社調べ
      </div>
    </div>
  );
}

// ==========================================================================
// 4. サービスの3つの特徴
// ==========================================================================

function FeaturesSection() {
  const features = [
    {
      no: "01",
      icon: "📄",
      title: "履歴書、職務経歴書 不要",
      desc: "面倒な書類作成は一切なし。プロフィール登録は最短30秒で完了します。氏名・住所・経歴は選択式で入力するだけ。",
      points: ["書類作成 0分", "選択式入力で簡単", "下書き保存OK"],
    },
    {
      no: "02",
      icon: "💬",
      title: "Q&A 3問で自己PR",
      desc: "ため口でも大丈夫。AIが自動で敬語に変換します。志望動機を考えなくても、あなたらしさが企業に伝わります。",
      points: ["ため口でOK", "AIが敬語変換", "修正もカンタン"],
    },
    {
      no: "03",
      icon: "📩",
      title: "企業からスカウトが届く",
      desc: "あなたが応募する手間はなし。プロフィールを見た企業から直接スカウトが届きます。気になる企業だけ返信すればOK。",
      points: ["待つだけ採用", "最短即日でスカウト", "ピンと来たものだけ返信"],
    },
  ];
  return (
    <div style={{ padding: "36px 20px", background: BG }}>
      <SectionTitle kicker="FEATURES">
        MOTA Work の3つの特徴
      </SectionTitle>

      {features.map((f, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 14, padding: "20px 18px",
          marginBottom: 12, border: `1px solid ${BORDER}`,
          position: "relative", overflow: "hidden",
        }}>
          {/* 番号 (背景の透かし) */}
          <div style={{
            position: "absolute", top: -8, right: 8,
            fontSize: 64, fontWeight: 900, color: ACCENT_LIGHT,
            letterSpacing: -2, lineHeight: 1,
          }}>{f.no}</div>

          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 10,
            position: "relative",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 22,
              background: ACCENT_LIGHT, display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 22, flexShrink: 0,
            }}>{f.icon}</div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: ACCENT, letterSpacing: 1 }}>
                POINT {f.no}
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, lineHeight: 1.3 }}>
                {f.title}
              </div>
            </div>
          </div>

          <div style={{
            fontSize: 12, color: TEXT_SUB, lineHeight: 1.7, marginBottom: 12,
          }}>{f.desc}</div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {f.points.map(p => (
              <div key={p} style={{
                fontSize: 10, fontWeight: 700, color: ACCENT,
                padding: "4px 10px", background: ACCENT_LIGHT,
                borderRadius: 12, border: `1px solid #FAD4C5`,
              }}>✓ {p}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================================================
// 5. 利用者の声 (テキストのみ・転職事例なし)
// ==========================================================================

function VoicesSection() {
  const voices = [
    {
      avatar: "🧑‍🔧",
      attr: "20代男性 / 整備士",
      title: "履歴書を書かずに済んだ",
      body: "前職を辞めてから3社の転職サービスを使ったけど、履歴書も職務経歴書も書かなくていいのはMOTAだけ。Q&Aもため口で書いて、AIが自動で敬語に直してくれるから本当にラクでした。",
    },
    {
      avatar: "👨‍💼",
      attr: "30代男性 / 元・販売職",
      title: "登録3日で5件のスカウト",
      body: "プロフィール写真と動画を載せたら、登録した翌日からスカウトが来始めました。自分から探さなくても向こうから来てくれるのが新鮮で、選ぶ楽しさがありました。",
    },
    {
      avatar: "👩",
      attr: "20代女性 / 元・接客",
      title: "人柄を見てもらえた",
      body: "学歴やスキルだけで判断されるのが嫌でしたが、MOTAは動画とQ&Aで自分の人柄を伝えられたので、面接前から「会いたい」と言ってもらえる企業に出会えました。",
    },
  ];
  return (
    <div style={{ padding: "36px 20px", background: "#fff" }}>
      <SectionTitle kicker="VOICES">
        利用者の声
      </SectionTitle>

      {voices.map((v, i) => (
        <div key={i} style={{
          background: BG_CARD, borderRadius: 12, padding: "16px 16px",
          marginBottom: 10, border: `1px solid ${BORDER}`,
          position: "relative",
        }}>
          {/* 引用マーク */}
          <div style={{
            position: "absolute", top: 8, right: 14,
            fontSize: 36, fontWeight: 900, color: ACCENT_LIGHT,
            lineHeight: 1, fontFamily: "Georgia, serif",
          }}>"</div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 20,
              background: `linear-gradient(135deg, #FFE5DA 0%, #F0EDFE 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, flexShrink: 0,
            }}>{v.avatar}</div>
            <div>
              <div style={{ fontSize: 10, color: TEXT_SUB }}>{v.attr}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, lineHeight: 1.3 }}>
                {v.title}
              </div>
            </div>
          </div>
          <div style={{
            fontSize: 11, color: TEXT, lineHeight: 1.75,
          }}>{v.body}</div>
          {/* ★評価 */}
          <div style={{ marginTop: 8, fontSize: 12, color: "#F4B400" }}>
            ★★★★★
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================================================
// 6. ご利用の流れ (STEP)
// ==========================================================================

function StepsSection({ onRegister }) {
  const steps = [
    { n: "01", t: "会員登録", d: "メールアドレスと基本情報を入力。約30秒で完了。", icon: "✏️" },
    { n: "02", t: "プロフィール作成", d: "Q&A 3問とプロフィール写真を登録。AIが敬語に変換。", icon: "📝" },
    { n: "03", t: "スカウト受信", d: "プロフィールを見た企業からスカウトメッセージが届きます。", icon: "📩" },
    { n: "04", t: "応募・面接", d: "気になるスカウトに返信。あとは企業と直接やりとり。", icon: "🤝" },
  ];
  return (
    <div style={{
      padding: "40px 20px", background: NAVY,
      backgroundImage: "linear-gradient(180deg, #1F3554 0%, #2A4670 100%)",
    }}>
      <SectionTitle kicker="HOW IT WORKS" dark>
        ご利用の流れ
      </SectionTitle>

      <div style={{ position: "relative" }}>
        {/* 縦線 */}
        <div style={{
          position: "absolute", left: 27, top: 30, bottom: 30,
          width: 2, background: "rgba(255,255,255,0.15)",
        }} />

        {steps.map((s, i) => (
          <div key={i} style={{
            display: "flex", gap: 14, marginBottom: i === steps.length - 1 ? 0 : 16,
            position: "relative",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 28,
              background: ACCENT, color: "#fff",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              flexShrink: 0, position: "relative", zIndex: 1,
              boxShadow: "0 4px 12px rgba(232,89,60,0.4)",
            }}>
              <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1, opacity: 0.9 }}>STEP</span>
              <span style={{ fontSize: 16, fontWeight: 900 }}>{s.n}</span>
            </div>
            <div style={{
              flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 10,
              padding: "12px 14px", border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 6, marginBottom: 4,
              }}>
                <span style={{ fontSize: 16 }}>{s.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{s.t}</span>
              </div>
              <div style={{
                fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.6,
              }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 中間CTA */}
      <div style={{ marginTop: 24 }} onClick={onRegister}>
        <Btn large>
          まずは無料で登録してみる ›
        </Btn>
      </div>
    </div>
  );
}

// ==========================================================================
// 7. よくある質問 (FAQ)
// ==========================================================================

function FAQSection() {
  const [open, setOpen] = useState(0);
  const faqs = [
    {
      q: "本当に無料で利用できますか？",
      a: "はい、求職者の方はすべての機能を完全無料でご利用いただけます。登録料・応募料・成約手数料など、一切お金はかかりません。",
    },
    {
      q: "学歴や職歴に自信がないのですが、大丈夫ですか？",
      a: "ご安心ください。MOTA Workは履歴書ベースではなく、Q&Aと写真でご自身の人柄を伝えるサービスです。学歴・職歴は一要素に過ぎず、人柄や意欲を重視する企業が多数登録しています。",
    },
    {
      q: "どんな職種・業界の求人がありますか？",
      a: "車関連業界を中心に、外食・小売・介護・建設・整備など、幅広い職種を扱っています。20〜30代の正社員求人を多数掲載しており、未経験OKの求人も豊富です。",
    },
    {
      q: "スカウトが届かなかった場合は？",
      a: "プロフィール写真や動画、Q&A回答を充実させることで、スカウト受信率が大きく上がります。動画ありのプロフィールは、無しのプロフィールに比べて約3倍のスカウト数となっています。",
    },
    {
      q: "知り合いの会社にバレずに利用できますか？",
      a: "はい。プロフィールを「特定の企業に非公開」に設定することができます。現職や知人の勤務先からプロフィールが見えないように設定可能です。",
    },
    {
      q: "退会はいつでもできますか？",
      a: "はい、マイページからいつでも退会手続きが可能です。退会後はプロフィール情報・写真・Q&A回答などすべてのデータが削除されます。",
    },
  ];
  return (
    <div style={{ padding: "36px 20px", background: BG }}>
      <SectionTitle kicker="FAQ">
        よくあるご質問
      </SectionTitle>

      {faqs.map((f, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 8,
          marginBottom: 6, border: `1px solid ${BORDER}`, overflow: "hidden",
        }}>
          <div onClick={() => setOpen(open === i ? -1 : i)} style={{
            padding: "14px 16px", display: "flex", gap: 10,
            alignItems: "flex-start", cursor: "pointer",
          }}>
            <span style={{
              fontSize: 14, fontWeight: 900, color: ACCENT, flexShrink: 0,
              fontFamily: "Georgia, serif",
            }}>Q.</span>
            <div style={{
              flex: 1, fontSize: 12, fontWeight: 700, color: NAVY, lineHeight: 1.5,
            }}>{f.q}</div>
            <span style={{
              fontSize: 12, color: TEXT_SUB, flexShrink: 0,
              transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}>▼</span>
          </div>
          {open === i && (
            <div style={{
              padding: "0 16px 16px 36px", display: "flex", gap: 10,
              borderTop: `1px solid ${BORDER}`, paddingTop: 12,
              background: BG_CARD,
            }}>
              <span style={{
                fontSize: 14, fontWeight: 900, color: TEXT_SUB, flexShrink: 0,
                marginLeft: -26, fontFamily: "Georgia, serif",
              }}>A.</span>
              <div style={{
                fontSize: 11, color: TEXT, lineHeight: 1.75,
              }}>{f.a}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ==========================================================================
// 8. 最終CTA
// ==========================================================================

function FinalCTA({ onRegister }) {
  return (
    <div style={{
      padding: "40px 24px", textAlign: "center",
      background: `linear-gradient(180deg, #FFE5DA 0%, #FFF3ED 100%)`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        fontSize: 11, fontWeight: 800, color: ACCENT, letterSpacing: 2, marginBottom: 8,
      }}>JOIN US</div>
      <div style={{
        fontSize: 22, fontWeight: 900, color: NAVY, lineHeight: 1.4, marginBottom: 12,
      }}>
        さあ、はじめよう。<br/>
        <span style={{ color: ACCENT }}>履歴書なし</span>の仕事探し。
      </div>
      <div style={{
        fontSize: 12, color: TEXT_SUB, lineHeight: 1.7, marginBottom: 24,
      }}>
        登録は約30秒。<br/>
        まずは気軽にスカウトを待ってみませんか？
      </div>

      <div onClick={onRegister} style={{ marginBottom: 12 }}>
        <Btn large sub="所要時間 約30秒">
          無料で会員登録する ›
        </Btn>
      </div>

      <div style={{ fontSize: 10, color: TEXT_SUB, marginBottom: 12 }}>
        既にアカウントをお持ちの方は <span style={{ color: ACCENT, fontWeight: 700 }}>ログイン</span>
      </div>

      {/* 安心要素 */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap",
        marginTop: 16, paddingTop: 16, borderTop: `1px solid rgba(0,0,0,0.06)`,
      }}>
        {[
          { i: "🔒", t: "SSL暗号化" },
          { i: "💯", t: "完全無料" },
          { i: "📱", t: "アプリ不要" },
        ].map(s => (
          <div key={s.t} style={{
            display: "flex", alignItems: "center", gap: 4,
            fontSize: 10, fontWeight: 700, color: TEXT_SUB,
          }}>
            <span style={{ fontSize: 12 }}>{s.i}</span>
            <span>{s.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================================================
// 9. Footer
// ==========================================================================

function Footer() {
  return (
    <div style={{
      background: "#1a1a1a", color: "rgba(255,255,255,0.7)",
      padding: "24px 20px", fontSize: 11,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 6,
          background: ACCENT, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 13,
        }}>M</div>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>MOTA Work</div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", marginBottom: 16 }}>
        {["利用規約", "プライバシーポリシー", "運営会社", "お問い合わせ", "採用情報"].map(l => (
          <span key={l} style={{ cursor: "pointer", fontSize: 10 }}>{l}</span>
        ))}
      </div>

      <div style={{
        fontSize: 9, color: "rgba(255,255,255,0.4)",
        paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)",
      }}>
        © 2026 MOTA Inc. All rights reserved.
      </div>
    </div>
  );
}

// ==========================================================================
// MAIN
// ==========================================================================

export default function TopLP() {
  const onRegister = () => alert("会員登録画面へ遷移します（モック）");
  const onLogin = () => alert("ログイン画面を開きます（モック）");

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
            background: "#1a1a1a", color: "#fff", fontSize: 10,
            fontWeight: 700, borderRadius: 4, letterSpacing: 1, marginBottom: 8,
          }}>F/S MOCK — TOP / LP</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            CSヒアリング用 / マイナビエージェントLP構成ベース<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※企業ロゴ・転職事例は除外、その他の要素は反映
            </span>
          </div>
        </div>

        <Phone>
          <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
            <LPHeader onLogin={onLogin} />
            <HeroSection onRegister={onRegister} />
            <NumbersSection />
            <FeaturesSection />
            <VoicesSection />
            <StepsSection onRegister={onRegister} />
            <FAQSection />
            <FinalCTA onRegister={onRegister} />
            <Footer />
          </div>
        </Phone>
      </div>
    </div>
  );
}
