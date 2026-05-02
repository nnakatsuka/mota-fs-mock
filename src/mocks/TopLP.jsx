import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";

const PRIMARY = "#3FB6E8";
const PRIMARY_DARK = "#059CDB";
const PRIMARY_LIGHT = "#A9E0F0";
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

const FEATURES = [
  {
    n: "01",
    title: "履歴書、職務経歴書 不要",
    desc: "面倒な書類作成は一切なし。プロフィール登録は最短30秒で完了します。氏名・住所・経歴は選択式で入力できます。",
    icon: "📄",
    chips: ["✓ 書類作成 0分", "✓ 選択式入力で簡単", "✓ 下書き保存OK"],
  },
  {
    n: "02",
    title: "Q&A 3問で自己PR",
    desc: "ため口でも大丈夫。AIが自動で敬語に変換します。3つの質問に答えるだけで、あなたらしさが企業に伝わります。",
    icon: "💬",
    chips: ["✓ ため口でOK", "✓ AIが敬語変換", "✓ 修正もカンタン"],
  },
  {
    n: "03",
    title: "企業からスカウトが届く",
    desc: "あなたが応募する手間はなし。プロフィールを見た企業から直接スカウトが届きます。気になる企業だけ返信すればOK。",
    icon: "📩",
    chips: ["✓ 待つだけで簡単", "✓ 自社採用でスカウト", "✓ ピンと来たものだけ返信"],
  },
];

const VOICES = [
  {
    name: "20代女性 / 飲食",
    title: "履歴書を書かずに済んだ",
    content: "前職を辞めてから3社の転職サービスを使ったけど、履歴書も職務経歴書も書かなくていいのはタップミーだけ。Q&Aもため口でOKで、AIが自動で敬語に直してくれるからラクでした。",
    avatar: "👩",
    rating: 5,
  },
  {
    name: "30代男性 / 介護",
    title: "登録3日で5件のスカウト",
    content: "プロフィール写真と動画を載せたら、登録した翌日からスカウトが3件来ました。自分から応募しなくても何社かから来てくれるので応募の手間が省けるし、選考もスムーズでした。",
    avatar: "👨",
    rating: 5,
  },
  {
    name: "20代女性 / 小売",
    title: "人柄を見てもらえた",
    content: "学歴やスキルだけで判断されるのが嫌だったけど、タップミー経由のQ&Aで自分の人柄を伝えられたのか、面接前から「いいな」と言ってもらえる企業に出会えました。",
    avatar: "👩‍🦰",
    rating: 5,
  },
];

const HOW_IT_WORKS = [
  { n: "01", icon: "📝", title: "プロフィール登録", desc: "基本情報とQ&A 3問を入力。AI敬語変換で安心。" },
  { n: "02", icon: "📩", title: "スカウト受信", desc: "プロフィールを見た企業からスカウトメッセージがメールで届きます。" },
  { n: "03", icon: "💼", title: "応募・面接", desc: "気になるスカウトに返信。あとは企業と直接やりとりへ。" },
  { n: "04", icon: "🎉", title: "採用・入社", desc: "おめでとうございます！正社員がんばってください！" },
];

const FAQS = [
  {
    q: "本当に無料で利用できますか？",
    a: "はい、求職者の方はすべての機能を完全無料でご利用いただけます。登録料・応募料・成約手数料など、一切お金はかかりません。",
  },
  {
    q: "学歴や経験に自信がないのですが、大丈夫ですか？",
    a: "もちろん大丈夫です。タップミーは履歴書ではなくQ&Aと写真で自分らしさをアピールできるサービス。学歴より「人柄」「やる気」を重視する企業が多数登録しています。",
  },
  {
    q: "どんな職種・業界の求人がありますか？",
    a: "車買取・整備・建設・介護・飲食・小売・アパレルなど、幅広い業界の正社員求人をご用意しています。",
  },
  {
    q: "スカウトが届かなかった場合は？",
    a: "プロフィールの充実度を高めることでスカウト率がUPします。写真の追加や、Q&Aの内容を見直すことをおすすめします。",
  },
  {
    q: "知り合いの会社にバレずに利用できますか？",
    a: "はい、現在の勤務先には公開されません。プロフィール公開範囲も自由に設定できます。",
  },
  {
    q: "退会はいつでもできますか？",
    a: "はい、マイページからいつでも退会できます。退会時にデータも削除されます。",
  },
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

function SectionLabel({ en, jp, light }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 16 }}>
      <div style={{
        fontSize: 11, fontWeight: 800,
        color: light ? PRIMARY_LIGHT : PRIMARY_DARK,
        letterSpacing: 4,
        marginBottom: 6,
      }}>{en}</div>
      <div style={{
        fontSize: 20, fontWeight: 900,
        color: light ? "#fff" : NAVY,
        letterSpacing: -0.5, lineHeight: 1.4,
      }}>{jp}</div>
      <div style={{
        width: 30, height: 3, borderRadius: 2,
        background: light ? PRIMARY : PRIMARY_DARK,
        margin: "8px auto 0",
      }} />
    </div>
  );
}

