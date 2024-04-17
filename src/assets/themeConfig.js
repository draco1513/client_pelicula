import { createTheme } from '@mui/material/styles';
import { colors } from '../assets/colors'

const theme = createTheme({
  palette: {
    primary: { //azul oscuro
      main: colors.primary.hex,
      letter: '#FFFFFF'
    },
    secondary: { //rojo
      main: colors.secondary.hex,
      letter: '#021A6A'
    },
    tertiary: { //azul medio
      main: colors.tertiary.hex,
      //contrastText: '#ffcc00',
      contrastText: '#ffff',
    },
    quaternary: { //celeste
      main: colors.quaternary.hex,
      contrastText: '#ffff', //colors.primary.hex,
    },
   
  }
});

export default theme;