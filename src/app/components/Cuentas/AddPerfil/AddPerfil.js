import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import MainInput from '../../General/MainInput';
import SpinnerSmall from '../../SpinnerLoad/SpinnerSmall';
import MainSelect from '../../General/MainSelect';



const AddPerfil = (props) => {
    const { infoPerfil,setInfoPerfil,clientes,
        } = props;
    const url = "'" + window.location.pathname + "'";

    

    const opcionesPerfiles = clientes.map((cliente) => ({
       value: cliente.cliente_id,
        label: cliente.nombre,
      }));
    
      const calcularDiasRestantes = (fechaFin) => {
        const fechaFinPerfil = new Date(`${fechaFin}T00:00:00`);
        const fechaActual = new Date();
        const diferenciaTiempo = fechaFinPerfil.getTime() - fechaActual.getTime();
        const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
        return diferenciaDias >= 0 ? diferenciaDias : 0;
      };
      
    return (
        <>
            <Grid container>
                <Grid item md={12} xs={12}>
                    <MainSelect
                        title={'Cliente'}
                        options={opcionesPerfiles}
                        value={infoPerfil?.cliente_id}
                        onChange={(value, event) => {
                            setInfoPerfil({ ...infoPerfil, cliente_id: Number(value) });
                        }}
                    />
                    <MainInput
                        title={'PIN'}
                        value={infoPerfil?.pin}
                        name={'pin'}
                        placeholder={"Ingrese pin"}
                        onChange={(e) => setInfoPerfil({ ...infoPerfil, pin: e.target.value })}
                        required
                    />
                    <MainInput
                        title={'Fecha Fin'}
                        placeholder={'Ingrese Fecha fin'}
                        type={'date'}
                        value={infoPerfil?.fecha_fin}
                        onChange={(e) => {
                        const fechaFin = e.target.value;
                        const diasRestantes = calcularDiasRestantes(fechaFin);
                        setInfoPerfil({ ...infoPerfil, fecha_fin: fechaFin, dias: diasRestantes });
                         }}
                    /> 
                    <MainInput
                        title={'Dias'}
                        value={infoPerfil?.dias}
                        name={'dias'}
                        placeholder={"Ingrese dias"}
                        onChange={(e) => setInfoPerfil({ ...infoPerfil, dias: e.target.value })}
                    />
                   

                </Grid>
            </Grid>
            <Box
                display={'flex'}
             
                padding={'2px 0 0 5px'}
            >
               

            </Box>
        </>
    );
};
 





export default AddPerfil;