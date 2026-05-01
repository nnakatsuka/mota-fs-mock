# MOTA Work — F/S Mock Collection

MOTA株式会社の採用プラットフォーム企画に関するフィージビリティスタディ（F/S）用モック集。
社内検討・CSヒアリングでの提示を目的としており、本番サービスとは別物です。

## 含まれるモック

| パス | 内容 |
| --- | --- |
| `/` | TOPページ（LP）— マイナビエージェントLP構成ベース |
| `/cs-flow` | CS画面フロー版 — 16画面の遷移フロー |
| `/jobseeker` | 求職者スワイプUI — Hot Pepper Beauty Work型 |
| `/cl` | CL（企業）側 求職者一覧 — 車買取事業者向け |

## セットアップ

```bash
# 1. 依存をインストール
npm install

# 2. 開発サーバーを起動 (http://localhost:5173)
npm run dev
```

## ビルド

```bash
npm run build
# → dist/ にビルド成果物が出力される
npm run preview  # ビルド結果のローカル確認
```

## GitHub Pages へのデプロイ

### 初回セットアップ

1. GitHub で空のリポジトリを作成（例: `mota-fs-mock`）
2. このプロジェクトを push：
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-user>/mota-fs-mock.git
   git push -u origin main
   ```
3. **`vite.config.js` の `base` をリポジトリ名に合わせる**:
   ```js
   base: "/mota-fs-mock/",   // ← リポジトリ名と一致させること
   ```
4. リポジトリの Settings → Pages で、Source を「GitHub Actions」に設定

### デプロイ方法

#### A. GitHub Actions による自動デプロイ（推奨）
`main` ブランチにpushすると `.github/workflows/deploy.yml` が自動で発火し、GitHub Pages にデプロイされます。

#### B. 手動デプロイ
```bash
npm run deploy
# gh-pages ブランチが作成され、そこにビルド結果が push される
```
この場合、Settings → Pages の Source を `gh-pages` ブランチに設定してください。

## ルーティングについて

GitHub Pages のSPA問題を回避するため、`HashRouter`（`#/path` 形式）を採用しています。
URLは以下のような形式になります：

```
https://<your-user>.github.io/mota-fs-mock/#/
https://<your-user>.github.io/mota-fs-mock/#/cs-flow
https://<your-user>.github.io/mota-fs-mock/#/jobseeker
https://<your-user>.github.io/mota-fs-mock/#/cl
```

## 構成

```
mota-fs-mock/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions 自動デプロイ
└── src/
    ├── main.jsx            # エントリ + ルーティング定義
    ├── Layout.jsx          # 上部ナビ（モック切替タブ）
    ├── index.css           # グローバルスタイル
    └── mocks/
        ├── TopLP.jsx
        ├── CSFlow.jsx
        ├── JobseekerSwipe.jsx
        └── CLScout.jsx
```

## 技術スタック

- React 18
- React Router v6 (HashRouter)
- Vite 5
- CSS-in-JS (インラインスタイル)
- Noto Sans JP (Google Fonts)

## ライセンス

社内検討用 / Private
