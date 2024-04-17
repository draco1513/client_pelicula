import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import MainInput from '../../General/MainInput';
import SpinnerSmall from '../../SpinnerLoad/SpinnerSmall';
import MainSelect from '../../General/MainSelect';



const AddPerfilesInfos = (props) => {
    const { perfilesData,setPerfilesData
        } = props;
    const url = "'" + window.location.pathname + "'";

    

    return (
        <>
            <Grid container>
                <Grid item md={12} xs={12}>
                    <MainSelect
                        title={'Cliente'}
                      
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

 





export default AddPerfilesInfos;