import React, { useState } from 'react';
import { Box, ButtonGroup, IconButton } from '@mui/material';
import { colors } from '../../../../assets/colors';
import { sortDataListSimple } from '../../../../utils/function';
import MainPagination from '../../General/MainPagination';
import ClienteService from "../../../../services/cliente"
import { CODES } from '../../../../utils/responseCodes';
import { simpleAlerts } from '../../../../utils/alerts';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import _ from 'lodash';

const columns = [
    { id: 'cliente_id', label: '#', width: 100, align: 'left' },
    { id: 'nombre', label: 'Nombres', width: 400, align: 'left' },
    { id: 'celular', label: 'Celular', width: 200, align: 'left', },
    { id: 'correo', label: 'Correo', width: 400, align: 'left', },
    { id: 'acciones', label: 'Acciones', width: 200, align: 'center', },
];


const BodyClientes = (props) => {

  const url = "'" + window.location.pathname + "'";
  const { setClientes,clientes, totalPages, page, setPage,setOpenModalLoader,setTitleSpinner,getClientes,setInfoCliente,handleOpen} = props;
   

  // /** inicio ordenamiento de columnas */
  const [sortConfigTable, setSortConfigTable] = useState({ key: null, direction: "ascending", });

  const handleSortTable = (key) => {
      let direction = "ascending";
      if (sortConfigTable && sortConfigTable.key === key && sortConfigTable.direction === "ascending") {
          direction = "descending";
      }
      setSortConfigTable({ key, direction });
  };

  const sortedData = sortDataListSimple(clientes?.data, sortConfigTable);
  // /** fin ordenamiento de columnas */

  const deleteCliente = async (info) => {
    let updDataClientes = _.cloneDeep(clientes?.data);
    updDataClientes = updDataClientes.filter(e => e.servicio_id !== info?.servicio_id);
  
    Swal.fire({
      title: '¿Seguro de eliminar?',
      text: 'Se perderá el cliente completo',
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
          const result = await ClienteService.deleteCliente(url, info);
          if (result.status === CODES.DELETE_204) {
            simpleAlerts("Cliente eliminado", "success");
  
            // Actualizar el estado local de servicios
            setClientes(updDataClientes);
  
            // Verificar si la página actual está vacía
            if (clientes.data.length === 1 && page > 1) {
              // Retroceder a la página anterior
              setPage(page - 1);
            }
          }
        } catch (error) {
          console.log(`Error en deleteCliente: ${error}`);
        } finally {
          getClientes();
          setOpenModalLoader(false);
          setTitleSpinner(null);
        }
      }
    });
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
                {sortedData?.map((cliente, indexRow) => {
                  return (
                    <tr
                      key={"row" + indexRow}
                      style={{ whiteSpace: "nowrap", color: "#ffff" }}
                    >
                      {columns.map((column, indexColumn) => {
                        const value = cliente[column.id];
                        return (
                          <td key={"col" + indexColumn} align={column.align}>
                            {column.id === "acciones" ? (
                              <ButtonGroup
                                disableElevation
                                variant="contained"
                                aria-label="Disabled elevation buttons"
                              >
                                <IconButton aria-label="editar" size="small" title='Editar'
                                  onClick={() => { setInfoCliente(cliente); handleOpen() }}
                                >
                                  <EditIcon fontSize='small' color={'warning'} />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  size="small"
                                  title="Eliminar"
                                  onClick={() => { deleteCliente(cliente) }}
                                >
                                  <DeleteForeverIcon
                                    fontSize="small"
                                    color={"secondary"}
                                  />
                                </IconButton>
                              </ButtonGroup>
                            ) : (
                              value
                            )}
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

export default BodyClientes