import './App.css';
import "./assets/main.scss";
import * as React from "react";
import { useState, useEffect } from 'react';
import {Routes, Route,  BrowserRouter} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { Global } from './utils/general';
import { ToastContainer } from "react-toastify";
import theme from './assets/themeConfig';
import Login from './app/pages/Login/Login';
import RegistrarUsuario from './app/pages/Registrar/RegistrarUsuario';
import Servicios from './app/pages/Servicios/Servicios';
import Clientes from './app/pages/Clientes/Clientes';
import Cuentas from './app/pages/Cuentas/Cuentas';
import Movimientos from './app/pages/Movimientos/Movimientos';
import DashBoard from './app/pages/DashBoard/DashBoard';
import PersistentDrawerLeft from "./app/components/PersistentDrawerLeft";




function App() {
  const pathInit = "/film-fiesta";
  const infoFilmFiesta = Global.infoFilmFiesta;
  const [userToken, setUserToken] = useState(() => {
    // Inicializa el estado userToken con el valor del localStorage o null si no existe
    const storedToken = localStorage.getItem(infoFilmFiesta);
    return storedToken ? JSON.parse(storedToken) : null;
  });
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = React.useState(true);

  // useEffect para actualizar userToken cuando cambia
  useEffect(() => {
    // Guarda el token en localStorage cada vez que cambia
    localStorage.setItem(infoFilmFiesta, JSON.stringify(userToken));
  }, [userToken]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer limit={3} position="bottom-right" />
      {userToken ? (
        <BodyWeb open={open} setOpen={setOpen} pathInit={pathInit} userToken={userToken}  />
      ) : (
        <Login setUserToken={setUserToken} />
      )}
    </ThemeProvider>
  );
}

function BodyWeb({ pathInit, userToken,open,setOpen ,menu}) {
  return (
    <div style={{ height: "100%" }}>
      <BrowserRouter>
        <PersistentDrawerLeft pathInit={pathInit}  userToken={userToken} open={open} setOpen={setOpen} menu={menu}/>
        <Routes>
          <Route path={`${(pathInit || '/')}/`}  element={<DashBoard   userToken={userToken} open={open} setOpen={setOpen}/>}></Route>
          <Route path={`${(pathInit || '/')}/registrar`}  element={<RegistrarUsuario  userToken={userToken} open={open} setOpen={setOpen}/>}></Route>
          <Route path={`${(pathInit || '/')}/clientes`}  element={<Clientes  userToken={userToken} open={open} setOpen={setOpen}/>}></Route>
          <Route path={`${(pathInit || '/')}/servicios`}  element={<Servicios   userToken={userToken} open={open} setOpen={setOpen}/>}></Route>
          <Route path={`${(pathInit || '/')}/cuentas`}  element={<Cuentas   userToken={userToken} open={open} setOpen={setOpen}/>}></Route>
          <Route path={`${(pathInit || '/')}/movimientos`}  element={<Movimientos  userToken={userToken} open={open} setOpen={setOpen}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/*
  return (
   <>
    <BrowserRouter>
      <Routes>
       <Route path="/" exact element={<ReporteA/>}></Route>
       <Route path="/registrar" exact element={<RegistrarUsuario/>}></Route>
    </Routes>
   </BrowserRouter> 
   
   </>     
  );
}

export default App;*/
