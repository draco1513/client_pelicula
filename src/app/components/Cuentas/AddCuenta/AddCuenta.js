import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import MainInput from '../../General/MainInput';
import SpinnerSmall from '../../SpinnerLoad/SpinnerSmall';
import MainSelect from '../../General/MainSelect';
import { getDateOL, } from '../../../../utils/function';


const AddCuenta = (props) => {
    const { typeEdition, infoCuenta, setInfoCuenta,servicios} = props;
    const url = "'" + window.location.pathname + "'";
   


    const opcionesServicios = servicios.data.map((servicio) => ({
        value: servicio.servicio_id,
        label: servicio.descripcion,
      }));

   

    return (
        <>
            <Grid container>
                <Grid item md={12} xs={12}>
                    <MainSelect
                        title={'Producto'}
                        options={opcionesServicios}
                        value={infoCuenta?.servicio_id}
                        onChange={(value, event) =>setInfoCuenta({...infoCuenta,servicio_id: Number(value)})}
                        required
                    />
                    <MainInput
                        title={'Correo'}
                        value={infoCuenta?.correo}
                        name={'correo'}
                        placeholder={"Ingrese correo"}
                        onChange={(e) => setInfoCuenta({ ...infoCuenta, correo: e.target.value })}
                        type="email"
                        required
                    />
                     <MainInput
                        title={'Contraseña de correo'}
                        value={infoCuenta?.password_correo}
                        name={'password_correo'}
                        placeholder={"Ingrese contraseña de correo (opcional)"}
                        onChange={(e) => setInfoCuenta({ ...infoCuenta, password_correo: e.target.value })}
                        
                    />
                     <MainInput
                        title={'Contraseña de cuenta'}
                        value={infoCuenta?.password_cuenta}
                        name={'password_cuenta'}
                        placeholder={"Ingrese contraseña de cuenta"}
                        onChange={(e) => setInfoCuenta({ ...infoCuenta, password_cuenta: e.target.value })}
                        required
                    />
                     <MainInput
                        title={'Fecha Facturación'}
                        placeholder={'Ingrese Fecha Facturación'}
                        type={'date'}
                        value={infoCuenta?.fecha_facturacion}
                        onChange={(e) => setInfoCuenta({ ...infoCuenta, fecha_facturacion: e.target.value })}
                        required
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



export default AddCuenta;