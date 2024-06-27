import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import styles from "../Home/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

export function Home() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation(); // Obtener la ubicación actual de la página

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return <h1>Cargando</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header} id="header">
        <div className={styles.menuBtnContainer}>
          <button
            className={styles.menuToggleBtn}
            id="btn-sidebar"
            onClick={toggleSidebar}
          >
            <i className={`fas fa-bars ${styles.faBars}`} />
          </button>
          <button className={styles.btnHero} id="btn">
            Cambio de color
          </button>
        </div>
        <div className={styles.userInfo}>
          <i className={`fas fa-user ${styles.faUser}`} />
          <h1>Bienvenido {user.displayName || user.email}</h1>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <div
        id="sidebar"
        className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}
      >
        <ul>
          <li className={location.pathname === "/" ? styles.active : ""}>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} className={styles.iconHome} />
              <span className={styles.textHome}>Home</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/AgregarEmpleados" ? styles.active : ""
            }
          >
            <Link to="/AgregarEmpleados">
              <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
              <span className={styles.text}>Agregar empleados</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/ListaEmpleados" ? styles.active : ""
            }
          >
            <Link to="/ListaEmpleados">
              <FontAwesomeIcon icon={faList} className={styles.iconList} />
              <span className={styles.textList}>Lista de empleados</span>
            </Link>
          </li>
        </ul>
      </div>
      <div
        id="main-content"
        className={`${styles.mainContent} ${sidebarOpen ? styles.active : ""}`}
      >
        <div className={styles.mainContent} id="main-content">
          <h2>Calendario</h2>

          <div className={styles.calendarContainer}>
            <div className={styles.calendarHeader}>
              <h1>Abril</h1>
              <p>2024</p>
            </div>

            <div className={styles.calendar}>
              <span className={styles.dayName}>Lun</span>
              <span className={styles.dayName}>Mar</span>
              <span className={styles.dayName}>Mie</span>
              <span className={styles.dayName}>Jue</span>
              <span className={styles.dayName}>Vie</span>
              <span className={styles.dayName}>Sab</span>
              <span className={styles.dayName}>Dom</span>

              <div className={`${styles.day} ${styles.dayDisabled}`}>31</div>
              <div className={styles.day}>1</div>
              <div className={styles.day}>2</div>
              <div className={styles.day}>3</div>
              <div className={styles.day}>4</div>
              <div className={styles.day}>5</div>
              <div className={styles.day}>6</div>
              <div className={styles.day}>7</div>
              <div className={styles.day}>8</div>
              <div className={styles.day}>9</div>
              <div className={styles.day}>10</div>
              <div className={styles.day}>11</div>
              <div className={styles.day}>12</div>
              <div className={styles.day}>13</div>
              <div className={styles.day}>14</div>
              <div className={styles.day}>15</div>
              <div className={styles.day}>16</div>
              <div className={styles.day}>17</div>
              <div className={styles.day}>18</div>
              <div className={styles.day}>19</div>
              <div className={styles.day}>20</div>
              <div className={styles.day}>21</div>
              <div className={styles.day}>22</div>
              <div className={styles.day}>23</div>
              <div className={styles.day}>24</div>
              <div className={styles.day}>25</div>
              <div className={styles.day}>26</div>
              <div className={styles.day}>27</div>
              <div className={styles.day}>28</div>
              <div className={styles.day}>29</div>
              <div className={styles.day}>30</div>

              <section className={styles.taskAtiempo}>A tiempo</section>
              <section className={styles.taskRetarto}>Retardo</section>
              <section className={styles.taskDescanzo}>Descanzo</section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
