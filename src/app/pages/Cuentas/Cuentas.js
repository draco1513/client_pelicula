import React from "react";
import { useState, useEffect } from "react";

import {Box,Grid,Button,InputAdornment,TextField} from "@mui/material";
import ServicioService from "../../../services/servicio"
import CuentaService from "../../../services/cuenta"
import PerfilService from "../../../services/perfil"
import SpinnerLoader from '../../components/SpinnerLoad/SpinnerLoader';
import { CODES } from '../../../utils/responseCodes';
import { simpleAlerts } from '../../../utils/alerts';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import BodyCuentas from "../../components/Cuentas/BodyCuentas/BodyCuentas";
import AddCuentas from "./AddCuentas/AddCuentas";
import { getDateOL, } from '../../../utils/function';
import AddPerfiles from "./AddPerfiles/AddPerfiles";
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import AddPerfilesInfo from "./AddPerfilesInfo/AddPerfilesInfo";

const newCuenta = {
  'correo':'',
  'password_correo': '',
  'password_cuenta':'',
  'fecha_facturacion':'',
  'servicio_id':0,
  'perfiles_seleccionados':0
}




const Cuentas = ({ open, setOpen }) => {
  const url = "'" + window.location.pathname + "'";

  const [cuentas, setCuentas] = useState(null);
  const [clientes, setClientes] = useState(null);

  const [infoCuenta, setInfoCuenta] = useState(null);
  const [infoPerfil, setInfoPerfil] = useState(null);

  const [open2, setOpen2] = useState(false)
  const handleOpen = () => setOpen2(true);
  const handleClose = () => setOpen2(false);

  const [perfilesData, setPerfilesData] = useState([]);
 

  const [openPerfil, setOpenPerfil] = useState(false)
  const handleOpenPerfil = () => openPerfil(true);
  const handleClosePerfil = () => setOpenPerfil(false);
  const [perfiles, setPerfiles] = useState(null);

  const [searchCuenta, setSearchCuenta] = useState("");
  const [titleSpinner, setTitleSpinner] = useState(null);
  const [openModalLoader, setOpenModalLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  
  const [servicios, setServicios] = useState(null);
 
  const [dateInit, setDateInit] = useState(getDateOL(getNextMonth()));
  const [typeModal,setTypeModal]=useState(1)
  
 

  useEffect(() => {
    getPerfiles();
    getCuentas();
    getServicios();
    getClientesAll();
  }, [page]);

  useEffect(() => {
    if (!searchCuenta) {
      getCuentas();
    }
}, [searchCuenta])

function getNextMonth() {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);

  // Formatear la fecha para que tenga el formato 'YYYY-MM-DD'
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const getCuentas = async () => {
  try {
      setOpenModalLoader(true);
      setTitleSpinner('Buscando Cuentas ...');
      const result = await CuentaService.getCuentas(url, { search: searchCuenta,page: page, pageSize: pageSize, pagination: true });
      if (result.status === CODES.SUCCESS_200) {
          setTotalPages(result.data.last_page);
          setCuentas(result.data);
      } else {
          simpleAlerts('Hubo un error en cuentas', 'error');
      }
      return []
  } catch (error) {
      console.log(`Error en getCuentas: ${error}`);
  } finally {
      setOpenModalLoader(false);
      setTitleSpinner(null);
  }
}

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    getCuentas();
  }
};

const getServicios = async () => {
  try {
      setOpenModalLoader(true);
      setTitleSpinner('Buscando Servicios ...');
      const result = await ServicioService.getServicios(url, { page: page, pageSize: pageSize, pagination: true });
      if (result.status === CODES.SUCCESS_200) {
          setTotalPages(result.data.last_page);
          setServicios(result.data);
      } else {
          simpleAlerts('Hubo un error en servicios', 'error');
      }
      return []
  } catch (error) {
      console.log(`Error en getServicios: ${error}`);
  } finally {
      setOpenModalLoader(false);
      setTitleSpinner(null);
  }
}

const getPerfiles = async () => {
  try {
      setOpenModalLoader(true);
      setTitleSpinner('Buscando perfiles ...');
      const result = await PerfilService.getPerfiles(url);
      if (result.status === CODES.SUCCESS_200) {
          setPerfiles(result.data);
      } else {
          simpleAlerts('Hubo un error en perfiles', 'error');
      }
      return []
  } catch (error) {
      console.log(`Error en getPerfiles: ${error}`);
  } finally {
      setOpenModalLoader(false);
      setTitleSpinner(null);
  }
}


