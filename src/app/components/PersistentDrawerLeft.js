// PersistentDrawerLeft.jsx
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useLocation } from 'react-router-dom';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CastIcon from '@mui/icons-material/Cast';
import Groups2Icon from '@mui/icons-material/Groups2';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthService from '../../services/auth';
import Swal from "sweetalert2";
import { CODES } from "../../utils/responseCodes";
import { colors } from "../../assets/colors";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor:"#1b222c",
  color: '#fff',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  borderBottom: "2px solid black",
}));

const PersistentDrawerLeft = ({open,setOpen,pathInit,userToken}) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMenuItem, setSelectedMenuItem] = React.useState('');


  React.useEffect(() => {
    const currentPath = location.pathname.replace(pathInit || '/', '') || '/';
    setSelectedMenuItem(currentPath);
  }, [location.pathname, pathInit]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Logout = async () => {

    const confirmationResult = await Swal.fire({
        title: "¿Seguro de Cerrar Sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#218838",
        cancelButtonColor: "#dc3545",
        confirmButtonText: "Si, Cerrar Sesión",
    });

    if (confirmationResult.isConfirmed) {
        await Swal.fire({
            icon: "success",
            title: "Cerrando...",
            timer: 1000,
            showConfirmButton: false,
        });

        try {
            // No necesitas incluir el encabezado Content-Type en el cuerpo aquí
            const result = await AuthService.signOut();

            if (
                result.status === CODES.BAD_TOKEN_498 ||
                result.status === CODES.SUCCESS_200
            ) {
                localStorage.removeItem("infoFilmFiesta");
                navigate(`${(pathInit || "/")}`);
                window.location.reload();
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }


};

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline  />
      <AppBar position="fixed" open={open}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ flexGrow: 1 }} /> {/* Este div ocupa el espacio restante */}
          <IconButton
            color="inherit"
            onClick={Logout}
          >
            <LogoutIcon sx={{color:"red"}}  title="Cerrar Sesión"  />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1b222c", // Cambia el color de fondo a gris oscuro
            color: "#fff",
          
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon  sx={{ color: '#fff' }}/>
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem 
          disablePadding 
          onClick={() => navigate(`${(pathInit || '/')}`)}
          sx={{
            "&:hover": { 
              backgroundColor: selectedMenuItem !== '/' ? "#b7dfb9" : null,
            },
            backgroundColor: selectedMenuItem === '/' ? "#4caf50" : "initial",
          }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: '#fff' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"DashBoard"} />
            </ListItemButton>
          </ListItem>
          <ListItem 
            disablePadding   
            onClick={() => navigate(`${(pathInit || '/')}/movimientos`)}
            sx={{
              "&:hover": { 
                backgroundColor: selectedMenuItem !== '/movimientos' ? "#b7dfb9" : null,
              },
              backgroundColor: selectedMenuItem === '/movimientos' ? "#4caf50" : "initial",
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: '#fff' }}>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary={"Movimientos"} />
            </ListItemButton>
          </ListItem>
          <ListItem 
            disablePadding   
            onClick={() => navigate(`${(pathInit || '/')}/cuentas`)}
             sx={{
              "&:hover": { 
                backgroundColor: selectedMenuItem !== '/cuentas' ? "#b7dfb9" : null,
              },
              backgroundColor: selectedMenuItem === '/cuentas' ? "#4caf50" : "initial",
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: '#fff' }}>
                <PersonalVideoIcon />
              </ListItemIcon>
              <ListItemText primary={"Cuentas"} />
            </ListItemButton>
          </ListItem>
          <ListItem 
            disablePadding   
            onClick={() => navigate(`${(pathInit || '/')}/clientes`)}
            sx={{
              "&:hover": { 
                backgroundColor: selectedMenuItem !== '/clientes' ? "#b7dfb9" : null,
              },
              backgroundColor: selectedMenuItem === '/clientes' ? "#4caf50" : "initial",
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: '#fff' }}>
                <Groups2Icon />
              </ListItemIcon>
              <ListItemText primary={"Clientes"} />
            </ListItemButton>
          </ListItem>
          <ListItem 
            disablePadding 
            onClick={() => navigate(`${(pathInit || '/')}/servicios`)}
            sx={{
              "&:hover": { 
                backgroundColor: selectedMenuItem !== '/servicios' ? "#b7dfb9" : null,
              },
              backgroundColor: selectedMenuItem === '/servicios' ? "#4caf50" : "initial",
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: '#fff' }}>
                <CastIcon />
              </ListItemIcon>
              <ListItemText primary={"Servicios"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
     
    </Box>
  );
};

export default PersistentDrawerLeft;
