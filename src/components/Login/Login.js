import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { connectStorageEmulator } from "firebase/storage";
import { Alert } from "../Alert";
import styles from "../Login/Login.module.css";
import imagenDeFondo from '../assets/fondosystem-4.jpg';

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  // Actualizar el estado
  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  // Ver lo que tiene
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${imagenDeFondo})` }}>
      {error && <Alert message={error} />}
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Ingresar su correo"
          onChange={handleChange}
          className={styles.input}
        />
        <br />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          placeholder="******"
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Iniciar sesión
        </button>
      </form>

      <button onClick={handleGoogleSignin} className={styles.googleLoginButton}>
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google Logo"
        className={styles.googleLogo}
      />
        Google Login
      </button>
    </div>
  );
}
