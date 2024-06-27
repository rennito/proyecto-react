import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register";
import {AgregarEmpleados} from "./components/AgregarEmpleados/AgregarEmpleados";
import {ListaEmpleados} from "./components/ListaEmpleados/ListaEmpleados";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import {CalendarComponent} from "./components/CrudApi/CrudApi";

function App() {
  return (
    <div className="bg-slate-300 h-screen text-black flex">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />                
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/agregarempleados" element={<AgregarEmpleados />} />
          <Route path="/crudapi" element={<CalendarComponent />} />
          <Route path="/listaempleados" element={<ListaEmpleados />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
