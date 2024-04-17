import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import MainInput from '../../General/MainInput';
import SpinnerSmall from '../../SpinnerLoad/SpinnerSmall';


const AddServicio = (props) => {
    const { typeEdition, system, infoServicio, setInfoServicio} = props;

    const url = "'" + window.location.pathname + "'";
   
    const [openSmall, setOpenSmall] = useState(true);
    const [screensSystem, setScreensSystem] = useState(null);

    useEffect(() => {
     
    }, [screensSystem])

  

    useEffect(() => {
       
        if (infoServicio?.servicio_id && typeEdition === 2) {
            setOpenSmall(true);
            //getPantallasByPerfil(infoProfile?.id_perfil);
        } else
            setOpenSmall(false);
    }, [infoServicio?.servicio_id, typeEdition])


    return (
        <>
            <Grid container>
                <Grid item md={12} xs={12}>
                    <MainInput
                        title={'Descripción'}
                        value={infoServicio?.descripcion}
                        name={'descripcion'}
                        placeholder={"Ingrese descripción"}
                        onChange={(e) => setInfoServicio({ ...infoServicio, descripcion: e.target.value })}
                    />
                     <MainInput
                        title={'Perfiles'}
                        value={infoServicio?.numero_perfiles}
                        name={'perfiles'}
                        placeholder={"Ingrese numero de perfiles"}
                        onChange={(e) => setInfoServicio({ ...infoServicio, numero_perfiles: Number(e.target.value)})}
                        type="number"
                        required
                    />
                    <MainInput
                        title={'Link producto'}
                        value={infoServicio?.producto_link}
                        name={'link'}
                        placeholder={"Ingrese link del producto"}
                        onChange={(e) => setInfoServicio({ ...infoServicio, producto_link: e.target.value })}
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



export default AddServicio;