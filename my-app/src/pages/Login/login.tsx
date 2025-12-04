import React, { useState } from "react";
import styles from "./Login.module.css";
import { Input } from "../../components/Input/input";
import axios from "axios";

export  function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
        const response = await axios.post(
          "http://localhost:8080/api/users/login",
          null,
          {
            params: {
              email: email,
              password: password,
            },
          }
        );

        localStorage.setItem("token", response.data.token);
        alert("Login realizado com sucesso!");

        window.location.href = "/chat";
    } catch (error) {
       alert("Email ou senha inválidos");
        console.error(error);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>

        <Input 
          label="Email"
          placeholder="Digite seu email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} />
        <Input
          label="Senha"
          type="password"
          value={password}
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} onClick={handleLogin}>
          Entrar
        </button>

        <p className={styles.registerText}>
          Não tem conta?
          <span className={styles.registerLink} onClick={() => window.location.href = "/register"}>
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}
