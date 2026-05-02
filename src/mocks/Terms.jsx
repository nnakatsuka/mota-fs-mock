import { useNavigate } from "react-router-dom";
import logoUrl from "../assets/tapme-logo.png";

const PRIMARY = "#3FB6E8";
const PRIMARY_DARK = "#059CDB";
const NAVY = "#0A2540";
const BG = "#F4FAFE";
const BORDER = "#DDE9F0";
const TEXT = "#0A2540";
const TEXT_SUB = "#5A6B7C";
const TEXT_MUTE = "#A0AEC0";

const TERMS = [
  {
    title: "第1条（適用）",
    content: "本規約は、本サービスの利用に関する条件を定めるものです。利用者は、本サービスを利用することにより本規約に同意したものとみなします。",
  },
  {
    title: "第2条（利用登録）",
    content: "登録希望者が当社の定める方法により利用登録を申請し、当社がこれを承認することによって利用登録が完了します。当社は登録希望者が以下の事由に該当する場合、登録申請を承認しないことがあります。\n・虚偽の事項を届け出た場合\n・過去に本規約に違反したことがある場合\n・その他当社が利用登録を相当でないと判断した場合",
  },
  {
    title: "第3条（個人情報の取扱い）",
    content: "当社は、個人情報保護法その他の法令を遵守し、適切に取り扱います。利用者の個人情報の取扱いについては、別途定めるプライバシーポリシーに従うものとします。",
  },
  {
    title: "第4条（禁止事項）",
    content: "ユーザーは、以下の行為をしてはなりません。法令に違反する行為、当社のサービスの運営を妨害する行為、他のユーザーに不利益を与える行為、虚偽情報の登録、第三者の権利を侵害する行為、その他当社が不適切と判断する行為。",
  },
  {
    title: "第5条（サービスの変更等）",
    content: "当社は、ユーザーへの事前の通知なくして、サービスの内容を変更または停止することがあります。ユーザーはこれに対して異議を申し立てないものとします。",
  },
  {
    title: "第6条（免責事項）",
    content: "当社は、本サービスに関して、その完全性、正確性、有用性等について何らの保証もしません。本サービスの利用により利用者に生じた損害について、当社は一切の責任を負わないものとします。",
  },
  {
    title: "第7条（規約の変更）",
    content: "当社は、必要と判断した場合には、ユーザーに通知することなく本規約を変更することができるものとします。変更後の規約は、本サービス上に表示した時点から効力を生じるものとします。",
  },
  {
    title: "第8条（準拠法・裁判管轄）",
    content: "本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。",
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

export default function Terms() {
  const navigate = useNavigate();

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
          }}>F/S MOCK — C-4 利用規約</div>
          <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
            マイページ / 利用規約<br/>
            <span style={{ fontSize: 11, color: TEXT_MUTE }}>
              ※スクロールで全文確認
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
            <span onClick={() => navigate("/mypage")} style={{
              fontSize: 22, color: TEXT_SUB, cursor: "pointer",
            }}>‹</span>
            <img
              src={logoUrl}
              alt="タップミー / TAPME"
              onClick={() => navigate("/")}
              style={{ height: 38, objectFit: "contain", cursor: "pointer" }}
            />
            <span style={{ fontSize: 18, color: TEXT_SUB, cursor: "pointer" }}>☰</span>
          </div>

          {/* スクロール領域 */}
          <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
            <div style={{ padding: "20px 18px 24px" }}>
              {/* タイトル */}
              <div style={{
                background: "#fff",
                border: `1px solid ${BORDER}`,
                borderRadius: 12,
                padding: "16px 18px",
                marginBottom: 16,
                boxShadow: "0 2px 8px rgba(10,37,64,0.04)",
              }}>
                <div style={{
                  fontSize: 16, fontWeight: 800, color: NAVY,
                  marginBottom: 4,
                }}>
                  タップミー 利用規約
                </div>
                <div style={{ fontSize: 10, color: TEXT_SUB }}>
                  最終更新日: 2026年4月1日
                </div>
              </div>

              {/* 各条文 */}
              {TERMS.map((t, i) => (
                <div key={i} style={{
                  marginBottom: 16,
                }}>
                  <div style={{
                    fontSize: 13, fontWeight: 800, color: NAVY,
                    marginBottom: 6,
                    paddingBottom: 4,
                    borderBottom: `1px solid ${PRIMARY}55`,
                  }}>
                    {t.title}
                  </div>
                  <div style={{
                    fontSize: 11, color: TEXT, lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                  }}>
                    {t.content}
                  </div>
                </div>
              ))}

              {/* フッタ */}
              <div style={{
                marginTop: 24, paddingTop: 16,
                borderTop: `1px solid ${BORDER}`,
                fontSize: 10, color: TEXT_MUTE, textAlign: "center",
                lineHeight: 1.6,
              }}>
                以上、<a href="#/terms" style={{ color: PRIMARY_DARK, textDecoration: "underline", fontWeight: 600 }}>本規約</a>をご確認の上ご利用ください。<br/>
                ご不明な点は <span style={{
                  color: PRIMARY_DARK, textDecoration: "underline", cursor: "pointer",
                }}>お問い合わせ</span> までご連絡ください。
              </div>
            </div>
          </div>
        </Phone>
      </div>
    </div>
  );
}
