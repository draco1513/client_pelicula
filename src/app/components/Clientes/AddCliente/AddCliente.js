import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import MainInput from '../../General/MainInput';
import SpinnerSmall from '../../SpinnerLoad/SpinnerSmall';


const AddCliente = (props) => {
    const { typeEdition, infoCliente, setInfoCliente} = props;

    const url = "'" + window.location.pathname + "'";
   
    const [openSmall, setOpenSmall] = useState(true);
    

  

  

    useEffect(() => {
       
        if (infoCliente?.cliente_id && typeEdition === 2) {
            setOpenSmall(true);
            //getPantallasByPerfil(infoProfile?.id_perfil);
        } else
            setOpenSmall(false);
    }, [infoCliente?.cliente_id, typeEdition])


    return (
        <>
            <Grid container>
                <Grid item md={12} xs={12}>
                    <MainInput
                        title={'Nombres y Apellidos'}
                        value={infoCliente?.nombre}
                        name={'nombres'}
                        placeholder={"Ingrese nombres y apellidos"}
                        onChange={(e) => setInfoCliente({ ...infoCliente, nombre: e.target.value })}
                    />
                     <MainInput
                        title={'Celular'}
                        value={infoCliente?.celular}
                        name={'Celular'}
                        placeholder={"Ingrese numero de celular"}
                        onChange={(e) => setInfoCliente({ ...infoCliente, celular: e.target.value })}
                    />
                    <MainInput
                        title={'Correo'}
                        value={infoCliente?.correo}
                        name={'link'}
                        placeholder={"Ingrese link del producto"}
                        onChange={(e) => setInfoCliente({ ...infoCliente, correo: e.target.value })}
                        type="email"
                    />
                </Grid>
            </Grid>
            <Box
                display={'flex'}
             
                padding={'2px 0 0 5px'}
            >
                <SpinnerSmall open={openSmall} />

            </Box>
        </>
    );
};



export default AddCliente;