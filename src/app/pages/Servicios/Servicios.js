import React from "react";
import { useState, useEffect } from "react";

import {Box,Grid,Button,InputAdornment,TextField} from "@mui/material";

import BodyServicios from "../../components/Servicios/BodyServicios/BodyServicios";
import ServicioService from "../../../services/servicio"
import SpinnerLoader from '../../components/SpinnerLoad/SpinnerLoader';
import { CODES } from '../../../utils/responseCodes';
import { simpleAlerts } from '../../../utils/alerts';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import AddServicios from "./AddServicios/AddServicios";



const newServicio = {
  'descripcion': '',
  'producto_link': '',
  'numero_perfiles':0
}

const Servicios = ({ open, setOpen }) => {
  const url = "'" + window.location.pathname + "'";

  const [servicios, setServicios] = useState(null);
  const [infoServicio, setInfoServicio] = useState(null);

  const [open2, setOpen2] = useState(false)
  const handleOpen = () => setOpen2(true);
  const handleClose = () => setOpen2(false);

  const [searchService, setSearchService] = useState("");
  const [titleSpinner, setTitleSpinner] = useState(null);
  const [openModalLoader, setOpenModalLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  



  useEffect(() => {
    getServicios();
  }, [page]);

  useEffect(() => {
    if (!searchService) {
      getServicios();
    }
}, [searchService])




const getServicios = async () => {
  try {
      setOpenModalLoader(true);
      setTitleSpinner('Buscando Servicios ...');
      const result = await ServicioService.getServicios(url, { search: searchService,page: page, pageSize: pageSize, pagination: true });
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

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    getServicios();
  }
};

const createServicio = () => {
      
  setInfoServicio(newServicio)
  handleOpen();
};

  return (
    <Box sx={{ flexGrow: 1, marginLeft: open ? "240px" : "0" }}>
      <AddServicios
         open2={open2}
         handleClose={handleClose}
         setOpenModalLoader={setOpenModalLoader}
         setTitleSpinner={setTitleSpinner}
         infoServicio={infoServicio}
         setInfoServicio={setInfoServicio}
         getServicios={getServicios}
      />
      <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={8} sm={6} md={8} sx={{paddingBottom:{ md: "2rem", xs: "1rem" },paddingLeft: {md:"4%",xs: "1rem" },paddingTop: { xs: "5rem", md: "6rem" }, }}>
            <TextField
              id="input-with-icon-textfield"
              placeholder="Buscar servicio por descripción"
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
              onChange={(e) => setSearchService(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={{paddingBottom:{ md: "1rem", xs: "1rem" },paddingLeft: {md:"20%",xs: "1rem" },paddingTop: { xs: "5rem", md: "6rem" }, }}>
            <Button
              size='medium'
              startIcon={<AddCircleIcon />}
              variant="contained"
              color={'success'}
              onClick={createServicio}
            >
            Añadir Servicio
            </Button>
          </Grid> 
            
      </Grid>      
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={10} md={12} paddingLeft={'1.5rem'} paddingRight={'1.5rem'}>
        <BodyServicios
          servicios={servicios}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          setServicios={setServicios}
          setOpenModalLoader={setOpenModalLoader}
          setTitleSpinner={setTitleSpinner}
          getServicios={getServicios}
        />
      </Grid>
    </Grid>
    <SpinnerLoader open={openModalLoader} title={titleSpinner} />
  </Box>
  );
};

export default Servicios;
