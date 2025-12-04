import "./styles/global.css";
import { Login } from "./pages/Login/login";
import { Register } from "./pages/Register/register";
import { Chat } from "./pages/Chat/chat";

const path = window.location.pathname;

export default function App() {
  if (path === "/register") return <Register />;
  if (path === "/chat") return <Chat />;
  return <Login />;
}

