import { Routes, Route, Navigate } from "react-router";
import Chat from "./Chat";
export default function OpenAI() {
  return (
    <div className="container-fluid">
      <h1>OpenAI</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/Kanbas/OpenAI/chat" />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}
