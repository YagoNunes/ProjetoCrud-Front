import { useState } from "react";
import styles from "./Chat.module.css";
import { UserId } from "../../components/UserId/user";

export function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState("");

  function handleLogout() {
    localStorage.removeItem("token");
    
    window.location.href = "/";
  }

  function sendMessage() {
    if (text.trim().length === 0) return;

    setMessages((prev) => [...prev, text]);
    setText("");
  }

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        <div className={styles.header}>
          <h2 className={styles.title}>💬 Chat Simples</h2>  
          <UserId />      
          <button 
            onClick={handleLogout} 
            className={styles.logoutButton}
          >
            Sair
          </button>
        </div>

        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index} className={styles.message}>
              {msg}
            </div>
          ))}
        </div>

        <div className={styles.inputArea}>
          <input
            type="text"
            value={text}
            placeholder="Digite uma mensagem..."
            onChange={(e) => setText(e.target.value)}
            className={styles.input}
          />
          <button onClick={sendMessage} className={styles.button}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
