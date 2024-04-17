import React from "react";
import { useState, useEffect } from "react";

import {Box,Grid,Button,InputAdornment,TextField} from "@mui/material";

import MovimientoService from "../../../services/movimiento"
import ClienteService from "../../../services/cliente"
import CuentaService from "../../../services/cuenta"
import SpinnerLoader from '../../components/SpinnerLoad/SpinnerLoader';
import { CODES } from '../../../utils/responseCodes';
import { simpleAlerts } from '../../../utils/alerts';
import { getDateOL } from "../../../utils/function";
import BodyDashBoard from "../../components/Dashboard/BodyDashBoard/BodyDashBoard";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const newMovimiento = {
  'cliente_id':0,
  'cuenta_id':null,
  'descripcion':'',
  'monto':0,
  'fecha_movimiento':'',
  'tipo':0,
  'perfil_id':null,
  'fecha_nueva':'',
}

const DashBoard = ({ open, setOpen }) => {
  const url = "'" + window.location.pathname + "'";

  const [movimientos, setMovimientos] = useState(null);
  const [movimientosPagados, setMovimientosPagados] = useState(null);

  

  const [infoServicio,setInfoServicio] = useState(null);

  const [clientesCuenta, setClientesCuenta] = useState(null);
  const [infoclientesCuenta, setInfoclientesCuenta] = useState(null);
  const [cuentasAll, setCuentasAll] = useState(null);

  const [clientesPerfilCuenta, setClientesPerfilCuenta] = useState(null);

  const [open2, setOpen2] = useState(false)
  const handleOpen = () => setOpen2(true);
  const handleClose = () => setOpen2(false);

  const [searchService, setSearchService] = useState("");
  const [titleSpinner, setTitleSpinner] = useState(null);
  const [openModalLoader, setOpenModalLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  
  const [dateInit, setDateInit] = useState(getDateOL());
  const [dateEnd, setDateEnd] = useState(getDateOL());

  useEffect(() => {
    getMovimientos();
    obtenerClientesConCuentas();
    getMovimientosPagados();
    getCuentasAll();
  }, [page]);

  useEffect(() => {
    if (!searchService) {
      getMovimientos();
    }
}, [searchService])

useEffect(() => {
  getMovimientos();
}, [dateInit, dateEnd]);
useEffect(() => {
  if (infoclientesCuenta && infoclientesCuenta.cliente_id) {
    obtenerInformacionCuentasCliente();
  }
}, [infoclientesCuenta?.cliente_id]);

const getMovimientos = async () => {
  try {
      setOpenModalLoader(true);
      setTitleSpinner('Buscando Servicios ...');
      const result = await MovimientoService.getMovimientos(url, { search: searchService,page: page, pageSize: pageSize, pagination: true,dateInit, dateEnd });
    
      if (result.status === CODES.SUCCESS_200) {
          setTotalPages(result.data.last_page);
          setMovimientos(result.data);
      } else {
          simpleAlerts('Hubo un error en movimientos', 'error');
      }
      return []
  } catch (error) {
      console.log(`Error en getMovimientos: ${error}`);
  } finally {
      setOpenModalLoader(false);
      setTitleSpinner(null);
  }
}

const getMovimientosPagados = async () => {
  try {
      setOpenModalLoader(true);
      setTitleSpinner('Buscando Servicios ...');
      const result = await MovimientoService.getMovimientosPagados(url);
    
      if (result.status === CODES.SUCCESS_200) {
          setMovimientosPagados(result.data);
      } else {
          simpleAlerts('Hubo un error en getMovimientosPagados', 'error');
      }
      return []
  } catch (error) {
      console.log(`Error en getMovimientosPagados: ${error}`);
  } finally {
      setOpenModalLoader(false);
      setTitleSpinner(null);
  }
}

const obtenerClientesConCuentas = async () => {
  try {
      setOpenModalLoader(true);
      setTitleSpinner('Buscando Servicios ...');
      const result = await ClienteService.obtenerClientesConCuentas(url);
      if (result.status === CODES.SUCCESS_200) {
          setClientesCuenta(result.data);
      } else {
          simpleAlerts('Hubo un error en movimientos', 'error');
      }
      return []
  } catch (error) {
      console.log(`Error en getMovimientos: ${error}`);
  } finally {
      setOpenModalLoader(false);
      setTitleSpinner(null);
  }
}

const obtenerInformacionCuentasCliente = async () => {
  try {
      setOpenModalLoader(true);
      setTitleSpinner('Buscando Servicios ...');
      const result = await ClienteService.obtenerInformacionCuentasCliente(url,{cliente_id:infoclientesCuenta.cliente_id});
    
      if (result.status === CODES.SUCCESS_200) {
        setClientesPerfilCuenta(result.data);
      } else {
          simpleAlerts('Hubo un error en clientes,perfile,cuentas', 'error');
      }
      return []
  } catch (error) {
      console.log(`Error en obtenerInformacionCuentasCliente: ${error}`);
  } finally {
      setOpenModalLoader(false);
      setTitleSpinner(null);
  }
}

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    getMovimientos();
  }
};

