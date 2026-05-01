import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import TopLP from "./mocks/TopLP.jsx";
import CSFlow from "./mocks/CSFlow.jsx";
import JobseekerSwipe from "./mocks/JobseekerSwipe.jsx";
import CLScout from "./mocks/CLScout.jsx";
import "./index.css";

// HashRouter を使う理由:
//   GitHub Pages では SPA のクライアントサイドルーティング (BrowserRouter) が
//   そのままでは動かない (404 になる)。HashRouter (#/path) なら追加設定不要。
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TopLP />} />
          <Route path="/cs-flow" element={<CSFlow />} />
          <Route path="/jobseeker" element={<JobseekerSwipe />} />
          <Route path="/cl" element={<CLScout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
