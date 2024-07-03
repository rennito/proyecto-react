import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import styles from "../AgregarEmpleados/Agregar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserPlus, faList } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode.react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const AgregarEmpleados = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [nextEmployeeNumber, setNextEmployeeNumber] = useState("00001");
  const [registeredEmployee, setRegisteredEmployee] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    getNextEmployeeNumber();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const data = {
        id: await getNextId(),
        nombre: formData.get("nombre"),
        apellidoPaterno: formData.get("apellidoPaterno"),
        apellidoMaterno: formData.get("apellidoMaterno"),
        direccion: formData.get("direccion"),
        ciudad: formData.get("ciudad"),
        estado: formData.get("estado"),
        codigoPostal: formData.get("codigoPostal"),
        numEmpleado: nextEmployeeNumber,
        fechaNacimiento: formData.get("fechaNacimiento"),
        genero: formData.get("genero"),
        tipoNomina: formData.get("tipoNomina"),
        rfc: formData.get("rfc"),
        estadoCivil: formData.get("estadoCivil"),
        profesion: formData.get("profesion"),
        puesto: formData.get("puesto"),
        email: formData.get("email"),
        qrCode: generateQRCode(formData),
      };

      await axios.post("https://fake-eosin.vercel.app/empleados", data);

      const qrData = {
        ...data,
        qrCode: `Nombre: ${data.nombre}\nNúmero de empleado: ${data.numEmpleado}`,
      };

      setRegisteredEmployee(qrData);

      e.target.reset();
      setNextEmployeeNumber(getNextEmployeeNumberFormatted());

      setOpenSnackbar(true); // Mostrar Snackbar

      /*alert("Empleado registrado correctamente")*/;
    } catch (error) {
      console.error("Error al registrar empleado:", error);
      alert("Error al registrar empleado");
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const getNextId = async () => {
    try {
      const response = await axios.get("https://fake-eosin.vercel.app/empleados");
      const empleados = response.data;
      const lastId =
        empleados.length > 0 ? empleados[empleados.length - 1].id : 0;
      return lastId + 1;
    } catch (error) {
      console.error("Error al obtener el siguiente ID:", error);
      return 1;
    }
  };

  const getNextEmployeeNumber = async () => {
    try {
      const response = await axios.get("https://fake-eosin.vercel.app/empleados");
      const empleados = response.data;
      const lastEmployee =
        empleados.length > 0 ? empleados[empleados.length - 1].numEmpleado : 0;
      const nextNumber = parseInt(lastEmployee) + 1;
      setNextEmployeeNumber(nextNumber.toString().padStart(5, "0"));
    } catch (error) {
      console.error("Error al obtener el siguiente número de empleado:", error);
      setNextEmployeeNumber("00001");
    }
  };

  const getNextEmployeeNumberFormatted = () => {
    const nextNumber = parseInt(nextEmployeeNumber) + 1;
    return nextNumber.toString().padStart(5, "0");
  };

  const generateQRCode = (formData) => {
    const qrText = `Nombre: ${formData.get(
      "nombre"
    )}\nNúmero de empleado: ${nextEmployeeNumber}`;
    return qrText;
  };

  if (loading) {
    return <h1>Cargando...</h1>;
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
        className={`${styles.mainContent} ${sidebarOpen ? styles.active : ""}`}
      >
        <h2>Agregar Empleados</h2>
        <form id="registroForm" className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="inputNombre">Nombre</label>
              <input
                type="text"
                className={styles.formControl}
                id="inputNombre"
                name="nombre"
                placeholder="Nombre"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="inputApellidoPaterno">Apellido Paterno</label>
              <input
                type="text"
                className={styles.formControl}
                id="inputApellidoPaterno"
                name="apellidoPaterno"
                placeholder="Apellido Paterno"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="inputApellidoMaterno">Apellido Materno</label>
              <input
                type="text"
                className={styles.formControl}
                id="inputApellidoMaterno"
                name="apellidoMaterno"
                placeholder="Apellido Materno"
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="inputPuesto">Puesto</label>
              <input
                type="text"
                className={styles.formControl}
                id="inputPuesto"
                name="puesto"
                placeholder="Puesto"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="inputNumEmpleado">Número de Empleado</label>
              <input
                type="text"
                className={styles.formControl}
                id="inputNumEmpleado"
                name="numEmpleado"
                value={nextEmployeeNumber}
                readOnly
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroupLarge}>
              <label htmlFor="inputAddress">Dirección</label>
              <input
                type="text"
                className={styles.formControl}
                id="inputAddress"
                name="direccion"
                placeholder="Calle, número, colonia"
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="inputCity">Ciudad</label>
              <input
                type="text"
                className={styles.formControl}
                id="inputCity"
                name="ciudad"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="inputState">Estado</label>
              <select
                id="inputState"
                className={styles.formControl}
                name="estado"
                required
              >
                <option value="">Seleccionar...</option>
                <option value="Aguascalientes">Aguascalientes</option>
                <option value="Baja California">Baja California</option>
                <option value="Baja California Sur">Baja California Sur</option>
                <option value="Campeche">Campeche</option>
                <option value="Coahuila">Coahuila</option>
                <option value="Colima">Colima</option>
                <option value="Chiapas">Chiapas</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Ciudad de México">Ciudad de México</option>
                <option value="Durango">Durango</option>
                <option value="Guanajuato">Guanajuato</option>
                <option value="Guerrero">Guerrero</option>
                <option value="Hidalgo">Hidalgo</option>
                <option value="Jalisco">Jalisco</option>
                <option value="Michoacán">Michoacán</option>
                <option value="Morelos">Morelos</option>
                <option value="Nayarit">Nayarit</option>
                <option value="Nuevo León">Nuevo León</option>
                <option value="Oaxaca">Oaxaca</option>
                <option value="Puebla">Puebla</option>
                <option value="Querétaro">Querétaro</option>
                <option value="Quintana Roo">Quintana Roo</option>
                <option value="San Luis Potosí">San Luis Potosí</option>
                <option value="Sinaloa">Sinaloa</option>
                <option value="Sonora">Sonora</option>
                <option value="Tabasco">Tabasco</option>
                <option value="Tamaulipas">Tamaulipas</option>
                <option value="Tlaxcala">Tlaxcala</option>
                <option value="Veracruz">Veracruz</option>
                <option value="Yucatán">Yucatán</option>
                <option value="Zacatecas">Zacatecas</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="inputCodigoPostal">Código Postal</label>
              <input
                type="text"
                className={styles.formControl}
                id="inputCodigoPostal"
                name="codigoPostal"
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="inputFechaNacimiento">Fecha de Nacimiento</label>
              <input
                type="date"
                className={styles.formControl}
                id="inputFechaNacimiento"
                name="fechaNacimiento"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="inputGenero">Género</label>
              <select
                id="inputGenero"
                className={styles.formControl}
                name="genero"
                required
              >
                <option value="">Seleccionar...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="inputTipoNomina">Tipo de Nómina</label>
              <select
                id="inputTipoNomina"
                className={styles.formControl}
                name="tipoNomina"
                required
              >
                <option value="">Seleccionar...</option>
                <option value="Semanal">Semanal</option>
                <option value="Quincenal">Quincenal</option>
                <option value="Mensual">Mensual</option>
              </select>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="inputRFC">RFC</label>
              <input
                type="text"
                className={styles.formControl}
                id="inputRFC"
                name="rfc"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="inputEstadoCivil">Estado Civil</label>
              <select
                id="inputEstadoCivil"
                className={styles.formControl}
                name="estadoCivil"
                required
              >
                <option value="">Seleccionar...</option>
                <option value="Soltero/a">Soltero/a</option>
                <option value="Casado/a">Casado/a</option>
                <option value="Divorciado/a">Divorciado/a</option>
                <option value="Viudo/a">Viudo/a</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="inputProfesion">Profesión</label>
              <input
                type="text"
                className={styles.formControl}
                id="inputProfesion"
                name="profesion"
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="inputEmail">Correo Electrónico</label>
              <input
                type="email"
                className={styles.formControl}
                id="inputEmail"
                name="email"
                required
              />
            </div>
          </div>
          <button type="submit" className={styles.btnPrimary}>
            Registrar Empleado
          </button>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity="success"
          >
            Empleado registrado con éxito.
          </MuiAlert>
        </Snackbar>
        {registeredEmployee && (
          <div className={styles.qrContainer}>
            <h3>Empleado registrado con éxito:</h3>
            <div className={styles.qrCode}>
              <QRCode value={registeredEmployee.qrCode} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