const getClientesAll = async () => {
  try {
      setOpenModalLoader(true);
      setTitleSpinner('Buscando Clientes ...');
      const result = await PerfilService.getClientesAll(url);
      if (result.status === CODES.SUCCESS_200) {
          setClientes(result.data);
      } else {
          simpleAlerts('Hubo un error en clientes', 'error');
      }
      return []
  } catch (error) {
      console.log(`Error en getClientesAll: ${error}`);
  } finally {
      setOpenModalLoader(false);
      setTitleSpinner(null);
  }
}

const createCuenta = () => {
  setTypeModal(1);
  setInfoCuenta({
    ...newCuenta,
    fecha_facturacion: dateInit,
  });
  handleOpen();
};


  return (
    <Box sx={{ flexGrow: 1, marginLeft: open ? "240px" : "0" }}>
       {typeModal === 1 ? (
        <AddCuentas
          open2={open2}
          handleClose={handleClose}
          setOpenModalLoader={setOpenModalLoader}
          setTitleSpinner={setTitleSpinner}
          infoCuenta={infoCuenta}
          setInfoCuenta={setInfoCuenta}
          getCuentas={getCuentas}
          servicios={servicios}
          dateInit={dateInit}
          setDateInit={setDateInit}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
        />
      ) : typeModal === 2 ? (
        <AddPerfiles
          open2={open2}
          handleClose={handleClose}
          setOpenModalLoader={setOpenModalLoader}
          setTitleSpinner={setTitleSpinner}
          infoCuenta={infoCuenta}
          setInfoCuenta={setInfoCuenta}
          getCuentas={getCuentas}
          getPerfiles={getPerfiles}
          servicios={servicios}
          dateInit={dateInit}
          setDateInit={setDateInit}
          infoPerfil={infoPerfil}
          setInfoPerfil={setInfoPerfil}
          perfiles={perfiles}
          clientes={clientes}
          setClientes={setClientes}
        />
      ) : (
        <AddPerfilesInfo
        open2={open2}
        handleClose={handleClose}
        perfilesData={perfilesData}
        setPerfilesData={setPerfilesData}

        />
      )}
      <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={8} sm={6} md={8} sx={{paddingBottom:{ md: "2rem", xs: "1rem" },paddingLeft: {md:"4%",xs: "1rem" },paddingTop: { xs: "5rem", md: "6rem" }, }}>
            <TextField
              id="input-with-icon-textfield"
              placeholder="Buscar cuenta por correo o producto"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "white" }} />
                  </InputAdornment>
                ),
                style: { color: "white", borderBottom: "1px solid white" },
              }}
              variant="standard"
              sx={{ width: { md: "50%", xs: "150%" } }}
              onChange={(e) => setSearchCuenta(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{paddingBottom:{ md: "1rem", xs: "1rem" },paddingLeft: {md:"20%",xs: "1rem" },paddingTop: { xs: "5rem", md: "6rem" }, }}>
            <Button
              size='medium'
              startIcon={<PersonalVideoIcon  />}
              variant="contained"
              color={'success'}
              onClick={createCuenta}
            >
            Añadir Cuenta
            </Button>
          </Grid> 
            
      </Grid>      
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={10} md={12} paddingLeft={'1.5rem'} paddingRight={'1.5rem'}>
        <BodyCuentas
          cuentas={cuentas}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          setCuentas={setCuentas}
          setOpenModalLoader={setOpenModalLoader}
          setTitleSpinner={setTitleSpinner}
          getCuentas={getCuentas}
          setInfoCuenta={setInfoCuenta}
          handleOpen={handleOpen}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
          perfiles={perfiles} 
          setPerfiles={setPerfiles}
          infoPerfil={infoPerfil}
          setInfoPerfil={setInfoPerfil}
          perfilesData={perfilesData}
          setPerfilesData={setPerfilesData}
        />
      </Grid>
    </Grid>
    <SpinnerLoader open={openModalLoader} title={titleSpinner} />
  </Box>
  );
};

export default Cuentas;
