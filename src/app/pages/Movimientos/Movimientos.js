import React from "react";
import { useState, useEffect } from "react";

import {Box,Grid,Button,InputAdornment,TextField} from "@mui/material";

import MovimientoService from "../../../services/movimiento"
import ClienteService from "../../../services/cliente"
import CuentaService from "../../../services/cuenta"
import SpinnerLoader from '../../components/SpinnerLoad/SpinnerLoader';
import { CODES } from '../../../utils/responseCodes';
import { simpleAlerts } from '../../../utils/alerts';
import SearchIcon from '@mui/icons-material/Search';
import AddMovimientos from "./AddMovimientos/AddMovimientos";
import BodyMovimientos from "../../components/Movimientos/BodyMovimientos/BodyMovimientos";
import { getDateOL } from "../../../utils/function";
import MainInput from "../../components/General/MainInput";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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

const Movimientos = ({ open, setOpen }) => {
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

const createMovimiento = () => {
      
  setInfoclientesCuenta({
    ...newMovimiento,
    fecha_movimiento:dateInit,
    
  });
  handleOpen();
};

return (
  <Box sx={{ flexGrow: 1, marginLeft: open ? "240px" : "0" }}>
    <AddMovimientos
      open2={open2}
      handleClose={handleClose}
      setOpenModalLoader={setOpenModalLoader}
      setTitleSpinner={setTitleSpinner}
      infoServicio={infoServicio}
      setInfoServicio={setInfoServicio}
      clientesCuenta={clientesCuenta}
      setClientesCuenta={clientesCuenta}
      infoclientesCuenta={infoclientesCuenta}
      setInfoclientesCuenta={setInfoclientesCuenta}
      getMovimientos={getMovimientos}
      clientesPerfilCuenta={clientesPerfilCuenta}
      setClientesPerfilCuenta={setClientesPerfilCuenta}
      movimientosPagados={movimientosPagados}
      setMovimientosPagados={setMovimientosPagados}
      cuentasAll={cuentasAll}
      setCuentasAll={setCuentasAll}
    />
    <Grid
      container
      direction="row"
     
    >
      <Grid item xs={12} sm={12} md={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: { md: "2rem", xs: "1rem" }, paddingTop: { xs: "5rem", md: "6rem" }}}>
        <TextField
          id="input-with-icon-textfield"
          placeholder="Buscar movimientos por descripción o cliente"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
            style: { color: "white", borderBottom: "1px solid white" },
          }}
          variant="standard"
          sx={{ width: { md: "40%", xs: "150%" }, marginRight: "4rem" }}
          onChange={(e) => setSearchService(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <MainInput
          title={'Desde'}
          placeholder={'Ingrese Fecha Inicio'}
          type={'date'}
          value={dateInit}
          onChange={(e) => setDateInit(e.target.value)}
          sx={{ marginLeft: "1rem" }}
         
     
        />
        <MainInput
          title={'Hasta'}
          placeholder={'Ingrese Fecha Fin'}
          type={'date'}
          value={dateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
          propsInput={{ min: dateInit }}
          
        />
        <Grid>
        <Button
            size='medium'
            startIcon={<ShoppingCartIcon />}
            variant="contained"
            color={'success'}
            onClick={createMovimiento}
            sx={{marginTop:'14%',marginLeft:'16px'}}
          >
            Añadir Movimiento
        </Button>
      </Grid>
      </Grid>
      
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="center">
      
      <Grid item xs={12} sm={10} md={12} paddingLeft={'1.5rem'} paddingRight={'1.5rem'}>
        <BodyMovimientos
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

export default Movimientos;
