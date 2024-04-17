import React, { useState, useEffect } from "react";
import { Grid, Box, Tabs, Tab } from "@mui/material";
import MainInput from "../../General/MainInput";
import SpinnerSmall from "../../SpinnerLoad/SpinnerSmall";
import MainSelect from "../../General/MainSelect";
import BodyAddMovimientos from "./BodyAddMovimientos";

const AddMovimiento = (props) => {
  const {
    clientesCuenta,
    setClientesCuenta,
    infoclientesCuenta,
    setInfoclientesCuenta,
    clientesPerfilCuenta,
    setClientesPerfilCuenta,
    movimientosPagados,
    setMovimientosPagados,
    cuentasAll,setCuentasAll
  } = props;
  

  const url = "'" + window.location.pathname + "'";

  const [tabValue, setTabValue] = useState(0);
  const [openSmall, setOpenSmall] = useState(true);

  useEffect(() => {
    if (clientesCuenta.cliente_id) {
      setOpenSmall(true);
    } else setOpenSmall(false);

    // Limpia los campos cuando cambia de pestaña
    resetFields();
  }, [clientesCuenta?.cliente_id, tabValue]);

  // Función para restablecer los campos
  const resetFields = () => {
    setInfoclientesCuenta({
      cliente_id: null,
      descripcion: "",
      monto: 0,
      perfil_id:null,
      cuenta_id:null,
      tipo: 0,
    });
  };

  const opcionesClientes = clientesCuenta.clientasCuentas.map((cliente) => ({
    label: cliente.nombre,
    value: cliente.cliente_id,
  }));

  const opcionesCuentas = cuentasAll.map((cuenta) => ({
    label: cuenta.correo+" - "+cuenta.servicio.descripcion,
    value: cuenta.cuenta_id,
  }));

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Tabs
        sx={{ marginBottom: "3%" }}
        value={tabValue}
        onChange={handleChangeTab}
        centered
      >
        <Tab label="Ventas" />
        <Tab label="Compras" />
      </Tabs>
      {tabValue === 0 && (
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <MainSelect
              title={"Cliente"}
              options={opcionesClientes}
              value={infoclientesCuenta?.cliente_id}
              onChange={(value, event) => {
                const tipoMovimiento = 1;
                setInfoclientesCuenta({
                  ...infoclientesCuenta,
                  cliente_id: Number(value),
                  tipo: tipoMovimiento,
                });
              }}
            />
            <MainInput
              title={"Descripción"}
              value={infoclientesCuenta?.descripcion}
              name={"descripcion"}
              placeholder={"Ingrese descripción"}
              onChange={(e) =>
                setInfoclientesCuenta({
                  ...infoclientesCuenta,
                  descripcion: e.target.value,
                })
              }
            />
            <MainInput
              title={"Monto"}
              value={infoclientesCuenta?.monto}
              name={"Monto"}
              placeholder={"Ingrese monto s/."}
              onChange={(e) =>
                setInfoclientesCuenta({
                  ...infoclientesCuenta,
                  monto: e.target.value,
                })
              }
            />
            <MainInput
              title={"Fecha Movimiento"}
              placeholder={"Ingrese Fecha Facturación"}
              type={"date"}
              value={infoclientesCuenta?.fecha_movimiento}
              onChange={(e) =>
                setInfoclientesCuenta({
                  ...infoclientesCuenta,
                  fecha_movimiento: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item md={8} xs={12}>
            <BodyAddMovimientos
              clientesPerfilCuenta={clientesPerfilCuenta}
              setClientesPerfilCuenta={setClientesPerfilCuenta}
              setInfoclientesCuenta={setInfoclientesCuenta}
              infoclientesCuenta={infoclientesCuenta}
              movimientosPagados={movimientosPagados}
              setMovimientosPagados={setMovimientosPagados}
            />
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        
          <Grid item md={4} xs={12}>
            <MainSelect
              title={"Cuenta"}
              options={opcionesCuentas}
              value={infoclientesCuenta?.cuenta_id}
              onChange={(value, event) => {
                const tipoMovimiento = 2;
                setInfoclientesCuenta({
                  ...infoclientesCuenta,
                  cuenta_id: Number(value),
                  tipo: tipoMovimiento,
                });
              }}
            />
            <MainInput
              title={"Descripción compra"}
              value={infoclientesCuenta?.descripcion}
              name={"descripcion"}
              placeholder={"Ingrese descripción"}
              onChange={(e) => {
                setInfoclientesCuenta({
                  ...infoclientesCuenta,
                  descripcion: e.target.value,
                  
                });
              }}
            />
            <MainInput
              title={"Monto compra"}
              value={infoclientesCuenta?.monto}
              name={"Monto"}
              placeholder={"Ingrese monto s/."}
              onChange={(e) =>
                setInfoclientesCuenta({
                  ...infoclientesCuenta,
                  monto: e.target.value,
                })
              }
            />
            <MainInput
              title={"Fecha Movimiento compra"}
              placeholder={"Ingrese Fecha Facturación"}
              type={"date"}
              value={infoclientesCuenta?.fecha_movimiento}
              onChange={(e) =>
                setInfoclientesCuenta({
                  ...infoclientesCuenta,
                  fecha_movimiento: e.target.value,
                })
              }
            />
          </Grid>
       
      )}

      <Box display={"flex"} padding={"2px 0 0 5px"}>
        <SpinnerSmall open={openSmall} />
      </Box>
    </>
  );
};

export default AddMovimiento;