const getCuentasAll = async () => {
  try {
      setOpenModalLoader(true);
      setTitleSpinner('Buscando Servicios ...');
      const result = await CuentaService.getCuentasAll(url);
    
      if (result.status === CODES.SUCCESS_200) {
          setCuentasAll(result.data);
      } else {
          simpleAlerts('Hubo un error en movimientos', 'error');
      }
      return []
  } catch (error) {
      console.log(`Error en getMovimientos: ${error}`);
  } finally {
      setOpenModalLoader(false);
      setTitleSpinner(null);
  }
}





return (
  <Box sx={{ flexGrow: 1, marginLeft: open ? "240px" : "0" }}>
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={10} md={12} paddingLeft={'1.5rem'} paddingRight={'1.5rem'} paddingTop={'5rem'}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          {movimientosPagados && (
            <div style={{  backgroundColor: "#212129", padding: "40px", color: "#fff", borderRadius: "5px", width: '35%', marginRight: '15px',display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon  sx={{ fontSize: 60 }}color="success"/>
              <strong style={{ flex: 1, textAlign: 'right',fontSize:'25px' }}>Ingresos:  S/ {"  "+movimientosPagados.ventas || 0}</strong>
            </div>
          )}
          {movimientosPagados && (
            <div style={{ backgroundColor: "#212129", padding: "40px", color: "#fff", borderRadius: "5px", width: '35%', marginRight: '15px',display: 'flex', alignItems: 'center' }}>
               <TrendingDownIcon sx={{ fontSize: 60 }} color="error"/>
               <strong style={{ flex: 1, textAlign: 'right',fontSize:'25px' }}>Gastos:  S/{"  "+movimientosPagados.compras || 0}</strong> 
            </div>
          )}
          {movimientosPagados && (
            <div style={{ backgroundColor: "#212129", padding: "40px", color: "#fff", borderRadius: "5px", width: '35%',display: 'flex', alignItems: 'center' }}>
              <AccountBalanceWalletIcon  sx={{ fontSize: 60 }} color="info"/>
              <strong style={{ flex: 1, textAlign: 'right',fontSize:'25px'}}>Balance:  S/{"  "+movimientosPagados.ventas - movimientosPagados.compras || 0}</strong> 
            </div>
          )}
        </div>
        <BodyDashBoard
          movimientos={movimientos}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          setMovimientos={setMovimientos}
          setOpenModalLoader={setOpenModalLoader}
          setTitleSpinner={setTitleSpinner}
          getMovimientos={getMovimientos}
        />
      </Grid>
    </Grid>
    <SpinnerLoader open={openModalLoader} title={titleSpinner} />
  </Box>
);
};

export default DashBoard;
