import React from "react";
import { useState, useEffect } from 'react';

import { Container,Typography,Button,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Box,Grid} from "@mui/material";




const ReporteA=({nombre,apellido})=> {
  const [cts, setCts] = useState(0);
  const [seguroSocial, setSeguroSocial] = useState(0);
  const [asignacionFamiliar, setAsignacionFamiliar] = useState(0);
  const [gratificacion, setGratificacion] = useState(0);
  const [open, setOpen] = useState(false)

  const calcularDeducciones = () => {
    // Realiza tus cálculos de CTS, seguro social, asignación familiar y gratificación aquí
    // Puedes utilizar los valores de nombre y apellido para personalizar los cálculos
    // Ejemplo:
    setCts(/* Calcula el valor de CTS */);
    setSeguroSocial(/* Calcula el valor del seguro social */);
    setAsignacionFamiliar(/* Calcula el valor de la asignación familiar */);
    setGratificacion(/* Calcula el valor de la gratificación */);
  };

  return (
    <Box sx={{ flexGrow: 1, marginLeft: open ? "240px" : "0" }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={8}
      >
        <Grid item xs={8} sm={6} md={10}>
          <Typography variant="h4" style={{ marginTop: 20 }}>
           Reporte: {nombre} {apellido}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
            onClick={calcularDeducciones}
          >
            Calcular Deducciones
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={2}
      >
        <Grid item xs={12} sm={10} md={10}>
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Concepto</TableCell>
                <TableCell>Monte</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>CTS</TableCell>
                <TableCell>{cts}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Seguro Social</TableCell>
                <TableCell>{seguroSocial}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Asignación Familiar</TableCell>
                <TableCell>{asignacionFamiliar}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gratificación</TableCell>
                <TableCell>{gratificacion}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        </Grid>
      </Grid>
    </Box>
  );
};
export default ReporteA;
