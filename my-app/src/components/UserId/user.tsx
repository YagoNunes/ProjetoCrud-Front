import { useState } from "react";
import axios from "axios";
import styles from "./user.module.css";

export function UserId() {
  const [user, setUser] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const userId = localStorage.getItem("userId");

  const handlePerfilClick = async () => {
    if (showProfile) {
      setShowProfile(false);
      return;
    }
    
    try {
      setError("");
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
      setUser(response.data);
      setShowProfile(true);
    } catch {
      setError("Usuário não encontrado!");
      setShowProfile(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);

      localStorage.removeItem("userId");
      alert("Perfil excluído com sucesso!");
      window.location.href = "/login";

    } catch {
      alert("Erro ao excluir perfil!");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/${userId}`,
        user
      );

      setUser(response.data);
      setIsEditing(false);

      alert("Perfil atualizado!");
    } catch {
      alert("Erro ao atualizar!");
    }
  };

  return (
    <>
      <button className={styles.btnPerfil} onClick={handlePerfilClick}>
        Perfil
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {showProfile && user && (
        <div className={styles.card}>
          <span><strong>Nome:</strong> 
            {isEditing ? (
              <input 
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            ) : (
              user.name
            )}
          </span>

          <span><strong>Email:</strong>
            {isEditing ? (
              <input 
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            ) : (
              user.email
            )}
          </span>

          <span><strong>Data de Nascimento:</strong>
            {isEditing ? (
              <input 
                type="date"
                value={user.birthday}
                onChange={(e) => setUser({ ...user, birthday: e.target.value })}
              />
            ) : (
              user.birthday
            )}
          </span>

          <div className={styles.profileButtons}>
            {!isEditing ? (
              <>
                <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
                  Editar Perfil
                </button>

                <button className={styles.deleteBtn} onClick={handleDelete}>
                  Excluir Perfil
                </button>
              </>
            ) : (
              <>
                <button className={styles.saveBtn} onClick={handleUpdate}>
                  Salvar Alterações
                </button>

                <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}


