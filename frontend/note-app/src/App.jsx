import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import "./App.css";
import { useState } from "react";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  const [isRateLimit, setIsrateLimit] = useState(false);
  return (
    <div className="relative h-full ">
      <div className="fixed bottom-0 inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_65%,#fe865a_100%)]" />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isRateLimit={isRateLimit}
              setIsrateLimit={setIsrateLimit}
            />
          }
        />
        <Route
          path="/create"
          element={
            <CreatePage
              isRateLimit={isRateLimit}
              setIsrateLimit={setIsrateLimit}
            />
          }
        />
        <Route path="/note/:id" element={<NoteDetailPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
