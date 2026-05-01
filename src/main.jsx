import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import TopLP from "./mocks/TopLP.jsx";
import Register from "./mocks/Register.jsx";
import RegisterStep2 from "./mocks/RegisterStep2.jsx";
import RegisterStep3 from "./mocks/RegisterStep3.jsx";
import RegisterStep4 from "./mocks/RegisterStep4.jsx";
import RegisterComplete from "./mocks/RegisterComplete.jsx";
import CSFlow from "./mocks/CSFlow.jsx";
import JobseekerSwipe from "./mocks/JobseekerSwipe.jsx";
import CLScout from "./mocks/CLScout.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TopLP />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-step2" element={<RegisterStep2 />} />
          <Route path="/register-step3" element={<RegisterStep3 />} />
          <Route path="/register-step4" element={<RegisterStep4 />} />
          <Route path="/register-complete" element={<RegisterComplete />} />
          <Route path="/cs-flow" element={<CSFlow />} />
          <Route path="/jobseeker" element={<JobseekerSwipe />} />
          <Route path="/cl" element={<CLScout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