export default function TopLP() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const handleRegister = () => navigate("/register");

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
          }}>F/S MOCK — A. TOP / LP</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            CSホーム / ランディングページ<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※未登録でも閲覧可・スクロールで全セクション表示
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
              style={{ height: 38, objectFit: "contain", cursor: "pointer" }}
            />
            <button style={{
              padding: "6px 18px",
              background: "#fff", color: PRIMARY_DARK,
              border: `1.5px solid ${PRIMARY}`, borderRadius: 18,
              fontSize: 11, fontWeight: 700, cursor: "pointer",
              fontFamily: "inherit",
            }}>ログイン</button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>

            {/* ===== HERO (中央寄せ) ===== */}
            <div style={{
              padding: "32px 20px 40px",
              background: `linear-gradient(180deg, #E8F6FD 0%, #FFFFFF 100%)`,
              textAlign: "center",
            }}>
              {/* チップ */}
              <div style={{
                display: "inline-block",
                padding: "6px 14px",
                background: "#fff",
                border: `1.5px solid ${PRIMARY}`,
                borderRadius: 16,
                fontSize: 10, fontWeight: 800,
                color: PRIMARY_DARK,
                marginBottom: 16,
                boxShadow: "0 2px 8px rgba(63,182,232,0.15)",
              }}>
                タイパ重視の「正社員」スカウトプラットフォーム
              </div>

              {/* メインキャッチ */}
              <div style={{
                fontSize: 22, fontWeight: 900, color: NAVY,
                lineHeight: 1.5, letterSpacing: -0.5,
                marginBottom: 12,
              }}>
                <div style={{ color: PRIMARY_DARK, marginBottom: 4 }}>履歴書なし。</div>
                <div>
                  <span style={{ fontSize: 26, color: PRIMARY_DARK }}>3問</span>のQ&Aと写真だけで、
                </div>
                <div>
                  企業から
                  <span style={{
                    background: `linear-gradient(transparent 60%, ${ACCENT_YELLOW} 60%)`,
                    fontWeight: 900,
                  }}>スカウトが届く。</span>
                </div>
              </div>

              {/* 説明文 */}
              <div style={{
                fontSize: 12, color: TEXT_SUB, lineHeight: 1.7,
                marginBottom: 20, fontWeight: 600,
              }}>
                職務経歴書も志望動機もいらない。<br/>
                Q&A 3問とプロフィール写真だけで、<span style={{
                  background: ACCENT_YELLOW, color: NAVY,
                  fontWeight: 800, padding: "1px 4px", borderRadius: 2,
                }}>正社員</span>のスカウトが届く。
              </div>

              {/* CTA（赤） */}
              <button onClick={handleRegister} style={{
                width: "100%", height: 56,
                background: CTA, color: "#fff",
                border: `2px solid ${CTA}`, borderRadius: 28,
                fontSize: 15, fontWeight: 800, letterSpacing: 0.5,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 8px 24px rgba(232,89,60,0.4)",
                marginBottom: 6,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 0,
              }}>
                <span>無料で会員登録する ›</span>
                <span style={{
                  fontSize: 9, fontWeight: 700, opacity: 0.9, marginTop: 2,
                }}>
                  所要時間 約30秒
                </span>
              </button>

              {/* チェックポイント */}
              <div style={{
                display: "flex", justifyContent: "center", gap: 10,
                marginTop: 14, flexWrap: "wrap",
              }}>
                {["完全無料", "履歴書不要", "1分で登録完了"].map(c => (
                  <span key={c} style={{
                    fontSize: 10, fontWeight: 700, color: TEXT_SUB,
                    display: "flex", alignItems: "center", gap: 3,
                  }}>
                    <span style={{ color: SUCCESS }}>✓</span>
                    <span>{c}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* ===== FEATURES ===== */}
            <div style={{ padding: "40px 20px 32px" }}>
              <SectionLabel en="FEATURES" jp="タップミーの3つの特徴" />

              {FEATURES.map((f, i) => (
                <div key={f.n} style={{
                  background: "#fff", border: `1px solid ${BORDER}`,
                  borderRadius: 14, padding: "20px 18px",
                  marginBottom: 12,
                  boxShadow: "0 4px 16px rgba(10,37,64,0.04)",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute", top: 14, right: 16,
                    fontSize: 28, fontWeight: 900,
                    color: PRIMARY_LIGHT,
                    fontFamily: "Georgia, serif",
                    letterSpacing: -2,
                  }}>{f.n}</div>

                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    marginBottom: 8, paddingRight: 40,
                  }}>
                    <div style={{
                      fontSize: 9, fontWeight: 800,
                      color: "#fff", background: PRIMARY_DARK,
                      padding: "2px 6px", borderRadius: 3,
                      letterSpacing: 1,
                    }}>POINT {f.n}</div>
                  </div>

                  <div style={{
                    display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8,
                  }}>
                    <div style={{ fontSize: 26, flexShrink: 0 }}>{f.icon}</div>
                    <div style={{
                      fontSize: 16, fontWeight: 800, color: NAVY,
                      lineHeight: 1.4, paddingTop: 2,
                    }}>{f.title}</div>
                  </div>

                  <div style={{
                    fontSize: 11, color: TEXT_SUB,
                    lineHeight: 1.7, fontWeight: 600,
                    marginBottom: 10,
                  }}>
                    {f.desc}
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {f.chips.map(c => (
                      <span key={c} style={{
                        fontSize: 9, fontWeight: 700,
                        padding: "3px 8px", borderRadius: 10,
                        background: "#E8F6FD", color: PRIMARY_DARK,
                      }}>{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ===== VOICES ===== */}
            <div style={{
              padding: "32px 20px",
              background: "#FAFCFE",
            }}>
              <SectionLabel en="VOICES" jp="利用者の声" />

              {VOICES.map((v, i) => (
                <div key={i} style={{
                  background: "#fff", border: `1px solid ${BORDER}`,
                  borderRadius: 14, padding: "16px 16px",
                  marginBottom: 12,
                  boxShadow: "0 2px 8px rgba(10,37,64,0.04)",
                }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10, marginBottom: 8,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 18,
                      background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16, color: "#fff", flexShrink: 0,
                    }}>
                      {v.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: TEXT_SUB, marginBottom: 2 }}>
                        {v.name}
                      </div>
                      <div style={{
                        fontSize: 12, fontWeight: 800, color: NAVY,
                        lineHeight: 1.3,
                      }}>
                        {v.title}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 6 }}>
                    {Array.from({ length: v.rating }).map((_, idx) => (
                      <span key={idx} style={{ color: ACCENT_YELLOW, fontSize: 11 }}>★</span>
                    ))}
                  </div>

                  <div style={{
                    fontSize: 11, color: TEXT, lineHeight: 1.7,
                  }}>
                    {v.content}
                  </div>
                </div>
              ))}
            </div>

            {/* ===== HOW IT WORKS (ネイビー背景) ===== */}
            <div style={{
              padding: "40px 20px",
              background: NAVY,
            }}>
              <SectionLabel en="HOW IT WORKS" jp="ご利用の流れ" light />

              {HOW_IT_WORKS.map((s, i) => (
                <div key={s.n} style={{
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid rgba(255,255,255,0.1)`,
                  borderRadius: 12, padding: "14px 16px",
                  marginBottom: 8,
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 22,
                    background: PRIMARY,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <div style={{ fontSize: 7, fontWeight: 800, color: "#fff", letterSpacing: 1 }}>
                      STEP
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                      {s.n}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6, marginBottom: 4,
                    }}>
                      <span style={{ fontSize: 14 }}>{s.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>
                        {s.title}
                      </span>
                    </div>
                    <div style={{
                      fontSize: 10, color: PRIMARY_LIGHT, lineHeight: 1.6, fontWeight: 500,
                    }}>
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={handleRegister} style={{
                width: "100%", height: 50,
                background: CTA, color: "#fff",
                border: `2px solid ${CTA}`, borderRadius: 25,
                fontSize: 14, fontWeight: 800, letterSpacing: 0.5,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 6px 18px rgba(232,89,60,0.5)",
                marginTop: 16,
              }}>
                まずは無料で登録してみる ›
              </button>
            </div>

            {/* ===== FAQ ===== */}
            <div style={{ padding: "40px 20px" }}>
              <SectionLabel en="FAQ" jp="よくあるご質問" />

              {FAQS.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={i} style={{
                    background: "#fff", border: `1px solid ${BORDER}`,
                    borderRadius: 10, marginBottom: 8,
                    overflow: "hidden",
                  }}>
                    <div onClick={() => setOpenFaq(open ? -1 : i)} style={{
                      padding: "12px 14px", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 10,
                    }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: 11,
                        background: PRIMARY, color: "#fff",
                        fontSize: 11, fontWeight: 900,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>Q</span>
                      <span style={{
                        flex: 1, fontSize: 12, fontWeight: 700, color: NAVY,
                        lineHeight: 1.4,
                      }}>
                        {faq.q}
                      </span>
                      <span style={{
                        fontSize: 12, color: TEXT_SUB,
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}>▼</span>
                    </div>
                    {open && (
                      <div style={{
                        padding: "10px 14px 14px",
                        borderTop: `1px solid ${BORDER}`,
                        background: "#FAFCFE",
                        display: "flex", gap: 10,
                      }}>
                        <span style={{
                          width: 22, height: 22, borderRadius: 11,
                          background: ACCENT_YELLOW, color: NAVY,
                          fontSize: 11, fontWeight: 900,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}>A</span>
                        <span style={{
                          flex: 1, fontSize: 11, color: TEXT,
                          lineHeight: 1.7, fontWeight: 600,
                        }}>
                          {faq.a}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ===== JOIN US ===== */}
            <div style={{
              padding: "40px 20px 32px",
              background: `linear-gradient(180deg, #FFFFFF 0%, #E8F6FD 100%)`,
              textAlign: "center",
            }}>
              <div style={{
                fontSize: 11, fontWeight: 800,
                color: PRIMARY_DARK, letterSpacing: 4, marginBottom: 8,
              }}>JOIN US</div>

              <div style={{
                fontSize: 22, fontWeight: 900, color: NAVY,
                lineHeight: 1.4, marginBottom: 8,
                letterSpacing: -0.5,
              }}>
                さあ、はじめよう。<br/>
                <span style={{
                  background: `linear-gradient(transparent 60%, ${ACCENT_YELLOW} 60%)`,
                }}>履歴書なしの仕事探し</span>
              </div>

              <div style={{
                fontSize: 11, color: TEXT_SUB, lineHeight: 1.7,
                fontWeight: 600, marginBottom: 20,
              }}>
                登録は約30秒。<br/>
                まずは気軽に登録してみませんか？
              </div>

              <button onClick={handleRegister} style={{
                width: "100%", height: 56,
                background: CTA, color: "#fff",
                border: `2px solid ${CTA}`, borderRadius: 28,
                fontSize: 16, fontWeight: 800, letterSpacing: 0.5,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 8px 24px rgba(232,89,60,0.4)",
                marginBottom: 6,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 0,
              }}>
                <span>無料で会員登録する ›</span>
                <span style={{ fontSize: 9, fontWeight: 700, opacity: 0.9, marginTop: 2 }}>
                  所要時間 約30秒
                </span>
              </button>

              <div style={{
                fontSize: 10, color: TEXT_SUB, marginTop: 8,
              }}>
                既にアカウントをお持ちの方は <span style={{
                  color: PRIMARY_DARK, fontWeight: 700, textDecoration: "underline",
                  cursor: "pointer",
                }}>ログイン</span>
              </div>

              <div style={{
                display: "flex", justifyContent: "center", gap: 10,
                marginTop: 16, flexWrap: "wrap",
                paddingTop: 12, borderTop: `1px solid ${BORDER}`,
              }}>
                {["🔒 SSL暗号化", "💰 完全無料", "📱 アプリ不要"].map(c => (
                  <span key={c} style={{
                    fontSize: 10, fontWeight: 700, color: TEXT_SUB,
                  }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* ===== フッター ===== */}
            <div style={{
              padding: "24px 20px 30px",
              background: NAVY, color: "#fff",
            }}>
              <img src={logoUrl} alt="タップミー / TAPME"
                style={{
                  height: 32, objectFit: "contain", marginBottom: 16,
                  filter: "brightness(0) invert(1)",
                }} />

              <div style={{
                display: "flex", flexWrap: "wrap", gap: "8px 14px",
                marginBottom: 16,
              }}>
                {["利用規約", "プライバシーポリシー", "運営会社", "お問い合わせ", "採用情報"].map(l => (
                  <span key={l} style={{
                    fontSize: 10, color: PRIMARY_LIGHT,
                    cursor: "pointer", fontWeight: 600,
                  }}>{l}</span>
                ))}
              </div>

              <div style={{
                fontSize: 9, color: PRIMARY_LIGHT, opacity: 0.7,
                paddingTop: 12, borderTop: `1px solid rgba(255,255,255,0.1)`,
              }}>
                © 2026 MOTA Inc. All rights reserved.
              </div>
            </div>
          </div>
        </Phone>
      </div>
    </div>
  );
}
