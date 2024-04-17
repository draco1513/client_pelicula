import React, { useState } from 'react';
import { Box, ButtonGroup, IconButton } from '@mui/material';
import { colors } from '../../../../assets/colors';
import { sortDataListSimple } from '../../../../utils/function';
import MainPagination from '../../General/MainPagination';
import CuentaService from "../../../../services/cuenta"
import { CODES } from '../../../../utils/responseCodes';
import { simpleAlerts } from '../../../../utils/alerts';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';
import _ from 'lodash';

const columns = [
    { id: 'cuenta_id', label: '#', width: 80, align: 'left' },
    { id: 'correo', label: 'Cuenta', width: 500, align: 'left' },
    { id: 'password_cuenta', label: 'Contraseña', width: 400, align: 'left', },
    { id: 'numero_perfiles', label: 'Perfiles', width: 400, align: 'center', },
    { id: 'fecha_facturacion', label: 'Facturación', width: 200, align: 'center', },
    { id: 'restantes', label: 'Restantes', width: 200, align: 'center', },
    { id: 'acciones', label: 'Acciones', width: 200, align: 'center', },
];

const newPerfil = {

  'cuenta_id':0,
  'cliente_id':0,
  'pin':0,
  'fecha_fin':'',
  'dias':0
}

const BodyCuentas = (props) => {

  const url = "'" + window.location.pathname + "'";
  const { cuentas,setCuentas, totalPages, page, setPage,setOpenModalLoader,setTitleSpinner,getCuentas,setInfoCuenta,
    handleOpen,setTypeModal,perfiles,setInfoPerfil,perfilesData,setPerfilesData} = props;


    

   
  

   
  // /** inicio ordenamiento de columnas */
  const [sortConfigTable, setSortConfigTable] = useState({ key: null, direction: "ascending", });

  const handleSortTable = (key) => {
      let direction = "ascending";
      if (sortConfigTable && sortConfigTable.key === key && sortConfigTable.direction === "ascending") {
          direction = "descending";
      }
      setSortConfigTable({ key, direction });
  };

  const sortedData = sortDataListSimple(cuentas?.data, sortConfigTable);
  // /** fin ordenamiento de columnas */

  const deleteCuenta = async (info) => {
    let updDataCuentas = _.cloneDeep(cuentas?.data);
    updDataCuentas = updDataCuentas.filter(e => e.cuenta_id !== info?.cuenta_id);
  
    Swal.fire({
      title: '¿Seguro de eliminar?',
      text: 'Se perderá la cuenta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: colors.secondary.hex,
      cancelButtonColor: colors.primary.hex,
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpenModalLoader(true);
        setTitleSpinner('Eliminando...');
        try {
          const result = await CuentaService.deleteCuenta(url, info);
          if (result.status === CODES.DELETE_204) {
            simpleAlerts("Cuenta eliminada", "success");
  
            // Actualizar el estado local de servicios
            setCuentas(updDataCuentas);
  
            // Verificar si la página actual está vacía
            if (cuentas.data.length === 1 && page > 1) {
              // Retroceder a la página anterior
              setPage(page - 1);
            }
          }
        } catch (error) {
          console.log(`Error en deleteCuenta: ${error}`);
        } finally {
          getCuentas();
          setOpenModalLoader(false);
          setTitleSpinner(null);
        }
      }
    });
  };

  const handleProfileIconClick = (index, cuenta) => {
   
    setTypeModal(2);
    
  };
    
  

  const createPerfil = (fechaFacturacion,cuenta_id,diasRestantes) => {
    setTypeModal(2);
    setInfoPerfil({
      ...newPerfil,
      fecha_fin: fechaFacturacion,
      cuenta_id:cuenta_id,
      dias:diasRestantes
    });
    handleOpen();
  };
  

  return (
    <>
      <Box className='page-body-main'>
        <Box className='page-body-table table-responsive-md'>
          <table className="table table-hover table-striped table-bordered">
            <thead
              className="sticky-top"
              style={{
                backgroundColor: colors.darkCabecera.hex,
                color: "#ffff",
                whiteSpace: "nowrap",
              }}
            >
              <tr>
                {columns.map((column) => (
                  <th
                    scope="col"
                    key={column.id}
                    style={{
                      textAlign: column.align,
                      width: column.width,
                      maxWidth: column.width,
                    }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {sortedData?.map((cuenta, indexRow) => {
                const fechaFacturacion = new Date(`${cuenta.fecha_facturacion}T00:00:00`);
                const fechaActual = new Date();
                const diasRestantes = Math.ceil((fechaFacturacion - fechaActual) / (1000 * 60 * 60 * 24));
                const fechaFacturacionFormateada = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(fechaFacturacion);
  
                return (
                  <tr
                    key={"row" + indexRow}
                    style={{ whiteSpace: "nowrap", color: "#ffff" }}
                  >
                    {columns.map((column, indexColumn) => {
                      const value = column.id === "numero_perfiles" && cuenta.servicio ? cuenta.servicio.numero_perfiles : cuenta[column.id];
  
                      return (
                        <td key={"col" + indexColumn} align={column.align}>
                          {column.id === "acciones" ? (
                             <ButtonGroup
                             disableElevation
                             variant="contained"
                             aria-label="Disabled elevation buttons"
                           >
                             <IconButton
                                aria-label="ver"
                                size="small"
                                title="Ver"
                               onClick={() => { setTypeModal(3) ;handleOpen()}}
                             >
                               <VisibilityIcon fontSize="small" color={"info"}/>
                             </IconButton>
                             <IconButton aria-label="editar" size="small" title='Editar'
                               onClick={() => { setInfoCuenta(cuenta); handleOpen() }}
                             >
                               <EditIcon fontSize='small' color={'warning'} />
                             </IconButton>
                             <IconButton
                               aria-label="delete"
                               size="small"
                               title="Eliminar"
                               onClick={() => { deleteCuenta(cuenta) }}
                             >
                               <DeleteForeverIcon
                                 fontSize="small"
                                 color={"secondary"}
                               />
                             </IconButton>
                           </ButtonGroup>
                          ) : column.id === "numero_perfiles" ? (
                            
                            <div>
                              
                              {Array.from({ length: value }, (_, index) => {
                                const cuentaId = cuenta.cuenta_id.toString();
                                const perfilesAsociados = perfiles ? perfiles.filter(perfil => perfil.cuenta_id == cuentaId) : [];
                                console.log("🚀 ~ {Array.from ~ perfilesAsociados:", perfilesAsociados)
                               
                                const perfilAsociado = perfilesAsociados[index];
                              
                                const iconColor = perfilAsociado ? "red" : "gray";
  
                                const fechaFin = perfilAsociado?.fecha_fin;
                                const fechaActual = new Date();
  
                                if (fechaFin) {
                                  const fechaFinObj = new Date(fechaFin);
                                  if (!isNaN(fechaFinObj)) {
                                    const diasRestantes = Math.ceil((fechaFinObj - fechaActual) / (1000 * 60 * 60 * 24));
                                    // Ajuste para mostrar "días 0" si el resultado es igual o menor a -1
                                    const diasMostrar = Math.max(0, diasRestantes);
                                    const iconColor = diasMostrar > 0 ? "green" : "red";
  
                                    console.log("Días restantes:", diasMostrar,perfilAsociado.cliente.nombre,perfilAsociado.PIN, fechaFin);  
  
                                    return (
                                      <IconButton
                                        key={index}
                                        style={{
                                          cursor: 'pointer',
                                          margin: "0 1px",
                                          color: iconColor,
                                        }}
                                        title={perfilAsociado ? perfilAsociado.cliente.nombre + "-" + perfilAsociado.PIN : ''}
                                        onClick={() => {
                                          if (!perfilAsociado) {
                                            handleProfileIconClick(index, cuenta);
                                            handleOpen();
                                            createPerfil(cuenta.fecha_facturacion, cuenta.cuenta_id, diasRestantes);
                                          }
                                        }}
                                      >
                                        <PersonIcon />
                                      </IconButton>
                                    );
                                  } 
                                } 
  
                                return (
                                  <IconButton
                                    key={index}
                                    style={{
                                      cursor: 'pointer',
                                      margin: "0 1px",
                                      color: iconColor,
                                    }}
                                    title={perfilAsociado ? perfilAsociado.cliente.nombre + "-" + perfilAsociado.PIN : ''}
                                    onClick={() => {
                                      if (!perfilAsociado) {
                                        handleProfileIconClick(index, cuenta);
                                        handleOpen();
                                        createPerfil(cuenta.fecha_facturacion, cuenta.cuenta_id, diasRestantes);
                                      }
                                    }}
                                  >
                                    <PersonIcon />
                                  </IconButton>
                                );
                              })}
                            </div>
                          ) : column.id === "restantes" ? (
                            <div style={{ backgroundColor: "#4caf50", padding: "4px", borderRadius: "20px", color: "black", maxWidth: "50%", fontWeight: "bold", textAlign: "center" }}>
                              {diasRestantes + " días"}
                            </div>
                          ) : column.id === "fecha_facturacion" ? (
                            fechaFacturacionFormateada
                          ) : column.id === "correo" ? (
                            <div><br />
                              <strong style={{ fontSize: '14px' }}>{cuenta.servicio ? cuenta.servicio.descripcion : ''}</strong><br />
                              <strong style={{ color: 'gray', fontSize: '12px' }}>{cuenta.correo ? cuenta.correo : ''}</strong>
                            </div>
                          ) : column.id === "password_cuenta" ? (
                            <div><br />
                              <strong style={{ fontSize: '14px' }}>{cuenta.password_cuenta ? cuenta.password_cuenta : ''}</strong><br />
                              <strong style={{ color: 'gray', fontSize: '12px' }}>{cuenta.password_correo ? cuenta.password_correo : ''}</strong>
                            </div>
                          ) : value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Box>
      <MainPagination
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        size={"small"}
      />
      
    </>
  );
}


export default BodyCuentas