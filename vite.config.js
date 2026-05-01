import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages にデプロイする際は、リポジトリ名を base に指定する。
// 例: リポジトリ名が "mota-fs-mock" の場合 → base: "/mota-fs-mock/"
// ローカルや独自ドメイン運用の場合は "/" のままでOK。
export default defineConfig({
  plugins: [react()],
  base: "/mota-fs-mock/",
});
