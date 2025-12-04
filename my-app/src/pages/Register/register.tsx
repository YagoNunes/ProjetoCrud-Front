import { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";
import { Input } from "../../components/Input/input";

export function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthday, setBirthday] = useState("");
  const [senha, setSenha] = useState("");

  async function handleRegister() {
    if (!nome || !email || !cpf || !birthday || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users/register", {
        name: nome,
        email: email,
        cpf: cpf,
        birthday: birthday,
        password: senha
      });

      alert("Cadastro realizado com sucesso!");
      console.log(response.data);

      window.location.href = "/login";

    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário.");
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Criar Conta</h1>

        <Input
          label="Nome"
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Input
          label="Email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="CPF"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />

        <Input
          label="Data de Nascimento"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Crie uma senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className={styles.button} onClick={handleRegister}>
          Cadastrar
        </button>

        <p className={styles.loginText}>
          Já possui uma conta?
          <span
            className={styles.loginLink}
            onClick={() => (window.location.href = "/")}
          >
            Entrar
          </span>
        </p>
      </div>
    </div>
  );
}

