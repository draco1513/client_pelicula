import React, { useState } from "react";
import { Box, ButtonGroup, IconButton } from "@mui/material";
import { colors } from "../../../../assets/colors";
import { sortDataListSimple } from "../../../../utils/function";
import MainPagination from "../../General/MainPagination";
import MovimientoService from "../../../../services/movimiento";
import { CODES } from "../../../../utils/responseCodes";
import { simpleAlerts } from "../../../../utils/alerts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import _ from "lodash";

const columns = [
  { id: "movimiento_id", label: "#", width: 100, align: "left" },
  { id: "descripcion", label: "Descripción", width: 400, align: "left" },
  { id: "cliente", label: "Cliente", width: 600, align: "left" },
  { id: "monto", label: "Monto", width: 200, align: "left" },
  { id: "fecha_movimiento", label: "Fecha Movimiento", width: 200, align: "center" },
  { id: "tipo", label: "Tipo", width: 200, align: "center" },
  
];

const BodyDashBoard = (props) => {
  const url = "'" + window.location.pathname + "'";
  const {
    setMovimientos,
    movimientos,
    totalPages,
    page,
    setPage,
    setOpenModalLoader,
    setTitleSpinner,
    getMovimientos,
  } = props;

  // /** inicio ordenamiento de columnas */
  const [sortConfigTable, setSortConfigTable] = useState({
    key: null,
    direction: "ascending",
  });

  
  const handleSortTable = (key) => {
    let direction = "ascending";
    if (
      sortConfigTable &&
      sortConfigTable.key === key &&
      sortConfigTable.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfigTable({ key, direction });
  };

  const sortedData = sortDataListSimple(movimientos?.data, sortConfigTable);
  // /** fin ordenamiento de columnas */

  const deleteMovimiento = async (info) => {
    let updDataMovimientos = _.cloneDeep(movimientos?.data);
    updDataMovimientos = updDataMovimientos.filter(
      (e) => e.servicio_id !== info?.servicio_id
    );

    Swal.fire({
      title: "¿Seguro de eliminar?",
      text: "Se perderá el movimiento completo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.secondary.hex,
      cancelButtonColor: colors.primary.hex,
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpenModalLoader(true);
        setTitleSpinner("Eliminando...");
        try {
          const result = await MovimientoService.deleteMovimiento(url, info);
          if (result.status === CODES.DELETE_204) {
            simpleAlerts("Movimiento eliminado", "success");

            // Actualizar el estado local de servicios
            setMovimientos(updDataMovimientos);

            // Verificar si la página actual está vacía
            if (movimientos.data.length === 1 && page > 1) {
              // Retroceder a la página anterior
              setPage(page - 1);
            }
          }
        } catch (error) {
          console.log(`Error en deleteServicio: ${error}`);
        } finally {
          getMovimientos();
          setOpenModalLoader(false);
          setTitleSpinner(null);
        }
      }
    });
  };

  

  return (
    <>
    
      <Box className="page-body-main">
        <Box className="page-body-table table-responsive-md">
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
              {sortedData?.map((group, indexRow) => {
                return (
                  <tr
                    key={"row" + indexRow}
                    style={{ whiteSpace: "nowrap", color: "#ffff" }}
                  >
                    {columns.map((column, indexColumn) => {
                      const value = group[column.id];

                      return (
                        <td key={"col" + indexColumn} align={column.align}>
                          {
                          
                          column.id == "tipo" ? (
                            group[column.id] == 1 ? "Ventas" : "Compras"
                          )
                          :column.id === "cliente" ? (
                            // Extraer información del objeto cliente y renderizar el nombre
                            <span>{value?.nombre || "-"}</span>
                          ) :(
                           
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
};

export default BodyDashBoard;
