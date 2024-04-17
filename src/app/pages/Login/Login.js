import * as React from 'react';
import { Avatar, Button, TextField, Paper, Box, Grid, Typography, CssBaseline, } from '@mui/material';

import login1 from '../../../assets/img/login/plataformas.jpg';
import logo from '../../../assets/img/login/logos.png'
import { CODES } from '../../../utils/responseCodes';
import { simpleAlerts  } from '../../../utils/alerts';
import AuthService from '../../../services/auth';
import SpinnerLoader from '../../components/SpinnerLoad/SpinnerLoader';
import { Global } from '../../../utils/general';
const lstImg = [login1];
const random = Math.floor(Math.random() * 999);
const infoFilmFiesta = Global.infoFilmFiesta;

const Login = ({ setUserToken }) => {

  const [openModalLoader, setOpenModalLoader] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        setOpenModalLoader(true);
        const data = new FormData(event.currentTarget);
        data.append("sistema", 'FilmFiesta');
        const result = await AuthService.signIn(data);
        if (result?.status === CODES.SUCCESS_200) {
            localStorage.setItem(infoFilmFiesta, JSON.stringify(result?.data));
            setUserToken(result?.data);
        } else {
          simpleAlerts (result?.data?.message,"error");
        }
    } catch (error) {
        console.log(`Error login: ${error}`)
    } finally {
        setOpenModalLoader(false);
    }
};


  return (
    <Grid container  sx={{ height: '100vh',bgcolor: 'black'}} >
       <SpinnerLoader open={openModalLoader} />
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5}  elevation={6} >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
           
          
          }}
        >
          
          <Typography component="h1" variant="h5" sx={{color:'white',marginBottom:'15px'}}>
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              placeholder="Usuario"
              margin="normal"
              id="usuario"
              name="usuario"
              autoComplete="user"
              required fullWidth autoFocus
             
              style={{ backgroundColor:'white', borderRadius: '10px' }}
            />
            <TextField
              margin="normal"
              name="clave"
              placeholder="Contraseña"
              type="password"
              id="clave"
              autoComplete="current-password"
              required fullWidth
              style={{ backgroundColor:'white', borderRadius: '10px' }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size={"large"}
              color="secondary"
            >
              Iniciar sesión
            </Button>
          </Box>
          <img style={{paddingTop:'4rem'}}  src={logo} width='50%' alt="logo" />
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${lstImg[random % lstImg?.length]})`,//'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover', //'contain',
          backgroundPosition: 'center',
        }}
      />

    </Grid>
  );
}
export default Login;