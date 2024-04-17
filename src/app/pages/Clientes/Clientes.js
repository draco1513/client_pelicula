import React from "react";
import { useState, useEffect } from "react";

import {Box,Grid,Button,InputAdornment,TextField} from "@mui/material";

import ClienteService from "../../../services/cliente"
import SpinnerLoader from '../../components/SpinnerLoad/SpinnerLoader';
import { CODES } from '../../../utils/responseCodes';
import { simpleAlerts } from '../../../utils/alerts';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import BodyClientes from "../../components/Clientes/BodyClientes/BodyClientes";
import AddClientes from "./AddClientes/AddClientes";



const newCliente = {
  'nombre': '',
  'celular': '',
  'correo':''
}

const Clientes = ({ open, setOpen }) => {
  const url = "'" + window.location.pathname + "'";

  const [clientes, setClientes] = useState(null);
  const [infoCliente, setInfoCliente] = useState(null);

  const [open2, setOpen2] = useState(false)
  const handleOpen = () => setOpen2(true);
  const handleClose = () => setOpen2(false);

  const [searchClient, setSearchClient] = useState("");
  const [titleSpinner, setTitleSpinner] = useState(null);
  const [openModalLoader, setOpenModalLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  



  useEffect(() => {
    getClientes();
  }, [page]);

  useEffect(() => {
    if (!searchClient) {
      getClientes();
    }
}, [searchClient])




const getClientes = async () => {
  try {
      setOpenModalLoader(true);
      setTitleSpinner('Buscando Clientes ...');
      const result = await ClienteService.getClientes(url, { search: searchClient,page: page, pageSize: pageSize, pagination: true });
      if (result.status === CODES.SUCCESS_200) {
          setTotalPages(result.data.last_page);
          setClientes(result.data);
      } else {
          simpleAlerts('Hubo un error en clientes', 'error');
      }
      return []
  } catch (error) {
      console.log(`Error en getClientes: ${error}`);
  } finally {
      setOpenModalLoader(false);
      setTitleSpinner(null);
  }
}

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    getClientes();
  }
};

const createCliente = () => {
      
  setInfoCliente(newCliente)
  handleOpen();
};

  return (
    <Box sx={{ flexGrow: 1, marginLeft: open ? "240px" : "0" }}>
      <AddClientes
         open2={open2}
         handleClose={handleClose}
         //id_usuarioLogin={id_usuarioLogin}
         setOpenModalLoader={setOpenModalLoader}
         setTitleSpinner={setTitleSpinner}
         infoCliente={infoCliente}
         setInfoCliente={setInfoCliente}
         getClientes={getClientes}
      />
      <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={8} sm={6} md={8} sx={{paddingBottom:{ md: "2rem", xs: "1rem" },paddingLeft: {md:"4%",xs: "1rem" },paddingTop: { xs: "5rem", md: "6rem" }, }}>
            <TextField
              id="input-with-icon-textfield"
              placeholder="Buscar cliente por nombres"
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
              onChange={(e) => setSearchClient(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{paddingBottom:{ md: "1rem", xs: "1rem" },paddingLeft: {md:"20%",xs: "1rem" },paddingTop: { xs: "5rem", md: "6rem" }, }}>
            <Button
              size='medium'
              startIcon={<AddCircleIcon />}
              variant="contained"
              color={'success'}
              onClick={createCliente}
            >
            Añadir Cliente
            </Button>
          </Grid> 
            
      </Grid>      
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={10} md={12} paddingLeft={'1.5rem'} paddingRight={'1.5rem'}>
        <BodyClientes
          clientes={clientes}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          setClientes={setClientes}
          setOpenModalLoader={setOpenModalLoader}
          setTitleSpinner={setTitleSpinner}
          getClientes={getClientes}
          setInfoCliente={setInfoCliente}
          handleOpen={handleOpen}
        />
      </Grid>
    </Grid>
    <SpinnerLoader open={openModalLoader} title={titleSpinner} />
  </Box>
  );
};

export default Clientes;
