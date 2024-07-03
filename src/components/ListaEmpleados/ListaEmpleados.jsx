import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import styles from "./Lista.module.css"; // Ajusta la ruta según sea necesario
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserPlus,
  faList,
  faSearch,
  faBars,
  faUser,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import QRCode from "qrcode.react"; // Importa la biblioteca de generación de códigos QR

export function ListaEmpleados() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const [empleados, setEmpleados] = useState([]);
  const [visibleDetails, setVisibleDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://fake-eosin.vercel.app/empleados")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setEmpleados(data))
      .catch((error) => console.error("Error fetching empleados", error));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDetails = (index) => {
    setVisibleDetails(visibleDetails === index ? null : index);
  };

  const handleDelete = (id) => {
    fetch(`https://fake-eosin.vercel.app/empleados/empleados/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedEmpleados = empleados.filter(
          (empleado) => empleado.id !== id
        );
        setEmpleados(updatedEmpleados);
      })
      .catch((error) => console.error("Error deleting empleado", error));
  };

  const handleEdit = (index) => {
    const empleado = empleados[index];
    console.log(`Editar empleado:`, empleado);
    // Aquí puedes implementar la lógica para editar un empleado
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmpleados = empleados.filter((empleado) => {
    const fullName = `${empleado.nombre} ${empleado.apellidoPaterno} ${empleado.apellidoMaterno}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
            <FontAwesomeIcon icon={faBars} className={styles.faBars} />
          </button>
          <button className={styles.btnHero} id="btn">
            Cambio de color
          </button>
        </div>
        <div className={styles.userInfo}>
          <FontAwesomeIcon icon={faUser} className={styles.faUser} />
          {user && <h1>Bienvenido {user.displayName || user.email}</h1>}
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
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar por nombre o apellidos"
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        </div>
        <h2>Lista de Empleados</h2>
        {filteredEmpleados.length === 0 ? (
          <p>No se encontraron empleados.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Dirección</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Código Postal</th>
                <th>Número de Empleado</th>
                <th>Fecha de Nacimiento</th>
                <th>Género</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmpleados.map((empleado, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.apellidoPaterno}</td>
                    <td>{empleado.apellidoMaterno}</td>
                    <td>{empleado.direccion}</td>
                    <td>{empleado.ciudad}</td>
                    <td>{empleado.estado}</td>
                    <td>{empleado.codigoPostal}</td>
                    <td>{empleado.numEmpleado}</td>
                    <td>{empleado.fechaNacimiento}</td>
                    <td>{empleado.genero}</td>
                    <td>
                      <button
                        className={styles.viewMoreBtn}
                        onClick={() => toggleDetails(index)}
                      >
                        Ver más
                      </button>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(index)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(empleado.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                  {visibleDetails === index && (
                    <tr>
                      <td colSpan="11">
                        <div className={styles.details}>
                          <p>Tipo de Nómina: {empleado.tipoNomina}</p>
                          <p>RFC: {empleado.rfc}</p>
                          <p>Estado Civil: {empleado.estadoCivil}</p>
                          <p>Profesión: {empleado.profesion}</p>
                          <p>Puesto: {empleado.puesto}</p>
                          <p>Email: {empleado.email}</p>
                        </div>
                        <div className={styles.qrCode}>
                          <QRCode value={empleado.qrCode} />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
